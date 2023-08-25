<template>
    <div :class="className" class="icon">
        <component :is="activeIcon" :color="color" />
    </div>
</template>
<script setup lang="ts">
    import { onMounted, ref, shallowRef } from 'vue';

    const componentsIcons = import.meta.globEager('@/components/Icon/**/*.vue');
    const activeIcon = shallowRef<any>();

    const props = defineProps({
        className: {
            type: String,
            default: '',
        },
        iconName: {
            type: String,
            default: '',
        },
        color: {
            type: String,
            default: 'var(--color-primary)',
        }
    });

    const allIcon = shallowRef<any>([]);

    Object.entries(componentsIcons).forEach(([path, definition]) => {
        const iconName = (path as any)
            .split('/')
            .pop()
            .replace(/\.\w+$/, '');
        allIcon.value.push({ name: iconName, icon: definition.default });
    });

    onMounted(() => {
        getIcon();
    });
    

    function getIcon() {
        allIcon.value.forEach((item: any) => {
            if (props.iconName === item.name) {
                activeIcon.value = item.icon;
            }
        });
    }
</script>
<style lang="scss" scoped>
    .icon {
        @apply flex justify-center items-center;
    }
</style>
