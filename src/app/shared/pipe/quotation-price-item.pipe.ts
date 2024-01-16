import { Pipe, PipeTransform } from '@angular/core';
import { CoinEnum } from '@interface/baseModel';

@Pipe({
    name: 'quotationItemPrice',
    standalone: true
})
export class QuotationPriceItemPipe implements PipeTransform {

  transform(price: number, args: any[]): number {
    const [coin_item, coin_quotation, quotation_conversion, quotation_utility_type, utility_item] = args;
    if (coin_quotation == CoinEnum.Soles && coin_item == CoinEnum.Dolares) {
      price = Number((price * quotation_conversion).toFixed(2))
    } else if (coin_quotation == CoinEnum.Dolares && coin_item == CoinEnum.Soles) {
      price = Number((price / quotation_conversion).toFixed(2))
    }
    if (quotation_utility_type) {
      if (quotation_utility_type == 'individual') {
        price = price + Number((price * ((utility_item ?? 0) / 100)).toFixed(2))
      }
    }
    return price;
  }

}
