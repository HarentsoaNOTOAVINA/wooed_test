<script lang="ts" setup>
import TimePicker from "ant-design-vue/lib/time-picker";
import Paragraph from '@/components/Common/Paragraphe/Paragraphe.vue'

const props = defineProps({
    label : {
        type : String,
        default : ""
    },
    name : {
        type : String,
        default : ""
    },
    placeholder : {
        type : String,
        default : ""
    },
    disabled : {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['change'])

function handleChange(e : any, name : any){
    const time = `${e.$H < 10 ? "0"+e.$H : e.$H}:${e.$m < 10 ? "0"+e.$m : e.$m}:${e.$s < 10 ? "0"+e.$s : e.$s}`;
    emit('change', {[name] : time});
}

</script>

<template>
    <div class="time-picker" id="timePicker">
        <Paragraph v-if="props.label">{{props.label}}</Paragraph>
        <TimePicker
            :name="props.name"
            :placeholder="props.placeholder"
            :disabled="props.disabled"
            format="HH:mm"
            @change="handleChange($event, props.name)"
        />

    </div>
</template>

<style lang="scss" scoped>
.time-picker {
    &:deep() {
        .ant-picker {
            width: 100%;
    border-radius: 4px;
    height: 38px;
        }
    }
}
</style>