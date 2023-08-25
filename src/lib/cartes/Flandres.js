import Pays from './Pays'

export default new (class Flandres extends Pays {
  constructor() {
    super()
    this._center = [51.0948841, 3.6662191]
    this._zoom = 8
    this.wms = true
    this.baselayer =
      'https://europa.eu/webtools/maps/tiles/osm-ec/{z}/{x}/{y}.png'
    this.params = {}
    this.name = 'Flandres'
    this.code = 'FL'
    this.has_layers = true
    this.layers_url = [
      'https://inspire.informatievlaanderen.be/raadpleegdiensten/hy/wms?',
    ]
  }
})()
