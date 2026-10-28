import { Routes } from '@angular/router';
import { About } from './pages/about';
import { Authors } from './pages/authors';
import { Branches } from './pages/branches';
import { Cart } from './pages/cart';
import { Catalog } from './pages/catalog';
import { Checkout } from './pages/checkout';
import { Contact } from './pages/contact';
import { Home } from './pages/home';
import { News } from './pages/news';
import { NewsDetail } from './pages/news-detail';
import { Product } from './pages/product';
import { Thompson } from './pages/thompson';
import { Versions } from './pages/versions';

export const routes: Routes = [
  { path: '', component: Home, title: 'CLC Uruguay — Libros cristianos, Biblias y regalos' },
  { path: 'catalogo', component: Catalog, title: 'Catálogo — CLC Uruguay' },
  { path: 'libro/:id', component: Product, title: 'Libro — CLC Uruguay' },
  { path: 'carrito', component: Cart, title: 'Carrito — CLC Uruguay' },
  { path: 'checkout', component: Checkout, title: 'Finalizar compra — CLC Uruguay' },
  { path: 'sucursales', component: Branches, title: 'Sucursales — CLC Uruguay' },
  { path: 'nosotros', component: About, title: 'Nosotros — CLC Uruguay' },
  { path: 'contacto', component: Contact, title: 'Contacto — CLC Uruguay' },
  { path: 'thompson', component: Thompson, title: 'Instituto Thompson — CLC Uruguay' },
  { path: 'autores', component: Authors, title: 'Autores destacados — CLC Uruguay' },
  { path: 'versiones', component: Versions, title: 'Biblias por versión — CLC Uruguay' },
  { path: 'noticias', component: News, title: 'Noticias — CLC Uruguay' },
  { path: 'noticias/:id', component: NewsDetail, title: 'Noticia — CLC Uruguay' },
  { path: '**', redirectTo: '' },
];
