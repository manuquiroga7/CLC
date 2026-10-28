import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Community } from '../ui/community';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Community],
  template: `
    <section class="hero">
      <div class="wrap">
        <div class="eyebrow">Nosotros</div>
        <h1>Más que una cadena de librerías</h1>
        <p>Una organización internacional dedicada a que la Biblia y la literatura cristiana lleguen a todas las naciones.</p>
      </div>
    </section>

    <div class="stats">
      <div class="wrap">
        @for (s of stats; track s.label) {
          <div><b>{{ s.value }}</b><span>{{ s.label }}</span></div>
        }
      </div>
    </div>

    <section class="block">
      <div class="wrap who">
        <div>
          <div class="eyebrow">Quiénes somos</div>
          <h2>Un ministerio que sirve a través de los libros</h2>
          <i class="rule"></i>
        </div>
        <div class="text">
          <p>CLC distribuye la Biblia, libros cristianos y medios de comunicación cristianos. Sus equipos reúnen personas de distintas naciones, denominaciones y trasfondos, unidas por servir a Jesucristo y ayudar a otros a conocerlo mejor.</p>
          <p>Nuestro deseo es ver vidas cambiadas a través de la lectura de un libro cristiano.</p>
        </div>
      </div>
    </section>

    <section class="block">
      <div class="wrap pv">
        <article class="panel dark">
          <div class="eyebrow">Propósito</div>
          <h3>Honrar a Dios con la Palabra</h3>
          <p>Que la literatura y los recursos cristianos estén disponibles en todas las naciones, para ayudar a las personas a llegar a la fe y a la madurez en el Señor Jesucristo.</p>
        </article>
        <article class="panel">
          <div class="eyebrow gold">Visión · Multiplicar</div>
          <ul>
            <li><b>Librerías</b> que impacten a la comunidad.</li>
            <li><b>Publicación y distribución</b> de la Palabra de Dios y de medios cristianos que cambien vidas.</li>
            <li><b>Recursos</b> para proyectos en todo el mundo.</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="block">
      <div class="wrap">
        <div class="sec-head"><div><h2>Nuestros valores</h2><i class="rule"></i></div></div>
        <div class="values">
          @for (v of values; track v.name) {
            <article class="panel val">
              <span class="n">{{ v.n }}</span>
              <h3>{{ v.name }}</h3>
              <p>{{ v.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="block">
      <div class="wrap">
        <div class="sec-head"><div><h2>Cómo funcionamos como ministerio</h2><i class="rule"></i></div></div>
        <p class="lead">En cada país, CLC se organiza de forma independiente, pero todos estamos unidos por una misma visión, objetivos y una constitución internacional.</p>
        <div class="steps">
          @for (s of steps; track s.title) {
            <article class="step">
              <span>{{ s.n }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </article>
          }
        </div>
        <div class="callout">
          <b>Tu compra tiene un propósito.</b>
          Cada compra en nuestras librerías y en este sitio destina recursos a la obra misionera y al trabajo social en Uruguay y en el mundo.
        </div>
        <a class="thompson" routerLink="/thompson">
          <div><b>Instituto Internacional de la Biblia Thompson</b><span>Seminarios para pastores y líderes, en línea.</span></div>
          <i>→</i>
        </a>
      </div>
    </section>

    <section class="block">
      <div class="wrap">
        <div class="sec-head"><div><h2>Nuestra historia</h2><i class="rule"></i></div></div>
        <ol class="timeline">
          @for (t of timeline; track t.year) {
            <li>
              <b>{{ t.year }}</b>
              <div><h3>{{ t.title }}</h3><p>{{ t.text }}</p></div>
            </li>
          }
        </ol>
      </div>
    </section>

    <app-community />

    <section class="block">
      <div class="wrap">
        <div class="cta">
          <div><h2>Conocé nuestras librerías</h2><p>Visitanos y encontrá libros, Biblias y regalos para toda la familia.</p></div>
          <div class="btns">
            <a class="btn btn-gold" routerLink="/sucursales">Ver sucursales</a>
            <a class="btn btn-ghost" routerLink="/catalogo">Explorar catálogo</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero { background: linear-gradient(120deg, var(--navy-900), var(--navy-700)); color: #fff; position: relative; overflow: hidden; }
    .hero::after { content: ''; position: absolute; right: -120px; top: -140px; width: 440px; height: 440px; border: 1px solid rgba(212, 168, 42, 0.35); border-radius: 50%; }
    .hero .wrap { padding-top: 88px; padding-bottom: 88px; }
    .hero h1 { color: #fff; font-size: clamp(40px, 6vw, 68px); margin: 14px 0 18px; max-width: 14ch; }
    .hero p { font-size: 19px; color: #cfdce8; max-width: 560px; }

    .stats { background: #fff; border-bottom: 1px solid var(--stone); }
    .stats .wrap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; padding-top: 32px; padding-bottom: 32px; text-align: center; }
    .stats b { display: block; font-family: var(--serif); font-size: 48px; line-height: 1; color: var(--navy-700); }
    .stats span { font-size: 13px; color: var(--ink-2); text-transform: uppercase; letter-spacing: 0.1em; }

    .who { display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; align-items: start; }
    .who h2 { font-size: 40px; margin-top: 10px; }
    .text p { color: var(--ink-2); font-size: 17px; margin-bottom: 14px; }

    .pv { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .pv .panel { padding: 40px; }
    .pv h3 { font-size: 34px; margin: 10px 0 12px; }
    .dark { background: var(--navy-900); border-color: var(--navy-900); color: #cfdce8; }
    .dark h3 { color: #fff; }
    .gold { color: var(--wine-700); }
    ul { list-style: none; display: grid; gap: 16px; margin-top: 16px; }
    li { padding-left: 22px; position: relative; color: var(--ink-2); }
    .pv li::before { content: ''; position: absolute; left: 0; top: 10px; width: 8px; height: 8px; background: var(--gold-500); border-radius: 50%; }
    li b { color: var(--navy-900); }

    .values { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    .val { padding: 28px; }
    .n { font-family: var(--serif); font-size: 44px; color: var(--gold-500); line-height: 1; }
    .val h3 { font-size: 28px; margin: 8px 0; }
    .val p { font-size: 14px; color: var(--ink-2); }

    .lead { max-width: 70ch; color: var(--ink-2); font-size: 17px; margin-bottom: 28px; }
    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .step { border-top: 2px solid var(--gold-500); padding-top: 18px; }
    .step span { font-family: var(--serif); font-size: 18px; color: var(--ink-2); }
    .step h3 { font-size: 30px; margin: 4px 0 8px; }
    .step p { color: var(--ink-2); font-size: 15px; }
    .callout { margin-top: 36px; background: var(--gold-100); border-radius: var(--r); padding: 24px 28px; color: var(--navy-900); font-size: 17px; }
    .callout b { font-family: var(--serif); font-size: 24px; display: block; margin-bottom: 4px; }
    .thompson { margin-top: 16px; display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 20px 28px; transition: 0.2s; }
    .thompson:hover { border-color: var(--gold-500); transform: translateX(4px); }
    .thompson b { font-family: var(--serif); font-size: 24px; color: var(--navy-900); font-weight: 600; display: block; }
    .thompson span { font-size: 14px; color: var(--ink-2); }
    .thompson i { font-style: normal; color: var(--blue-600); font-size: 22px; }

    .timeline { list-style: none; position: relative; display: grid; gap: 28px; padding-left: 0; }
    .timeline::before { content: ''; position: absolute; left: 120px; top: 8px; bottom: 8px; width: 2px; background: var(--stone); }
    .timeline li { display: grid; grid-template-columns: 100px 1fr; gap: 44px; padding: 0; align-items: start; }
    .timeline li::before { content: ''; position: absolute; left: 113px; width: 12px; height: 12px; margin-top: 12px; background: var(--gold-500); border-radius: 50%; border: 2px solid var(--ivory); box-sizing: content-box; }
    .timeline b { font-family: var(--serif); font-size: 36px; color: var(--navy-700); line-height: 1.1; }
    .timeline h3 { font-size: 28px; }
    .timeline p { color: var(--ink-2); max-width: 62ch; }

    .cta { background: var(--navy-900); color: #fff; border-radius: var(--r); padding: 48px; display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
    .cta h2 { color: #fff; font-size: 36px; }
    .cta p { color: #c3d3e0; margin-top: 6px; }
    .btns { display: flex; gap: 12px; flex-wrap: wrap; }
    .cta .btn-ghost { border-color: rgba(255, 255, 255, 0.5); color: #fff; }
    .cta .btn-ghost:hover { background: #fff; color: var(--navy-900); }

    @media (max-width: 1000px) {
      .stats .wrap { grid-template-columns: repeat(2, 1fr); }
      .who, .pv { grid-template-columns: 1fr; gap: 24px; }
      .values { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .steps { grid-template-columns: 1fr; }
      .timeline li { grid-template-columns: 70px 1fr; gap: 36px; }
      .timeline li b { font-size: 28px; }
      .timeline::before { left: 88px; }
      .timeline li::before { left: 81px; }
      .cta { padding: 32px 24px; }
    }
    @media (max-width: 640px) {
      .values { grid-template-columns: minmax(0, 1fr); }
      .hero .wrap { padding-top: 56px; padding-bottom: 56px; }
      .stats b { font-size: 36px; }
      .pv .panel { padding: 28px 24px; }
      .thompson { padding: 18px 20px; }
    }
  `,
})
export class About {
  // Cifras según la página "Historia" de clcuruguay.com (las páginas del sitio actual difieren entre sí: confirmar con CLC).
  readonly stats = [
    { value: '1941', label: 'Año de fundación' },
    { value: '48', label: 'Países' },
    { value: '+180', label: 'Librerías' },
    { value: '18', label: 'Editoriales' },
  ];

