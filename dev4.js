let map;
let pontoCarregado;
let wktPonto = "POLYGON((149.30366796875 -33.0008946799851,149.5288876953125 -33.78514475052631,149.9683408203125 -33.32737781104985,149.732134765625 -32.968640429033705,149.30366796875 -33.0008946799851))"

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });



}

function carregar(){
var wkt = new Wkt.Wkt();

// Read in any kind of WKT string
wkt.read(wktPonto);
let poligono = wkt.toObject();
poligono.setMap(map);

}

