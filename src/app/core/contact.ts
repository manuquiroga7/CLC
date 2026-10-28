/** Datos de contacto reales de CLC Uruguay (tomados de clcuruguay.com/contacto y /sucursales). */
export const CONTACT = {
  name: 'CLC Montevideo — Casa Central',
  street: 'Avenida Uruguay 1424',
  city: 'Montevideo, Uruguay',
  phone: '2908 0016',
  phoneHref: 'tel:+59829080016',
  // Celular publicado en su página de sucursales. Se asume que es el de WhatsApp: confirmar con CLC.
  mobile: '091 744081',
  whatsapp: 'https://wa.me/59891744081?text=' + encodeURIComponent('Hola CLC Uruguay, quisiera hacer una consulta.'),
  email: 'comprasweb@clcuruguay.com',
  web: 'www.clcuruguay.com',
  mapEmbed: 'https://maps.google.com/maps?q=' + encodeURIComponent('Avenida Uruguay 1424, Montevideo, Uruguay') + '&z=16&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Avenida Uruguay 1424, Montevideo, Uruguay'),
  hours: [
    { days: 'Lunes a Viernes', time: '9:30 a 18:30 hs' },
    { days: 'Sábado', time: '9:00 a 13:00 hs' },
    { days: 'Domingo', time: 'Cerrado' },
  ],
} as const;

/** ¿Está abierto ahora? Usa la hora de Montevideo, sin importar la zona del visitante. */
export function openStatus(now = new Date()): { open: boolean; text: string } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Montevideo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = get('weekday');
  const minutes = +get('hour') * 60 + +get('minute');

  const range: [number, number] | null =
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day) ? [9 * 60 + 30, 18 * 60 + 30] : day === 'Sat' ? [9 * 60, 13 * 60] : null;

  if (range && minutes >= range[0] && minutes < range[1]) {
    const close = range[1];
    return { open: true, text: `Abierto ahora · cierra a las ${Math.floor(close / 60)}:${String(close % 60).padStart(2, '0')}` };
  }
  return { open: false, text: 'Cerrado ahora' };
}
