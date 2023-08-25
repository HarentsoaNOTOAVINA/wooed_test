<template>
    <div class="document__container">
        <div class="mb-[20px]" v-for="(nb, idNb) in numberFile" :key="idNb">
            <div class="document__occur-container" v-for="item in menuList">
                <!-- <Input
                    :label="item.label"
                    :name-input="item.name"
                    @input="handleChange($event, nb)"
                /> -->
                <!-- <Input
                    :label="item.label"
                    :name-input="item.name"
                    @input="handleChangeFile"
                /> -->
                <Select 
                    :options="nameSelect"
                    :label="item.label"
                    :name="item.name"
                    @change-select="handleChangeFile"
                    :default-value="propertyDatas[item.name]"
                />
                <Input 
                    v-if="paramsData.title === 'Autre'"
                    label="Autre titre"
                    name-input="title"
                    @input="handleTitle"
                    :default-value="propertyDatas.title ? propertyDatas.title : valueTitle"
                    :vmodel="valueTitle"
                />
                <UploadImage 
                    :name="item.file.name"
                    @upload-single-with-name="handleChangeFile"
                />
                <!-- :default-file-list="propertyDatas[item.file.name]" -->

                <div class="document__add-footer">
                    <Button type-button="secondary" @click="handleAddFile">Ajouter</Button>
                </div>
            </div>
        </div>
        
        <div class="document__alls">
            <div class="document__item" v-if="allPopertyData?.leaseCopy">
                <Paragraphe class="document__title">Copie de bail</Paragraphe>
                <a 
                    class="document__item-file" 
                    :href="createUrlFile(allPopertyData?.leaseCopy)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
            </div>

            <div class="document__item" v-if="allPopertyData?.plan">
                <Paragraphe class="document__title">Plan du bien introduit</Paragraphe>
                <a 
                    class="document__item-file" 
                    :href="createUrlFile(allPopertyData?.plan)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
            </div>

            <div class="document__item" v-if="allPopertyData?.licenceEnergy">
                <Paragraphe class="document__title">Cértificat énergetique du bien</Paragraphe>
                <a 
                    class="document__item-file" 
                    :href="createUrlFile(allPopertyData?.licenceEnergy)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
            </div>

            <div class="document__item" v-if="allPopertyData?.airTightness">
                <Paragraphe class="document__title">Test d’étanchéité à l’air</Paragraphe>
                <a 
                    class="document__item-file" 
                    :href="createUrlFile(allPopertyData?.airTightness)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
            </div>

            <!-- <div class="document__item" v-if="allPopertyData?.licenceEnergy">
                <Paragraphe class="document__title">Cértificat énergetique du bien</Paragraphe>
                <a 
                    class="document__item-file" 
                    :href="createUrlFile(allPopertyData?.licenceEnergy)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
            </div> -->
            <!-- <div class="document__item" v-if="allPopertyData?.airTightness">
                <Paragraphe class="document__title">Test d’étanchéité à l’air</Paragraphe>
                <a 
                    class="document__item-file" 
                    :href="createUrlFile(allPopertyData?.airTightness)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
            </div> -->
            <!-- <div class="document__item" v-if="allPopertyData?.epbFile">
                <Paragraphe class="document__title">Test d’étanchéité à l’air</Paragraphe>
                <a 
                    class="document__item-file" 
                    :href="createUrlFile(allPopertyData?.epbFile)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
            </div> -->
            
            <div class="document__item" v-if="allPopertyData?.sewerDocument">
                <Paragraphe class="document__title">Document relatif aux raccordement des égouts</Paragraphe>
                <a 
                    class="document__item-file" 
                    :href="createUrlFile(allPopertyData?.sewerDocument)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
            </div>



            <div 
                class="document__item"
                v-for="(item, index) in allFilesAdded" :key="index"
            >
                <Paragraphe class="document__title" v-if="item.title">{{item.title}}</Paragraphe>
                <a 
                    v-if="item.fileDocument"
                    class="document__item-file" 
                    :href="createUrlFile(item.fileDocument)"
                    target="_blank" rel="noopener noreferrer"
                >
                    <Icon icon-name="FileRed" />
                    <span>Fichier PDF</span>
                </a>
                <hr class="document__divider">
            </div>
        </div>


        <!-- <div class="">
            <Switch
                :item-label="infoUrba.title"
                :name="infoUrba.name"
                @handle-switch="handleChangeValue"
            />
        </div> -->
        <div class="document__information-container" v-if="showDoc">
            <div
                v-for="(item, key) in documentFields"
                :key="key"
                class="document__info"
            >
                <Paragraphe type="bold">{{ item.label }}</Paragraphe>
                <div class="document__information-content">
                    <div v-for="(field, key_) in item.fields" :key="'f' + key_">
                        <template class="" v-if="field.name !== 'address'">
                            <Input
                                v-if="field.type === fieldType.TEXT"
                                :label="field.label"
                                :placeholder="field.label"
                                :name-input="field.name"
                                @input="handleChangeValue"
                                :id="field.name"
                                :default-value="propertyDatas[field.name]"
                            />
                            <Slider />
                            <div v-if="field.type === fieldType.BOOL">
                                <Switch
                                    :item-label="item.label"
                                    :name="item.name"
                                    @handle-switch="handleChangeValue"
                                    :value="propertyDatas[item.name]"
                                />
                            </div>
                            <div v-if="field.type === fieldType.FILE">
                                <Paragraphe type="bold">{{
                                    field.label
                                }}</Paragraphe>
    
                                <upload-image
                                    :name="field.name"
                                    @upload-single-with-name="handleChangeValue"
                                />
                            </div>
                        </template>
                        <template v-else>
                            <div class="document__adresse">
                                <div class="document__adresse-label-container">
                                    <Paragraphe class="document__adresse-label">{{ field.label }}</Paragraphe>
                                    <hr class="document__divider">
                                </div>
                                <span>{{ allPopertyData.detailLocation.address }}</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <!-- <AddFile class="document__add-icon" @click="increment" /> -->
    </div>
