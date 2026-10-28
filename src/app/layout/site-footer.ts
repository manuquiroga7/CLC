import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SOCIAL } from '../core/links';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  template: `
    <section class="news">
      <div class="wrap">
        <h2>Recibí novedades y ofertas</h2>
        <p>Lanzamientos, recomendaciones y descuentos en tu correo.</p>
        <form (submit)="$event.preventDefault()">
          <input type="email" placeholder="Tu correo electrónico" aria-label="Correo electrónico" />
          <button class="btn btn-gold">Suscribirme</button>
        </form>
      </div>
    </section>

    <footer>
      <div class="wrap">
        <div class="cols">
          <div>
            <img src="https://clcuruguay.com/_Shared/templates/r4/images/logos/logo-colour-small-clc.png" alt="CLC Uruguay" />
            <p>Libros cristianos, Biblias y regalos para toda la familia.</p>
            <div class="social">
              <a [href]="s.youtube" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="3.5"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor"/></svg></a>
              <a [href]="s.instagram" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor"/></svg></a>
              <a [href]="s.facebook" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/></svg></a>
            </div>
          </div>
          <div>
            <h4>Tienda</h4>
            <ul>
              <li><a routerLink="/catalogo">Todo el catálogo</a></li>
              <li><a routerLink="/catalogo" [queryParams]="{ cat: 'libros' }">Libros</a></li>
              <li><a routerLink="/catalogo" [queryParams]="{ cat: 'biblias' }">Biblias</a></li>
              <li><a routerLink="/versiones">Biblias por versión</a></li>
              <li><a routerLink="/autores">Autores destacados</a></li>
              <li><a routerLink="/catalogo" [queryParams]="{ cat: 'oportunidades' }">Oportunidades</a></li>
            </ul>
          </div>
          <div>
            <h4>Nosotros</h4>
            <ul>
              <li><a routerLink="/nosotros">Quiénes somos</a></li>
              <li><a routerLink="/nosotros">Misión y visión</a></li>
              <li><a routerLink="/nosotros">Historia</a></li>
              <li><a routerLink="/thompson">Instituto Thompson</a></li>
              <li><a routerLink="/noticias">Noticias</a></li>
              <li><a routerLink="/sucursales">Sucursales</a></li>
            </ul>
          </div>
          <div>
            <h4>Ayuda</h4>
            <ul>
              <li><a routerLink="/contacto">Contacto</a></li>
              <li><a href="#">Envíos y retiros</a></li>
              <li><a href="#">Formas de pago</a></li>
            </ul>
          </div>
          <div>
            <h4>Mi cuenta</h4>
            <ul>
              <li><a href="#">Ingresar</a></li>
              <li><a href="#">Mis pedidos</a></li>
              <li><a routerLink="/carrito">Carrito</a></li>
            </ul>
          </div>
        </div>
        <div class="legal"><span>© CLC Uruguay</span><span>Propuesta de rediseño · datos de ejemplo</span></div>
      </div>
    </footer>
  `,
  styles: `
    .news { margin-top: 72px; background: var(--navy-700); color: #fff; padding: 56px 0; text-align: center; }
    .news h2 { color: #fff; font-size: 36px; }
    .news p { color: #c3d3e0; margin: 8px 0 24px; }
    .news form { display: inline-flex; gap: 8px; max-width: 100%; }
    .news input { padding: 0 18px; height: 48px; width: 320px; max-width: 58vw; border: 0; border-radius: var(--r); font: inherit; font-size: 16px; }
    @media (max-width: 640px) {
      .news { padding: 40px 0; }
      .news h2 { font-size: 30px; }
      .news form { display: flex; flex-direction: column; width: 100%; }
      .news input { width: 100%; max-width: none; }
      .news .btn { height: 48px; }
      .legal { flex-direction: column; }
    }
    footer { background: var(--navy-900); color: #b4c4d2; padding: 56px 0 24px; font-size: 14px; }
    .cols { display: grid; grid-template-columns: 1.4fr repeat(4, 1fr); gap: 40px; }
    img { height: 40px; margin-bottom: 14px; }
    .social { display: flex; gap: 10px; margin-top: 16px; }
    .social a { width: 44px; height: 44px; border: 1px solid rgba(255, 255, 255, 0.25); border-radius: 50%; display: grid; place-items: center; color: #fff; transition: 0.2s; }
    .social a:hover { background: var(--gold-500); border-color: var(--gold-500); color: var(--navy-900); }
    .social svg { width: 18px; height: 18px; }
    h4 { color: #fff; font-family: var(--serif); font-size: 20px; margin-bottom: 14px; font-weight: 600; }
    li { margin-bottom: 2px; }
    li a { display: inline-block; padding: 9px 0; }
    a:hover { color: var(--gold-500); }
    .legal { border-top: 1px solid rgba(255, 255, 255, 0.12); margin-top: 40px; padding-top: 20px; font-size: 13px; display: flex; justify-content: space-between; gap: 12px; }
    @media (max-width: 1000px) { .cols { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 24px; } .cols > div:first-child { grid-column: 1 / -1; } }
  `,
})
export class SiteFooter {
  protected readonly s = SOCIAL;
}
