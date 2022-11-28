<template>
  <q-dialog
    v-model="drawerStore.uploadIaaSFile.open"
    position="right"
    maximized
    style="max-width: 90%; min-width: 60%"
  >
    <q-card class="q-pa-xl">
      <div class="row justify-between" style="min-width: 500px">
        <h3 class="sfa-drawer-title">Carregar cotação</h3>
        <img
          src="@/assets/img/icon-close.svg"
          style="width: 30px"
          @click.prevent="drawerStore.toggleUploadIaaSFile()"
        />
      </div>

      <div class="row q-mt-xl">
        <div class="col q-pa-sm">
          <label
            class="q-pb-md"
            style="font-weight: 300; font-size: 16px; line-height: 24px"
            >Insira o arquivo para fazer upload da catação IAAS:</label
          >
          <q-file v-model="content" outlined>
            <template #prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>
      </div>
      <div class="row q-mt-xl">
        <q-btn color="purple" label="Carregar" size="17px" @click="loadFile" />

        <q-btn
          style="margin-left: 50px"
          size="17px"
          flat
          color="purple"
          label="Cancelar"
          @click.prevent="drawerStore.toggleUploadIaaSFile()"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useDrawerStore } from '@/store/drawer';

const $q = useQuasar();

const drawerStore = useDrawerStore();

const content = ref<any>(undefined);

const uploadIaaSFileOppen = computed(() => drawerStore.uploadIaaSFile.open);

watch(uploadIaaSFileOppen, value => {
  if (!value) {
    content.value = undefined;
  }
});

function loadFile() {
  drawerStore.toggleUploadIaaSFile();
  $q.notify({
    message: 'Upload de cotação efetuado com sucesso.',
    icon: 'announcement',
    color: 'primary',
    position: 'top-right'
  });
}
</script>
