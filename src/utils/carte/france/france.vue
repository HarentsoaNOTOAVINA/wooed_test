<template>
    <div>
        <div id="map" />
        <div id="info" />
    </div>
</template>

<script>
import * as Gp from 'geoportal-extensions-leaflet';
export default {
    data() {
        return {
            map: null,
        };
    },
    mounted() {
        Gp.Services.getConfig({
            apiKey: 'jhyvi0fgmnuxvfv0zjzorvdn',
            onSuccess: (e) => {
                console.log(e);
                this.initMap([16.239, -61.545]);
            },
        });
    },
    methods: {
        initMap(center) {
            const L = Gp.LExtended;
            this.map = L.map('map', { crs: L.CRS.EPSG4326 });
            L.geoportalLayer
                .WMS(
                    {
                        layer: 'OI.OrthoimageCoverage',
                    },
                    {
                        // leafletParams
                        opacity: 0.7,
                    }
                )
                .addTo(this.map);
            L.geoportalLayer
                .WMS(
                    {
                        layer: 'BU.Building',
                    },
                    {
                        // on surcharche le style car les styles par defaut pour le WMS INSPIRE vecteur
                        // ne sont pas bien renseignes dans l'autoconf (en cours de correction)
                        styles: 'inspire_common:DEFAULT',
                        transparent: true,
                    }
                )
                .addTo(this.map);
            L.geoportalLayer
                .WMS(
                    {
                        layer: 'TN.RoadTransportNetwork',
                    },
                    {
                        styles: 'inspire_common:DEFAULT',
                        transparent: true,
                    }
                )
                .addTo(this.map);
            L.geoportalLayer
                .WMS(
                    {
                        layer: 'HY.PhysicalWaters',
                    },
                    {
                        styles: 'inspire_common:DEFAULT',
                        transparent: true,
                    }
                )
                .addTo(this.map);
            L.geoportalLayer
                .WMS(
                    {
                        layer: 'GN.GeographicalNames',
                    },
                    {
                        styles: 'inspire_common:DEFAULT',
                        transparent: true,
                    }
                )
                .addTo(this.map);
            this.map.setView(center, 12);
            // L.geoportalLayer
            //     .WMS(
            //         {
            //             layer: 'OI.OrthoimageCoverage',
            //         },
            //         {
            //             // leafletParams
            //             opacity: 0.7,
            //         }
            //     )
            //     .addTo(this.map);
            // this.country.loading = false;
            // googleLeaflet
            //     .wms(
            //         'https://geoservices.wallonie.be/arcgis/services/IMAGERIE/ORTHO_LAST/MapServer/WMSServer?',
            //         {
            //             layers: 0,
            //             transparent: true,
            //             format: 'image/png',
            //             tileSize: 512,
            //             version: '1.3.0',
            //             crs: googleLeaflet.getCRSEPSG3857(),
            //         }
            //     )
            //     .addTo(this.map);

            // googleLeaflet
            //     .marker([50.1531475, 5.0632167], {
            //         icon: { url: '/images/carte/marker0.png', size: 40 },
            //     })
            //     .addTo(this.map);
            // this.map.setView([50.1531475, 5.0632167], 14);

            // googleLeaflet
            //     .wmsGeopottail(
            //         {
            //             layer: 'OI.OrthoimageCoverage',
            //         },
            //         {
            //             // leafletParams
            //             opacity: 0.7,
            //         }
            //     )
            //     .addTo(this.map);
            // googleLeaflet
            //     .wmsGeopottail(
            //         {
            //             layer: 'BU.Building',
            //         },
            //         {
            //             // on surcharche le style car les styles par defaut pour le WMS INSPIRE vecteur
            //             // ne sont pas bien renseignes dans l'autoconf (en cours de correction)
            //             styles: 'inspire_common:DEFAULT',
            //             transparent: true,
            //         }
            //     )
            //     .addTo(this.map);
            // googleLeaflet
            //     .wmsGeopottail(
            //         {
            //             layer: 'TN.RoadTransportNetwork',
            //         },
            //         {
            //             styles: 'inspire_common:DEFAULT',
            //             transparent: true,
            //         }
            //     )
            //     .addTo(this.map);
            // googleLeaflet
            //     .wmsGeopottail(
            //         {
            //             layer: 'HY.PhysicalWaters',
            //         },
            //         {
            //             styles: 'inspire_common:DEFAULT',
            //             transparent: true,
            //         }
            //     )
            //     .addTo(this.map);
            // googleLeaflet
            //     .wmsGeopottail(
            //         {
            //             layer: 'GN.GeographicalNames',
            //         },
            //         {
            //             styles: 'inspire_common:DEFAULT',
            //             transparent: true,
            //         }
            //     )
            //     .addTo(this.map);
            // this.onClickOnMap();
        },
    },
};
</script>

<style lang="scss">
#map {
    padding: 5px;
    width: 100%;
    height: 600px;
    box-shadow: 0 0 10px #999;
}

#info {
    padding: 5px;
    width: 100%;
    height: 20px;
    font-family: 'monospace';
    font-size: 10px;
}
</style>
