import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { CatalogService } from '../core/catalog.service';
import { PostCard } from '../ui/post-card';

@Component({
  selector: 'app-news-detail',
  imports: [RouterLink, PostCard],
  template: `
    @if (post(); as p) {
      <article class="page">
        <div class="wrap">
          <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span><a routerLink="/noticias">Noticias</a><span>/</span>{{ p.category }}</div>
        </div>

        <header class="banner" [class]="'banner ' + p.tone">
          <div class="wrap">
            <span class="chip">{{ p.category }}</span>
            <h1>{{ p.title }}</h1>
            <time>{{ p.date }}</time>
          </div>
        </header>

        <div class="wrap">
          <div class="body">
            <p class="lead">{{ p.excerpt }}</p>
            @for (para of p.body; track $index) { <p>{{ para }}</p> }

            @if (p.link) {
              <a class="more" [routerLink]="p.link">
                <b>Conocé más sobre el Instituto</b>
                <span>Objetivos, requisitos e inscripción →</span>
              </a>
            }

            <div class="share">
              <span>Compartir</span>
              <a [href]="wa(p.title)" target="_blank" rel="noopener" class="btn btn-ghost">WhatsApp</a>
              <a routerLink="/noticias" class="back">← Volver a noticias</a>
            </div>
          </div>

          <section class="block">
            <div class="sec-head"><div><h2>Seguí leyendo</h2><i class="rule"></i></div><a routerLink="/noticias">Ver todas →</a></div>
            <div class="grid3">
              @for (r of related(); track r.id) { <app-post-card [post]="r" /> }
            </div>
          </section>
        </div>
      </article>
    } @else {
      <div class="page"><div class="wrap panel nf"><h2>Nota no encontrada</h2><a class="btn btn-primary" routerLink="/noticias">Ver noticias</a></div></div>
    }
  `,
  styles: `
    .banner { color: #fff; padding: 64px 0 56px; margin-top: 8px; }
    .c1 { background: linear-gradient(120deg, #143429, #2a5d4b); }
    .c2 { background: linear-gradient(120deg, #3d0f16, #7a1f2b); }
    .c3 { background: linear-gradient(120deg, #7e6210, #b8901f); }
    .c4 { background: linear-gradient(120deg, #0a2a43, #08416c); }
    .c5 { background: linear-gradient(120deg, #241a3d, #4b3a6b); }
    .c6 { background: linear-gradient(120deg, #14191e, #37424d); }
    .banner .wrap { max-width: 860px; }
    .chip { display: inline-block; background: rgba(255, 255, 255, 0.92); color: var(--navy-900); font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 12px; border-radius: 99px; }
    h1 { color: #fff; font-size: clamp(36px, 5vw, 56px); margin: 18px 0 14px; }
    time { color: rgba(255, 255, 255, 0.8); font-size: 14px; }
    .body { max-width: 720px; margin: 48px auto 0; }
    .body p { font-size: 18px; line-height: 1.75; color: var(--ink); margin-bottom: 20px; }
    .body .lead { font-family: var(--serif); font-size: 26px; line-height: 1.35; color: var(--navy-900); border-left: 3px solid var(--gold-500); padding-left: 20px; margin-bottom: 28px; }
    .more { display: flex; flex-direction: column; gap: 2px; background: var(--gold-100); border: 1px solid #ecdcaa; border-radius: var(--r); padding: 20px 24px; margin-top: 8px; transition: 0.2s; }
    .more:hover { border-color: var(--gold-500); transform: translateX(4px); }
    .more b { font-family: var(--serif); font-size: 24px; color: var(--navy-900); font-weight: 600; }
    .more span { font-size: 14px; color: var(--blue-600); font-weight: 600; }
    .share { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; border-top: 1px solid var(--stone); margin-top: 36px; padding-top: 24px; }
    .share span { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink-2); }
    .back { margin-left: auto; color: var(--blue-600); font-weight: 600; font-size: 14px; padding: 12px 0; }
    .back:hover { text-decoration: underline; }
    .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .nf { text-align: center; padding: 56px; display: grid; gap: 16px; justify-items: center; }
    @media (max-width: 1000px) { .grid3 { grid-template-columns: 1fr; } .body .lead { font-size: 22px; } }
  `,
})
export class NewsDetail {
  private readonly catalog = inject(CatalogService);

  readonly id = input.required<string>();
  readonly post = toSignal(toObservable(this.id).pipe(switchMap((id) => this.catalog.post(+id))));
  readonly related = toSignal(
    combineLatest([toObservable(this.id), this.catalog.posts()]).pipe(map(([id, l]) => l.filter((p) => p.id !== +id).slice(0, 3))),
    { initialValue: [] },
  );

  wa(title: string): string {
    return 'https://wa.me/?text=' + encodeURIComponent(`${title} — ${location.href}`);
  }
}
