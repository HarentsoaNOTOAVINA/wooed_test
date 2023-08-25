<template>
    <MainCard
        :dataBreadcrumbs="breadcrumbListsData"
        class="notification__section"
    >
        <div class="notification__container">
            <div class="notification__content">
                <Paragraphe>
                    Vous pouvez choisir d’être notifie par Cocolis :
                </Paragraphe>
                <div class="notification__switch">
                    <Title
                        type="h2"
                        label="Concernant vos livraisons sur Cocolis"
                        class="notification__switch-title"
                    />
                    <div class="notification__switch-wrap">
                        <Switch
                            item-label="Par mini boite email (Obligatoire)"
                            name="miniMailbox"
                            :switch-rounded="true"
                            :checkedDefault="true"
                        />
                        <Switch
                            item-label="Par SMS"
                            name="sms"
                            :switch-rounded="true"
                            :checkedDefault="true"
                        />
                    </div>
                </div>
                <div class="notification__switch">
                    <Title
                        type="h2"
                        label="Concernant les bon plans et les informations du site Cocolis"
                        class="notification__switch-title"
                    />
                    <Switch
                        item-label="Par SMS"
                        name="sms"
                        :switch-rounded="true"
                    />
                </div>
            </div>
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        link: {
            type: String,
            default: '#',
        },
    });

    const breadcrumbListsData = [
        {
            label: 'Notifications',
        },
    ];
</script>
<style lang="scss" scoped>
    .notification {
        &__container {
            @apply flex flex-col gap-y-[18px];
        }
        &__content {
            @apply flex flex-col gap-[18px];
        }
        &__switch {
            @apply flex flex-col gap-[14px];
        }
        &__switch-wrap {
            @apply flex flex-col gap-[14px];
        }
        &__switch-title {
            @apply text-[14px] font-[600];
        }
    }
</style>
