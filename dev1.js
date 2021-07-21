let map;
let wktPonto = "POINT(150.501177734375 -34.54590788786563)"
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  
  var wkt = new Wkt.Wkt();

// Read in any kind of WKT string
wkt.read(wktPonto);
let poligono = wkt.toObject();
poligono.setMap(map);
  
  google.maps.event.addListener(map, "idle", function() {
   let latNE = map.getBounds().getNorthEast().lat();
   let lngNE = map.getBounds().getNorthEast().lng();
 
   let latSW = map.getBounds().getSouthWest().lat();
   let lngSW = map.getBounds().getSouthWest().lng();  
   
   
   let wfsbbox = [lngSW, latSW, lngNE, lngNE].join();
   
   console.log(wfsbbox);
   
});
}

