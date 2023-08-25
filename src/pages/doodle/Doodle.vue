<template>
    <div class="doodle doodle__container">
        <span>Doodle</span>
        <div class="doodle__canlendar">
            <a-calendar 
                @select="handleSelected"
            >
        
            </a-calendar>
            <Modal
                :is-show-modal="isShowModal"
                @on-back="handleShowModal"
                :title="`Rendez-vous le ${formatDateFr(selectedDate)}.`"
            >
                <template #content>
                    <div class="">
                        <div class="">
                            <div class="doodle__form">
                                <div class="doodle__time-form">
                                    <Time
                                        label="Heure de début"
                                    />
                                    <Time
                                        label="Heure de fin"
                                    />
                                </div>
                                <TextArea
                                    name-input="Motif"
                                    label="Motif"

                                />
                            </div>
                            <div class="doodle__footer">
                                <Button type-button="border">Valider</Button>
                            </div>
                        </div>
                    </div>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { Calendar as ACalendar } from "ant-design-vue";
import Modal from "@/components/Display/Modal/Modal.vue";
import { ref } from "vue";
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import { formatDateFr } from "@/utils/date/format";
import Time from "@/components/Common/TimePicker/TimePicker.vue";
import Button from "@/components/Common/Button/Button.vue";
import TextArea from "@/components/Common/TextArea/TextArea.vue";

const isShowModal = ref<boolean>(false);
const selectedDate = ref<any>(null); 

function handleSelected(event : any){
    console.log("Selected\n", event.$d);
    if(event.$d){
        selectedDate.value = event.$d;
        handleShowModal();
    }
}

function handleShowModal(){
    isShowModal.value = !isShowModal.value;
}
</script>

<style lang='scss' scoped>
.doodle{
    &__container{
        @apply bg-white container rounded-[8px] my-[10px] p-[10px] min-h-[calc(100vh_-_100px)];
    }

    &__canlendar{

    }

    &__footer{
        @apply w-full flex justify-end mt-[20px];
        &:deep(){
            .button__border{
                @apply font-light w-[120px];
            }
        }
    }
    
    &__time-form{
        @apply flex gap-[20px] mb-[10px];

        &:deep(){
            .time-picker{
                @apply flex-1;
            }
        }
    }

   
}
</style>