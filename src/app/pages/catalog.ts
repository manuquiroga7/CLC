import { Component, computed, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';
import { CatalogService } from '../core/catalog.service';
import { ProductCard } from '../ui/product-card';

const NAMES: Record<string, string> = {
  libros: 'Libros', biblias: 'Biblias', ninos: 'Niños', mujeres: 'Mujeres',
  jovenes: 'Jóvenes', familia: 'Familia', oportunidades: 'Oportunidades',
};

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, ProductCard],
  template: `
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span>Catálogo</div>
        <h1>{{ title() }}</h1>
        <i class="rule"></i>

        <div class="chips">
          <a routerLink="/catalogo" [class.on]="isAll()">Todo el catálogo <em>{{ countOf('todos') }}</em></a>
          @for (c of cats; track c[0]) {
            <a routerLink="/catalogo" [queryParams]="{ cat: c[0] }" [class.on]="cat() === c[0] && !version() && !collection()">{{ c[1] }} <em>{{ countOf(c[0]) }}</em></a>
          }
        </div>

        @if (cat() === 'biblias' || version()) {
          <div class="chips sub">
            <span class="lbl">Versión</span>
            <a routerLink="/catalogo" [queryParams]="{ cat: 'biblias' }" [class.on]="!version()">Todas</a>
            @for (v of versionCodes; track v) {
              <a routerLink="/catalogo" [queryParams]="{ cat: 'biblias', version: v }" [class.on]="version() === v">{{ v }}</a>
            }
            <a class="more" routerLink="/versiones">¿Cuál elegir?</a>
          </div>
        }
        @if (author()) {
          <div class="chips sub">
            <a class="on clear" routerLink="/catalogo">{{ authorName() }} <span aria-hidden="true">✕</span></a>
            <a class="more" routerLink="/autores">Ver todos los autores</a>
          </div>
        }

        <div class="bar">
          <p class="count">{{ books().length }} {{ books().length === 1 ? 'resultado' : 'resultados' }}</p>
          @if (books().length > 1) {
            <label class="sort">
              <span>Ordenar por</span>
              <select (change)="sort.set($any($event.target).value)" [value]="sort()">
                <option value="rel">Relevancia</option>
                <option value="asc">Precio: menor a mayor</option>
                <option value="desc">Precio: mayor a menor</option>
                <option value="az">Nombre: A–Z</option>
              </select>
            </label>
          }
        </div>
        @if (books().length) {
          <div class="grid">
            @for (b of sorted(); track b.id) { <app-product-card [book]="b" /> }
          </div>
        } @else {
          <div class="panel empty">
            <h2>No encontramos resultados</h2>
            <p>Probá con otro título o autor, o explorá todo el catálogo.</p>
            <a class="btn btn-primary" routerLink="/catalogo">Ver todo</a>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    .chips { display: flex; gap: 8px; flex-wrap: wrap; margin: 28px 0 8px; }
    .chips a { display: inline-flex; align-items: center; min-height: 40px; padding: 8px 16px; border: 1.5px solid var(--stone); border-radius: 99px; font-size: 14px; font-weight: 500; background: #fff; }
    .chips a:hover { border-color: var(--blue-600); }
    .chips a.on { background: var(--navy-700); color: #fff; border-color: var(--navy-700); }
    .chips.sub { margin: 0 0 8px; align-items: center; }
    .chips.sub a { padding: 5px 14px; font-size: 13px; min-height: 40px; }
    .lbl { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-2); margin-right: 4px; }
    .chips .more { border: 0; background: none; color: var(--blue-600); font-weight: 600; }
    .chips .more:hover { text-decoration: underline; }
    .chips em { font-style: normal; font-size: 12px; opacity: 0.6; margin-left: 8px; }
    .bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin: 16px 0 20px; }
    .count { color: var(--ink-2); font-size: 14px; }
    .sort { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--ink-2); }
    .sort select { height: 42px; padding: 0 12px; border: 1.5px solid var(--stone); border-radius: var(--r); background: #fff; font: inherit; font-size: 15px; color: var(--ink); }
    .sort select:focus { outline: none; border-color: var(--blue-600); box-shadow: 0 0 0 3px rgba(21, 105, 168, 0.15); }
    .empty { text-align: center; padding: 56px 24px; }
    .empty h2 { font-size: 32px; } .empty p { color: var(--ink-2); margin: 8px 0 20px; }
  `,
})
export class Catalog {
  private readonly catalog = inject(CatalogService);

  // Se enlazan desde los query params (?q=...&cat=...)
  readonly q = input<string>('');
  readonly cat = input<string>('');
  readonly author = input<string>('');
  readonly version = input<string>('');
  readonly collection = input<string>('');

  readonly cats = Object.entries(NAMES);
  readonly versionCodes = this.catalog.versionCodes();
  readonly authorName = computed(() => this.catalog.authorName(this.author()) ?? '');
  readonly title = computed(() => {
    if (this.q()) return `Resultados para “${this.q()}”`;
    if (this.author()) return this.authorName() ? `Libros de ${this.authorName()}` : 'Autor no encontrado';
    if (this.collection() === 'thompson') return 'Biblias de Referencia Thompson';
    if (this.version()) return `Biblias ${this.version()}`;
    return NAMES[this.cat()] ?? 'Todo el catálogo';
  });

  private readonly counts = this.catalog.counts();
  countOf(slug: string): number {
    return this.counts[slug] ?? 0;
  }
  readonly sort = signal<'rel' | 'asc' | 'desc' | 'az'>('rel');
  readonly isAll = computed(() => !this.q() && !this.cat() && !this.author() && !this.version() && !this.collection());

  readonly sorted = computed(() => {
    const list = [...this.books()];
    switch (this.sort()) {
      case 'asc': return list.sort((a, b) => a.price - b.price);
      case 'desc': return list.sort((a, b) => b.price - a.price);
      case 'az': return list.sort((a, b) => a.title.localeCompare(b.title, 'es'));
      default: return list;
    }
  });

  readonly books = toSignal(
    combineLatest([toObservable(this.q), toObservable(this.cat), toObservable(this.author), toObservable(this.version), toObservable(this.collection)]).pipe(
      switchMap(([q, category, author, version, collection]) => this.catalog.list({ q, category, author, version, collection })),
    ),
    { initialValue: [] },
  );
}
