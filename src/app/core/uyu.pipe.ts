import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uyu' })
export class UyuPipe implements PipeTransform {
  transform(value: number): string {
    return '$U ' + value.toLocaleString('es-UY');
  }
}
