import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../core/models';
import { CartService } from '../core/cart.service';
import { UyuPipe } from '../core/uyu.pipe';
import { Cover } from './cover';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, Cover, UyuPipe],
  template: `
    <article class="card">
      @if (book().oldPrice) { <span class="tag">Oferta</span> }
      <a [routerLink]="['/libro', book().id]" class="cover" [attr.aria-label]="book().title" [attr.tabindex]="focusable() ? null : -1">
        <app-cover [book]="book()" />
      </a>
      <h3><a [routerLink]="['/libro', book().id]" [attr.tabindex]="focusable() ? null : -1">{{ book().title }}</a></h3>
      <div class="author">{{ book().author }}</div>
      <div class="fmt">{{ book().format }}</div>
      <div class="price">
        {{ book().price | uyu }}
        @if (book().oldPrice) { <s>{{ book().oldPrice! | uyu }}</s> }
      </div>
      <button class="btn btn-primary" (click)="add()" [attr.tabindex]="focusable() ? null : -1">
        {{ added() ? 'Agregado ✓' : 'Agregar al carrito' }}
      </button>
    </article>
  `,
  styles: `
    .card { background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 16px; display: flex; flex-direction: column; transition: 0.2s; position: relative; height: 100%; }
    .card:hover { box-shadow: var(--shadow-2); border-color: #d9d2c5; }
    .cover { display: block; height: 210px; margin-bottom: 16px; }
    h3 { font-family: var(--sans); font-size: 15px; font-weight: 600; line-height: 1.3; color: var(--ink); min-height: 40px; }
    h3 a:hover { color: var(--blue-600); }
    .author { font-size: 13px; color: var(--ink-2); }
    .fmt { font-size: 12px; color: var(--ink-2); margin-bottom: 8px; }
    .price { font-weight: 700; color: var(--wine-700); font-size: 18px; margin-bottom: 14px; }
    .price s { font-weight: 400; font-size: 13px; color: var(--ink-2); margin-left: 6px; }
    .tag { position: absolute; top: 12px; left: 12px; background: var(--wine-700); color: #fff; font-size: 12px; font-weight: 600; padding: 3px 10px; border-radius: 99px; z-index: 2; }
    .btn { margin-top: auto; padding: 10px; font-size: 14px; }
  `,
})
export class ProductCard {
  private readonly cart = inject(CartService);
  readonly book = input.required<Book>();
  /** false en las copias de un carrusel infinito: se pueden tocar, pero no recibir foco con Tab. */
  readonly focusable = input(true);
  readonly added = signal(false);

  add(): void {
    this.cart.add(this.book());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1600);
  }
}
