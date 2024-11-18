import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormat]'
})
export class CurrencyFormatDirective {

  private readonly separator: string = '.';
  private readonly decimalSeparator: string = ',';
  private readonly millionsSeparator: string = '\'';
  private readonly currencySymbol: string = '$';

  constructor(private el: ElementRef, private ngModel: NgModel) { }

  public static applyCurrencyFormat(value: string): string {

    const separator: string = '.';
    const decimalSeparator: string = ',';
    const millionsSeparator: string = '\'';
    const currencySymbol: string = '$';

    // Verificar si el valor es negativo
    let isNegative = false;
    if (value.startsWith('-')) {
      isNegative = true;
      value = value.substring(1); // Eliminar el signo negativo para el formateo
    }

    // Remove any non-numeric characters
    value = value.replace(new RegExp(`[^0-9${decimalSeparator}]`, 'g'), '');

    // If the value is empty, set it to 0
    if (value.length === 0) {
      value = '0';
    }

    // Split the value into integer and decimal parts
    const parts = value.split(decimalSeparator);
    const integer = parts[0];
    const decimal = value.includes(decimalSeparator);

    // Format the integer part with separators
    let formattedValue = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    // Add millions separator if needed
    if (formattedValue.length > 6) {
      formattedValue = formattedValue.replace(/(\d{3})(?=(\d{3})+(?!\d))/g, `$1${millionsSeparator}`);
    }

    // Remove leading zeros from the integer part
    const formattedResult = formattedValue.replace(/^0+([^.])/g, '$1');

    // Combine the integer and decimal parts, add currency symbol and handle negative value
    let resultWithSymbol = (isNegative ? '-' : '') + currencySymbol + formattedResult;
    if (decimal) {
      resultWithSymbol += decimalSeparator + parts[1];
    }

    // Final adjustment: remove any leading currency symbol followed by unnecessary zeros
    return resultWithSymbol.replace(/^\$0+([^.])/g, '$1');
  }


  public static applyCurrencyFormatTotal(value: string): string {

    const separator: string = '.';
    const decimalSeparator: string = ',';
    const millionsSeparator: string = '\'';
    const currencySymbol: string = '$';

    // Remove any non-numeric characters
    value = value.replace(new RegExp(`[^0-9${decimalSeparator}]`, 'g'), '');

    // If the value is empty, set it to 0
    if (value.length === 0) {
      value = '0';
    }

    // Split the value into integer and decimal parts
    const parts = value.split(decimalSeparator);
    const integer = parts[0];
    const decimal = value.includes(decimalSeparator);

    // Format the integer part with separators
    let formattedValue = integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    // Add millions separator if needed
    if (formattedValue.length > 6) {
      formattedValue = formattedValue.replace(/(\d{3})(?=(\d{3})+(?!\d))/g, `$1${millionsSeparator}`);
    }

    // Remove leading zeros from the integer part
    const formattedResult = formattedValue.replace(/^0+([^.])/g, '$1');

    // Combine the integer and decimal parts, add currency symbol
    let resultWithSymbol = currencySymbol + formattedResult;
    if (decimal) {
        resultWithSymbol += decimalSeparator + parts[1];
    }

    // Final adjustment: remove any leading currency symbol followed by unnecessary zeros
    return resultWithSymbol.replace(/^\$0+([^.])/g, '$1');
  }


  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    const result = this.replaceCurrency(value);

    // Update the input value with the formatted value
    this.ngModel.update.emit(result);
    this.el.nativeElement.value = result;
  }

  replaceCurrency(value: string): string {
    // Remove any non-numeric characters
    value = value.replace(new RegExp(`[^0-9${this.decimalSeparator}]`, 'g'), '');

    // If the value is empty, set it to 0
    if (value.length === 0) {
      value = '0';
    }

    // Split the value into integer and decimal parts
    const parts = value.split(this.decimalSeparator);
    const integer = parts[0];
    const decimal = value.includes(this.decimalSeparator);

    // Format the integer part with separators
    let formattedValue = integer.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator);

    // Add millions separator if needed
    if (formattedValue.length > 6) {
        formattedValue = formattedValue.replace(/(\d{3})(?=(\d{3})+(?!\d))/g, `$1${this.millionsSeparator}`);
    }

    // Remove leading zeros from the integer part
    const formattedResult = formattedValue.replace(/^0+([^.])/g, '$1');

    // Combine the integer and decimal parts, add currency symbol
    let resultWithSymbol = this.currencySymbol + formattedResult;
    if (decimal) {
        resultWithSymbol += this.decimalSeparator + parts[1];
    }
    // Final adjustment: remove any leading currency symbol followed by unnecessary zeros
    return resultWithSymbol.replace(/^\$0+([^.])/g, '$1');
  }
}
