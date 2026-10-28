# CLC Uruguay — Propuesta de rediseño web

Front-end navegable (Angular) de una propuesta de rediseño para [clcuruguay.com](https://clcuruguay.com/).
Es una **propuesta visual**: no tiene backend y todos los datos son de ejemplo. El logo y la marca de CLC se usan sin modificar.

## Stack

- Angular 21 (componentes standalone, signals, control flow `@if` / `@for`)
- SCSS con *design tokens* como variables CSS (`src/styles.scss`)
- Sin librerías de UI: todo el diseño es propio

## Cómo correrlo

```bash
npm install
npm start          # http://localhost:4200
npm run build      # build de producción en dist/
```

Requiere Node 20 o superior.

## Qué incluye

| Ruta | Página |
|---|---|
| `/` | Home: hero con slider, carruseles infinitos por categoría, autores, versiones, Instituto Thompson, noticias, redes |
| `/catalogo` | Catálogo completo con filtros (`?cat=`, `?q=`, `?author=`, `?version=`, `?collection=`) y orden |
| `/libro/:id` | Ficha de producto |
| `/carrito`, `/checkout` | Carrito y compra en una página (simulada) |
| `/versiones`, `/autores` | Navegación por versión de Biblia y por autor destacado |
| `/thompson` | Instituto Internacional de la Biblia Thompson |
| `/nosotros` | Misión, visión, valores, ministerio e historia |
| `/noticias`, `/noticias/:id` | Listado y detalle del blog |
| `/sucursales`, `/contacto` | Mapa, horarios y formulario |

Responsive probado en 375, 768 y 1280 px. Menú móvil con buscador, botón "volver arriba" y WhatsApp flotante.

## Estructura

```
src/app/
  core/     modelos, servicios (catálogo, carrito), datos de contacto y redes
  layout/   header (con menú móvil) y footer
  ui/       componentes reutilizables: carrusel infinito, tarjeta de producto, portada, slider, etc.
  pages/    una carpeta-archivo por ruta
```

## Sistema visual

Se conserva el azul y el dorado de la marca y se les asigna un rol claro:

| Rol | Valor |
|---|---|
| Navy profundo (header, footer, títulos) | `#0A2A43` |
| Azul CLC (marca, botones primarios) | `#08416C` |
| Azul acción (links) | `#1569A8` |
| Dorado (único acento) | `#D4A82A` |
| Burdeos (precios y ofertas) | `#7A1F2B` |
| Marfil (fondo) | `#FAF7F2` |

Tipografía: *Cormorant Garamond* para títulos e *Inter* para texto e interfaz.

## Preparado para un backend Laravel

Los datos viven en `src/app/core/catalog.service.ts` y cada método devuelve un `Observable`, con la forma de una API. Para conectarlo, se reemplaza el contenido por `HttpClient` sin tocar los componentes:

| Método | Endpoint previsto |
|---|---|
| `list(filtro)` | `GET /api/books?q=&category=&author=&version=&collection=` |
| `get(id)` | `GET /api/books/{id}` |
| `counts()` | `GET /api/books/counts` |
| `authors()` | `GET /api/authors` |
| `versions()` | `GET /api/bible-versions` |
| `posts()` / `post(id)` | `GET /api/posts` · `GET /api/posts/{id}` |
| `branches()` | `GET /api/branches` |
| formulario de contacto | `POST /api/contact` |

El carrito se guarda en `localStorage` (`src/app/core/cart.service.ts`).

## Datos reales y datos de ejemplo

**Tomados de clcuruguay.com:** dirección, teléfonos, correo y horarios; redes sociales y canal de YouTube; misión, visión, valores e historia; autores destacados y versiones de Biblia; objetivos y requisitos del Seminario Thompson; títulos de las notas del blog; nombre, formato y precio de las tres Biblias de Referencia Thompson.

**De ejemplo:** portadas (generadas con color y texto), precios y descripciones del resto del catálogo, fechas y cuerpo de las notas, ISBN y cantidad de páginas.

## Para confirmar con CLC

- El número `091 744 081` figura como celular en su web; se usa como WhatsApp.
- Las cifras institucionales (países, librerías) difieren entre las páginas de su sitio actual. Se usaron las de la página *Historia*: 48 países y más de 180 librerías.
- Los horarios publicados son los de la "Oficina Web"; no se publican los de la librería física.
- Fechas de próximas ediciones y costo de inscripción del Seminario Thompson.
