<template>
    <CardWrapper class="cardDesired">
        <!-- <Title type="h4" :label="content.title" class="cardDesired__title" />
        <hr class="__hr" /> -->
        <div class="cardDesired__content">
            <Select
                v-if="content.select"
                :name="'ActionDetail'"
                placeholder="Select"
                :options="content.select.options"
                @change-select="handleFieldChange"
            />
            <TextArea
                label="Commentaire"
                :autoSize="rows"
                placeholder="Ajouter votre commentaire..."
                :nameInput="'ActionComment'"
                @handleChange="handleFieldChange"
            />
            <Input
                :nameInput="'price'"
                label="Prix"
                placeholder="000"
                inputType="number"
                :min="0.00"
                :max="1000000000.00"
                step="0.01"
                unity="€"
                @input="handleFieldChange"
            />
            <div class="cardDesired__form-upload">
                <label>
                    <span class="font-[600]"> Documents </span>
                </label>
                <UploadImage
                    :name="'actionDocuments'"
                    :needBase64="false"
                    :type-image="true"
                    @upload-single-with-name="handleFieldChange"
                />
            </div>
        </div>
    </CardWrapper>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';

    interface payloadI{
        
    }

    const props = defineProps({
        content: {
            type: Object,
            default: {},
        },
    });


    const payload  = {

    }

    const rows = { minRows: 6, maxRows: 10 };
    const emit = defineEmits<{
        (e : "handleValue", payload : any)  : void;
    }>()

    function handleFieldChange($event : any){
        emit('handleValue', {
                                [props.content.select 
                                ?  props.content.select.name 
                                : props.content.name ] :  $event
                            });
    }
</script>

<style lang="scss" scoped>
    .cardDesired {
        @apply flex flex-col gap-[18px] p-[14px];
        &__title {
            @apply text-[14px] text-secondary font-[600] leading-[17px];
        }
        &__content {
            @apply flex flex-col gap-[14px];
            @screen md {
                @apply gap-[18px];
            }
            &:deep() {
                .custom-select__wrapper {
                    @apply mb-0;
                }
                label {
                    @apply text-[14px] text-black font-[600] leading-[17px];
                }
            }
        }
        &__form-upload {
            @apply flex flex-col gap-[10px];
            &:deep() {
                & > span {
                    @apply flex flex-col gap-[10px];
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
