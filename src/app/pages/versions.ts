import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../core/catalog.service';
import { CONTACT } from '../core/contact';

@Component({
  selector: 'app-versions',
  imports: [RouterLink],
  template: `
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span>Biblias por versión</div>
        <h1>Biblias por versión</h1>
        <i class="rule"></i>
        <p class="lead">Cada traducción tiene su estilo. Elegí la versión que mejor te acompañe y explorá las Biblias disponibles.</p>

        <div class="grid2">
          @for (v of versions(); track v.code) {
            <article class="ver">
              <div class="code">{{ v.code }}</div>
              <div class="body">
                <h3>{{ v.name }}</h3>
                <p>{{ v.summary }}</p>
                <div class="foot">
                  <span><b>Ideal para:</b> {{ v.bestFor }}</span>
                  <a class="btn btn-ghost" routerLink="/catalogo" [queryParams]="{ cat: 'biblias', version: v.code }">
                    Ver {{ v.count }} {{ v.count === 1 ? 'Biblia' : 'Biblias' }}
                  </a>
                </div>
              </div>
            </article>
          }
        </div>

        <section class="help">
          <div>
            <h2>¿No sabés cuál elegir?</h2>
            <ul>
              <li><b>Si recién empezás:</b> una versión de lenguaje actual, como la NTV, es más fácil de seguir.</li>
              <li><b>Si estudiás en profundidad:</b> mirá versiones más literales, como la NBLA.</li>
              <li><b>Si tu iglesia usa una versión:</b> conviene la misma, para leer y memorizar en conjunto.</li>
            </ul>
          </div>
          <a class="btn btn-gold" [href]="wa" target="_blank" rel="noopener">Consultanos por WhatsApp</a>
        </section>
      </div>
    </div>
  `,
  styles: `
    .lead { color: var(--ink-2); margin: 20px 0 32px; max-width: 60ch; }
    .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .ver { display: flex; gap: 24px; background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 28px; transition: 0.2s; }
    .ver:hover { border-color: var(--gold-500); box-shadow: var(--shadow-1); }
    .code { flex: none; width: 104px; height: 124px; border-radius: 2px 6px 6px 2px; background: linear-gradient(160deg, var(--navy-700), var(--navy-900)); color: var(--gold-500); font-family: var(--serif); font-size: 28px; font-weight: 700; display: grid; place-items: center; text-align: center; line-height: 1.05; padding: 8px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18); position: relative; }
    .code::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: rgba(0, 0, 0, 0.25); }
    .body { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
    h3 { font-size: 28px; }
    p { color: var(--ink-2); font-size: 15px; }
    .foot { margin-top: auto; padding-top: 10px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; font-size: 13px; color: var(--ink-2); }
    .foot b { color: var(--navy-900); font-weight: 600; }
    .foot .btn { padding: 8px 18px; font-size: 14px; }
    .help { margin-top: 40px; background: var(--gold-100); border-radius: var(--r); padding: 36px 40px; display: flex; justify-content: space-between; gap: 28px; align-items: center; flex-wrap: wrap; }
    .help h2 { font-size: 32px; margin-bottom: 12px; }
    ul { list-style: none; display: grid; gap: 8px; color: var(--ink-2); font-size: 15px; max-width: 62ch; }
    li b { color: var(--navy-900); }
    @media (max-width: 1000px) { .grid2 { grid-template-columns: 1fr; } .ver { flex-direction: column; } .code { width: 100%; height: 80px; } }
  `,
})
export class Versions {
  protected readonly wa = CONTACT.whatsapp;
  readonly versions = toSignal(inject(CatalogService).versions(), { initialValue: [] });
}
