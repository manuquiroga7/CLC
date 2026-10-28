import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Slide {
  theme: 'navy' | 'wine' | 'blue' | 'slate';
  eyebrow: string;
  title: string;
  text: string;
  cta: { label: string; link: string; query?: Record<string, string> };
  cta2?: { label: string; link: string; query?: Record<string, string> };
  covers: { tone: string; kicker: string; title: string; sub: string }[];
}

@Component({
  selector: 'app-hero-slider',
  imports: [RouterLink],
  template: `
    <section
      class="hero"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      (mouseenter)="paused.set(true)"
      (mouseleave)="paused.set(false)"
      (focusin)="paused.set(true)"
      (focusout)="paused.set(false)"
    >
      <div class="slides">
        @for (s of slides; track s.title; let i = $index) {
          <div class="slide" [class]="'slide ' + s.theme" [class.on]="i === index()" [attr.aria-hidden]="i !== index()">
            <div class="wrap">
              <div class="copy">
                <div class="eyebrow">{{ s.eyebrow }}</div>
                <h2>{{ s.title }}</h2>
                <p>{{ s.text }}</p>
                <div class="cta">
                  <a class="btn btn-gold" [routerLink]="s.cta.link" [queryParams]="s.cta.query" [tabindex]="i === index() ? 0 : -1">{{ s.cta.label }}</a>
                  @if (s.cta2; as c) {
                    <a class="btn btn-ghost" [routerLink]="c.link" [queryParams]="c.query" [tabindex]="i === index() ? 0 : -1">{{ c.label }}</a>
                  }
                </div>
              </div>
              <div class="art" aria-hidden="true">
                @for (c of s.covers; track c.title; let j = $index) {
                  <div class="b" [class]="'b ' + c.tone" [class.big]="j === 1">
                    <small>{{ c.kicker }}</small><b>{{ c.title }}</b><small>{{ c.sub }}</small>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>

      <button class="arrow prev" (click)="go(index() - 1)" aria-label="Anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4l-8 8 8 8"/></svg>
      </button>
      <button class="arrow next" (click)="go(index() + 1)" aria-label="Siguiente">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4l8 8-8 8"/></svg>
      </button>
      <div class="dots" role="tablist">
        @for (s of slides; track s.title; let i = $index) {
          <button role="tab" [class.on]="i === index()" [attr.aria-selected]="i === index()" [attr.aria-label]="'Ir al destacado ' + (i + 1)" (click)="go(i)"></button>
        }
      </div>
    </section>
  `,
  styles: `
    .hero { position: relative; color: #fff; overflow: hidden; background: var(--navy-900); }
    .slides { display: grid; }
    .slide { grid-area: 1 / 1; opacity: 0; visibility: hidden; transition: opacity 0.7s ease, visibility 0.7s; }
    .slide.on { opacity: 1; visibility: visible; }
    .navy { background: linear-gradient(120deg, #0a2a43, #08416c); }
    .wine { background: linear-gradient(120deg, #3d0f16, #7a1f2b); }
    .blue { background: linear-gradient(120deg, #08416c, #1569a8); }
    .slate { background: linear-gradient(120deg, #14191e, #37424d); }
    .slide::after { content: ''; position: absolute; right: -120px; top: -120px; width: 420px; height: 420px; border: 1px solid rgba(212, 168, 42, 0.35); border-radius: 50%; pointer-events: none; }
    .wrap { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 32px; align-items: center; padding: 72px 84px 88px; min-height: 440px; }
    h2 { color: #fff; font-size: clamp(40px, 5vw, 60px); margin: 14px 0 18px; }
    p { font-size: 18px; color: #d3deea; max-width: 480px; }
    .cta { display: flex; gap: 14px; margin-top: 32px; flex-wrap: wrap; }
    .btn-ghost { border-color: rgba(255, 255, 255, 0.5); color: #fff; }
    .btn-ghost:hover { background: #fff; color: var(--navy-900); }

    .art { display: flex; justify-content: center; gap: 16px; align-items: flex-end; }
    .b { width: clamp(100px, 11vw, 150px); height: clamp(150px, 16vw, 220px); border-radius: 3px 6px 6px 3px; box-shadow: 0 24px 40px rgba(0, 0, 0, 0.4); display: flex; flex-direction: column; justify-content: space-between; padding: 14px 12px 14px 18px; font-family: var(--serif); position: relative; }
    .b::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: rgba(0, 0, 0, 0.22); }
    .b.big { width: clamp(120px, 13.5vw, 176px); height: clamp(180px, 19vw, 262px); transform: translateY(-8px); }
    .b b { font-size: clamp(16px, 1.7vw, 21px); line-height: 1.05; }
    .b small { font-family: var(--sans); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.85; }
    .c1 { background: linear-gradient(160deg, #2a5d4b, #143429); }
    .c2 { background: linear-gradient(160deg, #7a1f2b, #3d0f16); }
    .c3 { background: linear-gradient(160deg, #c9a227, #7e6210); }
    .c4 { background: linear-gradient(160deg, #1569a8, #0a2a43); }
    .c5 { background: linear-gradient(160deg, #4b3a6b, #241a3d); }
    .c6 { background: linear-gradient(160deg, #37424d, #14191e); }

    .arrow { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border: 0; background: none; color: #fff; opacity: 0.55; display: grid; place-items: center; transition: opacity 0.2s, color 0.2s; z-index: 2; }
    .arrow svg { width: 28px; height: 28px; }
    .arrow:hover { opacity: 1; color: var(--gold-500); }
    .arrow:focus-visible { opacity: 1; outline: 2px solid var(--gold-500); outline-offset: 2px; border-radius: 4px; }
    .prev { left: 20px; } .next { right: 20px; }
    .dots { position: absolute; bottom: 24px; left: 0; right: 0; display: flex; justify-content: center; gap: 10px; z-index: 2; }
    .dots { gap: 0; }
    .dots button { width: 28px; height: 28px; border: 0; background: none; padding: 0; display: grid; place-items: center; transition: width 0.3s; }
    .dots button::after { content: ''; width: 10px; height: 10px; border-radius: 99px; background: rgba(255, 255, 255, 0.4); transition: 0.3s; }
    .dots button.on { width: 48px; }
    .dots button.on::after { width: 32px; background: var(--gold-500); }

    @media (max-width: 1000px) {
      .wrap { grid-template-columns: 1fr; min-height: 0; padding: 48px 24px 72px; }
      h2 { font-size: 42px; }
      .art { display: none; }
      .arrow { display: none; }
    }
    @media (prefers-reduced-motion: reduce) { .slide { transition: none; } }
  `,
})
export class HeroSlider {
  readonly index = signal(0);
  readonly paused = signal(false);

