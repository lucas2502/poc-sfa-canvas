import { BillingTypeEnum } from './Offer';
import { ProductType } from './Product';

export interface OfferForUi {
  productId: number;
  offerId: number;
  categoryId: number;
  productType: ProductType;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  billingType: `${BillingTypeEnum}`;
}
