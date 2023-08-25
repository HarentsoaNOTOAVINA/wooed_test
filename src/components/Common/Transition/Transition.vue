<template>
    <Transition appear name="fade-step" mode="out-in">
        <slot />
    </Transition>
</template>
<style lang="scss" scoped>
    .fade-step-enter-active,
    .fade-step-leave-active {
        transition: all 0.3s ease-in-out;
    }

    .fade-step-enter-from,
    .fade-step-leave-to {
        opacity: 0;
        transform: translateX(50px);
    }
</style>
