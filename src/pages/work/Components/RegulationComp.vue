<template>
    <div class="regulation__container">
        <div class="regulation__header">
            <div class="regulation__back" @click="prev">
                <BackButtonVue />
            </div>
            <Paragraphe class="regulation__title">{{ titleComp }}</Paragraphe>
        </div>
        <hr class="separator" />
        <div class="regulation__section">
            <div class="slot-top">
                <slot name="SlotTop"></slot>
            </div>
            <section
                v-for="(element, index) in dataRegulationMaintainsTank"
                :key="index"
            >
                <Paragraphe
                    class="font-bold"
                    v-for="(enterBold, index) in element.paraBold"
                    :key="index"
                    >{{ enterBold.enterBold }}</Paragraphe
                >
                <h1 class="title-regulation">{{ element.title }}</h1>
                <div
                    class="regulation__regulation-article"
                    v-if="element.article"
                >
                    <Paragraphe class="frequency__title-bold">{{
                        element.titleContentArt
                    }}</Paragraphe>
                    <div
                        class="work__regulation-bord"
                        v-for="(article, i) in element.article"
                        :key="i"
                    >
                        <Paragraphe class="article__title">{{
                            article.titleArt
                        }}</Paragraphe>
                        <Paragraphe
                            class="article__number"
                            v-if="article.numberArt"
                            >{{ article.numberArt }}</Paragraphe
                        >
                        <Paragraphe class="article__subTitle">
                            {{ article.subTitleArt }}</Paragraphe
                        >
                        <Paragraphe> {{ article.contentArt }}</Paragraphe>
                        <ul class="list-unorder">
                            <li v-for="(liste, a) in article.listeArt" :key="a">
                                {{ liste.liste }}
                            </li>
                            <li
                                class="list-none"
                                v-for="(subList, ind) in article.subList"
                                :key="ind"
                            >
                                <Paragraphe>{{
                                    subList.titleSubList
                                }}</Paragraphe>
                                <Paragraphe
                                    v-for="(
                                        contentSub, index
                                    ) in subList.contentSubList"
                                    :key="index"
                                    class="ml-1"
                                >
                                    . {{ contentSub.listeSub }}</Paragraphe
                                >
                            </li>
                        </ul>
                        <Paragraphe>{{ article.contentFooterArt }}</Paragraphe>
                    </div>
                </div>

                <div class="work__regutaltion-frequency">
                    <div
                        class="frequency__content"
                        v-for="(frequency, index) in element.frequency"
                        :key="index"
                    >
                        <div class="frequency__title toBetween">
                            <Paragraphe class="frequency__title-bold">
                                {{ frequency.titleFreq }}</Paragraphe
                            >
                            <Paragraphe class="para-gray">
                                {{ frequency.inspectFreq }}</Paragraphe
                            >
                        </div>
                        <div
                            class="frequency__content-value"
                            v-for="(
                                contentFreq, index
                            ) in frequency.contentFreq"
                            :key="index"
                        >
                            <div class="frequency__subTitle toBetween">
                                <Paragraphe
                                    class="frequency__subTitle-semibold"
                                >
                                    {{ contentFreq.type }}</Paragraphe
                                >
                                <a
                                    class="para-gray"
                                    :href="contentFreq.link"
                                    target="_blank"
                                >
                                    {{ contentFreq.dateInspect }}</a
                                >
                            </div>
                            <div
                                class="frequency__subContent"
                                v-if="contentFreq.subContent"
                            >
                                <div
                                    class="frequency__subContent-value"
                                    v-for="(
                                        subContent, index
                                    ) in contentFreq.subContent"
                                    :key="index"
                                >
                                    <div class="toBetween">
                                        <Paragraphe>
                                            {{ subContent.age }}</Paragraphe
                                        >
                                        <Paragraphe class="para-gray">
                                            {{ subContent.date }}
                                        </Paragraphe>
                                    </div>
                                    <hr
                                        class="separate"
                                        v-if="
                                            index !==
                                            contentFreq.subContent.length - 1
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="work__regutaltion-extentControl">
                    <ul class="list-unorder-simple">
                        <li
                            v-for="(extent, a) in element.extentControl"
                            :key="a"
                        >
                            <span class="type-extent">{{ extent.type }} </span>
                            : {{ extent.definition }}
                        </li>
                    </ul>
                </div>

                <div class="work__regutaltion-requiredAction">
                    <div
                        class="requiredAction__content"
                        v-for="(requireAction, index) in element.requiredAction"
                        :key="index"
                    >
                        <Paragraphe class="frequency__title-bold">
                            {{ requireAction.question }}</Paragraphe
                        >
                        <Paragraphe> {{ requireAction.response }}</Paragraphe>
                    </div>
                </div>
            </section>
            <div class="slot-requiredAction">
                <slot name="SlotrequiredAction"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { onMounted, ref } from 'vue';
    import BackButtonVue from '@/components/Common/BackButton/BackButton.vue';

    const props = defineProps({
        titleComp: {
            type: String,
            default: 'Règlementation',
        },
        dataRegulationMaintainsTank: {
            type: Array<any>,
            default: [],
        },
    });
    const emit = defineEmits(['component', 'prev']);
    const windowWidth = ref<any>(window.innerWidth);

    onMounted(() => {
        resize();
    });

    function prev() {
        emit('prev');
    }

    function resize() {
        window.onresize = () => {
            windowWidth.value = window.innerWidth;
        };
    }
