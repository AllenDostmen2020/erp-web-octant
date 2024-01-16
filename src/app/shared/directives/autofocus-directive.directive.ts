import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAutofocus]',
    standalone: true
})
export class AutofocusDirectiveDirective {

    @Input() public autoFocus?: boolean;

    public constructor(private el: ElementRef) {  }

    public ngAfterContentInit() {
        if(this.autoFocus){
            setTimeout(() => {
                this.el.nativeElement.focus();
            }, 100);
        }
    }
}
