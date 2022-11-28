export type ProductType = 'SAAS' | 'IAAS';

export interface Product {
  id: number;
  name: string;
  description: string;
  logo: string;
  type: ProductType;
  categoryId: number;
}
