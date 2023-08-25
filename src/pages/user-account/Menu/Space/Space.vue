<template>
    <MainCard
        :dataBreadcrumbs="breadcrumbListsData"
        class="bank__section"
        :button="true"
        label-button="Enregistrer"
        :disable-submit-button="false"
        @on-click="postBankData"
    >
        <div class="bank__container">
            <div class="bank__content">
                <!-- <Paragraphe>
                    Les informations du compte bancaire doivent être au même nom
                    que votre compte Coc
                </Paragraphe> -->
            </div>
            <div class="bank__form">
                <Input
                    v-for="(field, key) in fields"
                    :key="key"
                    :input-type="field.type"
                    :label="field.label"
                    :placeholder="field.placeholder"
                    :name-input="field.name"
                    @input="handleInput"
                />
            </div>
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
import { message, notification } from 'ant-design-vue';
import Input from '@/components/Common/Input/Input.vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import Title from '@/components/Common/Title/Title.vue';
import MainCard from '@/components/Display/MainCard/MainCard.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import {useRouter} from 'vue-router';

const router = useRouter();

const store = useStore();

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '#',
    },
});

const fields  = ref<any>([
    {
        name : 'address',
        label : "Adresse",
        placeholder : "",
        type:"text",
        handler : ()=>{
            console.log('ffdddgfdgdfgdfgd')
        }
    },
    {
        name : 'additionalAddres',
        label : "Complément d'adresse",
        placeholder : "",
        type:"text"
    },
    {
        name : 'postalCode',
        label : "Code postal",
        placeholder : "00",
        type:"text"
    },
    {
        name : 'city',
        label : "Ville",
        placeholder : "",
        type:"text"
    },
    {
        name : 'accountOwner',
        label : "Titulaire du compte",
        placeholder : "",
        type:"text"
    },
    {
        name : 'iban',
        label : "IBAN",
        placeholder : "XX00 0000 0000 0000 0000 0000 000",
        type:"number"
    },
]); 

const payload: { [key: string]: any } = {
    "bankdetails[0]" : {}
};

const breadcrumbListsData = [
    {
        label: 'Coordonnées bancaires',
    },
];

function handleInput($event : any){
    payload["bankdetails[0]"] = {
        ...payload["bankdetails[0]"],
        ...$event
    }
    console.log('DBG value' , payload);
    
}

async function postBankData(){
    const success = await store.dispatch(
                'TransportModule/postIdentityDocuments',
                payload
            );
            if (success) {   
                notification.success({
                    message: `Vos donnés bancaire ont bien été enregistrer`,
                });
                payload["bankdetails[0]"]
                router.push("/")
            }
        
        
            
}
</script>
<style lang="scss" scoped>
.bank {
    &__container {
        @apply flex flex-col gap-y-[18px];
    }
    &__form {
        @apply flex flex-col gap-[18px];
        &:deep() {
            .custom-input__fields {
                @apply mb-0;
            }
            label {
                @apply font-[600] text-black;
            }
        }
    }
    &__field-wrap {
        @apply grid grid-cols-1 gap-[18px];
        @screen sm {
            @apply grid-cols-2;
        }
        @screen md {
            @apply grid-cols-1;
        }
        @screen lg {
            @apply grid-cols-2;
        }
    }
}
</style>
