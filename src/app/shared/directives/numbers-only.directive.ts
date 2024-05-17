import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  private renderer = inject(Renderer2);
  constructor(private el: ElementRef) {
    this.renderer.setAttribute(this.el.nativeElement, 'inputmode', 'numeric');
  }

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    return this.validateInput(event);
  }

  private validateInput(event: InputEvent): boolean {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    inputElement.value = inputValue.replace(/[^0-9]/g, '');
    return true;
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  private validateFields(event: KeyboardEvent) {
    this.renderer.setProperty(this.el.nativeElement, 'value', this.el.nativeElement.value.replace(/[^0-9]/g, '').replace(/\s/g, ''));
  }
}