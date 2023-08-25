<template>
    <div class="boiler container">
        <div class="boiler__title-nav">
            <Paragraphe class="boiler__content-title-nav"
                ><ArrowBack
                    class="boiler__back"
                    @click="router.push({ name: 'work-home' })"
                />Travaux à Chaudière</Paragraphe
            >
            <hr class="separator" />
        </div>
        <a-spin class="loading" :spinning="spinning">
            <div class="boiler__menu-button">
                <Paragraphe
                    v-for="menu in dataMenu"
                    class="btn-text"
                    @click="gotoInstallation(menu)"
                >
                    {{ menu.name }}</Paragraphe
                >
            </div>
            <div class="boiler__menu-button mt-3" v-if="!loading">
                <Paragraphe
                    class="btn-text"
                    @click="router.push({ name: 'work-maintains' })"
                >
                    Travaux d’entretien</Paragraphe
                >
            </div>
        </a-spin>
        <div class="loading"><Loader v-if="loading" /></div>
    </div>
</template>

<script setup lang="ts">
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import { notification, Spin as ASpin } from 'ant-design-vue';
    import { onMounted, ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { useStore } from 'vuex';

    const router = useRouter();
    const store = useStore();

    let spinning = ref<boolean>(false);
    let loading = ref<boolean>(false);

    let dataMenu = ref<Array<any>>([
        // 'Travaux d’installation',
        // 'Travaux d’entretien',
        // 'Travaux de réparation',
        // 'Remplacer la chaudière',
        // 'Déplacer une chaudière',
        // 'Mettre définitivement hors service le réservoir​',
        // 'Diagnostic chauffage PEB​',
        // 'Obtenir un accompagnement gratuit​',
        // 'Carnet de bord de ma chaudière​',
    ]);

    onMounted(async () => {
        await getTypeOfWorkBoiler();
        await getListMenu();
    });

    async function getListMenu() {
        try {
            loading.value = true;
            let { data } = await store.dispatch(
                'WorksModule/setListMenuBoiler'
            );
            dataMenu.value = data;
            // const data = computed(
            //     () => store.getters['WorksModule/getListExpertDynam']
            // );
            // expertData.value = data.value.data;
            // loading.value = false;
        } catch (error) {
            console.error('Error get list Menu : ', error);
        } finally {
            loading.value = false;
        }
    }

    async function getTypeOfWorkBoiler() {
        try {
            loading.value = true;
            let data = await store.dispatch('WorksModule/setMaintainsMenu');
            data.forEach((item: any) => {
                switch (item.name) {
                    case 'Chaudière':
                        store.dispatch('WorksModule/setDataIdToPost', {
                            idTypeOfWork: item.id,
                        });

                        break;

                    default:
                        break;
                }
            });
        } catch (error) {
            console.error('Error when get list typeOfWork', error);
        } finally {
            loading.value = false;
        }
    }

    async function contactHomeGrade() {
        console.log('Contacter homeGrade');

        try {
            spinning.value = true;
            let response = await store.dispatch('WorksModule/contactHomeGrade');

            console.log('Console .log response', response);

            if (response.data.code === 200 && response.data.success) {
                notification['success']({
                    message: `Vous avez contacter un Homegrade`,
                });
            }
        } catch (error) {
            notification['error']({
                message: 'Une erreur est survenue',
                description: 'Veuillez réessayer...',
            });
        } finally {
            spinning.value = false;
        }
    }

    async function gotoInstallation(menuClicked: any) {
        console.log(menuClicked.id);

        await store.dispatch('WorksModule/setDataIdToPost', {
            idSubSection: menuClicked.id,
        });

        switch (menuClicked.name) {
            case "Travaux d'installation":
                router.push({ name: 'work-boiler-installation' });
                break;

            case 'Travaux de réparation':
                router.push({ name: 'work-boiler-repair' });

                break;
            case 'Remplacer la chaudière':
                router.push({ name: 'work-boiler-replace' });

                break;
            case 'Déplacer une chaudière':
                router.push({ name: 'work-boiler-move' });

                break;
            case 'Diagnostic chauffage PEB':
                router.push({ name: 'work-boiler-diagnostic' });

                break;
            case 'Obtenir un accompagnement gratuit':
                contactHomeGrade();

                break;
            case 'Carnet de bord de ma chaudière':
                router.push({ name: 'work-boiler-log-book' });

                break;

            default:
                break;
        }
    }
</script>

<style scoped lang="scss">
    .boiler {
        @apply relative mt-[10px] rounded-[8px] p-[10px] bg-[#fff];
        min-height: 89vh;

        &__content-title-nav {
            @apply text-[var(--color-gray-icon)] font-semibold text-base flex items-center gap-[10px];
        }

        &__menu-button {
            @apply grid grid-cols-2 gap-[20px] p-4;

            @screen sm {
                @apply grid-cols-4;
            }
        }

        &__back {
            @apply cursor-pointer;
        }
    }

    .btn-text {
        @apply py-[60px] rounded-[8px] text-center font-semibold cursor-pointer;
        border: 1px solid var(--color-stroke-gray);
    }

    .loading {
        @apply absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .loading :global(.ant-spin-dot-item) {
        background-color: var(--color-primary);
    }
    .separator {
        @apply my-[15px];
    }
</style>
