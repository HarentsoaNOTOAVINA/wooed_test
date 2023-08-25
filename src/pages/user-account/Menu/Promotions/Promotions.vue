<template>
    <div class="promo">
        <div class="promo__btnContainer">
            <Button @click="scan"> Scanner un code barre </Button>
        </div>
        <table class="promo__container">
            <thead>
                <tr>
                    <th class="promo__headTxt">Fournisseur</th>
                    <th class="promo__headTxtCenter">Code</th>
                    <th class="promo__headTxtEnd">Date de validation</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="table-row"
                    v-for="(row, index) in tableData"
                    :key="index"
                >
                    <td class="promo__contentStart">{{ row.fournisseur }}</td>
                    <td class="promo__contentCenter">{{ row.code }}</td>
                    <td class="promo__contentEnd">{{ row.date_validation }}</td>
                    <Hr />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { useStore } from 'vuex';

    const store = useStore();

    onMounted(() => {
        getPromo();
    });

    const getPromo = async () => {
        let data = await store.dispatch('UserModule/setPromo');
        console.log(data, 'promosss');
    };

    const tableData = ref<Array<any>>([
        {
            fournisseur: 'Supplier A',
            code: '123',
            date_validation: '2023-04-15',
        },
        {
            fournisseur: 'Supplier B',
            code: '456',
            date_validation: '2023-04-16',
        },
        {
            fournisseur: 'Supplier C',
            code: '789',
            date_validation: '2023-04-17',
        },
    ]);

    const scan = () => {
        !!(window as any).scan &&
            (window as any).scan.postMessage();
        console.log('scan');
    };
</script>

<style lang="scss" scoped>
    .promo {
        @apply flex flex-col gap-[20px];
        &__container {
            @apply w-full;
        }
        &__headTxt {
            @apply text-start font-[600] text-[var(--color-gray-icon)];
        }

        &__headTxtCenter {
            @apply text-center font-[600] text-[var(--color-gray-icon)];
        }
        &__headTxtEnd {
            @apply text-end font-[600] text-[var(--color-gray-icon)];
        }

        &__contentStart {
            @apply text-start font-[600];
        }

        &__contentCenter {
            @apply text-center font-[600];
        }

        &__contentEnd {
            @apply text-end font-[600];
        }

        // &__table-row {
        //     @apply rounded p-[10px];
        // }
        &__btnContainer {
            @apply flex justify-end;
        }
    }
    .table-row {
        // border: 0.5px solid var(--color-gray);
        // border-right: none;
        // display: table-cell;
        @apply rounded p-[10px];
    }
</style>
