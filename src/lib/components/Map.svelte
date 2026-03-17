<script lang="ts">
  import { onMount } from "svelte";
  import "leaflet/dist/leaflet.css";

  let mapContainer: HTMLDivElement | null = null; //store in div or null
  let map: any;

  let {
    findLat = $bindable<number | null>(null),
    findLng = $bindable<number | null>(null),
  }: { findLat: number | null; findLng: number | null } = $props();

  onMount(async () => {
    const L = await import("leaflet"); //load only when ehres mapcontainer

    if (!mapContainer) return; //prevents map(null)

    const greenIcon = L.icon({
      iconUrl: "/images/leaf-green.png",
      shadowUrl: "/images/leaf-shadow.png",

      iconSize: [30, 55], // size of the icon
      shadowSize: [30, 70], // size of the shadow
      iconAnchor: [-15, 50], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 60], // the same for the shadow
      popupAnchor: [-20, -200], // point from which the popup should open relative to the iconAnchor
    });

    const createMap = (lat: number, lng: number) => {
      map = L.map(mapContainer).setView([lat, lng], 13); //latitude,lougitude, (default)
      // 2 = world view,5 = country/large region,13 = city-level close view,18 = very close street/building area

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //z = zoom ,x&y = position
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map); //addTo to appear on ui

      L.marker([lat, lng], { icon: greenIcon }).addTo(map); //marker on default location
      return () => {
        map?.remove();
      };
    };

    if (findLat !== null && findLng !== null) {
      createMap(findLat, findLng);
    } else {
      //Browser Geolocation API ask location
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        createMap(lat, lng);
      });
    }
  });
</script>

<div bind:this={mapContainer} class="w-full h-150"></div>
