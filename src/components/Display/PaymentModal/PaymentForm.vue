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
      <span class="inline-block">{{ budgetValue }} €</span>
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

import { ref } from "vue";

interface IPayment {
  cardNumber?: string;
  expirationDate?: string;
  cvc?: string;
}

const props = defineProps({
  budgetValue: {
    type: String,
    default: "",
  },
  registrationInfo: {
    type: Object,
    default: {}
  }
});

const screen = window.screen;
const navigator = window.navigator;

const emit = defineEmits(['hide-form', 'handle-payment-data'])

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
const nonValidCard = ref<any>({ status: false, errorMsg: "numéro de carte non-valide" });
const nonValidCvc = ref<any>({ status: false, errorMsg: "cvc non valide" });

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
  const payload = {
    registrationInfo: props.registrationInfo,
    browserInfo: BrowserInfo,
    cardInfo: {
      cardNumber: String(paymentInfo.value.cardNumber),
      cardExpirationDate: String(paymentInfo.value.expirationDate),
      cardCvx: String(paymentInfo.value.cvc),
      cardType: props.registrationInfo.cardType,
    },
    
  }
  let validCardNumber = validateCreditCardNumber(paymentInfo.value.cardNumber);
  let validCvc = validateCVC(paymentInfo.value.cvc);
  nonValidCard.value.status = !validCardNumber;
  nonValidCvc.value.status = !validCvc;
  
  if (validCardNumber && validCvc) {
    emit('handle-payment-data', payload);
    resetPaymentInfo();
  } 
}

function cancelPayment() {
  resetPaymentInfo();
  emit('hide-form');
}

function resetPaymentInfo() {
  paymentInfo.value = {};
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
