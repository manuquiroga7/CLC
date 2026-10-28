import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CONTACT } from '../core/contact';
import { MapEmbed } from '../ui/map';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink, MapEmbed],
  template: `
    <div class="page">
      <div class="wrap">
        <div class="crumbs"><a routerLink="/">Inicio</a><span>/</span>Contacto</div>
        <h1>Contacto</h1>
        <i class="rule"></i>
        <p class="lead">¿Una consulta sobre un pedido, un libro o el retiro en librería? Escribinos por el medio que prefieras.</p>

        <div class="layout">
          <aside class="channels">
            <a class="chan wa" [href]="c.whatsapp" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v11H9l-5 4z"/></svg>
              <div><b>WhatsApp</b><span>{{ c.mobile }} · respuesta rápida</span></div><i>→</i>
            </a>
            <a class="chan" [href]="c.phoneHref">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>
              <div><b>Teléfono</b><span>{{ c.phone }}</span></div><i>→</i>
            </a>
            <a class="chan" [href]="'mailto:' + c.email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
              <div><b>Correo</b><span>{{ c.email }}</span></div><i>→</i>
            </a>
            <div class="panel hours">
              <h3>Horario de atención</h3>
              @for (h of c.hours; track h.days) { <div><span>{{ h.days }}</span><b>{{ h.time }}</b></div> }
              <p>{{ c.street }}, {{ c.city }}</p>
            </div>
          </aside>

          <section class="panel form">
            @if (sent()) {
              <div class="done">
                <div class="ok">✓</div>
                <h2>¡Mensaje enviado!</h2>
                <p>Gracias por escribirnos. Te responderemos a la brevedad.</p>
                <p class="demo">Esto es una demostración: el mensaje no se envió realmente.</p>
                <button class="btn btn-ghost" (click)="reset()">Enviar otro mensaje</button>
              </div>
            } @else {
              <h2>Envianos un mensaje</h2>
              <form [formGroup]="f" (ngSubmit)="submit()" novalidate>
                <div class="two">
                  <label class="field">Nombre y apellido
                    <input formControlName="name" autocomplete="name" />
                    @if (bad('name')) { <span class="err">Ingresá tu nombre</span> }
                  </label>
                  <label class="field">Teléfono (opcional)
                    <input formControlName="phone" autocomplete="tel" />
                  </label>
                </div>
                <label class="field">Correo electrónico
                  <input type="email" formControlName="email" autocomplete="email" />
                  @if (bad('email')) { <span class="err">Ingresá un correo válido</span> }
                </label>
                <label class="field">Motivo
                  <select formControlName="topic">
                    <option>Consulta sobre un pedido</option>
                    <option>Consulta sobre un libro o Biblia</option>
                    <option>Retiro en librería</option>
                    <option>Envíos y pagos</option>
                    <option>Otro</option>
                  </select>
                </label>
                <label class="field">Mensaje
                  <textarea formControlName="message" rows="5"></textarea>
                  @if (bad('message')) { <span class="err">Escribí tu mensaje</span> }
                </label>
                <button class="btn btn-primary" type="submit">Enviar mensaje</button>
              </form>
            }
          </section>
        </div>

        <div class="mapwrap"><app-map /></div>
      </div>
    </div>
  `,
  styles: `
    .lead { color: var(--ink-2); margin: 20px 0 32px; }
    .layout { display: grid; grid-template-columns: 400px 1fr; gap: 24px; align-items: start; }
    .channels { display: grid; gap: 12px; }
    .chan { display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid var(--stone); border-radius: var(--r); padding: 16px 20px; transition: 0.2s; }
    .chan:hover { border-color: var(--gold-500); transform: translateX(4px); box-shadow: var(--shadow-1); }
    .chan svg { width: 28px; height: 28px; color: var(--navy-700); flex: none; }
    .chan div { flex: 1; display: flex; flex-direction: column; line-height: 1.3; min-width: 0; }
    .chan b { font-family: var(--serif); font-size: 22px; color: var(--navy-900); font-weight: 600; }
    .chan span { font-size: 13px; color: var(--ink-2); overflow-wrap: anywhere; }
    .chan i { font-style: normal; color: var(--blue-600); font-size: 20px; }
    .chan.wa { border-color: #bfe3cd; background: #f3faf6; }
    .chan.wa svg { color: var(--ok); }
    .hours { margin-top: 8px; display: grid; gap: 8px; }
    .hours h3 { font-size: 26px; margin-bottom: 4px; }
    .hours div { display: flex; justify-content: space-between; font-size: 14px; color: var(--ink-2); border-bottom: 1px solid var(--stone); padding-bottom: 8px; }
    .hours b { color: var(--ink); font-weight: 500; }
    .hours p { font-size: 13px; color: var(--ink-2); }
    .form h2 { font-size: 34px; margin-bottom: 20px; }
    form { display: grid; gap: 16px; }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    textarea { padding: 12px 14px; border: 1.5px solid var(--stone); border-radius: var(--r); font: inherit; font-weight: 400; resize: vertical; background: #fff; color: var(--ink); }
    textarea:focus { outline: none; border-color: var(--blue-600); box-shadow: 0 0 0 3px rgba(21, 105, 168, 0.15); }
    form .btn { justify-self: start; height: 48px; padding: 0 28px; }
    .done { text-align: center; display: grid; gap: 12px; justify-items: center; padding: 24px 0; }
    .ok { width: 64px; height: 64px; border-radius: 50%; background: var(--ok); color: #fff; font-size: 32px; display: grid; place-items: center; }
    .done p { color: var(--ink-2); } .demo { font-size: 13px; }
    .mapwrap { margin-top: 32px; height: 380px; }
    @media (max-width: 1000px) { .layout { grid-template-columns: 1fr; } .two { grid-template-columns: 1fr; } }
  `,
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  protected readonly c = CONTACT;
  protected readonly sent = signal(false);

  protected readonly f = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: [''],
    email: ['', [Validators.required, Validators.email]],
    topic: ['Consulta sobre un pedido'],
    message: ['', Validators.required],
  });

  bad(name: 'name' | 'email' | 'message'): boolean {
    const ctl = this.f.controls[name];
    return ctl.invalid && (ctl.touched || ctl.dirty);
  }

  submit(): void {
    if (this.f.invalid) {
      this.f.markAllAsTouched();
      return;
    }
    // Demo: acá iría POST /api/contact hacia Laravel.
    this.sent.set(true);
  }

  reset(): void {
    this.f.reset({ topic: 'Consulta sobre un pedido' });
    this.sent.set(false);
  }
}
