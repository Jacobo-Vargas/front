import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumericOnly]'
})
export class NumericOnlyDirective {

  constructor() { }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const regex = /^[0-9]*$/;
    const valid = regex.test(input.value);
    if (!valid) {
      input.value = input.value.replace(/[^0-9]/g, '');
    }
  }

}