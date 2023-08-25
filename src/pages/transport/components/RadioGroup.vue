<template>
  <label v-if="label !== ''">
    <span class="label">{{ label }}</span>
  </label>
  <div class="container__radio">
    <a-radio-group v-model:value="value" @change="handleChange">
      <a-radio v-for="(option, index) in options" :key="index" :value="option.value">
        <span class="label__radio">{{ option.label }}</span>
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script setup lang="ts">
import ARadio from "ant-design-vue/lib/radio/Radio";
import ARadioGroup from "ant-design-vue/lib/radio/Group";
import { onMounted, ref, watch } from "vue";
import { inputDefaultValue } from "ant-design-vue/lib/input/inputProps";

const value = ref<number>();

const emit = defineEmits(["select-option"]);

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  nameInput: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: [Number, String, Boolean]
  },
});

watch(
  () => value.value,
  (newValue) => {
    value.value = newValue;
  },
  { immediate: true }
);

onMounted(() => handleDefaultValueType());

function handleChange(option: any) {
  let found = props.options.find((element: any) => element.value === option.target.value);
  let payload = found.inputValue;
  value.value = option.target.value;
  const radioValue: object = { [props.nameInput]: payload };
  emit("select-option", radioValue);
}

function handleDefaultValueType() {
  const typeIsString = typeof props.defaultValue === "string";
  const typeIsBoolean = typeof props.defaultValue === "boolean";

  if (typeIsString) {
    props.options.forEach((element: any) => { element.inputValue === props.defaultValue ? value.value = element.value : value.value = 0 })
  } else if (typeIsBoolean) {
    props.defaultValue ? value.value = 0 : value.value = 1
  } else {
    value.value = props.defaultValue
  }
}
</script>
<style lang="scss" scoped>
.ant-radio-wrapper {
  &:deep() {
    display: flex flex-row;

    &>span:nth-child(2) {
      @apply block w-full;
    }
  }
}

span.app-radio-value {
  &:deep() {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    @apply flex text-primary mb-[8px];

    &>span {
      @apply block mt-0 pb-[1.5px];
    }
  }
}

// .ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner
:deep(.ant-radio-inner, .ant-radio-checked) {
  border: 1px double var(--color-primary);

  &:hover {
    border-color: var(--color-primary);
  }

  &::after {
    background-color: var(--color-primary);
  }
}

.label {
  @apply font-semibold;

  &__radio {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    transition: all 0.25s ease;
    @apply block text-primary mb-[8px];
  }
}

.container__radio {
  @apply mt-2;
}
</style>
