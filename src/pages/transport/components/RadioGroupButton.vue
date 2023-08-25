<template>
  <div>
    <a-radio-group :value="value" @change="handleOptionChange" class="label-container">
      <a-radio v-for="(option, index) in data" :key="index" :value="option.id">
        <div class="label-container__content">
          <Icon
            class="label-container__content-icon"
            :icon-name="option.iconName"
            :color="option.id === value ? '#fff' : 'var(--color-primary)'"
          />
          <div class="label-container__content-label">
            <span class="radio__label">Taille {{ option.denomination }}</span>
            <span class="radio__description">{{ option.description }}</span>
          </div>
        </div>
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script setup lang="ts">
import ARadio from "ant-design-vue/lib/radio/Radio";
import ARadioGroup from "ant-design-vue/lib/radio/Group";
import Icon from "@/components/Common/Icon/Icon.vue";
import { ref, watch, onMounted } from "vue";

const value = ref<number>();

const emit = defineEmits(["select-option"]);

interface ISizeItem {
  denomination: string;
  id: number;
  description: string;
  iconName: string;
}

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  nameInput: {
    type: String,
    required: true,
  },
});

const data = ref<Array<ISizeItem>>([]);

watch(
  () => value.value,
  (newValue) => {
    value.value = newValue;
  },
  { immediate: true }
);

onMounted(() => {
  addIconNameToOptions(props.options);
});

function handleOptionChange(option: any) {
  value.value = option.target.value;
  const found: any = props.options.find((element: any) => element.id === option.target.value);
  const radioValue: object = { [props.nameInput]: found.denomination };
  emit("select-option", radioValue);
}

function addIconNameToOptions(arr: any) {
  arr.forEach((element: any) => {
    switch (element.id) {
      case 1:
        element = { ...element, ...{ iconName: "Shoe" } };
        break;
      case 2:
        element = { ...element, ...{ iconName: "Shoping" } };
        break;
      case 3:
        element = { ...element, ...{ iconName: "Guitar" } };
        break;
      case 4:
        element = { ...element, ...{ iconName: "Furniture" } };
        break;
      default:
        element = { ...element, ...{ iconName: "Sofa" } };
    }
    data.value.push(element);
  });
}
</script>
<style lang="scss" scoped>
.label {
  &__radio,
  &__subRadio {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    transition: all 0.25s ease;
    @apply block text-primary mb-[8px];
  }
}

.label-container {
  @apply w-full flex flex-col items-center mb-[4px];

  &__content {
    @screen md {
      @apply flex items-center gap-x-4;
    }

    &-icon {
      @apply hidden;

      @screen md {
        @apply block;
      }
    }
  }

  &:deep() {
    .ant-radio {
      @apply hidden;
    }
  }

  .ant-radio-wrapper {
    @apply w-full border my-2 rounded;
    transition: all 0.25s ease;
    padding: 10px;
    border-color: var(--color-stroke-gray);

    .radio__label {
      transition: all 0.25s ease;
      @apply font-medium block;
    }

    .radio__description {
      @apply truncate;
    }

    &.ant-radio-wrapper-checked {
      @apply rounded;
      transition: all 0.25s ease;
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      color: #fff;
      padding: 10px;

      .radio__label {
        transition: all 0.25s ease;
        @apply font-semibold;
      }
    }
  }

  .ant-radio-group {
    @apply w-full;
  }
}
</style>
