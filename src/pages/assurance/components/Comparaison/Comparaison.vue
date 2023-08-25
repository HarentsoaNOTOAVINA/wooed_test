<template>
    <div class="content-container">
        <LoadingButton v-if="loadingBtn" />
        <div v-else class="care-result">
            <Title type="h4" label="Comparaison" weight="bold" />
            <div class="comparaison">
                <!-- desktop -->
                <table class="comparaison__desktop">
                    <thead>
                        <tr>
                            <th colspan="1">
                                
                            </th>
                            <th colspan="1" v-for="c, idx in dataComparaison" :key="idx" class="care-title__text">
                                {{c.company}}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="item, index in data" :key="index">
                            <td class="care-description comparaison__company">{{item.title}} 
                                <span class="care-description__detail">
                                    {{item.description}}
                                </span>
                            </td>
                            <td v-for="c, idx in dataComparaison" :key="idx" class="comparaison__value">
                                <span v-if="c.content[index].value == 'OUI'" class="comparaison__value-yes">
                                    {{ c.content[index].value }}
                                </span>
                                <span v-else class="comparaison__value-no">{{ c.content[index].value }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- mobile -->
                <table v-for="item, index in data" :key="index" class="comparaison__mobile">
                    <thead>
                        <tr class="care-title">
                            <th colspan="2" class="care-title__text">{{item.title}} 
                                <span class="care-description__detail">
                                    {{item.description}}
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="c, idx in dataComparaison" :key="idx">
                            <td class="comparaison__company">{{c.company}}</td>
                            <td class="comparaison__value">
                                <span v-if="c.content[index].value == 'OUI'" class="comparaison__value-yes">{{ c.content[index].value }}</span>
                                <span v-else class="comparaison__value-no">{{ c.content[index].value }}</span>
                            </td>
                            <hr />
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import Title from '@/components/Common/Title/Title.vue';
import LoadingButton from '@/components/Icon/LoadingButton.vue';
import { AssuranceService } from '@/services/assuranceService';
import { onMounted, ref } from 'vue';
import { data } from './data';

    //ref
    const dataComparaison = ref<Array<any>>([]);
    const loadingBtn = ref<boolean>(false);
    
    // interface

    //fn

    const getComparaison = async () => {
        loadingBtn.value = true;
        try {
            const data = await AssuranceService.getComparaison();
            console.log(data, 'data');
            dataComparaison.value = data.data;
            console.log(dataComparaison.value, "io ny dataaa");
            loadingBtn.value = false;
        } catch (error) {}
    }

    onMounted(() => {
        getComparaison();
    })

</script>
<style lang="scss" scoped>
    .content-container {
        background-color: #fafafa;
        padding: 20px;
        display: flex;
        gap: 18px;
        flex-direction: column;
        align-items: center;
    }
    .care-result {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 18px;
        hr {
            color: var(--color-stroke-gray);
        }
    }
    table{
        width: 100%;
        background-color: #fff;
        th{
            width: 100%;
        }
        td{
            border: 0.5px solid var(--color-stroke-gray);
            padding: 18px;
            text-align: center;
            font-weight: 600;
            text-transform: capitalize;
        }
    }
    .comparaison{
        display: flex;
        flex-direction: column;
        gap: 25px;
        &__company{
            text-align: start;
        }
        &__value{
            width: 25%;
            font-weight: 400;
            font-style: italic;
        }
        &__value-yes{
            color: var(--color-green);
        }
        &__value-no{
            color: var(--color-red);
        }
        &__desktop{
            @apply max-[767px]:hidden;
        }
        &__mobile{
            @apply md:hidden;
        }
    }
    .care-title{
        border: none;
        &__text{
            background-color: white;
            color: var(--color-primary);
            text-align: center;
            padding: 18px;
            font-size: 18px;
            border: 0.5px solid var(--color-stroke-gray);
        }
    }
    .care-description{
        // white-space: nowrap;
        overflow: hidden;
        text-overflow: clip;
        font-weight: 500;
        font-size: 16px;
        color: var(--color-gray-secondary);
        &__detail{
            font-weight: 300;
            font-size: 14px;
            font-style: italic;
            color: var(--color-gray-icon);
        }
    }
</style>
