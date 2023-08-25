<template>
    <div class="submit-rent-offer__container">
        <div class="submit-rent-offer__header">Louer le bien</div>

        <hr class="__hr" />

        <div class="submit-rent-offer__main-content">
            <div
                v-for="(item, index) in dataSideMenu"
                :key="index"
                class="submit-rent-offer__button-container"
            >
                <Button
                    :label="item.label"
                    :icon="item.icon"
                    @click="setActiveDisplayData(item)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Button from '../Button.vue';
    import router from '@/routes';
    import { useRoute } from 'vue-router';
    import { ref } from 'vue';

    import { useStore } from 'vuex';

    import { dataSideMenu } from '@/pages/make-offer-location/data';

    const route = useRoute();

    const store = useStore();

    async function setActiveDisplayData(item: any) {
        await store.dispatch('RentalModule/fetchEditableDocument');
        store.dispatch('RentalModule/setActiveDisplayData', item);
        switch (item.name) {
            case 'accept-offer':
                console.log('Accepting offer');
                router.push({
                    name: 'sign-directly',
                    params: { id: route.params.id },
                });
                break;

            default:
                console.log('Counter offer');
                router.push({
                    name: 'rent-procedure',
                    params: { id: route.params.id },
                });
                break;
        }
    }
</script>

<style lang="scss" scoped>
    .submit-rent-offer {
        &__container {
            @screen md {
                @apply px-[18px] rounded-lg;
                background-color: #fff;
                height: calc(100vh - 94px);
            }
        }

        &__header {
            @apply py-3 px-2.5 rounded-lg font-semibold mt-2.5;
            background-color: #fff;

            @screen md {
                @apply px-0 pt-4;
            }
        }

        &__main-content {
            @apply flex flex-wrap gap-x-[18px];
            @screen md {
                @apply flex-nowrap;
            }
        }

        &__button-container {
            @apply w-full;
            @screen md {
                @apply w-1/3;
            }
        }
    }

    .__hr {
        @apply text-gray my-[10px];
    }
</style>
