import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../core/models';
import { ProductCard } from './product-card';

/** Cantidad de copias de la lista. Se arranca en la del medio y se reubica al llegar a los bordes. */
const COPIES = 5;
const MID = 2;

/**
 * Carrusel horizontal infinito de libros.
 * El contenido se repite COPIES veces; cuando el scroll se detiene cerca de un borde, se salta una
 * copia hacia el centro. Como las copias son idénticas, el salto es invisible y el recorrido no termina.
 */
@Component({
  selector: 'app-book-carousel',
  imports: [RouterLink, ProductCard],
  host: { '(window:resize)': 'onResize()' },
  template: `
    <section class="block">
      <div class="wrap">
        <div class="sec-head">
          <div><h2>{{ title() }}</h2><i class="rule"></i></div>
          <a [routerLink]="'/catalogo'" [queryParams]="{ cat: category() }">Ver todos →</a>
        </div>

        <div class="stage">
          <button class="nav prev" (click)="scroll(-1)" aria-label="Anterior">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
          </button>
          <div class="track" #track (scroll)="onScroll()" role="group" aria-roledescription="carrusel" [attr.aria-label]="title()">
            @for (c of copies(); track c) {
              @for (b of books(); track b.id) {
                <div class="item" [attr.aria-hidden]="c === mid() ? null : 'true'">
                  <app-product-card [book]="b" [focusable]="c === mid()" />
                </div>
              }
            }
          </div>
          <button class="nav next" (click)="scroll(1)" aria-label="Siguiente">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: `
    .stage { position: relative; }
    .track { display: flex; gap: 20px; overflow-x: auto; overflow-anchor: none; scroll-snap-type: x proximity; scrollbar-width: none; padding: 6px 4px 24px; margin: -6px -4px -24px; }
    .track::-webkit-scrollbar { display: none; }
    .item { flex: 0 0 calc((100% - 80px) / 5); min-width: 210px; scroll-snap-align: start; }

    /* Flechas laterales, centradas verticalmente sobre la portada (medido: 128px desde el borde superior). */
    .nav { position: absolute; top: 128px; transform: translateY(-50%); z-index: 2; width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--stone); background: #fff; color: var(--navy-700); display: grid; place-items: center; box-shadow: 0 6px 16px rgba(10, 42, 67, 0.18); transition: background 0.2s, color 0.2s, border-color 0.2s; }
    .nav svg { width: 22px; height: 22px; }
    /* Pantallas anchas: las flechas viven en el margen exterior, fuera de las tarjetas. */
    .prev { left: -50px; }
    .next { right: -50px; }
    .nav:hover { background: var(--navy-700); border-color: var(--navy-700); color: #fff; }
    .nav:focus-visible { outline: 2px solid var(--blue-600); outline-offset: 2px; }
    /* Pantallas medianas: no hay margen suficiente, así que se les reserva un hueco propio a cada lado. */
    @media (max-width: 1279px) {
      .stage { padding: 0 52px; }
      .prev { left: 0; }
      .next { right: 0; }
    }
    @media (max-width: 1000px) { .nav { display: none; } .stage { padding: 0; } .item { flex-basis: 220px; } }
    @media (prefers-reduced-motion: reduce) { .nav { transition: none; } }
  `,
})
export class BookCarousel {
  readonly title = input.required<string>();
  readonly category = input.required<string>();
  readonly books = input.required<Book[]>();

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  /** Con menos de 2 libros no tiene sentido repetir. */
  protected readonly copies = computed(() => (this.books().length > 1 ? Array.from({ length: COPIES }, (_, i) => i) : [0]));
  protected readonly mid = computed(() => (this.copies().length === COPIES ? MID : 0));

  private settle?: ReturnType<typeof setTimeout>;
  private lastWidth = 0;

  constructor() {
    afterNextRender(() => {
      this.lastWidth = window.innerWidth;
      this.center();
    });
    inject(DestroyRef).onDestroy(() => clearTimeout(this.settle));
  }

  /** Solo reacciona si cambió el ancho: en móvil, `resize` también salta al ocultarse la barra del navegador. */
  protected onResize(): void {
    if (window.innerWidth === this.lastWidth) return;
    this.lastWidth = window.innerWidth;
    this.center();
  }

  /** Ancho de una copia completa de la lista (0 si no se repite). */
  private copyWidth(): number {
    const n = this.books().length;
    const items = this.track().nativeElement.querySelectorAll<HTMLElement>('.item');
    if (this.copies().length < COPIES || items.length < n * 2) return 0;
    return items[n].getBoundingClientRect().left - items[0].getBoundingClientRect().left;
  }

  /** Separación entre el inicio de dos tarjetas consecutivas. */
  private pitch(): number {
    const items = this.track().nativeElement.querySelectorAll<HTMLElement>('.item');
    return items.length > 1 ? items[1].getBoundingClientRect().left - items[0].getBoundingClientRect().left : 0;
  }

  /** Ubica el scroll al comienzo de la copia del medio. */
  center(): void {
    const w = this.copyWidth();
    if (w) this.track().nativeElement.scrollLeft = w * MID;
  }

  scroll(dir: 1 | -1): void {
    const el = this.track().nativeElement;
    const pitch = this.pitch() || el.clientWidth;
    // Avanza un número entero de tarjetas, para que siempre queden alineadas.
    const step = Math.max(1, Math.floor((el.clientWidth * 0.9) / pitch)) * pitch;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  onScroll(): void {
    // Se reubica recién cuando el scroll se detuvo, para no cortar la animación ni el impulso del dedo.
    clearTimeout(this.settle);
    this.settle = setTimeout(() => this.normalize(), 120);
  }

  private normalize(): void {
    const w = this.copyWidth();
    if (!w) return;
    const el = this.track().nativeElement;
    // Equivalente módulo una copia que cae dentro de [MID - 0.5, MID + 0.5) copias, aunque se haya recorrido mucho de golpe.
    const offset = el.scrollLeft - w * MID;
    const target = w * MID + ((((offset + w / 2) % w) + w) % w) - w / 2;
    if (Math.abs(target - el.scrollLeft) > 1) el.scrollLeft = target;
  }
}
