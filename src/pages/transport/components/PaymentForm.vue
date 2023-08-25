<template>
  <div>
    <Input name-input="cardNumber" label="Carte bancaire" input-type="number" icon-name="BankingLogos" :icon-field="true"
      @input="handleChange" :has-error="nonValidCard" />
    <div class="payment-form__metaData">
      <Input class="field__cvc" name-input="expirationDate" input-type="number" label="Expiration date"
        @input="handleChange" />
      <Input class="field__cvc" name-input="cvc" label="CVC" input-type="number" icon-name="Security" @input="handleChange"
        :has-error="nonValidCvc" />
    </div>
    <div class="payment-form__price">
      <span class="inline-block">Montant</span>
      <span class="inline-block">{{ budget }} €</span>
    </div>
    <div class="payment-form__submit-btn">
      <Button type-button="primary-cancel" @click="cancelPayment"> Annuler </Button>
      <Button type="primary" @click="submitForm"> Payer </Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Input from "@/components/Common/Input/Input.vue";
import Button from "@/components/Common/Button/Button.vue";

import * as mangoPay from "mangopay-cardregistration-js-kit";

import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

interface IPayment {
  cardNumber?: string;
  expirationDate?: string;
  cvc?: string;
}

const props = defineProps({
  budget: {
    type: String,
    default: "",
  },
  registrationInfo: {
    type: Object,
    default: {}
  },
  propositionId: {
    type: Number,
    default: undefined
  }
});

const screen = window.screen;
const navigator = window.navigator;

const emit = defineEmits(['hide-form'])

const BrowserInfo = {
  AcceptHeader: "text/html, application/xhtml+xml, application/xml;q=0.9, /;q=0.8", 
  JavaEnabled: true,
  Language: navigator.language,
  ColorDepth: screen.colorDepth,
  ScreenHeight: screen.height,
  ScreenWidth: screen.width,
  TimeZoneOffset: "60",
  UserAgent: navigator.userAgent,
  JavascriptEnabled: true,
};

const paymentInfo = ref<IPayment>({});
const cardId = ref<any>();
const nonValidCard = ref<any>({ status: false, errorMsg: "numéro de carte non-valide" });
const nonValidCvc = ref<any>({ status: false, errorMsg: "cvc non valide" });

watch(
  () => cardId.value,
  async (value) => {
    cardId.value = value;
    if (cardId.value) await validateProposition();
  },
  { immediate: true, deep: true }
);

function handleChange(value: any) {
  paymentInfo.value = { ...paymentInfo.value, ...value };
}

function validateCreditCardNumber(value: any) {
  let match = false;
  const visaRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  const jcbRegex = /^(?:(?:2131|1800|35\d{3})\d{11})$/;
  const cardValidator = [visaRegex, mastercardRegEx, jcbRegex];
  if (value !== undefined) {
    cardValidator.forEach((regex: any) => {
      if (regex.test(value)) match = true;
    });
  }
  return match;
}

function validateCVC(value: any) {
  let match = false;
  let regex = /^[0-9]{3, 4}$/;
  if (value !== undefined && regex.test(value)) match = true;
  return match;
}

function submitForm() {
  let validCardNumber = validateCreditCardNumber(paymentInfo.value.cardNumber);
  let validCvc = validateCVC(paymentInfo.value.cvc);
  nonValidCard.value.status = !validCardNumber;
  nonValidCvc.value.status = !validCvc;
  if (validCardNumber && validCvc) mangopayProcesses();
}

function cancelPayment() {
  emit('hide-form');
}

async function mangopayProcesses() {
  let auth = "immochv2:5xuqoTkvZByviSgTwRdYMb6KHeKqm09ukYHujx4kW9Ux1ZsLyA";
  // auth = window.btoa(auth);
  // Set MANGOPAY API base URL and Client ID
  mangoPay.cardRegistration.baseURL = `${window.location.origin}/mangopay`;
  mangoPay.cardRegistration.clientId = auth;

  // Initialize with card register data prepared on the server
  mangoPay.cardRegistration.init({
    cardRegistrationURL: props.registrationInfo.cardRegistrationURL,
    preregistrationData: props.registrationInfo.preregistrationData,
    accessKey: props.registrationInfo.accessKey,
    Id: props.registrationInfo.id,
  });

  // Card data collected from the current paymentForm
  var cardData = {
    cardNumber: String(paymentInfo.value.cardNumber),
    cardExpirationDate: String(paymentInfo.value.expirationDate),
    cardCvx: String(paymentInfo.value.cvc),
    cardType: props.registrationInfo.cardType,
  };

  mangoPay.cardRegistration.registerCard(
    cardData,
    function (response: any) {
      cardId.value = response.CardId;
    },
    function (response: any) {
      console.error(
        `Error occured while registering the card: "ResultCode: ${response}, ResultMessage: ${response}`
      );
    }
  );
}

async function validateProposition() {
  let response = await store.dispatch("TransportModule/validateProposition", {
    id: props.propositionId,
    payload: { card_id: cardId, browser_info: BrowserInfo }
  });
  
}
</script>
<style lang="scss" scoped>
.payment-form {
  &__metaData {
    @apply flex flex-col gap-x-2 items-center;
    @screen md {
      @apply flex-row -mt-[25px];
    }
    .field {
      &__expiration-date {
        @apply w-full mb-[25px];
        @screen md {
          @apply w-1/2;
        }
      }
      &__cvc {
        @apply w-full mt-[25px];
        @screen md {
          @apply w-1/2;
        }
      }
    }
  }

  &__price {
    @apply rounded py-6 px-[18px] font-semibold flex justify-between;
    background-color: var(--color-gray);
  }

  &__submit-btn {
    @apply flex mt-6 gap-x-4 justify-end;
  }
}
</style>
