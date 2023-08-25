<template>
    <div class="video">
        <Empty v-if="!videoLink"/>
        <div class="video__play">
            <iframe
                v-if="videoLink"
                class="video__iframe"
                height="360"
                :src="videoLink"
                title="Visite immobilière EN DRONE FPV !"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import CloseIcon from '@/components/Icon/Close.vue';
    import store from '@/store';
    import { computed, ref } from 'vue';
    import { Empty } from 'ant-design-vue';
    import { PropType } from 'vue';

    const props = defineProps({
        return : {
            type : Function as PropType<any>,
            default : ()=> null
        }
    })

    const emit = defineEmits(['return']);

    let videoLink = ref<string>('');
    const data = computed(
        () => store.getters['PropertyDetailModule/getPropertyDetail']
    );
    videoLink.value = data.value.data.linkVideos;
    console.log('video live data:', videoLink);

    function changeView(): void {
        emit('return');
    }
</script>

<style lang="scss" scoped>
    .video {
        @apply bg-white rounded p-2 mr-2 ml-2 mt-[10px];
        //responsive
        @apply lg:block lg:p-0;
        &__headVideo {
            @apply flex flex-row justify-between items-center mb-[10px];
        }
        &__title {
            @apply font-semibold text-sm;
        }
        &__play {
            margin-left: 1.25rem;
            margin-right: 1.25rem;
        }
        &__iframe {
            @apply w-full rounded h-[223px];
            //responsive
            @apply lg:h-[440px];
        }
    }
</style>
