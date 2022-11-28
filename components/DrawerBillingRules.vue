<template>
  <q-dialog
    v-model="drawerStore.billingRules.open"
    position="right"
    maximized
    style="max-width: 90%; min-width: 60%"
  >
    <q-card class="q-pa-xl">
      <div class="row justify-between">
        <h3 class="sfa-drawer-title">Regras de cobrança</h3>
        <img
          src="@/assets/img/icon-close.svg"
          style="width: 30px"
          @click.prevent="drawerStore.toggleBillingRules()"
        />
      </div>

      <div class="row q-mt-xl">
        <div class="col q-pa-sm" style="max-width: 449px">
          <ul>
            <li>
              Ao comprar pelo nosso site, a primeira cobrança acontece no início
              do mês seguinte.
            </li>
            <li>
              O fechamento das faturas para produtos IAAS acontece no dia 25 e
              para produtos SAAS acontece no dia 26.
            </li>
            <li>
              O valor da sua primeira fatura será proporcional ao dias
              utilizados entre a data da compra e a data de fechamento da
              fatura.
            </li>
          </ul>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDrawerStore } from '@/store/drawer';

const drawerStore = useDrawerStore();
</script>

<style scoped>
ul li {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #666666;
  padding-top: 15px;
}
</style>
