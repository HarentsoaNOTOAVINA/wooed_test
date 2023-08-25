<template>
  <div class="send-receive-form__input-wrapper">
    <div v-for="(item, index) in inputGroup" :key="index">
      <ObjectField
        :show-trash="false"
        @handle-change="handleChange"
        @delete-row="deleteCurrentField"
        :index="index"
        :name-field-error="requiredFieldMissing"
        :initial-data="objectData"
      />
    </div>
    <div class="send-receive-form__add-new-field-button">
      <button class="add-new-field-button" @click="addNewInputsField">
        Ajouter un objet
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import ObjectField from "@/pages/transport/components/ObjectField.vue";

import { useStore } from "vuex";

import { markRaw, ref, onMounted, computed, watch } from "vue";

interface IAnnouncementObject {
  name: string;
  quantity: number;
  length?: string;
  width?: string;
  height?: string;
  volume?: number;
  sizeValue?: string;
  weight?: string
}

const store = useStore();

const requiredFieldMissing = ref<boolean>(false);

const sizes = ref<any>();

// const announcementObjects = ref<Array<IAnnouncementItem>>([]);

const inputGroup = ref<Array<object>>([markRaw(ObjectField)]);

const requiredFieldSet = ref<boolean>(false);

const props = defineProps({
  announcementData: {
    type: Object,
    default: {}
  },
  objectData: {
    type: Object,
    default: {}
  },
  needToBeCompleted: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(["store-announcement-data", "store-object-data"]);

const dimensionKnown = ref<boolean>();


onMounted(async () => {
  checkDimensionPreference();
  setInitialData();
  await store.dispatch("TransportModule/fetchSizes");
})

// function handleChange(data: any) {
//   if (announcementObjects.value.length === 0) {
//     announcementObjects.value = [...announcementObjects.value, data.data];
//   } else {
//     if (announcementObjects.value.length - 1 < data.idx) {
//       announcementObjects.value = [...announcementObjects.value, data.data];
//     } else {
//       announcementObjects.value = announcementObjects.value.map(
//         (item: any, index: number) => {
//           if (index === data.idx) {
//             return { ...item, ...data.data };
//           } else {
//             return item;
//           }
//         }
//       );
//     }
//   }
// }

function checkDimensionPreference() {
  props.announcementData.hasOwnProperty('isDimensionKnown') 
    ? dimensionKnown.value = props.announcementData.isDimensionKnown 
    : emit("store-announcement-data", { isDimensionKnown: true });
}

function setInitialData() {
  dimensionKnown.value = props.announcementData.isDimensionKnown;
}

function handleChange(value: any) {  
  value.hasOwnProperty('dimensionKnown')
    ? initiateDimensionData(value.dimensionKnown)
    : emit("store-object-data", value);
}

function initiateDimensionData(dimensionKnown: any) {
  dimensionKnown 
    ? emit("store-object-data", { sizeValue: "" })
    : emit("store-object-data", { length: "", width: "", height: "", volume: 0, size: "", weight: "" });
}

function addNewInputsField() {
  // inputGroup.value.push(markRaw(ObjectField)); TODO: uncomment this line to make this function work again
}

function deleteCurrentField(itemIndex: number) {
  inputGroup.value.splice(itemIndex, 1);
}
</script>
<style lang="scss" scoped>
.send-receive-form {
  &__input-wrapper {
    &__input-group {
      @apply flex flex-col;

      @screen md {
        @apply flex flex-row items-center;
      }
    }

    &__dimension-details {
      @apply border-l-2 pl-2.5 mt-2.5;
      border-color: var(--color-primary);

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

  &__input-element {
    @apply w-full;

    @screen md {
      @apply w-1/2 px-2;
    }
  }

  &__add-new-field-button {
    @apply flex justify-end gap-x-4 mb-4 hidden; // TODO: remove hidden class to make this button appear again

    .add-new-field-button {
      @apply py-2 px-4 rounded-full;
      background-color: var(--color-primary);
      color: #fff;
    }
  }
}

.dimension-details {
  &__input-group {
    @apply flex gap-x-[10px];
  }

  &__input-element {
    @apply w-1/3;
  }

  &__select {
    @apply w-full;
  }
}

dimension-details__select .input-element-container {
  @apply gap-x-[10px];
}
</style>
