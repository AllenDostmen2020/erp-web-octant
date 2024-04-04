import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  private renderer = inject(Renderer2);
  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    return this.validateNumber(event);
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    return this.validateNumber(event);
  }

  validateNumber(event: KeyboardEvent) {
    const code = event.keyCode ? event.keyCode: 0;
    if (code === 8 || code === 0) {
      return true;
    } else if (code >= 48 && code <= 57) {
      return true;
    } else if (event.getModifierState('NumLock') && (code >= 96 && code <= 105)) {
      return true;
    } else if (event.ctrlKey) {
      // for ctrl + v
      return true;
    } else {
      return false;
    }
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  validateFields(event: KeyboardEvent) {
    /* 
        Avoid direct DOM updation. better to use Renderer2 
        this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^0-9 ]/g, '').replace(/\s/g, '');
      */
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      this.el.nativeElement.value.replace(/[^0-9 ]/g, '').replace(/\s/g, '')
    );
    event.preventDefault();
  }
}