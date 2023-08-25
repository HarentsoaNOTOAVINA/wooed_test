<script setup lang="ts">
    import { ref } from 'vue';
    import VPerfectSignature from 'v-perfect-signature';
    import IconCheck from '@/components/Icon/CheckIcon.vue';
    import IconCancel from '@/components/Icon/CancelIcon.vue';
    import { message } from 'ant-design-vue';
    import Button from '@/components/Common/Button/Button.vue';

    const props = defineProps({
        hasTitle: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: 'Votre signature',
        },
        sizePen: {
            type: Number,
            default: 2.5,
        },
        width: {
            type: String,
            default: '157px',
        },
        height: {
            type: String,
            default: '132px',
        },
        showBtnAction: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits<{
        (event: 'signature', value: string): void;
        (event: 'supp', value: string): void;
    }>();

    const signaturePad = ref();

    const strokeOptions = {
        size: props.sizePen,
        thinning: 0.75,
        smoothing: 0.5,
        streamline: 0.5,
    };

    let imageSignature = ref('null');

    const save = () => {
        if (!signaturePad.value.isEmpty()) {
            const dataURL = signaturePad.value.toDataURL();
            imageSignature.value = dataURL;
            message.success('Signature enregistrer');

            emit('signature', imageSignature.value);

            console.log(imageSignature.value);
        } else {
            message.warning('Veuillez remplir la signature');
        }
    };

    const undo = () => {
        signaturePad.value.clear();
        imageSignature.value = '';
        emit('supp', imageSignature.value);
    };
</script>

<template>
    <div class="signature">
        <h4 class="signature__title" v-if="hasTitle">{{ props.title }}</h4>
        <div class="signature__component">
            <div class="signature__component-draw">
                <VPerfectSignature
                    :stroke-options="strokeOptions"
                    ref="signaturePad"
                />
            </div>
            <div class="signature__button" v-if="!showBtnAction">
                <div class="btn-save" @click="save">
                    <IconCheck />
                </div>
                <div class="btn-cancel" @click="undo">
                    <IconCancel />
                </div>
            </div>
        </div>
        <div class="signature__action-button" v-if="showBtnAction">
            <Button type-button="border" @on-click="save"
                >Valider la signature</Button
            >
            <Button type-button="border" @on-click="undo"
                >Annuler la signature</Button
            >
        </div>
        <!-- <div class="signature__img"
    v-if="imageSignature != ''"
    >
    <p>Votre signature: </p>
      <img :src="`${imageSignature}`"
      alt="img signature"
      >
    </div> -->
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .signature {
        &__title {
            font-family: 'Montserrat';
            font-style: normal;
            font-weight: 300;
            font-size: 12px;
            line-height: 18px;
            color: #949fb5;
        }
        &__component {
            @apply flex flex-row justify-start;
        }

        &__component-draw {
            width: v-bind(width);
            height: v-bind(height);

            @apply bg-[#FFFFFF] rounded;
            border: 1px solid var(--color-gray-label);
            // box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);

            @screen md {
                @apply w-64 h-32;
            }
        }

        &__button {
            @apply ml-1 flex flex-col justify-start;
        }

        &__img {
            @apply w-36 h-32 mt-14;
        }

        &__action-button {
            @apply flex gap-[5px] my-3;
        }
    }

    .btn-save,
    .btn-cancel {
        @apply w-[25px] h-[25px] bg-[#FFFFFF] flex items-center justify-center rounded-full cursor-pointer;
    }
    .btn-cancel {
        margin-top: 10px;
    }
</style>
