<script lang="ts" setup>
import P from '@/components/Common/Paragraphe/Paragraphe.vue';
import Input from "@/components/Common/Input/Input.vue";
import Select from '@/components/Common/Select/Select.vue';
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import { details, menuList, room } from "@/pages/manageProperty/Inside/data";
import { ref, watch } from "vue";

const props = defineProps({
    idActive : {
        type : Number,
        required : true
    }
})

const emit = defineEmits(['getData']);
const paramsDetails = ref<any>({
      roomcount : 0,
      bedroomcount : 0,
      bathroomcount : 0,
      surface : 0,
      chambercaracteristics : []
})



function handleChange(value : any) : void{
      for(let i in value){
            if(i === 'roomcount'){
                  if(value[i] < paramsDetails.value.chambercaracteristics.length){
                        paramsDetails.value.chambercaracteristics.pop();
                  }
            }
            paramsDetails.value[i] = +value[i]
      }
      emit('getData', paramsDetails.value);
}

async function handleChangeSub(value : any, chamber : any) {
      for(let i in value){
            console.log(i);
            if(paramsDetails.value.chambercaracteristics.length < +chamber){
                  paramsDetails.value.chambercaracteristics.push({
                        surface : 0,
                        glassType : '',
                        lastRenovation : '',
                        heatingType : ''
                  })
            }
            paramsDetails.value.chambercaracteristics[+chamber - 1][i] = value[i]
      }
}

</script>

<template>
    <div class="inside inside__container">
        <div class="inside__header">
            <P>Intérieur</P>
            <hr class="inside__divider">
        </div>
        <div class="inside__content">
            <div class="" v-for="item in menuList" :key="item.id">
                  <P class="inside__title">{{item.title}}</P>
                  <div class="" v-for="(subItem,key) in item.item" :key="key+'e'">
                        <Input 
                              :label="subItem.label"
                              :name-input="subItem.name"
                              input-type="number"
                              :required="subItem.required"
                              :min="0"
                              @input="handleChange"
                        />
                  </div>
            </div>
            <div class="">
                  <div class="" v-for="(item, idItem) in paramsDetails.roomcount" :key="idItem">
                        <!-- <P class="inside__title">Chambre {{item}}</P> -->
                        <hr class="inside__divider">
                        <div class="inside__room-description">
                            <div class="inside__input-item" v-for="(roomItem, id) in room" :key="id">
                                <div 
                                    class=""
                                    v-if="roomItem.type=== 'number'"
                                >
                                    <Input 
                                        class="w-[100%]"
                                        :label="roomItem.label"
                                        :name-input="`${roomItem.name}`"
                                        :input-type="roomItem.type"
                                        @input="handleChangeSub($event, item)"
                                    />
                                </div>   
                                <div 
                                    class=""
                                    v-else-if="roomItem.type === 'select'"
                                >
                                    <Select 
                                          class="w-[100%]"
                                          :label="roomItem.label"
                                          :name="roomItem.name"
                                          :options="roomItem.subOptions"
                                          @change-select="handleChangeSub($event, item)"
                                    />
                                </div> 
                                <div 
                                    class=""
                                    v-else
                                >
                                    <InputDate 
                                          class="w-[100%]"
                                          :label="roomItem.label"
                                          :name="roomItem.name"
                                          @handle-date="handleChangeSub($event, item)"
                                          :max="true"
                                    />
                                </div>
                              </div>
                        </div>
                  </div>
            </div>

            <hr class="inside__divider">
            <div class="inside__details-container">
                <div 
                    v-for="item in details" :key="item.id"
                    class="inside__input" 
                >
                    <Input
                          :label="item.label"
                          :name-input="item.name"
                         
                          :input-type="item.type"
                          :required="item.required"
                          @input="handleChange"
                          :min="0"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.inside{
    &__container{
        @apply flex flex-col gap-[20px];
    }

    &__content{
        @apply flex flex-col gap-[10px];
    }

    &__header{
        @apply flex flex-col gap-[10px];
    }

    &__divider{
        @apply text-slate-300;
    }
    &:deep(){
        .custom-input__fields{
            @apply mb-[1px];
        }
        .ant-input{
            @apply h-[35px] rounded-[4px];
        }
    }

    &__title{
            @apply my-[10px] text-[14px];
            color: var(--color-primary);
      }
      &__details-container{
            @apply flex  gap-[24px] flex-wrap;
      }
      &__input{
            @apply flex md:flex-1 w-[100%] flex-col;
      }
      &__divider{
            @apply  mb-[18px];
      }

      &__room-description{
            @apply flex gap-[24px] flex-wrap flex-col md:flex-row;
      }
      &__input-item{
            @apply flex flex-1 ;
      }

      &:deep(){
        .inside__input-item{
            @apply flex-col;
        }
      }
}
</style>