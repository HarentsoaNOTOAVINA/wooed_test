<template>
    <div v-for="(itemBrux, indexBrux) in brux" class="listMobile">
        <div>
            <div>
                <h1>{{ itemBrux.street }} {{ itemBrux.number }}</h1>
                <Hr />
            </div>
            <div class="listMobile__content">
                <div
                    v-for="(itemHead, indexHead) in bruxHead"
                    class="listMobile__contentRaw"
                >
                    <span class="listMobile__left">{{ itemHead.text }} :</span>
                    <div class="listMobile__right">
                        <span
                            class="listMobile__id"
                            v-if="itemHead.text === 'Identifiant'"
                            >{{ itemBrux.identifier }}</span
                        >
                        <span v-if="itemHead.text === 'Réference communale'">{{
                            itemBrux.municipalReference
                        }}</span>
                        <span v-if="itemHead.text === 'Adresse'"
                            >{{ itemBrux.street }} {{ itemBrux.number }}</span
                        >
                        <span v-if="itemHead.text === 'Commune'">{{
                            itemBrux.municipality
                        }}</span>
                        <span v-if="itemHead.text === 'Objet de la demande'">{{
                            itemBrux.objectOFRequest
                        }}</span>
                        <span
                            v-if="
                                itemHead.text === 'Date de début de l\'enquete'
                            "
                            >{{ itemBrux.inquiryStartDate }}</span
                        >
                        <span
                            v-if="itemHead.text === 'Date de fin de l\'enquete'"
                            >{{ itemBrux.inquiryEndDate }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { bruxHead } from './dataInquiryList';
    import Hr from '@/components/Common/Hr/Hr.vue';
    const props = defineProps(['brux', 'anver']);
</script>

<style lang="scss" scoped>
    .listMobile {
        @apply w-full rounded-lg p-[18px] my-[10px];
        border: 1px solid;
        border-color: var(--color-gray);

        &__contentRaw {
            @apply flex justify-between gap-[18px];
        }

        &__left {
            color: var(--color-primary);
        }

        &__right {
            @apply my-[2px] text-justify;
        }

        &__id {
            color: #67cd84;
        }
    }
</style>
