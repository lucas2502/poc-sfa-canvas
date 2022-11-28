import { useOfferStore } from '~~/store/offer';
import { useProductStore } from '~~/store/product';
import { BillingTypeEnum } from '~~/types/Offer';
import { OfferForUi } from '~~/types/OfferForUi';

export function loadOfferById(id: number): OfferForUi | undefined {
  const productStore = useProductStore();
  const offerStore = useOfferStore();

  const offer = offerStore.getOfferById(id);

  if (offer) {
    const product = productStore.getProductById(offer.productId);

    if (product) {
      const offerForUi: OfferForUi = {
        productId: product.id,
        offerId: offer.id,
        categoryId: product.categoryId,
        productType: product.type,
        title: `${product.name} ${offer.name}`,
        subtitle: `${product.name}`,
        description: offer.description,
        image: new URL(`/assets/img/${product.logo}`, import.meta.url).href,
        price: offer.unitPrice,
        billingType: offer.billingType
      };
      return offerForUi;
    }
  }
  return undefined;
}

export function loadOffersByIds(offers: Array<number>): OfferForUi[] {
  return offers
    .map(id => {
      return loadOfferById(id);
    })
    .filter((item): item is OfferForUi => !!item);
}

export function formatMoney(value: string | number): string {
  const currency = Number(value);
  return Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL'
  }).format(currency);
}

export function billingTypeToText(billingType: `${BillingTypeEnum}`) {
  switch (billingType) {
    case 'MONTHLY':
      return 'Por mês';
    case 'YEARLY':
      return 'Por ano';
    case 'CONSUMPTION':
      return 'Consumo';
    default:
      return '';
  }
}
