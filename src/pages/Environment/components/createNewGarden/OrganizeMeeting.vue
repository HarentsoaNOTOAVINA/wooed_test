<template>
    <div class="organizerMeeting">
        <Title type="h3" label="Organiser une réunion (visite du terrain, lancement du projet…)"
            class="organizerMeeting__title" />
        <hr class="__hr" />
        <div class="organizerMeeting__form">
            <div class="organizerMeeting__form-wrap">
                <label>
                    <span>Je souhaite organiser une :</span>
                </label>
                <div class="organizerMeeting__content">
                    <span>
                        Réunion visite de terrain, une réunion de lancement du projet
                    </span>
                </div>
            </div>
            <Select
                label="En compagnie de"
                mode="multiple"
                name="participants"
                placeholder="Select"
                :options="actorList"
                @change-select="handleChange"
                @change-deselect="handleRemove"
            />
            <AddIncremented
                label="Aux date suivantes"
                increment-type="agenda"
                name="agenda"
                @change="handleAgenda"
                @remove="handleRemove"
            />
            <Button type="primary" class="mx-auto my-4" :disabled="!formIsValid" @click="submitForm">
                Valider
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import Title from '@/components/Common/Title/Title.vue';
import AddIncremented from '@/components/Display/AddIncremented/AddIncremented.vue';
import Select from '@/components/Common/Select/Select.vue';
import Button from '@/components/Common/Button/Button.vue';

import { ref, computed, watch } from 'vue';

import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

interface Option {
    value: string;
    label: string;
}

const store = useStore();
const route = useRoute();
const router = useRouter();

const currentProperty = route.params.id;

const collectiveGarden = ref<any>();
const surveyCreated = ref<boolean>(false);

const actorList = computed(() => {
    collectiveGarden.value = store.getters["CollectiveGardenModule/getCollectiveGardenData"];
    return handleOptionsConsistency(collectiveGarden.value.actors);
})

const formIsValid = computed(() => {
    let reunionData = store.getters["CollectiveGardenModule/getReunionData"];
    let reunionDates = store.getters["CollectiveGardenModule/getReunionDates"];
    const validData = Object.keys(reunionData.invitation).length !== 0;
    if (reunionDates.length >= 1 && validData) return true
    else return false;
})

watch(() => surveyCreated.value,
    async (value) => {
        if (value) await postReunionInvitation();
    },
    { immediate: true, deep: true }
)

function handleOptionsConsistency(actors: any) {
    let result : Option[] = [];
    if (Array.isArray(actors) && actors.length >=1) actors.forEach((actor: any) => result.push({ value: actor.id, label: actor.name }));
    return result;
}

function handleAgenda(value: any) {
    let key = Object.keys(value)[0];
    let index : string | number | undefined = undefined;
    const isDate = key.includes('inputDate');
    const isTime = key.includes('timePicker');
    const match = key.match(/\d+/);
    if (match !== null) {
        index = match[0];
        index = parseInt(index);
    }

    isDate
        ? store.commit('CollectiveGardenModule/setReunionDates', { date: value[key], index: index })
        : isTime
            ? store.commit('CollectiveGardenModule/setReunionDates', { time: value[key], index: index })
            : console.error("unknown error happen!");
}

function handleRemove(value: any) {
    value.hasOwnProperty('agenda')
        ? store.commit('CollectiveGardenModule/removeReunionDate', value.agenda)
        : value.hasOwnProperty('participants')
            ? store.commit('CollectiveGardenModule/removeParticipant', value.participants)
            : console.error("unknown issue happen!");
}

function handleChange(value: any) {
    let participants : any[] = [];

    value.participants.forEach((id: number) => {
        let participant = getParticipantDetails(id);
        participants.push(participant);
    });

    store.commit('CollectiveGardenModule/updateReunionData', { invitation: { participants: participants } });                                                                                                            
}

function getParticipantDetails(id: number) {
    let actor = collectiveGarden.value.actors.find((element: any) => element.id === id);
    return { name: actor.name, telephone: actor.telephone, email: actor.email, role: actor.function };
}

async function submitForm() {
    let dateList = store.getters["CollectiveGardenModule/getReunionDates"];
    dateList.forEach((date: any) => delete date.index);

    let payload = {
        title: "Visite de terrain",
        dates: dateList,
        place: "",
        description: "Réunion visite de terrain, une réunion de lancement du projet",
        collectiveGarden: collectiveGarden.value.id
    }

    store.commit("CollectiveGardenModule/updateReunionData", { meeting: payload });
    surveyCreated.value = await store.dispatch("CollectiveGardenModule/createSurvey");
}

async function postReunionInvitation() {
    let success = await store.dispatch("CollectiveGardenModule/postReunionInvitation");
    if (success) {
        surveyCreated.value = false; // reinitiate surveyCreated value to avoid circular execution
        router.push({ name: 'environment-comp', params: { id: currentProperty, feature: 'jardin-collectif' } })
    } 
}
</script>

<style lang="scss" scoped>
@import '@/style.scss';

.organizerMeeting {
    @apply flex flex-col gap-[24px];

    &__title {
        @media (max-width: 575px) {
            @apply hidden;
        }

        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__items {
        @apply flex flex-col gap-[24px];
    }

    &__form {
        @apply flex flex-col gap-[24px];

        &:deep() {

            .custom-input__fields,
            .custom-select__wrapper {
                @apply mb-0 w-full;
            }

            .date__space {
                gap: 0 !important;
            }

            .date__label {
                @apply mb-[10px];
            }

            label {
                @apply font-[600] text-black;
            }
        }

        &-item {
            @apply flex items-center gap-[14px];

            .fieldDate {
                &:deep() {
                    .date__label {
                        @apply hidden;
                    }
                }

                &-add {
                    @apply h-[22px] w-[22px] flex justify-center items-center rounded-full bg-gray;
                    @include hoverButtonDark;
                }
            }
        }

        &-wrap {
            @apply flex flex-col gap-[10px];
        }
    }

    &__content {
        @apply p-[14px] bg-gray rounded-[8px] text-grayIcon;
    }
}

.__hr {
    @apply text-gray w-full;
}

// .ant-space-item {
//     &:deep() {
//         @apply hidden;
//     }
// }
</style>
