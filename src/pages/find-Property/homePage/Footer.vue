<template>
    <footer class="footer">
        <nav class="footer__container">
            <div class="footer__items">
                <div class="footer__items-title">
                    <span class="flex gap-[8px]">
                        <Icon icon-name="CircleC" />
                        <span>Wooed 2023</span>
                    </span>
                </div>
                <ul class="footer__items-list">
                    <li
                        v-for="(item, index) in useData"
                        :key="index"
                        class="footer__items-wrap"
                    >
                        <router-link
                            :to="item.url"
                            class="footer__items-content"
                        >
                            <span class="bread__label">{{ item.label }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="footer__items">
                <div class="footer__items-title">
                    <Title type="h3" label="Lorem ipsum" />
                </div>
                <ul class="footer__items-list">
                    <li
                        v-for="(item, index) in fakeData"
                        :key="index"
                        class="footer__items-wrap"
                    >
                        <router-link
                            :to="item.url"
                            class="footer__items-content"
                        >
                            <span class="bread__label">{{ item.label }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="footer__items">
                <div class="footer__items-title">
                    <Title type="h3" label="Lorem ipsum" />
                </div>
                <ul class="footer__items-list">
                    <li
                        v-for="(item, index) in fakeData"
                        :key="index"
                        class="footer__items-wrap"
                    >
                        <router-link
                            :to="item.url"
                            class="footer__items-content"
                        >
                            <span class="bread__label">{{ item.label }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="footer__items">
                <div class="footer__items-title">
                    <Title type="h3" label="Lorem ipsum" />
                </div>
                <ul class="footer__items-list">
                    <li
                        v-for="(item, index) in fakeData"
                        :key="index"
                        class="footer__items-wrap"
                    >
                        <router-link
                            :to="item.url"
                            class="footer__items-content"
                        >
                            <span class="bread__label">{{ item.label }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </footer>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';

    const useData = [
        {
            url: '/',
            label: 'Conditions d’utilisation',
        },
        {
            url: '/',
            label: 'Gestion des cookies',
        },
    ];

    const fakeData = [
        {
            url: '/',
            label: 'Lorem ipsum dolor',
        },
        {
            url: '/',
            label: 'Lorem ipsum dolor sit',
        },
        {
            url: '/',
            label: 'Lorem ipsum dolor',
        },
        {
            url: '/',
            label: 'Lorem ipsum dolor sit',
        },
        {
            url: '/',
            label: 'Lorem ipsum dolor',
        },
        {
            url: '/',
            label: 'Lorem ipsum dolor sit',
        },
    ];
</script>

<style lang="scss" scoped>
    .footer {
        @apply bg-secondary;
        &__container {
            // grid-template-areas: 'logo list_a list_b list_c';
            @apply container py-[48px] gap-[24px];
            @screen sm {
                grid-template-areas:
                    'logo list_a'
                    'list_b list_c ';
                @apply grid grid-cols-2;
            }
            @screen md {
                grid-template-areas:
                    'logo logo logo'
                    'list_a list_b list_c ';
                @apply grid grid-cols-3;
            }
            @screen lg {
                grid-template-areas: 'logo list_a list_b list_c';
                @apply py-[64px] grid-cols-4;
            }
        }
        &__items {
            @apply flex flex-col gap-[24px] text-center;
            @screen lg {
                @apply text-left;
            }
            &:first-child {
                @apply justify-center items-center;
            }
            &-title {
                @apply text-white text-[14px] font-[600];
            }
            &-wrap {
                @apply text-blueFooter;
            }
            &:nth-child(1) {
                grid-area: logo;
            }
            &:nth-child(2) {
                grid-area: list_a;
            }
            &:nth-child(3) {
                grid-area: list_b;
            }
            &:nth-child(4) {
                grid-area: list_c;
            }
        }
    }
</style>
