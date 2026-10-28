import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CONTACT } from './core/contact';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <app-site-header />
    <main><router-outlet /></main>
    <app-site-footer />

    <div class="fabs">
      <button class="top" [class.show]="showTop()" (click)="toTop()" [attr.tabindex]="showTop() ? 0 : -1" aria-label="Volver arriba">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>
      </button>
      <a class="wa" [href]="whatsapp" target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H9l-5 4z"/></svg><span>WhatsApp</span>
      </a>
    </div>
  `,
  styles: `
    .fabs { position: fixed; right: 20px; bottom: 20px; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; z-index: 30; pointer-events: none; }
    .fabs > * { pointer-events: auto; }
    .wa { background: #1f9d55; color: #fff; border-radius: 99px; padding: 12px 20px; font-weight: 600; font-size: 14px; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); display: flex; gap: 8px; align-items: center; }
    .wa:hover { background: #188246; }

    .top { width: 46px; height: 46px; border-radius: 50%; border: 1px solid var(--stone); background: #fff; color: var(--navy-700); display: grid; place-items: center; box-shadow: 0 8px 20px rgba(10, 42, 67, 0.22); opacity: 0; visibility: hidden; transform: translateY(8px); transition: opacity 0.25s, transform 0.25s, visibility 0.25s, background 0.2s, color 0.2s; }
    .top.show { opacity: 1; visibility: visible; transform: none; }
    .top:hover { background: var(--navy-700); border-color: var(--navy-700); color: #fff; }
    .top:focus-visible { outline: 2px solid var(--blue-600); outline-offset: 2px; }

    /* En móvil: solo el ícono de WhatsApp, para no tapar contenido. */
    @media (max-width: 640px) {
      .fabs { right: 14px; bottom: 14px; align-items: center; }
      .wa { width: 54px; height: 54px; padding: 0; justify-content: center; }
      .wa span { display: none; }
    }
    @media (prefers-reduced-motion: reduce) { .top { transition: none; } }
  `,
})
export class App {
  protected readonly whatsapp = CONTACT.whatsapp;
  protected readonly showTop = signal(false);

  onScroll(): void {
    this.showTop.set(window.scrollY > 500);
  }

  toTop(): void {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
