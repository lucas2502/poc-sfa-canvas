<template>
  <q-dialog
    v-model="drawerStore.discount.open"
    position="right"
    maximized
    style="max-width: 90%; min-width: 60%"
  >
    <q-card class="q-pa-xl">
      <div class="row justify-between">
        <h3 class="sfa-drawer-title">Aplicar desconto</h3>
        <img
          src="@/assets/img/icon-close.svg"
          style="width: 30px"
          @click.prevent="drawerStore.toggleDiscount()"
        />
      </div>

      <div
        class="row q-mt-xl q-pa-md flex justify-around"
        style="
          background: #ffffff;
          border: 1px solid #dddddd;
          border-radius: 4px;
        "
      >
        <div class="col-auto">
          <q-img :src="offerSelected?.image" style="width: 40px" />
        </div>
        <div
          class="col-6"
          style="font-weight: 400; font-size: 14px; line-height: 20px"
        >
          {{ offerSelected?.title }}
        </div>
        <div class="col-3 items-center column">
          <span style="font-weight: 500; font-size: 16px; line-height: 20px">{{
            formatMoney(offerSelected?.price ?? 0)
          }}</span>
          <span style="font-size: 12px; line-height: 16px; color: #666666"
            >Quantidade: {{ offerSelected?.quantity }}</span
          >
        </div>
      </div>

      <div class="row q-mt-xl">
        <div class="col-12">
          <label
            class="q-pb-md"
            style="font-weight: 300; font-size: 16px; line-height: 24px"
            >Desconto:</label
          >
        </div>
        <div class="col-3 q-pa-sm">
          <q-select
            v-model="type"
            outlined
            :options="types"
            label="Tipo"
            option-value="value"
            option-label="text"
          />
        </div>
        <div class="col-4 q-pa-sm">
          <q-input
            v-if="type.value === 'percent'"
            v-model="percentValue"
            outlined
            label="Valor"
            type="number"
            min="0"
            max="100"
            step="0.1"
            suffix="%"
          >
          </q-input>

          <q-input
            v-else
            v-model="moneyValue"
            outlined
            label="Valor"
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
            prefix="R$"
          >
          </q-input>
        </div>
      </div>
      <div class="row q-mt-xl">
        <div class="col-12">
          <label
            class="q-pb-md"
            style="font-weight: 300; font-size: 16px; line-height: 24px"
            >Custo por produto:</label
          >
        </div>
        <div class="col-4 q-pa-sm">
          <q-input
            :model-value="formatMoney(price)"
            outlined
            label="Preço"
            readonly
          >
          </q-input>
        </div>
        <div class="col-4 q-pa-sm">
          <q-input
            :model-value="formatMoney(discount)"
            outlined
            label="Desconto"
            readonly
            label-color="red"
            color="red"
            class="text-red"
          >
          </q-input>
        </div>
        <div class="col-4 q-pa-sm">
          <q-input
            :model-value="formatMoney(newPrice)"
            outlined
            label="Novo preço"
            readonly
            color="green"
            label-color="green"
            class="text-green"
          >
          </q-input>
        </div>
      </div>
      <div class="row q-mt-xl">
        <q-btn
          color="purple"
          label="Aplicar"
          size="17px"
          @click="applyDiscount"
        />

        <q-btn
          style="margin-left: 50px"
          size="17px"
          flat
          color="purple"
          label="Cancelar"
          @click.prevent="drawerStore.toggleDiscount()"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDrawerStore } from '@/store/drawer';
import { useProposalStore } from '~~/store/proposal';
import { formatMoney } from '~~/helpers/helpers';

const drawerStore = useDrawerStore();
const proposalStore = useProposalStore();
const offerSelected = computed(() => {
  return proposalStore.getOfferSelected;
});

const type = ref<{ text: string; value: string }>({
  text: 'Porcentagem',
  value: 'percent'
});
const types = [
  { text: 'Porcentagem', value: 'percent' },
  { text: 'Valor', value: 'value' }
];

const moneyValue = ref<string>('0');
const percentValue = ref<number | undefined>(0);

const price = computed(() => {
  return offerSelected.value?.price ? offerSelected.value.price : 0;
});

const discount = computed(() => {
  let res: number | string = 0;
  if (type.value?.value === 'percent' && percentValue.value) {
    res = 0;
    res = price.value * (percentValue.value / 100);
  }
  if (type.value?.value === 'value' && moneyValue.value) {
    res = 0;
    res = parseFloat(
      moneyValue.value
        .replace(/[R$ ]/g, '')
        .replace(/\./g, '')
        .replace(',', '.')
    );
  }

  return res;
});

const newPrice = computed(() => {
  return price.value >= 0 && discount.value >= 0
    ? price.value - discount.value
    : 0;
});

function applyDiscount() {
  if (offerSelected.value && offerSelected.value.offerId) {
    proposalStore.applyDiscount(offerSelected.value?.offerId, discount.value);
    drawerStore.toggleDiscount();
  }
}

const discountOppen = computed(() => drawerStore.discount.open);
watch(discountOppen, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue === true) {
    percentValue.value = offerSelected.value?.discount
      ? (discount.value / price.value) * 100
      : 0;

    moneyValue.value = formatMoney(
      offerSelected.value?.discount ? price.value - newPrice.value : 0
    );

    type.value = {
      text: 'Porcentagem',
      value: 'percent'
    };
  }
});
</script>
