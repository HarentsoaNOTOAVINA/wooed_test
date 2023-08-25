<template>
  <tr class="title">
    <td>Total</td>
    <td colspan="4">Total des factures</td>
    <td colspan="2">Montant du fonds de roulement après payement des factures</td>
    <td>Lots</td>
    <td colspan="2">Quotité</td>
    <td colspan="2">Montant total des factures à charge du lot</td>
    <td colspan="2">Montant total des factures à charge du propriétaire</td>
    <td colspan="2">Montant total des factures à charge du locataire</td>
  </tr>
  <tr class="content">
    <td></td>
    <td class="text-right">
      {{
        data.invoicesTotalAmount.toLocaleString("be-BE", {
          currency: "EUR",
          style: "currency",
        })
      }}
    </td>
    <td colspan="3"></td>
    <td colspan="2" class="text-right">
      {{
        data.workCapitalAmount.toLocaleString("be-BE", {
          currency: "EUR",
          style: "currency",
        })
      }}
    </td>
    <td>
      <Select
        class="select"
        name="lotId"
        placeholder="Sélectionner"
        :options="props.lotList"
        @change-select="handleQuotaDetails"
      />
    </td>
    <td colspan="2">{{ quota }}</td>
    <td colspan="2" class="text-right">{{ totalQuotaDetails.totalAmount }}</td>
    <td colspan="2" class="text-right">{{ totalQuotaDetails.ownerAmount }}</td>
    <td colspan="2" class="text-right">{{ totalQuotaDetails.tenantAmount }}</td>
  </tr>
</template>
<script lang="ts" setup>
import Select from "@/components/Common/Select/Select.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

interface Quota {
  ownerAmount?: string;
  tenantAmount?: string;
  totalAmount?: string;
}

const store = useStore();

const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  lotList: {
    type: Array,
    default: [],
  },
});

const quota= ref();
const totalQuotaDetails = ref<Quota>({
  ownerAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  tenantAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  totalAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
});

async function handleQuotaDetails(value: any) {
  let data: any;
  [data] = await store.dispatch("SyndicModule/fetchTypedLotAccountTotal", value);
  totalQuotaDetails.value.ownerAmount = data.ownerAmount.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
  totalQuotaDetails.value.tenantAmount = data.tenantAmount.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
  totalQuotaDetails.value.totalAmount = data.lotAmount.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });

  setQuota(value.lotId); 
}

function setQuota(value: any) {
  let selectedLot : any = props.lotList.find((element: any) => element.value === value);
  quota.value = selectedLot.quota;
}
</script>
<style lang="scss" scoped>
.title td:nth-child(n + 2) {
  @apply border-l;
  border-color: #fff;
  background-color: var(--color-gray);
}
.title {
  td {
    @apply font-semibold px-2 py-4 text-left align-top;
  }
}
.content {
  td:nth-child(n + 2) {
    @apply border p-2;
    border-color: var(--color-stroke-gray);
    background-color: #fff;
  }
}

.custom-select__wrapper:deep() {
  margin-bottom: 0px;
}
</style>
