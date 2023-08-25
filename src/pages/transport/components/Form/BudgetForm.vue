<template>
  <Note :text="notificationText" />
  <div class="budget-form__input">
    <Input 
      class="input-item" 
      unity="€" 
      name-input="budget" 
      input-type="number" 
      :value="budget"
      @input="handleChange" 
    />
    <!-- <div class="budget-form__buttons">
      <Substract class="input-button" @click="handleClick('substract')" />
      <Plus class="input-button" @click="handleClick('add')" />
    </div> -->
  </div>
</template>
<script lang="ts" setup>
import Note from "@/pages/transport/components/Note.vue";
import Input from "@/components/Common/Input/Input.vue";

import { ref, watch, onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();
const suggestedPrice = ref(0);

const budget = ref<number>(0);

const notificationText = ref<string>(
  `Indiquez ce que vous êtes prêt(e) à payer pour la livraison.\
Pour ce parcours et ce type d’envoi, le prix se situe généralement aux alentours de ${suggestedPrice.value} €`
);

const props = defineProps({
  announcementData: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits(["store-announcement-data"]);

watch(() => suggestedPrice.value,
  (value) => {
    suggestedPrice.value = value;
  },
  { immediate: true, deep: true }
)

onBeforeMount(async () => await simulateBudget());

function handleChange(value: any) {
  budget.value = value.budget;
  emit("store-announcement-data", value);
}

// function handleClick(value: any) {
//   value === "add" ? budget.value++ : budget.value--;
// }

async function simulateBudget() {
  const simulatedTypes = ["Vehicule", "Objet"]
  if (simulatedTypes.includes(props.announcementData.type)) {
    budget.value = await store.dispatch("TransportModule/simulateTransportFee");
    suggestedPrice.value = budget.value;
    emit("store-announcement-data", { budget: budget.value });
  } else {
    budget.value = props.announcementData.budget;
  }
}
</script>
<style lang="scss" scoped>
.budget-form {

  &__title,
  &__subtitle {
    @apply block font-semibold text-[14px];
  }

  &__title {
    color: var(--color-primary);
  }

  &__subtitle {
    @apply my-2.5;
  }

  &__description {
    @apply block my-2;
  }

  &__input {
    @apply flex flex-row gap-x-2;
  }

  &__buttons {
    @apply w-1/5 flex justify-center gap-x-1;

    @screen md {
      @apply w-1/12 gap-x-1.5;
    }
  }
}

.input-button {
  @apply w-8 h-8 cursor-pointer;
}

.input-item {
  @apply w-full;
}

.__hr {
  @apply block my-4 text-gray;
}
</style>
