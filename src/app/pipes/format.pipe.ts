import { Pipe, Inject, LOCALE_ID } from '@angular/core';
import { formatCurrency, formatNumber, getCurrencySymbol } from '@angular/common';

@Pipe({
    name: 'formatNumber'
})
export class FormatNumberPipe {

    transform(value: number): number {
        return (value) ? value : 0;
    }
}

@Pipe({
    name: 'formatCurrency'
})
export class FormatCurrencyPipe {

    constructor(
        @Inject(LOCALE_ID) public locale: string
    ) { }
    transform(amount: number, currencyCode: string): string {
        try {
            if (currencyCode && currencyCode.length > 0) {
                let currency: string = currencyCode;
                currency = getCurrencySymbol(currency, 'narrow', this.locale);

                const num = strToNumber(amount);
                return formatCurrency(num, this.locale, currency, currencyCode);
            }
            else {
                return formatNumber(amount, this.locale);
            }
        } catch (error) {
            return '-';
        }
    }
}

function strToNumber(value: number | string): number {
    // Convert strings to numbers
    if (typeof value === 'string' && !isNaN(Number(value) - parseFloat(value))) {
        return Number(value);
    }
    if (typeof value !== 'number') {
        throw new Error(`${value} is not a number`);
    }
    return value;
}

