import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author, BibleVersion, Book, BookFilter, Branch, Post } from './models';

const lorem =
  'Una obra pensada para acompañar el crecimiento espiritual con claridad y profundidad bíblica. ' +
  'Ideal para lectura personal, estudio en grupo o como regalo. (Texto de ejemplo para la propuesta.)';

/**
 * Datos de ejemplo. Cada método devuelve un Observable para que el día de mañana
 * se reemplace por HttpClient contra la API de Laravel sin tocar los componentes:
 *   list()    -> GET /api/books?q=&category=
 *   get(id)   -> GET /api/books/{id}
 *   branches  -> GET /api/branches
 */
const RAW_BOOKS: Book[] = [
  { id: 1, title: 'Anticristo', author: 'Sandie Freed', category: 'libros', price: 135, format: 'Tapa rústica', tone: 'c6', description: lorem, pages: 224, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000001-1' },
  { id: 2, title: 'Última llamada', author: 'Autor de ejemplo', category: 'libros', price: 450, oldPrice: 520, format: 'Tapa rústica', tone: 'c2', description: lorem, pages: 256, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000002-8' },
  { id: 3, title: 'Muévase a Más', author: 'Chuco De Jesús', category: 'libros', price: 630, format: 'Tapa rústica', tone: 'c4', description: lorem, pages: 192, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000003-5' },
  { id: 4, title: 'La Gran Casa de Dios', author: 'Max Lucado', category: 'libros', price: 630, format: 'Tapa rústica', tone: 'c3', description: lorem, pages: 176, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000004-2' },
  { id: 5, title: 'Vive Confiado en un Mundo Caótico', author: 'David Jeremiah', category: 'libros', price: 720, format: 'Tapa rústica', tone: 'c5', description: lorem, pages: 288, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000005-9' },
  { id: 6, title: 'Biblia de Promesas', author: 'Unilit', category: 'biblias', price: 1890, format: 'Tapa dura', tone: 'c2', description: lorem, pages: 1280, publisher: 'Unilit', isbn: '978-0-00-000006-6' },
  { id: 7, title: 'Biblia de Estudio', author: 'Varios autores', category: 'biblias', price: 2450, oldPrice: 2790, format: 'Cuero símil', tone: 'c4', description: lorem, pages: 1600, publisher: 'CLC', isbn: '978-0-00-000007-3' },
  { id: 8, title: 'Biblia Letra Grande', author: 'Varios autores', category: 'biblias', price: 1650, format: 'Tapa dura', tone: 'c1', description: lorem, pages: 1380, publisher: 'CLC', isbn: '978-0-00-000008-0' },
  { id: 9, title: 'Viajando con Gozo', author: 'Juanita Purcell', category: 'mujeres', price: 405, format: 'Tapa rústica', tone: 'c5', description: lorem, pages: 160, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000009-7' },
  { id: 10, title: 'Por Fin Libre', author: 'Beatriz Lambertz', category: 'mujeres', price: 540, format: 'Tapa rústica', tone: 'c4', description: lorem, pages: 208, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000010-3' },
  { id: 11, title: 'Proyecto Discipulado', author: 'Lucas Leys', category: 'jovenes', price: 585, format: 'Tapa rústica', tone: 'c6', description: lorem, pages: 240, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000011-0' },
  { id: 12, title: 'El Proyecto de la Vida', author: 'Autor de ejemplo', category: 'jovenes', price: 675, oldPrice: 750, format: 'Tapa rústica', tone: 'c1', description: lorem, pages: 200, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000012-7' },
  { id: 13, title: 'Biblia Ilustrada para Niños', author: 'Varios autores', category: 'ninos', price: 890, format: 'Tapa dura', tone: 'c3', description: lorem, pages: 320, publisher: 'CLC', isbn: '978-0-00-000013-4' },
  { id: 14, title: 'Devocionales en Familia', author: 'Autor de ejemplo', category: 'familia', price: 380, format: 'Tapa rústica', tone: 'c2', description: lorem, pages: 144, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000014-1' },
  { id: 15, title: 'Caminando con Propósito', author: 'Autor de ejemplo', category: 'libros', price: 480, oldPrice: 560, format: 'Tapa rústica', tone: 'c4', description: lorem, pages: 208, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000015-8' },
  { id: 16, title: 'Fundamentos de la Fe', author: 'Autor de ejemplo', category: 'libros', price: 590, format: 'Tapa rústica', tone: 'c1', description: lorem, pages: 232, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000016-5' },
  { id: 17, title: 'Palabras que Sanan', author: 'Autor de ejemplo', category: 'libros', price: 420, oldPrice: 495, format: 'Tapa rústica', tone: 'c3', description: lorem, pages: 184, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000017-2' },
  { id: 18, title: 'El Corazón del Liderazgo', author: 'Autor de ejemplo', category: 'libros', price: 660, format: 'Tapa rústica', tone: 'c5', description: lorem, pages: 264, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000018-9' },
  { id: 19, title: 'Biblia NVI Compacta', author: 'Varios autores', category: 'biblias', price: 1250, oldPrice: 1480, format: 'Tapa flexible', tone: 'c4', description: lorem, pages: 1200, publisher: 'CLC', isbn: '978-0-00-000019-6' },
  { id: 20, title: 'Biblia de Bolsillo', author: 'Varios autores', category: 'biblias', price: 790, format: 'Tapa flexible', tone: 'c6', description: lorem, pages: 1100, publisher: 'CLC', isbn: '978-0-00-000020-2' },
  { id: 21, title: 'Biblia Económica', author: 'Varios autores', category: 'biblias', price: 540, oldPrice: 650, format: 'Tapa rústica', tone: 'c1', description: lorem, pages: 1150, publisher: 'CLC', isbn: '978-0-00-000021-9' },
  { id: 22, title: 'Biblia Reina Valera 1977', author: 'Varios autores', category: 'biblias', price: 1590, format: 'Tapa dura', tone: 'c2', description: lorem, pages: 1350, publisher: 'CLC', isbn: '978-0-00-000022-6' },
  { id: 23, title: 'Biblia Cuero Premium', author: 'Varios autores', category: 'biblias', price: 3200, format: 'Cuero genuino', tone: 'c3', description: lorem, pages: 1400, publisher: 'CLC', isbn: '978-0-00-000023-3' },
  { id: 24, title: 'Mi Primera Biblia', author: 'Autor de ejemplo', category: 'ninos', price: 520, oldPrice: 610, format: 'Tapa dura', tone: 'c3', description: lorem, pages: 96, publisher: 'CLC', isbn: '978-0-00-000024-0' },
  { id: 25, title: 'Historias para Dormir', author: 'Autor de ejemplo', category: 'ninos', price: 360, format: 'Tapa dura', tone: 'c5', description: lorem, pages: 80, publisher: 'CLC', isbn: '978-0-00-000025-7' },
  { id: 26, title: 'Héroes de la Biblia', author: 'Autor de ejemplo', category: 'ninos', price: 430, format: 'Tapa dura', tone: 'c1', description: lorem, pages: 112, publisher: 'CLC', isbn: '978-0-00-000026-4' },
  { id: 27, title: 'Devocional para Niños', author: 'Autor de ejemplo', category: 'ninos', price: 340, format: 'Tapa rústica', tone: 'c4', description: lorem, pages: 128, publisher: 'CLC', isbn: '978-0-00-000027-1' },
  { id: 28, title: 'Aventuras de Fe', author: 'Autor de ejemplo', category: 'ninos', price: 395, format: 'Tapa rústica', tone: 'c2', description: lorem, pages: 104, publisher: 'CLC', isbn: '978-0-00-000028-8' },
  { id: 29, title: 'Mujer de Propósito', author: 'Autora de ejemplo', category: 'mujeres', price: 450, format: 'Tapa rústica', tone: 'c5', description: lorem, pages: 176, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000029-5' },
  { id: 30, title: 'Descansa en Él', author: 'Autora de ejemplo', category: 'mujeres', price: 495, format: 'Tapa rústica', tone: 'c2', description: lorem, pages: 192, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000030-1' },
  { id: 31, title: 'Devocional para Ella', author: 'Autora de ejemplo', category: 'mujeres', price: 380, format: 'Tapa dura', tone: 'c3', description: lorem, pages: 160, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000031-8' },
  { id: 32, title: 'Fuerte y Valiente', author: 'Autora de ejemplo', category: 'mujeres', price: 520, format: 'Tapa rústica', tone: 'c4', description: lorem, pages: 200, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000032-5' },
  { id: 33, title: 'Identidad', author: 'Autor de ejemplo', category: 'jovenes', price: 470, format: 'Tapa rústica', tone: 'c6', description: lorem, pages: 168, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000033-2' },
  { id: 34, title: 'Sin Filtros', author: 'Autor de ejemplo', category: 'jovenes', price: 510, format: 'Tapa rústica', tone: 'c1', description: lorem, pages: 192, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000034-9' },
  { id: 35, title: 'Biblia NTV Letra Grande', author: 'Varios autores', category: 'biblias', price: 1780, format: 'Tapa dura', tone: 'c5', description: lorem, pages: 1450, publisher: 'CLC', isbn: '978-0-00-000035-6' },
  { id: 36, title: 'Biblia NBLA de Estudio', author: 'Varios autores', category: 'biblias', price: 2690, format: 'Tapa dura', tone: 'c6', description: lorem, pages: 1700, publisher: 'CLC', isbn: '978-0-00-000036-3' },
  { id: 37, title: 'Biblia RVR 1977 Tamaño Manual', author: 'Varios autores', category: 'biblias', price: 980, oldPrice: 1150, format: 'Tapa flexible', tone: 'c1', description: lorem, pages: 1250, publisher: 'CLC', isbn: '978-0-00-000037-0' },
  // Autores destacados (títulos y autores de ejemplo para la propuesta; precios y datos de edición ficticios).
  { id: 38, title: 'Más que un carpintero', author: 'Josh McDowell', category: 'libros', price: 340, format: 'Tapa rústica', tone: 'c4', description: lorem, pages: 128, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000038-7' },
  { id: 39, title: 'Evidencia que exige un veredicto', author: 'Josh McDowell', category: 'libros', price: 720, format: 'Tapa rústica', tone: 'c6', description: lorem, pages: 520, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000039-4' },
  { id: 40, title: 'Una mujer conforme al corazón de Dios', author: 'Elizabeth George', category: 'mujeres', price: 520, format: 'Tapa rústica', tone: 'c5', description: lorem, pages: 272, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000040-0' },
  { id: 41, title: 'Mentiras que las mujeres creen', author: 'Nancy Leigh DeMoss', category: 'mujeres', price: 560, format: 'Tapa rústica', tone: 'c2', description: lorem, pages: 336, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000041-7' },
  { id: 42, title: 'Hombre del Reino', author: 'Tony Evans', category: 'libros', price: 590, oldPrice: 680, format: 'Tapa rústica', tone: 'c1', description: lorem, pages: 304, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000042-4' },
  { id: 43, title: 'En pos de Dios', author: 'A. W. Tozer', category: 'libros', price: 340, format: 'Tapa rústica', tone: 'c3', description: lorem, pages: 144, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000043-1' },
  { id: 44, title: 'Cura para la vida común', author: 'Max Lucado', category: 'libros', price: 480, format: 'Tapa rústica', tone: 'c4', description: lorem, pages: 224, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000044-8' },
  { id: 45, title: 'Aplauso del cielo', author: 'Max Lucado', category: 'libros', price: 450, format: 'Tapa rústica', tone: 'c2', description: lorem, pages: 208, publisher: 'Editorial de ejemplo', isbn: '978-0-00-000045-5' },
  // Biblias de Referencia Thompson: nombres, formatos y precios tomados de clcuruguay.com (páginas e ISBN, de ejemplo).
  { id: 46, title: 'Biblia de Referencia Thompson Piel Dos Tonos Gris/Negro', author: 'Thompson', category: 'biblias', price: 2930, format: 'Tapa suave', tone: 'c6', description: lorem, pages: 1500, publisher: 'CLC', isbn: '978-0-00-000046-2', collection: 'thompson' },
  { id: 47, title: 'Biblia Thompson Milenio Azul', author: 'Thompson', category: 'biblias', price: 2025, format: 'Tapa dura', tone: 'c4', description: lorem, pages: 1500, publisher: 'CLC', isbn: '978-0-00-000047-9', collection: 'thompson' },
  { id: 48, title: 'RVR60 Biblia Thompson Símil Piel Negro', author: 'Thompson', category: 'biblias', price: 3150, format: 'Imitación piel negro', tone: 'c6', description: lorem, pages: 1500, publisher: 'CLC', isbn: '978-0-00-000048-6', collection: 'thompson' },
];

/** Versión de cada Biblia (ejemplo). En Laravel sería una columna/relación del producto. */
const VERSION_BY_ID: Record<number, string> = {
  6: 'NVI', 7: 'RVR 1960', 8: 'RVR 1960', 19: 'NVI', 20: 'NTV', 21: 'RVR 1960', 22: 'RVR 1977', 23: 'NBLA', 35: 'NTV', 36: 'NBLA', 37: 'RVR 1977', 48: 'RVR 1960',
};
const BOOKS: Book[] = RAW_BOOKS.map((b) => (VERSION_BY_ID[b.id] ? { ...b, version: VERSION_BY_ID[b.id] } : b));

/** Autores destacados, según el menú de clcuruguay.com. */
const FEATURED_AUTHORS: Omit<Author, 'count'>[] = [
  { slug: 'max-lucado', name: 'Max Lucado', initials: 'ML', role: 'Pastor y autor' },
  { slug: 'josh-mcdowell', name: 'Josh McDowell', initials: 'JM', role: 'Autor y conferencista' },
  { slug: 'nancy-leigh-demoss', name: 'Nancy Leigh DeMoss', initials: 'ND', role: 'Autora y oradora' },
  { slug: 'tony-evans', name: 'Tony Evans', initials: 'TE', role: 'Pastor y autor' },
  { slug: 'elizabeth-george', name: 'Elizabeth George', initials: 'EG', role: 'Autora y oradora' },
  { slug: 'a-w-tozer', name: 'A. W. Tozer', initials: 'AT', role: 'Pastor y escritor' },
];

/** Versiones de Biblia, según el menú de clcuruguay.com. Los resúmenes son orientativos. */
const VERSIONS: Omit<BibleVersion, 'count'>[] = [
  { code: 'NVI', name: 'Nueva Versión Internacional', summary: 'Equilibra fidelidad a los textos originales con un español actual y claro.', bestFor: 'Lectura diaria y estudio' },
  { code: 'NTV', name: 'Nueva Traducción Viviente', summary: 'Traducida con un lenguaje contemporáneo y fluido, fácil de comprender.', bestFor: 'Quienes empiezan a leer la Biblia' },
  { code: 'NBLA', name: 'Nueva Biblia de las Américas', summary: 'Traducción de mayor literalidad, muy apreciada para el estudio detallado.', bestFor: 'Estudio y profundización' },
  { code: 'RVR 1960', name: 'Reina Valera 1960', summary: 'La versión tradicional y más difundida en las iglesias de habla hispana.', bestFor: 'Memorización y uso en la iglesia' },
  { code: 'RVR 1977', name: 'Reina Valera 1977', summary: 'Revisión de la Reina-Valera con un lenguaje algo más actualizado.', bestFor: 'Lectores de la tradición Reina-Valera' },
];

const pending = 'El texto completo de esta nota se cargará desde el administrador de contenidos. (Párrafo de ejemplo para la propuesta.)';

/**
 * GET /api/posts · GET /api/posts/{id}
 * Títulos y resúmenes basados en el blog actual de clcuruguay.com; fechas y cuerpo, de ejemplo.
 */
const POSTS: Post[] = [
  {
    id: 1, title: 'Seminario Virtual del Instituto de la Biblia Thompson', category: 'Seminarios', date: '22 oct 2026', tone: 'c4', link: '/thompson',
    excerpt: 'Los seminarios Biblia Thompson se dictaron presencialmente por más de 30 años; hoy llegan también en modalidad virtual.',
    body: [
      'Durante más de treinta años, los Seminarios Biblia Thompson se dictaron de forma presencial. La situación actual limitó la posibilidad de reunirnos, y por eso el Instituto ofrece ahora su formación también en modalidad virtual.',
      pending,
    ],
  },
  {
    id: 2, title: 'Biblias para el África Occidental de lengua francesa', category: 'Misiones', date: '15 oct 2026', tone: 'c2',
    excerpt: 'La misión de CLC de llevar el mensaje de salvación a todas las naciones se concreta en proyectos bíblicos en distintos continentes.',
    body: [
      'La misión de CLC es que el mensaje de salvación de Dios esté disponible para todas las naciones. Esa visión ha dado lugar a una serie de proyectos bíblicos en diferentes continentes, entre ellos la provisión de Biblias para el África Occidental de lengua francesa.',
      'Cada compra en CLC Uruguay destina recursos a la obra misionera y al trabajo social, aquí y en el mundo.',
      pending,
    ],
  },
  {
    id: 3, title: 'Descuento para estudiantes de Seminario', category: 'Descuentos', date: '9 oct 2026', tone: 'c3',
    excerpt: 'Apoyamos a quienes se forman en Seminarios e Institutos Bíblicos con un descuento especial en libros y Biblias.',
    body: [
      'En CLC Uruguay mantenemos nuestro compromiso de apoyar a los estudiantes de Seminarios e Institutos Bíblicos, con un descuento especial en libros y Biblias.',
      pending,
    ],
  },
  {
    id: 4, title: '¿A qué le tienes miedo? — Dr. David Jeremiah', category: 'Libros', date: '2 oct 2026', tone: 'c5',
    excerpt: 'Para muchas personas, la preocupación, la ansiedad y el miedo son compañeros constantes. Una guía para enfrentarlos con fe.',
    body: [
      'Para muchas personas, la preocupación, la ansiedad y el miedo son compañeros constantes: miedo a la muerte, al peligro, a la enfermedad. A menudo estos temores agobian y nos impiden vivir la vida a la que Dios nos ha llamado.',
      pending,
    ],
  },
  {
    id: 5, title: 'Material de Escuela Bíblica', category: 'Recursos', date: '25 sep 2026', tone: 'c1',
    excerpt: 'Recursos fundamentales para líderes y maestros de Escuela Bíblica: eventos, momentos de integración y más.',
    body: [
      'CLC Uruguay ofrece recursos fundamentales para todo líder y maestro de Escuela Bíblica. Descubrí nuestros materiales de ayuda para eventos, momentos de integración y más.',
      pending,
    ],
  },
];

const BRANCHES: Branch[] = [{ id: 1, name: 'CLC Montevideo — Casa Central', address: 'Avenida Uruguay 1424, Montevideo' }];

@Injectable({ providedIn: 'root' })
export class CatalogService {
  list(filter: BookFilter = {}): Observable<Book[]> {
    const q = (filter.q ?? '').trim().toLowerCase();
    const cat = filter.category ?? '';
    const author = FEATURED_AUTHORS.find((a) => a.slug === filter.author)?.name;
    return of(
      BOOKS.filter((b) => {
        if (cat === 'oportunidades' && !b.oldPrice) return false;
        if (cat && cat !== 'oportunidades' && b.category !== cat) return false;
        if (filter.author && b.author !== author) return false;
        if (filter.version && b.version !== filter.version) return false;
        if (filter.collection && b.collection !== filter.collection) return false;
        if (q && !`${b.title} ${b.author}`.toLowerCase().includes(q)) return false;
        return true;
      }),
    );
  }

  get(id: number): Observable<Book | undefined> {
    return of(BOOKS.find((b) => b.id === id));
  }

  /** Cantidad de productos por categoría (más `todos` y `oportunidades`). GET /api/books/counts */
  counts(): Record<string, number> {
    const c: Record<string, number> = { todos: BOOKS.length, oportunidades: BOOKS.filter((b) => !!b.oldPrice).length };
    for (const b of BOOKS) c[b.category] = (c[b.category] ?? 0) + 1;
    return c;
  }

  /** GET /api/authors */
  authors(): Observable<Author[]> {
    return of(FEATURED_AUTHORS.map((a) => ({ ...a, count: BOOKS.filter((b) => b.author === a.name).length })));
  }

  /** GET /api/bible-versions */
  versions(): Observable<BibleVersion[]> {
    return of(VERSIONS.map((v) => ({ ...v, count: BOOKS.filter((b) => b.version === v.code).length })));
  }

  authorName(slug: string): string | undefined {
    return FEATURED_AUTHORS.find((a) => a.slug === slug)?.name;
  }

  versionCodes(): string[] {
    return VERSIONS.map((v) => v.code);
  }

  posts(category = ''): Observable<Post[]> {
    return of(category ? POSTS.filter((p) => p.category === category) : POSTS);
  }

  post(id: number): Observable<Post | undefined> {
    return of(POSTS.find((p) => p.id === id));
  }

  postCategories(): string[] {
    return [...new Set(POSTS.map((p) => p.category))];
  }

  branches(): Observable<Branch[]> {
    return of(BRANCHES);
  }
}
