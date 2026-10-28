import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CONTACT, openStatus } from '../core/contact';
import { MapEmbed } from '../ui/map';

@Component({
  selector: 'app-branches',
  imports: [RouterLink, MapEmbed],
  template: `
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span>Sucursales</div>
        <h1>Nuestra librería</h1>
        <i class="rule"></i>
        <p class="lead">Visitanos en el centro de Montevideo, o reservá en línea y retirá sin costo.</p>

        <div class="layout">
          <div class="info">
            <article class="panel">
              <div class="top">
                <h3>{{ c.name }}</h3>
                <span class="status" [class.open]="status().open">{{ status().text }}</span>
              </div>
              <ul class="rows">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
                  <span>{{ c.street }}<br />{{ c.city }}</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>
                  <span><a [href]="c.phoneHref">{{ c.phone }}</a></span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  <span class="hrs">
                    @for (h of c.hours; track h.days) { <span><b>{{ h.days }}</b>{{ h.time }}</span> }
                  </span>
                </li>
              </ul>
              <div class="btns">
                <a class="btn btn-primary" [href]="c.mapLink" target="_blank" rel="noopener">Cómo llegar</a>
                <a class="btn btn-ghost" [href]="c.whatsapp" target="_blank" rel="noopener">Escribinos por WhatsApp</a>
              </div>
            </article>

            <article class="panel online">
              <div class="eyebrow">Tienda en línea</div>
              <h3>Comprá desde casa</h3>
              <p>Envíos a todo el país con seguimiento, o retiro gratis en la librería.</p>
              <a class="btn btn-gold" routerLink="/catalogo">Ver catálogo</a>
            </article>
          </div>

          <app-map />
        </div>

        <div class="cta">
          <div><h2>¿Tenés una consulta?</h2><p>Escribinos y te respondemos a la brevedad.</p></div>
          <a class="btn btn-gold" routerLink="/contacto">Ir a contacto</a>
        </div>
      </div>
    </div>
  `,
  styles: `
    .lead { color: var(--ink-2); margin: 20px 0 32px; }
    .layout { display: grid; grid-template-columns: 420px 1fr; gap: 24px; align-items: stretch; }
    .info { display: grid; gap: 20px; align-content: start; }
    .top { display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; align-items: flex-start; }
    h3 { font-size: 30px; }
    .status { font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 99px; background: #f1ece3; color: var(--ink-2); }
    .status.open { background: #e4f3ea; color: var(--ok); }
    .rows { list-style: none; display: grid; gap: 16px; margin-bottom: 22px; }
    .rows li { display: flex; gap: 14px; align-items: flex-start; font-size: 15px; }
    .rows svg { width: 22px; height: 22px; color: var(--gold-500); flex: none; margin-top: 2px; }
    .rows a { display: inline-block; padding: 8px 0; margin: -8px 0; }
    .rows a:hover { color: var(--blue-600); text-decoration: underline; }
    .hrs { display: grid; gap: 4px; flex: 1; }
    .hrs span { display: flex; justify-content: space-between; gap: 12px; }
    .hrs b { font-weight: 500; color: var(--ink-2); }
    .btns { display: flex; gap: 10px; flex-wrap: wrap; }
    .online { background: var(--gold-100); border-color: #ecdcaa; }
    .online p { color: var(--ink-2); margin: 6px 0 16px; }
    .cta { margin-top: 48px; background: var(--navy-900); color: #fff; border-radius: var(--r); padding: 36px 40px; display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
    .cta h2 { color: #fff; font-size: 32px; } .cta p { color: #c3d3e0; }
    @media (max-width: 1000px) { .layout { grid-template-columns: 1fr; } app-map { min-height: 320px; } }
  `,
})
export class Branches {
  protected readonly c = CONTACT;
  protected readonly status = signal(openStatus());
}
