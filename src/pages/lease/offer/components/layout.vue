<script setup lang="ts">

</script>

<template>
    <div class="container">
        <slot  name="sidebar"/>
        <slot name="body"/>
    </div>
</template>
<style lang="scss" scoped>

.container{
    @apply w-full flex-col flex-1;

}

@screen md{
    .container {
        @apply w-full my-5 flex flex-row justify-start gap-10;
    }
}
</style>