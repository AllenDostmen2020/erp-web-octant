import {
    Directive,
    Renderer2,
    ElementRef,
    Output,
    EventEmitter,
} from '@angular/core';

export interface HandleFileEvent {
    base_64: string;
    extension_file: string;
    name_file: string;
    size_file: number;
    type_file: string;
}

@Directive({
    selector: '[appHandleFileInput]',
    standalone: true,
})
export class HandleFileInputDirective {
    @Output() handleFile: EventEmitter<HandleFileEvent | null> =
        new EventEmitter();

    constructor(private el: ElementRef, private renderer2: Renderer2) {
        this.renderer2.listen(el.nativeElement, 'input', (event) => {
            this.handleFileSelect(event);
        });
    }

    public handleFileSelect($event: InputEvent) {
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
                this.handleFile.emit({
                    base_64,
                    extension_file,
                    name_file,
                    size_file,
                    type_file,
                });
            };
            reader.readAsBinaryString(file);
        } else {
            this.handleFile.emit(null);
        }
    }
}
