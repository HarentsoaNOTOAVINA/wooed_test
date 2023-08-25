<template>
    <div class="flex flex-col gap-[18px]">
        <div>
            <Title
                class="font-semibold leading-tight text-primary"
                type="h4"
                label="Situation et détail du bien"
            />
            <hr class="divider" />
        </div>

        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
                <tbody>
                    <tr>
                        <td class="px-5 py-5 bg-white text-sm w-2/5">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 w-10 h-8 hidden sm:table-cell"
                                >
                                    <Immobilier class="icon" />
                                </div>
                                <div class="ml-3">
                                    <Paragraphe>Type de bien </Paragraphe>
                                </div>
                            </div>
                        </td>
                        <td class="count bg-white">
                            <Paragraphe
                                >{{ property && property.propertyType.name }}
                            </Paragraphe>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-5 py-5 bg-gray text-sm w-2/5">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 w-10 h-8 hidden sm:table-cell"
                                >
                                    <GPSRoad class="icon" />
                                </div>
                                <div class="ml-3">
                                    <Paragraphe>Adresse du bien </Paragraphe>
                                </div>
                            </div>
                        </td>
                        <td class="bg-gray">
                            <td class="px-5 py-5 text-sm text-end italic bg-gray  hidden sm:table-cell">
                                <Paragraphe
                                    >
                                    {{ property && property.country }}, {{ property && property.region }}
                                </Paragraphe>
                            </td>
                            <td class="px-5 py-5 text-sm text-end italic bg-gray hidden sm:table-cell">
                                <Paragraphe>
                                    {{ property && property.municipalityName }}
                                </Paragraphe>
                            </td>
                            <td class="count bg-gray">
                                <Paragraphe
                                    >
                                    {{ property && property.address }}
                                </Paragraphe>
                            </td>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-5 py-5 bg-white text-sm w-2/5">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 w-10 h-8 hidden sm:table-cell"
                                >
                                    <Bed class="icon" />
                                </div>
                                <div class="ml-3">Chambre à coucher</div>
                            </div>
                        </td>
                        <td class="count bg-white" >
                            <Paragraphe
                                >{{ property && property.bedroomcount }}
                            </Paragraphe>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-5 py-5 bg-gray text-sm w-2/5">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 w-10 h-8 hidden sm:table-cell"
                                >
                                    <Bath class="icon" />
                                </div>
                                <div class="ml-3">Salle de bain</div>
                            </div>
                        </td>
                        <td class="count bg-gray">
                            <Paragraphe
                                >{{ property && property.bathroomcount }}
                            </Paragraphe>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-5 py-5 bg-white text-sm w-2/5">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 w-10 h-8 hidden sm:table-cell"
                                >
                                    <Room class="icon" />
                                </div>
                                <div class="ml-3">Nombre de chambre</div>
                            </div>
                        </td>
                        <td class="count bg-white">
                            <Paragraphe
                                >{{ property && property.roomcount }}
                            </Paragraphe>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-5 py-5 bg-gray text-sm w-2/5">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 w-10 h-8 hidden sm:table-cell"
                                >
                                    <Surface class="icon" />
                                </div>
                                <div class="ml-3">Surface</div>
                            </div>
                        </td>
                        <td class="count bg-gray">
                            <Paragraphe
                                >{{ property && property.surface }} m²
                            </Paragraphe>
                        </td>
                    </tr>
                    <tr>
                        <td class="px-5 py-5 bg-white text-sm w-2/5">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 w-10 h-8 hidden sm:table-cell"
                                >
                                    <Parking class="icon" />
                                </div>
                                <div class="ml-3">Parking</div>
                            </div>
                        </td>
                        <td class="count bg-white">
                            <Paragraphe
                                >{{ property && property.parkingCount }}
                            </Paragraphe>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Bath from '@/components/Icon/Bath.vue';
    import Bed from '@/components/Icon/Bed.vue';
    import GPSRoad from '@/components/Icon/GPSRoad.vue';
    import Immobilier from '@/components/Icon/Immobilier.vue';
    import Surface from '@/components/Icon/Surface.vue';
    import Room from '@/components/Icon/Room.vue';
    import Parking from '@/components/Icon/Parking.vue';

    const props = defineProps({
        property: {
            type: Object,
        },
    });
</script>
<style lang="scss" scoped>
    table {
        .header-table {
            @apply px-5 py-3 border-b-2 text-center text-xs font-semibold text-gray uppercase tracking-wider;
        }
        .count {
            @apply px-5 py-5 text-sm text-end font-medium;
        }
        .icon {
            width: 18px;
            fill: none;
        }
    }
    .divider {
        @apply text-gray mt-2;
    }
</style>
