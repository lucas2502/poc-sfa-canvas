<template>
  <q-dialog
    v-model="drawerStore.filterProduct.open"
    position="right"
    maximized
    style="max-width: 90%; min-width: 60%"
  >
    <q-card class="q-pa-xl">
      <div class="row justify-between" style="width: 800px">
        <h3 class="sfa-drawer-title">Buscar Produtos</h3>
        <img
          src="@/assets/img/icon-close.svg"
          style="width: 30px"
          @click.prevent="drawerStore.toggleFilterProduct()"
        />
      </div>
      <div class="row">
        <div class="col-3 q-pa-sm">
          <q-select
            v-model="searchStore.productType"
            outlined
            :options="types"
            label="Tipo"
          />
        </div>
        <div class="col q-pa-sm">
          <q-select
            v-model="searchStore.categoryId"
            outlined
            :options="categories"
            label="Categoria"
          />
        </div>
      </div>
      <div class="row">
        <div class="col q-pa-sm">
          <q-input v-model="searchStore.term" outlined label="Buscar">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col q-pa-sm">
          <q-table
            :rows="offersTableRows"
            :columns="offersTableColumns"
            row-key="name"
            virtual-scroll
            flat
            :rows-per-page-options="[10]"
          >
            <template #body="props">
              <q-tr :props="props">
                <q-td key="title" :props="props">
                  <div class="row column q-pa-sm">
                    <q-img :src="props.row.image" style="width: 40px" />
                    <span
                      class="q-pt-sm"
                      style="
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 20px;
                        color: #797979;
                      "
                      >{{ props.row.title }}</span
                    >
                  </div>
                </q-td>
                <q-td key="price" :props="props">
                  <div class="row column">
                    <span
                      style="
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 20px;

                        color: #000000;
                      "
                    >
                      {{ formatMoney(props.row.price) }}
                    </span>
                    <span
                      class="q-pt-sm"
                      style="
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 16px;
                        color: #666666;
                      "
                      >{{ billingTypeToText(props.row.billingType) }}</span
                    >
                  </div>
                </q-td>
                <q-td key="description" :props="props">
                  <span
                    style="
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 16px;
                      color: #666666;
                    "
                  >
                    {{ props.row.description }}
                  </span>
                </q-td>
                <q-td key="action" :props="props">
                  <template
                    v-if="proposalStore.isOfferAdded(props.row.offerId)"
                  >
                    <img
                      src="@/assets/img/icon-close.svg"
                      style="width: 25px; cursor: pointer"
                      @click="proposalStore.deleteOffer(props.row.offerId)"
                    />
                  </template>
                  <template v-else>
                    <img
                      src="@/assets/img/icon-plus.svg"
                      style="width: 25px; cursor: pointer"
                      @click="proposalStore.addOffer(props.row.offerId)"
                    />
                  </template>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QTableProps } from 'quasar';
import { useDrawerStore } from '@/store/drawer';
import { useSearchStore } from '@/store/search';
import { useCategoryStore } from '@/store/category';
import { useProductStore } from '@/store/product';
import { useOfferStore } from '~~/store/offer';
import { billingTypeToText, formatMoney } from '~~/helpers/helpers';
import { useProposalStore } from '~~/store/proposal';

const drawerStore = useDrawerStore();
const searchStore = useSearchStore();
const productStore = useProductStore();
const offerStore = useOfferStore();
const categoryStore = useCategoryStore();
const proposalStore = useProposalStore();

const types = productStore.getProductTypes;
const categories = categoryStore.getCategories;

const offersTableRows = computed(() => {
  if (searchStore.isSearching) {
    return searchStore.searchResult;
  } else {
    return offerStore.offersForUi;
  }
});

const offersTableColumns = [
  {
    name: 'title',
    field: 'title',
    label: 'PRODUTO',
    align: 'left'
  },
  {
    name: 'price',
    field: 'price',
    label: 'PREÇO',
    align: 'center'
  },
  {
    name: 'description',
    field: 'description',
    label: 'DESCRIÇÃO',
    align: 'left'
  },
  {
    name: 'action',
    label: 'AÇÕES',
    align: 'center'
  }
] as QTableProps['columns'];

const filterProductOppen = computed(() => drawerStore.filterProduct.open);
watch(filterProductOppen, value => {
  if (!value) {
    searchStore.productType.value = undefined;
    searchStore.categoryId.value = undefined;
    searchStore.term = undefined;
  }
});
</script>
