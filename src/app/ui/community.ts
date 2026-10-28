import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SOCIAL } from '../core/links';

/** Bloque "Comunidad": video del canal de YouTube + redes sociales. */
@Component({
  selector: 'app-community',
  template: `
    <section class="block">
      <div class="wrap">
        <div class="sec-head"><div><h2>Seguinos en redes</h2><i class="rule"></i></div></div>
        <div class="grid2">
          <div class="video">
            <iframe
              [src]="embed"
              title="Canal de YouTube de CLC Uruguay"
              loading="lazy"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
          <div class="nets">
            <p>Videos, devocionales, novedades y recomendaciones de la comunidad CLC Uruguay.</p>
            <a class="net" [href]="s.youtube" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor"/></svg>
              <div><b>YouTube</b><span>Mirá nuestro canal</span></div><i>→</i>
            </a>
            <a class="net" [href]="s.instagram" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor"/></svg>
              <div><b>Instagram</b><span>&#64;clcuruguay</span></div><i>→</i>
            </a>
            <a class="net" [href]="s.facebook" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg>
              <div><b>Facebook</b><span>clcuruguay</span></div><i>→</i>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid2 { display: grid; grid-template-columns: 1.5fr 1fr; gap: 32px; align-items: stretch; }
    .video { position: relative; aspect-ratio: 16 / 9; border-radius: var(--r); overflow: hidden; background: var(--navy-900); box-shadow: var(--shadow-2); }
    iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
    .nets { display: flex; flex-direction: column; gap: 12px; justify-content: center; }
    .nets p { color: var(--ink-2); margin-bottom: 6px; }
    .net { display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 16px 20px; transition: 0.2s; }
    .net:hover { border-color: var(--gold-500); transform: translateX(4px); box-shadow: var(--shadow-1); }
    .net svg { width: 30px; height: 30px; color: var(--navy-700); flex: none; }
    .net div { flex: 1; display: flex; flex-direction: column; line-height: 1.3; }
    .net b { font-family: var(--serif); font-size: 22px; color: var(--navy-900); font-weight: 600; }
    .net span { font-size: 13px; color: var(--ink-2); }
    .net i { font-style: normal; color: var(--blue-600); font-size: 20px; }
    @media (max-width: 1000px) { .grid2 { grid-template-columns: 1fr; } }
  `,
})
export class Community {
  protected readonly s = SOCIAL;
  protected readonly embed = inject(DomSanitizer).bypassSecurityTrustResourceUrl(SOCIAL.youtubeUploadsEmbed);
}
