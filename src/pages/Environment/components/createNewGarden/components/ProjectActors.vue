<template>
    <div class="projectActors">
        <div
            v-for="(item, index) in formData"
            :key="index"
            class="projectActors__items"
        >
                <Title
                type="h4"
                label="Acteur"
                class="projectActors__subtitle"
                />
            <hr class="__hr" />
            <div class="projectActors__form">
                <div class="projectActors__form-item">
                    <Input
                        label="Nom"
                        :name-input="'name'"
                        @input="handleFields(item,$event)"
                        
                    />
                    <Input
                        label="Téléphone"
                        :name-input="'telephone'"
                        :has-error="item.validPhone ? unvalidClass : undefined"
                        @input="handleFields(item,$event)"
                    />
                </div>
                <div class="projectActors__form-item">
                    <Input
                        label="Email"
                        :name-input="'email'"
                        :has-error="item.validEmail ? unvalidClass : undefined"
                        @input="handleFields(item,$event)"
                    />
                    <Select
                        :name="'function'"
                        placeholder="Sélectionner ..."
                        label="Fonction"
                        :options="options"
                        @change-select="handleActorFunction(index,$event)"
                    />
                </div>
            </div>
            <div>
                <div class="action__button">
                    
                    <Button 
                    :disabled="!item.valid"
                    @click="postActorsData(index)"> Valider </Button>
                </div>
            </div>
        </div>
        <div>
            <div class="action__button">
                <Button     
                    class="action__button-cancel"
                    @click="addMoreActors"
                >
                    Ajouter un nouvel acteur 
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Add from '@/components/Icon/AddFile.vue';
    import validatePhone  from '@/utils/validation/phone_number_validation';
    import emailValidation  from '@/utils/validation/email_validation';
    import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { notification } from 'ant-design-vue';
    const store = useStore()

    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
    });
    
    interface actorI {
        name: string;
        telephone ?: string;
        email ?: string;
        function : string;
        valid ?: boolean;
        validEmail ?: boolean;
        validPhone ?: boolean;
    }
    const actorEntity : actorI = {
        name : "",
        telephone : "",
        email : "",
        function : "",
        valid : false,
        validEmail : true,
        validPhone : true
    }
    const formData = ref<actorI[]>([JSON.parse(JSON.stringify(actorEntity))]);
    const isValidActorData = ref<boolean>();

    interface Option {
        value: string;
        label: string;
    }
    const collectiveGarden = computed(()=> store.getters["CollectiveGardenModule/getCollectiveGardenData"])
    
    const unvalidClass = {
        status : true,
        errorMsg : "veuillez entrer une valeur valide" 
    }
    const isPhoneUnvalid = ref<boolean>(false)
    const isEmailUnvalid = ref<boolean>(false)
    const options = ref<Option[]>([
        {
            value: 'Initiateurs',
            label: 'initiateurs',
        },
        {
            value: 'Porteurs',
            label: 'porteurs',
        },
        {
            value: 'Animateurs',
            label: 'animateurs',
        },
        {
            value: 'Participants',
            label: 'participants',
        },
    ]);

    function addMoreActors(){
        const actor = JSON.stringify(actorEntity);
        formData.value.push(JSON.parse(actor));
    }
    function actorDatavalidation(item  : actorI){
        if( (!!item.function  && !!item.email && !!item.name )  || !!item.telephone){
            item.valid = true;
        }else{
            item.valid = false;
        }
    }
    function handleActorFunction(index : number ,$event  : any){
        formData.value[index] = {...formData.value[index], ...$event}
        // actorDatavalidation(formData.value[index]);
    }
    
    function handleFields(item : actorI,$event : any){
        const key : string = Object.keys($event)[0];
        switch (key) {
            case 'email':
                if(emailValidation($event[key])){
                    item[key] = $event[key];

                    item.validEmail = false;

                }else{
                    item.validEmail = true;
                }
                break;
            case 'telephone':
                if(validatePhone($event[key])){
                    item[key] = $event[key];
                    item.validPhone = false;

                }else{
                    item.validPhone = true;
                }
                break;
            default:
                item[key as keyof actorI] = ($event[key] as never);
                break;
        }
        // actorDatavalidation(item);
    
    }
    watch(()=> formData.value,
       (v)=>{
            v.forEach(actor=>{
                actorDatavalidation(actor);
            })
       },{immediate : true, deep : true}
    )
    function callback(){
        notification.success({message : "Les acteurs ont bien été enregistrer"})        
    }
    function postActorsData(idx : number){
        delete formData.value[idx].valid;
        const payload = {
            data : {...formData.value[idx], colectiveGarden : collectiveGarden.value.id},
            callback
        }
        store.dispatch("CollectiveGardenModule/postCollectiveGardenActors",payload)    
    }
</script>

<style lang="scss" scoped>
    .projectActors {
        @apply flex flex-col gap-[24px];
        &__title {
            @apply text-[14px] text-primary font-[600];
        }
        &__subtitle {
            @apply text-[14px] text-grayIcon font-[600];
        }
        &__map--item {
            max-height: 179px;
            @apply h-[179px] w-full mb-[10px];
            @screen sm {
                max-height: 300px;
                @apply h-[300px];
            }
            @screen md {
                max-height: calc(100vh - 275px);
                @apply h-[325px];
            }
        }
        &__checkbox {
            @apply flex flex-col gap-[10px];
        }
        &__items {
            @apply flex flex-col gap-[18px];
            &-title{
              @apply flex flex-row justify-between;  
            }
        }
        &__form {
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
            &-item {
                @apply grid grid-cols-1 gap-[14px];
                @screen lg {
                    @apply grid-cols-2;
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
    .action{
        &__button {
            @apply flex justify-end items-center gap-[14px];
            &-cancel {
                &:deep() {
                    button {
                        @apply text-primary bg-gray;
                    }
                }
            }
        }
    }
</style>
