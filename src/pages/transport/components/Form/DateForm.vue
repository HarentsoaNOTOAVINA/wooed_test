<template>
    <div class="departure-date__inputs">
        <InputDate 
            label="Entre le"
            name="startingDate" 
            :min="true"
            :placeholder="props.announcementData.startingDate"
            @handle-date-format-en="handleChange"
        />
        <InputDate 
            label="Et le"
            name="endingDate" 
            :min="true" 
            :placeholder="props.announcementData.endingDate"
            @handle-date-format-en="handleChange"
        />
    </div>
</template>
<script lang="ts" setup>
import InputDate from '@/components/Common/InputDate/InputDate.vue';

import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
    announcementData: {
        type: Object,
        default: {}
    }
});

const emit = defineEmits(["store-announcement-data"]);

function handleChange(value: any) {
    emit("store-announcement-data", value);
}

</script>
<style lang="scss" scoped>
.departure-date {

    &__inputs {
        @apply flex gap-x-2;
    }
}

.__hr {
    @apply block my-4 text-gray;
}
</style>