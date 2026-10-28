import { Component, input } from '@angular/core';
import { Book } from '../core/models';

/** Portada de ejemplo. Cuando haya imágenes reales (Laravel), se reemplaza por <img>. */
@Component({
  selector: 'app-cover',
  template: `
    <div class="book" [class]="book().tone">
      <small>{{ book().author }}</small>
      <b>{{ book().title }}</b>
      <small>{{ book().publisher }}</small>
    </div>
  `,
  styles: `
    :host { display: block; height: 100%; container-type: inline-size; }
    .book {
      height: 100%; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between;
      padding: 14px 12px 14px 18px; color: #fff; font-family: var(--serif); position: relative; overflow: hidden;
      border-radius: 2px 5px 5px 2px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
    }
    .book::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; background: rgba(0, 0, 0, 0.22); }
    b { font-size: 21px; line-height: 1.05; font-weight: 700; }
    small { font-family: var(--sans); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.85; }
    .c1 { background: linear-gradient(160deg, #2a5d4b, #143429); }
    .c2 { background: linear-gradient(160deg, #7a1f2b, #3d0f16); }
    .c3 { background: linear-gradient(160deg, #c9a227, #7e6210); }
    .c4 { background: linear-gradient(160deg, #1569a8, #0a2a43); }
    .c5 { background: linear-gradient(160deg, #4b3a6b, #241a3d); }
    .c6 { background: linear-gradient(160deg, #37424d, #14191e); }

    /* Debe ir al final para pisar los estilos base. En miniaturas (carrito) se achica el título y se ocultan los textos chicos. */
    @container (max-width: 130px) {
      .book { padding: 8px 6px 8px 12px; min-height: 0; justify-content: center; }
      b { font-size: clamp(10px, 13cqw, 21px); overflow-wrap: anywhere; hyphens: auto; }
      small { display: none; }
    }
  `,
})
export class Cover {
  readonly book = input.required<Book>();
}
