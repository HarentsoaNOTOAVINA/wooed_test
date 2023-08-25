<template>
    <div class="document">
        <div class="document__docList">
            <Empty v-if="documents.length == 0" />
            <div
                v-for="(item, index) in documents"
                :key="index"
                class="document__file"
                @click="openFile"
            >
                <a target="_blank" :href="documents">
                    <DocPdf class="w-fit" />
                    <span class="w-full text-center">{{ documents.path }}</span>
                </a>
            </div>
        </div>
        
        <!-- <pdf src="../../../../assets/cv.pdf"/> -->
        <router-view />
    </div>
</template>

<script lang="ts" setup>
    import CloseIcon from '@/components/Icon/Close.vue';
    import DocPdf from '@/components/Icon/DocPdf.vue';
    import { PropType } from 'vue';
    import { computed, ref } from 'vue';
    import { Empty } from 'ant-design-vue';
    import { useStore } from 'vuex';

    const store = useStore();

    
    const props = defineProps({
        
        return : {
            type : Function as PropType<any>,
            default : ()=> null
        }
    });

    
    // import PdfViewer from '@/components/Common/PdfViewer/PdfViewer.vue';
    // @ts-ignore
    // import pdf from 'vue-pdf';

    const data = computed(
        () => store.getters['PropertyDetailModule/getPropertyDetail']
    );
    let documents = ref<any>();
    documents.value = [...data.value.data.documents];
    // documents.value = '@/static/cv.pdf';
    // console.log('documents:', documents.value);

    // if (documents.value.length == 0) {
    //     console.log('null');
    // } else {
    //     console.log('tsy vide');
    // }

    const emit = defineEmits(['return']);
    function changeView(): void {
        emit('return');
    }

    const docList: Array<any | object> = [
        {
            id: 1,
            title: 'A',
        },
        {
            id: 2,
            title: 'B',
        },
        {
            id: 3,
            title: 'C',
        },
        {
            id: 4,
            title: 'D',
        },
        {
            id: 5,
            title: 'E',
        },
    ];
    function openFile(): void {
        console.log('openfile');
    }
</script>

<style lang="scss" scoped>
    .document {
        @apply flex flex-col bg-white rounded p-2;
        //responsive
        @apply lg:block lg:p-0;

        &__headDoc {
            @apply flex flex-row justify-between items-center mb-[10px];
        }
        &__docList {
            @apply flex flex-row flex-wrap justify-center gap-[10px];
            //responsive
            @apply lg:mx-5;
        }
        &__file {
            @apply flex flex-col items-center;
            a {
                @apply w-max scale-[1] transition-transform;
                &:hover {
                    @apply scale-[1.1] transition-transform;
                }
            }
            svg {
                @apply h-[80px];
            }
        }
        &__titleDoc {
            @apply font-semibold text-sm;
        }
    }
</style>
