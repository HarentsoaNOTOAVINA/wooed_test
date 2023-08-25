<template>
    <div class="edit-profil">
        <div class="edit-profil__col justify-center items-center">
            <div class="edit-profil__photo">
                <div class="edit-profil__photo__circle">
                    <img
                        :src="params.logo || `image/lamba-profil.png`"
                        alt="Photo de profil"
                    />
                    <div class="edit-profil__photo__circle__overlay">
                        <label
                            for="edit-photo"
                            class="hover:cursor-pointer"
                            @input="handleEditPhoto"
                        >
                            <EditCircle
                                v-if="!!params.logo"
                                class="edit-profil__photo__circle__overlay__icon"
                            />
                            <AddFile v-else />
                            <input
                                id="edit-photo"
                                type="file"
                                accept="image/*"
                                class="hidden"
                            />
                        </label>
                        <deleteRoudedBG
                            v-if="!!params.logo"
                            @click="params.logo = ''"
                            class="edit-profil__photo__circle__overlay__icon"
                        />
                    </div>
                </div>
                <small class="change-photo-info"
                    ><Info /> Tapez pour editer la photo</small
                >
            </div>
            <div v-if="!isOnlyPhotoEdit" class="w-full">
                <div class="edit-profil__col">
                    <Input
                        @input="handleInput"
                        :value="params.name"
                        label="Nom"
                        name-input="name"
                        placeholder="Entrez votre nom"
                    />
                    <Input
                        @input="handleInput"
                        :value="params.firstname"
                        label="Prenom"
                        name-input="firstname"
                        placeholder="Entrez votre prénom"
                    />
                </div>
                <Input
                    @input="handleInput"
                    :value="params.address"
                    label="Adresse"
                    name-input="address"
                    id="address"
                    placeholder="Entrez votre adresse"
                    @click="params.address = ''"
                />
            </div>
        </div>
        <div v-if="isOnlyPhotoEdit">
            <Paragraphe class="my-[20px] text-center font-semibold"
                >{{ params.firstname }} {{ params.name }}</Paragraphe
            >
            <hr class="text-strokeGray my-[20px]" />
        </div>
        <template v-if="!isOnlyPhotoEdit">
            <div class="edit-profil__col">
                <Input
                    @input="handleInput"
                    :value="params.houseNumber"
                    label="Numero du logement"
                    name-input="houseNumber"
                    placeholder="Changez le numero de logement"
                />
                <Input
                    @input="handleInput"
                    :value="params.houseAddition"
                    label="Ajout dans le logement"
                    name-input="houseAddition"
                    placeholder="Changez votre ajout"
                />
            </div>
            <div class="edit-profil__col">
                <Input
                    @input="handleInput"
                    :value="params.email"
                    label="Email"
                    name-input="email"
                    placeholder="Changez votre email"
                />
                <Input
                    @input="handleInput"
                    :value="params.telephone"
                    @click="params.telephone = ''"
                    label="Tel"
                    name-input="telephone"
                    placeholder="Changez votre numbero de telephone"
                    :addon-before="!!dialcodeCountry ? dialcodeCountry.iso : ''"
                />
            </div>
            <div v-if="isProUser" class="edit-profil__pro">
                <Title
                    class="edit-profil__pro__title"
                    type="h4"
                    label="Informations professionnelles"
                />
                <!-- <Select
                    label="Vous êtes"
                    name="typeRole"
                    mode="multiple"
                    :options="professionnalUserOption"
                    placeholder="Changez votre fonction"
                    @change-select="handleSelect"
                    :value="userRoleWithLabel"
                /> -->
                <div class="edit-profil__col">
                    <Input
                        label="Nom de votre entreprise"
                        name-input="agencyName"
                        :value="params.society[0].name"
                        placeholder="Changez le nom de votre entreprise"
                        @input="handleInput"
                    />
                    <Select
                        label="Services de l'entreprise"
                        name="approvals"
                        mode="multiple"
                        placeholder="Changez les services que vous offrez"
                        :options="agenciesServicesList"
                        @change-select="handleSelect"
                        :value="userApprovalsWithLabel"
                    />
                </div>
                <div class="edit-profil__col">
                    <Input
                        label="TVA de l'entreprise"
                        name-input="agencyTva"
                        placeholder="Changez le TVA de votre entreprise"
                        type="number"
                        :value="params.society[0].vat"
                        @input="handleInput"
                    />
                    <Input
                        label="ITI de l'entreprise"
                        name-input="iti"
                        placeholder="Changez l'ITI de votre entreprise"
                        :value="params.society[0].iti"
                        type="number"
                        @input="handleInput"
                    />
                </div>
            </div>
        </template>
        <div class="edit-profil__operation">
            <Button
                :is-load="isLoadUpdateProfil"
                @click="updateProfil"
                class="edit-profil__operation__btn"
                type-button="secondary"
                >Appliquez les changements</Button
            >
            <Button
                class="edit-profil__operation__btn"
                type-button="border"
                @click="$emit('on-cancel')"
                >Annuler</Button
            >
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import { computed, onMounted, onBeforeMount, ref, watch } from 'vue';
    import { useStore } from 'vuex';
    import EditCircle from '@/components/Icon/EditCircle.vue';
    import deleteRoudedBG from '@/components/Icon/deleteRoudedBG.vue';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import dialcodeData from '@/utils/json/dial-code-country';
    import AddFile from '@/components/Icon/AddFile.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import AgencyService from '@/services/agencyService';
    import Info from '@/components/Icon/Info.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { notification } from 'ant-design-vue';
    import { CommunityService } from '@/services/communityService';
    import { useSlug } from '@/composables/user/useUsernameSlug';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const router = useRouter();
    const slug = useSlug();
    const userDetails = computed(
        () => store.getters['UserModule/getUserDetails']
    );
    const emit = defineEmits<{
        (evt: 'on-cancel'): void;
    }>();

    const isProUser = ref<boolean>(false);
    const { fullLocationResult, autocompleteResult } =
        useAutoComptetion('address');
    const props = defineProps<{
        isOnlyPhotoEdit?: boolean;
    }>();

    const isLoadUpdateProfil = ref<boolean>(false);
    const dialcodeCountry = ref<any>(null);
    const isLoadAgencieServices = ref<boolean>(true);
    const hasEditPhoneNumber = ref<boolean>(false);
    const params = ref<any>({
        name: '',
        firstname: '',
        houseNumber: '',
        houseAddition: '',
        email: '',
        telephone: '',
        logo: '',
        region: '',
        country: '',
        latitude: '',
        longitude: '',
        // agencyName: '',
        // agencyTva: '',
        // iti: '',
        society: [
            {id: null, name: '', vat: '', iti: '', approvals: []}
        ]
        // typeRole: [],
        // approvals: [],
    });
    const professionnalUserOption = [
        { value: 'agence', label: 'Agent immobilier' },
        { value: 'notaire', label: 'Notaire' },
        { value: 'prestataire', label: 'Fournisseur de services' },
        { value: 'syndic', label: 'Syndic' },
        { value: 'huissier', label: 'Huissier' },
    ];
    const agenciesServicesList = ref<any[]>([]);
    const userRoleWithLabel = ref<{ label: string; value: string }[]>([]);
    const userApprovalsWithLabel = ref<{ label: string; value: number }[]>([]);
    const societyId = ref<number>();

    onBeforeMount(() => {
        handleUserRole();
    });

    onMounted(() => {
        handleUserDetails();
        if (!props.isOnlyPhotoEdit) {
            getDialCodeCountry(params.value.country);
            if (isProUser.value) {
                getAgenciesServicesList();
                handlePrevUserRoles();
                handlePrevUserServices();
            }
        }
    });

    watch(
        () => fullLocationResult.value,
        (v) => {
            const { address_components } = v;
            address_components.forEach((elt: any) => {
                if (elt.types.includes('country')) {
                    params.value.country = elt.short_name;
                } else if (elt.types.includes('administrative_area_level_1')) {
                    params.value.region = elt.short_name;
                }
            });
            getDialCodeCountry(params.value.country);
        }
    );
    watch(
        () => autocompleteResult.value,
        (v) => {
            const { address, lng, lat } = v;
            params.value = {
                ...params.value,
                latitude: lat + '',
                longitude: lng + '',
                address,
            };
        }
    );

    async function getAgenciesServicesList() {
        try {
            const { data, code }: { data: any[]; code: number } =
                await AgencyService.getAgenciesServicesList();
            if (code === 200) {
                agenciesServicesList.value = [
                    ...agenciesServicesList.value,
                    ...data.map((item) => ({
                        label: item.roadWorks,
                        value: item.id,
                    })),
                ];
                handlePrevUserServices();
            }
        } finally {
            isLoadAgencieServices.value = false;
        }
    }
    /**
     * handle existing roles
     */
    function handlePrevUserRoles() {
        const { reversedRoles } = userDetails.value;
        const notIncludedRoles = ['professional', 'particular'];

        const filteredUserRoleWithLabel: any[] = reversedRoles
            .filter((item: any) => item)
            .filter((item: any) => !notIncludedRoles.includes(item));
        userRoleWithLabel.value = professionnalUserOption.filter((item) =>
            filteredUserRoleWithLabel.includes(item.value)
        );
    }
    /**
     * handle existing society's services
     */
    function handlePrevUserServices() {
        const { societies } = userDetails.value;
        const theSociety = societies[0];
        const { approvals, name, vat, iti, id } = theSociety;
        params.value = {
            ...params.value,
            society: [{ id, name, vat, iti }],
        };

        if (agenciesServicesList.value.length) {
            const filteredUserRoleWithLabel = approvals.map(
                (item: any) => item.id
            );
            userApprovalsWithLabel.value = agenciesServicesList.value.filter(
                (item) => filteredUserRoleWithLabel.includes(item.value)
            );
        }
    }
    function handleUserRole() {
        const USER_ROLES = userDetails.value.roles;
        if (USER_ROLES.includes('ROLE_PART')) {
            isProUser.value = false;
        } else if (USER_ROLES.includes('ROLE_PRO')) {
            isProUser.value = true;
        }
    }
    function handleUserDetails() {
        const {
            name,
            firstname,
            address,
            houseNumber,
            houseAddition,
            email,
            telephone,
            logo,
            region,
            country,
            latitude,
            longitude,
        } = userDetails.value;
        params.value = {
            name,
            firstname,
            address,
            houseNumber,
            houseAddition,
            email,
            telephone,
            logo,
            region,
            country,
            latitude,
            longitude,
        };
    }

    function handleInput(obj: any) {
        const [k, v] = Object.entries(obj)[0];
        switch (k) {
            case 'telephone':
                hasEditPhoneNumber.value = true;
                params.value = {
                    ...params.value,
                    ...obj,
                };
                break;
            case 'agencyName':
                params.value = {
                    ...params.value,
                    society: [{ ...params.value.society.at(-1), name: v }],
                };
                break;
            case 'agencyTva':
                params.value = {
                    ...params.value,
                    society: [{ ...params.value.society.at(-1), vat: v }],
                };
                break;
            case 'iti':
                params.value = {
                    ...params.value,
                    society: [{ ...params.value.society.at(-1), iti: v }],
                };
                break;
            default:
                params.value = {
                    ...params.value,
                    ...obj,
                };
                break;
        }
    }
    function handleSelect(evt: any) {
        const [k, v] = Object.entries(evt)[0];

        if (k === 'typeRole') {
            userRoleWithLabel.value = v as any[];
            params.value = {
                ...params.value,
                ...evt,
            };
        } else if (k === 'approvals') {
            userApprovalsWithLabel.value = v as any[];
            params.value = {
                ...params.value,
                society: [{ ...params.value.society.at(-1), ...evt }],
            };
        } else {
            params.value = {
                ...params.value,
                ...evt,
            };
        }
    }
    function handleEditPhoto(e: any) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if ((e.target as any).result) {
                params.value.logo = (e.target as any).result;
            }
        };
        reader.readAsDataURL(file);
    }
    function getDialCodeCountry(countryParams: string) {
        dialcodeData.forEach((country) => {
            if (country.countryCode === countryParams) {
                dialcodeCountry.value = country;
                return;
            }
        });
    }
    async function updateProfil() {
        isLoadUpdateProfil.value = true;
        if (hasEditPhoneNumber.value) {
            params.value = {
                ...params.value,
                telephone: `${dialcodeCountry.value.iso}${params.value.telephone}`,
            };
        }
        try {
            const { data } = await CommunityService.updateProfilCommunity(
                params.value
            );
            if (data.code === 200) {
                // store.dispatch('UserModule/setUserDetails', {detail: data.data});
                store.dispatch('UserModule/setUserDetails', {
                    detail: data.data,
                });
                emit('on-cancel');
                router.push({ path: slug.value });
                notification.success({
                    message: `Votre profil a été modifier`,
                });
            } else {
                notification.error({
                    message: `Une erreur s'est produite, veuillez reessayer`,
                });
            }
        } catch (error) {
            notification.error({
                message: `Une erreur s'est produite, veuillez reessayer`,
            });
        } finally {
            isLoadUpdateProfil.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .edit-profil {
        &__col {
            @apply flex gap-[20px] flex-col md:flex-row;
        }
        &:deep() {
            .custom-input__fields,
            .custom-select__wrapper {
                @apply w-full;
            }
        }
        &__operation {
            @apply flex justify-end gap-[10px] flex-col md:flex-row;
            &__btn {
                @apply w-full md:w-auto;
                &:deep() {
                    button {
                        @apply w-full;
                    }
                }
            }
        }
        &__photo {
            @apply flex flex-col items-center;
            .change-photo-info {
                @apply flex md:hidden items-center gap-[5px] text-grayIcon mt-[10px];
                &:deep() {
                    svg {
                        @apply h-[20px] w-[20px];
                        path {
                            fill: var(--color-stroke-gray);
                        }
                    }
                }
            }
            &__circle {
                @apply relative transition-all w-[150px] h-[150px] border border-[var(--color-primary)] rounded-[50%] overflow-hidden flex items-center justify-center;
                &__overlay {
                    @apply flex justify-center items-center absolute bg-[#00000059]  opacity-0 transition-all top-0 right-0 w-[inherit] h-[inherit] rounded-[50%] overflow-hidden;
                    &:hover {
                        @apply opacity-100;
                    }
                    &:deep() {
                        svg {
                            &:hover {
                                @apply scale-[1.15];
                            }
                        }
                        svg:first-child {
                            @apply h-[35px] w-[35px] transition-all;
                            &:hover {
                                @apply scale-[1.15];
                                path {
                                    @apply fill-[white];
                                }
                            }
                            path {
                                @apply fill-[#ffffffa6];
                            }
                        }
                        svg:last-child {
                            @apply h-[30px] w-[30px] transition-all;
                            &:hover {
                                @apply scale-[1.15];
                                rect {
                                    @apply fill-[red];
                                }
                            }
                            rect {
                                @apply fill-[#ff000066];
                            }
                            path {
                                @apply fill-white;
                            }
                        }
                    }
                }
                &:hover {
                    @apply cursor-pointer border-white;
                    img {
                        @apply scale-[1.1];
                    }
                }
                img {
                    @apply transition-all w-[inherit] h-[inherit] object-cover;
                }
            }
        }
        &__pro {
            @apply mb-[10px];
            hr {
                @apply text-gray;
            }
            &__title {
                @apply uppercase mb-[10px] font-semibold pb-[5px] border-b border-b-[var(--color-secondary)] text-secondary;
            }
        }
    }
</style>
