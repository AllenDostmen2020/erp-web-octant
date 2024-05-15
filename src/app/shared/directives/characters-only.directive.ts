import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appCharactersOnly]',
  standalone: true,
})
export class CharactersOnlyDirective {
  private renderer = inject(Renderer2);
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    return this.validateInput(event);
  }
  
  private validateInput(event: InputEvent): boolean {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    inputElement.value = inputValue.replace(/[^a-zA-Z\s]/g, '');
    return true;
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  public validateFields(event: KeyboardEvent) {
    this.renderer.setProperty(this.el.nativeElement, 'value', this.el.nativeElement.value.replace(/[^a-zA-Z ]/g, '').replace(/\s/g, ''));
    event.preventDefault();
  }
}