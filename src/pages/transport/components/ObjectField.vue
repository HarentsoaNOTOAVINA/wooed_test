<template>
  <div class="grouped-input">
    <Input 
      class="grouped-input__quantity-input" 
      nameInput="quantity" 
      label="Quantité" 
      input-type="number"
      @input="handleChange" 
      :value="objectProperty.quantity" 
    />
    <Input 
      class="grouped-input__name-input" 
      nameInput="name" 
      label="Nom de l'objet" 
      @input="handleChange"
      @focus="hiddenFields = false"
     :value="objectProperty.name" 
    />
    <Transition appear name="fadeHeight" mode="out-in">
      <button v-if="props.showTrash" class="delete-field-button" @click="handleDeleteProcess">
        <Trash class="icon" />
      </button>
    </Transition>
  </div>
  <Transition appear name="fadeHeight" mode="out-in">
    <div v-if="!hiddenFields" class="more-details">
      <div class="input-wrapper__dimension-details gray-left-border">
        <div class="dimension-details__switcher">
          <div class="switcher__on-mobile">
            <Switch 
              checked-name="Oui" 
              unchecked-name="Non" 
              item-label="Je ne connais pas les dimension de l’objet"
              name="dimensionKnown" 
              @handle-switch="handleSwitcher"
              :switch-value="dimensionKnown" 
            />
          </div>
          <div class="switcher__on-desktop">
            <RadioGroup 
              :options="RadioOptions" 
              @select-option="handleSwitcher" 
              :name-input="'dimensionKnown'" 
              :default-value="dimensionKnown"
            />
          </div>
        </div>
        <div v-if="dimensionKnown" class="dimension-details">
          <div class="dimension-details__input-group">
            <Input 
              label="Longeur (en cm)" 
              name-input="length" 
              input-type="number"
              @input="handleChange" 
              :value="objectProperty.length" 
              class="dimension-details__input-element"
            />
            <Input 
              label="Largeur (en cm)" 
              name-input="width" 
              input-type="number"
              @input="handleChange" 
              :value="objectProperty.width" 
              class="dimension-details__input-element" 
            />
            <Input 
              label="Hauteur (en cm)" 
              name-input="height" 
              input-type="number"
              @input="handleChange" 
              :value="objectProperty.height" 
              class="dimension-details__input-element" 
            />
          </div>
        </div>
        <RadioGroupButton 
          v-else 
          :options="predifinedSize" 
          @select-option="handleChange" 
          :name-input="'sizeValue'" 
        />
        <Select 
          class="dimension-details__select" 
          :label="'Poids'" 
          name="weight" 
          :options="PredifinedWeight"
          @change-select="handleChange" 
        />
      </div>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import Input from "@/components/Common/Input/Input.vue";
import Switch from "@/components/Common/Switch/Switch.vue";
import RadioGroup from "@/pages/transport/components/RadioGroup.vue";
import RadioGroupButton from "@/pages/transport/components/RadioGroupButton.vue";
import Select from "@/components/Common/Select/Select.vue";
import Trash from "@/components/Icon/Trash.vue";

import { ref, watch, computed, onMounted } from "vue";
import { useStore } from "vuex";

interface IObjectData {
  name?: string;
  quantity?: number;
  length?: string;
  weight?: string;
  width?: string;
  height?: string;
  volume?: number;
  sizeValue?: string;
}

interface IRadioItem {
    label: string;
    value: number;
    inputValue: boolean;
}

interface IWeightItem {
    label: string,
    value: number
}

const store = useStore();

const hiddenFields = ref<boolean>(true);

const dimensionValueSet = ref<boolean>(false);

const objectProperty = ref<IObjectData>({});

const RadioOptions : IRadioItem[] = [
    {
        label: 'Je connais les dimension de l’objet',
        value: 0,
        inputValue: true
    },
    {
        label: 'Je ne connais pas les dimension de l’objet',
        value: 1,
        inputValue: false
    }
]

const PredifinedWeight : IWeightItem[] = [
    {
        label: '-5kg',
        value: 5
    },
    {
        label: '5 à 30 kg',
        value: 30
    },
    {
        label: '30 à 100 kg',
        value: 100
    },
    {
        label: '+ 100kg',
        value: 200
    }
]

const displayDimensionFields = ref<boolean>(true);

const predifinedSize = computed(() => {
  const list = store.getters["TransportModule/getPredifinedSizes"];
  return list.sort((a: any, b: any) => a.id - b.id);
});

const emit = defineEmits(["handle-change", "delete-row"])

const props = defineProps({
  showTrash: {
    type: Boolean,
    default: false,
  },
  index: {
    type: Number,
    required: true,
  },
  nameFieldError: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    required: true
  }
});

const dimensionKnown = computed(() => store.getters["TransportModule/getAnnouncementData"].isDimensionKnown)

watch(
  () => objectProperty.value,
  (value) => {
    emit("handle-change", value)
  }, { immediate: true, deep: true }
)


onMounted(() => {
  objectProperty.value = { ...objectProperty.value, ...props.initialData };
})


function handleSwitcher(value: any) {
  console.error(value, "handleSwitcher");
  store.dispatch("TransportModule/setAnnouncementData", { isDimensionKnown : value.dimensionKnown })
  emit("handle-change", { dimensionKnown: value })
}

function handleChange(value: any) {
  objectProperty.value = { ...objectProperty.value, ...value };
  const dimensionKeys = ["sizeValue", "height"];
  const fieldKey = Object.keys(value)[0];
  dimensionValueSet.value = dimensionKeys.includes(fieldKey);
}

function handleDeleteProcess() {
  emit("delete-row", props.index);
}
</script>
<style lang="scss" scoped>
.grouped-input {
  @apply flex gap-x-4 items-center;

  &__quantity-input {
    @apply w-1/3;
  }

  &__name-input {
    @apply w-2/3;
  }
}

.dimension-details {
  &__input-group {
    @apply flex flex-row gap-x-2.5;
  }

  &__input-element {
    @apply w-1/3;
  }

  &__switcher {
    .switcher {
      &__on-mobile {
        @apply mb-4;

        @screen md {
          @apply hidden;
        }
      }

      &__on-desktop {
        @apply hidden;

        @screen md {
          @apply inline-block;
        }
      }
    }
  }
}

.input-wrapper {
  &__dimension-details {
    @apply pl-2.5 mt-2.5;

    .gray-left-border {
      @apply border-l-2;
      border-color: var(--color-primary);
    }
  }

  &__input-element {
    @apply w-1/3;
  }
}

.delete-field-button {
  @apply inline-flex items-center justify-center w-12 h-9 rounded-full;
  background-color: var(--color-primary);

  @screen md {
    @apply w-10 h-9;
  }
}

.icon {
  @apply w-6 h-6 mx-auto;
}

.gray-border {
  border-color: var(--color-primary);
}

.gray-left-border {
  @apply border-l-2;
  border-color: var(--color-primary);
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
    transition: all 0.3s ease-in-out;
    max-height: 1000px;
}

.fadeHeight-enter-from,
.fadeHeight-leave-to {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0px;
}
</style>