  readonly values = [
    { n: '01', name: 'Fe', text: 'Confiamos en Dios para las necesidades personales y de la obra. El crecimiento de CLC depende de sus promesas más que de los recursos visibles.' },
    { n: '02', name: 'Sacrificio', text: 'Una entrega personal a Jesucristo, aun cuando implique dificultades, para que su amor se manifieste a un mundo necesitado.' },
    { n: '03', name: 'Compañerismo', text: 'Una comunidad diversa, sin prejuicios raciales, nacionales ni doctrinales, que se ama y se cuida mutuamente.' },
    { n: '04', name: 'Santidad', text: 'Un estilo de vida que honra a Dios, con el poder del Espíritu Santo obrando en y a través de nosotros.' },
  ];

  readonly steps = [
    { n: '01', title: 'Distribuimos', text: 'Biblias, libros y medios cristianos, en nuestras librerías y en línea, para todas las edades.' },
    { n: '02', title: 'Publicamos', text: 'Junto a casas editoriales en distintos países, generamos y difundimos contenido que edifica.' },
    { n: '03', title: 'Devolvemos', text: 'Parte de cada compra se destina a la obra misionera y al trabajo social, aquí y en el mundo.' },
  ];

  readonly timeline = [
    { year: '1941', title: 'El comienzo en Inglaterra', text: 'Ken y Bessie Adams, movidos por el llamado “Apacienta mis ovejas”, dan forma a CLC como ministerio autónomo el 1 de noviembre de 1941, con el deseo de difundir literatura cristiana.' },
    { year: '1948', title: 'Llegada a Montevideo', text: 'Los misioneros Bertram y Margaret Jones llegan desde Inglaterra, y comienza la obra que hoy continúa como CLC Uruguay.' },
    { year: 'Hoy', title: 'Presencia en 48 países', text: 'Con sede internacional en Sheffield, Reino Unido, CLC sigue creciendo con la misma visión: que la Palabra impresa llegue a todas las naciones.' },
  ];
}
