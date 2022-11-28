import { defineStore } from 'pinia';
import { Product, ProductType } from '~/types/Product';

export type RootState = {
  types: Array<{ id: ProductType; name: string }>;
  items: Product[] | [];
};

export const useProductStore = defineStore({
  id: 'product-store',
  state: () =>
    ({
      types: [
        { id: 'SAAS', name: 'SaaS' },
        { id: 'IAAS', name: 'IaaS' }
      ],
      items: [
        {
          id: 1,
          name: 'Microsoft 365',
          description:
            'Ferramentas de produtividade e colaboração para todas as formas de trabalho.',
          logo: 'logo-microsoft.svg',
          type: 'SAAS',
          categoryId: 8
        },
        {
          id: 2,
          name: 'Microsoft Windows Defender',
          description:
            'Ferramentas de produtividade e colaboração para todas as formas de trabalho.',
          logo: 'logo-microsoft-defender.svg',
          type: 'SAAS',
          categoryId: 8
        },
        {
          id: 3,
          name: 'Microsoft Sharepoint',
          description:
            'Ferramentas de produtividade e colaboração para todas as formas de trabalho.',
          logo: 'logo-share-point.svg',
          type: 'SAAS',
          categoryId: 2
        },
        {
          id: 4,
          name: 'Google Cloud',
          description: 'Google para cloud computing.',
          logo: 'logo-google-cloud.svg',
          type: 'IAAS',
          categoryId: 1
        }
      ]
    } as RootState),
  actions: {
    getProductById(id: number): Product | undefined {
      return this.items.find(item => item.id === id);
    }
  },
  getters: {
    getProductTypes: (
      state
    ): Array<{ value: ProductType | undefined; label: string }> => {
      const result: Array<{ value: ProductType | undefined; label: string }> = [
        {
          label: 'Todos',
          value: undefined
        }
      ];

      const reMap = state.types.map(item => {
        return { label: item.name, value: item.id };
      });

      return [...result, ...reMap];
    }
  }
});
