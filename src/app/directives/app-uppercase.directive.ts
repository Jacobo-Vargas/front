import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appUppercaseWithoutAccents]'
})
export class UppercaseWithoutAccentsDirective {

  constructor(private el: ElementRef, private ngModel: NgModel) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const inputValue = this.removeAccents(event.target.value).toUpperCase();
    this.ngModel.update.emit(inputValue);
    this.el.nativeElement.value = inputValue;
  }

  removeAccents(str: string): string {
    const normalized = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return normalized.replace(/[^a-zA-Z\s]/g, '');
  }
}
