import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../core/catalog.service';
import { AboutTeaser } from '../ui/about-teaser';
import { BookCarousel } from '../ui/book-carousel';
import { Community } from '../ui/community';
import { HeroSlider } from '../ui/hero-slider';
import { NewsSection } from '../ui/news-section';
import { ThompsonBanner } from '../ui/thompson-banner';

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeroSlider, BookCarousel, NewsSection, AboutTeaser, Community, ThompsonBanner],
  template: `
    <app-hero-slider />

    <div class="values">
      <div class="wrap">
        <div class="val"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg><div><strong>Envíos a todo el país</strong><span>Seguimiento de tu pedido</span></div></div>
        <div class="val"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg><div><strong>Retiro en librería</strong><span>Sin costo de envío</span></div></div>
        <div class="val"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg><div><strong>Pagá como prefieras</strong><span>Tarjetas y transferencia</span></div></div>
        <div class="val"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5h16v11H9l-5 4z"/></svg><div><strong>Atención por WhatsApp</strong><span>Te asesoramos en tu compra</span></div></div>
      </div>
    </div>

    <section class="block">
      <div class="wrap">
        <div class="sec-head"><div><h2>Explorá por categoría</h2><i class="rule"></i></div><a routerLink="/catalogo">Ver todo el catálogo →</a></div>
        <div class="cats">
          @for (c of categories; track c.slug) {
            <a class="cat" routerLink="/catalogo" [queryParams]="{ cat: c.slug }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" [innerHTML]="c.icon"></svg>
              <span>{{ c.name }}</span>
            </a>
          }
        </div>
      </div>
    </section>

    <app-book-carousel title="Libros destacados" category="libros" [books]="libros()" />
    <app-book-carousel title="Oportunidades en libros" category="oportunidades" [books]="ofertas()" />

    <div class="wrap">
      <div class="promo">
        <div class="a">
          <div class="eyebrow" style="color: var(--wine-700)">Oportunidades</div>
          <h2>Libros con descuento</h2>
          <p>Títulos seleccionados a precios especiales, por tiempo limitado.</p>
          <a class="btn btn-primary" routerLink="/catalogo" [queryParams]="{ cat: 'oportunidades' }">Ver oportunidades</a>
        </div>
        <div class="bb">
          <div class="eyebrow">Librerías CLC</div>
          <h2>Visitá nuestra librería</h2>
          <p>Estamos en Avenida Uruguay 1424, Montevideo. Reservá en línea y retirá sin costo.</p>
          <a class="btn btn-gold" routerLink="/sucursales">Cómo llegar</a>
        </div>
      </div>
    </div>

    <app-book-carousel title="Biblias de estudio" category="biblias" [books]="biblias()" />
    <section class="block">
      <div class="wrap">
        <div class="verband">
          <div>
            <div class="eyebrow">Biblias por versión</div>
            <h2>Elegí la traducción que te acompañe</h2>
          </div>
          <div class="chips">
            @for (v of versions(); track v.code) {
              <a routerLink="/catalogo" [queryParams]="{ cat: 'biblias', version: v.code }">{{ v.code }}</a>
            }
            <a class="all" routerLink="/versiones">¿Cuál elegir? →</a>
          </div>
        </div>
      </div>
    </section>

    <app-book-carousel title="Biblias y libros para niños" category="ninos" [books]="ninos()" />
    <app-book-carousel title="Para ellas" category="mujeres" [books]="mujeres()" />
    <app-book-carousel title="Para jóvenes" category="jovenes" [books]="jovenes()" />

    <section class="block">
      <div class="wrap">
        <div class="sec-head"><div><h2>Autores destacados</h2><i class="rule"></i></div><a routerLink="/autores">Ver todos →</a></div>
        <div class="authors">
          @for (a of authors(); track a.slug) {
            <a class="au" routerLink="/catalogo" [queryParams]="{ author: a.slug }">
              <span class="mono">{{ a.initials }}</span>
              <b>{{ a.name }}</b>
              <small>{{ a.count }} {{ a.count === 1 ? 'título' : 'títulos' }}</small>
            </a>
          }
        </div>
      </div>
    </section>

    <app-thompson-banner />

    <app-news-section />
    <app-about-teaser />
    <app-community />
  `,
  styles: `
    .values { background: #fff; border-bottom: 1px solid var(--stone); }
    .values .wrap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding-top: 26px; padding-bottom: 26px; }
    .val { display: flex; gap: 14px; align-items: center; }
    .val svg { width: 30px; height: 30px; color: var(--gold-500); flex: none; stroke-width: 1.5; }
    .val strong { display: block; font-size: 14px; color: var(--navy-900); }
    .val span { font-size: 13px; color: var(--ink-2); }

    .cats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
    .cat { background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 28px 12px 22px; text-align: center; transition: 0.2s; }
    .cat:hover { border-color: var(--gold-500); transform: translateY(-3px); box-shadow: var(--shadow-1); }
    .cat svg { width: 40px; height: 40px; color: var(--navy-700); margin: 0 auto 12px; }
    .cat span { display: block; font-family: var(--serif); font-size: 22px; font-weight: 600; color: var(--navy-900); }

    .verband { background: var(--gold-100); border-radius: var(--r); padding: 36px 40px; display: flex; justify-content: space-between; align-items: center; gap: 28px; flex-wrap: wrap; }
    .verband h2 { font-size: 34px; margin-top: 6px; max-width: 18ch; }
    .verband .eyebrow { color: var(--wine-700); }
    .chips { display: flex; gap: 10px; flex-wrap: wrap; }
    .chips a { padding: 10px 20px; background: #fff; border: 1.5px solid #ecdcaa; border-radius: 99px; font-weight: 600; color: var(--navy-900); font-size: 15px; transition: 0.2s; }
    .chips a:hover { background: var(--navy-700); border-color: var(--navy-700); color: #fff; }
    .chips a.all { background: none; border-color: transparent; color: var(--blue-600); }
    .chips a.all:hover { background: none; color: var(--navy-900); text-decoration: underline; }

    .authors { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
    .au { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; padding: 8px; }
    .au .mono { width: 88px; height: 88px; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(135deg, var(--navy-900), var(--navy-700)); color: var(--gold-500); font-family: var(--serif); font-size: 32px; font-weight: 600; margin-bottom: 10px; box-shadow: 0 0 0 3px var(--ivory), 0 0 0 4px var(--gold-500); transition: 0.2s; }
    .au:hover .mono { transform: translateY(-4px); box-shadow: 0 0 0 3px var(--ivory), 0 0 0 4px var(--gold-500), var(--shadow-2); }
    .au b { font-family: var(--serif); font-size: 21px; font-weight: 600; color: var(--navy-900); line-height: 1.15; }
    .au small { font-size: 13px; color: var(--ink-2); }

    .promo { display: grid; grid-template-columns: 1fr 1fr; border-radius: var(--r); overflow: hidden; margin-top: 72px; }
    .promo > div { padding: 56px; }
    .promo .a { background: var(--gold-100); }
    .promo .bb { background: var(--navy-900); color: #fff; }
    .promo h2 { font-size: 38px; margin: 10px 0 14px; }
    .promo .bb h2 { color: #fff; }
    .promo p { margin-bottom: 24px; max-width: 420px; color: var(--ink-2); }
    .promo .bb p { color: #c3d3e0; }

    @media (max-width: 640px) {
      .values .wrap { gap: 20px 16px; padding-top: 22px; padding-bottom: 22px; }
      .val { flex-direction: column; align-items: flex-start; gap: 8px; }
      .au .mono { width: 72px; height: 72px; font-size: 26px; }
      .au b { font-size: 18px; }
      .cat { padding: 20px 8px 16px; }
      .cat svg { width: 32px; height: 32px; }
      .cat span { font-size: 19px; }
    }
    @media (max-width: 1000px) {
      .values .wrap { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .cats { grid-template-columns: repeat(3, 1fr); }
      .authors { grid-template-columns: repeat(3, 1fr); }
      .verband { padding: 28px 24px; }
      .promo { grid-template-columns: 1fr; }
      .promo > div { padding: 36px 24px; }
    }
  `,
})
export class Home {
  private readonly catalog = inject(CatalogService);
  private readonly cat = (category: string) => toSignal(this.catalog.list({ category }), { initialValue: [] });

