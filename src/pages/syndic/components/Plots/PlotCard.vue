<template>
    <div class="plot-card__container" :class="actions ? 'py-[24px]' : ''">
        <div v-show="actions" class="absolute top-2 right-2 cursor-pointer">
            <a-popover :visible="displayMenu" :placement="'bottomLeft'" trigger="click">
                <Icon icon-name="EllipsisHorizontal" @click="handlePopOver" />
                <template #content>
                    <div class="content-ellipsis">
                        <span class="block cursor-pointer" @click="handleEdit">Editer</span>
                        <span class="block cursor-pointer" @click="handleDelete">Supprimer</span>
                    </div>
                </template>
            </a-popover>
        </div>
        <div>
            <div class="plot-card__main-content">
                <div class="plot-card__plot-number">
                    <div class="plot-card__sub-title">Numéro du lot</div>
                    <div>{{ data.numberLot }}</div>
                </div>
                <div class="plot-card__location">
                    <div class="plot-card__sub-title">Emplacement</div>
                    <div>{{ data.location }}</div>
                </div>
                <div class="plot-card__quota">
                    <div class="plot-card__sub-title">Quotité</div>
                    <div>{{ data.quota }}</div>
                </div>
                <div class="plot-card__contact">
                    <div class="plot-card__owner">
                        <div class="plot-card__sub-title">Propriétaire</div>
                        <div class="plot-card__owner-main-content">
                            <div class="contact-details">
                                <Icon icon-name="User" />
                                <span>{{ data.ownerName }}</span>
                            </div>
                            <div class="contact-details">
                                <Icon icon-name="EmailOutline" />
                                <span>{{ data.ownerEmail }}</span>
                            </div>
                            <div class="contact-details">
                                <Icon icon-name="CallIcon" />
                                <span>{{ data.ownerPhoneNumber }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="data.tenantName" class="plot-card__tenant">
                        <div class="plot-card__sub-title">Locataire</div>
                        <div class="plot-card__tenant-main-content">
                            <div class="contact-details">
                                <Icon icon-name="User" :color="'var(--color-primary)'" />
                                <span>{{ data.tenantName }}</span>
                            </div>
                            <div class="contact-details">
                                <Icon icon-name="EmailOutline" :color="'var(--color-primary)'" />
                                <span>{{ data.tenantEmail }}</span>
                            </div>
                            <div class="contact-details">
                                <Icon icon-name="CallIcon" :color="'var(--color-primary)'" />
                                <span>{{ data.tenantPhoneNumber }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Icon from '@/components/Common/Icon/Icon.vue';
import APopover from 'ant-design-vue/lib/popover';
import { ref } from 'vue';
const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    actions: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['delete-current-lot', 'edit-current-lot']);

const displayMenu = ref<boolean>(false);

function handleDelete() {
    handlePopOver();
    emit('delete-current-lot');
}

function handleEdit() {
    handlePopOver();
    emit('edit-current-lot');
}

function handlePopOver() {
    displayMenu.value = !displayMenu.value;
}
</script>
<style lang="scss" scoped>
.plot-card {
    &__container {
        @apply p-[14px] rounded-md relative;
        border-top: 1px solid var(--color-stroke-gray);
        border-right: 1px solid var(--color-stroke-gray);
        border-bottom: 1px solid var(--color-stroke-gray);
        border-left: 2px solid var(--color-border-warn);
    }

    &__main-content {
        @apply flex flex-col gap-4;

        @screen lg {
            @apply flex-row justify-between;
        }
    }

    &__contact {
        @apply flex flex-col gap-4;

        @screen lg {
            @apply w-1/2 flex-row;
        }
    }

    &__owner,
    &__tenant {
        @screen md {
            @apply w-1/2;
        }

        &-main-content {
            span {
                @apply truncate block;
            }
        }
    }

    &__sub-title {
        @apply font-semibold mb-2;
        color: var(--color-primary);
    }

    &__close {
        @apply cursor-pointer relative
    }
}

.contact-details {
    @apply flex gap-x-4;
}
</style>