<template>
  <MainCard :data-breadcrumbs="breadcrumbData" :button="true" @handleClickReturn="backTo">
    <div class="proposition-form__container">
      <Title
        type="h3"
        label="Soumettre une nouvelle proposition"
        class="proposition-form__title"
      />
      <hr class="__hr" />
      <Select
        :key="`author${key}`"
        label="Auteur de la proposition"
        :default-value="syndicProfile.id"
        name="author"
        placeholder="Sélectionner"
        :options="authorList"
        @change-select="handleChange"
      />
      <TextArea
        :key="`proposition${key}`"
        placeholder="Votre proposition..."
        name-input="description"
        :auto-size="rows"
        :maxLength="0"
        @handle-change="handleChange"
      />
    </div>
    <template #buttonFooter>
      <Button type-button="primary" :disabled="loading" @click="submitForm">
        <LoadingButton size="xs" v-if="loading" />
        Partager
      </Button>
    </template>
  </MainCard>
</template>
<script lang="ts" setup>
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import LoadingButton from "@/components/Icon/LoadingButton.vue";
import Title from "@/components/Common/Title/Title.vue";
import Button from "@/components/Common/Button/Button.vue";
import TextArea from "@/components/Common/TextArea/TextArea.vue";
import Select from "@/components/Common/Select/Select.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { notification } from "ant-design-vue";

interface Contact {
    value: number;
    label: string;
}

interface Proposition {
  comment: string;
  author: number;
}

const store = useStore();

const breadcrumbData = [
  {
    label: "Propositions",
    url: "",
  },
  {
    label: "Soumettre une proposition",
  },
];

const emit = defineEmits(["back-to-prev"]);
const rows = { minRows: 5, maxRows: 5 };
const syndicProfile = computed(() => store.getters["SyndicModule/getSyndicProfile"]);
const payload = ref<Proposition>({ comment: '', author: syndicProfile.value.id });
const authorList = computed(() => {
  syndicProfile.value.name = "Moi même";
  let memberList = store.getters["SyndicModule/getMemberList"];
  if (!checkIdIfObjectExists(memberList, syndicProfile)) memberList.push(syndicProfile.value);
  return handleOptionsConsistency(memberList);
});
const key = ref(0);
const loading = ref(false);


function backTo(value: any) {
  emit("back-to-prev", value);
}

function handleChange(value: any) {
  payload.value = { ...payload.value, ...value };
}

function handleOptionsConsistency(contactList: any) {
    let formated : Contact[] = [];
    if (Array.isArray(contactList) && contactList.length >=1) {
        contactList.forEach((contact: any) => {
            formated.push({ 
                value: contact.id, 
                label: contact.name
            })
        });
    } 
    return formated;
}

function checkIdIfObjectExists(array: any[], object: any) {
    return array.some((element: any) => element.id === object.id);
}

async function submitForm() {
  loading.value = true;
  let success = await store.dispatch("SyndicModule/submitProposition", payload.value);
  if (success) {
    notification["success"]({ message: "La proposition a été soumise" });
    key.value++;
    loading.value = false;
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
    loading.value = false;
  }
}
</script>
<style lang="scss" scoped>
.proposition-form {
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
