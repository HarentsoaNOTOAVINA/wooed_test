<template>
    <div id="app" class="mapslux">
        <div class="mapslux__map">
            <div id="info" />
            <div id="map" class="display" />
            <!-- <div class="overlay">
            <div id="search" class="search"></div>
            <p id="coordinates" class="coordinates"></p>
          </div> -->
        </div>
        <div class="menu">
            <div>
                <div class="mapslux__controls">
                    <div class="container">
                        <div class="head">
                            <h1 class="mapslux__title">Luxembourg</h1>
                        </div>
                        <div class="separator" />
                        <div class="container-layer">
                            <div id="layers" class="layers" ref="list" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    // head() {
    //     return {
    //         script: [
    //             {
    //                 src: '//apiv3.geoportail.lu/apiv3loader.js',
    //                 type: 'text/javascript',
    //             },
    //         ],
    //     };
    // },
    data() {
        return {
            menu: false,
            markerPosition: null,
            country: {
                loading: false,
            },
        };
    },
    created: async function () {
        await this.getMarker();
        let positionMarker = this.markerPosition;
        console.log('this.markerPositions', positionMarker);
        axios
            .get('https://map.geoportail.lu/jsapilayers')
            .then((response) => {
                const layers = response.data;
                console.log('>>>>>>>>>', layers);
                let layer_names = [];
                let layer_visibilities = [];
                let layer_opacity = [];
                for (let element in layers) {
                    layer_names.push(layers[element].name);
                    layer_opacity.push(0.5);
                    if (layers[element].name === 'parcels_daily') {
                        layer_visibilities.push(true);
                    } else {
                        layer_visibilities.push(false);
                    }
                }
                var coordinate = new ol.proj.transform(
                    /*  evt.coordinate */
                    this.convertCoordinates(
                        positionMarker.lng,
                        positionMarker.lat
                    ),
                    'EPSG:3857',
                    'EPSG:2169'
                );
                this.map = new lux.Map({
                    target: 'map',
                    bgLayer: 'blank',
                    layers: layer_names,
                    //layers: layer_names,
                    layerVisibilities: layer_visibilities,
                    layerOpacities: layer_opacity,
                    layerManager: {
                        target: 'layers',
                    },
                    zoom: 14,
                    position: coordinate,
                    showLayerInfoPopup: true,
                    callback: () => console.log('HELLO WORL!!!!'),
                });
                this.map.on('click', (evt) => {
                    console.log(evt);
                    var coordinate = new ol.proj.transform(
                        /*  evt.coordinate */
                        this.convertCoordinates(
                            positionMarker.lng,
                            positionMarker.lat
                        ),
                        'EPSG:3857',
                        'EPSG:2169'
                    );
                    lux.reverseGeocode(coordinate, function (address) {
                        console.log(address);
                    });
                });

                this.map.showMarker({
                    // position: [75977, 75099],
                    positioning: 'center-center',
                    position: [positionMarker.lng, positionMarker.lat],
                    positionSrs: 4326,
                    iconURL: '/images/carte/marker0.png',
                    click: true,
                    html: `<button class="mydeed_trigger" v-on:click="deeplink('poc://mydeed.calcul.com/route=travaux_form_screen?region=BR?id=123', 'com.whatsapp', '310633997')" >Ouvrir l'application calcul</button>`,
                });
            })
            .catch((e) => console.log(e));
    },
    methods: {
        convertCoordinates(lon, lat) {
            var x = (lon * 20037508.34) / 180;
            var y =
                Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) /
                (Math.PI / 180);
            y = (y * 20037508.34) / 180;
            return [x, y];
        },
        handleMenu: function () {
            this.menu = !this.menu;
        },
        getMarker: async function () {
            const { data } = await this.$services.bien.getById('detail', {
                idTheproperty: this.$route.params.id,
            });
            if (data && data.code === 200) {
                this.markerPosition = {
                    lat: parseFloat(data.data.latitude),
                    lng: parseFloat(data.data.longitude),
                };
                console.log(this.markerPosition);
            }
            // this.markerPosition = data.results;
            console.log('lux', data);
        },
        deeplink: function (app, storeandroid, storeios) {
            //Usage: deeplink('poc://mydeed.calcul.com?test=Hello', 'com.whatsapp', '310633997')
            const OSs = {
                android: {
                    store_prefix:
                        'https://play.google.com/store/apps/details?id=',
                    test: /Android/i,
                },

                iOS: {
                    store_prefix: 'https://itunes.apple.com/en/app/id',
                    test: /iPhone|iPad|iPod/i,
                },
            };
            const get_userAgent = () => {
                for (let k in OSs) {
                    if (navigator.userAgent.match(OSs[k].test)) {
                        return k;
                    }
                }
            };
            const OS = get_userAgent();
            const store = OS === 'android' ? storeandroid : storeios;
            if (!app) {
                return;
            } else if (OS && app) {
                const start = new Date().getTime();
                const delay = 2000;
                window.location.href = app;
                setTimeout(function () {
                    const now = getTime();
                    if (now >= start + delay * 2) {
                        return;
                    }
                    if (store) {
                        window.location.href = OSs[OS].store_prefix + store;
                    }
                }, delay);
            }
        },
    },
};
</script>

<style lang="scss">
#app {
    position: relative;
    padding-top: 70px;
    height: 100%;
}
.menu {
    top: 70px;
    width: 420px;
    height: calc(100% - 70px);
    overflow: hidden;
    background: whitesmoke;
    box-shadow: 0px 0px 10px #646464;
    position: absolute;

    right: 0;
    z-index: 9999;
}
.layers {
    li {
        font-size: 12px;

        color: #616161;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        top: -2px;
    }
}
.container-layer {
    display: flex;
    flex-direction: column;
    width: calc(100% - 40px);
    padding: 10px;
    height: 75vh;
    border-radius: 10px;
    overflow: auto;
    background: white;
    box-shadow: 0px 0px 1px black;
    margin: 10px 20px 10px 20px;
}
.mapslux__controls {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>
