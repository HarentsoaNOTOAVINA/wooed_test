<template>
  <div class="lot-form__container">
    <div class="lot-form__user-details">
      <span class="lot-form__user-position">Lot</span>
      <Input name-input="numberLot" label="Numéro du lot" class="mb-2" :value="payload.numberLot" @input="handleChange" :has-error="missingFields.includes('numberLot') ? errorMsg : undefined" />
      <div class="lot-form__lot-details">
        <Input name-input="location" label="Emplacement" class="mb-2" :value="payload.location" @input="handleChange" :has-error="missingFields.includes('location') ? errorMsg : undefined" />
        <Input name-input="quota" label="Quotités" class="mb-4" :value="payload.quota" @input="handleChange" :has-error="missingFields.includes('quota') ? errorMsg : undefined" />
      </div>
    </div>
    <div class="lot-form__user-details">
      <span class="lot-form__user-position">Propriétaire</span>
      <Input name-input="ownerName" label="Nom" class="mb-2" :value="payload.ownerName" @input="handleChange" :has-error="missingFields.includes('ownerName') ? errorMsg : undefined" />
      <div class="lot-form__user-contact">
        <Input name-input="ownerEmail" label="Email" :value="payload.ownerEmail" @input="handleChange" :has-error="missingFields.includes('ownerEmail') ? invalidEmail : undefined" />
        <Input name-input="ownerPhoneNumber" label="Téléphone" :value="payload.ownerPhoneNumber" @input="handleChange" :has-error="missingFields.includes('ownerPhoneNumber') ? errorMsg : undefined" />
      </div>
    </div>
    <div class="lot-form__user-details">
      <span class="lot-form__user-position">Locataire</span>
      <Input name-input="tenantName" label="Nom" class="mb-2" :value="payload.tenantName" @input="handleChange" />
      <div class="lot-form__user-contact">
        <Input name-input="tenantEmail" label="Email" :value="payload.tenantEmail" @input="handleChange" :has-error="missingFields.includes('tenantEmail') ? invalidEmail : undefined" />
        <Input name-input="tenantPhoneNumber" label="Téléphone" :value="payload.tenantPhoneNumber"
          @input="handleChange" />
      </div>
    </div>
    <Button class="btn-foot float-right" type-button="secondary" :disabled="disableSubmit" @click="handleFormSubmission">
      <LoadingButton size="xs" v-if="loading" />
      {{ buttonLabel }}
    </Button>
  </div>
</template>
<script lang="ts" setup>
import Input from "@/components/Common/Input/Input.vue";
import Button from "@/components/Common/Button/Button.vue";
import LoadingButton from "@/components/Icon/LoadingButton.vue";
import emailValidation from '@/utils/validation/email_validation';
import { notification } from "ant-design-vue";
import { onMounted, PropType, ref, watch } from "vue";
import { useStore } from "vuex";

interface Ilot {
  id?: number,
  numberLot?: string;
  location?: string;
  quota?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPhoneNumber?: string;
  tenantName?: string;
  tenantEmail?: string;
  tenantPhoneNumber?: string;
  urlReset: string;
  [key: string]: any;
}

interface IMode {
  edit: boolean;
  delete: boolean;
  add: boolean;
}

const store = useStore();
const emit = defineEmits(["hide-form"]);

const props = defineProps({
  mode: {
    type: Object as PropType<IMode>,
    default: "add",
  },
  data: {
    type: Object as PropType<Ilot>,
    default: {},
  }
});

const disableSubmit = ref<boolean>(false);
const missingFields = ref<any[]>([]);
const loading = ref(false);
const buttonLabel = ref<string>("Ajouter un nouveau lot");
const errorMsg = { status: true, errorMsg: "Veuilliez remplir ce champ"};
const invalidEmail = { status: true, errorMsg: "Veuilliez entré un addresse email valide" };
const payload = ref<Ilot>({
  urlReset: `${window.location.origin}/`,
});

watch(
  () => payload.value,
  (value) => {
    payload.value = value;
  },
  { immediate: true, deep: true }
);

watch(
  () => buttonLabel.value,
  (value) => {
    buttonLabel.value = value;
  },
  { immediate: true, deep: true }
);

onMounted(() => checkMode());

function checkMode() {
  if (props.mode.edit) {
    payload.value = props.data;
    buttonLabel.value = "Enregistrer";
  }
}

function handleChange(value: any) {
  const [key] = Object.keys(value);
  payload.value = { ...payload.value, ...value };
  disableSubmit.value = false;
  if (key.includes("Email") && (!missingFields.value.includes(key))) {
    if (emailValidation(value[key])) missingFields.value.push(key);
  } 
  if (missingFields.value.length >= 1) {
    if (missingFields.value.includes(key)) checkRequiredFields(key);
  }
}

async function handleFormSubmission() {
  disableSubmit.value = true;
  cleanPayload();
  const payloadIsValid = requiredKeysExists();
  if (payloadIsValid) {
    loading.value = true;
    const success = await postFormValue();
    loading.value = false;
    handleNotification(success);
    disableSubmit.value = false;
  } 
}

async function postFormValue() {
  let success: boolean;
  props.mode.add
    ? (success = await store.dispatch("SyndicModule/postNewLot", payload.value))
    : (success = await store.dispatch("SyndicModule/updateCurrentLot", {
      id: props.data.id,
      data: payload.value,
    }));
  return success;
}

function handleNotification(value: Boolean) {
  if (value) {
    notification["success"]({ message: "Lot enregistré avec succés" });
    disableSubmit.value = false;
    emit("hide-form");
  } else {
    notification["error"]({ message: "Une erreur est survenue, veuillez réessayer" });
    disableSubmit.value = false;
  }
}

function requiredKeysExists() {
  let requiredKeys = ['numberLot', 'location', 'quota', 'ownerEmail', 'ownerName', 'ownerPhoneNumber'];
  for (let i = 0; i < requiredKeys.length; i++) {
    const currentKey = requiredKeys[i];
    if (!payload.value.hasOwnProperty(currentKey) && isValidString(payload.value[currentKey])) {
      missingFields.value = requiredKeys;
      return false;
    } else {
      requiredKeys.splice(i, 1);
    }
  }
  return true;
}

function cleanPayload() {
  const keys = Object.keys(payload.value);
  for (let i = 0; i < keys.length; i++) {
    const currentKey = keys[i];
    if (!isValidString(payload.value[currentKey])) {
      delete payload.value[currentKey]
    }
  }
}

function isValidString(value: string) {
  if (typeof value === 'string' && value.trim().length === 0) {
    return false;
  }
  return true;
}

function checkRequiredFields(key: string) {
  const index = missingFields.value.findIndex((element: string) => element === key);
  missingFields.value.splice(index, 1);
  console.error(missingFields.value);
  disableSubmit.value = false;
}

function handleEmailValue() {

}
</script>
<style lang="scss" scoped>
.lot-form {
  &__container {
    @apply pb-8;
  }

  &__user-details {
    @apply p-2 border rounded-md mb-4;
    border-color: var(--color-stroke-gray);

    @screen md {
      @apply p-4;
    }
  }

  &__user-position {
    @apply font-semibold block mb-2;
  }

  &__user-contact,
  &__lot-details {
    @apply grid gap-x-2;

    @screen md {
      @apply grid-cols-2;
    }
  }
}
</style>
