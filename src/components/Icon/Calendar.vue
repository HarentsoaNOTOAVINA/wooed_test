<template>
    <svg
        :width="iconSize"
        :height="iconSize"
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.5 10.4985C1.225 10.4985 0.9895 10.4007 0.7935 10.205C0.597833 10.009 0.5 9.77353 0.5 9.49854V2.49854C0.5 2.22354 0.597833 1.9882 0.7935 1.79254C0.9895 1.59654 1.225 1.49854 1.5 1.49854H2V0.498535H3V1.49854H7V0.498535H8V1.49854H8.5C8.775 1.49854 9.0105 1.59654 9.2065 1.79254C9.40217 1.9882 9.5 2.22354 9.5 2.49854V9.49854C9.5 9.77353 9.40217 10.009 9.2065 10.205C9.0105 10.4007 8.775 10.4985 8.5 10.4985H1.5ZM1.5 9.49854H8.5V4.49854H1.5V9.49854ZM1.5 3.49854H8.5V2.49854H1.5V3.49854Z"
            fill="#A39F9F"
        />
    </svg>
</template>

<script setup lang="ts">
    import { ref,PropType,onMounted } from 'vue';
    const iconSize = ref('20px');

    const props = defineProps({
        size: {
            type: String as PropType<'sm' | 'md' | 'lg' | 'xs'>,
        },
    });

    onMounted(() => {
        switch (props.size) {
            case "xs":
            iconSize.value = "20px";
                break;
            case "sm":
            iconSize.value = "35px";
                break;
            case "lg":
            iconSize.value = "120px";
            default:
                break;
        }
    })
</script>
