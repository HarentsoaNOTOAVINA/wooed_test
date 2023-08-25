import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet";
import "./Leaflet.GoogleMutant";
import "leaflet.markercluster";
import mapStyle from "@/core/constants/map-style";
// import 'leaflet-draw/dist/leaflet.draw-src.css'

export default {
	init($map) {
		const map = L.map($map, {
			zoomControl: false,
		});

		L.control
			.zoom({
				position: "bottomright",
			})
			.addTo(map);

		L.gridLayer
			.googleMutant({
				maxZoom: 24,
				type: "roadmap",
				styles: mapStyle,
			})
			.addTo(map);
		return map;
	},
	initOtherMap($map){
		const map = L.map($map);
		return map
	},
	initOtherMapParams($map){
		const map = L.map($map,{crs : L.CRS.EPSG4326});
		return map
	},
	center($map,center, zoom) {
		if ($map && center && zoom) {$map.setView(center, zoom);}
	},
	marker([lat, lng], options) {
		const { url, size } = options.icon;
		return L.marker([lat, lng], {
			icon: this.addIcons(url, size),
		});
	},
	markerText([lat, lng], options) {
		const { text } = options;
		return L.marker([lat, lng], {
			icon: this.textIcon(text),
		});
	},
	textIcon(text, activeClass = "") {
		return new L.DivIcon({
			className: "marker-text " + activeClass,
			html: `<span>${text}</span>`,
		});
	},
	addIcons(url, size) {
		return L.icon({
			iconUrl: url,
			iconSize: size,
		});
	},
	markerCluster() {
		return L.markerClusterGroup({
			iconCreateFunction: function (cluster) {
				let count = cluster.getChildCount();
				let size = "";
				if (count <= 100) {
					size = "x-small";
				} else if (count > 100 && count <= 500) {
					size = "small";
				} else if (count > 500 && count <= 1000) {
					size = "medium";
				} else if (count > 1000 && count <= 2000) {
					size = "large";
				} else {
					size = "x-large";
				}

				return L.divIcon({
					className: "custom-cluster custom-cluster-" + size,
					iconSize: L.point(30, 30),
					html: count,
				});
			},
		});
	},
	latlng({ lat, lng }) {
		return L.latLng(lat, lng);
	},
	markerGroup(map) {
		return L.layerGroup().addTo(map);
	},
	wms(url, layer) {
		return L.tileLayer.wms(url, layer);
	},
	betterWMS(url, layer) {
		return L.tileLayer.betterWMS(url, layer);
	},
	controls(basemaps, map) {
		return L.control.layers(basemaps).addTo(map);
	},
	layerGroup(layers, map) {
		return L.layerGroup(layers).addTo(map);
	},
	tileLayer(url, layer) {
		return L.tileLayer(url, layer);
	},
	removeLayer(map, layer) {
		return map.removeLayer(layer);
	},
	getCRS() {
		return L.CRS.EPSG4326;
	},
	getCRSEPSG3857() {
		return L.CRS.EPSG3857;
	},
	wmsGeopottail(url,params){
		return L.geoportallayer.wms(url,params)
	}
};
