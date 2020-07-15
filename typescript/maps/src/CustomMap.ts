// Instructions to every other class on how they can be an argument to 'addMarker'
export interface Markable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
}

export class CustomMap {
  constructor(elementId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(elementId), {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 1
    });
  }

  private googleMap: google.maps.Map; // defaults to public

  addMarker(markable: Markable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: markable.location.lat,
        lng: markable.location.lng
      }
    });

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: markable.markerContent()
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
