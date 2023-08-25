<template>
    <div class="other__container">
        
        <div class="other__content">
            <div class="other__content-child">
                <!-- <div class="other__item-form">
                    <label for="adresse_2">
                        Adresse
                    </label>
                    <Input
                        :icon-field="true"
                        icon-name="MapMarkerLine"
                        id="address2"
                        name="adresse_2"
                    />
                </div> -->
                <div class="other__content-action">
                    <Button
                        type='primary'
                        :width="'100%'"
                        @click="handleSearchPerAddress"
                    >
                        Rechercher par adresse
                    </Button>
                    <Button
                        class="other-btn"
                        :width="'100%'"
                        type-button='gray'
                        @click="handleShowMap"
                    >
                        Tracer une zone d'intêret sur la carte
                    </Button>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import useAutoComplete from '@/composables/useAutoComplete';
    import { defineComponent, onBeforeMount, ref, watch ,onUnmounted, onMounted} from 'vue';
    
    const showMap = ref<boolean>(false);
    const {fullLocationResult} = useAutoComplete('address2', showMap ,true);
    const emit = defineEmits<{
        (e : 'handleShowMap', payload : string ) : void;
        (e : "changeAddress", payload : any ) :void;
        (e : "search", payload : any) : void;

    }>()

    function handleShowMap(){
        emit("handleShowMap", "interest");
    }
    function handleSearchPerAddress(){
        emit("handleShowMap", "interest-per-address");
    }
    function handleSearch(){
        emit('search', {operationType : 'lease,occupied'});
    }

    watch(
            () => fullLocationResult.value,
            (value) => {
                if(!!value){
                    emit("changeAddress", value);
                }
            },{ immediate: true, deep: true }
        );
    
</script>

<style  lang="scss" scoped>
.other{
    &__container{
        @apply flex flex-col p-5;
    }
    &__title {
        @apply w-full flex justify-between items-center gap-[14px];
        &-content {
            @apply text-primary text-[14px] font-[600];
            @screen md {
                @apply text-[18px];
            }
        }
        .find-proximity {
            @screen md {
                @apply hidden;
            }
        }
    }
    &__item {

        @apply flex flex-col justify-end w-[100%];
        &-form {
            @apply flex flex-col gap-[10px];
        }
        label {
            @apply font-[600] text-black;
        }
        &:deep() {
            .custom-input__fields,
            .custom-select__wrapper {
                @apply mb-0;
            }
            .custom-input__fields {
                .ant-input {
                    @apply pl-[34px] pr-[11px];
                }
                .unit {
                    @apply left-[11px] w-max;
                }
                .icon {
                    svg path {
                        @apply fill-grayIcon;
                    }
                }
            }
        }
    }
    &__content{
        display: flex;
        place-content : center;
        align-items: center;
        // min-height : 30vh; 
        label {
            @apply font-[600] text-black;
        }
        &-child{
            @apply flex flex-col ;
            @screen sm{
                @apply w-full;
            }
            @screen md{
                @apply w-[70%];
            }
        }
        &-action{
            @apply w-full flex flex-col justify-between gap-2 my-2;
            font-size: small;
            :deep(){
                .button__gray{
                    border-radius : 4px;
                }
            }

        }
    }
}
</style>