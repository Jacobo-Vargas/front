import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appNumberWithoutSymbols]'
})
export class NumberWithoutSymbolsDirective {

  constructor(private el: ElementRef, private ngModel: NgModel) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const inputValue = this.el.nativeElement.value;

    const key = event.key;
    const code = event.code;

    if (['Backspace', 'Tab', 'Escape', 'Enter', 'Delete', 'NumpadDecimal', 'Period'].indexOf(key) !== -1 ||
      (event.ctrlKey && ['a', 'c', 'x'].indexOf(key.toLowerCase()) !== -1) ||
      (['Home', 'End', 'ArrowLeft', 'ArrowRight'].indexOf(key) !== -1)) {
      return;
    }

    if ((!/^\d$/.test(key) && key !== '') || (code === 'KeyX' && event.ctrlKey)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event']) onInput(event: any) {
    const inputValue = this.cleanInput(event.target.value);
    this.ngModel.update.emit(inputValue);
    this.el.nativeElement.value = inputValue;
  }

  cleanInput(str: string): string {
    return str.replace(/[^0-9]/g, '');
  }
}
