<script lang="ts" setup>
import { Checkbox as ACheckbox } from "ant-design-vue";

</script>

<template>
      <div class="checkbox">
            <a-checkbox>
                  <div class="checkbox__content">
                        <p>@</p>
                        <p>Checkbox</p>
                  </div>
            </a-checkbox>
      </div>
</template>

<style scoped lang="scss">
.checkbox{
      &:deep(){
            .ant-checkbox-wrapper{
                  @apply rounded-[4px] h-[72px] w-[110px] flex flex-col items-end px-1 cursor-pointer; 
                  border: 0.5px solid #14223C;
            }
            .ant-checkbox-wrapper span:first-child{
                  @apply w-[18px];
            }
            .ant-checkbox-wrapper span:nth-child(2){
                  @apply w-[100%]
            }
            .ant-checkbox:hover{
                  
            }
            .ant-checkbox:focus{
                  border: 0.5px solid #14223C;
            }
            .ant-checkbox .ant-checkbox-checked{
                  background-color: red;
            }
      }
      &__content{
            @apply flex flex-col items-center w-[100%] ;
      }
}
</style>