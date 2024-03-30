import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appCharactersOnly]',
  standalone: true,
})
export class CharactersOnlyDirective {
  private renderer = inject(Renderer2);
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    return this.validateCharacter(event);
  }

  validateCharacter(event: KeyboardEvent): boolean {
    const allowedChars = /[a-zA-Z]/;
    const key = event.key;

    if (event.ctrlKey || event.metaKey || key === 'Backspace') {
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

  validateFields(event: KeyboardEvent) {
    /* 
        Avoid direct DOM updation. better to use Renderer2 
        this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^a-zA-Z ]/g, '').replace(/\s/g, '');
      */
    this.renderer.setProperty(
      this.el.nativeElement,
      'value',
      this.el.nativeElement.value.replace(/[^a-zA-Z ]/g, '').replace(/\s/g, '')
    );
    event.preventDefault();
  }
}