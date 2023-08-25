<template>
    <div>
        <div class="general__other-container">
            <div
                class="general__other-container-card"
                v-for="item in other"
                :key="item.id"
                :class="[
                checked.includes(item.id as never)
                    ? 'general__checked'
                    : '',
            ]"
                @click="checkItem(item.id as never)"
            >
                <div class="general__other-container-item">
                    <i :class="item.icon" />
                    <P> {{ item.name }}</P>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { FontAwesomePromise } from '@/composables/useFontAwesome';
    import { ref, computed, reactive, onMounted, watch, toRaw } from 'vue';
    import { useStore } from 'vuex';

    const store = useStore();
    const checked = ref([]);
    const other = ref<
        Array<{
            id: number | string;
            name: string;
            icon: string;
        }>
    >([]);
    const emit = defineEmits<{
        (e : "change" , payload : any) : void;
    }>()

    const props = defineProps({
        name : {
            type : String,
            default : "options" 
        }
    })

    onMounted(  async ()=>{
        await FontAwesomePromise
        store.dispatch('FindPropertyModule/getOptions');
    })

    function checkItem(item: never) {
        let content = checked.value.includes(item);
        if (!content) {
            checked.value.push(item);
        } else {
            checked.value = [...checked.value.filter((i) => i !== +item)];
        }
        emit('change', {[props.name] : checked.value.toString()});
    };

    watch(
        () => store.state.FindPropertyModule.options.data,
        function (newVal) {
            other.value = newVal;
            console.log('other : ', other.value);
        }
    );
</script>

<style lang="scss" scoped>
.general{
    &__other-container {
        @apply flex gap-[8px] flex-wrap;
    }
    &__other-container-card {
        @apply rounded-[4px] flex justify-center items-center  cursor-pointer bg-gray px-[10px] py-[8px];
    }
    &__other-container-item {
        @apply flex items-center justify-center gap-[6px];
        i {
            @apply text-primary text-[16px];
        }
    }
    &__checked {
        @apply bg-primary text-white border-none;
        i {
            @apply text-white;
        }
    }
}
</style>