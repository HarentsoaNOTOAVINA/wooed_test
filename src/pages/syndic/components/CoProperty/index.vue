<template>
  <MainCard
    :button="true"
    :labelButton="syndicSelected ? 'Demander' : 'Enregistrer'"
    :dataBreadcrumbs="breadcrumbData"
    :disable-submit-button="buttonDisabled"
    class="selectSyndic"
    :borderBottom="true"
    @on-click="submitForm"
  >
    <template v-if="!syndicSelected">
      <Transition appear name="fade-step" mode="out-in">
        <div class="selectSyndic__container">
          <div class="selectSyndic__form-upload">
            <label>
              <span class="font-[600] block mb-2"> Nom du syndic </span>
            </label>
            <Select
              placeholder="Nom du syndic"
              name="syndicId"
              :options="syndicList"
              @change-select="handleSelect"
            />
          </div>
        </div>
      </Transition>
    </template>
    <template v-else>
      <Transition appear name="fade-step" mode="out-in">
        <CoPropertyForm @handle-form-value="handleCoPropertyForm" />
      </Transition>
    </template>
  </MainCard>
</template>
<script lang="ts" setup>
import Select from "@/components/Common/Select/Select.vue";
import Transition from "@/components/Common/Transition/Transition.vue";
import MainCard from "@/components/Display/MainCard/MainCard.vue";
import CoPropertyForm from "@/pages/syndic/components/CoProperty/CoPropertyForm.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { notification } from "ant-design-vue";

const store = useStore();
const route = useRoute();

const breadcrumbData = [
  {
    label: "Copropriété",
  },
];

interface Application {
  theProperty?: number;
  coOwnershipTheProperty?: number;
  file?: object;
  transcript?: object[];
  amount?: number;
  syndic?: number;
}

interface Option {
  value: string;
  label: string;
}

const syndicSelected = ref<boolean>(false);
const syndicResponse = ref<any>();
const currentProperty = ref<string>("");
const buttonDisabled = ref<boolean>(false);
const syndicList = ref<any[]>([]);
const formValue = ref<Application>({});
const propertyDetails = ref<any>();
const coOwnershipId = ref<number>();

onMounted(async () => {
  await fetchSyndicList();
  setCurrentPropertyId();
  setCoOwnershipId();
  await fetchSyndicResponse();
});

async function fetchSyndicList() {
  const temp = await store.dispatch("SyndicModule/fetchSyndicList");
  syndicList.value = handleOptionsConsistency(temp);
}

function setCurrentPropertyId() {
  if (route.params.id !== undefined) {
    currentProperty.value = route.params.id.toString();
    formValue.value.theProperty = parseInt(currentProperty.value);
  }
}

function setCoOwnershipId() {
  propertyDetails.value = store.getters["ManagePropertyModule/getDetailsProperty"];
  if (propertyDetails.value.coOwnerhipTheProperty !== undefined) {
    syndicSelected.value = true;
    coOwnershipId.value = propertyDetails.value.coOwnerhipTheProperty.id;
  }
}

async function fetchSyndicResponse() {
  const payload = {
    thePropertyId: currentProperty.value,
    coOwnershipTheProperty: coOwnershipId.value,
  };

  // syndicResponse.value = await store.dispatch("SyndicModule/getSyndicResponse", payload); // debug it or remove
}

function handleSelect(value: any) {
  const payload = { syndic: value.syndicId };
  formValue.value = { ...formValue.value, ...payload };
  buttonDisabled.value = false;
}

function handleOptionsConsistency(list: any) {
  let result: Option[] = [];
  if (Array.isArray(list) && list.length >= 1)
    list.forEach((element: any) =>
      result.push({
        value: element.id,
        label: `${element.firstname} ${element.name}`,
      })
    );
  return result;
}

function handleCoPropertyForm(value: any) {
  let payload: Application = { coOwnershipTheProperty: coOwnershipId.value };

  if (value.hasOwnProperty("syndicResponse")) {
    const [temp] = value.syndicResponse;
    payload.file = temp.originFileObj;
  } else if (value.hasOwnProperty("generalMeetingTranscript")) {
    const temp = value.generalMeetingTranscript;
    payload.transcript = temp.map((element: any) => element.originFileObj);
  } else if (value.hasOwnProperty("monthlyAmount")) {
    payload.amount = value.monthlyAmount;
  }

  formValue.value = { ...formValue.value, ...payload };
}

async function submitForm() {
  let success: boolean = false;
  if (syndicSelected.value) {
    success = await postSyndicConfirmation();
    if (success) await updateThePropertyCoOwnership();
  } else {
    success = await postCoOwnershipApplication();
  }

  if (success) {
    formValue.value = { theProperty: parseInt(currentProperty.value) };
    syndicSelected.value = true;
    notification["success"]({ message: "Votre demande a été envoyer" });
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
  }

  buttonDisabled.value = false;
}

async function postCoOwnershipApplication() {
  const payload = {
    theProperty: formValue.value.theProperty,
    syndic: formValue.value.syndic,
  };
  return await store.dispatch("SyndicModule/submitCoOwnershipApplication", payload);
}

async function postSyndicConfirmation() {
  const payload = {
    theProperty: formValue.value.theProperty,
    coOwnershipTheProperty: coOwnershipId.value,
    file: formValue.value.file,
  };
  return await store.dispatch("SyndicModule/submitSyndicConfirmation", payload);
}

async function updateThePropertyCoOwnership() {
  const payload = {
    coOwnershipId: coOwnershipId.value,
    data: {
      transcript: { file: formValue.value.transcript },
      amount: formValue.value.amount,
    },
  };
  return await store.dispatch("SyndicModule/updateThePropertyCoOwnership", payload);
}
</script>
<style lang="scss" scoped>
.selectSyndic {
  &:deep() {
    .mainCard__items-wrap-btn {
      @apply overflow-x-hidden;
    }
  }
  &__container {
    @apply flex flex-col gap-[18px];
  }

  &__form-upload {
    @apply flex flex-col;
  }
}

.fade-step-enter-active,
.fade-step-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-step-enter-from,
.fade-step-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
