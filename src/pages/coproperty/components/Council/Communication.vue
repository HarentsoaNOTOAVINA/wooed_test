<template>
  <MainCard :data-breadcrumbs="breadcrumbData" :button="true">
    <div class="council-communication__container">
      <Title type="h3" label="Notifier les membres du copropriété" class="council-communication__title" />
      <hr class="__hr" />
      <TextArea
        :key="`message${key}`"
        label="Message"
        placeholder="Votre message..."
        name-input="message"
        :auto-size="rows"
        :maxLength="0"
        @handle-change="handleChange"
      />
    </div>
    <template #buttonFooter>
      <Button type-button="primary" :disabled="loading" @click="submitForm">
        <LoadingButton size="xs" v-if="loading" />
        Notifier
      </Button>
    </template>
  </MainCard>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import Title from "@/components/Common/Title/Title.vue";
import Button from "@/components/Common/Button/Button.vue";
import TextArea from "@/components/Common/TextArea/TextArea.vue";
import Input from "@/components/Common/Input/Input.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { notification } from "ant-design-vue";

interface Icommunication {
  message?: string,
  object?: string
}

const store = useStore();

const breadcrumbData = [
  {
    label: "Conseil de copropriété",
  },
  {
    label: "Autres communications",
  },
];

const message = ref<Icommunication>({});
const loading = ref(false);
const key = ref(0);

const rows = { minRows: 5, maxRows: 5 };

function handleChange(value: any) {
  message.value = { ...message.value, ...value };
}

async function submitForm() {
  loading.value = true;
  message.value.object = "Conseil de copropriété";
  let success = await store.dispatch("SyndicModule/communicateWithMembers", message.value);
  if (success) {
    notification["success"]({ message: "Les membres du copropriété seront notifier" });
    key.value++;
    loading.value = false;
  } else {
    loading.value = false;
  }
}
</script>
<style lang="scss" scoped>
.council-communication {
  &__container {
    @apply flex flex-col gap-[14px] mb-[18px];
  }

  &__title {
    @apply text-[14px] text-primary font-[600] leading-[17px];
  }
}

.__hr {
  @apply text-gray w-full;
}
</style>
