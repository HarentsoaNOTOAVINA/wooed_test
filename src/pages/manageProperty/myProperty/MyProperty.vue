<script lang="ts" setup>
import Loader from '@/components/Common/Loader/Loader.vue';
import { ref, onMounted } from "vue";
import { useStore } from 'vuex';
import { Empty as AEmpty } from "ant-design-vue";
import { Avatar as AAvatar } from "ant-design-vue";
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import ListProducts from '@/components/section/ListProducts/ListProducts.vue';
import { useRouter } from 'vue-router';


const loading = ref<boolean>(false);
const store = useStore();
const listTheProperty = ref<any[]>([]);
const router = useRouter();

onMounted(async () => {
    await getAllProperty();
})

async function getAllProperty(){
    loading.value = true;
    const data = await store.dispatch('ManagePropertyModule/getAllProperty');
    listTheProperty.value = data;
    console.log(data);
    
    loading.value = false;
}

async function handleClick(data : any){
    await store.dispatch('ManagePropertyModule/detailsProperty', data)
    .then(() => {
        router.push(`/manage-property/details/${data.id}`)
    })
}

</script>

<template>
    <div class="my-property__container">
        <Loader v-if="loading" />
        <div class="" v-else>
            <a-empty 
                v-if="listTheProperty.length === 0"
                description="Vous n'avez pas encore de bien, veuillez en ajouter."
            />
            <div  v-else>
                <ListProducts
                    :DataCard="listTheProperty"
                    class="my-property__list-container"
                    @on-handle-detail="handleClick"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-property{
    &__container{
    }
    &__list-container{
        @apply w-[100%] grid sm:grid-cols-2 md:grid-cols-3;
    }
}
</style>