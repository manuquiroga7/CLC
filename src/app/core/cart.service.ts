import { Injectable, computed, effect, signal } from '@angular/core';
import { Book, CartItem } from './models';

const KEY = 'clc-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(this.load());
  readonly count = computed(() => this.items().reduce((n, i) => n + i.qty, 0));
  readonly subtotal = computed(() => this.items().reduce((s, i) => s + i.qty * i.book.price, 0));

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(KEY, JSON.stringify(this.items()));
      } catch {
        /* almacenamiento no disponible: el carrito vive solo en memoria */
      }
    });
  }

  add(book: Book, qty = 1): void {
    this.items.update((list) => {
      const found = list.find((i) => i.book.id === book.id);
      return found
        ? list.map((i) => (i.book.id === book.id ? { ...i, qty: i.qty + qty } : i))
        : [...list, { book, qty }];
    });
  }

  setQty(id: number, qty: number): void {
    if (qty < 1) return this.remove(id);
    this.items.update((list) => list.map((i) => (i.book.id === id ? { ...i, qty } : i)));
  }

  remove(id: number): void {
    this.items.update((list) => list.filter((i) => i.book.id !== id));
  }

  clear(): void {
    this.items.set([]);
  }

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}
