<script lang="ts" setup>
    import { RadioGroup as ARadioGroup, Radio as ARadio } from 'ant-design-vue';

    const props = defineProps({
        radioDefaultCheck: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        element: {
            type: Array<any>,
            default() {
                return [];
            },
        },
        name: {
            type: String,
            default: '',
        },

        valueNumber: {
            type: Number,
            default: 0,
        },

        checkedNumber: {
            type: Boolean,
            default: true,
        },
        typeAction : {
            type : String,
            default : ''
        },
        vote : {
            type : Object,
            default : {}
        },
        typeView: {
            type: String,
            default: "community"
        }
    });

    const emit = defineEmits<{
        (event: 'get-radio-input', e: any): void;
    }>();

    const handleRadio = (value: any) => {
        emit('get-radio-input', value);
    };
    const handleFocus = (value: any) => {
        console.log("handleFocus", value);
        
    };

    function getNumber(id : number, value : any){
        switch (id) {
            case 0:
                return value.agree;
            case 1:
                return value.disagree
            default:
                break;
        }
    }
</script>

<template>
    <div class="radioButton">
        <a-radio-group
            :name="name"
            :value="radioDefaultCheck"
            @change="handleRadio"
            :disabled="disabled"
        >
            <a-radio
                v-for="(radio, index) in element"
                :key="index"
                :value="props.typeView === 'community'? radio.value: radio"
            >
                <span :class="(radio.checkedNumber === false) ? 'other__button' : ''" class="button-radio">
                    <span class="app-radio-value">{{ radio.label || radio.name }}</span>
                    <span class="app-radio-value-number">
                        <!-- {{(radio.id === 0 ? vote.agree : vote.disagree)}} -->
                        {{getNumber(radio.id, vote)}}
                    </span> 
                </span>
            </a-radio>
        </a-radio-group>
    </div>
</template>
<style lang="scss" scoped>
    .radioButton {
        .ant-radio-group {
            @apply flex flex-col gap-y-[14px];
        }
        .ant-radio-wrapper {
            @apply bg-gray rounded-[4px] px-[24px] py-[12px] mr-0;
            &::before {
                @apply hidden;
            }
            &:hover {
                @apply text-primary;
            }
            &:deep() {
                span.ant-radio + span {
                    @apply w-full p-0;
                }
            }
        }
        .ant-radio-wrapper-checked {
            @apply bg-primary border-none;
            span {
                @apply text-white;
            }
        }
        .button-radio {
            @apply flex justify-between;
        }
        .app-radio-value-number {
            @apply pl-[20px];
        }
        .other__button {
            .app-radio-value {
                @apply font-[600];
            }
        }
        &:deep() {
            .ant-radio {
                @apply hidden;
            }
        }
    }
</style>
