import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../core/cart.service';
import { CatalogService } from '../core/catalog.service';
import { UyuPipe } from '../core/uyu.pipe';

const SHIPPING = 190; // valor de ejemplo

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, RouterLink, UyuPipe],
  template: `
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span><a routerLink="/carrito">Carrito</a><span>/</span>Finalizar compra</div>

        @if (order()) {
          <div class="panel done">
            <div class="ok">✓</div>
            <h1>¡Gracias por tu compra!</h1>
            <p>Tu pedido <b>{{ order() }}</b> fue recibido. Te enviamos el detalle por correo.</p>
            <p class="demo">Esto es una demostración: no se procesó ningún pago real.</p>
            <a class="btn btn-primary" routerLink="/">Volver al inicio</a>
          </div>
        } @else if (!cart.items().length) {
          <div class="panel done"><h2>No hay productos en tu carrito</h2><a class="btn btn-primary" routerLink="/catalogo">Ver catálogo</a></div>
        } @else {
          <h1>Finalizar compra</h1>
          <i class="rule"></i>

          <form class="layout" [formGroup]="form" (ngSubmit)="submit()">
            <div class="steps">
              <section class="panel">
                <h3><span>1</span> Tus datos</h3>
                <div class="two">
                  <label class="field">Nombre y apellido
                    <input formControlName="name" autocomplete="name" />
                    @if (invalid('name')) { <span class="err">Ingresá tu nombre</span> }
                  </label>
                  <label class="field">Teléfono
                    <input formControlName="phone" autocomplete="tel" />
                    @if (invalid('phone')) { <span class="err">Ingresá un teléfono</span> }
                  </label>
                </div>
                <label class="field">Correo electrónico
                  <input type="email" formControlName="email" autocomplete="email" />
                  @if (invalid('email')) { <span class="err">Ingresá un correo válido</span> }
                </label>
              </section>

              <section class="panel">
                <h3><span>2</span> Entrega</h3>
                <div class="opts">
                  <label class="opt" [class.on]="delivery() === 'pickup'">
                    <input type="radio" formControlName="delivery" value="pickup" />
                    <div><b>Retiro en librería</b><small>Gratis · listo en 24 hs</small></div>
                  </label>
                  <label class="opt" [class.on]="delivery() === 'ship'">
                    <input type="radio" formControlName="delivery" value="ship" />
                    <div><b>Envío a domicilio</b><small>{{ shipping | uyu }} · 2 a 4 días hábiles</small></div>
                  </label>
                </div>
                @if (delivery() === 'pickup') {
                  <label class="field">Sucursal
                    <select formControlName="branch">
                      @for (b of branches(); track b.id) { <option [value]="b.id">{{ b.name }} — {{ b.address }}</option> }
                    </select>
                  </label>
                } @else {
                  <label class="field">Dirección de envío
                    <input formControlName="address" autocomplete="street-address" />
                    @if (invalid('address')) { <span class="err">Ingresá la dirección</span> }
                  </label>
                }
              </section>

              <section class="panel">
                <h3><span>3</span> Pago</h3>
                <div class="opts">
                  <label class="opt" [class.on]="form.value.payment === 'card'"><input type="radio" formControlName="payment" value="card" /><div><b>Tarjeta</b><small>Crédito o débito</small></div></label>
                  <label class="opt" [class.on]="form.value.payment === 'transfer'"><input type="radio" formControlName="payment" value="transfer" /><div><b>Transferencia</b><small>Bancaria</small></div></label>
                </div>
              </section>
            </div>

            <aside class="panel summary">
              <h3>Tu pedido</h3>
              @for (i of cart.items(); track i.book.id) {
                <div class="r"><span>{{ i.qty }} × {{ i.book.title }}</span><b>{{ i.book.price * i.qty | uyu }}</b></div>
              }
              <div class="r sub"><span>Subtotal</span><b>{{ cart.subtotal() | uyu }}</b></div>
              <div class="r"><span>Envío</span><b>{{ shipCost() ? (shipCost() | uyu) : 'Gratis' }}</b></div>
              <div class="r total"><span>Total</span><b>{{ total() | uyu }}</b></div>
              <button class="btn btn-gold btn-block" type="submit">Confirmar pedido</button>
              <p class="hint">Compra segura · datos de ejemplo</p>
            </aside>
          </form>
        }
      </div>
    </div>
  `,
  styles: `
    .layout { display: grid; grid-template-columns: 1fr 380px; gap: 32px; margin-top: 32px; align-items: start; }
    .steps { display: grid; gap: 20px; }
    .panel h3 { font-size: 28px; margin-bottom: 18px; display: flex; align-items: center; gap: 12px; }
    .panel h3 span { width: 30px; height: 30px; border-radius: 50%; background: var(--navy-700); color: #fff; font: 600 14px var(--sans); display: grid; place-items: center; }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .opts { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
    .opt { display: flex; gap: 12px; align-items: center; border: 1.5px solid var(--stone); border-radius: var(--r); padding: 14px 16px; background: #fff; cursor: pointer; }
    .opt.on { border-color: var(--navy-700); background: #f3f8fc; }
    .opt input { accent-color: var(--navy-700); width: 18px; height: 18px; }
    .opt b { display: block; font-size: 15px; } .opt small { color: var(--ink-2); font-size: 13px; }
    .summary { position: sticky; top: 100px; display: grid; gap: 12px; }
    .r { display: flex; justify-content: space-between; gap: 12px; font-size: 14px; color: var(--ink-2); }
    .r b { color: var(--ink); white-space: nowrap; }
    .sub { border-top: 1px solid var(--stone); padding-top: 12px; }
    .total { border-top: 1px solid var(--stone); padding-top: 12px; font-size: 18px; color: var(--ink); }
    .total b { color: var(--wine-700); font-size: 22px; }
    .hint { font-size: 13px; color: var(--ink-2); text-align: center; }
    .done { text-align: center; padding: 64px 24px; margin-top: 32px; display: grid; gap: 14px; justify-items: center; }
    .ok { width: 64px; height: 64px; border-radius: 50%; background: var(--ok); color: #fff; font-size: 32px; display: grid; place-items: center; }
    .demo { font-size: 13px; color: var(--ink-2); }
    .steps, .summary { min-width: 0; }
    @media (max-width: 1000px) { .layout { grid-template-columns: minmax(0, 1fr); } .summary { position: static; } .two, .opts { grid-template-columns: minmax(0, 1fr); } }
    @media (max-width: 640px) { .panel h3 { font-size: 24px; } .done { padding: 40px 16px; } }
  `,
})
export class Checkout {
  protected readonly cart = inject(CartService);
  private readonly fb = inject(FormBuilder);
  readonly branches = toSignal(inject(CatalogService).branches(), { initialValue: [] });
  readonly shipping = SHIPPING;
  readonly order = signal('');

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    delivery: ['pickup' as 'pickup' | 'ship'],
    branch: ['1'],
    address: [''],
    payment: ['card'],
  });

  private readonly deliveryValue = toSignal(this.form.controls.delivery.valueChanges, { initialValue: 'pickup' as 'pickup' | 'ship' });
  readonly delivery = this.deliveryValue;
  readonly shipCost = computed(() => (this.delivery() === 'ship' ? SHIPPING : 0));
  readonly total = computed(() => this.cart.subtotal() + this.shipCost());

  invalid(name: 'name' | 'phone' | 'email' | 'address'): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || c.dirty);
  }

  submit(): void {
    const { delivery, address } = this.form.getRawValue();
    this.form.controls.address.setValidators(delivery === 'ship' ? Validators.required : null);
    this.form.controls.address.updateValueAndValidity();
    if (this.form.invalid || (delivery === 'ship' && !address.trim())) {
      this.form.markAllAsTouched();
      return;
    }
    this.order.set('#CLC-' + Math.floor(10000 + Math.random() * 90000));
    this.cart.clear();
  }
}
