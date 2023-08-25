<template>
  <MainCard
    :dataBreadcrumbs="breadcrumbData"
    class="convocation"
    :button="true"
    :disable-submit-button="false"
    labelButton="Ajouter"
    @handleClickReturn="back"
    @on-click="submitForm"
  >
    <div class="convocation__container">
      <div class="convocation__form">
        <Title
          type="h2"
          label="Ajouts de points à l’ordre du jour de l’assemblée générale"
          class="convocation__form-title"
        />
        <hr class="__hr" />
        <div class="convocation__form-wrap">
          <InputDate
            label="Date"
            :placeholder="newDate"
            name="date"
            :value="payload.date"
            @handle-date-format-fr="handleChange"
          />
          <Select 
            label="Nom du propriétaire"
            placeholder="Nom du propriétaire"
            name="owner"
            :options="ownerList"
            :value="payload.owner"
            @change-select="handleChange"
          />
          <Input
            label="Objet"
            placeholder="Object"
            name-input="object"
            :value="payload.object"
            @input="handleChange"
          />
          <!-- <Select
                        label="Je souhaite ajouter le point suivant à l’ordre du jour"
                        placeholder="Points proposés par l’application"
                        name="pointSelect"
                        :options="options"
                    /> -->
        </div>
      </div>
    </div>
  </MainCard>
</template>
<script lang="ts" setup>
import Input from "@/components/Common/Input/Input.vue";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import Select from "@/components/Common/Select/Select.vue";
import Title from "@/components/Common/Title/Title.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import { notification } from 'ant-design-vue';
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

interface Option {
  value: string;
  label: string;
}

interface IAgenda {
    date?: string,
    object?: string,
    owner?: number,
    ownershipGeneralMeeting?: number
}

const store = useStore();

const props = defineProps({
  currentSession: {
    type: Object,
    default: {}
  }
});

const payload = ref<IAgenda>({
    ownershipGeneralMeeting: props.currentSession.id,
});

const breadcrumbData = [
  {
    label: "Assemblées générales",
    url: "",
  },
  {
    label: props.currentSession.year,
    url: "",
  },
  {
    label: "Convocation",
  },
];

const emit = defineEmits<{
  (event: "backToPage", value: boolean): void;
}>();

const newDate = new Date().toLocaleDateString();
const ownerList = computed(() => {
    let data = store.getters["SyndicModule/getOwnerList"];
    return handleOptionsConsistency(data);
});

function handleOptionsConsistency(data: any) {
    let formated : Option[] = [];
    if (Array.isArray(data) && data.length >=1) data.forEach((element: any) => formated.push({ value: element.id, label: element.name }));
    return formated;
}

function handleChange(value: any) {
    payload.value = { ...payload.value, ...value };
}

function back(value: any) {
  emit("backToPage", value);
}

async function submitForm() {
    const success = await store.dispatch("SyndicModule/postNewAgenda", payload.value);
    if (success) {
        notification['success']({ message: 'Ordre du jour ajouté' });
        resetPayload();
    } else {
        notification['error']({ message: 'Une erreur est survenue, veuillez réessayer' });
    }
}

function resetPayload() {
    payload.value = { ownershipGeneralMeeting: props.currentSession.id };
}
</script>
<style lang="scss" scoped>
.convocation {
  &__container {
    @apply flex flex-col gap-[14px];
  }

  &__form {
    @apply flex flex-col gap-[18px];

    &-title {
      @apply text-primary font-[600] text-[14px];
    }

    &-wrap {
      @apply flex flex-col gap-[18px];

      &:deep() {
        .custom-input__fields,
        .custom-select__wrapper {
          @apply mb-0;
        }

        .date__space {
          gap: 0 !important;
        }

        .date__label {
          @apply mb-[10px];
        }

        label {
          @apply font-[600] text-black;
        }
      }
    }
  }
}

.__hr {
  @apply text-gray w-full;
}
</style>
