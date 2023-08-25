<template>
    <div class="services__list">
        <template v-if="incomingServicesList.length">
            <ServiceItem
                v-for="(service, index) in incomingServicesList"
                @click="
                    () => {
                        onShowMoreDetail(service);
                    }
                "
                :key="index"
                :service="service"
            />
        </template>
        <div v-else class="services__list--empty">
            <a-empty description="Pas de resultat pour ce service"></a-empty>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, watch } from 'vue';
    import ServiceItem from './ServicesItem/ServicesItem.vue';
    import { Empty as AEmpty } from 'ant-design-vue';

    const incomingServicesList = ref<Array<any>>([]);

    const props = defineProps({
        servicesList: {
            type: Array,
            default: [],
        },
    });

    const emit = defineEmits<{
        (e: 'on-show-more-detail', v: any): void;
    }>();

    watch(
        () => props.servicesList,
        (v) => {
            incomingServicesList.value = v;
            // console.log(v, 'INCOMING');
        },
        { immediate: true, deep: true }
    );

    function onShowMoreDetail(service: any) {
        emit('on-show-more-detail', service);
    }
</script>

<style lang="scss" scoped>
    .services__list {
        @apply flex flex-col gap-[20px];
    }
</style>
