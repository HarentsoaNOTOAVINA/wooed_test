<template>
  <div class="audit-container">
    <div class="immopass">
      <Paragraphe class="paragraphe"
        >Réserver la visite technique par un expert</Paragraphe
      >
      <Button class="" type="secondary">IMMOPASS </Button>
    </div>
    <div>
      <Paragraphe class="paragraphe">Rapport</Paragraphe>
      <div class="rapport">
        <div v-for="(item, index) in data" :key="index">
            <Paragraphe class="">{{ item.title }}</Paragraphe>
            <!-- import all icon here and conditionning these with item.icon -->
            <UploadFile :need-base64="false" @upload-single="handleUpload" />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import Paragraphe from "@/components/Common/Paragraphe/Paragraphe.vue";
import Button from "@/components/Common/Button/Button.vue";
import UploadFile from '@/components/Display/UploadImage/UploadImage.vue';

import { ref } from "vue";

// interface
interface dataRapport {
  title: string;
  icon: string;
  name: string;
}

// ref
const data = ref<Array<dataRapport>>([
  {
    title: "Certificat",
    icon: "1",
    name: "",
  },
  {
    title: "Certificat",
    icon: "1",
    name: "",
  },
  {
    title: "Certificat",
    icon: "1",
    name: "",
  },
  {
    title: "Certificat",
    icon: "1",
    name: "",
  },
  {
    title: "Certificat",
    icon: "1",
    name: "",
  },
]);

// function
const handleUpload = () => {};
</script>

<style lang="scss" scoped>
.audit-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}
.immopass {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 18px 20px;
  isolation: isolate;
  border: 1px solid var(--color-stroke-gray);
  border-radius: 4px;
}
.paragraphe {
  font-style: normal;
  font-weight: 500;
  color: var(--color-primary);
}

.rapport{
    @apply bg-[white] rounded-[8px] p-[10px] sm:w-[100%] lg:w-[1024px] mt-[10px] md:mt-[0px] overflow-y-auto grid md:grid-cols-3 sm:grid-cols-2 gap-4;
}
</style>
