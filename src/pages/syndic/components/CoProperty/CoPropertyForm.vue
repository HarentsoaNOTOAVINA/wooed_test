<template>
  <div class="document__container">
    <div class="document__form-upload" v-for="(item, index) in documentData" :key="index">
      <label>
        <span class="font-[600] block mb-2">
          {{ item.label }}
        </span>
      </label>
      <CardWrapper>
        <UploadImage
          :name="item.name"
          :needBase64="false"
          :key="`${item.name}-${index}`"
          :disabled="item.name === 'syndicResponse' && props.syndicResponseExist"
          @upload-with-name="handleChanges"
        />
      </CardWrapper>
    </div>
    <div class="document__form-upload">
      <label>
        <span class="font-[600] block mb-2">
          Montant des charges de copropriété mensuelles (moyenne)
        </span>
      </label>
      <Input
        input-type="number"
        placeholder="000"
        name-input="monthlyAmount"
        unity="€"
        @input="handleChanges"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import UploadImage from "@/components/Display/UploadImage/UploadImage.vue";
import CardWrapper from "@/components/Display/CardWrapper/CardWrapper.vue";
import Input from "@/components/Common/Input/Input.vue";

const props = defineProps({
  syndicResponseExist: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["handle-form-value"]);

const documentData = [
  {
    id: 0,
    name: "syndicResponse",
    label: "Enregistrer ici la réponse du syndic",
  },
  {
    id: 1,
    name: "generalMeetingTranscript",
    label: "Reprendre ici les 3 derniers procès-verbaux d’assemblée générale",
  },
];

function handleChanges(value: any) {
  emit("handle-form-value", value);
}
</script>
<style lang="scss" scoped>
.document {
  &__container {
    @apply flex flex-col gap-[18px];
  }

  &__form-upload {
    @apply flex flex-col;
  }
}
</style>
