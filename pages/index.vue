<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-xs">
      <div class="col-9">
        <q-card flat>
          <q-card-section>
            <div class="text-h4">Proposta</div>
          </q-card-section>

          <q-separator inset />

          <q-card-section v-if="isEmptyProposal" class="q-pt-xl">
            <div class="row q-col-gutter-xs q-px-xl card-checkout-empty">
              <div class="col-3">
                <img src="~/assets/img/carrinho.svg" />
              </div>
              <div class="col-9 card-checkout-empty_text">
                <div class="text-h5">Sua proposta está vazia!</div>
                <p>
                  Você pode adicionar produtos a sua proposta
                  <a
                    class="text-weight-bold"
                    href="#"
                    @click.prevent="drawerStore.toggleFilterProduct()"
                    >clicando aqui</a
                  >.
                </p>
              </div>
            </div>
          </q-card-section>
          <q-card-section v-else class="q-pt-sm">
            <div class="row">
              <div class="col q-pa-sm">
                <q-table
                  :rows="rows"
                  :columns="columns"
                  row-key="name"
                  virtual-scroll
                  :rows-per-page-options="[10]"
                  :grid="$q.screen.xs"
                  flat
                >
                  <template #body="props">
                    <q-tr :props="props">
                      <q-td key="title" :props="props">
                        <div class="row column q-pa-sm items-start">
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
                          <a
                            v-if="props.row.productType === 'IAAS'"
                            href="#"
                            style="
                              font-weight: 400;
                              font-size: 14px;
                              line-height: 20px;
                              text-align: center;
                              text-decoration-line: underline;
                              color: #660099;
                            "
                            @click.prevent="drawerStore.toggleUploadIaaSFile"
                          >
                            Carregar cotação
                          </a>
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
                            >{{
                              billingTypeToText(props.row.billingType)
                            }}</span
                          >
                        </div>
                      </q-td>
                      <q-td key="quantity" :props="props">
                        <div class="justify-evenly">
                          <q-btn
                            padding="5px"
                            :color="
                              props.row.quantity <= 1 ||
                              props.row.productType === 'IAAS'
                                ? 'grey'
                                : 'primary'
                            "
                            icon="remove"
                            :disable="
                              props.row.quantity <= 1 ||
                              props.row.productType === 'IAAS'
                            "
                            @click="
                              proposalStore.decreaseQuantity(props.row.offerId)
                            "
                          />
                          <q-btn
                            class="q-mr-sm q-ml-sm"
                            color="
                             primary
                            "
                            :label="props.row.quantity"
                            disable
                            outline
                          />
                          <q-btn
                            padding="5px"
                            icon="add"
                            :disable="
                              props.row.quantity === 0 ||
                              props.row.productType === 'IAAS'
                            "
                            :color="
                              props.row.productType === 'IAAS'
                                ? 'grey'
                                : 'primary'
                            "
                            @click="
                              proposalStore.increaseQuantity(props.row.offerId)
                            "
                          />
                        </div>
                      </q-td>
                      <q-td key="total" :props="props">
                        <div class="row column items-start">
                          <span
                            style="
                              font-weight: 500;
                              font-size: 16px;
                              line-height: 20px;
                              color: #000000;
                            "
                          >
                            {{
                              formatMoney(props.row.price * props.row.quantity)
                            }}
                            <span
                              v-if="props.row.discount"
                              style="
                                font-weight: 500;
                                font-size: 13px;
                                line-height: 20px;
                              "
                              class="text-green"
                            >
                              (-{{
                                formatMoney(
                                  props.row.discount * props.row.quantity
                                )
                              }})
                            </span>
                          </span>

                          <a
                            v-if="props.row.productType === 'SAAS'"
                            href="#"
                            style="
                              font-weight: 400;
                              font-size: 14px;
                              line-height: 20px;
                              text-align: center;
                              text-decoration-line: underline;
                              color: #660099;
                            "
                            @click.prevent="selectOffer(props.row.offerId)"
                          >
                            <template v-if="props.row.discount"
                              >Editar desconto</template
                            >
                            <template v-else>Aplicar desconto</template>
                          </a>
                        </div>
                      </q-td>

                      <q-td key="action" :props="props">
                        <img
                          src="@/assets/img/icon-close.svg"
                          style="width: 25px; cursor: pointer"
                          @click="proposalStore.deleteOffer(props.row.offerId)"
                        />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-3">
        <q-card flat class="card-proposal-summary">
          <q-card-section>
            <div class="text-h6">Resumo da proposta</div>
          </q-card-section>

          <q-card class="q-mb-md" style="background-color: #d9d9d9">
            <q-card-section>
              <div class="row justify-between content-start">
                <div>
                  <div class="text-bold">Cliente</div>
                </div>
                <div>GWCloud</div>
              </div>

              <div class="row justify-between content-start">
                <div>
                  <div class="text-bold">Oportunidade</div>
                </div>
                <div>1QGyUIK89</div>
              </div>

              <div class="row justify-between content-start">
                <div>
                  <div class="text-bold">Cotação</div>
                </div>
                <div>1QGyUIK89</div>
              </div>
            </q-card-section>
          </q-card>

          <template v-if="isEmptyProposal">
            <q-card-section class="q-pt-md">
              <div>
                <div class="row justify-between content-start q-pb-md">
                  <div>
                    <div class="">0 Produtos</div>
                  </div>
                  <div>R$ 0,00</div>
                </div>
              </div>
            </q-card-section>
          </template>

          <template v-else>
            <q-card-section class="q-pt-xs">
              <div>
                <div class="row justify-between content-start q-pb-md">
                  <div>
                    <div class="text-bold">
                      {{ proposalStore.summary.billedMonthly.quantity }}
                      Produtos
                    </div>
                    <div class="">Cobrança mensal</div>
                  </div>
                  <div>
                    {{ formatMoney(proposalStore.summary.billedMonthly.total) }}
                  </div>
                </div>

                <q-separator />
              </div>
            </q-card-section>
            <q-card-section class="q-pt-xs">
              <div>
                <div class="row justify-between content-start q-pb-md">
                  <div>
                    <div class="text-bold">
                      {{ proposalStore.summary.billedYearly.quantity }}
                      Produtos
                    </div>
                    <div class="">Cobrança anual</div>
                  </div>
                  <div>
                    {{ formatMoney(proposalStore.summary.billedYearly.total) }}
                  </div>
                </div>

                <q-separator />
              </div>
            </q-card-section>
            <q-card-section class="q-pt-xs">
              <div>
                <div class="row justify-between content-start q-pb-md">
                  <div>
                    <div class="text-bold">
                      {{ proposalStore.summary.billedByConsumption.quantity }}
                      Produtos
                    </div>
                    <div class="">Cobrança por consumo</div>
                  </div>
                  <div>
                    {{
                      formatMoney(
                        proposalStore.summary.billedByConsumption.total
                      )
                    }}
                  </div>
                </div>

                <q-separator />
              </div>
            </q-card-section>

            <q-card-section>
              <div class="row justify-between content-start q-pb-md">
                <div>
                  <div class="text-bold">Total sem descontos</div>
                </div>
                <div class="text-bold">
                  {{
                    formatMoney(proposalStore.summary.priceTotalBeforeDiscount)
                  }}
                </div>
              </div>
              <div class="row justify-between content-start q-pb-md">
                <div>
                  <div class="text-bold">Descontos</div>
                </div>
                <div class="text-green text-bold">
                  {{ formatMoney(proposalStore.summary.discountTotal) }}
                </div>
              </div>
            </q-card-section>
          </template>

          <q-separator inset />

          <q-card-section>
            <div class="row justify-between content-start q-pb-md">
              <div>
                <div class="text-h6">Valor final</div>
              </div>
              <div class="text-h6">
                {{ formatMoney(proposalStore.summary.priceTotal) }}
              </div>
            </div>
          </q-card-section>

          <template v-if="proposalStore.status === 'OPEN'">
            <q-card-section>
              <div class="column justify-center q-col-gutter-xs">
                <div>
                  <q-btn
                    class="full-width"
                    color="purple"
                    label="Finalizar proposta"
                    :disable="isEmptyProposal"
                    @click="closeProposal()"
                  />
                </div>
                <div>
                  <q-btn
                    class="full-width"
                    outline
                    color="purple"
                    label="Adicionar mais produtos"
                    @click="drawerStore.toggleFilterProduct()"
                  />
                </div>
              </div>
            </q-card-section>
          </template>
          <template v-else>
            <q-card-section>
              <div class="column justify-center q-col-gutter-xs">
                <q-banner class="bg-grey-3">
                  <template #avatar>
                    <q-icon name="outbox" color="primary" />
                  </template>
                  <span class="text-bold">
                    Esta proposta se encontra finalizada e foi enviada ao
                    cliente para análise.
                  </span>
                </q-banner>
              </div>
            </q-card-section>
          </template>

          <q-card-section>
            <div
              class="column"
              style="
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                text-align: center;
                text-decoration-line: underline;
                color: #660099;
              "
            >
              <a href="#" @click.prevent="drawerStore.toggleBillingRules"
                >Entenda sobre a cobrança</a
              >
              <a
                v-if="!isEmptyProposal"
                href="#"
                @click.prevent="exportProposal"
                >Exportar proposta</a
              >
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QTableProps, useQuasar } from 'quasar';
import { useDrawerStore } from '@/store/drawer';
import { useProposalStore } from '~~/store/proposal';
import { billingTypeToText, formatMoney } from '~~/helpers/helpers';

