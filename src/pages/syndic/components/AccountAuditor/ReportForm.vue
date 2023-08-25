<template>
  <MainCard :data-breadcrumbs="breadcrumbData" :button="true" @handleClickReturn="backTo">
    <div class="account-auditor-report__container">
      <Title type="h3" label="Ajouter un rapport" class="account-auditor-report__title" />
      <hr class="__hr" />
      <div class="account-auditor-report__form-upload">
        <UploadImage
          :key="`upload${key}`"
          name="report-file-list"
          :needBase64="false"
          @upload="handleChange"
        />
      </div>
      <TextArea
        :key="`comment${key}`"
        placeholder="Vos commentaires..."
        name-input="comment"
        :auto-size="rows"
        :maxLength="0"
        @handle-change="handleChange"
      />
    </div>
    <template #buttonFooter>
      <Button type-button="primary" :disabled="loading" @click="submitForm">
        <LoadingButton size="xs" v-if="loading" />
        Enregistrer
      </Button>
    </template>
  </MainCard>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import LoadingButton from "@/components/Icon/LoadingButton.vue";
import Title from "@/components/Common/Title/Title.vue";
import UploadImage from "@/components/Display/UploadImage/UploadImage.vue";
import Button from "@/components/Common/Button/Button.vue";
import TextArea from "@/components/Common/TextArea/TextArea.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { notification } from "ant-design-vue";

const store = useStore();

const breadcrumbData = [
  {
    label: "Commissaire aux comptes",
    url: "",
  },
  {
    label: "Rapport",
    url: "",
  },
  {
    label: "Enregitré un rapport",
  },
];

const emit = defineEmits(["back-to-prev"]);
const rows = { minRows: 5, maxRows: 5 };
const fileList = ref<any>();
const comment = ref<string>();
const coOwnershipId = computed(() => store.getters["SyndicModule/getCoOwnershipId"]);
const key = ref(0);
const loading = ref(false);

function backTo(value: any) {
  emit("back-to-prev", value);
}

function handleChange(value: any) {
  if (value.hasOwnProperty("comment")) {
    comment.value = value.comment;
  } else {
    fileList.value = value.map((element: any) => {
      return { file: element.originFileObj, category: "auditor" };
    });
  }
}

async function submitForm() {
  let payload = {
    coOwnership: coOwnershipId.value,
    coOwnershipFiles: fileList.value,
    comment: comment.value,
  };
  loading.value = true;

  let success = await store.dispatch("SyndicModule/postAccountAuditorReport", payload);
  if (success) {
    notification["success"]({ message: "Le rapport a été enregistrer" });
    key.value++;
    loading.value = false;
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
    loading.value = false;
  }
}
</script>
<style lang="scss" scoped>
.account-auditor-report {
  &__container {
    @apply flex flex-col gap-[14px] mb-[18px];
  }

  &__title {
    @apply text-[14px] text-primary font-[600] leading-[17px];
  }

  &__form-upload {
    @apply flex flex-col;
  }
}

.__hr {
  @apply text-gray w-full;
}
</style>
