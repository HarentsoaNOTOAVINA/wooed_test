<template>
    <div class="historical">
        <transition name="fade-opacity">
            <Loader v-if="isLoadCounterStatement" />
            <div v-else>
                <hr class="__hr" />
                <Title
                    type="h3"
                    label="Historique relevé"
                    class="historical__title"
                />
                <!-- <hr class="__hr" /> -->
                <div
                    v-if="counterStatementList.length"
                    class="historical__lists"
                >
                    <CardWrapper
                        v-for="(item, index) in counterStatementList"
                        :key="index"
                        class="historical__lists-item"
                    >
                        <figure class="historical__lists-figure">
                            <img :src="item.imageLink" alt="Image" />
                        </figure>
                        <ul class="historical__lists-content">
                            <li>
                                <span>
                                    Indexe :
                                    <strong>{{ item.indexCounter }}</strong>
                                </span>
                            </li>
                            <li>
                                <span>
                                    Date :
                                    <strong>{{
                                        formattedDate(item.today as string)
                                    }}</strong>
                                </span>
                            </li>
                            <li>
                                <span>
                                    Courante :
                                    <strong
                                        >{{
                                            item.currentConsumption
                                        }}
                                        m<sup>3</sup>/Kwh</strong
                                    >
                                </span>
                            </li>
                            <li>
                                <span>
                                    Annuelle :
                                    <strong
                                        >{{
                                            item.consumption
                                        }}
                                        m<sup>3</sup>/Kwh</strong
                                    >
                                </span>
                            </li>
                        </ul>
                    </CardWrapper>
                </div>
                <a-empty
                    description="Pas de relevé(s) enregisté(s)"
                    v-else
                ></a-empty>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { computed, ref, watch } from 'vue';
    import SupplierServices from '@/services/supplierService';
    import { Empty as AEmpty } from 'ant-design-vue';
    import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

    const route = useRoute();
    const store = useStore();

    const energyType = computed(() => store.getters['SupplierModule/getEnergyType'])

    interface CounterStatement {
        id?: number;
        indexCounter?: string;
        consumption?: number;
        today?: string;
        image?: string;
        imageLink?: string;
        currentConsumption?: string;
    }
    interface CounterDetails {
        id?: number;
        indexCounter?: number | string;
        consumption?: number;
        today?: string;
        image?: string;
        imageLink?: string;
        currentConsumption?: number;
    }

    const isLoadCounterStatement = ref<boolean>(false);
    const counterStatementList = ref<CounterStatement[]>([]);

    const props = defineProps<{
        thePropertyCounter?: number;
        currentCounterDetails: CounterDetails;
    }>();

    watch(
        () => props.thePropertyCounter,
        (v) => {
            if (v) {
                getCounterStatement();
            }
        },
        { immediate: true }
    );
    watch(
        () => props.currentCounterDetails,
        (v: any) => {
            counterStatementList.value.unshift(v);
            console.log(v);
        },
        { immediate: true }
    );

    async function getCounterStatement() {
        try {
            isLoadCounterStatement.value = true;
            const { data } = await SupplierServices.getCounterStatement({
                thePropertyCounter: props.thePropertyCounter,
                theProperty: route.params.id,
                energyType: energyType.value,
            });
            counterStatementList.value = data.reverse();
        } finally {
            isLoadCounterStatement.value = false;
        }
    }

    function formattedDate(rawDate: string) {
        return new Date(rawDate).toLocaleDateString();
    }
</script>

<style lang="scss" scoped>
    .historical {
        .fade-opacity-enter-active,
        .fade-opacity-leave-active {
            @apply transition-all;
        }

        .fade-opacity-enter-from,
        .fade-opacity-leave-to {
            @apply opacity-0 translate-x-[100px];
        }
        @apply flex flex-col gap-[18px] relative min-h-[300px];
        &__title {
            @apply text-primary text-[14px] font-[600] mb-[20px];
        }
        &__lists {
            @apply grid grid-cols-1 gap-[10px];
            @screen sm {
                @apply grid grid-cols-2;
            }
            @screen md {
                @apply grid grid-cols-1;
            }
            @screen lg {
                @apply grid grid-cols-2;
            }
            &-figure {
                max-height: 100px;
                @apply rounded-[4px] overflow-hidden flex h-full;
                img {
                    @apply object-cover w-full h-full;
                }
            }
            &-item {
                @apply grid grid-cols-2 gap-[18px] items-center;
            }
            &-content {
                @apply list-disc text-[12px] text-grayBlack flex flex-col justify-center pl-[12px];
                strong {
                    @apply text-black;
                }
            }
        }
    }
    .__hr {
        @apply text-gray my-[20px];
    }
</style>
