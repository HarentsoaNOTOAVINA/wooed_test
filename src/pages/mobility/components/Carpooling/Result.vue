<script lang="ts" setup>
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { onMounted, computed, ref } from 'vue';
    import { useStore } from 'vuex';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { useRouter } from 'vue-router';

    enum Type {
        SEARCH = 'search',
        ALL = 'all',
    }

    const props = defineProps({
        title: {
            type: String,
            default: 'Résultat',
        },
        type: {
            type: String,
            default: 'all',
        },
    });


    onMounted(() => {
        getListCarpooling();
    });

    const emit = defineEmits(['back']);
    const store = useStore();
    const carpoolingList = ref<any>(null);
    const router = useRouter();

    function handleBack() {
        emit('back');
    }

    async function getListCarpooling() {
        const data = await store.dispatch('MobilityModule/carpoolingService');
        console.log('##############\n', data);
        carpoolingList.value = data;
    }
    function handleContact() {
     router.push("/messages");
    }
</script>

<template>
    <div class="result" v-if="carpoolingList">
        <div class="result__head">
            <ArrowBack class="result__arrow-back" @click="handleBack" />
            <P>{{ title }}</P>
        </div>
        <hr class="result__divider" />
        <div>
            <div class="result__item" v-for="(t, index) in carpoolingList" :key="index">
                <P type="bold">
                    <Icon iconName="Agent" />
                    {{ t.advertiser.name }} 
                    {{ t.advertiser.firstname }}
                </P>
                <div class="result__detail">
                    <P>
                        <Icon iconName="MarkerIcon" />
                        {{ t.advertiser.address }}
                    </P>
                    <P>
                        <Icon iconName="Mail" />
                        {{ t.advertiser.email }}
                    </P>
                    <P>
                        <Icon iconName="Phone" />
                        {{ t.advertiser.address }}
                    </P>
                </div>
                <Button class="result__btn" @click="handleContact">
                    <Icon iconName="Phone" />
                    Contacter
                </Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .result {
        @apply bg-white rounded-[8px] p-[20px] w-full;

        &__arrow-back {
            @apply hover:bg-slate-200 cursor-pointer rounded-[50%] p-[10px] h-[30px] w-[30px];
        }

        &__divider {
            @apply text-slate-300 mb-[15px];
        }
        &__head {
            @apply flex gap-[10px] items-center;
        }
        &__item {
            position: relative;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            p {
                @apply flex gap-[10px] items-center;
            }
        }
        &__detail {
            margin-top: 10px;
            p {
                font-size: 12px;
                @apply mb-[5px];
            }
        }
        &__btn {
            position: absolute;
            top: 15px;
            right: 15px;
            &:deep() {
                .button__primary {
                    @apply flex items-center gap-[10px] px-[10px];
                }
                svg {
                    path {
                        fill: #efecec;
                        fill-opacity: 1;
                    }
                }
            }
        }
    }
</style>
