import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  private renderer = inject(Renderer2);
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    return this.validateCharacter(event);
  }

  private validateCharacter(event: KeyboardEvent): boolean {
    const allowedChars = /[0-9]/;
    const key = event.key;    

    if (event.ctrlKey || event.metaKey || key === 'Backspace' || key === 'Tab') {
      return true;
    }

    if (!allowedChars.test(key)) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  private validateFields(event: KeyboardEvent) {
    this.renderer.setProperty(this.el.nativeElement, 'value', this.el.nativeElement.value.replace(/[^0-9]/g, '').replace(/\s/g, ''));
    event.preventDefault();
  }
}