  readonly slides: Slide[] = [
    {
      theme: 'navy', eyebrow: 'Nuevo · Biblia de Promesas', title: 'Más de 1800 promesas, a un clic.',
      text: 'Biblias, libros y recursos para crecer en la fe. Elegí en línea y retirá en tu librería CLC, o recibilo en casa.',
      cta: { label: 'Ver Biblias', link: '/catalogo', query: { cat: 'biblias' } },
      cta2: { label: 'Explorar libros', link: '/catalogo', query: { cat: 'libros' } },
      covers: [
        { tone: 'c2', kicker: 'Biblia', title: 'Biblia de Promesas', sub: 'Unilit' },
        { tone: 'c4', kicker: 'Edición especial', title: 'Biblia de estudio', sub: 'CLC' },
        { tone: 'c1', kicker: 'Biblia', title: 'Letra Grande', sub: 'CLC' },
      ],
    },
    {
      theme: 'wine', eyebrow: 'Oportunidades', title: 'Libros y Biblias con descuento.',
      text: 'Títulos seleccionados a precios especiales, por tiempo limitado.',
      cta: { label: 'Ver oportunidades', link: '/catalogo', query: { cat: 'oportunidades' } },
      covers: [
        { tone: 'c3', kicker: 'Oferta', title: 'Mi Primera Biblia', sub: 'CLC' },
        { tone: 'c4', kicker: 'Oferta', title: 'Biblia NVI Compacta', sub: 'CLC' },
        { tone: 'c6', kicker: 'Oferta', title: 'Última llamada', sub: 'Libros' },
      ],
    },
    {
      theme: 'blue', eyebrow: 'Librerías CLC', title: 'Reservá en línea, retirá hoy.',
      text: 'Elegí tus libros desde casa y pasá a buscarlos, sin costo de envío, por la librería más cercana.',
      cta: { label: 'Ver sucursales', link: '/sucursales' },
      covers: [
        { tone: 'c5', kicker: 'Retiro gratis', title: 'Elegí', sub: 'En línea' },
        { tone: 'c2', kicker: 'Retiro gratis', title: 'Reservá', sub: 'En 1 clic' },
        { tone: 'c1', kicker: 'Retiro gratis', title: 'Retirá', sub: 'En tu librería' },
      ],
    },
    {
      theme: 'slate', eyebrow: 'Para los más chicos', title: 'Biblias y libros para niños.',
      text: 'Historias, devocionales y Biblias ilustradas para que crezcan conociendo la Palabra.',
      cta: { label: 'Ver para niños', link: '/catalogo', query: { cat: 'ninos' } },
      covers: [
        { tone: 'c3', kicker: 'Niños', title: 'Héroes de la Biblia', sub: 'CLC' },
        { tone: 'c4', kicker: 'Niños', title: 'Biblia Ilustrada', sub: 'CLC' },
        { tone: 'c5', kicker: 'Niños', title: 'Historias para Dormir', sub: 'CLC' },
      ],
    },
  ];

  constructor() {
    const reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      const id = setInterval(() => {
        if (!this.paused()) this.go(this.index() + 1);
      }, 6500);
      inject(DestroyRef).onDestroy(() => clearInterval(id));
    }
  }

  go(i: number): void {
    const n = this.slides.length;
    this.index.set(((i % n) + n) % n);
  }
}
