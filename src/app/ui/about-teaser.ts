import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Bloque "Conocé CLC" para el home. */
@Component({
  selector: 'app-about-teaser',
  imports: [RouterLink],
  template: `
    <section class="block">
      <div class="wrap">
        <div class="band">
          <div class="copy">
            <div class="eyebrow">Conocé CLC</div>
            <h2>Más que una cadena de librerías</h2>
            <p>Somos un ministerio internacional que desea ver vidas cambiadas a través de la lectura de un libro cristiano. Cada compra apoya la obra misionera y el trabajo social en Uruguay y en el mundo.</p>
            <a class="btn btn-gold" routerLink="/nosotros">Conocé nuestro ministerio</a>
          </div>
          <div class="facts">
            <div><b>1941</b><span>Fundación</span></div>
            <div><b>48</b><span>Países</span></div>
            <div><b>+180</b><span>Librerías</span></div>
            <div><b>18</b><span>Editoriales</span></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .band { background: linear-gradient(120deg, var(--navy-900), var(--navy-700)); color: #fff; border-radius: var(--r); padding: 56px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; position: relative; overflow: hidden; }
    .band::after { content: ''; position: absolute; right: -90px; bottom: -130px; width: 320px; height: 320px; border: 1px solid rgba(212, 168, 42, 0.35); border-radius: 50%; }
    h2 { color: #fff; font-size: 42px; margin: 10px 0 14px; }
    p { color: #cfdce8; max-width: 52ch; margin-bottom: 26px; }
    .facts { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; position: relative; z-index: 1; }
    .facts b { display: block; font-family: var(--serif); font-size: 52px; line-height: 1; color: var(--gold-500); }
    .facts span { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #b4c4d2; }
    @media (max-width: 1000px) { .band { grid-template-columns: 1fr; padding: 36px 24px; gap: 32px; } h2 { font-size: 34px; } }
  `,
})
export class AboutTeaser {}
