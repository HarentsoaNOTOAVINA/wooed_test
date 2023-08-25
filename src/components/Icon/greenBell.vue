<template>
    <svg 
        :width="iconSize" 
        :height="iconSize" 
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_4633_38536)">
        <path d="M12.7749 11.4367L12.6427 11.32C12.2676 10.9858 11.9393 10.6025 11.6666 10.1806C11.3688 9.59821 11.1903 8.96226 11.1416 8.31V6.38889C11.1442 5.36441 10.7725 4.37424 10.0965 3.60443C9.42055 2.83463 8.48671 2.33817 7.47048 2.20833V1.70667C7.47048 1.56898 7.41578 1.43692 7.31842 1.33956C7.22106 1.2422 7.089 1.1875 6.95131 1.1875C6.81362 1.1875 6.68157 1.2422 6.58421 1.33956C6.48684 1.43692 6.43215 1.56898 6.43215 1.70667V2.21611C5.42502 2.35531 4.50247 2.85477 3.83535 3.62199C3.16824 4.38921 2.80176 5.3722 2.80381 6.38889V8.31C2.75511 8.96226 2.57662 9.59821 2.27881 10.1806C2.01082 10.6015 1.68778 10.9847 1.31826 11.32L1.18604 11.4367V12.5333H12.7749V11.4367Z" fill="#67CD84"/>
        <path d="M5.95801 12.9453C5.99211 13.1918 6.11426 13.4177 6.3019 13.5811C6.48953 13.7446 6.72999 13.8346 6.97884 13.8346C7.2277 13.8346 7.46815 13.7446 7.65579 13.5811C7.84342 13.4177 7.96557 13.1918 7.99967 12.9453H5.95801Z" fill="#67CD84"/>
        </g>
        <defs>
        <clipPath id="clip0_4633_38536">
        <rect 
        :width="iconSize" 
        :height="iconSize" 
         fill="white" transform="translate(0 0.5)"/>
        </clipPath>
        </defs>
        </svg>
        
</template>
<script lang="ts" setup>
    import { onMounted, PropType, ref } from 'vue';

    const iconSize = ref('14px');

    const props = defineProps({
        size: {
            type: String as PropType<'sm' | 'md' | 'lg' | 'xs'>,
            default: 'md',
        },
    });

    onMounted(() => {
        switch (props.size) {
            case 'xs':
                iconSize.value = '20px';
                break;
            case 'sm':
                iconSize.value = '35px';
                break;
            case 'md':
                iconSize.value = '70px';
                break;
            case 'lg':
                iconSize.value = '120px';

                break;
        }
    });
</script>
