<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard :dataBreadcrumbs="breadcrumbData" @handleClickReturn="back">
      <Transition appear name="fade-step" mode="out-in">
        <div class="mb-4">
          <table class="table-auto">
            <thead class="table-header">
              <tr class="first-row">
                <th rowspan="2"></th>
                <th colspan="4">Facture</th>
                <th colspan="2">Fonds de roulement</th>
                <th colspan="9">Quotes-parts par lot</th>
              </tr>
              <tr class="second-row">
                <th>Montant total de la facture</th>
                <th>Date de reception</th>
                <th>Date de payement</th>
                <th>Payer la facture</th>
                <th>Montant du fonds de roulement avant payement</th>
                <th>Montant du fonds de réserve après payement</th>
                <th>Lots</th>
                <th colspan="2">Quotité</th>
                <th colspan="2">Montant total de la facture à charge du lot</th>
                <th colspan="2">Portion de la facture à charge du propriétaire (40%)</th>
                <th colspan="2">Portion de la facture à charge du locataire (60%)</th>
              </tr>
            </thead>
            <tbody>
              <InvoiceTableRow
                v-for="(invoice, index) in invoiceList"
                :key="index"
                :data="invoice"
                :lot-list="lotList"
                @set-pdf-path="setPdfPath"
              />
              <InvoiceTotalRow
                :data="totalAccountDetails"
                :lot-list="lotList"
              />
              <InvoiceBalanceTableHead 
                v-if="balanceList.length !== 0"
                :rows="balanceList.length"
              />
              <InvoiceBalanceRow
                v-for="(balance, index) in balanceList"
                :key="index"
                :data="balance"
                :rank="index+1"
                :lot-list="lotList"
              />
            </tbody>
          </table>
          <PdfModal
            :pdf-path="pdfPath"
            :show="pdfPath.length >= 1"
            @close-modal="setPdfPath('')"
          />
        </div>
      </Transition>
    </MainCard>
  </Transition>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import PdfModal from "@/components/Display/PdfModal/PdfModal.vue";
import InvoiceTableRow from "@/pages/syndic/components/Accounting/components/InvoiceTableRow.vue";
import InvoiceTotalRow from "@/pages/syndic/components/Accounting/components/InvoiceTotalRow.vue";
import InvoiceBalanceRow from "@/pages/syndic/components/Accounting/components/InvoiceBalanceRow.vue";
import InvoiceBalanceTableHead from "@/pages/syndic/components/Accounting/components/InvoiceBalanceTableHead.vue";
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";

interface Option {
  value: string;
  label: string;
  quota: string;
}

interface BreadCrumb {
  label: string;
  url?: string;
}

interface Total {
  invoicesTotalAmount?: string,
  workCapitalAmount?: string
}

const store = useStore();
const emit = defineEmits(["backToPage"]);
const totalAccountDetails = ref<Total>({
  invoicesTotalAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  workCapitalAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" })
})

const currentSession = computed(() => store.getters["SyndicModule/getCurrentSession"]);
const invoiceList = computed(() => store.getters["SyndicModule/getInvoiceList"]);
const balanceList = ref<any>([]);
const lotList = computed(() => {
  let temp = store.getters["SyndicModule/getMyLotList"];
  return handleOptionsConsistency(temp);
});
const pdfPath = ref<string>("");

const breadcrumbData = ref<BreadCrumb[]>([
  {
    label:
      currentSession.value.type === "currentExpenses"
        ? "Dépenses courantes"
        : "Dépenses extraordinaires",
    url: "",
  },
  {
    label: currentSession.value.year,
    url: "",
  },
  {
    label: "Liste de factures",
  },
]);

onMounted(async () => {
  await fetchTotalDetails();
  await fetchBalanceData();
})

function back(value: any) {
  emit("backToPage", value);
}

function setPdfPath(value: any) {
  pdfPath.value = value;
}

function handleOptionsConsistency(lots: any) {
  let result: Option[] = [];
  if (Array.isArray(lots) && lots.length >= 1)
    lots.forEach((lot: any) =>
      result.push({
        value: lot.id,
        label: lot.numberLot,
        quota: lot.quota,
      })
    );
  return result;
}

async function fetchTotalDetails() {
  let data : any;
  [data] = await store.dispatch("SyndicModule/fetchTypedAccountTotal");
  totalAccountDetails.value.invoicesTotalAmount = data.invoicesTotalAmount.toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'});
  totalAccountDetails.value.workCapitalAmount = data.workCapitalAmount.toLocaleString('be-BE', { currency  : 'EUR', style : 'currency'});
}

async function fetchBalanceData() {
  // let data: any;
  balanceList.value = await store.dispatch("SyndicModule/fetchCoOwnershipAccountBalance");
}
</script>
<style lang="scss" scoped>
th {
  @apply px-2 py-4 text-left align-top;
}

.first-row {
  th {
    @apply font-normal;
    font-size: 18px;
    color: var(--color-primary);
  }

}

.second-row {
  th {
    @apply border-l;
    border-color: #fff;
    background-color: var(--color-gray);
  }
}

.fade-step-enter-active,
.fade-step-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-step-enter-from,
.fade-step-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
