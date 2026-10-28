import { Component, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { CartService } from '../core/cart.service';
import { CatalogService } from '../core/catalog.service';
import { UyuPipe } from '../core/uyu.pipe';
import { Cover } from '../ui/cover';
import { ProductCard } from '../ui/product-card';

@Component({
  selector: 'app-product',
  imports: [RouterLink, UyuPipe, Cover, ProductCard],
  template: `
    @if (book(); as b) {
      <div class="page">
        <div class="wrap">
          <div class="crumbs">
            <a routerLink="/">Inicio</a><span>/</span>
            <a routerLink="/catalogo" [queryParams]="{ cat: b.category }">{{ b.category }}</a><span>/</span>{{ b.title }}
          </div>

          <div class="detail">
            <div class="media"><div class="cover"><app-cover [book]="b" /></div></div>

            <div class="info">
              @if (b.oldPrice) { <span class="tag">Oferta</span> }
              <h1>{{ b.title }}</h1>
              <div class="author">por {{ b.author }}</div>
              <i class="rule"></i>

              <div class="price">
                {{ b.price | uyu }}
                @if (b.oldPrice) { <s>{{ b.oldPrice | uyu }}</s> }
              </div>
              <div class="stock">● En stock · {{ b.format }}</div>

              <div class="buy">
                <div class="qty">
                  <button (click)="qty.set(max(1, qty() - 1))" aria-label="Menos">−</button>
                  <span>{{ qty() }}</span>
                  <button (click)="qty.set(qty() + 1)" aria-label="Más">+</button>
                </div>
                <button class="btn btn-primary" (click)="add()">{{ added() ? 'Agregado ✓' : 'Agregar al carrito' }}</button>
                <button class="btn btn-gold" (click)="buyNow()">Comprar ahora</button>
              </div>

              <ul class="perks">
                <li><b>Retiro en librería</b> sin costo — disponible hoy en sucursales seleccionadas</li>
                <li><b>Envío a todo el país</b> con seguimiento</li>
                <li><b>Consultanos por WhatsApp</b> si necesitás asesoramiento</li>
              </ul>

              <h3>Descripción</h3>
              <p class="desc">{{ b.description }}</p>

              <dl class="specs">
                <div><dt>Editorial</dt><dd>{{ b.publisher }}</dd></div>
                <div><dt>Páginas</dt><dd>{{ b.pages }}</dd></div>
                <div><dt>Formato</dt><dd>{{ b.format }}</dd></div>
                @if (b.version) { <div><dt>Versión</dt><dd><a routerLink="/catalogo" [queryParams]="{ cat: 'biblias', version: b.version }">{{ b.version }}</a></dd></div> }
                <div><dt>ISBN</dt><dd>{{ b.isbn }}</dd></div>
              </dl>
            </div>
          </div>

          <section class="block">
            <div class="sec-head"><div><h2>También te puede interesar</h2><i class="rule"></i></div></div>
            <div class="grid">
              @for (r of related(); track r.id) { <app-product-card [book]="r" /> }
            </div>
          </section>
        </div>
      </div>
    } @else {
      <div class="page"><div class="wrap panel nf"><h2>Libro no encontrado</h2><a class="btn btn-primary" routerLink="/catalogo">Volver al catálogo</a></div></div>
    }
  `,
  styles: `
    .detail { display: grid; grid-template-columns: 420px 1fr; gap: 64px; align-items: start; }
    .media { position: sticky; top: 100px; background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 48px; }
    .cover { height: 440px; max-width: 300px; margin: 0 auto; }
    .info h1 { font-size: 48px; margin-top: 8px; }
    .author { color: var(--ink-2); margin-top: 6px; }
    .tag { background: var(--wine-700); color: #fff; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 99px; }
    .price { font-weight: 700; color: var(--wine-700); font-size: 32px; margin-top: 24px; }
    .price s { font-weight: 400; font-size: 16px; color: var(--ink-2); margin-left: 10px; }
    .stock { color: var(--ok); font-size: 14px; font-weight: 500; margin: 4px 0 24px; }
    .buy { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .qty { display: inline-flex; align-items: center; border: 1.5px solid var(--stone); border-radius: var(--r); background: #fff; }
    .qty button { width: 40px; height: 46px; border: 0; background: none; font-size: 20px; color: var(--navy-700); }
    .qty span { min-width: 32px; text-align: center; font-weight: 600; }
    .buy .btn { height: 48px; padding: 0 26px; }
    .perks { margin: 28px 0; background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 20px 24px; display: grid; gap: 10px; font-size: 14px; color: var(--ink-2); }
    .perks b { color: var(--navy-900); }
    .info h3 { font-size: 28px; margin-bottom: 8px; }
    .desc { color: var(--ink-2); max-width: 60ch; }
    .specs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 32px; margin-top: 24px; }
    .specs div { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--stone); font-size: 14px; }
    .specs dt { color: var(--ink-2); } .specs dd { font-weight: 500; }
    .nf { text-align: center; padding: 56px; } .nf h2 { margin-bottom: 20px; }
    @media (max-width: 1000px) {
      .detail { grid-template-columns: 1fr; gap: 32px; }
      .media { position: static; padding: 28px; }
      .info h1 { font-size: 38px; }
      .specs { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .media { padding: 20px; }
      .cover { height: 260px; max-width: 180px; }
      .info h1 { font-size: 32px; }
      .price { font-size: 28px; margin-top: 16px; }
      .buy { display: grid; grid-template-columns: auto 1fr; gap: 10px; }
      .buy .btn { grid-column: 1 / -1; width: 100%; }
      .buy .qty { grid-column: 1 / -1; justify-self: start; }
      .perks { padding: 16px 18px; }
    }
  `,
})
export class Product {
  private readonly catalog = inject(CatalogService);
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly qty = signal(1);
  readonly added = signal(false);
  readonly max = Math.max;

  readonly book = toSignal(toObservable(this.id).pipe(switchMap((id) => this.catalog.get(+id))));
  readonly related = toSignal(
    toObservable(this.id).pipe(
      switchMap(() => this.catalog.list()),
      map((l) => l.filter((b) => b.id !== +this.id()).slice(0, 5)),
    ),
    { initialValue: [] },
  );

  add(): void {
    const b = this.book();
    if (!b) return;
    this.cart.add(b, this.qty());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1600);
  }

  buyNow(): void {
    const b = this.book();
    if (!b) return;
    this.cart.add(b, this.qty());
    this.router.navigate(['/checkout']);
  }
}
