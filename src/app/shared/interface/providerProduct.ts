
import { BaseModel } from "./baseModel";
import { PaymentTypeEnum } from "./boxMovement";
import { Product } from "./product";
import { Provider } from "./proveedor";

export interface ProviderProduct extends BaseModel {
    product_id: number;
    provider_id: number;
    price: number;
    code: string;
    stock: number;
    delivery_days: number;
    commentary: string;
    payment_type: PaymentTypeEnum;
    name: string;
    description: string;
    product?: Product;
    provider?: Provider;
}
