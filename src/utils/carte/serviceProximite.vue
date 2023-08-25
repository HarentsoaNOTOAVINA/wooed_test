<template>
    <div class="service-proximite">
        <div :class="class_map">
            <Carte
                :loaded="map_loaded"
                :marker="markers"
                :marker_cluster="marker_cluster"
                :center="map_center"
                :request_update="request_update"
                :map_loading="map_loading"
                :current_view="current_view"
            />
            <CategoryService
                v-if="!map_loading"
                :full="category_full"
                :categories="categories"
                :click="get_services"
                :key="category_service_key"
            />
        </div>
        <MenuCarte
            :changed="changed_view"
            :prevent="map_loading || service_proximite.length === 0"
        >
            <template #content>
                <MenuServiceProximite
                    :service_proximite="service_proximite"
                    :click="show_service"
                    :current_service="current_service"
                />
            </template>
        </MenuCarte>
    </div>
</template>

<script>
import axios from 'axios';
import Carte from '@/components/Carte/Carte.vue';
import MenuCarte from '@/components/Carte/MenuCarte/MenuCarte.vue';
import MenuServiceProximite from '@/components/Carte/MenuCarte/MenuServiceProximite/MenuServiceProximite.vue';
import CategoryService from '@/components/Carte/CategoryService/CategoryService.vue';
import '@/components/Carte/ServiceProximite/ServiceProximite.css';

