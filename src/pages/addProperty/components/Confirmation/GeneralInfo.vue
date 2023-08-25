<template>
    <div class="confirmation-base">
        <div class="confirmation-base__item" v-if="props.data.propertyType">
            <Paragraphe class="confirmation-base__title"
                >Type de Bien</Paragraphe
            >
            <Paragraphe>{{
                getPropertyType(props.data.propertyType, propertyType)
            }}</Paragraphe>
        </div>
        <!-- <hr class="confirmation-base__divider"> -->
        <div class="confirmation-base__item" v-if="props.data.title">
            <Paragraphe class="confirmation-base__title"
                >Titre de l'annonce</Paragraphe
            >
            <Paragraphe>{{ props.data.title }}</Paragraphe>
        </div>
        <!-- <hr class="confirmation-base__divider"> -->
        <div class="confirmation-base__item" v-if="props.data.details">
            <Paragraphe class="confirmation-base__title"
                >Description</Paragraphe
            >
            <Paragraphe>{{ props.data.details }}</Paragraphe>
        </div>
        <!-- <hr class="confirmation-base__divider"> -->

        <div class="confirmation-base__item" v-if="props.data.transactionType">
            <Paragraphe class="confirmation-base__title"
                >Type de transaction</Paragraphe
            >
            <Paragraphe>{{ props.data.transactionType }}</Paragraphe>
        </div>
        <!-- <hr class="confirmation-base__divider"> -->

        <div class="confirmation-base__item" v-if="props.data.disponibility">
            <Paragraphe class="confirmation-base__title"
                >Disponibilité</Paragraphe
            >
            <Paragraphe>{{
                props.data.disponibility === 'A partir de' ||
                props.data.disponibility === disponibilityValue.apartir
                    ? formatDateFr(props.data.disponibilityTime)
                    : props.data.disponibility
            }}</Paragraphe>
        </div>
        <!-- <hr class="confirmation-base__divider"> -->

        <div class="confirmation-base__item-file" v-if="props.data.leaseCopy">
            <Paragraphe>Fichier de bail</Paragraphe>
            <a
                :href="createUrlFile(props.data.leaseCopy)"
                target="_blank"
                rel="noopener noreferrer"
                class="confirmation-base__file"
            >
                <Icon icon-name="FileRed" />
                <span>Fichier Pdf</span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { formatDateFr } from '@/utils/date/format';
    import { computed, onMounted } from 'vue';
    import { useStore } from 'vuex';
    import Icon from '@/components/Common/Icon/Icon.vue';

    const props = defineProps({
        data: {
            type: Object,
            default: () => {},
        },
    });

    enum disponibilityValue {
        apartir = 'Le bien est actuellement occupé mais il sera rendu libre le',
    }
    const store = useStore();
    const propertyType = computed(
        () => store.getters['AddProductModule/getPropertyType']
    );

    function getPropertyType(idPorperty: number, data: Array<any>): string {
        return data.find((elem) => elem.id === idPorperty)['name'];
    }

    function createUrlFile(data: any) {
        return URL.createObjectURL(data);
    }
</script>

<style lang="scss" scoped>
    .confirmation-base {
        padding: 15px;
        background-color: var(--color-gray);
        border-radius: 8px;
        @apply flex flex-col gap-[24px];
        &__item {
            @apply relative flex justify-between;
            &::after {
                content: '';
                @apply absolute bottom-[-14px] w-full h-[1px] bg-white;
            }
            &:last-child {
                &::after {
                    @apply hidden;
                }
            }
            &:deep() {
                .confirmation-base__title {
                    @apply font-[600];
                }
            }
        }

        &__divider {
            @apply text-white;
        }

        &__file {
            @apply flex gap-[10px] ml-[10px] text-[12px] italic mt-[5px];
        }
    }
</style>
