export default {
  markers: [],
  geocoder: () => {
    return new google.maps.Geocoder()
  },
  render(el, options) {
    const map = this.map(el, options.styles)
    this.geocodeAddress(options, map)
    return map
  },
  map(el, styles) {
    return new google.maps.Map(el, {
      zoom: 13,
      styles: styles || {},
    })
  },
  autocomplete($el, options = {}) {
    const $input = $el
    let autocomplete = new google.maps.places.Autocomplete($el, {
      types: ['geocode'],
    })
    let map = null
    if (!options.map) {
      const randomId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      const div = document.createElement('div')
      div.id = `autocomplete-${randomId}`
      map = this.map(div)
    }

    if (map) {
      autocomplete.bindTo('bounds', map)
    }

    if (options.showOnMap) {
      this.geocodeAddress({ address: options.address }, map, 'SHOW_MARKER')
    }

    autocomplete.setFields(['address_component', 'geometry', 'name'])
    autocomplete.addListener('place_changed', () => {
      const { geometry, name } = autocomplete.getPlace()

      const position = geometry.location
      const latlng = new google.maps.LatLng(position.lat(), position.lng())

      const setDefaultValue = (key, field) => {
        const sel = options[key]
        if (sel && field) {
          const $input = document.getElementById(sel)
          if ($input) {
            // $input.focus();
            $input.value = field.long_name
            if ('createEvent' in document) {
              var evt = document.createEvent('HTMLEvents')
              evt.initEvent('focus', false, true)
              $input.dispatchEvent(evt)
            } else {
              $input.fireEvent('focus')
            }
          }
        }
      }

      const onAutocomplete = (results) => {
        const { address_components } = results.filter(
          ({ formatted_address }) => {
            const regExp = new RegExp('^' + name)
            return regExp.test(formatted_address)
          }
        )[0]
        const getCurrentField = (type) => {
          return (
            address_components.filter((item) => {
              if (item.types.includes(type)) {
                return item
              }
            })[0] || {}
          )
        }

        const currentPostalCode = getCurrentField('postal_code')
        const currentLocality = getCurrentField('locality')
        const currentCountry = getCurrentField('country')
        const currentStreetNumber = getCurrentField('street_number')
        const currentRoute = getCurrentField('route')

        const { lat, lng } = geometry.location
        $input.addresses = {
          name: $input.value,
          latitude: lat(),
          longitude: lng(),
          city: currentLocality.long_name,
          country: currentCountry.long_name,
          streetNumber: currentStreetNumber.long_name,
          street: currentRoute.long_name,
        }

        const setPropertyAddress = (key, field) => {
          if (field) {
            $input.addresses[key] = field.long_name
          }
        }

        setPropertyAddress('postalCode', currentPostalCode)
        setPropertyAddress('locality', currentLocality)
        setPropertyAddress('country', currentCountry)

        setDefaultValue('postalCode', currentPostalCode)
        setDefaultValue('locality', currentLocality)
        setDefaultValue('country', currentCountry)

        if (currentPostalCode) {
          $input.addresses.postalCode = currentPostalCode.long_name
        }

        if (map) {
          this.geocodeAddress(
            {
              position: {
                lat: lat(),
                lng: lng(),
              },
              ...options,
            },
            map,
            'SHOW_MARKER'
          )
          const event = new CustomEvent('autocompleteDone', {
            detail: {
              position: {
                lat: lat(),
                lng: lng(),
              },
              zip: currentPostalCode.long_name,
              city: $input.addresses.city,
              country: $input.addresses.country,
              streetNumber: $input.addresses.streetNumber,
              street: $input.addresses.street,
              name: $input.value,
            },
          })
          $input.dispatchEvent(event)
        }
      }

      this.geocoder().geocode({ location: latlng }, onAutocomplete)
    })
  },
  geocodeAddress(
    { address, icon, onMarkerClick, data, getMarkers, opacity, position },
    map,
    type
  ) {
    let marker
    const showMarkerAddress = (location) => {
      map.setCenter(location)
      if (marker && marker.setMap) {
        marker.setMap(null)
        marker = null
      }
      if (type === 'SHOW_MARKER') {
        const markerOptions = {
          map,
          position: location,
          ...(data ? { data } : {}),
          opacity,
        }
        let iconMarker = {}
        if (icon) {
          const { url, size } = icon
          if (url) {
            iconMarker = {
              url,
              size: new google.maps.Size(size[0], size[1]),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 32),
            }
          }
        }

        if (Object.keys(iconMarker).length) {
          markerOptions.icon = iconMarker
        }
        marker = new google.maps.Marker(markerOptions)
        marker.setMap(map)
        if (icon) {
          this.markers = [...this.markers, marker]
        }
        if (onMarkerClick) {
          marker.addListener('click', function () {
            onMarkerClick(marker, map)
          })
        }
        if (getMarkers) {
          getMarkers(this.markers)
        }
      }
    }
    if (!position) {
      this.geocoder().geocode({ address }, function (results, status) {
        if (status === 'OK') {
          const { location } = results[0].geometry
          showMarkerAddress(location)
        }
      })
    } else {
      const latlng = new google.maps.LatLng(position.lat, position.lng)
      this.geocoder().geocode({ location: latlng }, function () {
        showMarkerAddress(latlng)
      })
    }
  },
  clustering: (markers, map) => {
    // this.markers = []
    new MarkerClusterer(map, markers, {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    })
  },
}
