import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { CartService } from '../core/cart.service';
import { CONTACT } from '../core/contact';

const LOGO = 'https://clcuruguay.com/_Shared/templates/r4/images/logos/logo-colour-small-clc.png';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  host: { '(document:keydown.escape)': 'closeAll()' },
  template: `
    <div class="topbar">
      <div class="wrap">
        <div class="promo">Envíos a todo el país <span class="sep">|</span> <span class="hide-m">Retiro gratis en librería</span></div>
        <div class="links"><a routerLink="/nosotros">Nosotros</a><span class="sep">|</span><a routerLink="/noticias">Noticias</a><span class="sep">|</span><a routerLink="/sucursales">Sucursales</a><span class="sep">|</span><a routerLink="/contacto">Contacto</a><span class="sep">|</span><a [href]="whatsapp" target="_blank" rel="noopener">WhatsApp</a><span class="sep">|</span><a href="#">ES · EN</a></div>
      </div>
    </div>

    <header class="main">
      <div class="wrap">
        <button class="icon burger" (click)="menuOpen.set(true)" aria-label="Abrir menú" aria-controls="drawer" [attr.aria-expanded]="menuOpen()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
        <a routerLink="/" class="logo"><img [src]="logo" alt="CLC Uruguay" /></a>
        <form class="search" (submit)="search($event, q.value)">
          <input #q type="search" placeholder="Buscar por título, autor o tema…" aria-label="Buscar" />
          <button>Buscar</button>
        </form>
        <nav class="actions">
          <button class="icon only-m" (click)="searchOpen.set(!searchOpen())" aria-label="Buscar" [attr.aria-expanded]="searchOpen()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>
          </button>
          <a routerLink="/sucursales" class="not-m">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Librerías</span>
          </a>
          <a href="#" aria-label="Mi cuenta"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg><span>Mi cuenta</span></a>
          <a routerLink="/carrito" class="cart" aria-label="Carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4h2l2.4 11h10.2L20 7H6"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg><span>Carrito</span>
            @if (cart.count() > 0) { <b class="count">{{ cart.count() }}</b> }
          </a>
        </nav>
      </div>
      @if (searchOpen()) {
        <form class="msearch" (submit)="search($event, mq.value)">
          <input #mq type="search" placeholder="Buscar por título, autor o tema…" aria-label="Buscar" autofocus />
          <button>Buscar</button>
        </form>
      }
    </header>

    <nav class="catnav">
      <div class="wrap">
        <a class="all" routerLink="/catalogo" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: true }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          Todo el catálogo
        </a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'libros' }" routerLinkActive="on">Libros</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'biblias' }" routerLinkActive="on">Biblias</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'ninos' }" routerLinkActive="on">Niños</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'mujeres' }" routerLinkActive="on">Mujeres</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'jovenes' }" routerLinkActive="on">Jóvenes</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'familia' }" routerLinkActive="on">Familia</a>
        <a routerLink="/versiones" routerLinkActive="on">Versiones</a>
        <a routerLink="/autores" routerLinkActive="on">Autores</a>
        <a class="sale" routerLink="/catalogo" [queryParams]="{ cat: 'oportunidades' }">Oportunidades</a>
      </div>
    </nav>

    <!-- Menú móvil -->
    <div class="backdrop" [class.show]="menuOpen()" (click)="menuOpen.set(false)"></div>
    <aside id="drawer" class="drawer" [class.show]="menuOpen()" [attr.aria-hidden]="!menuOpen()" role="dialog" aria-modal="true" aria-label="Menú">
      <div class="d-head">
        <a routerLink="/" class="logo"><img [src]="logo" alt="CLC Uruguay" /></a>
        <button class="icon" (click)="menuOpen.set(false)" aria-label="Cerrar menú">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>
        </button>
      </div>
      <div class="d-body">
        <div class="d-title">Tienda</div>
        <a class="all" routerLink="/catalogo">Todo el catálogo</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'libros' }">Libros</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'biblias' }">Biblias</a>
        <a routerLink="/versiones">Biblias por versión</a>
        <a routerLink="/autores">Autores destacados</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'ninos' }">Niños</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'mujeres' }">Mujeres</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'jovenes' }">Jóvenes</a>
        <a routerLink="/catalogo" [queryParams]="{ cat: 'familia' }">Familia</a>
        <a class="sale" routerLink="/catalogo" [queryParams]="{ cat: 'oportunidades' }">Oportunidades</a>
        <div class="d-title">CLC</div>
        <a routerLink="/nosotros">Nosotros</a>
        <a routerLink="/thompson">Instituto Thompson</a>
        <a routerLink="/noticias">Noticias</a>
        <a routerLink="/sucursales">Sucursales</a>
        <a routerLink="/contacto">Contacto</a>
        <a class="wa" [href]="whatsapp" target="_blank" rel="noopener">Escribinos por WhatsApp</a>
      </div>
    </aside>
  `,
  styles: `
    .topbar { background: var(--navy-900); color: #d6e2ec; font-size: 13px; }
    .topbar .wrap { display: flex; justify-content: space-between; align-items: center; height: 38px; }
    .topbar a:hover { color: var(--gold-500); }
    .sep { opacity: 0.35; margin: 0 12px; }

    header.main { background: var(--navy-700); position: sticky; top: 0; z-index: 20; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08); }
    header.main .wrap { display: flex; align-items: center; gap: 32px; height: 76px; }
    .logo img { height: 44px; }
    .search { flex: 1; display: flex; max-width: 560px; background: #fff; border-radius: var(--r); overflow: hidden; }
    .search input, .msearch input { flex: 1; min-width: 0; border: 0; padding: 0 18px; height: 46px; font: inherit; font-size: 16px; outline: none; color: var(--ink); background: #fff; }
    .search button, .msearch button { border: 0; background: var(--gold-500); color: var(--navy-900); padding: 0 20px; font-weight: 600; }
    .search button:hover, .msearch button:hover { background: var(--gold-600); }
    .actions { display: flex; gap: 6px; margin-left: auto; }
    .actions a { display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; font-size: 12px; padding: 6px 12px; border-radius: var(--r); gap: 2px; position: relative; min-height: 44px; min-width: 44px; }
    .actions a:hover, .icon:hover { background: rgba(255, 255, 255, 0.1); }
    .actions svg { width: 22px; height: 22px; }
    .count { position: absolute; top: 0; right: 4px; background: var(--gold-500); color: var(--navy-900); font-size: 12px; font-weight: 700; border-radius: 99px; min-width: 18px; height: 18px; display: grid; place-items: center; }

    .icon { width: 44px; height: 44px; border: 0; background: none; color: #fff; border-radius: var(--r); display: grid; place-items: center; flex: none; }
    .icon svg { width: 24px; height: 24px; }
    .burger, .only-m, .msearch, .drawer, .backdrop { display: none; }

    .catnav { background: #fff; border-bottom: 1px solid var(--stone); }
    .catnav .wrap { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; }
    .catnav a { padding: 14px 18px; font-weight: 500; font-size: 15px; white-space: nowrap; border-bottom: 2px solid transparent; }
    .catnav a:hover { color: var(--blue-600); border-color: var(--gold-500); }
    .catnav a.sale { color: var(--wine-700); margin-left: auto; font-weight: 600; }
    .catnav a.all { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: var(--navy-700); margin-right: 8px; position: relative; }
    .catnav a.all svg { width: 18px; height: 18px; color: var(--gold-600); }
    .catnav a.all::after { content: ''; position: absolute; right: -6px; top: 14px; bottom: 14px; width: 1px; background: var(--stone); }
    .catnav a.on { color: var(--blue-600); border-color: var(--gold-500); }

    @media (max-width: 1000px) {
      .topbar .links, .hide-m { display: none; }
      .topbar .wrap { justify-content: center; height: 34px; }
      .topbar .sep { display: none; }
      .catnav, .search, .actions a.not-m, .actions a span { display: none; }
      .burger, .only-m { display: grid; }
      header.main .wrap { gap: 4px; height: 64px; padding: 0 12px; }
      .logo { margin-right: auto; }
      .logo img { height: 38px; }
      .actions { gap: 0; margin-left: 0; }
      .actions a { padding: 0; }
      .msearch { display: flex; gap: 8px; padding: 0 12px 12px; }
      .msearch input { border-radius: var(--r); }
      .msearch button { border-radius: var(--r); }

      .backdrop { display: block; position: fixed; inset: 0; background: rgba(10, 42, 67, 0.55); opacity: 0; pointer-events: none; transition: opacity 0.25s; z-index: 40; }
      .backdrop.show { opacity: 1; pointer-events: auto; }
      .drawer { display: flex; flex-direction: column; position: fixed; top: 0; bottom: 0; left: 0; width: min(86vw, 340px); background: #fff; z-index: 41; transform: translateX(-102%); transition: transform 0.28s ease; visibility: hidden; }
      .drawer.show { transform: none; visibility: visible; }
      .d-head { display: flex; align-items: center; justify-content: space-between; background: var(--navy-700); padding: 10px 12px; }
      .d-head .icon { color: #fff; }
      .d-body { overflow-y: auto; padding: 8px 0 32px; display: flex; flex-direction: column; }
      .d-title { padding: 18px 20px 6px; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-2); font-weight: 600; }
      .d-body a { padding: 13px 20px; font-size: 17px; font-weight: 500; border-left: 3px solid transparent; }
      .d-body a:hover, .d-body a:active { background: var(--ivory); border-left-color: var(--gold-500); }
      .d-body a.sale { color: var(--wine-700); font-weight: 600; }
      .d-body a.all { font-weight: 700; color: var(--navy-700); }
      .d-body a.wa { margin: 16px 20px 0; background: #1f9d55; color: #fff; text-align: center; border-radius: var(--r); font-weight: 600; font-size: 15px; border: 0; }
    }
    @media (prefers-reduced-motion: reduce) { .drawer, .backdrop { transition: none; } }
  `,
})
export class SiteHeader {
  private readonly router = inject(Router);
  protected readonly cart = inject(CartService);
  protected readonly logo = LOGO;
  protected readonly whatsapp = CONTACT.whatsapp;

  readonly menuOpen = signal(false);
  readonly searchOpen = signal(false);

  constructor() {
    // Cerrar menú y buscador al navegar.
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd), takeUntilDestroyed()).subscribe(() => this.closeAll());

    // Bloquear el scroll del fondo mientras el menú está abierto.
    effect(() => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
    inject(DestroyRef).onDestroy(() => (document.body.style.overflow = ''));
  }

  closeAll(): void {
    this.menuOpen.set(false);
    this.searchOpen.set(false);
  }

  search(e: Event, q: string): void {
    e.preventDefault();
    this.router.navigate(['/catalogo'], { queryParams: { q: q.trim() || null } });
  }
}
