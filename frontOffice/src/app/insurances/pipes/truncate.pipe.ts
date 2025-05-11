import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, keep: number = 4): string {
    if (!value) return '';
    return `${value.slice(0, keep)}...${value.slice(-keep)}`;
  }
}
