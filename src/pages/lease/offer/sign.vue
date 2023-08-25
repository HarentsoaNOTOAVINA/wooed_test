<script lang="ts" setup>
    import * as pdfjs from 'pdfjs-dist';
    import * as pdfViewer from 'pdfjs-dist/web/pdf_viewer';
    import { ref, computed, onMounted } from 'vue';
    import PdfViewer from '@/components/Display/pdfViewer/pdfViewerContainer.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const route = useRoute();
    const isLoading = ref<boolean>(true);
    const store = useStore();
    const maxPAgeNum = ref<number>(0);
    const payloads = ref<any>({
        type: 'lease',
        file: null,
        offer: route.params.offerId,
        // thePropertyId : route.params.id,
        urlClient: '/',
    });

    let BASE_URL: any = import.meta.env.VITE_API_BASE_URL;

    let regex = /api\/immo\/v2\//;

    // let URL = `${BASE_URL}/pdflocation/contrat/20220524_modele_bail_classique_droit_commun_FR.pdf`;

    const pdfPath = `${window.location.origin}/uploads/contratlocation/20220524_modele_bail_classique_droit_commun_FR.pdf`;

    // console.log(process.env.VITE_API_ROOT_URL, 'PPPPPPPPPPPPPPPP');

    // const pdfPath = URL.replace(regex, '');
    console.log(pdfPath, 'pdfPath DDDDDDDDDDDDDDDDDD');

    const handleSignBtn = async (blobFile: any) => {
        payloads.value = Object.assign(payloads.value, {
            thePropertyId: route.params.id,
        });
        payloads.value.file = blobFile;

        const resp = await store.dispatch(
            'RentalModule/signContract',
            payloads.value
        );
        console.log('DBG response url', resp);
        window.open(resp, '_blank');
    };
</script>

<template>
    <!-- pdf-url="http://localhost:3002/uploads/permit/citerne/form-1a1b2-et-station-bruxelles-63f89ab275ef3338084123.pdf" -->

    <PdfViewer
        :button-label="'Valider et Signer le contrat'"
        :pdf-url="pdfPath"
        @save="handleSignBtn"
    />
    <!-- <embed :src="pdfPath" width="800" height="500" type="application/pdf" /> -->
</template>
