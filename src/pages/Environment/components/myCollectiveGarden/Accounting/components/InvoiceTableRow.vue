<template>
  <tr>
    <td>
      <Icon
        icon-name="AdobeReaderIcon"
        class="cursor-pointer"
        @click="setPdfPath(props.data.path)"
      />
    </td>
    <td class="text-right">
      {{
        props.data.totalAmount.toLocaleString("be-BE", {
          currency: "EUR",
          style: "currency",
        })
      }}
    </td>
    <td>
      {{ props.data.receptionDate }}
    </td>
    <td>
      {{ props.data.paymentDate }}
    </td>
    <td>
      <Button> Payer </Button>
    </td>
    <td class="text-right">
      <!-- {{
        props.data.workCapitalAmountBfPay.toLocaleString("be-BE", {
          currency: "EUR",
          style: "currency",
        })
      }} -->
    </td>
    <td class="text-right">
      <!-- {{
        props.data.reserveFundAmountAfPay.toLocaleString("be-BE", {
          currency: "EUR",
          style: "currency",
        })
      }} -->
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
    <td colspan="2">{{ +(props.data.quota) }}</td>
    <td colspan="2" class="text-right">
      {{ 
        (props.data.totalAmount*(props.data.quota)).toLocaleString("be-BE", {
          currency: "EUR",
          style: "currency",
        }) 
    }}
    </td>
    <!-- <td colspan="2" class="text-right">
      {{ invoiceQuotaDetails.ownerAmount }}
    </td>
    <td colspan="2" class="text-right">
      {{ invoiceQuotaDetails.tenantAmount }}
    </td> -->
  </tr>
</template>
<script lang="ts" setup>
import Icon from "@/components/Common/Icon/Icon.vue";
import Button from "@/components/Common/Button/Button.vue";
import Select from "@/components/Common/Select/Select.vue";
import { ref } from "vue";
import { useStore } from "vuex";

interface QuotaDetails {
  ownerAmount: string;
  tenantAmount: string;
  lotAmount: string;
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

const emit = defineEmits(["set-pdf-path"]);
const quota = ref();

const invoiceQuotaDetails = ref<QuotaDetails>({
  ownerAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  tenantAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  lotAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
});

function setPdfPath(value: any) {
  emit("set-pdf-path", value);
}

async function handleQuotaDetails(value: any) {
  let payload = { invoiceId: props.data.id, ...value };
  let [data] = await store.dispatch(
    "SyndicModule/fetchInvoiceDetailsRelatedToLot",
    payload
  );
  invoiceQuotaDetails.value.ownerAmount = data.ownerAmount.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
  invoiceQuotaDetails.value.tenantAmount = data.tenantAmount.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
  invoiceQuotaDetails.value.lotAmount = data.lotAmount.toLocaleString("be-BE", {
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
td {
  @apply border p-2;
  border-color: var(--color-stroke-gray);
  
}

.custom-select__wrapper:deep() {
  margin-bottom: 0px;
}
</style>
