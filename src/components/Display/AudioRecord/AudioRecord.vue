<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import { computed, onMounted, ref, watch } from 'vue';

    import { AudioRecorder as AR } from '@/utils/audio_recorder/audio_recorder';
    import { getBase64 } from '@/utils/Readfile/ReadFile';
    import AudioPlayer from '../AudioPlayer/AudioPlayer.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { Popconfirm as APopconfirm } from 'ant-design-vue';

    interface TypesAudioRecorder {
        start: Function;
        stop: Function;
        stopStream: Function;
        cancel: Function;
        resetRecordingProperties: Function;
        streamBeingCaptured?: any;
        mediaRecorder?: MediaRecorder | null;
        audioBlobs?: Array<any>;
    }
    const recordingStatus = ref<'START' | 'STOP'>('STOP');
    const audioURL = ref<string>('');
    const persistedAudioAsBlob = ref<any>('');
    const recordingStatusMsg = computed(() => {
        switch (recordingStatus.value) {
            case 'STOP':
                return "Commencer l'enregistrement";
            case 'START':
                return 'Enregistrement en cours...';
        }
    });

    let isShow = ref<boolean>(false);

    const audioRecorder = ref<TypesAudioRecorder | null>(null);
    const errorMsg = ref<string>('');
    const base64File = ref<any>();
    const audioSave = ref<any>(null);

    const emit = defineEmits<{
        (e: 'on-save-record', v: any): void;
        (e: 'on-delete-record', v: any): void;
        (e: 'on-delete', v: any): void;
    }>();

    const props = defineProps({
        file: {
            type: Object,
            default: () => {},
        },
        index: {
            type: Number,
            required: true,
        },
        typeFile: {
            type: String,
            default: 'Base64'
        },
    });

    watch(
        () => isShow.value,
        (v) => {
            if (v === false && audioURL.value) {
                URL.revokeObjectURL(audioURL.value);
                audioURL.value = '';
            }
        }
    );

    watch(
        () => props.file,
        (v) => {
            console.log(v, 'props.FILEEEEE');
        },
        { immediate: true, deep: true }
    );

    watch(
        () => props.file.soundFile,
        (v) => {
            if (v) {
                persistedAudioAsBlob.value = v
                audioSave.value = URL.createObjectURL(persistedAudioAsBlob.value);
            }
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        initAudioRecorder();
        if (props.typeFile !== 'Base64') {
            transformToBase64();
        }
    });

    function initAudioRecorder() {
        audioRecorder.value = AR;
    }
    function onOpenModal() {
        isShow.value = !isShow.value;
    }

    function cancelAudioRecording() {
        isShow.value = false;
        if (recordingStatus.value === 'START') {
            audioRecorder.value?.cancel();
            recordingStatus.value = 'STOP';
            persistedAudioAsBlob.value = null;
        }
        if (audioURL.value) {
            deleteCurrentRecord();
        }
    }

    function startAudioRecording() {
        if (window.innerWidth < 1024) {
            // !!(window as any).flutter_inappwebview &&
            //     (window as any).flutter_inappwebview.callHandler('micro');
                !!(window as any).micro &&
          (window as any).micro.postMessage();
        }

        audioRecorder.value
            ?.start()
            .then(() => {
                recordingStatus.value = 'START';
            })
            .catch((err: any) => {
                console.log(err.message, 'ERROR');
                if (err.message.includes('NOT_SUPPORTED')) {
                    errorMsg.value =
                        "Cette fonctionnalité n'est pas supportée par votre navigateur/appareil";
                } else {
                    _errorCatching(err.name);
                }
            });
    }

    function stopAudioRecording() {
        audioRecorder.value
            ?.stop()
            .then((audioAsBlob: any) => {
                persistedAudioAsBlob.value = audioAsBlob;
                audioURL.value = URL.createObjectURL(audioAsBlob);
                recordingStatus.value = 'STOP';
                // console.log(audioURL.value, 'stop', props.index);
            })
            .catch((err: { name: string }) => {
                switch (err.name) {
                    case 'InvalidStateError': //error from the MediaRecorder.stop
                        errorMsg.value = 'An InvalidStateError has occured.';
                        break;
                    default:
                        'An error occured with the error name ' + err.name;
                        errorMsg.value =
                            'An error occured with the error name ' + err.name;
                }
            });
    }

    function _errorCatching(errorName: string) {
        switch (errorName) {
            case 'AbortError': //error from navigator.mediaDevices.getUserMedia
                errorMsg.value = 'An AbortError has occured.';
                break;
            case 'NotAllowedError': //error from navigator.mediaDevices.getUserMedia
                errorMsg.value =
                    'A NotAllowedError has occured. User might have denied permission.';
                break;
            case 'NotFoundError': //error from navigator.mediaDevices.getUserMedia
                errorMsg.value = 'A NotFoundError has occured.';
                break;
            case 'NotReadableError': //error from navigator.mediaDevices.getUserMedia
                errorMsg.value = 'A NotReadableError has occured.';
                break;
            case 'SecurityError': //error from navigator.mediaDevices.getUserMedia or from the MediaRecorder.start
                errorMsg.value = 'A SecurityError has occured.';
                break;
            case 'TypeError': //error from navigator.mediaDevices.getUserMedia
                errorMsg.value = 'A TypeError has occured.';
                break;
            case 'InvalidStateError': //error from the MediaRecorder.start
                errorMsg.value = 'An InvalidStateError has occured.';
                break;
            case 'UnknownError': //error from the MediaRecorder.start
                errorMsg.value = 'An UnknownError has occured.';
                break;
            default:
                errorMsg.value =
                    'An error occured with the error name ' + errorName;
        }
    }

    function deleteCurrentRecord() {
        URL.revokeObjectURL(audioURL.value);
        audioURL.value = '';
        if (persistedAudioAsBlob.value) {
            persistedAudioAsBlob.value = null;
            audioSave.value = null;
            emit('on-delete-record', persistedAudioAsBlob.value);
        }
    }

    function saveCurrentRecord() {
        if (persistedAudioAsBlob.value) {
            emit('on-save-record', persistedAudioAsBlob.value);
            const audioBlob = persistedAudioAsBlob.value;
            const audioSaveURL = URL.createObjectURL(audioBlob);
            isShow.value = false;
            audioSave.value = audioSaveURL;
        }
    }

    async function transformToBase64() {
        if (typeof props.typeFile === 'object') {
            base64File.value = await getBase64(props.typeFile);
        }
    }

    function handleDelete(index: number) {
        emit('on-delete', index);
    }
