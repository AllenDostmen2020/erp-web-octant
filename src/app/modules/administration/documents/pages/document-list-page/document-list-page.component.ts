import { Component, signal } from '@angular/core';
import { ItemListTemplateComponent } from '@component/item-list-template/item-list-template.component';
import { ItemListConfiguration, textColumn } from '@interface/itemList';

@Component({
  selector: 'app-document-list-page',
  standalone: true,
  imports: [ItemListTemplateComponent],
  templateUrl: './document-list-page.component.html',
  styleUrl: './document-list-page.component.scss'
})
export class DocumentListPageComponent {
  // public configuration: ItemListConfiguration<Document> = {
  //   title: 'Documentos',
  //   columns: signal([
  //     textColumn({
  //       title: 'Codigo',
  //       displayValueFn: (item) => item.code
  //     })
  //   ])
  // }
}
