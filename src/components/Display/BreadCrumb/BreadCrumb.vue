<template>
    <div class="bread">
        <a-breadcrumb separator="|">
            <a-breadcrumb-item
                class="menuItem-active-link"
                v-for="(item, index) in items"
                :key="index"
                @click="handleBackClick(index)"
            >
                <router-link v-if="item.url || item.url === ''" :to="`${item.url}`">
                    <span class="bread__label">{{ item.label }}</span>
                </router-link>
                <span class="bread__label" v-else>{{ item.label }}</span>
                <!-- <a-breadcrumb-separator>/</a-breadcrumb-separator>  -->
            </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
</template>
<!-- flex justify-start items-center px-2.5 py-2 mx-2 bg- rounded-lg h-8 -->
<script lang="ts" setup>
    import {
        Breadcrumb as ABreadcrumb,
        BreadcrumbItem as ABreadcrumbItem,
    } from 'ant-design-vue';

    // import Breadcrumb from "ant-design-vue";
    // import ABreadcrumb from "ant-design-vue/lib/breadcrumb"
    // import a-breadcrumb,a-breadcrumb-item,a-breadcrumb-separator} from "ant-design-vue"
    import { ref, reactive, PropType, getCurrentInstance } from 'vue';
    import broadcast from '@/utils/broadcast';

    const props = defineProps({
        items: {
            type: Array as PropType<any>,
            required: true,
        },
    });
    // active not OP
    const state = reactive({
        isActive: true,
    });
    const emit = defineEmits<{
        (event: 'handleReturn', value: any): void;
    }>();

    function handleBackClick(value: any) {
        emit('handleReturn', value);
    }
</script>

<style lang="scss" scoped>
    .bread {
        background-color: #ffffff;
        @apply flex justify-start items-center px-2.5 py-[14px] rounded-lg;
        @media (min-width: 1024px) {
            background-color: white;
            border-radius: 8px;
            /* margin: 10px 15px 18px 15px; */
            padding: 14px;
        }
        .ant-breadcrumb-separator {
            margin: 0;
        }
        &__label {
            @apply mr-2;
        }
        &:deep() {
            .ant-breadcrumb-link a {
                &:hover {
                    color: rgba(0, 0, 0, 0.45);
                }
            }
            .ant-breadcrumb > span:last-child {
                font-weight: 700;
            }
        }
    }
    .active {
        color: green;
    }
</style>
