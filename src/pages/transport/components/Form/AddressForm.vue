<template>
  <div class="address-details__container">
    <Note :text="notificationText" />
    <RadioGroup
      label="Je suis"
      :options="radioOptions"
      nameInput="role"
      :default-value="props.announcementData.role"
      @select-option="handleChange"
    />
    <hr class="__hr" />
    <div class="address-departure">
      <div class="address-details__departure">
        <Input
          label="Au depart"
          placeholder="Ville ou adresse complète"
          name-input="departureAddress"
          id="departureAddressField"
          :value="props.announcementData.departureAddress"
          @input="handleChange"
        />
        <div>
          <Switch
            item-label="Lieu de départ fléxible"
            class="switcher-extra-class"
            name="isFlexibleDeparture"
            :value="props.announcementData.isFlexibleDeparture"
            @handle-switch="handleChange"
          />
          <Switch
            item-label="Besoin d’aide pour porter le(s) bien(s)"
            class="switcher-extra-class"
            name="isBringToDeparture"
            :value="props.announcementData.isBringToDeparture"
            @handle-switch="handleChange"
          />
        </div>
      </div>
      <div class="address-details__more-informations">
        <span class="more-informations__title">Informations supplementaires</span>
        <div class="more-informations__inputs">
          <div
            v-for="(item, index) in departureAddressInputs"
            :key="index"
            class="more-informations__element"
            :class="item.extraClass"
          >
            <Select
              :label="item.label"
              :name="item.nameInput"
              :options="item.options"
              :value="props.announcementData[item.nameInput]"
              @change-select="handleChange"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div class="address-destination">
      <div class="address-details__destination">
        <Input
          label="A l’arrivee"
          placeholder="Ville ou adresse complète"
          name-input="arrivalAddress"
          id="arrivalAddressField"
          :value="props.announcementData.arrivalAddress"
          @input="handleChange"
        />
        <Switch
          itemLabel="Lieu d'arrivé fléxible"
          class="switcher-extra-class"
          name="isFlexibleArrival"
          :value="props.announcementData.isFlexibleArrival"
          @handle-switch="handleChange"
        />
        <Switch
          itemLabel="Besoin d’aide pour porter le(s) bien(s)"
          class="switcher-extra-class"
          name="isBringToArrival"
          :value="props.announcementData.isBringToArrival"
          @handle-switch="handleChange"
        />
      </div>
      <div class="address-details__more-informations">
        <span class="more-informations__title">Informations supplementaires</span>
        <div class="more-informations__inputs">
          <div
            v-for="(item, index) in arrivalAddressInputs"
            :key="index"
            class="more-informations__element"
            :class="item.extraClass"
          >
            <Select
              :label="item.label"
              :name="item.nameInput"
              :options="item.options"
              :value="props.announcementData[item.nameInput]"
              @change-select="handleChange"
            />
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script lang="ts" setup>
import useAutoComptetion from "@/composables/useAutoComplete";
import Note from "@/pages/transport/components/Note.vue";
import RadioGroup from "@/pages/transport/components/RadioGroup.vue";
import Input from "@/components/Common/Input/Input.vue";
import Switch from "@/components/Common/Switch/Switch.vue";
import Select from "@/components/Common/Select/Select.vue";
import { departureAddressInputs, arrivalAddressInputs } from "@/pages/transport/components/data";

import { ref, watch, computed, onMounted } from "vue";

import { useStore } from "vuex";

const store = useStore();

const departureAddressData = useAutoComptetion("departureAddressField");
const arrivalAddressData = useAutoComptetion("arrivalAddressField");
// const init = ref<any>({});

const notificationText = ref<string>(
  "Ces informations seront communiquees au (co)transporteur que vous avez choisi pour la livraison"
);

const radioOptions = ref<Array<object>>([
  {
    label: "Expéditeur",
    value: 0,
    inputValue: "expediteur",
  },
  {
    label: "Déstinataire",
    value: 1,
    inputValue: "destinataire",
  },
]);

const emit = defineEmits(["store-announcement-data"]);

const props = defineProps({
  announcementData: {
    type: Object,
    default: {}
  }
})

const initValueSet = ref<boolean>(false);

watch(
  () => departureAddressData.autocompleteResult,
  (value) => {
    let temp = {
      departureAddress: value.value?.address,
      departureLatitude: String(value.value?.lat),
      departureLongitude: String(value.value?.lng),
    };
    if (props.announcementData.departureAddress === undefined || props.announcementData.departureAddress !== temp.departureAddress) handleChange(temp);
  },
  { immediate: true, deep: true }
);

watch(
  () => arrivalAddressData.autocompleteResult,
  (value) => {
    let temp = {
      arrivalAddress: value.value?.address,
      arrivalLatitude: String(value.value?.lat),
      arrivalLongitude: String(value.value?.lng),
    };
    if (props.announcementData.arrivalAddress === undefined || props.announcementData.arrivalAddress !== temp.arrivalAddress) handleChange(temp);
  },
  { immediate: true, deep: true }
);

onMounted(() => {
  checkStoredData();
  setInitialData();
})

function setInitialData() {
  if (!initValueSet.value) {
    emit("store-announcement-data", { 
      isFlexibleDeparture: false, 
      isBringToDeparture: false, 
      isFlexibleArrival: false,
      isBringToArrival: false 
    })
  };
}

function checkStoredData() {
  props.announcementData.hasOwnProperty('isFlexibleDeparture') ? initValueSet.value = true : initValueSet.value = false;
}

function handleChange(value: any) {    
  emit("store-announcement-data", value)
}

</script>
<style lang="scss" scoped>
.address-details {
  &__container {
  }

  &__title {
    @apply text-[14px] text-grayIcon;

    @screen md {
      @apply text-[16px];
    }
  }

  &__subtitle {
    @apply text-[14px] text-grayIcon font-medium block mt-4;
  }

  &__departure,
  &__destination {
    @apply mt-6;
  }

  &__more-informations {
    @apply border rounded p-2.5 flex flex-col my-4;
    border-color: var(--color-stroke-gray);
  }
}

.more-informations {
  &__title {
    @apply block w-full text-[16px] mb-2;
    color: var(--color-primary);
  }

  &__inputs {
    @apply flex flex-wrap;

    @screen md {
      @apply flex-row items-end;
    }
  }
}

.__hr {
  @apply block my-4 text-gray;
}

.custom-input__fields {
  &:deep {
    @apply mb-0;
  }
}

.grouped-input {
  @apply w-1/2;

  &:first-child {
    @apply pr-2;
  }

  &:last-child {
    @apply pl-2;
  }

  @screen md {
    @apply w-1/3 px-1;
  }
}

.single-input {
  @apply w-full;

  @screen md {
    @apply w-1/3 pl-2;
  }
}

.switcher-extra-class {
  @apply mt-4;
}
</style>