  readonly authors = toSignal(this.catalog.authors(), { initialValue: [] });
  readonly versions = toSignal(this.catalog.versions(), { initialValue: [] });
  readonly libros = this.cat('libros');
  readonly ofertas = this.cat('oportunidades');
  readonly biblias = this.cat('biblias');
  readonly ninos = this.cat('ninos');
  readonly mujeres = this.cat('mujeres');
  readonly jovenes = this.cat('jovenes');

  // Íconos estáticos propios (no vienen de datos externos), por eso se marcan como confiables.
  private readonly svg = (markup: string) => inject(DomSanitizer).bypassSecurityTrustHtml(markup);

  readonly categories = [
    { slug: 'libros', name: 'Libros', icon: this.svg('<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h11"/>') },
    { slug: 'biblias', name: 'Biblias', icon: this.svg('<path d="M6 3h12v18H6z"/><path d="M12 7v7M9.5 9.5h5"/>') },
    { slug: 'ninos', name: 'Niños', icon: this.svg('<circle cx="12" cy="12" r="9"/><path d="M8 14c1 2 7 2 8 0M9 9.5h.01M15 9.5h.01"/>') },
    { slug: 'mujeres', name: 'Mujeres', icon: this.svg('<path d="M12 21s-8-5-8-11a4.5 4.5 0 018-2.7A4.5 4.5 0 0120 10c0 6-8 11-8 11z"/>') },
    { slug: 'jovenes', name: 'Jóvenes', icon: this.svg('<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>') },
    { slug: 'familia', name: 'Familia', icon: this.svg('<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c.5-4 3-6 6-6s5.5 2 6 6M14 15c3-1 7 0 8 5"/>') },
  ];
}
