<template>
    <div>
        <Input label="Titre de l'évènement" class="input-time" :disabled="!props.editMode" :vmodel="data.title" name-input="title" @input="handleChange" />
        <InputDate label="Date" class="input-time" name="date" :disabled="!props.editMode" :placeholder="formatDate(data.start)" @handle-date-format="handleChange" />
        <div v-if="!props.data.allDay" class="event-modal__inputs">
            <TimePicker label="Heure de début" :disabled="!props.editMode" class="input-time" :placeholder="getTimeFromDate(data.start)" :name="'startTime'" @change="handleChange" />
            <TimePicker label="Heure de fin" :disabled="!props.editMode" class="input-time" :placeholder="getTimeFromDate(data.end)" :name="'endTime'" @change="handleChange" />
        </div>
        <Input v-if="editMode || data.place" label="Lieu" class="input-item" :disabled="!props.editMode" :vmodel="data.place" name-input="place" @input="handleChange" />
    </div>
</template>
<script lang="ts" setup>
import Input from "@/components/Common/Input/Input.vue";
import InputDate from "@/components/Common/InputDate/InputDate.vue";
import TimePicker from '@/components/Common/TimePicker/TimePicker.vue';

const emit = defineEmits(["handle-change"]);
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    editMode: {
        type: Boolean,
        default: true
    }
})

function handleChange(value: any) {
    emit("handle-change", value);
}

function getTimeFromDate(dateString: string) {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatDate(dateString?: string) {
  if (dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }
}

</script>
<style lang="scss" scoped>
.event-modal {
    &__inputs {
        @apply flex flex-row gap-x-4;
        &:deep() {
            .paragraphe__normal {
                @apply font-semibold mb-2;
            }
        }
    }
}

.input-time {
    @apply mb-2;
}
</style>