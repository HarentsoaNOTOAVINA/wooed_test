<template>
  <MainCard :dataBreadcrumbs="breadcrumbData" class="procesVerbal" :button="true" labelButton="Enregistrer"
    :disable-submit-button="false" @handleClickReturn="back" @on-click="uploadTranscripts">
    <div class="procesVerbal__container">
      <div class="procesVerbal__container">
        <Title type="h2" label="Procès verbal" class="procesVerbal__title" />
        <hr class="__hr" />
        <div class="procesVerbal__container-container">
          <div>
            <div v-if="transcripts.length >= 1" class="procesVerbal__items-list">
              <CardWrapper v-for="(item, index) in transcripts" :key="index" class="procesVerbal__items-content"
                @click="setPdfPath(item.path)">
                <Icon icon-name="FilePdf" />
                <label> Fichier {{ index + 1 }} </label>
              </CardWrapper>
            </div>
            <CardWrapper v-else>
              <Empty description="Aucun fichier ajouter" />
            </CardWrapper>
          </div>
          <div class="procesVerbal__container-wrap">
            <UploadImage name="uploadFiles" @upload="handleUpload" :key="uploadKey" />
            <div class="procesVerbal__lists">
              <label> Ordre(s) du jour </label>
              <ul v-if="agendaList.length >= 1" class="procesVerbal__lists-item">
                <li v-for="(agenda, index) in agendaList" :key="index">
                  {{ agenda.object }}
                </li>
              </ul>
              <CardWrapper v-else>
                <Empty description="Aucune ordre du jour ajouter" />
              </CardWrapper>
            </div>
            <div class="procesVerbal__lists">
              <label> Liste de décision </label>
              <div class="procesVerbal__lists-container">
                <template v-if="decisionList.length > 0">
                  <CardDecision v-for="(item, index) in decisionList" :key="index" :data="item" />
                </template>
                <CardWrapper v-else>
                  <Empty description="Aucune décision ajouter" />
                </CardWrapper>
              </div>
            </div>
            <CardWrapper>
              <div class="procesVerbal__form">
                <Input name-input="description" label="Décision" placeholder="Décision" :value="payload.description"
                  @input="handleChange" :key="decisionKey" />
                <Switch item-label="Réaliser" name="isRealized" checked-name="Oui" unchecked-name="Non"
                  :value="payload.isRealized" @handle-switch="handleChange" :key="decisionKey" />
                <InputDate name="realizationDate" label="Date" :value="payload.realizationDate"
                  @handle-date-format-fr="handleChange" :key="decisionKey" />
                <TextArea :auto-size="{ minRows: 4, maxRows: 4 }" label="Commentaire" name-input="comment"
                  placeholder="Votre commentaire..." :default-value="payload.comment" @handle-change="handleChange" :key="decisionKey" />
                <div class="procesVerbal__button">
                  <Button @click="submitForm"> Ajouter </Button>
                </div>
              </div>
            </CardWrapper>
          </div>
        </div>
      </div>
    </div>
    <PdfModal :pdf-path="pdfPath" :show="pdfPath.length >= 1" @close-modal="setPdfPath('')" />
  </MainCard>
</template>
<script lang="ts" setup>
import Button from "@/components/Common/Button/Button.vue";
import Icon from "@/components/Common/Icon/Icon.vue";
import Input from "@/components/Common/Input/Input.vue";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import Switch from "@/components/Common/Switch/Switch.vue";
import TextArea from "@/components/Common/TextArea/TextArea.vue";
import Title from "@/components/Common/Title/Title.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import UploadImage from "@/components/Display/UploadImage/UploadImage.vue";
import PdfModal from "@/components/Display/PdfModal/PdfModal.vue";
import { Empty } from "ant-design-vue";
import { notification } from "ant-design-vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import CardDecision from "@/pages/syndic/components/GeneralMeetings/CardDecision.vue";

interface IDecision {
  description?: string;
  isRealized?: boolean;
  realizationDate?: string;
  comment?: string;
  generalMeeting: number;
}

interface ITranscripts {
  coOwnershipMeetingTranscriptFiles?: object[];
  generalMeeting: number;
}

const store = useStore();

const props = defineProps({
  currentSession: {
    type: Object,
    default: {},
  },
});

const payload = ref<IDecision>({
  generalMeeting: props.currentSession.id,
  isRealized: false,
});
const fileList = ref<ITranscripts>({ generalMeeting: props.currentSession.id });
const pdfPath = ref<string>("");
const uploadKey = ref(0);
const decisionKey = ref(0);

const agendaList = computed(() => store.getters["SyndicModule/getAgendaList"]);
const decisionList = computed(() => store.getters["SyndicModule/getDecisionList"]);
const transcripts = computed(() => store.getters["SyndicModule/getTranscripts"]);

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
    label: "Procès verbal ",
  },
];

interface Option {
  value: string;
  label: string;
}

const emit = defineEmits<{
  (event: "backToPage", value: boolean): void;
}>();

const options = ref<Option[]>([]);

function handleChange(value: any) {
  payload.value = { ...payload.value, ...value };
}

function handleUpload(value: any) {
  fileList.value.coOwnershipMeetingTranscriptFiles = value.map(
    (element: any) => element.originFileObj
  );
}

async function submitForm() {
  const success = await store.dispatch("SyndicModule/postDecision", payload.value);
  if (success) {
    notification["success"]({ message: "Décision enregistrée" });
    resetFileList();
    decisionKey.value++;
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
  }
}

async function uploadTranscripts() {
  let success = await store.dispatch(
    "SyndicModule/postMeetingTranscript",
    fileList.value
  );
  if (success) {
    notification["success"]({ message: "Procés verbales enregistrées" });
    resetPayload();
    uploadKey.value++;
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
  }
}

function setPdfPath(value: any) {
  pdfPath.value = value;
}

function resetFileList() {
  fileList.value = { generalMeeting: props.currentSession.id };
}

function resetPayload() {
  payload.value = { generalMeeting: props.currentSession.id };
}

function back(value: any) {
  emit("backToPage", value);
}
</script>
<style lang="scss" scoped>
.procesVerbal {
  &__container {
    @apply flex flex-col gap-[14px];
  }

  &__title {
    @apply text-primary font-[600] text-[14px];
  }

  &__subtitle {
    @apply text-grayIcon font-[600] text-[14px] pl-[24px];
  }

  &__container {
    @apply flex flex-col gap-[18px];

    &-container {
      @apply flex flex-col gap-[18px];
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

  &__lists {
    @apply flex flex-col gap-[10px];

    &-container {
      @apply grid grid-cols-1 gap-[14px];
    }

    &-item {
      @apply list-disc pl-[24px] text-grayIcon;
    }
  }

  &__form {
    @apply flex flex-col gap-[14px];

    @screen md {
      @apply gap-[18px];
    }
  }

  &__button {
    @apply flex justify-end;
  }

  &__items {
    @apply flex flex-col gap-[18px];

    &-list {
      @apply grid grid-cols-2 gap-[14px];

      @screen sm {
        @apply grid-cols-4;
      }

      @screen md {
        @apply grid-cols-2;
      }

      @screen lg {
        @apply grid-cols-4 gap-[18px];
      }

      a {
        @apply w-full block;
      }

      a:hover {
        @apply text-primary;
      }
    }

    &-content {
      @apply flex flex-col justify-center text-center gap-[18px] w-full cursor-pointer;

      label {
        @apply truncate block;
      }
    }
  }
}

.__hr {
  @apply text-gray w-full;
}
</style>
