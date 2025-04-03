import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'billingPeriod' })
export class BillingPeriodPipe implements PipeTransform {
  transform(value: string): string {
    const mapping:any = {
      MONTHLY: 'Monthly',
      QUARTERLY: 'Quarterly',
      SEMI_ANNUAL: 'Semi-Annual',
      ANNUAL: 'Annual',
    };
    return mapping[value] || 'Billing period not set';
  }
}
