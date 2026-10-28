import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CatalogService } from '../core/catalog.service';
import { PostCard } from './post-card';

@Component({
  selector: 'app-news-section',
  imports: [RouterLink, PostCard],
  template: `
    <section class="block">
      <div class="wrap">
        <div class="sec-head">
          <div><h2>Últimas noticias</h2><i class="rule"></i></div>
          <a routerLink="/noticias">Ver todas →</a>
        </div>
        <div class="posts">
          @for (p of posts(); track p.id; let i = $index) {
            <app-post-card [post]="p" [featured]="i === 0" />
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .posts { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 24px; }
    @media (max-width: 1000px) { .posts { grid-template-columns: 1fr; } }
  `,
})
export class NewsSection {
  readonly posts = toSignal(inject(CatalogService).posts().pipe(map((l) => l.slice(0, 3))), { initialValue: [] });
}