</script>

<style lang="scss" scoped>
    .regulation {
        &__container {
            @apply bg-white rounded-[8px] p-[18px] flex flex-col min-h-[100vh_-_20px];
        }
        &__regulation-article {
            @apply p-[5px] rounded-[8px];
            border: 1px solid var(--color-gray);
        }
        &__title {
            color: var(--color-gray-icon);
            font-weight: 600;
            @apply text-[16px];
        }
        &__subtitle {
            color: #949fb5;
            font-weight: 400;
        }
        &__subItem {
            @apply flex flex-col gap-[24px];
        }
        &__subItem-content {
            @apply md:grid md:grid-cols-2 gap-[24px];
        }
        &__header {
            @apply flex items-center;
        }
        &__back {
            @apply h-[40px] w-[40px] flex justify-center items-center rounded-[50%];
        }
    }

    .article {
        &__title {
            @apply mb-[12px] font-semibold text-xs;
        }
        &__subTitle {
            @apply my-[12px] font-semibold text-xs;
        }
        &__number {
            @apply text-[var(--color-red)] rounded-[8px] inline py-[4px] px-[8px] italic text-[10px];
            background: rgba(239, 121, 96, 0.2);
        }
    }
    .frequency {
        &__content {
            @apply border-solid border-[1px] border-[var(--color-gray)] p-[10px] mb-[20px] rounded-[8px];
        }
        &__title-bold {
            @apply font-bold my-[12px];
        }
        &__subTitle-semibold {
            @apply font-semibold;
        }

        &__content-value {
            @apply bg-[var(--color-gray)] p-[10px] rounded-[8px] my-[8px];
        }

        &__subContent {
            @apply bg-[#fff] rounded-[8px] p-[8px] my-[4px];
        }
    }

    .work {
        &__regulation-bord {
            @apply bg-[var(--color-gray)] p-[10px] rounded-[8px] mb-[10px];
        }
    }

    .title-regulation {
        @apply font-semibold text-[24px] my-[18px];
    }

    .sub-title {
        @apply font-semibold py-[12px];
    }

    .list-unorder {
        @apply mt-[15px] ml-[28px] list-disc  pl-[14px];
        border-left: 1px solid var(--color-primary);
        li::marker {
            @apply text-[var(--color-primary)] text-[15px];
        }
        li:first-child {
            @apply relative top-[-8px];
        }

        li:last-child {
            @apply relative bottom-[-8px] mb-[15px];
        }
    }

    .list-unorder-simple {
        @apply mt-[15px] ml-[28px] list-disc  pl-[14px];

        li::marker {
            @apply text-[var(--color-primary)] text-[18px];
        }
    }

    .title-semibold {
        @apply font-semibold;
    }
    .para-gray {
        @apply text-[var(--color-primary)];
    }

    .toBetween {
        @apply flex justify-between flex-wrap;
    }

    .separate {
        @apply text-[var(--color-gray)] my-[4px];
    }

    .type-extent {
        @apply font-semibold underline;
    }
</style>
