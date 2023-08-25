<template>
    <div class="nextTrip">
        <span class="text-primary font-[600]">2 prochains trajet</span>
        <CardWrapper class="nextTrip__container">
            <Title
                type="h3"
                weight="600"
                label="Le mercredi 09 novembre 2022 - Camion 20 m3"
                class="nextTrip__title"
            />
            <div class="nextTrip__local">
                <div class="address">
                    <Icon icon-name="MarkerIcon" />
                    <span>Cannes, Alpes-Maritimes, France</span>
                </div>
                <div class="address">
                    <Icon icon-name="MarkerIcon" />
                    <span>Cannes, Alpes-Maritimes, France</span>
                </div>
            </div>
            <span class="nextTrip__date">04/10/2022 à 07h26</span>
        </CardWrapper>
        <CardWrapper class="nextTrip__container">
            <Title
                type="h3"
                weight="600"
                label="Le mercredi 09 novembre 2022 - Camion 20 m3"
                class="nextTrip__title"
            />
            <div class="nextTrip__local">
                <div class="address">
                    <Icon icon-name="MarkerIcon" />
                    <span>Cannes, Alpes-Maritimes, France</span>
                </div>
                <div class="address">
                    <Icon icon-name="MarkerIcon" />
                    <span>Cannes, Alpes-Maritimes, France</span>
                </div>
            </div>
            <span class="nextTrip__date">04/10/2022 à 07h26</span>
        </CardWrapper>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
</script>

<style lang="scss" scoped>
    .nextTrip {
        @apply flex flex-col gap-[18px];
        &__container {
            @apply flex flex-col gap-[14px];
        }
        &__title {
            @apply text-grayIcon text-[14px];
        }
        &__date {
            @apply text-[12px] text-strokeGray;
        }
        &__local {
            @apply relative flex flex-col gap-[14px] ml-[15px] pl-[15px];
            &::before {
                content: '';
                @apply absolute left-0 top-0 w-[1px] h-full bg-gray;
            }
            .address {
                @apply flex gap-[4px] text-grayIcon;
            }
        }
    }
</style>