</script>

<template>
    <div class="record-image__container">
        <div class="record-image__card">
            <figure class="record-image__card__img">
                <img
                    v-if="props.typeFile === 'Base64'"
                    :src="props.file?.urlImg"
                    alt="image-bien"
                />
                <img v-else :src="base64File" alt="image-bien" />
                <!-- <img :src="image" alt=""/> -->
            </figure>
            <template v-if="audioSave">
                <div class="record">
                    <Icon icon-name="Microphone" @click="onOpenModal" />
                    <AudioPlayer :audio-src="audioSave" />
                    <div class="audio__play__del-btn" title="Supprimer">
                        <a-popconfirm
                            title="Voulez-vous vraiment supprimer cet enregistrement"
                            ok-text="Oui"
                            cancel-text="Non"
                            @confirm="deleteCurrentRecord"
                        >
                            <Icon icon-name="deleteRoudedBG" />
                        </a-popconfirm>
                    </div>
                </div>
            </template>
            <div v-else class="record" @click="onOpenModal">
                <!-- <template v-if="props.file && !!props.file.audio">
                    <AudioPlayer :audio-src="audioURL" />
                </template> -->
                <div class="action-btn">
                    <Icon icon-name="Microphone" />
                    <Loader
                        v-if="recordingStatus === 'START' && isShow === false"
                        class="spin-loader"
                    />
                </div>
                <Paragraphe>Ajouter un commentaire vocal</Paragraphe>
            </div>
        </div>
        <div @click="handleDelete(props.index)" class="record-image__delete">
            <Icon icon-name="deleteRoudedBG" />
        </div>
        <Modal
            :is-show-modal="isShow"
            @on-back="onOpenModal"
            title="Ajouter un commentaire vocal"
        >
            <template #content>
                <div class="add">
                    <!-- control de l'enregistrement -->
                    <div>{{ recordingStatusMsg }}</div>

                    <div class="add__recording">
                        <div
                            class="action-btn action-btn--close"
                            @click="cancelAudioRecording"
                            title="Annuler"
                        >
                            <Icon icon-name="Close" />
                        </div>
                        <div
                            class="action-btn action-btn--start"
                            :class="{
                                'action-btn--start--disabled':
                                    recordingStatus === 'START',
                                'action-btn--start--enabled':
                                    recordingStatus === 'STOP',
                            }"
                            @click="
                                () => {
                                    recordingStatus === 'STOP'
                                        ? startAudioRecording()
                                        : null;
                                }
                            "
                            :title="
                                audioURL
                                    ? 'Enregistrer à nouveau'
                                    : 'Enregistrer'
                            "
                        >
                            <Icon
                                v-if="recordingStatus === 'STOP'"
                                icon-name="Recording"
                            />
                            <Icon v-else icon-name="Microphone" />
                            <Loader
                                v-if="recordingStatus === 'START'"
                                class="spin-loader"
                            />
                        </div>
                        <div
                            class="action-btn action-btn--stop"
                            :class="{
                                'action-btn--stop--enabled':
                                    recordingStatus === 'START',
                                'action-btn--stop--disabled':
                                    recordingStatus === 'STOP',
                            }"
                            @click="
                                () => {
                                    recordingStatus === 'START'
                                        ? stopAudioRecording()
                                        : null;
                                }
                            "
                            title="Stop"
                        >
                            <Icon icon-name="Stop" />
                        </div>
                    </div>
                    <transition name="fade-audio" mode="out-in">
                        <small v-if="errorMsg" class="error__msg">
                            {{ errorMsg }}
                        </small>
                    </transition>
                    <transition name="fade-audio" mode="out-in">
                        <div v-if="audioURL" class="audio__play">
                            <!-- <audio controls :src="audioURL"></audio> -->
                            <AudioPlayer :audio-src="audioURL" />
                            <div class="audio__play__action">
                                <div
                                    class="audio__play__del-btn"
                                    title="Supprimer"
                                >
                                    <Icon
                                        icon-name="deleteRoudedBG"
                                        @click="deleteCurrentRecord"
                                    />
                                </div>
                                <div
                                    class="audio__play__save-btn"
                                    title="Sauvegarder"
                                >
                                    <Icon
                                        icon-name="Save"
                                        @click="saveCurrentRecord"
                                    />
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </template>
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/style.scss';
    .fade-audio-enter-active,
    .fade-audio-leave-active {
        transition: all 0.4s ease;
        visibility: hidden;
        transition-delay: 0.1s;
    }

    .fade-audio-enter-from,
    .fade-audio-leave-to {
        opacity: 0;
        visibility: visible;
    }
    .error__msg {
        color: salmon;
    }
    .action-btn {
        @apply relative;
        &:deep() {
            & > svg {
                @apply relative z-[2];
            }
            .custom-loader {
                @apply bg-transparent;
                svg {
                    @apply w-[56px] h-[57px];
                    path {
                        @apply fill-primary;
                    }
                }
            }
        }
        &:hover {
            cursor: pointer;
        }
        &--stop,
        &--start {
            cursor: pointer;
            &--enabled {
                &.action-btn--stop {
                    &:hover {
                        &:deep() {
                            .icon {
                                rect {
                                    fill: darken(
                                        $color: rgba(0, 0, 0, 0.2),
                                        $amount: 0
                                    );
                                }
                            }
                        }
                    }
                    &:deep() {
                        .icon {
                            rect {
                                @apply fill-gray;
                            }
                            path {
                                fill-opacity: 1;
                                @apply fill-primary;
                            }
                        }
                    }
                }
                &.action-btn--start {
                    &:hover {
                        &:deep() {
                            .icon {
                                rect {
                                    fill: darken(
                                        $color: rgb(202, 101, 81),
                                        $amount: 1
                                    );
                                }
                            }
                        }
                    }
                }
            }
            &--disabled {
                @apply pointer-events-none cursor-default;
                &:deep() {
                    .icon {
                        rect {
                            @apply fill-gray;
                        }
                        path {
                            @apply fill-primary;
                        }
                    }
                }
            }
        }
        &--close {
            @apply bg-gray w-[28px] h-[28px] rounded-full flex items-center justify-center;
            &:hover {
                @include hoverButtonDark;
                &:deep() {
                    .icon {
                        path {
                            @apply fill-primary;
                        }
                    }
                }
            }
        }
        &--start {
            &:deep() {
                .icon {
                    svg {
                        @apply w-[40px] h-[40px];
                    }
                }
            }
        }
        &--stop {
            &:deep() {
                .icon {
                    path {
                        @apply fill-grayBlack;
                    }
                }
            }
        }
    }
    .record-image {
        &__container {
            @apply relative;
        }
        &__card {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 6px;
            gap: 10px;
            border: 1px solid var(--color-stroke-gray);
            border-radius: 8px;
            width: 300px;
            height: auto;
            &__img {
                @apply w-full;
                img {
                    @apply w-full h-[200px] object-cover;
                    border-radius: 4px;
                }
            }
            .record {
                @apply w-full;
                audio {
                    width: 300px;
                    height: 30px;
                }
            }
        }
        &__delete {
            @apply cursor-pointer absolute top-[10px] right-[10px];
            &:hover {
                :deep(.icon) {
                    svg {
                        path {
                            @apply fill-redIcon;
                        }
                        rect {
                            @apply fill-white;
                        }
                    } 
                }
            }
        }
    }

    .record {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        &:deep() {
            p {
                font-weight: 400;
                font-size: 12px;
                color: var(--color-primary);
            }
        }
    }
    .add {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 14px;
        gap: 10px;
        &__recording {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 14px;
        }
    }
    .audio__play {
        @apply w-full;
        &__action {
            @apply flex items-center gap-x-[5px];
        }
        @apply flex items-center gap-[5px];
        &__save-btn {
            @apply w-[28px] h-[28px] flex items-center justify-center rounded-full bg-gray;
            @include hoverButtonDark;
            &:deep() {
                .icon {
                    svg {
                        @apply w-[14px];
                        fill: var(--color-gray-icon);
                    }
                }
            }
        }
        &__del-btn {
            &:hover {
                &:deep() {
                    .icon {
                        path {
                            @apply fill-secondary;
                        }
                        rect {
                            fill: darken(
                                $color: rgba(0, 0, 0, 0.2),
                                $amount: 0
                            );
                        }
                    }
                }
            }
        }
        &__save-btn,
        &__del-btn {
            &:hover {
                cursor: pointer;
            }
            &:deep() {
                svg {
                    @apply w-[28px] h-[28px];
                }
            }
        }
    }
</style>
