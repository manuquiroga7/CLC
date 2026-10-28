import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CatalogService } from '../core/catalog.service';

@Component({
  selector: 'app-authors',
  imports: [RouterLink],
  template: `
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span>Autores</div>
        <h1>Autores destacados</h1>
        <i class="rule"></i>
        <p class="lead">Voces que han marcado a generaciones de lectores. Explorá sus libros disponibles en CLC Uruguay.</p>

        <div class="grid3">
          @for (a of authors(); track a.slug) {
            <a class="author" routerLink="/catalogo" [queryParams]="{ author: a.slug }">
              <span class="mono">{{ a.initials }}</span>
              <div class="meta">
                <h3>{{ a.name }}</h3>
                <small>{{ a.role }}</small>
                <b>{{ a.count }} {{ a.count === 1 ? 'título' : 'títulos' }} →</b>
              </div>
            </a>
          }
        </div>
      </div>
    </div>
  `,
  styles: `
    .lead { color: var(--ink-2); margin: 20px 0 32px; max-width: 60ch; }
    .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .author { display: flex; gap: 20px; align-items: center; background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 24px; transition: 0.2s; }
    .author:hover { border-color: var(--gold-500); transform: translateY(-3px); box-shadow: var(--shadow-1); }
    .mono { width: 76px; height: 76px; border-radius: 50%; flex: none; display: grid; place-items: center; background: linear-gradient(135deg, var(--navy-900), var(--navy-700)); color: var(--gold-500); font-family: var(--serif); font-size: 30px; font-weight: 600; box-shadow: 0 0 0 3px #fff, 0 0 0 4px var(--gold-500); }
    .meta { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
    h3 { font-size: 28px; }
    small { color: var(--ink-2); font-size: 13px; }
    b { margin-top: 8px; color: var(--blue-600); font-size: 14px; }
    @media (max-width: 1000px) { .grid3 { grid-template-columns: 1fr; } }
  `,
})
export class Authors {
  readonly authors = toSignal(inject(CatalogService).authors(), { initialValue: [] });
}
