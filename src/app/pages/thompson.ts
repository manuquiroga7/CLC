import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../core/catalog.service';
import { CONTACT } from '../core/contact';
import { ProductCard } from '../ui/product-card';

/** Página web oficial del Seminario (según clcuruguay.com). */
const ENROLL_URL = 'https://iibtamerica.com/inscripciones/';

@Component({
  selector: 'app-thompson',
  imports: [RouterLink, ProductCard],
  template: `
    <section class="hero">
      <div class="wrap">
        <div class="eyebrow">Ministerio</div>
        <h1>Instituto Internacional de la Biblia Thompson</h1>
        <p>Seminarios para entrenar y equipar a pastores y líderes a enseñar y predicar la Palabra de Dios con claridad y centrados en Cristo.</p>
        <span class="open"><i></i> Inscripciones abiertas · modalidad en línea</span>
        <div class="cta">
          <a class="btn btn-gold" [href]="enroll" target="_blank" rel="noopener">Inscribirme al seminario</a>
          <a class="btn btn-ghost" [href]="wa" target="_blank" rel="noopener">Consultar por WhatsApp</a>
        </div>
      </div>
    </section>

    <div class="facts">
      <div class="wrap">
        <div><b>+30</b><span>años de seminarios</span></div>
        <div><b>En línea</b><span>modalidad actual</span></div>
        <div><b>Diploma</b><span>de participación</span></div>
      </div>
    </div>

    <section class="block">
      <div class="wrap">
        <div class="sec-head"><div><h2>Objetivos del seminario</h2><i class="rule"></i></div></div>
        <div class="goals">
          @for (g of goals; track g.title; let i = $index) {
            <article class="goal">
              <span>{{ i + 1 < 10 ? '0' : '' }}{{ i + 1 }}</span>
              <h3>{{ g.title }}</h3>
              <p>{{ g.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="block">
      <div class="wrap two">
        <article class="panel">
          <div class="eyebrow gold">Incluye</div>
          <ul>
            <li>Diploma de participación*</li>
            <li>Manual de la Biblia</li>
            <li>Material de apoyo</li>
            <li>Biblia Thompson en piel</li>
          </ul>
          <p class="note">*El diploma se entrega solo a quienes concluyen todo el seminario.</p>
        </article>
        <article class="panel">
          <div class="eyebrow gold">Requisitos</div>
          <ul>
            <li>Ser puntual</li>
            <li>Realizar el pago previo total de la inscripción</li>
            <li>Asistir a todo el evento</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="block">
      <div class="wrap">
        <div class="sec-head"><div><h2>Cómo inscribirte</h2><i class="rule"></i></div></div>
        <div class="steps">
          <article><span>01</span><h3>Inscribite</h3><p>Completá tu inscripción en la web oficial del Seminario.</p></article>
          <article><span>02</span><h3>Realizá el pago</h3><p>La inscripción requiere el pago total previo.</p></article>
          <article><span>03</span><h3>Participá y recibí tu diploma</h3><p>Asistí a todo el seminario y recibí tu diploma de participación.</p></article>
        </div>
        <a class="btn btn-primary enroll" [href]="enroll" target="_blank" rel="noopener">Ir a la inscripción →</a>
      </div>
    </section>

    <section class="block">
      <div class="wrap">
        <div class="sec-head">
          <div><h2>Biblias de Referencia Thompson</h2><i class="rule"></i></div>
          <a routerLink="/catalogo" [queryParams]="{ collection: 'thompson' }">Ver todas →</a>
        </div>
        <div class="prods">
          @for (b of bibles(); track b.id) { <app-product-card [book]="b" /> }
        </div>
      </div>
    </section>

    <section class="block">
      <div class="wrap">
        <div class="contact">
          <div>
            <h2>¿Querés más información?</h2>
            <p>Escribinos o llamanos y te contamos las próximas fechas del seminario.</p>
          </div>
          <div class="chan">
            <a [href]="c.phoneHref">{{ c.phone }}</a>
            <a [href]="'tel:+59891744081'">091 744 081</a>
            <a [href]="'mailto:' + c.email">{{ c.email }}</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero { background: linear-gradient(120deg, #0a2a43, #08416c); color: #fff; position: relative; overflow: hidden; }
    .hero::after { content: ''; position: absolute; right: -120px; top: -140px; width: 440px; height: 440px; border: 1px solid rgba(212, 168, 42, 0.35); border-radius: 50%; }
    .hero .wrap { padding-top: 80px; padding-bottom: 80px; position: relative; z-index: 1; }
    .hero h1 { color: #fff; font-size: clamp(38px, 5.5vw, 62px); margin: 14px 0 18px; max-width: 18ch; }
    .hero p { font-size: 18px; color: #cfdce8; max-width: 56ch; }
    .open { display: inline-flex; align-items: center; gap: 10px; margin-top: 24px; font-size: 13px; font-weight: 600; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 99px; padding: 6px 14px; }
    .open i { width: 8px; height: 8px; border-radius: 50%; background: #4ade80; }
    .cta { display: flex; gap: 14px; margin-top: 28px; flex-wrap: wrap; }
    .hero .btn-ghost { border-color: rgba(255, 255, 255, 0.5); color: #fff; }
    .hero .btn-ghost:hover { background: #fff; color: var(--navy-900); }

    .facts { background: #fff; border-bottom: 1px solid var(--stone); }
    .facts .wrap { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding-top: 28px; padding-bottom: 28px; text-align: center; }
    .facts b { display: block; font-family: var(--serif); font-size: 44px; line-height: 1; color: var(--navy-700); }
    .facts span { font-size: 13px; color: var(--ink-2); text-transform: uppercase; letter-spacing: 0.1em; }

    .goals { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .goal { background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 24px; }
    .goal span { font-family: var(--serif); font-size: 36px; color: var(--gold-500); line-height: 1; }
    .goal h3 { font-size: 24px; margin: 6px 0; }
    .goal p { font-size: 14px; color: var(--ink-2); }

    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .two .panel { padding: 32px; }
    .gold { color: var(--wine-700); }
    ul { list-style: none; display: grid; gap: 12px; margin-top: 14px; }
    li { padding-left: 24px; position: relative; font-size: 16px; }
    li::before { content: '✓'; position: absolute; left: 0; color: var(--gold-600); font-weight: 700; }
    .note { margin-top: 16px; font-size: 13px; color: var(--ink-2); }

    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .steps article { border-top: 2px solid var(--gold-500); padding-top: 18px; }
    .steps span { font-family: var(--serif); font-size: 18px; color: var(--ink-2); }
    .steps h3 { font-size: 28px; margin: 4px 0 8px; }
    .steps p { color: var(--ink-2); font-size: 15px; }
    .enroll { margin-top: 28px; }

    .prods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

    .contact { background: var(--navy-900); color: #fff; border-radius: var(--r); padding: 40px 44px; display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
    .contact h2 { color: #fff; font-size: 34px; }
    .contact p { color: #c3d3e0; margin-top: 6px; }
    .chan { display: flex; flex-direction: column; gap: 6px; font-weight: 500; }
    .chan a { padding: 6px 0; }
    .chan a:hover { color: var(--gold-500); text-decoration: underline; }

    @media (max-width: 1000px) {
      .goals { grid-template-columns: repeat(2, 1fr); }
      .two, .steps, .prods { grid-template-columns: 1fr; }
      .facts .wrap { gap: 8px; } .facts b { font-size: 28px; }
      .contact { padding: 28px 24px; }
    }
  `,
})
export class Thompson {
  protected readonly c = CONTACT;
  protected readonly enroll = ENROLL_URL;
  protected readonly wa = CONTACT.whatsapp;
  readonly bibles = toSignal(inject(CatalogService).list({ collection: 'thompson' }), { initialValue: [] });

  readonly goals = [
    { title: 'Bosquejos temáticos', text: 'Aprender a elaborar bosquejos temáticos para la enseñanza.' },
    { title: 'Todos los recursos', text: 'Sacarle el máximo provecho a todos los recursos de la Biblia.' },
    { title: 'Sermones cristocéntricos', text: 'Predicar sermones 100% centrados en Cristo.' },
    { title: 'Pastores equipados', text: 'Entrenar a pastores para enseñar y predicar con la Biblia Thompson, motivándolos al estudio permanente.' },
    { title: 'Dependencia del Espíritu', text: 'Reconocer la necesidad indispensable del Espíritu Santo en cada paso de la comunicación bíblica.' },
    { title: 'Iglesia y sociedad', text: 'Fortalecer a la iglesia y a la sociedad con enseñanza sobre el matrimonio, la familia, la iglesia y el mundo.' },
    { title: 'Unidad entre líderes', text: 'Promover la unidad y la comunión entre líderes de distintos grupos e iglesias.' },
    { title: 'Intimidad con Dios', text: 'Impulsar una relación más profunda con Dios.' },
  ];
}
