<template>
  <Note :text="notificationText" />
  <TextArea
    nameInput="additionalInfo"
    placeholder=""
    @handle-change="handleChange"
    :default-value="props.announcementData.additionalInfo"
  />
  <Switch
    :item-label="'Avez-vous besoin de voyager avec les objet ?'"
    class="pt-4"
    name="isTravelWith"
    :value="props.announcementData.isTravelWith"
    @handle-switch="handleChange"
  />
</template>
<script lang="ts" setup>
import Note from "@/pages/transport/components/Note.vue";
import TextArea from "@/components/Common/TextArea/TextArea.vue";
import Switch from "@/components/Common/Switch/Switch.vue";

import AnnounceOverview from "@/pages/transport/components/AnnounceOverview.vue";

import { ref, computed, onMounted } from "vue";

import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  announcementData: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(["store-announcement-data"]);

const initValueSet = ref<boolean>(false);

const notificationText = ref<string>(
  "Attention, ces informations sont publiques. Pour preserver votre privee, \
vous ne devez pas indiquer vos coordonnees (adresse e-mail, telephone ou adresse)."
);

onMounted(() => {
  checkStoredData();
  setInitialData();
});

function checkStoredData() {
  props.announcementData.hasOwnProperty("isTravelWith")
    ? (initValueSet.value = true)
    : (initValueSet.value = false);
}

function setInitialData() {
  if (!initValueSet.value) emit("store-announcement-data", { isTravelWith: false })
}

function handleChange(value: any) {
  emit("store-announcement-data", value);
}
</script>
<style lang="scss" scoped>
.announce-overview {
  &__accordion-header {
    @apply py-2.5 px-[14px] border rounded flex justify-between items-center;
    border-color: var(--color-stroke-gray);

    .title {
      @apply text-[14px] font-semibold;
    }
  }

  &__main-content {
    @apply p-1;
  }
}
</style>
