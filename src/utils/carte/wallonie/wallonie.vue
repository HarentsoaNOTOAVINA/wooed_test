<template>
    <div id="cartes">
        <div id="app" class="multiple-cartes" data-id="1">
            <div class="map">
                <div id="map" class="map__container" />
                <div class="map__overlay" v-if="country.loading">
                    <div class="loader" />
                </div>
            </div>

            <div class="menu">
                <form class="menu__search" v-if="country.ready">
                    <input
                        class="searchbar"
                        type="text"
                        placeholder="Rechercher une donnée"
                    />
                    <button type="button" class="trigger">
                        <i class="icon fa fa-search" aria-hidden="true" />
                    </button>
                </form>
                <div class="menu__separator" />
                <div class="menu__topbox">
                    <!--  @change="switch_country" -->
                    <div class="country">Wallonie</div>
                    <!--   <select class="country">
                        <option
                            v-for="(c, i) in countries_data"
                            :value="c.code"
                            :selected="country.code === c.code"
                            :key="i"
                        >
                            {{ c.name }}
                        </option>
                    </select> -->
                    <button class="center" @click="focus_country">
                        Recentrer
                        <i
                            class="map-marker fa fa-map-marker"
                            aria-hidden="true"
                        />
                    </button>
                </div>
                <div
                    class="layers"
                    v-if="
                        country &&
                        Wallonie.listLayer &&
                        Wallonie.listLayer.length > 0
                    "
                >
                    <div class="layers__title">
                        <h2>
                            <i class="fa fa-list-alt" aria-hidden="true" />
                            Données disponibles
                        </h2>
                        <button
                            class="layers__clear"
                            v-if="show_clearButton"
                            @click="clear_layers"
                        >
                            <i class="fa fa-trash" aria-hidden="true" /> Vider
                        </button>
                    </div>
                    <ul class="layers__list">
                        <li
                            class="layers__item"
                            v-for="(layer, layer_index) in Wallonie.listLayer"
                            :key="layer_index"
                        >
                            <div
                                class="layer"
                                :title="layer.name"
                                @click="toggle_accordion(layer_index)"
                            >
                                <div
                                    class="no-select checkbox"
                                    v-if="layer.active"
                                >
                                    <i
                                        class="fa fa-folder-open"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div
                                    class="no-select checkbox"
                                    v-if="!layer.active"
                                >
                                    <i
                                        class="fa fa-folder"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p class="no-select name">
                                    {{ layer.name }}
                                </p>
                            </div>
                            <div v-if="layer.active">
                                <div
                                    class="sublayer"
                                    v-for="(
                                        sublayer, sublayer_index
                                    ) in layer.layers"
                                    :key="sublayer_index"
                                    :title="sublayer.name"
                                    @click="
                                        toggle_subAccordion(
                                            layer_index,
                                            sublayer_index
                                        )
                                    "
                                >
                                    <div
                                        class="no-select checkbox"
                                        v-if="sublayer.active"
                                    >
                                        <i
                                            class="fa fa-times"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <div
                                        class="no-select checkbox"
                                        v-if="!sublayer.active"
                                    />
                                    <p class="no-select name">
                                        {{ sublayer.name }}
                                    </p>
                                </div>
                            </div>

                            <div class="menu__separator" v-if="layer.active" />
                        </li>
                    </ul>
                </div>

                <div class="layers-loading" v-if="!country.ready">
                    <div class="lds-ellipsis">
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Wallonie from '@/lib/cartes/Wallonie';
import Flandres from '@/lib/cartes/Flandres';
import axios from 'axios';
import googleLeaflet from '@/core/lib/google-leaflet';
export default {
    head() {
        return {
            title: this.titre,
            meta: [
                // `hid` est un identifiant unique. N'utilisez pas `vmid` pour cela car cela ne marchera pas.
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Ma description personnalisée',
                },
            ],
            link: [
                {
                    href: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css', //"",
                    rel: 'stylesheet',
                    integrity:
                        'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==',
                    crossorigin: '',
                },
            ],
            script: [
                {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.7.4/proj4.min.js',
                },
                {
                    src: 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js',
                    integrity:
                        'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==',
                    crossorigin: '',
                },
                {
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/proj4leaflet/1.0.2/proj4leaflet.min.js',
                },
            ],
        };
    },
    data() {
        return {
            country_list: [Flandres],
            countries_data: [{ name: 'Veuillez patienter...', code: '??' }],
            country: Flandres,
            Wallonie,
            layers: [],
            show_clearButton: false,
            showing_layer: false,
            bien: null,
            marker: null,
            markerPosition: {},
            product: null,
            layers_shown: [],
            layers_shown_obj: [],
            filter: [],
        };
    },
    watch: {
        product: {
            immediate: true,
            handler(product) {
                console.log(product);
            },
        },
    },
    mounted() {
        this.getLayersWallonie();
        this.getMarker();
    },
    methods: {
        initMap(center) {
            console.log(center);
            this.map = googleLeaflet.initOtherMap('map');

            this.country.loading = false;
            googleLeaflet
                .wms(
                    'https://geoservices.wallonie.be/arcgis/services/IMAGERIE/ORTHO_LAST/MapServer/WMSServer?',
                    {
                        layers: 0,
                        transparent: true,
                        format: 'image/png',
                        tileSize: 512,
                        version: '1.3.0',
                        crs: googleLeaflet.getCRSEPSG3857(),
                    }
                )
                .addTo(this.map);
            googleLeaflet
                .marker([50.1531475, 5.0632167], {
                    icon: { url: '/images/carte/marker0.png', size: 40 },
                })
                .addTo(this.map);
            this.map.setView([50.1531475, 5.0632167], 14);
            this.onClickOnMap();
        },
        getLayersWallonie() {
            Wallonie.getLayersWallonie();
            this.country.ready = true;
        },

        getMarker() {
            this.$services.bien
                .getById('detail', {
                    idTheproperty: this.$route.params.id,
                })
                .then(({ data, status }) => {
                    if (data && data.code === 200) {
                        this.product = data.data;

                        this.initMap([
                            parseFloat(data.data.longitude),
                            parseFloat(data.data.latitude),
                        ]);
                    }
                    console.log(status);
                });

            // this.markerPosition = data.results;
        },
        focus_country() {
            this.country.focus();
            Wallonie.listLayer = [];
            if (
                this.country.layers &&
                this.country.layers.length &&
                this.country.layers.length > 0
            ) {
                // Wallonie.listLayer = Wallonie.listLayer;
                this.country.ready = true;
            }
        },

        toggle_layer(id, subid) {
            if (
                typeof id === 'number' &&
                id >= 0 &&
                id < Wallonie.listLayer.length &&
                typeof subid === 'number' &&
                subid >= 0 &&
                subid < Wallonie.listLayer[id].layers.length
            ) {
                Wallonie.listLayer[id].layers[subid].active =
                    !Wallonie.listLayer[id].layers[subid].active;
                this.setLayer(
                    Wallonie.listLayer[id].layers[subid].id,
                    Wallonie.listLayer[id].layers[subid].active,
                    Wallonie.listLayer[id].layers[subid].url
                );
                if (this.layers_shown.length > 0) {
                    this.show_clearButton = true;
                } else {
                    this.show_clearButton = false;
                }
            }
        },
        setLayer(name, active, url) {
            if (active) {
                const l = googleLeaflet
                    .wms(url, this.getParamsLayer(name))
                    .addTo(this.map);
                this.layers_shown.push(this.getParamsLayer(name));
                this.layers_shown_obj.push(l);
            } else {
                this.removeLayer(name);
            }
        },
        getParamsLayer(name) {
            return {
                layers: name,
                version: '1.3.0',
                transparent: true,
                format: 'image/png',
            };
        },
        removeLayer(name) {
            if (this.map && this.layers_shown.length > 0 && name) {
                let id = this.layers_shown.findIndex((b) => b.layers === name);
                console.log(this.layers_shown);
                console.log(id, name);
                this.map.removeLayer(this.layers_shown_obj[id]);
                this.layers_shown.splice(id, 1);
                this.layers_shown_obj.splice(id, 1);
            }
        },
        toggle_accordion(id) {
            Wallonie.listLayer[id].active = !Wallonie.listLayer[id].active;
        },
        toggle_subAccordion(id, subid) {
            if (!this.showing_layer) {
                this.showing_layer = true;
                this.toggle_layer(id, subid);
                this.showing_layer = false;
            }
        },
        clear_layers() {
            this.country.map.clear_layers();
            this.show_clearButton = false;
            Wallonie.listLayer = Wallonie.listLayer.map((l) => {
                l.active = false;
                l.layers = l.layers.map((l2) => {
                    l2.active = false;
                    return l2;
                });
                return l;
            });
        },
        convertCoordinates(lon, lat) {
            var x = (lon * 20037508.34) / 180;
            var y =
                Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) /
                (Math.PI / 180);
            y = (y * 20037508.34) / 180;
            return [x, y];
        },
        onClickOnMap() {
            this.map.on('click', (evt) => {
                console.log(evt);
                console.log(
                    this.convertCoordinates(evt.layerPoint.x, evt.layerPoint.y)
                );

                //http://geoservices.wallonie.be/cadmap/rest/getShapeParcelleByXY/${evt.layerPoint.x}/${evt.layerPoint.y}
                axios
                    .get(
                        `http://geoservices.wallonie.be/cadmap/rest/getShapeParcelleByXY/${evt.layerPoint.x}/${evt.layerPoint.y}`
                    )
                    .then((data) => {
                        console.log(data);
                    });
                //
            });
        },
        //<button onClick="deeplink('poc://mydeed.calcul.com/route=travaux_form_excel_screen?uid=${this.bien.reference}')">Ouvrir l'application calcul</button>
        init() {
            this.country.create(this.product || null).then(() => {
                console.log(this.product.latitude);
                this.countries_data = this.country_list.map((c) => c.data);
                this.country.init().then(() => {
                    // this.focus_country();
                    // // if (this.bien.country_code === this.country.code)
                    this.marker = this.country.map.create_marker(
                        [
                            parseFloat(this.product.latitude),
                            parseFloat(this.product.longitude),
                        ],
                        `<div class="carte-marker">
                    			<h2>${this.product.title}</h2>
                    			<ul>
                    				<li><span class="carte-marker__list">Adresse:</span> ${this.product.address}</li>
                    				<li><span class="carte-marker__list">Type:</span> ${this.product.operationtype}</li>
                    			</ul>
                    		</div>`
                    );
                });
                this.country.map.map.on('click', (evt) => {
                    console.log(evt);
                    return axios
                        .get(
                            'https://apicarto.ign.fr/api/cadastre/parcelle?_limit=5&geom={"type":"Point","coordinates":[' +
                                evt.latlng.lat +
                                ',' +
                                evt.latlng.lng +
                                ']}'
                        )
                        .then(({ data }) => {
                            console.log(data);
                        })
                        .catch((e) => console.log(e));
                });
            });
        },
    },
};
</script>

<style lang="scss">
#cartes {
    padding-top: 60px;
    height: 100%;
    position: relative;
}
.menu {
    top: 60px !important;
    height: calc(100vh - 60px) !important;
}
.multiple-cartes .menu .layers {
    height: 70vh !important;
    //    margin-bottom: 100px;
}
</style>
