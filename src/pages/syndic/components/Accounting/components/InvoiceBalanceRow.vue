<template>
  <tr class="content">
    <td class="text-center">{{ rank }}</td>
    <td class="text-right">
      {{
        props.data.amount?.toLocaleString("be-BE", { 
            currency: "EUR", 
            style: "currency" 
        })
      }}
    </td>
    <td>
      <Button> Payer </Button>
    </td>
    <td>{{ props.data.sendingDate }}</td>
    <td>{{ props.data.paymentDate }}</td>
    <td>
      <Select
        class="select"
        name="lotId"
        placeholder="Sélectionner"
        :options="props.lotList"
        @change-select="handleQuotaDetails"
      />
    </td>
    <td class="text-right">{{ balanceQuotaDetails.totalAmount }}</td>
    <td class="text-right">{{ balanceQuotaDetails.ownerAmount }}</td>
    <td class="text-right">{{ balanceQuotaDetails.tenantAmount }}</td>
  </tr>
</template>
<script lang="ts" setup>
import Select from "@/components/Common/Select/Select.vue";
import Button from "@/components/Common/Button/Button.vue";
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
  rank: {
    type: Number,
    default: 0
  }
});

const currentSession = computed(() => store.getters["SyndicModule/getCurrentSession"]);
const balanceQuotaDetails = ref<Quota>({
  ownerAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  tenantAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
  totalAmount: (0).toLocaleString("be-BE", { currency: "EUR", style: "currency" }),
});

async function handleQuotaDetails(value: any) {
  let payload = { balanceId: props.data.id, ...value };
  let data: any;
  [data] = await store.dispatch("SyndicModule/fetchCurrentLotAccountBalance", payload);
  balanceQuotaDetails.value.ownerAmount = data.ownerBalance.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
  balanceQuotaDetails.value.tenantAmount = data.tenantBalance.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
  balanceQuotaDetails.value.totalAmount = data.lotBalance.toLocaleString("be-BE", {
    currency: "EUR",
    style: "currency",
  });
}
</script>
<style lang="scss" scoped>
.content {
  td:nth-child(n + 1) {
    @apply border p-2;
    border-color: var(--color-stroke-gray);
    background-color: #fff;
  }
}

.custom-select__wrapper:deep() {
  margin-bottom: 0px;
}
</style>
