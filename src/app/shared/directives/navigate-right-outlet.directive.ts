import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';


@Directive({
  selector: '[appNavigateRightOutlet]', standalone: true
})
export class NavigateRightOutletDirective {

    @Input() navigateUrl! : string;

  constructor(private el: ElementRef, private router: Router, private renderer2: Renderer2) {
    this.renderer2.listen(el.nativeElement,'click', ()=>{
        this.navigateRoute(this.navigateUrl)
    })
   }

  navigateRoute(url: string | null) {
    this.router.navigate([{ outlets: { 'route-lateral': url }}]);
}

}
