import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ImageMimeTypeFilePipe } from '@pipe/image-mime-type-file.pipe';

export interface InputFileConfiguration {
  /**
   * propertie accept of input file
   * @default '*'
   * @example 'image/*' (For Images) | 'application/pdf' (For PDF) | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' (For Word) | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' (For Excel) | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' (For Power Point) | 'text/plain' (For Text) | 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain, application/pdf, image/*'>
   * @type {string}
   */
  acceptFiles?: string;
}

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss'],
  imports: [CommonModule, ImageMimeTypeFilePipe],
  standalone: true,
})
export class SelectFileComponent {
  @Input({ required: true }) fileCtrl!: FormControl;
  @Input({ required: true }) configuration!: InputFileConfiguration;

  public handleFileSelect($event: any) {
    const fileList: FileList = ($event.target! as HTMLInputElement).files as FileList;
    if (fileList.length) {
      const file = fileList[0];
      const extension_file = file.name.split('.').pop()!;
      const name_file = file.name;
      const size_file = file.size;
      const type_file = file.type;
      const reader: FileReader = new FileReader();
      reader.onload = (eventReader) => {
        const base_64 = btoa(eventReader.target!.result as string);
        this.fileCtrl.setValue({
          base_64,
          extension_file,
          name_file,
          size_file,
          type_file,
        });
      };
      reader.readAsBinaryString(file);
    } else {
      this.fileCtrl.setValue(null);
    }
  }

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
