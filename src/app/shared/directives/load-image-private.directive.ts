import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { FetchService } from '@service/fetch.service';

@Directive({
  selector: '[appLoadImagePrivate]',
  standalone: true
})
export class LoadImagePrivateDirective {
  @Input({ required: true }) imageUrl!: string;
  @Input() type: 'base-64' | 'src' = 'src';
  private fetch = inject(FetchService);
  // private renderer = inject(Renderer2);
  private defaultImageUrl = 'assets/images/spinner-loading.gif';
  private errorImageUrl = 'assets/images/robot-error.png';

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.src = this.defaultImageUrl;
    
    this.observeImageElement();
  }

  private observeImageElement() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('isIntersecting image');
          this.getImage();
          observer.unobserve(this.elementRef.nativeElement);
        }
      });
    });
    observer.observe(this.elementRef.nativeElement);
  }

  private async getImage() {
    if(this.type == 'src') {
      const nameLocalStorage = `image-url-${this.imageUrl}`;
      const imageLocalStorage = localStorage.getItem(nameLocalStorage);
      if(imageLocalStorage) {
        const { url, expiration_time, loading } = JSON.parse(imageLocalStorage);
        if(expiration_time && new Date().getTime() < expiration_time) {
          if(loading) {
            setTimeout(() => {
              // console.log('setTimeout verify loading image');
              this.getImage()
            }, 500);
            return;
          } else {
            this.elementRef.nativeElement.src = url;
            return;
          }
        }
      }
      const minutes_to_expire = 60;
      const expiration_time = new Date().getTime() + (minutes_to_expire * 60 * 1000);
      localStorage.setItem(nameLocalStorage, JSON.stringify({ loading: true, expiration_time }));
      let url;
      try {
        url = (await this.fetch.get<{ url: string }>(`image/get-temporally-url?image_url=${this.imageUrl}`)).url;
      } catch (error) {
        url = this.errorImageUrl;
      }
      localStorage.setItem(nameLocalStorage, JSON.stringify({ url, expiration_time }));
      this.elementRef.nativeElement.src = url;
    }
    // else {
    //   const nameLocalStorage = `image-base-64-${this.imageUrl}`;
    //   const image = localStorage.getItem(nameLocalStorage);
    //   if(image) {
    //     const { data_base_64, mime_type, expiration_time } = JSON.parse(image);
    //     if(new Date().getTime() < expiration_time) {
    //       this.elementRef.nativeElement.src = `data:${mime_type};base64,${data_base_64}`;
    //       return;
    //     }
    //   }

    //   const expiration_time = new Date().getTime() + 300000;
    //   const { data_base_64, mime_type } = await this.fetch.get<{ data_base_64: string, mime_type: string }>(`image/get-temporally-base-64?image_url=${this.imageUrl}`);
    //   localStorage.setItem(nameLocalStorage, JSON.stringify({ data_base_64, mime_type, expiration_time }));
    //   this.elementRef.nativeElement.src = `data:${mime_type};base64,${data_base_64}`;
    // }
  }

}
 