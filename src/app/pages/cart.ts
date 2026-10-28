import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/cart.service';
import { UyuPipe } from '../core/uyu.pipe';
import { Cover } from '../ui/cover';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, UyuPipe, Cover],
  template: `
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span>Carrito</div>
        <h1>Tu carrito</h1>
        <i class="rule"></i>

        @if (cart.items().length) {
          <div class="layout">
            <div class="list">
              @for (i of cart.items(); track i.book.id) {
                <div class="row">
                  <a [routerLink]="['/libro', i.book.id]" class="thumb"><app-cover [book]="i.book" /></a>
                  <div class="meta">
                    <a [routerLink]="['/libro', i.book.id]" class="t">{{ i.book.title }}</a>
                    <span>{{ i.book.author }} · {{ i.book.format }}</span>
                    <button class="rm" (click)="cart.remove(i.book.id)">Quitar</button>
                  </div>
                  <div class="qty">
                    <button (click)="cart.setQty(i.book.id, i.qty - 1)" aria-label="Menos">−</button>
                    <span>{{ i.qty }}</span>
                    <button (click)="cart.setQty(i.book.id, i.qty + 1)" aria-label="Más">+</button>
                  </div>
                  <div class="line">{{ i.book.price * i.qty | uyu }}</div>
                </div>
              }
            </div>

            <aside class="panel summary">
              <h3>Resumen</h3>
              <div class="r"><span>Subtotal</span><b>{{ cart.subtotal() | uyu }}</b></div>
              <div class="r"><span>Envío</span><span>Se calcula al finalizar</span></div>
              <div class="r total"><span>Total</span><b>{{ cart.subtotal() | uyu }}</b></div>
              <a class="btn btn-gold btn-block" routerLink="/checkout">Finalizar compra</a>
              <a class="btn btn-ghost btn-block" routerLink="/catalogo">Seguir comprando</a>
              <p class="hint">Retirá gratis en la librería CLC más cercana.</p>
            </aside>
          </div>
        } @else {
          <div class="panel empty">
            <h2>Tu carrito está vacío</h2>
            <p>Explorá nuestro catálogo y encontrá tu próxima lectura.</p>
            <a class="btn btn-primary" routerLink="/catalogo">Ver catálogo</a>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    .layout { display: grid; grid-template-columns: 1fr 360px; gap: 32px; margin-top: 32px; align-items: start; }
    .list { background: #fff; border: 1px solid var(--stone); border-radius: var(--r); }
    .row { display: grid; grid-template-columns: 84px 1fr auto 110px; gap: 20px; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--stone); }
    .row:last-child { border: 0; }
    .thumb { height: 120px; display: block; }
    .meta { display: flex; flex-direction: column; gap: 2px; font-size: 14px; color: var(--ink-2); }
    .t { font-weight: 600; color: var(--ink); font-size: 16px; } .t:hover { color: var(--blue-600); }
    .rm { align-self: flex-start; background: none; border: 0; color: var(--wine-700); font-size: 14px; padding: 10px 12px 10px 0; text-decoration: underline; }
    .qty { display: inline-flex; align-items: center; border: 1.5px solid var(--stone); border-radius: var(--r); }
    .qty button { width: 44px; height: 44px; border: 0; background: none; font-size: 18px; color: var(--navy-700); }
    .qty span { min-width: 28px; text-align: center; font-weight: 600; }
    .line { text-align: right; font-weight: 700; color: var(--wine-700); }
    .summary { position: sticky; top: 100px; display: grid; gap: 14px; }
    .summary h3 { font-size: 28px; }
    .r { display: flex; justify-content: space-between; font-size: 14px; color: var(--ink-2); }
    .r b { color: var(--ink); }
    .total { border-top: 1px solid var(--stone); padding-top: 14px; font-size: 18px; color: var(--ink); }
    .total b { color: var(--wine-700); font-size: 22px; }
    .hint { font-size: 13px; color: var(--ink-2); text-align: center; }
    .empty { text-align: center; padding: 56px 24px; margin-top: 32px; }
    .empty h2 { font-size: 32px; } .empty p { color: var(--ink-2); margin: 8px 0 20px; }
    @media (max-width: 1000px) {
      .layout { grid-template-columns: minmax(0, 1fr); }
      .summary { position: static; }
    }
    @media (max-width: 720px) {
      .row { grid-template-columns: 76px minmax(0, 1fr); grid-template-areas: 'thumb meta' 'thumb qty' 'thumb line'; gap: 6px 16px; padding: 16px; align-items: start; }
      .thumb { grid-area: thumb; height: 112px; }
      .meta { grid-area: meta; }
      .qty { grid-area: qty; justify-self: start; }
      .line { grid-area: line; text-align: left; font-size: 17px; }
      .t { font-size: 16px; line-height: 1.3; padding: 4px 0; }
    }
  `,
})
export class Cart {
  protected readonly cart = inject(CartService);
}
