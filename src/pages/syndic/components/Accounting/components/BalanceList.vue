<template>
  <Transition appear name="fade-step" mode="out-in">
    <div v-if="currentBalance === undefined">
      <BalanceTitle
        v-for="(balance, index) in balanceList"
        :key="index"
        :documentLabel="`Solde du ${balance.sendingDate}`"
        @set-display-details="setCurrentBalance(balance)"
      />
    </div>
    <BalanceDetails v-else :data="currentBalance" @back-to-page="backToInvoiceList" />
  </Transition>
</template>
<script lang="ts" setup>
import BalanceTitle from "@/pages/syndic/components/Accounting/components/SheetTitle.vue";
import BalanceDetails from "@/pages/syndic/components/Accounting/components/BalanceDetails.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

interface BreadCrumb {
  label: string;
  url?: string;
}

const store = useStore();
const emit = defineEmits(["backTo", "updateBreadcrumb"]);

const balanceList = computed(() => store.getters["SyndicModule/getCoOwnershipAccountBalanceDetails"]);
const currentBalance = ref<object>();

function back(value: any) {
  emit("backTo", value);
}

function backToInvoiceList() {
  currentBalance.value = undefined;
  emit("updateBreadcrumb", "Solde comptable");
}

function setCurrentBalance(value: any) {
  currentBalance.value = value;
  emit("updateBreadcrumb", `Solde du ${value.sendingDate}`);
}
</script>
<style lang="scss" scoped>
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
