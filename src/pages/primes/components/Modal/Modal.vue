<template>
    <div class="primes-modal">
        <Modal
            :is-show-modal="isShow"
            @on-back="handleClose"
            :title="title"
        >
            <template #content>
                <a-tabs
                    v-model:active-key="activeKey"
                >
                    <a-tab-pane 
                        v-for="(item, index) in infos" 
                        :key="index"
                        :tab="item.label"
                    >
                        <Infos  
                            :items="item"
                            :data="props.data"
                        />
                    </a-tab-pane>
                </a-tabs>
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
import Modal from '@/components/Display/Modal/Modal.vue';
import { ref, watch } from "vue";
import { Tabs as ATabs, TabPane as ATabPane } from "ant-design-vue";
import { infos, } from "@/pages/primes/components/Modal/data";
import { useStore } from 'vuex';
import Infos from "@/pages/primes/components/Infos/Information.vue";


const props = defineProps({
    data : {
        type : Object,
        default : () => {}
    },
    isVisible : {
        type : Boolean,
        default : false,
    },
    title : {
        type : String,
        default : ""
    }
})

const isShow = ref<boolean>(props.isVisible);
const store = useStore();
const emit = defineEmits(['back']);
const activeKey = ref<number>(0);


watch(() => props.isVisible, (value) => {
    isShow.value = value;
   
}, {immediate : true, deep : true})

function handleClose(){
    isShow.value = !isShow.value;
    emit('back');
}


</script>

<style lang="scss" scoped>
.primes-modal{
    &:deep(){
        .ant-modal{
            @apply rounded-[20px];
        }
    }
   
}
</style>