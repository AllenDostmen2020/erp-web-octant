import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'imageMimeTypeFile',
    standalone: true,
})
export class ImageMimeTypeFilePipe implements PipeTransform {
    transform(nameFile: string | null): string {
        if (!nameFile) return '';
        const extension_file: string | undefined = nameFile.split('.').pop();
        if (!extension_file) return '';
        if (
            /(png|jpg|jpeg|webp)/.test(extension_file) &&
            /(http|https)/.test(nameFile)
        ) {
            return nameFile;
        } if (/(png|jpg|jpeg|webp)/.test(extension_file)) {
            return '/assets/svg-icons/image-file.svg';
        } else if (/(docx?)/.test(extension_file)) {
            return '/assets/svg-icons/microsoft-word.svg';
        } else if (/(xlsx?|csv)/.test(extension_file)) {
            return '/assets/svg-icons/microsoft-excel.svg';
        } else if (/(pptx?)/.test(extension_file)) {
            return '/assets/svg-icons/microsoft-powerpoint.svg';
        } else if (/(pdf)/.test(extension_file)) {
            return '/assets/svg-icons/pdf.png';
        } else if (/(txt)/.test(extension_file)) {
            return '/assets/svg-icons/document.svg';
        } else if (/(mpp)/.test(extension_file)) {
            return '/assets/svg-icons/microsoft-excel.svg';
        }
        return '';
    }
}
