<template>
    <div class="no-connection">
        <BackButton
            :text="'Je dispose d’un système d’extraction des eaux souterraines'"
            @return="backTo"
            class="back-tbn"
        />
        <Button type-button="gray" @click="handleClick" v-if="!control"
            >Controle de qualité</Button
        >
        <div class="no-connection__items" v-else>
            <Paragraphe @click="handleShowContent('')" class="item-title"
                >Controle de qualité</Paragraphe
            >

            <hr class="__hr" />

            <div v-if="content === ''" class="no-connection__items">
                <div class="info" @click="handleShowContent('connectable')">
                    <Paragraphe
                        >Mon bien est raccordable au réseau de distribution
                        d’eau courante</Paragraphe
                    >
                </div>
                <div class="info" @click="handleShowContent('notConnectable')">
                    <Paragraphe
                        >Mon bien n’est pas raccordable au réseau de
                        distribution d’eau courante</Paragraphe
                    >
                </div>
            </div>

            <!-- RACCORDABLE -->
            <div class="no-connection__items" v-if="content === 'connectable'">
                <Alert class="report-alert">
                    Mon bien est raccordable au réseau de distribution d’eau
                    courante
                </Alert>
                <CheckBox
                    name="commission"
                    label="Je souhaite commissionner un laboratoire agréé afin de faire contrôler la qualité de l’eau extraite"
                    :return-boolean="true"
                    @click="handleChange($event, 'checked')"
                />
                <Tabs
                    v-if="showTabs"
                    :connection-supplier="supplierData"
                    :connection-supplier-title="titleData"
                />
            </div>

            <!-- NON RACCORDABLE -->
            <div
                class="no-connection__items"
                v-if="content === 'notConnectable'"
            >
                <Alert class="report-alert">
                    Mon bien n’est pas raccordable au réseau de distribution
                    d’eau courante
                </Alert>
                <CheckBox
                    name="reserve"
                    label="Je souhaite réserver ma visite de contrôle annuelle organisée par la VMM"
                    :return-boolean="true"
                    @click="handleChange($event, 'checked')"
                />
                <Paragraphe v-if="showTabs">PDF</Paragraphe>
                <!-- PDF -->
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Alert from '@/components/Display/Alert/Alert.vue';
    import { ref } from 'vue';
    import Tabs from '../Tabs.vue';
    import { supplierData } from '@/pages/supplier/components/Water/Data/connectableSupplier.data';

    const emit = defineEmits(['back-to']);
    const control = ref<boolean>(false);
    const showTabs = ref<boolean>(false);
    const content = ref<string>('');
    const titleData = [
        {
            title: 'Laboratorium',
        },
        {
            title: 'Telefoonnummer',
        },
        {
            title: 'E-mail',
            col: '100%',
        },
        {
            title: 'Website',
            col: '100%',
        },
    ];

    function handleClick() {
        control.value = !control.value;
    }

    function handleChange(event: any, type: any) {
        console.log('event = ', event, 'type = ', type);
        if (event) {
            showTabs.value = true;
        } else {
            showTabs.value = false;
        }
    }

    function handleShowContent(value: string) {
        content.value = value;
    }

    function backTo() {
        emit('back-to');
    }
</script>
<style lang="scss" scoped>
    .__hr {
        @apply text-gray w-full;
    }
    .no-connection {
        @apply flex flex-col gap-[18px] w-full;
        &__items {
            @apply flex flex-col gap-[18px] w-full;
        }
    }

    .info {
        @apply rounded-[8px] p-[10px];
        border: 0.5px solid var(--color-gray);
        // color: var(--color-primary);
        cursor: pointer;
    }
    .back-tbn {
        @apply w-full;
    }
    .item-title {
        color: var(--color-primary);
        cursor: pointer;
        font-weight: 500;
    }
</style>
