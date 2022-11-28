export interface Proposal {
  id: number;
  sfa: {
    oportunityId: string;
    quotationId: string;
    customerName: string;
  };
  offers: Array<{ id: number; qty: number; discount: number }>;
  offerSelected: number | undefined;
  status: 'OPEN' | 'CLOSED';
}

export interface ProposalSummary {
  billedMonthly: {
    quantity: number;
    total: number;
  };
  billedYearly: {
    quantity: number;
    total: number;
  };
  billedByConsumption: {
    quantity: number;
    total: number;
  };
  priceTotalBeforeDiscount: number;
  discountTotal: number;
  priceTotal: number;
}
