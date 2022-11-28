import { defineStore } from 'pinia';

export const useDrawerStore = defineStore({
  id: 'drawer-store',
  state: () => {
    return {
      billingRules: {
        open: false
      },
      discount: {
        open: false
      },
      filterProduct: {
        open: false
      },
      uploadIaaSFile: {
        open: false
      }
    };
  },
  actions: {
    toggleBillingRules() {
      this.billingRules.open = !this.billingRules.open;
    },
    toggleDiscount() {
      this.discount.open = !this.discount.open;
    },
    toggleFilterProduct() {
      this.filterProduct.open = !this.filterProduct.open;
    },
    toggleUploadIaaSFile() {
      this.uploadIaaSFile.open = !this.uploadIaaSFile.open;
    }
  },
  getters: {
    // isOpen: state => state.open
  }
});
