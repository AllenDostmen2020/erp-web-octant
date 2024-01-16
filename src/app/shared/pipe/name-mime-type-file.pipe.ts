import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameMimeTypeFile',
  standalone: true,
})
export class NameMimeTypeFilePipe implements PipeTransform {

  transform(value: string | null | undefined, ...args: unknown[]): unknown {
    let name = '--';
    if(value) {
        const extension_file: string | undefined = value.split('.').pop();
        if (!extension_file) return name;
        if (/(docx?)/.test(extension_file)) {
          name = 'word';
        } else if (/(csv)/.test(extension_file)) {
          name = 'csv';
        } else if (/(xlsx?)/.test(extension_file)) {
          name = 'excel';
        } else if (/(pptx?)/.test(extension_file)) {
          name = 'powerpoint';
        } else if (/(png|jpg|jpeg|webp)/.test(extension_file)) {
          name = 'imagen';
        } else if (/(pdf)/.test(extension_file)) {
          name = 'pdf';
        } else if (/(txt)/.test(extension_file)) {
          name = 'text';
        } else if (/(mp4|avi)/.test(extension_file)) {
          name = 'video';
        } else if (/(mp3)/.test(extension_file)) {
          name = 'audio';
        } else if (/(mpp)/.test(extension_file)) {
          name = 'ms project';
        }
    }
    return name;
  }

}
