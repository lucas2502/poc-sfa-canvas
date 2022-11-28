import { defineStore } from 'pinia';
import { loadOfferById } from '~~/helpers/helpers';
import { OfferForUi } from '~~/types/OfferForUi';
import { Proposal, ProposalSummary } from '~~/types/Proposal';

export interface OfferInProposal extends OfferForUi {
  quantity: number;
  discount: number;
}

export interface OfferSelected
  extends Omit<
    OfferInProposal,
    | 'productId'
    | 'categoryId'
    | 'productType'
    | 'subtitle'
    | 'description'
    | 'billingType'
  > {}

export type RootState = Proposal;

export const useProposalStore = defineStore({
  id: 'proposal-store',
  state: () =>
    ({
      id: 1,
      sfa: {
        customerName: 'Lucas da silva',
        oportunityId: 'OP12345678',
        quotationId: 'QO987654321'
      },
      status: 'OPEN',
      offers: [],
      offerSelected: undefined
    } as RootState),
  actions: {
    addOffer(id: number) {
      const offerExists = this.offers.find(item => item.id === id);
      if (!offerExists) {
        this.offers.push({ id, qty: 1, discount: 0 });
      }
    },
    deleteOffer(id: number) {
      this.offers = this.offers.filter(item => item.id !== id);
    },
    isOfferAdded(id: number) {
      return this.offers.map(i => i.id).includes(id);
    },
    increaseQuantity(id: number) {
      this.offers.forEach(item => {
        if (item.id === id) {
          item.qty++;
        }
      });
    },
    decreaseQuantity(id: number) {
      this.offers.forEach(item => {
        if (item.id === id) {
          item.qty--;
        }
      });
    },
    selectedOffer(id: number) {
      this.offerSelected = id;
    },
    applyDiscount(id: number, discount: number) {
      this.offers.forEach(item => {
        if (item.id === id && discount > 0) {
          item.discount = discount;
        }
      });
    }
  },
  getters: {
    offersForUi: (state): OfferInProposal[] => {
      return state.offers
        .map(item => {
          const offer = loadOfferById(item.id);

          if (offer) {
            return {
              ...offer,
              quantity: item.qty,
              discount: item.discount
            };
          }

          return undefined;
        })
        .filter((item): item is OfferInProposal => !!item);
    },
    getOfferSelected(state): OfferInProposal | undefined {
      return this.offersForUi.find(i => i.offerId === state.offerSelected);
    },
    summary: (state): ProposalSummary => {
      const summary: ProposalSummary = {
        billedMonthly: {
          quantity: 0,
          total: 0
        },
        billedYearly: {
          quantity: 0,
          total: 0
        },
        billedByConsumption: {
          quantity: 0,
          total: 0
        },
        priceTotalBeforeDiscount: 0,
        discountTotal: 0,
        priceTotal: 0
      };

      state.offers.forEach(item => {
        const offer = loadOfferById(item.id);
        if (offer) {
          if (offer.billingType === 'MONTHLY') {
            summary.billedMonthly.quantity++;
            summary.billedMonthly.total =
              summary.billedMonthly.total + offer.price;
          }

          if (offer.billingType === 'YEARLY') {
            summary.billedYearly.quantity++;
            summary.billedYearly.total =
              summary.billedYearly.total + offer.price;
          }

          if (offer.billingType === 'CONSUMPTION') {
            summary.billedByConsumption.quantity++;
            summary.billedByConsumption.total =
              summary.billedByConsumption.total + offer.price;
          }

          summary.discountTotal =
            summary.discountTotal + item.discount * item.qty;

          summary.priceTotalBeforeDiscount =
            summary.priceTotalBeforeDiscount + item.qty * offer.price;

          summary.priceTotal =
            summary.priceTotalBeforeDiscount - summary.discountTotal;
        }
      });

      return summary;
    }
  }
});
