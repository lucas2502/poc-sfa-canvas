<template>
  <q-layout view="hHr lpr fFr">
    <DrawerFilterProduct />
    <DrawerUploadIaasFile />
    <DrawerBillingRules />
    <DrawerDiscount />

    <q-page-container>
      <nuxt-page />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useDrawerStore } from '@/store/drawer';

export default {
  setup() {
    const drawerStore = useDrawerStore();

    return {
      drawerStore
    };
  }
};
</script>
<style>
* {
  font-family: 'Roboto';
  font-style: normal;
}

.sfa-drawer-title {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 40px;
  line-height: 44px;
  letter-spacing: -1px;
  color: #000000;
}
</style>
