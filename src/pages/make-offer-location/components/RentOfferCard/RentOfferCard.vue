<template>
    <div class="counter-proposal__section">
        <Card class="counter-proposal__container">
            <div class="counter-proposal__head-items">
                <Title class="counter-proposal__title" :label="pageTitle" type="h3" weight="600" />
            </div>
            <hr class="__hr" />
            <div class="counter-proposal__items-wrap">
                <slot />
            </div>
            <div v-if="buttonLabel !== ''" class="counter-proposal__btn-foot">
                <Button type-button="secondary" class="btn-foot" @click="submitForm" :disabled="isSubmitBtnDisabled">
                    {{ buttonLabel }}
                </Button>
            </div>
        </Card>
    </div>
</template>
<script lang="ts" setup>
import Button from '@/components/Common/Button/Button.vue';
import Title from '@/components/Common/Title/Title.vue';
import Card from '@/components/Display/Card/Card.vue';
import { notification } from 'ant-design-vue';
import {onMounted,ref, watch} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {useSlug} from '@/composables/user/useUsernameSlug';


const router = useRouter();
const store = useStore()
const slug = useSlug();

const props = defineProps({
    buttonLabel: {
        type: String,
        default: ''
    },
    pageTitle: {
        type: String,
        required: true
    },
    disableSubmitButton: {
        type: Boolean,
        default: true
    }
})



const isSubmitBtnDisabled = ref<boolean>(true);
async function submitForm() {
    let { response, status } = await store.dispatch('RentalModule/submitCounterPropositionForm');
    let successStatus = [200, 201]

    if (successStatus.includes(status)) {
        notification['success']({
            message: "Votre offre bien été envyoé avec succés"
        })
        router.push({
            path : slug.value,
            query: {
                to: JSON.stringify({ name: 'Mes offres envoyées' }),
            },
        });
    } else {
        notification['error']({
            message: response.message,
        })
    }
}

watch(()=> props.disableSubmitButton,
    (val)=>{
        console.log("DBG submit btn disabled ", val)
        isSubmitBtnDisabled.value = val;
    }
)
</script>
<style lang="scss" scoped>
.counter-proposal {
    background-color: #fff;

    &__section {
        // @apply pb-[18px];

        @screen md {
            height: calc(100vh - 94px);
            @apply flex-1;
        }
    }

    &__container {
        @apply h-full;
        background-color: #fff;
    }

    &__head-items {
        @apply hidden mt-0 mb-[18px];

        @screen md {
            @apply inline-block;
        }
    }

    &__items-wrap {
        @apply px-[14px] -mx-[14px];

        @screen md {
            height: calc(100vh - 240px);
            @apply overflow-y-auto;
            // @include scrollbar;
        }
    }

    &__title {
        @apply text-[14px] text-grayIcon;

        @screen md {
            @apply text-[16px];
        }
    }

    &__button {
        @apply mb-[18px];
    }

    &__btn-foot {
        @apply flex justify-end;

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

.__hr {
    @apply hidden;

    @screen md {
        @apply block mb-4 text-gray;
    }
}
</style>
