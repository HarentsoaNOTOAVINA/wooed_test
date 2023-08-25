import axios from 'axios';
import Map from './Map';
import { xml2js } from 'xml-js';

export default class Pays {
    constructor() {
        this.map = new Map();
        this._loading = true;
        this._bounds_polygon = null;
        this._base_map = null;
        this.class_country = 'country disabled';
        this.class_center = 'center disabled';
        this._center = [50.854954, 4.3751791];
        this._zoom = 12;
        this.wms = false;
        this.baselayer = null;
        this.params = {};
        this.name = 'Unknown';
        this.code = '??';
        this.layers = [];
        this.has_layers = false;
        this.ready = false;
    }

    //Getters & setters
    get data() {
        return {
            name: this.name,
            code: this.code,
        };
    }
    get loading() {
        return this._loading;
    }
    set loading(status) {
        if (typeof status === 'boolean') {
            this._loading = status;
            if (this._loading === true) {
                this.class_center = 'center disabled';
                this.class_country = 'country disabled';
            } else {
                this.class_center = 'center';
                this.class_country = 'country';
            }
        }
    }

    //Create new country
    create(bien) {
        if (bien) {
            this.bien = bien;
        }
        return new Promise((resolve, reject) => {
            if (
                this.map.create(
                    this.baselayer,
                    this.params,
                    this.wms,
                    this._center,
                    this._zoom
                )
            ) {
                this.get_bounds()
                    .then((data) => {
                        this._bounds_polygon = this.map.polygon(data);
                        setTimeout(() => {
                            this.loading = false;
                            resolve();
                        }, 2000);
                    })
                    .catch((e) => reject(e));
            } else {
                reject('Unable to create map.');
            }
        });
    }
    //Destroys country
    destroy() {
        if (this.map) {
            console.log('Destroy country ' + this.code);
            if (this._bounds_polygon) {
                this.map.map.removeLayer(this._bounds_polygon);
            }
            this.map.destroy();
            this._bounds_polygon = null;
        }
    }

    //Focus the country
    focus() {
        console.log('Center map to country ' + this.code);
        if (this.map) {
            this.map.center(
                this.bien && this.bien.country_code === this.code
                    ? [this.bien.latitude, this.bien.longitude]
                    : this._center,
                this.bien && this.bien.country_code === this.code
                    ? 18
                    : this._zoom
            );
        }
    }

    //Requests
    get(url, params) {
        if (typeof url === 'string') {
            return axios
                .get(url, { params: { ...params } })
                .then(({ data }) => data)
                .catch((e) => console.error(e));
        }
        return new Promise((resolve, reject) => {
            reject('URL parameter not given.');
        });
    }
    get_json(url, params) {
        if (url) {
            return this.get(url, params || null)
                .then((data) => xml2js(data, { compact: true, spaces: 4 }))
                .catch((e) => console.log(e));
        }
    }
    _push_layers(list, url) {
        if (list) {
            if (!Array.isArray(list)) {
                list = [list];
            }
            return list.map((l) => {
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
                return obj;
            });
        }
    }
    parse_layers(data, url) {
        const list = data.WMS_Capabilities.Capability.Layer.Layer;
        //console.log(list);
        return this._push_layers(list, url);
    }
    get_bounds() {
        return this.get(`../../mocks/countries/${this.name}.json`).then(
            (data) => {
                let parsed_data = null;
                if (data.type === 'GeometryCollection') {
                    parsed_data = data.geometries[0].coordinates[0][0];
                } else if (data.type === 'MultiPolygon') {
                    parsed_data = data.coordinates[0][0];
                }
                if (parsed_data) {
                    return parsed_data.map((p) => p.reverse());
                } else {
                    console.error('Could not parse bounds data.');
                }
            }
        );
    }

    //Layer manipulation
    layer_params(name) {
        return {
            layers: name,
            version: '1.3.0',
            transparent: true,
            format: 'image/png',
        };
    }
    toggle_layer(name, active, url) {
        console.log('Toggle layer ' + name);
        if (active) {
            this.map.show_layer(url, this.layer_params(name));
        } else {
            this.map.hide_layer(name);
        }
    }

    async get_layer(url) {
        const layers = await this.get_json(
            `${url}service=WMS&request=GetCapabilities`
        );
        return this.layers.concat(this.parse_layers(layers, url));
    }
    init() {
        if (
            Array.isArray(this.layers_url) &&
            this.layers_url.length > 0 &&
            this.has_layers
        ) {
            console.log('Init country ', this.code);
            return new Promise((resolve) => {
                this.layers = [];
                for (let i = 0; i < this.layers_url.length; i++) {
                    this.layers = this.get_layer(this.layers_url[i]);
                }
                resolve();
            });
        } else {
            return new Promise((resolve) => {
                resolve();
            });
        }
    }
}
