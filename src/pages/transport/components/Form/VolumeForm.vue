<template>
    <div class="volume-form__container">
        <div class="volume-form__field">
            <Input 
                class="volume-form__input" 
                placeholder="m3" 
                label="Renseignez votre volume en metres cubes"
                name-input="volume"
                input-type="number"
                :value="storedData.volume"
                :unity="'m3'"
                @input="handleChange"
            />
            <div class="volume-form__icon">
                <InfoIcon class="icon" />
            </div>
        </div>
        <div class="volume-form__information">
            <span class="volume-form__table-title">Comment estimer mon volume ?</span>
            <div class="volume-form__table-container">
                <div class="table-sub-container">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">
                                    Superficie du logement
                                </th>
                                <th scope="col">
                                    Volume total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in surfaceVolumeDetails" :key="index"
                                :class="[index % 2 === 0 ? 'stroke-gray-background' : '']">
                                <td>
                                    {{ item.surface }}
                                </td>
                                <td>
                                    {{ item.volume }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <span class="volume-form__table-note">Vous pourrez affiner le volume avec le demenageur.</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import InfoIcon from '@/components/Icon/Info.vue';
import Input from '@/components/Common/Input/Input.vue';

import { useStore } from 'vuex';
import { ref, onMounted, computed } from 'vue';

interface IPairSurfaceVolume {
    surface: string,
    volume: string
}

const store = useStore();



const surfaceVolumeDetails = ref<Array<IPairSurfaceVolume>>(
    [
        {
            surface: 'moins de 30 m2',
            volume: 'de 10 a 20 m3'
        },
        {
            surface: 'entre 30 et 50  m2',
            volume: 'de 20 a 30 m3'
        },
        {
            surface: 'entre 50 et 80  m2',
            volume: 'de 30 a 40 m3'
        },
        {
            surface: 'entre 80 et 100  m2',
            volume: 'environ 50 m3'
        },
        {
            surface: 'superieur a 100  m2',
            volume: 'environ 80 et 100 m3'
        }
    ]
)

const emit = defineEmits(["required-field-filled"]);
const storedData = computed(() => store.getters["TransportModule/getObjectData"]);


onMounted(() => store.dispatch('TransportModule/setAnnouncementData', { isDimensionKnown: true }))

function handleChange(value: any) {
    store.dispatch('TransportModule/setObjectData', value);   
    checkRequiredField()
}

function checkRequiredField() {
    // const objectData =  store.getters["TransportModule/getObjectData"];
    storedData.value.volume ? emit('required-field-filled', true) : emit('required-field-filled', false);
}
</script>
<style lang="scss" scoped>
$color-primary: #949FB5; // the same value as --color-primary

.volume-form {
    &__container {
        @apply flex flex-col;
    }

    &__field {
        @apply flex flex-row;
    }

    &__icon {
        @apply w-1/5 flex items-center;

        @screen md {
            @apply w-1/12;
        }

        .icon {
            @apply w-6 h-6 mx-auto mt-4;

            @screen md {
                @apply mt-0;
            }
        }
    }

    &__table-note {
        @apply block;
        color: var(--color-gray-icon);
    }

    &__input {
        @apply w-4/5;

        @screen md {
            @apply w-11/12;
        }
    }

    &__table-title {
        @apply block font-semibold;
        color: var(--color-gray-icon);
    }

    &__table-container {
        @apply py-2 inline-block min-w-full;

        .table-sub-container {
            @apply overflow-hidden;
        }
    }
}

tr,
td,
table {
    @apply text-xs;
    color: var(--color-gray-icon);
    border-color: var(--color-stroke-gray);
}

table {
    @apply min-w-full border;

    th {
        @apply font-medium p-2 text-left;
    }

    td {
        @apply font-light p-2 whitespace-nowrap;
    }
}

.stroke-gray-background {
    background: rgba($color-primary, 0.25);
}
</style>
