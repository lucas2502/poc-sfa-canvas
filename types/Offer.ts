export enum BillingTypeEnum {
  monthly = 'MONTHLY',
  yearly = 'YEARLY',
  consumption = 'CONSUMPTION'
}
export interface Offer {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  productId: number;
  billingType: `${BillingTypeEnum}`;
}
