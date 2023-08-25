<template>
    <div class="info">
        <!-- <span class="info__title">Description</span> -->
        <div class="info__txtInfo">
            <div class="info__detail">
                <Paragraphe type="bold" is="p">{{text.title}}</Paragraphe>
                <Paragraphe is="p">{{info.details}}</Paragraphe>
            </div>
            <Divider class="divider"/>
            <div class="info__detail">
                <Paragraphe type="bold" is="p">Equipement pour la vie quotidienne </Paragraphe>
                <Paragraphe is="p">Aucune Equipement</Paragraphe>
            </div>
            <Divider class="divider"/>
            <div class="info__txt">
                <span class="leftTxt">Cadastre</span>
                <span class="rightTxt" data-test="cadastrePrice">{{info.cadastre || undefinedInfo}}</span>
            </div>
            <div class="info__txt">
                <span class="leftTxt">Revenu cadastral</span>
                <span class="rightTxt" data-test="rvCadastrePrice">{{info.cadastralreturn || undefinedInfo}}</span>
            </div>
            <div class="info__txt">
                <span class="leftTxt">Réference</span>
                <span class="rightTxt" data-test="reference">{{info.reference || undefinedInfo}}</span>
            </div>
            <div class="info__txt">
                <span class="font-semibold">Résultat PEB</span>
            </div>
            <div class="info__pebTxt">
                <div class="info__txt lg:w-[50%]">
                    <span class="leftTxt">Energie Primaire</span>
                    <span class="rightTxt" data-test="energiePrimaire"
                        >{{info.primaryenergy || undefinedInfo}}</span
                    >
                </div>
                <div class="info__txt lg:w-[50%]">
                    <span class="leftTxt lg:ml-[18px]">Energie Primaire</span>
                    <span class="rightTxt">{{info.primaryenergy || undefinedInfo}}</span>
                </div>
            </div>
            <PebG />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import PebG from '@/components/Icon/PebG.vue';
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import { reactive,computed, ref } from 'vue';
    import { Store, useStore} from 'vuex';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import { Divider } from 'ant-design-vue';
    const store: Store<any> = useStore();
    const text = reactive({
        title : "Desrcriptif"
    });

    let info = ref<any>();
    let undefinedInfo = 'Non défini'
    // onMounted(async () => {
    // });

        
    const data = computed(
        () => store.getters['PropertyDetailModule/getPropertyDetail']
    );
    info.value = data.value.data;
    
    console.log(info.value)
    // console.log("info:",info.value)
    const emit = defineEmits<{
        (e: 'hideInfo'): void;
    }>();

    function back(): void {
        console.log('second');
        emit('hideInfo');
    }
</script>

<style lang="scss" scoped>
    .info {
        background-color: white;
        @apply flex flex-col mx-[10px] p-2;

        &__title {
            @apply font-semibold text-sm;
        }
        &__txtInfo {
            background-color: var(--color-gray);
            @apply w-full p-4 rounded-lg mt-[18px];
            // @apply bg-[var(--color-gray)];
            //responsive
            @apply lg:w-full;
        }
        &__txt {
            @apply flex justify-between  mb-[18px];
        }
        .leftTxt {
            @apply text-sm leading-5;
        }
        .rightTxt {
            font-family: 'Montserrat';
            @apply font-semibold text-sm leading-[17px];
        }
        &__pebTxt {
            //responsive
            @apply lg:flex lg:flex-row lg:items-center justify-center;
        }
        &__detail {
            p {
                &:first-child {
                    margin-bottom: 10px;
                }
            }
        }
        .divider {
            border-color: #fff;
        }
    }
</style>
