<template>
    <div class="education__viewContainer">
        <!-- <Title :label="title" type="h4" class="education__title" /> -->
        <!-- <Hr /> -->
        <div class="education__btnContainer">
            <div
                class="education__btnContent"
                v-for="(item, index) in data"
                :key="index"
                @click="goTo(item.case)"
            >
                <div class="education__btnIconTxt">
                    <Cart />
                    <span class="education__btnTxt">{{ item.label }}</span>
                </div>
                <ArrowNext />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { educationBtn, educationBtnInside } from './educationData';
    import Title from '@/components/Common/Title/Title.vue';
    import Cart from '@/components/Icon/Cart.vue';
    import ArrowNext from '@/components/Icon/ArrowNext.vue';
    import Hr from './Hr.vue';
    import { onMounted, ref, watch } from 'vue';

    const title = ref<string>('Education');
    let data = ref(educationBtn);

    const props = defineProps({
        insideEducation: {
            type: Boolean,
            default: false,
        },
    });
    watch(
        () => props.insideEducation,
        (value) => {
            if (value) {
                data.value = educationBtnInside;
                console.log("data:",data.value)
            } else {
                data.value = educationBtn;
                console.log("data:",data.value)
            }
        }
    );

    const emit = defineEmits<{
        (event: 'goto', value: object): void;
    }>();

    const goTo = (item: any) => {
        emit('goto', item);
    };
</script>

<style lang="scss" scoped>
    .education {
        &__viewContainer {
            // @apply p-[18px];
        }

        &__title {
            color: #606060;
            @apply flex justify-end;
        }

        &__btnContainer {
            @apply flex flex-col gap-[16px];
        }

        &__btnContent {
            border: 1px solid;
            border-color: var(--color-gray);
            cursor: pointer;
            @apply flex justify-between py-[18px] px-[20px] rounded;
        }

        &__btnIconTxt {
            @apply flex gap-[10px];
        }
        &__btnTxt {
            font-size: 14px;
            color: #606060;
            font-weight: 600;
        }
    }
</style>
