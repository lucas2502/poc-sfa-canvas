import { defineStore } from 'pinia';
import { useOfferStore } from './offer';
import { ProductType } from '~/types/Product';
import { OfferForUi } from '~/types/OfferForUi';
import { loadOffersByIds } from '~~/helpers/helpers';

export type RootState = {
  term: string | undefined;
  categoryId: { label: string; value: number | undefined };
  productType: { label: string; value: ProductType | undefined };
  items: Array<{ id: number }> | [];
};

export const useSearchStore = defineStore({
  id: 'search-store',
  state: () =>
    ({
      term: undefined,
      categoryId: {
        label: 'Todos',
        value: undefined
      },
      productType: {
        label: 'Todos',
        value: undefined
      },
      items: []
    } as RootState),
  actions: {},
  getters: {
    isSearching: state => {
      return !!(state.term || state.categoryId || state.productType);
    },
    searchResult: (state): OfferForUi[] => {
      const productType = state.productType.value;
      const categoryId = state.categoryId.value;
      const term = state.term;

      const offerStore = useOfferStore();

      const filterByType = productType
        ? offerStore.offersForUi.filter(
            offer => offer?.productType === productType
          )
        : offerStore.offersForUi;

      const filterByCategory = categoryId
        ? filterByType.filter(offer => offer?.categoryId === categoryId)
        : filterByType;

      const filterByTerm = filterByCategory.filter(i => {
        if (term) {
          return (
            i.title.toLowerCase().includes(term.toLowerCase()) ||
            term.toLowerCase().includes(i.title.toLowerCase())
          );
        }
        return true;
      });

      return loadOffersByIds(filterByTerm.map(i => i.offerId));
    }
  }
});
