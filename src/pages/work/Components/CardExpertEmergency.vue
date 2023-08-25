<template>
    <div class="cardExpertEmergency__container">
        <div
            v-if="dataExpertEmergency.length > 0"
            class="cardExpertEmergency__card"
            v-for="(expert, index) in dataExpertEmergency"
            :key="index"
        >
            <!--      style="width: 275px; height: 235px"-->
            <a-card size="small" :title="expert.name" class="card-content">
                <Paragraphe class="card-inline"
                    ><User /> &nbsp;{{
                        expert.firstname ? expert.firstname : 'Aucun'
                    }}</Paragraphe
                >
                <Paragraphe class="card-inline"
                    ><MessageBox size="xs" />{{
                        expert.email ? expert.email : 'Aucun'
                    }}</Paragraphe
                >
                <Paragraphe class="card-inline"
                    ><CallICon /> &nbsp;{{
                        expert.telephone ? expert.telephone : 'Aucun'
                    }}</Paragraphe
                >
                <Paragraphe class="card-inline"
                    ><UrlIcon />
                    {{ expert.address ? expert.address : 'Aucun' }}</Paragraphe
                >

                <div class="cardExpertEmergency__btn">
                    <Button
                        ><a :href="`tel:+${expert.telephone}`"
                            >Appeler</a
                        ></Button
                    >
                    <Button class="mail" @on-click="sendMail(expert)"
                        ><LoadingButton
                            size="xs"
                            theme="dark"
                            v-if="loadingBtn && expert.id === idExpert"
                        />
                        &nbsp;{{
                            mailSent && expert.id === idExpert
                                ? 'Contacté'
                                : 'Email'
                        }}</Button
                    >
                </div>
            </a-card>
        </div>
        <div class="noExpert" v-if="dataExpertEmergency.length == 0">
            <a-empty description="Aucune expert trouvée" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import MessageBox from '@/components/Icon/MessageBox.vue';
    import User from '@/components/Icon/User.vue';
    import UrlIcon from '@/components/Icon/UrlIcon.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import CallICon from '@/components/Icon/CallIcon.vue';
    import { Card as ACard, Empty as AEmpty } from 'ant-design-vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';

    const props = defineProps({
        dataExpertEmergency: {
            type: Array<any>,
            default: [],
        },
        loadingBtn: {
            type: Boolean,
            default: false,
        },
        idExpert: {
            type: Number,
        },
        mailSent: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'sendMail', v: object): void;
    }>();

    function sendMail(Expert: object) {
        emit('sendMail', Expert);
    }
</script>

<style scoped lang="scss">
    .cardExpertEmergency {
        &__container {
            @apply flex flex-wrap gap-[15px];
        }
        &__card {
            width: max-content;
        }
        &__btn {
            @apply flex gap-[15px];

            &:deep() {
                button {
                    @apply min-w-[115px] p-[8px];
                }
            }
        }
    }
    .card-content {
        @apply w-[275px] h-full flex flex-col justify-between;
    }
    .card-inline {
        @apply flex items-center justify-start mb-[7px] gap-[8px];
    }
    .mail {
        &:deep() {
            button {
                @apply bg-[var(--color-gray)] text-[#000] p-[8px];
            }
        }
    }
    a:hover {
        @apply text-[#fff];
    }
</style>