const $q = useQuasar();

const drawerStore = useDrawerStore();
const proposalStore = useProposalStore();

const columns = [
  {
    name: 'title',
    field: 'title',
    label: 'PRODUTO',
    align: 'left'
  },
  {
    name: 'price',
    field: 'price',
    align: 'center',
    label: 'PREÇO'
  },
  {
    name: 'quantity',
    field: 'quantity',
    label: 'QUANTIDADE',
    align: 'center'
  },
  {
    name: 'total',
    label: 'TOTAL',
    align: 'left'
  },
  {
    name: 'action',
    field: 'action',
    align: 'left'
  }
] as QTableProps['columns'];

const rows = computed(() => proposalStore.offersForUi);

const isEmptyProposal = computed(
  () => Array.isArray(proposalStore.offers) && proposalStore.offers.length === 0
);

function selectOffer(id: number) {
  drawerStore.toggleDiscount();
  proposalStore.selectedOffer(id);
}

function closeProposal() {
  $q.notify({
    message: 'Proposta finalizada e enviada ao cliente.',
    icon: 'announcement',
    color: 'primary',
    position: 'top-right'
  });

  proposalStore.status = 'CLOSED';
}

function exportProposal() {
  $q.notify({
    message: 'Proposta exportada com sucesso.',
    icon: 'announcement',
    color: 'primary',
    position: 'top-right'
  });
}
</script>

<style scoped lang="scss">
.card-checkout-empty_text {
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding-left: 100px;
}

.card-proposal-summary {
  background-color: #f5f5f5;
}
</style>
