<template>
    <RentOfferCard
        page-title="Faire une contre proposition"
        button-label="Envoyer ma proposition"
        :disable-submit-button="!formCompleted"
    >
        <div class="counter-proposal-form">
            <div class="counter-proposal-form__main-content">
                <div class="counter-proposal-form__content-header">
                    Bien à louer
                </div>

                <hr class="__hr" />
                <div class="counter-proposal-form__content-section">
                    <div v-for="(item, index) in inputList" :key="index">

                        <div v-if="item.inputKeyName === 'warranty'"
                            class="upload-field"
                        >
                            <P class="upload-field-label" type="bold">
                                <span class="required">*</span>
                                {{item.label}}
                            </P>
                            <component 
                                :is="item.component"
                                @upload="handleUpload"
                                
                            />
                        </div>
                        <component
                            v-else
                            :is="item.component" 
                            :item-label="item.label" 
                            :label="item.label" 
                            :unity="item.unity" 
                            :placeholder="item.placeHolder"
                            :name-input="item.inputKeyName" 
                            :name="item.inputKeyName" 
                            :required="item.required" 
                            @input="handleChange" 
                            @handle-switch="handleChange" 
                        />

                    </div>
                </div>

                <hr class="__hr" />
                <P class="note">
                    (<span class="required">*</span>) champ obligatoire
                </P>
            </div>
        </div>
    </RentOfferCard>
</template>
<script lang="ts" setup>
import RentOfferCard from '../RentOfferCard/RentOfferCard.vue';
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import { useStore } from 'vuex';
import { computed,ref, watch } from 'vue';
import { inputAttributes } from '@/pages/make-offer-location/components/Form/dataRentOffer';
import { useRoute } from 'vue-router';

const route = useRoute();

const inputList = ref<any>(inputAttributes);

const store = useStore();

const props = defineProps({
    propertyId: {
        type: [String, Number]
    }
});

const payload = ref<{
    prices: number,
    rentalDuration: number,
    isAgency: false,
    destination: string,
    theProperty: number,
    clientUrl: string,
    thePropertyDetailUrl: string,
    siteUrl: string,
    specialModality: string,
    isOnSpanSign: boolean,
    warranty : any[]
}>({
    prices: 0,
    rentalDuration: 0,
    isAgency: false,
    destination: 'lessor',
    theProperty: parseInt(route.params.id as never),  // 20 is thePropertyId for testing
    clientUrl: '/detail/',
    thePropertyDetailUrl: '/detail/',
    siteUrl: '/',
    specialModality: '',
    isOnSpanSign: true,
    warranty : []
});

let formCompleted = ref<boolean>(false);

watch(
    () => payload.value,
    (value) => {
        if(formCompleted.value){
            store.dispatch("RentalModule/setRentOfferData", { ...payload.value, ...value });
        }
        // checkRequiredValues();
    }
)

function handleChange(value: any) {
    payload.value = { ...payload.value, ...value };
    checkRequiredValues();
    // console.log('handle data', payload.value);

}

function handleUpload(event : any[]){
    payload.value = {...payload.value, ...{warranty : event}}
    checkRequiredValues();
    console.log('handle data', payload.value);
}

function checkRequiredValues() {
    formCompleted.value = (payload.value.prices !== 0 
    && payload.value.rentalDuration !== 0 )
    // && payload.value.warranty.length > 0) 
    ? true 
    : false;
}
</script>
<style lang="scss" scoped>
    .counter-proposal-form {
        &__content-header {
            @apply font-semibold;
        }

        &__btn-foot {
            @screen md {
                @apply flex justify-end my-4;
            }

            .btn-foot {
                @apply w-full;

                @screen sm {
                    @apply w-auto;
                }
            }

            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
    }

    .note {
        @apply my-2.5 text-xs;
    }

    .__hr {
        @apply my-2.5 text-gray;
    }

    .required {
        color: red;
    }
    .upload-field{
        @apply py-5;
        &-label {
            color: var(--color-gray-icon);
            @apply pb-2;
        }
    }
</style>
