import { defineStore } from 'pinia';
import { Offer } from '~~/types/Offer';
import { OfferForUi } from '~~/types/OfferForUi';
import { loadOffersByIds } from '~~/helpers/helpers';

export type RootState = {
  items: Offer[] | [];
};

export const useOfferStore = defineStore({
  id: 'offer-store',
  state: () =>
    ({
      items: [
        {
          id: 1,
          name: 'E5 Enterprise edition',
          description: 'Lorem ipsum dollor simet',
          unitPrice: 10.0,
          productId: 1,
          billingType: 'YEARLY'
        },
        {
          id: 2,
          name: 'E5 Government edition',
          description: 'Lorem ipsum dollor simet',
          unitPrice: 15.99,
          productId: 2,
          billingType: 'MONTHLY'
        },
        {
          id: 3,
          name: 'Basic',
          description: 'Lorem ipsum dollor simet',
          unitPrice: 0,
          productId: 4,
          billingType: 'CONSUMPTION'
        },
        {
          id: 4,
          name: 'Basic',
          description: 'Lorem ipsum dollor simet',
          unitPrice: 39.99,
          productId: 3,
          billingType: 'MONTHLY'
        }
      ]
    } as RootState),
  actions: {
    getOfferById(id: number): Offer | undefined {
      return this.items.find(item => item.id === id);
    }
  },
  getters: {
    offersForUi: (state): OfferForUi[] | [] => {
      return loadOffersByIds(state.items.map(i => i.id));
    }
  }
});
