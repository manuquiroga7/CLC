import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CONTACT } from '../core/contact';

/** Mapa embebido de la librería (Google Maps, sin API key). */
@Component({
  selector: 'app-map',
  template: `
    <div class="map">
      <iframe [src]="src" title="Mapa: CLC Uruguay, Avenida Uruguay 1424" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  `,
  styles: `
    :host { display: block; height: 100%; }
    .map { position: relative; height: 100%; min-height: 360px; border-radius: var(--r); overflow: hidden; border: 1px solid var(--stone); background: var(--stone); }
    iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
  `,
})
export class MapEmbed {
  protected readonly src = inject(DomSanitizer).bypassSecurityTrustResourceUrl(CONTACT.mapEmbed);
}
