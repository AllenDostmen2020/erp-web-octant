import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { HandleFileInputDirective } from '@directive/handle-file-input.directive';
import { ImageMimeTypeFilePipe } from '@pipe/image-mime-type-file.pipe';

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss'],
  imports: [CommonModule, HandleFileInputDirective, ImageMimeTypeFilePipe],
  standalone: true,
})
export class SelectFileComponent {
  @Input() fileCtrl!: AbstractControl;
  @Input() srcFileCloud?: string | null | undefined;
  @Input() acceptFiles: string = '*';

  get getImageFile(): string | null {
    const { extension_file, base_64, type_file } = this.fileCtrl.value!;
    if (/(docx?)/.test(extension_file)) {
      return '/assets/svg-icons/microsoft-word.svg';
    } else if (/(xlsx?|csv)/.test(extension_file)) {
      return '/assets/svg-icons/microsoft-excel.svg';
    } else if (/(pptx?)/.test(extension_file)) {
      return '/assets/svg-icons/microsoft-powerpoint.svg';
    } else if (/(png|jpg|jpeg|webp|avif)/.test(extension_file)) {
      return `data:${type_file};base64,${base_64}`;
    } else if (/(pdf)/.test(extension_file)) {
      return '/assets/svg-icons/pdf.png';
    } else if (/(txt)/.test(extension_file)) {
      return '/assets/svg-icons/document.svg';
    }
    return null;
  }
}
