<script lang="ts" setup>
import { ref, defineEmits } from "vue";
import Menu from '@/components/Icon/Menu.vue'
import AMenu from "ant-design-vue/lib/menu";
import ASubMenu from 'ant-design-vue/lib/menu/src/SubMenu';
import AMenuItem from "ant-design-vue/lib/menu/src/MenuItem";

let show = ref<Boolean>(false);
let oldClass = ref<String>('mc__content-menu')
let none = ref<String>('mc__none')
let activeKey=ref<Array<String>>(["s-00"])
const title = ref<String>("Menu");

const emit = defineEmits(['component'])

defineProps<{
      data : any,
      active : String
}>()

function setShow(): void {
      show.value = !show.value;
}
function selectedKeys(item : any) : void{
      activeKey.value = [item.id];
      title.value = item.label      
      emit('component', item.component);
}

</script>


<template>
      <div class="mc__container">
            <div class="mc__content">
                  <div class="mc__menu" @click="setShow">
                        <Menu />
                        <p>{{title}}</p>
                  </div>
                  <div :class="[ oldClass, show ? none : '']">
                        <a-menu 
                              mode="inline"
                              :selectedKeys="(activeKey as any)"
                              theme="light"
                        >
                              <template v-for="item in data" :key="item.id">
                                    <a-menu-item :key="item.id" v-if="!item.subMenu" @click="selectedKeys(item)">
                                          <template #icon>
                                                <component :is="item.icon" /> &nbsp;
                                          </template>
                                          {{item.label}}
                                    </a-menu-item>
                                    <a-sub-menu v-else>
                                          <template #icon>
                                                <component :is="item.icon" /> &nbsp;
                                          </template>
                                          <template #title>
                                                {{item.label}}
                                          </template>
                                          <a-menu-item v-for="mItem in item.subMenu" :key="mItem.id" @click="selectedKeys(mItem)">
                                                {{mItem.label}}
                                          </a-menu-item>
                                    </a-sub-menu>
                              </template>
                        </a-menu>
                  </div>
            </div>
      </div>
</template>

<style scoped lang="scss">
.mc {
      &__container {
            @apply bg-[white] p-[12px] rounded-[8px] max-w-[315px];
      }

      &__content {
            @apply flex flex-col;
      }

      &__menu {
            @apply cursor-pointer max-w-[20px] flex justify-center sm:ml-[10px] md:ml-[20px] md:hidden;
      }
      &__content-menu{
            @apply mt-[10px];
      }
      &__none{
            display: none;
      }
      &__m-none{
            @apply md:hidden;
      }
      &:deep(){
            span.ant-menu-title-content{
                  color: rgb(207, 14, 14);
                  background-color: #F2F2F2;
            };
            .ant-menu-submenu{
                  background-color: red;
            }
      }

}

.bg-btn {
      background-color: var(--color-gray);
}
</style>