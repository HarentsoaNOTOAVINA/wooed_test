<template>
    <div>
        <ButtonMenu
            :is-icon="Professional"
            width="100%"
            @click="handleChoices('professional')"
        >
            Professionnel
        </ButtonMenu>
        <ButtonMenu
            :is-icon="User"
            width="100%"
            @click="handleChoices('particular')"
        >
            Particulier
        </ButtonMenu>
    </div>
</template>
<script lang="ts" setup>
    import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import Professional from '@/components/Icon/Professional.vue';
    import User from '@/components/Icon/User.vue';

    const emit = defineEmits<{
        (
            event: 'on-click-choices',
            userType: 'particular' | 'professional' | ''
        ): void;
    }>();

    function handleChoices(userType: 'particular' | 'professional' | '') {
        emit('on-click-choices', userType);
    }
</script>
<style lang=""></style>
