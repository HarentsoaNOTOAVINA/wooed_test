<template>
    <div class="container-head">
        <div class="container-head__left">
            <avatar  
                :src="!!props.img? props.img : 'https://joeschmoe.io/api/v1/random'"
                :size="40" 
            />
            
            <div class="container-head__left--profile">
                <Title
                    type="h4"
                    data-test="title"
                    :label="Text"
                    weight="bold"
                />
                <!-- <Paragraphe data-test="para">
                    {{ Text }}
                </Paragraphe> -->
            </div>
        </div>
        <div class="container-head__right" v-if="userLoggedIn && showHeart">
            <Heart
                :isShowSvg="isShowSvg"
                @show-svg="showSvg"
                @on-set-favorite="setFavorite"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import avatar from 'ant-design-vue/lib/avatar';
    import Heart from '@/components/Icon/Heart.vue';
    import { computed, onMounted, ref } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    let showHeart = ref(true);
    const emit = defineEmits<{ (e: 'on-set-favorite'): void }>();
    const setFavorite = () => {
        emit('on-set-favorite');
    };
    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        isMyFavorite: {
            type: Boolean,
            default: false,
        },
        Text: {
            type: String,
            default: '',
        },
        img: {
            type: String,
            default: '',
        }
    });
    const isShowSvg = ref<boolean>(props.isMyFavorite);
    const showSvg = (value: boolean) => {
        isShowSvg.value = !value;
    };
    const userLoggedIn = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    onMounted(() => {
        if (userLoggedIn.value) {
            if (userLoggedIn.value.roles.includes('ROLE_NOT')) {
                showHeart.value = false;
            } else {
                showHeart.value = true;
            }
        }
    });
</script>

<style lang="scss" scoped>
    .container-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &__left {
            display: flex;
            gap: 25px;
            align-items: center;
            &:deep() {
                .ant-avatar {
                    cursor: pointer;
                }
            }
            &--profile {
                display: flex;
                flex-direction: column;
                gap: 4px;
                label {
                    font-family: 'Montserrat';
                    font-style: normal;
                    font-weight: 300;
                    font-size: 14px;
                    line-height: 17px;
                    color: #8f8f8f;
                }
            }
        }
        &__right {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 10px;
            gap: 10px;
            width: 38px;
            height: 38px;
            background: var(--color-gray);
            border-radius: 100px;
        }
    }
</style>
