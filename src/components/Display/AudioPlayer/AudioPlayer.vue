<template>
    <div class="audioPlayer">
        <AudioPlayer
            :option="{
                src: audioSrc,
                progressBarColor: primaryColor,
                indicatorColor: primaryColor,
            }"
            :class="audioSrc === '' ? 'disabled' : ''"
        >
        </AudioPlayer>
    </div>
</template>
<script lang="ts" setup>
    import AudioPlayer from 'vue3-audio-player';
    import 'vue3-audio-player/dist/style.css';
    import { ref } from 'vue';

    const props = defineProps({
        audioSrc: {
            type: String,
            default: '',
        },
    });

    const primaryColor = ref('var(--color-primary)');
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .audioPlayer {
        @apply w-full;
        &:deep() {
            .audio__player {
                @apply flex flex-row items-center gap-[9px];
            }
            .audio__player-play {
                @apply w-[28px] h-[28px];
                & > img {
                    @apply hidden;
                }
            }
            .audio__player-progress-container {
                @apply w-full flex flex-row items-center;
            }
            .audio__player-progress-wrap {
                @apply w-full mt-[4px] mx-[10px];
            }
            .audio__player-time {
                @apply m-0;
                span {
                    @apply text-grayIcon font-[300] text-[10px] whitespace-nowrap;
                }
            }
            .audio__player-play-icon {
                @apply static w-full h-full bg-primary cursor-pointer transition;
                &:hover {
                    @apply transition;
                    @include hoverButtonDark;
                }
                img {
                    filter: contrast(200%) invert(100%);
                    @apply object-cover w-full h-full;
                }
            }
            .audio__player-spin-anim {
                & + .audio__player-play-icon {
                    @apply bg-primary;
                }
            }
            .disabled {
                @apply opacity-30 pointer-events-none;
            }
        }
    }
</style>
