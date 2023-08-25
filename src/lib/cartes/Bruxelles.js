import Pays from './Pays'

export default new (class Bruxelles extends Pays {
  constructor() {
    super()
    this._center = [50.854954, 4.3751791]
    this._zoom = 12
    this.wms = true
    this.baselayer = 'https://gis.urban.brussels/geoserver/ows?'
    this.params = {
      layers: 'urbisFRGray',
      transparent: true,
      format: 'image/png',
    }
    this.name = 'Bruxelles'
    this.code = 'BR'
    this.has_layers = true
    this.layers_url = ['https://gis.urban.brussels/geoserver/ows?']
  }
})()
