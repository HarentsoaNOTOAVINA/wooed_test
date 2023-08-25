<template>
    <div v-if="region === 'Bruxelles-Capitale'" class="listBrux">
        <table class="styled-table">
            <thead>
                <tr>
                    <th v-for="(item, index) in bruxHead" :key="index">
                        {{ item.text }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="active-row"
                    v-for="(item, index) in brux"
                    :key="index"
                >
                    <td class="id">{{ item.identifier }}</td>
                    <td>{{ item.municipalReference }}</td>
                    <td>{{ item.street }} {{ item.number }}</td>
                    <td>{{ item.municipality }}</td>
                    <td>{{ item.objectOFRequest }}</td>
                    <td>{{ item.inquiryStartDate }}</td>
                    <td>{{ item.inquiryEndDate }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="listAnver">
        <table class="styled-table">
            <thead>
                <tr>
                    <th
                        class="headList"
                        v-for="(item, index) in anverHead"
                        :key="index"
                    >
                        {{ item.text }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="active-row" v-for="(item, index) in anver">
                    <td>{{ item.projectNummer }}</td>
                    <td>{{ item.adres }} {{ item.nummer }}</td>
                    <td>{{ item.gementee }}</td>
                    <td>{{ item.voorwerpVanDeAanvraag }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
    import { computed, onBeforeMount, onMounted, ref } from 'vue';
    import { anverHead, bruxHead } from './dataInquiryList';
    import { Empty as AEmpty, notification } from 'ant-design-vue';
    import { Store, useStore } from 'vuex';
    import Hr from '@/components/Common/Hr/Hr.vue';

    const store: Store<any> = useStore();
    //List data-----------------------------
    let bruxData: Array<Object> = [];
    let anverData: Array<Object> = [];
    //--------------------------------------
    //refs----------------------------------
    const anver = ref<Array<any>>([]);
    const brux = ref<Array<any>>([]);
    const region = ref<string>('');
    let isLoading = ref<boolean>(false);
    //--------------------------------------

    onBeforeMount(() => {
        getRegion();
    });

    onMounted(() => {
        getList();
    });

    const getRegion = () => {
        const data = computed(
            () => store.getters['UrbanismeModule/getPropertyDetail']
        );
        region.value = data.value[0].region;
        // console.log('property detail:', data.value[0].region);
    };

    const getList = async () => {
        try {
            isLoading.value = true;
            await store.dispatch('UrbanismeModule/setPublicInquiryList');
            const data = computed(
                () => store.getters['UrbanismeModule/getPublicInquiryList']
            );
            anverData = data.value.data.anvers;
            bruxData = data.value.data.bruxelles;
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
            isLoading.value = false;
            console.log('error:', error);
        } finally {
            isLoading.value = false;
        }
        console.log('anver data:', anverData);
        extractData();
    };

    const extractData = () => {
        anver.value = anverData.map(
            ({
                projectNummer,
                adres,
                nummer,
                gementee,
                voorwerpVanDeAanvraag,
            }: any) => ({
                projectNummer,
                adres,
                nummer,
                gementee,
                voorwerpVanDeAanvraag,
            })
        );

        brux.value = bruxData.map(
            ({
                identifier,
                municipalReference,
                street,
                number,
                municipality,
                objectOFRequest,
                inquiryStartDate,
                inquiryEndDate,
            }: any) => ({
                identifier,
                municipalReference,
                street,
                number,
                municipality,
                objectOFRequest,
                inquiryStartDate,
                inquiryEndDate,
            })
        );
        console.log('data brux extracted:', brux.value);
    };
</script>

<style lang="scss" scoped>
    .id{
        color: #67CD84;
    }

    .listBrux,
    .listAnver {
        @apply my-[20px];
        overflow-y: scroll;
        height: 400px;
    }
    .styled-table {
        position: relative;
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        height: 400px;
    }
    .styled-table th,
    .styled-table thead {
        background-color: var(--color-gray);
        text-align: left;
        position: sticky;
        top: 0;
    }
    .styled-table th,
    .styled-table td {
        padding: 12px 15px;
    }

    .styled-table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    .styled-table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    .styled-table tbody tr:last-of-type {
        border-bottom: 2px solid #009879;
    }

    .styled-table tbody tr.active-row {
        font-weight: bold;
        // color: #009879;
    }
</style>