export default {
    components: {
        Carte,
        MenuCarte,
        CategoryService,
        MenuServiceProximite,
    },
    async fetch() {
        const { data, status } = await this.$services.bien.getById('detail', {
            idTheproperty: this.$route.params.id,
        });
        if (status === 200 && data && data.code === 200) {
            this.product = data.data;
            this.map_center[(this.product.latitude, this.product.longitude)];
        }
    },
    data() {
        return {
            map: null,
            categories: [],
            bien: {
                position: [50.8491019, 4.3211432],
                zoom: 16,
            },
            markers: [
                {
                    position: [50.8491019, 4.3211432],
                    options: {
                        icon: {
                            iconUrl: 'images/carte/marker0.png',
                            iconSize: [70, 70],
                        },
                        k: 'hello',
                    },
                    html: '<p>Le bien se trouve ici !</p>',
                    click: () => {
                        console.log('CLIKED !!!!!!!!!!');
                        this.current_view = {
                            position: [...this.bien.position],
                            zoom: this.bien.zoom,
                        };
                    },
                },
            ],
            marker_cluster: [],
            class_map: 'service-proximite__map',
            map_center: [50.8491019, 4.3211432],
            request_update: false,
            category_full: true,
            category_service_key: 0,
            map_loading: true,
            current_view: null,
            service_proximite: [],
            current_service: null,
            product: {},
        };
    },
    created() {
        // this.map_center = [...this.bien.position];
        this.current_view = {
            position: [...this.bien.position],
            zoom: 12,
        };
    },
    methods: {
        get_categoryService() {
            this.map_loading = true;
            axios
                .get('/carte/category-service.json')
                .then(({ data }) => {
                    this.categories = [...data];
                    this.map_loading = false;
                    console.log('Categories: ', data);
                })
                .catch((e) => console.error(e));
        },
        map_loaded() {
            this.get_categoryService();
        },
        changed_view(active) {
            if (active) {
                this.class_map =
                    'service-proximite__map service-proximite__map--less';
                this.category_full = false;
            } else {
                this.class_map = 'service-proximite__map';
                this.category_full = true;
                this.carte_forceRender();
            }
            this.category_forceRender();
        },
        carte_forceRender() {
            this.request_update = !this.request_update;
        },
        category_forceRender() {
            this.category_service_key++;
        },
        get_services(query_id, name) {
            if (query_id) {
                const area = 7768;
                const coordinates = [...this.bien.position];
                const req = `https://places.ls.hereapi.com/places/v1/discover/around?in=${coordinates[0]}%2C${coordinates[1]}%3Br%3D${area}&cat=${query_id}&Accept-Language=fr-FR%2Cfr%3Bq%3D0.9&apiKey=${process.env.SERVICE_PROXIMITE_APIKEY}&size=1000`;
                console.log('Get service: ', query_id);
                this.map_loading = true;
                //this.clear_markerCluster();
                axios
                    .get(req)
                    .then(({ data }) => {
                        //this.marker_cluster = L.markerClusterGroup();
                        // this.services_proximite = data.results.items.map((service, key) => {
                        // 	const icon = L.icon({
                        // 		iconUrl: service.icon || this.marker_default,
                        // 		iconSize: [60, 65],
                        // 	});
                        // 	const marker_service = L.marker(service.position, { icon, k: key });
                        // 	marker_service.on("click", (e) => {
                        // 		const k = e.target.options.k;
                        // 		this.service_show(k);
                        // 	});
                        // 	this.marker_cluster.addLayer(marker_service);
                        // 	// this.map.leaflet.map.fitBounds(this.marker_cluster.getBounds());
                        // 	const service_obj = new ServiceProximiteItem(service);
                        // 	return service_obj;
                        // });
                        // this.map.leaflet.map.addLayer(this.marker_cluster);
                        let clusters = [];
                        const results = data.results.items;
                        this.service_proximite = [];
                        results.forEach((service, key) => {
                            const marker = {
                                position: service.position,
                                options: {
                                    icon: {
                                        iconUrl:
                                            service.icon ||
                                            'images/carte/marker0.png',
                                        iconSize: service.icon
                                            ? [60, 65]
                                            : [70, 70],
                                    },
                                    k: key,
                                },
                                // html: "<a href='#0'>Hello I'm a marker</a>",
                                click: (k) => {
                                    this.show_service(k);
                                },
                            };
                            clusters.push(marker);
                            //Parse services data
                            this.service_proximite.push({
                                position:
                                    Array.isArray(service.position) &&
                                    service.position.length === 2
                                        ? [...service.position]
                                        : null,
                                distance_from_marker:
                                    typeof service.distance === 'number' &&
                                    service.distance >= 0
                                        ? service.distance
                                        : null,
                                name:
                                    typeof service.title === 'string'
                                        ? service.title
                                        : null,
                                category: {
                                    query_id: service.category.id,
                                    name: service.category.title,
                                },
                                icon:
                                    typeof service.icon === 'string'
                                        ? service.icon
                                        : null,
                                adresse:
                                    typeof service.vicinity === 'string'
                                        ? service.vicinity
                                        : null,
                                link:
                                    service.href +
                                        '&Accept-Language=fr-FR%2Cfr%3Bq%3D0.9' ||
                                    null,
                            });
                            const current_index =
                                this.service_proximite.length - 1;
                            this.service_proximite[
                                current_index
                            ].loaded = false;
                        });
                        this.marker_cluster = [...clusters];
                        console.log(
                            `Category ${name} results: `,
                            this.service_proximite
                        );
                        this.map_loading = false;
                    })
                    .catch((e) => console.log(e));
            }
        },
        get_service(link) {
            return axios
                .get(link)
                .then(({ data }) => {
                    let ret = {};
                    const { contacts, tags, extended } = data;
                    ret.contacts = contacts || null;
                    ret.tags = tags || null;
                    ret.opening_hours = null;
                    ret.is_open = -1;
                    ret.payment = null;
                    if (extended) {
                        if (extended.openingHours) {
                            ret.opening_hours = extended.openingHours;
                            ret.is_open = extended.openingHours.isOpen ? 1 : 0;
                        }
                        ret.payment = extended.payment || null;
                    }
                    return ret;
                })
                .catch((e) => console.error(e));
        },
        show_service(k) {
            this.current_service = -1;
            console.log(
                'Getting service data for: ',
                this.service_proximite[k].name
            );
            this.get_service(this.service_proximite[k].link).then((data) => {
                this.service_proximite[k].contacts = data.contacts;
                this.service_proximite[k].tags = data.tags;
                this.service_proximite[k].opening_hours = data.opening_hours;
                this.service_proximite[k].is_open = data.is_open;
                this.service_proximite[k].payment = data.payment;
                console.log('Service: ', this.service_proximite[k]);
                this.current_view = {
                    position: this.service_proximite[k].position,
                    zoom: 18,
                };
                this.current_service = k;
            });
        },
    },
};
</script>