</template>

<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { menuList, nameSelect } from '@/pages/addProduct/components/Documents/data';
    import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
    import AddFile from '@/components/Icon/AddFile.vue';
    import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
    import { Store, useStore } from 'vuex';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
import useAutoComptetion from '@/composables/useAutoComplete';
import SelectAutoComplet from '@/components/Common/SelectAutoComplet/SelectAutoComplet.vue';
import Select from '@/components/Common/Select/Select.vue';


    const numberFile = ref<number>(1);
    const params = ref<any>({
        documents: [],
    });
    const store: Store<any> = useStore();
    const fieldType = ref({
        TEXT: 'text',
        BOOL: 'bool',
        IMG: 'image',
        FILE: 'file',
        DATE: 'date',
    });
    const informations = ref<any>({});
    const showDoc = ref<boolean>(false);
    const infoUrba = ref<{ title: string; name: string }>({
        title: "Faire une demande d'informations urbanistiques",
        name: 'showAllDocument',
    });
    const allPopertyData = ref<any>(null);
    const allFilesAdded = ref<any[]>([]);
    const valueTitle = ref<any>();

    const paramsData = ref<any>({
        // text : '',
        fileDocument : '',
        // address : ''
    });


    const fieldList = [
        {
            label: 'Adresse',
            type: fieldType.value.TEXT,
            name: 'Adresse',
        },
        {
            label: 'Numéro',
            type: fieldType.value.TEXT,
            name: 'Numéro',
        },
        {
            label: 'Demande urgente',
            type: fieldType.value.BOOL,
            name: 'Demande urgente',
            options: [
                {
                    label: 'Oui',
                    value: 'true',
                },
                {
                    label: 'Non',
                    value: 'false',
                },
            ],
        },
        {
            label: 'Preuve de paiement',
            type: fieldType.value.FILE,
            name: 'Preuve de paiement',
        },
    ];
    const emit = defineEmits<{
        (e: 'showUrbanDoc', payload: any): void;
    }>();

    const documentFields = computed(
        () => store.getters['AddProductModule/getDocumentsFields']
    );
    const { autocompleteResult } = useAutoComptetion('postalCode', showDoc);

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    onBeforeMount(() => {
        store.dispatch(
            'AddProductModule/getDocumentFields',
            getMunicipalityOrRegion()
        );
    });

    onMounted(() => {
        getOldData();
    })

    watch(() => autocompleteResult.value, (value) => {
        console.log("Ito le adresy\n", value?.address);
        
    }, {immediate : true, deep : true})

    watch(
        () => numberFile.value,
        (value) => {
            numberFile.value = value;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => params.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...value },
                step: { documents: true },
            });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => allFilesAdded.value,
        (value) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { documents : value },
                step: { documents: true },
            });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => informations.value,
        (value) => {
            store.dispatch('AddProductModule/setUrbanDocument', { ...value });
        },
        { immediate: true, deep: true }
    );

    watch(
        () => showDoc.value,
        (value) => {
            if (value) {
                store.dispatch('AddProductModule/setUrbanDocument', {
                    ...getMunicipalityOrRegion(),
                });
            }
        },
        { immediate: true, deep: true }
    );

    watch(() =>store.getters['AddProductModule/getAddPropertyDatas'], (value) => {
        getOldData();
    }, {immediate : true, deep : true});

    function increment() {
        numberFile.value++;
    }

    // function handleChange(value: any, occu: number) {
    //     if (
    //         params.value.documents.length <= 0 ||
    //         params.value.documents.length < +occu
    //     ) {
    //         params.value.documents.push({
    //             title: '',
    //             file: '',
    //         });
    //     }
    //     for (let i in value) {
    //         params.value.documents[+occu - 1][i] = value[i];
    //     }
    // }

    // function handleUpload(file: any, occu: number) {
    //     if (
    //         params.value.documents.length <= 0 ||
    //         params.value.documents.length < +occu
    //     ) {
    //         params.value.documents.push({
    //             title: '',
    //             file: '',
    //         });
    //     }
    //     params.value.documents[+occu - 1]['file'] = file;
    // }
    const handler = (e: any) => {};

    function handleChangeValue(item: any) {
        for (let i in item) {
            if (i === 'showAllDocument') {
                store.dispatch('AddProductModule/setShowDocumentForm', item[i]);
                showDoc.value = item[i];
            } else {
                informations.value = {
                    ...informations.value,
                    ...item,
                };
            }
        }
        emit('showUrbanDoc', showDoc.value);
    }

    function getMunicipalityOrRegion() {
        const adress =
            store.getters['AddProductModule/getAddPropertyDatas'][
                'detailLocation'
            ];
        if (
            adress?.region?.toLowerCase() === 'flandre' ||
            adress?.region?.toLowerCase() === 'wallonie' ||
            adress?.region?.toLowerCase() === 'flandres' ||
            adress?.region?.toLowerCase() === 'wallonies'
        ) {
            return { region: adress.region };
        } else {
            return { municipality: adress?.municipality };
        }
    }

    /**
     * Manomboka eto
     * @param value 
     */

    function handleChangeFile(value : any){
        paramsData.value = {
            ...paramsData.value,
            ...value
        }
        console.log("Params data\n", paramsData.value);
        
    }

    function handleAddFile(){
        if(paramsData.value.title !== 'Autre'){
            allFilesAdded.value = [
                ...allFilesAdded.value,
                paramsData.value
            ]
        }else{
            allFilesAdded.value = [
                ...allFilesAdded.value,
                {
                    fileDocument : paramsData.value.fileDocument,
                    title : valueTitle.value   
                }
            ]     
            valueTitle.value = "";
        }
    }

    /**Lire un fichier de type file */
    function createUrlFile(data : any){
        return URL.createObjectURL(data);
    }

    function getOldData(){
        allPopertyData.value = store.getters['AddProductModule/getAddPropertyDatas']
        params.value.address = store.getters['AddProductModule/getAddPropertyDatas']['detailLocation']['address']
    }

    function handleTitle(value : any){
        valueTitle.value = Object.values(value)[0];
        console.log("vALUE\n", valueTitle.value);
    }
