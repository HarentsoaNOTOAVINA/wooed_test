<template>
    <div class="simulation-step">
        <Title type="h3" label="DONNEES PERSONNELLES" />
        <hr />
        <Select
            @change-select="handleEntry"
            placeholder="Selectionnez"
            label="Etat civil"
            name="maritalStatus"
            :options="MARITAL_STATUS"
            :required="true"
        />
        <Select
            @change-select="handleEntry"
            placeholder="Selectionnez"
            label="Vous empruntez seul(e) ou avec votre partenaire?"
            name="loanAloneOrWithPartener"
            :options="LOAN_ALONE_OR_WITH"
            :required="true"
        />
        <Input
            @input="handleEntry"
            placeholder="Entrez le nombre de personnes à charge"
            label="Nombre de personnes à charge"
            name-input="dependentsNb"
            :required="true"
            input-type="number"
        />
        <InputDate
            :required="true"
            name="ownerDateBirth"
            label="Quelle est votre date de naissance ?"
            @handle-date-format="handleEntry"
            class="mb-[20px]"
        />
        <transition appear mode="out-in" name="fade-appear">
            <InputDate
                v-if="
                    !!params.loanAloneOrWithPartener &&
                    params.loanAloneOrWithPartener === 'Mon partenaire et moi'
                "
                name="partenerDateBirth"
                label="Quelle est la date de naissance de votre partenaire?"
                @handle-date-format="handleEntry"
                :required="true"
                class="mb-[20px]"
            />
        </transition>
        <Select
            @change-select="handleEntry"
            placeholder="Selectionnez"
            label="Quelle est votre situation résidentielle actuelle?"
            name="residentialSituation"
            :options="RESIDENTIAL_SITUATION"
            :required="true"
        />
    </div>
</template>
<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import { ref, watch } from 'vue';

    const params = ref<any>({});

    const MARITAL_STATUS = ref<any>([
        {
            value: 'divorcé de fait',
            label: 'divorcé de fait',
        },
        {
            value: 'marié',
            label: 'marié',
        },
        {
            value: 'célibataire',
            label: 'célibataire',
        },
        {
            value: 'divorcé légalement',
            label: 'divorcé légalement',
        },
        {
            value: 'veuf/veuve',
            label: 'veuf/veuve',
        },
        {
            value: 'cohabitant légal',
            label: 'cohabitant légal',
        },
        {
            value: 'cohabitant de fait',
            label: 'cohabitant de fait',
        },
    ]);

    const LOAN_ALONE_OR_WITH = [
        {
            value: 'Moi',
            label: 'Moi',
        },
        {
            value: 'Mon partenaire et moi',
            label: 'Mon partenaire et moi',
        },
    ];

    const RESIDENTIAL_SITUATION = [
        {
            label: 'propriétaire',
            value: 'propriétaire',
        },
        {
            label: 'locataire',
            value: 'locataire',
        },
        {
            label: 'habitant (chez les parents)',
            value: 'habitant (chez les parents)',
        },
        {
            label: 'autre',
            value: 'autre',
        },
    ];

    const emit = defineEmits<{
        (fn: 'on-handle-params', v: any): void;
    }>();

    watch(
        () => params.value,
        (v) => {
            emit('on-handle-params', v);
        }
    );

    function handleEntry(evt: any) {
        const [name, value] = Object.entries(evt)[0];
        switch (name) {
            case '':
                break;
            default:
                paramsDefaultAssignation(evt);
                break;
        }
    }
    function paramsDefaultAssignation(
        obj?: any,
        defaultParams: any = params.value
    ) {
        params.value = {
            ...defaultParams,
            ...obj,
        };
    }
</script>
<style lang="scss" scoped>
    .simulation-step {
        .fade-appear-enter-active,
        .fade-appear-leave-active {
            @apply transition-all;
        }
        .fade-appear-enter-from,
        .fade-appear-leave-to {
            @apply translate-x-[-200px];
        }
    }
</style>
