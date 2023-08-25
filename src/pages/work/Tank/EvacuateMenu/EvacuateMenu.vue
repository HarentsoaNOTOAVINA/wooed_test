<template>
    <div class="work">
        <div>
            <Title type="h3">{{ title }}</Title>
            <ul>
                <li class="work__subtitle">
                    <u>{{ subtitle1 }}</u>
                    <span>{{ section }}</span>
                </li>
                <li class="work__subtitle">
                    <u>{{ subtitle2 }}</u>
                    <div>
                        <span>{{ section2 }}</span>
                        <ul class="work__subContainer">
                            <li class="work__subsection" v-for=" itemSubSection in subSection">
                                <Paragraph>{{ itemSubSection }}</Paragraph>
                                <!-- <Paragraph>{{ subSection2 }}</Paragraph> -->
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="work__subtitle">
                    <u>{{ subtitle3 }}</u>  la dispense peut etre demandé si:
                    <div>
                        <ul class="work__subContainer" v-for="item in subSectionList">
                            <li class="work__subsection">{{ item }}</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>

        <MenuTanksWork
            :dataTankMenu="dataMenu"
            @changeComponent="changeComponent"
        />
    </div>
</template>

<script setup lang="ts">
    import MenuTanksWork from '../MenuTanksWork/MenuTanksWork.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue';
    import {
        dataMenu,
        title,
        subtitle1,
        subtitle2,
        section,
        section2,
        subSection,
        // subSection2,
        subtitle3,
        subSectionList
    } from './data';

    const emit = defineEmits<{
        (e: 'changeComponent' , item:object): void;
    }>();

    const changeComponent = (item: object) => {
        emit("changeComponent",item)
        console.log('evacuate menu', item);
    };
</script>

<style lang="scss" scoped>
    .work{
        &__subtitle{
            list-style-type: disc;
        }

        &__subContainer{
            @apply ml-[20px];
        }

        &__subsection{
            list-style-type: disclosure-closed;
        }
    }
</style>
