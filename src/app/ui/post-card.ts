import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../core/models';

@Component({
  selector: 'app-post-card',
  imports: [RouterLink],
  template: `
    <a class="post" [class.lead]="featured()" [class.wide]="wide()" [routerLink]="['/noticias', post().id]">
      <div class="img" [class]="'img ' + post().tone"><span>{{ post().category }}</span></div>
      <div class="t">
        <small>{{ post().date }}</small>
        <h3>{{ post().title }}</h3>
        <p>{{ post().excerpt }}</p>
        <b>Leer más →</b>
      </div>
    </a>
  `,
  styles: `
    :host { display: block; height: 100%; }
    .post { background: #fff; border: 1px solid var(--stone); border-radius: var(--r); overflow: hidden; display: flex; flex-direction: column; transition: 0.2s; height: 100%; }
    .post:hover { box-shadow: var(--shadow-2); transform: translateY(-3px); }
    .img { height: 180px; display: flex; align-items: flex-end; padding: 16px; flex: none; }
    .lead .img { height: 240px; }
    .img span { background: rgba(255, 255, 255, 0.92); color: var(--navy-900); font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 99px; }
    .c1 { background: linear-gradient(135deg, #2a5d4b, #143429); }
    .c2 { background: linear-gradient(135deg, #7a1f2b, #a8404c); }
    .c3 { background: linear-gradient(135deg, #b8901f, #d4a82a); }
    .c4 { background: linear-gradient(135deg, #08416c, #1569a8); }
    .c5 { background: linear-gradient(135deg, #4b3a6b, #7a5fa8); }
    .c6 { background: linear-gradient(135deg, #14191e, #37424d); }
    @media (min-width: 1001px) {
      .wide { flex-direction: row; }
      .wide .img { width: 46%; height: auto; min-height: 300px; }
      .wide .t { justify-content: center; padding: 40px; }
      .wide h3 { font-size: 40px; }
      .wide p { font-size: 16px; }
      .wide b { margin-top: 12px; }
    }
    .t { padding: 22px; display: flex; flex-direction: column; gap: 6px; flex: 1; }
    small { color: var(--ink-2); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; }
    h3 { font-size: 28px; }
    .lead h3 { font-size: 34px; }
    p { font-size: 14px; color: var(--ink-2); }
    b { margin-top: auto; padding-top: 10px; color: var(--blue-600); font-size: 14px; }
  `,
})
export class PostCard {
  readonly post = input.required<Post>();
  readonly featured = input(false);
  /** Formato horizontal (imagen a la izquierda), para el destacado del listado. */
  readonly wide = input(false);
}
