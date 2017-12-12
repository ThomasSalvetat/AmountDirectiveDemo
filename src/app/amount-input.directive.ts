import {Directive, ElementRef, forwardRef, HostListener, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';

@Directive({
  selector: '[appAmountInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountInputDirective),
      multi: true
    }
  ]
})
export class AmountInputDirective implements ControlValueAccessor {
  private value: number;
  private onTouched: (() => void)[] = [];
  private onChange: ((_?: any) => void)[] = [];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private currencyPipe: CurrencyPipe
  ) {}

  private denormalizeValue(value: string): number {
    const sanitizedValue = value.replace(',', '.');
    return Number.parseFloat(Number.parseFloat(sanitizedValue).toFixed(2));
  }

  private normalizeValue(value: number): string {
    return value !== undefined ? value.toFixed(2).replace('.', ',') : '';
  }

  private formatValue(value: number) {
    return value !== undefined ? this.currencyPipe.transform(this.value, 'EUR', true) : '';
  }

  @HostListener('focus')
  onFocus() {
    if (this.value !== undefined) {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'value',
        this.normalizeValue(this.value)
      );
    }
  }

  @HostListener('blur')
  onBlur() {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'value',
      this.formatValue(this.value)
    );
    this.onTouched.forEach(t => t());
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value) {
    const reg = /^\d+([,.]\d{0,2})?$/;
    if (!reg.test(value)) {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'value',
        this.normalizeValue(this.value)
      );
      return false;
    }

    const amount = this.denormalizeValue(value);
    if (!isNaN(amount)) {
      this.value = amount;
      this.onChange.forEach(c => c(this.value));
    }
  }

  writeValue(obj: any): void {
    if (typeof obj === 'number') {
      this.value = obj;
    } else {
      this.value = undefined;
    }
    this.onBlur();
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched.push(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
