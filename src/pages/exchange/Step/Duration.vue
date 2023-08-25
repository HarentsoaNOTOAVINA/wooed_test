<template>
    <div class="exchange-items exchange-duration">
        <div class="exchange-items__container">
            <div
                class="exchange-items__card"
                @click="isShowDurationDetails = true"
            >
                <div class="exchange-items__choice">
                    <div class="with-icon">
                        <Clock />
                    </div>
                    <span>Pour une durée limitée</span>
                    <template v-if="isShowDurationDetails">
                        <div class="exchange-items__details">
                            <InputDate
                                placeholder="Date de debut"
                                name="dateStart"
                                @handle-date-format="handleDate"
                                :min="true"
                            />
                            <InputDate
                                placeholder="Date de fin"
                                name="dateEnd"
                                @handle-date-format="handleDate"
                                :min="true"
                            />
                        </div>
                        <Button
                            :disabled="!isValidDate"
                            @click="$emit('on-select-duration', duration)"
                            type-button="secondary"
                            class="validation__btn"
                            >OK</Button
                        >
                    </template>
                </div>
            </div>
            <div
                class="exchange-items__card"
                @click="$emit('on-select-duration', { isDefinitive: true })"
            >
                <div class="exchange-items__choice with-icon">
                    <Lock />
                    <span>Définitivement</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Clock from '@/components/Icon/Clock.vue';
    import Lock from '@/components/Icon/Lock.vue';
    import { computed, ref } from 'vue';

    const isShowDurationDetails = ref<boolean>(false);
    const duration = ref<{
        isDefinitive: boolean;
        dateStart?: string;
        dateEnd?: string;
    }>();

    const isValidDate = computed(() => {
        const isDateStartValid =
            !!duration.value?.dateStart &&
            !duration.value?.dateStart?.includes('NaN');
        const isDateEndValid =
            !!duration.value?.dateEnd &&
            !duration.value?.dateEnd?.includes('NaN');
        return isDateStartValid && isDateEndValid;
    });

    function handleDate(date: any) {
        duration.value = {
            ...duration.value,
            isDefinitive: false,
            ...date,
        };
    }
</script>
<style lang="scss" scoped>
    .exchange-items {
        &__container {
            @apply flex gap-[20px] w-full flex-col p-[20px] md:justify-center justify-start items-center;
        }
        span {
            @apply text-primary;
        }
        &__card {
            @apply border border-primary rounded-[8px] md:w-1/2 w-full overflow-hidden;
            &:hover {
                @apply cursor-pointer bg-gray;
            }
        }
        &__details {
            @apply w-full flex gap-[10px] flex-col md:flex-row;
        }
        span {
            @apply uppercase text-[14px];
        }

        .validation__btn {
            @apply w-1/2 mt-[10px];
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
        .with-icon {
            &:deep() {
                svg {
                    @apply w-[40px] h-[40px];
                }
                path {
                    fill: var(--color-primary);
                }
            }
        }
    }
</style>
