import {Inject, LOCALE_ID, NgModule, Pipe, PipeTransform} from '@angular/core';
import {formatDate} from '@angular/common';

@Pipe({
    name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) private locale: string) {
    }

    transform(value: any): string | null {
        if (value == null || value === '' || value !== value) {
            return null;
        }
        return formatDate(value, 'shortDate', this.locale) + ' ' + formatDate(value, 'mediumTime', this.locale);
    }
}

@NgModule({
    declarations: [
        DateTimePipe
    ],
    exports: [
        DateTimePipe
    ],
    providers: []
})
export class DateTimePipeModule {
}
