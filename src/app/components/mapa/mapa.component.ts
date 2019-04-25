import { Component, OnInit, Input, ViewChild } from '@angular/core';
declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {
  @Input() coords: string;
  @ViewChild('mapa') mapa;
  constructor() { }

  ngOnInit() {
    const laLng = this.coords.split(',');
    const lat = Number(laLng[0]);
    const lng = Number(laLng[1]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiamVzdXMwMDciLCJhIjoiY2p1ZzFvcWk3MGd2aTN5cXI3eGdwYXN2ZSJ9.l4elnAUIqlmVkRb98EMQeg';
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 15,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map);
  }

}