</script>



<style scoped lang="scss">
    .document {
        &__container {
        }
        &__file {
            @apply w-[150px] h-[150px] rounded-md bg-slate-200 flex justify-center items-center;
        }
        &__add {
            @apply w-[32px] h-[32px] rounded-[50px] cursor-pointer absolute top-[15px] right-[18px];
            background-color: var(--color-primary);
        }
        &__occur-container {
            @apply rounded-[8px] p-[18px];
            border: 0.5px solid #d6d6d6;
        }
        &__add-icon {
            @apply cursor-pointer absolute top-[65px] right-[10px] md:top-[15px] md:right-[24px];
        }
        &__information-container {
            @apply my-[10px] flex flex-col gap-[10px];
        }
        &__information-content {
            @apply grid gap-[10px] md:grid-cols-2 mt-[10px];
        }
        &__info {
            border: solid 1px var(--color-stroke-gray);
            @apply rounded-[8px] p-[10px];
        }

        &__item-file{
            @apply flex gap-[10px] text-blue-500;
        }

        &__item{
            @apply flex flex-col gap-[10px] mb-[10px];
        }

        &__title{
            @apply font-semibold;
        }

        &__alls{
            @apply flex flex-col gap-[20px];
        }


        &__add-footer{
            @apply w-full flex justify-end;
            &:deep(){
                .button__secondary{
                    @apply w-[120px];
                }
            }
        }

        &__divider{
            @apply text-slate-400;
        }

        &__adresse{
            @apply flex flex-col gap-[12px]
        }

        &__adresse-label{
            @apply font-semibold
        }
        &__adresse-label-container{
            @apply flex flex-col gap-[10px]
        }
    }
</style>
