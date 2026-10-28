import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Banner del Instituto Thompson para el home. */
@Component({
  selector: 'app-thompson-banner',
  imports: [RouterLink],
  template: `
    <section class="block">
      <div class="wrap">
        <div class="band">
          <div class="copy">
            <div class="eyebrow">Ministerio · Inscripciones abiertas</div>
            <h2>Instituto Internacional de la Biblia Thompson</h2>
            <p>Seminarios en línea para pastores y líderes que desean enseñar y predicar la Palabra con claridad. Más de 30 años formando a quienes sirven.</p>
            <div class="cta">
              <a class="btn btn-gold" routerLink="/thompson">Conocé el seminario</a>
              <a class="btn btn-ghost" routerLink="/catalogo" [queryParams]="{ collection: 'thompson' }">Biblias Thompson</a>
            </div>
          </div>
          <div class="art" aria-hidden="true">
            <div class="book"><small>Biblia de</small><b>Referencia Thompson</b><small>CLC</small></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .band { background: linear-gradient(120deg, #3d0f16, #7a1f2b); color: #fff; border-radius: var(--r); padding: 56px; display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 40px; align-items: center; position: relative; overflow: hidden; }
    .band::after { content: ''; position: absolute; right: -90px; top: -130px; width: 340px; height: 340px; border: 1px solid rgba(212, 168, 42, 0.4); border-radius: 50%; }
    h2 { color: #fff; font-size: 40px; margin: 10px 0 14px; max-width: 20ch; }
    p { color: #f0d9dc; max-width: 54ch; }
    .cta { display: flex; gap: 12px; margin-top: 26px; flex-wrap: wrap; }
    .btn-ghost { border-color: rgba(255, 255, 255, 0.5); color: #fff; }
    .btn-ghost:hover { background: #fff; color: var(--wine-700); }
    .art { display: flex; justify-content: center; position: relative; z-index: 1; }
    .book { width: 150px; height: 220px; border-radius: 3px 6px 6px 3px; background: linear-gradient(160deg, #1569a8, #0a2a43); box-shadow: 0 24px 40px rgba(0, 0, 0, 0.45); display: flex; flex-direction: column; justify-content: space-between; padding: 16px 14px 16px 20px; font-family: var(--serif); position: relative; transform: rotate(4deg); }
    .book::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: rgba(0, 0, 0, 0.25); }
    .book b { font-size: 22px; line-height: 1.05; color: var(--gold-500); }
    .book small { font-family: var(--sans); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.85; }
    @media (max-width: 1000px) { .band { grid-template-columns: 1fr; padding: 36px 24px; } .art { display: none; } h2 { font-size: 32px; } }
  `,
})
export class ThompsonBanner {}
