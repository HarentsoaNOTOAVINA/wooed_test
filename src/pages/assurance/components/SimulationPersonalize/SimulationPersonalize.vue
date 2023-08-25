<template>
    <div class="content-container ">
        <div class="cover-container" v-if="!result">
            <Title 
                type="h4" 
                label="Quelle est la valeur à assurer pour votre contenu ?" 
                weight="bold"
            />
            <div class="info-card">
                <Paragraphe class="info">{{ dataCare.value + ' €' }}</Paragraphe>
            </div>
            <hr />
            <Title
                type="h4"
                label="Couverture de l'assurance"
                weight="bold"
            />
            <div class="defautl-couverture-container">
                <div v-for="(item, index) in defaultCouverture" :key="index" class="couverture-card">
                    <Couverture :couverture="item.icon" />
                    <Paragraphe>{{ item.label }}</Paragraphe>
                </div>
            </div>
            <hr />
            <Title
                type="h4"
                label="Garanties optionnelles"
                weight="bold"
            />
            <div class="defautl-couverture-container">
                <div v-for="(item, index) in dataCover" :key="index" class="couverture-card">
                    <Title
                        type="h4"
                        :label="item.label"
                        weight="bold"
                    />
                    <Paragraphe class="cover-description">{{ item.description }}</Paragraphe>
                    <Button 
                        v-if="(isOk && isAdded === index)"
                        typeButton="gray"
                        html-type="button"
                        @click="handleDeleteCoverElement(index)"
                    >
                        Supprimer
                    </Button>
                    <div v-else>
                        <div v-if="isAdded === index" class="radio-btn">
                            <Radio
                                :element="item.choice"
                                align="vertical"
                                class="radioElementClass"
                                name="radioGroupCheck"
                                @get-radio-input="handleChangeRadio($event)"
                            />
                                <Button 
                                    v-if="validate"
                                    typeButton="gray"
                                    html-type="button"
                                    @click="handleAddCoverElement(index)"
                                    :disabled="hasChange"
                                >
                                    Valider
                                </Button>
                        </div>
                        <Button
                            v-else
                            typeButton="border"
                            html-type="button"
                            @click="handleAddCover(index, item.label)"
                        >
                            Ajouter
                        </Button>
                    </div>
                </div>
            </div>
            <Button
                typeButton="border"
                html-type="button"
                @click="handleShowResult"
                v-if="!result"
                :disabled="(loadingBtn || validate)"
            >
                <LoadingButton v-if="loadingBtn" />
                <span v-else>Lancer ma simulation personnalisée</span>
            </Button>
        </div>
        <Result v-if="result" :data="dataComp"/>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Couverture from '@/components/Icon/Couverture.vue';
    import Button from "@/components/Common/Button/Button.vue";
    import { ref, onMounted } from 'vue';
    import store from '@/store';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import { AssuranceService } from '@/services/assuranceService';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import Result from '../Result.vue';
    import { useRoute } from 'vue-router';

    const router = useRoute();

    // interface
    interface typeCouverture {
        label: string;
        icon: string;
    }

    interface typeCoverElement {
        label : string,
        value : string
    }

    // ref
    const result = ref<boolean>(false);
    const loadingBtn = ref<boolean>(false);
    const hasChange = ref<boolean>(true);
    const validate = ref<boolean>(true);
    const isOk = ref<boolean>(false);

    const isAdded = ref<number>();

    const coverParams = ref<Array<any>>([]);
    const dataCover = ref<Array<any>>([]);

    const coverElement = ref<Object | typeCoverElement>({});
    const dataCare = ref<Object | any>({});

    const dataComp = ref<any>();
    const defaultCouverture: typeCouverture[] = [
        {
            label: 'Incendie',
            icon: 'fire',
        },
        {
            label: 'Dégâts des eaux et de mazout',
            icon: 'water',
        },
        {
            label: 'Catastrophes naturelles & Tempête',
            icon: 'cyclon',
        },
        {
            label: 'Bris de vitrages Heurt Dégradations immobilières',
            icon: 'broken',
        },
        {
            label: 'Dégâts électriques',
            icon: 'electric',
        },
        {
            label: 'Attentat & conflit du travail',
            icon: 'degat',
        },
        {
            label: 'Responsabilité civile immeuble',
            icon: 'house',
        },
        {
            label: 'Jardin',
            icon: 'garden',
        },
    ];

    //fn
    const handleAddCoverElement = (index: number) => {
        validate.value = false;
        coverParams.value = [
            ...coverParams.value,
            coverElement.value
        ]
        notNullError(index);
    }

    const notNullError = (index: number) => {
        const i = coverParams.value.findIndex(c => c.label === [...dataCover.value][index].label);
        if (coverParams.value[i].label === [...dataCover.value][index].label) {
            isOk.value = true;
        }else{
            isOk.value = false;
        }
    }

    const handleDeleteCoverElement = (index: number) => {
        coverParams.value = coverParams.value.filter(c => c.label !== [...dataCover.value][index].label);
    }

    const handleAddCover = (index: number, cover: string) => {
        hasChange.value = true;
        validate.value = true;
        isOk.value = false
        coverElement.value = {
            ...coverElement.value,
            label : cover,
        }
        isAdded.value = index;
    }

    const handleChangeRadio = (e: any) => {
        hasChange.value = false;
        let valueRadio = e.target.value;
        coverElement.value = {
            ...coverElement.value,
            value : valueRadio,
        }
    };

    const handleShowResult = async () => {
        loadingBtn.value = true;
        const dataAssurance = store.getters['AssuranceModule/getAssurance'];
        try {
            const data = await AssuranceService.postSimulation({
                theProperty: parseInt(router.params.id as any),
                value: dataAssurance.value,
                propertyType: dataAssurance.propertyType,
                cover : coverParams.value,
            });
            dataComp.value = data.data.data;
            loadingBtn.value = false;
            result.value = true;
            // store.dispatch('AssuranceModule/setDataAssurance', data.data);
            
        } catch (error) {}
    };

    const getData = () =>{
        dataCover.value = [...store.getters['AssuranceModule/getDataAssurance'].data.cover];
        dataCare.value = store.getters['AssuranceModule/getAssurance'];
    }

    onMounted(() => {
        getData();
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
    .cover-container{
        display: flex;
        gap: 18px;
        flex-direction: column;
        align-items: center;
    }
    .defautl-couverture-container {
        @apply mt-[10px] md:mt-[0px] grid md:grid-cols-4 sm:grid-cols-2 gap-4;
        .couverture-card{
            display: flex;
            gap: 18px;
            flex-direction: column;
            border-radius: 8px;
            padding: 18px;
            background-color: #fff;
            align-items: center;
            &:deep(){
                svg{
                    height: 60px;
                }
            }
        }
    }
    .cover-description{
        color: var(--color-gray-icon);
    }
    .radio-btn{
        display: flex;
        flex-direction: column;
        gap: 25px;
    }
    .info{
        font-weight: 500;
        font-size: 14px;
        color: var(--color-gray-icon);
    }
    .info-card{
        padding: 12px 24px;
        background-color: #fff;
        border-radius: 8px;
    }
</style>
