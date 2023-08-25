<template>
  <Transition appear name="fade-step" mode="out-in">
    <MainCard
      :dataBreadcrumbs="breadcrumbData"
      class="totalContent"
      @handleClickReturn="back"
    >
      <div class="totalContent__container">
        <div class="totalContent__container-container">
          <table class="table-auto">
            <thead class="table-header">
              <tr>
                <th></th>
                <th>Etat du fonds</th>
                <th>Lots</th>
                <th>Quotités</th>
                <th>Solde à charge du lot</th>
                <th>Solde à charge du propriétaire</th>
                <th>Solde à charge du locataire</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fonds de roulement</td>
                <td class="text-right">
                  {{ totalAccountDetails.workCapitalAmount }}
                </td>
                <td>
                  <Select
                    class="select"
                    name="lotId"
                    placeholder="Sélectionner"
                    :options="lotList"
                    @change-select="handleQuotaDetails"
                  />
                </td>
                <td>
                  {{ quota }}
                </td>
                <td class="text-right">
                  {{ totalQuotaDetails.lotAmount }}
                </td>
                <td class="text-right">
                  {{ totalQuotaDetails.ownerAmount }}
                </td>
                <td class="text-right">
                  {{ totalQuotaDetails.tenantAmount }}
                </td>
              </tr>
              <tr>
                <td>Fonds de reserve</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MainCard>
  </Transition>
</template>
<script lang="ts" setup>
import Select from "@/components/Common/Select/Select.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import { ref, onMounted, computed, watch } from "vue";
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
  invoiceTotalAmount: string;
  workCapitalAmount: string;
}

interface Quota {
  ownerAmount: string;
  tenantAmount: string;
  lotAmount: string;
}

const store = useStore();

const emit = defineEmits<{
  (event: "backToPage", value: boolean): void;
  (event: "backPrincipal"): void;
}>();

const lotList = computed(() => {
  let temp = store.getters["SyndicModule/getMyLotList"];
  return handleOptionsConsistency(temp);
});

const quota = ref();
const currentSession = computed(() => store.getters["SyndicModule/getCurrentSession"]);

const totalQuotaDetails = ref<Quota>({
  ownerAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  tenantAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  lotAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
});
const breadcrumbData = ref<BreadCrumb[]>([
  {
    label: "Total",
    url: "",
  },
  {
    label: currentSession.value.year,
    url: "",
  }
]);

const totalAccountDetails = ref<Total>({
  invoiceTotalAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  workCapitalAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
});

onMounted(async () => await fetchTotalDetails());

async function fetchTotalDetails() {
  let data: any;
  [data] = await store.dispatch("SyndicModule/fetchNonTypedAccountTotal");
  totalAccountDetails.value.invoiceTotalAmount = data.invoicesTotalAmount.toLocaleString(
    "be-BE",
    { currency: "EUR", style: "currency" }
  );
  totalAccountDetails.value.workCapitalAmount = data.workCapitalAmount.toLocaleString(
    "be-BE",
    { currency: "EUR", style: "currency" }
  );
}

function back(value: any) {
  console.error(value, "NAMMMMM");
  emit("backToPage", value);
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

async function handleQuotaDetails(value: any) {
  setQuota(value.lotId);
  let data: any;
  [data] = await store.dispatch("SyndicModule/fetchNonTypedLotAccountTotal", value);
  totalQuotaDetails.value.ownerAmount = data.ownerAmount.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
  totalQuotaDetails.value.tenantAmount = data.tenantAmount.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
  totalQuotaDetails.value.lotAmount = data.lotAmount.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
}

function setQuota(value: any) {
  let selectedLot: any = lotList.value.find((element: any) => element.value === value);
  quota.value = selectedLot.quota;
}
</script>
<style lang="scss" scoped>
@import "@/style.scss";

th:nth-child(n + 2) {
  @apply px-2 py-4 text-left align-top border-l;
  border-color: #fff;
  background-color: var(--color-gray);
}

td {
  @apply border p-2;
  border-color: var(--color-stroke-gray);
}

.totalContent {
  &__subtitle {
    @apply text-secondary font-[600] text-[14px];
  }

  &__container {
    @apply flex flex-col gap-[18px];

    &-container {
      @apply flex flex-col gap-[18px];
    }
  }
}

.custom-select__wrapper:deep() {
  margin-bottom: 0px;
}

.__hr {
  @apply text-gray w-full;
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
