<template>
    <Card class="cardPlot">
        <div class="cardPlot__item">
            <label>Types d'actions</label>
            <span class="cardPlot__item-content">{{ data.actionType }}</span>
        </div>
        <div class="cardPlot__item">
            <label>Initiée par</label>
            <span class="cardPlot__item-content">{{ data.initiator }}</span>
        </div>
        <div class="cardPlot__item-wrap">
            <div class="cardPlot__item">
                <label>Delais</label>
                <div class="cardPlot__item-content">
                    <span class="text-grayBlack text-[14px]">
                        {{ data.dateLimit.endDate }}
                    </span>
                    <Icon icon-name="Calendre" />
                </div>
            </div>
            <div class="cardPlot__item">
                <label>Et le</label>
                <div class="cardPlot__item-content">
                    <span class="text-grayBlack text-[14px]">
                        {{ data.dateLimit.endDate }}
                    </span>
                    <Icon icon-name="Calendre" />
                </div>
            </div>
        </div>
        <div class="cardPlot__item">
            <label>Document</label>
            <Files :simple-file="true" :fileList="data.dataFiles" />
        </div>
        <CheckBox
            :isChecked="true"
            label="Je participe à l’action envisagée"
            class="cardPlot__checkbox"
            :name="'checkbox_' + data.name"
        />
        <div class="cardPlot__item">
            <label>Je souhaite exprimer la suggestion suivante</label>
            <span class="cardPlot__item-content font">
                {{ data.suggestion }}
            </span>
        </div>
        <div class="cardPlot__foot">
            <button>Approuver</button>
            <span>|</span>
            <button>Répondre</button>
        </div>
    </Card>
</template>

<script lang="ts" setup>
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import Files from '@/components/Display/FIles/Files.vue';
    import { ref } from 'vue';

    interface DataFiles {
        name: string;
        url: string;
        thumbUrl: string;
    }

    const props = defineProps({
        data: {
            type: Object,
            default: {},
        },
    });

    const dataFiles = ref<DataFiles[]>([
        {
            name: 'Fichier.pdf',
            url: 'https://www.africau.edu/images/default/sample.pdf',
            thumbUrl: 'https://www.africau.edu/images/default/sample.pdf',
        },
    ]);
</script>

<style lang="scss" scoped>
    .cardPlot {
        @apply flex flex-col gap-[14px];
        @screen md {
            @apply gap-[18px];
        }
        &__item {
            @apply flex flex-col gap-[10px];
            label {
                @apply font-[600] text-black;
            }
            &-content {
                @apply flex justify-between items-center gap-[14px] w-full px-[14px] py-[10px] rounded-[4px] bg-gray text-[12px] text-grayIcon;
            }
            &-wrap {
                @apply grid grid-cols-1 gap-[14px];
                @screen lg {
                    @apply grid-cols-2;
                }
            }
            .font {
                @apply text-[14px] font-[600] text-black;
            }
        }
        &__checkbox {
            &:deep() {
                label {
                    @apply font-[300] text-black;
                }
            }
        }
        &__foot {
            @apply flex gap-[6px] font-[600] text-primary;
            button {
                &:hover {
                    @apply text-grayIcon;
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
