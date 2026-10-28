import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { CatalogService } from '../core/catalog.service';
import { PostCard } from '../ui/post-card';

@Component({
  selector: 'app-news',
  imports: [RouterLink, PostCard],
  template: `
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span>Noticias</div>
        <h1>Noticias</h1>
        <i class="rule"></i>
        <p class="lead">Novedades del ministerio, recursos y recomendaciones de CLC Uruguay.</p>

        <div class="chips">
          <a routerLink="/noticias" [class.on]="!cat()">Todas</a>
          @for (c of categories; track c) {
            <a routerLink="/noticias" [queryParams]="{ cat: c }" [class.on]="cat() === c">{{ c }}</a>
          }
        </div>

        @if (posts().length) {
          @if (featured(); as f) {
            <div class="featured"><app-post-card [post]="f" [featured]="true" [wide]="true" /></div>
          }
          <div class="grid3">
            @for (p of rest(); track p.id) { <app-post-card [post]="p" /> }
          </div>
        } @else {
          <div class="panel empty"><h2>No hay notas en esta categoría</h2><a class="btn btn-primary" routerLink="/noticias">Ver todas</a></div>
        }
      </div>
    </div>
  `,
  styles: `
    .lead { color: var(--ink-2); margin: 20px 0 8px; }
    .chips { display: flex; gap: 8px; flex-wrap: wrap; margin: 20px 0 28px; }
    .chips a { display: inline-flex; align-items: center; min-height: 40px; padding: 8px 16px; border: 1.5px solid var(--stone); border-radius: 99px; font-size: 14px; font-weight: 500; background: #fff; }
    .chips a:hover { border-color: var(--blue-600); }
    .chips a.on { background: var(--navy-700); color: #fff; border-color: var(--navy-700); }
    .featured { margin-bottom: 24px; }
    .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .empty { text-align: center; padding: 48px 24px; display: grid; gap: 16px; justify-items: center; }
    @media (max-width: 1000px) { .grid3 { grid-template-columns: 1fr; } }
  `,
})
export class News {
  private readonly catalog = inject(CatalogService);

  /** Se enlaza desde el query param ?cat= */
  readonly cat = input<string>('');
  readonly categories = this.catalog.postCategories();

  readonly posts = toSignal(toObservable(this.cat).pipe(switchMap((c) => this.catalog.posts(c))), { initialValue: [] });
  readonly featured = computed(() => (this.cat() ? null : (this.posts()[0] ?? null)));
  readonly rest = computed(() => (this.featured() ? this.posts().slice(1) : this.posts()));
}
