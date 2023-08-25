import Pays from "./Pays";

export default new (class Luxembourg extends Pays {
	constructor() {
		super();
		this._center = [49.8149618, 6.1];
		this._zoom = 10;
		this.wms = true;
		this.baselayer = "https://wmts1.geoportail.lu/opendata/service?";
		this.params = {
			layers: "Basemap",
			version: "1.3.0",
			transparent: true,
			format: "image/png",
		};
		this.name = "Luxembourg";
		this.code = "LU";
		this.has_layers = true;
		this.layers_url = ["https://wmts1.geoportail.lu/opendata/service?"];
	}
	setMap(){
		this.map =  new lux.Map({
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

			position: [75977, 75099],
			showLayerInfoPopup: true,
			callback: () => console.log('HELLO WORL!!!!'),
			// click: true,
			//popupTarget: 'map',
		  })

		  	this.map.on("click", (evt) => {
				console.log(evt);
				var coordinate = ol.proj.transform(
					evt.coordinate,
					"EPSG:3857",
					"EPSG:2169"
				);
				lux.reverseGeocode(coordinate, function (address) {
					console.log(address);
				});
			});
	}
})();
