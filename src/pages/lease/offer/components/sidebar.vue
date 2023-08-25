<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
import {ref, reactive} from 'vue';
import {sidemenu} from "@/pages/lease/offer/components/sideMenu";
const text = reactive({
    title: 'Mes offres de location',
});
const emit = defineEmits<{
    (e : "currentMenu", payload : any) :void
}>()
function handleMenuBtn(menu :  any){
    emit('currentMenu', menu);
}
</script>

<template>
    <div class="container-sidebar">
        <div class="container-title">
            <P class="text" type="bold">{{text.title}}</P>
        </div>
        <div class="container-action">
            <div v-for="(menu ) in sidemenu" :key="menu.id" class="action-btn" @click="handleMenuBtn(menu)">
                <P type="bold text">{{menu.label}}</P>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>

<style lang="scss" scoped>
.container {
    &-sidebar{
        @apply w-full mt-2 p-2 bg-white flex-col ;
        border-radius: 8px;
    }
    &-title{
        @apply py-3;
    }
    .text{
        @apply text-center;
        color: var(--color-gray-icon);
        text-align: center;
    }
    &-action{
        @apply w-full flex justify-between;
       
        .action{
            &-btn{
                @apply w-[45%] py-1;
                border: solid 0.5px var(--color-gray-icon);
                border-radius: 8px;
                cursor: pointer;
            }
        }
    }
}
@screen md{

    .container {
        &-sidebar{
            @apply w-[20%] mt-2 p-2 bg-white flex-col h-[70vh];
            border-radius: 8px;
        }
        &-title{
        }
        .text{
            @apply text-center;
            color: var(--color-gray-icon);
            text-align: center;
        }
        &-action{
            @apply w-full flex-col justify-between ;
           
            .action{
                &-btn{
                    @apply w-full py-4 my-2;
                    border: solid 0.2px var(--color-gray-icon);
                    border-radius: 8px;
                    cursor: pointer;
                }
                &-btn:hover{
                   background-color: rgba(0,0,0,0.1);
                   
                }
            }
        }
    }
}
</style>