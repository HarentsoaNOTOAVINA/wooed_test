import Pays from './Pays';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import axios from 'axios';
import { xml2js } from 'xml-js';
export default new (class Wallonie extends Pays {
    constructor() {
        super();
        this._center = [50.1531475, 5.0632167];
        this._zoom = 14;
        this.wms = true;
        this.baselayer =
            'https://geoservices.wallonie.be/arcgis/services/IMAGERIE/ORTHO_LAST/MapServer/WMSServer?';
        this.params = {
            layers: 0,
            transparent: true,
            format: 'image/png',
            tileSize: 512,
            version: '1.3.0',
            crs: L.CRS.EPSG3857,
        };
        this.name = 'Wallonie';
        this.code = 'WA';
        this.layers_url = this.get_layers_url();
        this.has_layers = true;
        this.listLayer = [];
    }
    get_layers_url() {
        const base_url = 'https://geoservices.wallonie.be/arcgis/services/';
        const end = '/MapServer/WMSServer?';
        const id = [
            'AGRICULTURE/AMGT_FONC',
            //"AGRICULTURE/SAPINS_DE_NOEL_2015",
            /* "AGRICULTURE/SIGEC_PARC_AGRI_ANON__2015",
			"AGRICULTURE/SIGEC_PARC_AGRI_ANON__2016",
			"AGRICULTURE/SIGEC_PARC_AGRI_ANON__2017",
			"AGRICULTURE/SIGEC_PARC_AGRI_ANON__2018",
			"AGRICULTURE/SIGEC_PARC_AGRI_ANON__2019", */
            'AMENAGEMENT_TERRITOIRE/AGRO_GEO',
            /* "AMENAGEMENT_TERRITOIRE/ART_DIV22",
			"AMENAGEMENT_TERRITOIRE/BC_PAT", 
			"AMENAGEMENT_TERRITOIRE/CAMPING",*/
            /* "AMENAGEMENT_TERRITOIRE/CAW",
			"AMENAGEMENT_TERRITOIRE/CCATM",
			"AMENAGEMENT_TERRITOIRE/COMDEC",
			"AMENAGEMENT_TERRITOIRE/CONTR_KARST",
			"AMENAGEMENT_TERRITOIRE/GCU",
			"AMENAGEMENT_TERRITOIRE/GRU",
			"AMENAGEMENT_TERRITOIRE/IPIC",
			"AMENAGEMENT_TERRITOIRE/ISA",
			"AMENAGEMENT_TERRITOIRE/L_ECOLO",
			"AMENAGEMENT_TERRITOIRE/LOT",
			"AMENAGEMENT_TERRITOIRE/MODIF_PS",
			"AMENAGEMENT_TERRITOIRE/PAT_EXC",
			"AMENAGEMENT_TERRITOIRE/PAT_LSTSAV",
			"AMENAGEMENT_TERRITOIRE/PAT_MND",
			"AMENAGEMENT_TERRITOIRE/PCA",
			"AMENAGEMENT_TERRITOIRE/PCAML14_16",
			"AMENAGEMENT_TERRITOIRE/PRE",
			"AMENAGEMENT_TERRITOIRE/PRWE", */
            'AMENAGEMENT_TERRITOIRE/RENOV_URB',
            'AMENAGEMENT_TERRITOIRE/REVIT_URB',
            'AMENAGEMENT_TERRITOIRE/RISQ_EBOULT',
            //"AMENAGEMENT_TERRITOIRE/RMBMT_URB",
            /* "AMENAGEMENT_TERRITOIRE/SAR",
			"AMENAGEMENT_TERRITOIRE/SDC",
			"AMENAGEMENT_TERRITOIRE/SDT",
			"AMENAGEMENT_TERRITOIRE/SOL",
			"AMENAGEMENT_TERRITOIRE/TBP", 
			"AMENAGEMENT_TERRITOIRE/TERRILS",*/
            //"AMENAGEMENT_TERRITOIRE/ZIP",
            /* "CARTES_ANCIENNES/DEPOT_GUERRE_1865_1880",
			"CARTES_ANCIENNES/FERRARIS",
			"CARTES_ANCIENNES/SOIGNES_VANDERSTOCK_1661", */
            //"CARTES_ANCIENNES/VDML",
            //"EAU/BAIGNADE",
            //"EAU/BASSINS__BASSINS_PG",
            'EAU/BASSINS',
            /* "EAU/BATHY",
			"EAU/CAPTAGES", */
            //"EAU/CENT_HYDRO_ELEC",
            //"EAU/CIRC_POISSONS",
            //"EAU/CONT_RIV",
            /* "EAU/LEGIS_PECHE",
			"EAU/LIM_ADMIN_DCENN", */
            'EAU/LUTTE_INOND',
            'EAU/MASSES_EAU_SOUT_2017',
            //"EAU/NITRATES",
            //"EAU/RATS",
            /* "EAU/RES_LIMNI_DGARNE",
			"EAU/RES_PIEZO",
			"EAU/RHW_SIMPLE",
			"EAU/RHW",
			"EAU/SECTEURS_PARIS_1621",
			"EAU/WATERINGUES",
			"FAUNE_FLORE/AHREM",
			"FAUNE_FLORE/BDR",
			"FAUNE_FLORE/BERCE_CAUCASE",
			"FAUNE_FLORE/BIOCLIM",
			"FAUNE_FLORE/CONS_CYN",
			"FAUNE_FLORE/CONSNAT",
			"FAUNE_FLORE/FEE",
			"FAUNE_FLORE/LIMITES_DNF", */
            //"FAUNE_FLORE/PESTE_PA",
            //"FORET/FORETANC",
            'FORET/FORET',
            //"HABITAT/DENSPOP_TYPO",
            'HABITAT/TISSU_URBANISE',
            //"HABITAT/TNU_INZH",
            //"IGN/TOP10s_NB",
            /* "IMAGERIE/ORTHO_1971",
			"IMAGERIE/ORTHO_1978_1990",
			"IMAGERIE/ORTHO_1994_2000",
			"IMAGERIE/ORTHO_2001_2003",
			"IMAGERIE/ORTHO_2006_2007",
			"IMAGERIE/ORTHO_2009_2010_IR",
			"IMAGERIE/ORTHO_2009_2010",
			"IMAGERIE/ORTHO_2012_2013_IR",
			"IMAGERIE/ORTHO_2012_2013",
			"IMAGERIE/ORTHO_2015_IR",
			"IMAGERIE/ORTHO_2015",
			"IMAGERIE/ORTHO_2016_IR",
			"IMAGERIE/ORTHO_2016",
			"IMAGERIE/ORTHO_2017_IR",
			"IMAGERIE/ORTHO_2017",
			"IMAGERIE/ORTHO_2018_IR",
			"IMAGERIE/ORTHO_2018",
			"IMAGERIE/ORTHO_2019_IR",
			"IMAGERIE/ORTHO_2019",
			"IMAGERIE/ORTHO_2020_IR",
			"IMAGERIE/ORTHO_2020",
			"IMAGERIE/ORTHO_LAST_IR", */
            'IMAGERIE/ORTHO_LAST',
            /* "IMAGERIE/ORTHO_MAILLAGE_1994_2000",
			"IMAGERIE/ORTHO_MAILLAGE_2006_2007",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_1971",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_1978_1990",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_2009_2010",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_2012_2013",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_2015",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_2016",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_2017",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_2018",
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_2019", 
			"IMAGERIE/ORTHO_MAILLAGE_TUILAGE_2020",
			"INDUSTRIES_SERVICES/ADL",
			"INDUSTRIES_SERVICES/ANTENNES",
			"INDUSTRIES_SERVICES/BRUIT_2006_RAIL",
			"INDUSTRIES_SERVICES/BRUIT_2006_ROAD",
			"INDUSTRIES_SERVICES/BRUIT_AGGLO_IND_2012",
			"INDUSTRIES_SERVICES/BRUIT_AGGLO_RAIL_2012",
			"INDUSTRIES_SERVICES/BRUIT_AGGLO_ROAD_2012",
			"INDUSTRIES_SERVICES/BRUIT_MRAIL_2017",
			"INDUSTRIES_SERVICES/BRUIT_MROAD_2017",
			"INDUSTRIES_SERVICES/COWORKING_DW",
			"INDUSTRIES_SERVICES/CPAS",
			"INDUSTRIES_SERVICES/ECOLES_NUMERIQUES",
			"INDUSTRIES_SERVICES/ENDETTEMENT_ENERGIE",
			"INDUSTRIES_SERVICES/ENTREPRISES", */
            /* "INDUSTRIES_SERVICES/EPN",
			"INDUSTRIES_SERVICES/ESPACE_WALLONIE",
			"INDUSTRIES_SERVICES/ETAB_AINES",
			"INDUSTRIES_SERVICES/HALL_RELAIS",
			"INDUSTRIES_SERVICES/IAAS",
			"INDUSTRIES_SERVICES/PCS",
			"INDUSTRIES_SERVICES/SEVESO",
			"INDUSTRIES_SERVICES/ZDE", */
            'INDUSTRIES_SERVICES/ZONE_FRANCHE',
            //"LIMITES/LIMITES_ADMIN_DPA",
            //"LIMITES/LIMITES_QS_STATBEL",
            'LIMITES/LIMITES_REGIONSAGRICOLES',
            'MOBILITE/AIRES_COVOITURES',
            'MOBILITE/BASSINS_ORAGE',
            /* "MOBILITE/BDOA",
			"MOBILITE/CAMBIO",
			"MOBILITE/CPDT", 
			"MOBILITE/LIGNES_SNCB_SNCV_DESAFFECT",
			"MOBILITE/PLANHIVER_TRONCONS",
			"MOBILITE/PLANS_MOBILITE",*/
            //"OCCUPATION_SOL/COSW2_07",
            'RELIEF/WALLONIE_2013_2014_VUE_SIMPLE',
            /* "RELIEF/WALLONIE_MNP_2013_2014",
			"RELIEF/WALLONIE_MNP_CLASSE_2013_2014",
			"RELIEF/WALLONIE_MNS_2013_2014_DENSITE",
			"RELIEF/WALLONIE_MNS_2013_2014_HILLSHADE",
			"RELIEF/WALLONIE_MNS_2013_2014",
			"RELIEF/WALLONIE_MNS_ORTHOS",
			"RELIEF/WALLONIE_MNT_2013_2014_HILLSHADE",
			"RELIEF/WALLONIE_MNT_2013_2014_SANS_INTERPOLATION",
			"RELIEF/WALLONIE_MNT_2013_2014", */
            //"SOL_SOUS_SOL/BDES_INVENTAIRE",
            'SOL_SOUS_SOL/CARTE_GEOLOGIQUE_SIMPLE',
            //"SOL_SOUS_SOL/CNSW__PRINC_TYPES_SOLS",
            //"SOL_SOUS_SOL/CNSW",
            //"SOL_SOUS_SOL/CONCESSIONS_MINES_SITUATION_ADMIN",
            'SOL_SOUS_SOL/CONCESSIONS_MINES_SUBSTANCES',
            'SOL_SOUS_SOL/CONSULT_SSOL',
            'SOL_SOUS_SOL/DECHETS_MINIERS',
            'SOL_SOUS_SOL/ERRUISSOL__CLASSE_PENTE',
            'SOL_SOUS_SOL/ERRUISSOL__EROSION_DIFFUSE',
            'SOL_SOUS_SOL/ERRUISSOL__MNT',
            'SOL_SOUS_SOL/ERRUISSOL__RUISSELLEMENT_DIFFUS',
            'SOL_SOUS_SOL/GEOLOGIE',
            'SOL_SOUS_SOL/KARST',
            'SOL_SOUS_SOL/LIM_ADMIN_DEE',
            'SOL_SOUS_SOL/TERRILS_2003',
            'SOL_SOUS_SOL/TERRILS_2018',
            'SOL_SOUS_SOL/WALOUS_OCCUPATION_SOL',
            'TEST_LAMB2008/CADMAP_PARCELLES',
            'TEST_LAMB2008/CADMAP',
            'TOPOGRAPHIE/PLANS_TRAVAUXPUBLICS_1950_1973',
            'TOURISME/MASSIFS_FORESTIERS',
            'TOURISME/MDT',

            'EAU/EPRI',
            'AMENAGEMENT_TERRITOIRE/PDS',
            'AMENAGEMENT_TERRITOIRE/PLANHP',
            'DONNEES_BASE/FDC_SPW_ANNOTATIONS',
            'DONNEES_BASE/FDC_SPW_LEGER',
            'DONNEES_BASE/FDC_SPW',
            'DONNEES_BASE/FOND_PLAN_ANNOTATIONS_EU_NB',
            'DONNEES_BASE/FOND_PLAN_ANNOTATIONS_EU',
            'DONNEES_BASE/FOND_PLAN_ANNOTATIONS_LOC_EU_NB',
            'DONNEES_BASE/FOND_PLAN_ANNOTATIONS_RUES_EU_NB',
            'DONNEES_BASE/FOND_PLAN_ANNOTATIONS_RW_NB',
            'DONNEES_BASE/FOND_PLAN_ANNOTATIONS_RW',
            'DONNEES_BASE/FOND_PLAN_CARTE_EU_NB',
            'DONNEES_BASE/FOND_PLAN_CARTE_EU',
            'DONNEES_BASE/FOND_PLAN_CARTE_RESEAUX_EU_NB',
            'DONNEES_BASE/FOND_PLAN_CARTE_RW_NB',
            'DONNEES_BASE/FOND_PLAN_CARTE_RW',
            'EAU/ACCES_BETAIL',
            'EAU/ALEA_INOND_07_16__CHGT_ELEVE',
            'EAU/ALEA_INOND',
            'EAU/ATLAS_HYDRO',
            'EAU/LIDAXES',
            'EAU/MESU',
            'EAU/MOULINS_HYDRO',
            'EAU/PROTECT_CAPT',
            'EAU/RES_EAU_QUAL',
            'EAU/ZI',
            'FAUNE_FLORE/NATURA2000',
            'GEOTRAITEMENT/Profil',
            'HABITAT/BEP_THERMO_ANDEN_FERNE',
            'IGN/FOND_IGN_NB',
            'IGN/LIMITE_REGION',
            'IGN/LIMITES_ADMINISTRATIVES',
            'IMAGERIE/HILLSHADE_HYDRO',
            'IMAGERIE/MNS',
            'IMAGERIE/ORTHO_2006_2007_HILLSHADE',
            'INDUSTRIES_SERVICES/DECHETS',
            'INDUSTRIES_SERVICES/IPE',
            'INDUSTRIES_SERVICES/LCPI',
            'LIMITES/LIMITES_DISTRICTSROUTIERS',
            'LIMITES/LIMITES_ZONESPOLICE',
            'MOBILITE/RAVEL_VELOROUTES',
            'MOBILITE/RES_ROUTIER_PROJETS',
            'MOBILITE/RES_ROUTIER_REGIONAL_PMQ',
            'MOBILITE/RES_ROUTIER_REGIONAL_THEMATIQUE',
            'MOBILITE/RES_ROUTIER_REGIONAL',
            'MOBILITE/RES_ROUTIER_REGIONAL_PMQ',
            'MOBILITE/RES_ROUTIER_REGIONAL_THEMATIQUE',
            'MOBILITE/SDCW',
            'MOBILITE/VOIESNAVIGABLES',
            'PLAN_REGLEMENT/ATLAS_VV_MODIF',
            'PLAN_REGLEMENT/CADMAP_2012_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_2013_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_2014_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_2015_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_2016_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_2017_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_2018_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_2019_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_2020_PARCELLES',
            'PLAN_REGLEMENT/CADMAP_PARCELLES',
            'SOL_SOUS_SOL/CARBIOSOL',
            'SOL_SOUS_SOL/DEC_SOLS_CDF_2010__ESO_CDF',
            'SOL_SOUS_SOL/WALOUS_UTILISATION_SOL',
            'TOURISME/OFFRES_TOURISTIQUES',
            'Utilities/Geometry',
            'WFS/SIGEC_PARC_AGRI_ANON',
        ];
        return id.map((url_id) => base_url + url_id + end);
    }

    async getLayersWallonie() {
        let listArr = [];
        for (let index = 0; index < this.layers_url.length; index++) {
            const url = this.layers_url[index];
            const data = await this.getRequestLayers(url);
            if (data) {
                listArr = this.parse_layers(data, url);
            }
        }
    }
    async getRequestLayers(url) {
        try {
            const { data, status } = await axios.get(
                `${url}service=WMS&request=GetCapabilities`
            );
            if (status === 200) {
                return xml2js(data, { compact: true, spaces: 4 });
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
    _push_layers(list, url) {
        if (list) {
            if (!Array.isArray(list)) {
                list = [list];
            }
            list.map((l) => {
                const obj = {
                    url,
                    id: l.Name._text,
                    name: l.Title._text || l.Title._cdata || l.Abstract._cdata,
                    active: false,
                    layers:
                        Array.isArray(l.Layer) && l.Layer.length > 0
                            ? this._push_layers(l.Layer, url)
                            : [],
                };
                obj.layers.unshift({
                    url,
                    id: l.Name._text,
                    name: l.Title._text || l.Title._cdata || l.Abstract._cdata,
                    active: false,
                });

                this.listLayer.push(obj);
            });
            return this.listLayer;
        }
    }
    parse_layers(data, url) {
        const list = data.WMS_Capabilities.Capability.Layer.Layer;

        //console.log(list);
        return this._push_layers(list, url);
    }
})();
