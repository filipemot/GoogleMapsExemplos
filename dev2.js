let map;
let polygonSalvo;
let polygonAtual;



function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
  
  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.POLYGON
      ],
    }
  });
  drawingManager.setMap(map);
  
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
	  if (event.type == 'polygon') {
	    let polygonAtual = event.overlay;
	    
	    if(polygonSalvo){
	    	if (confirm('Deseja substituir o poligono ja desenhado?')) {
			  polygonSalvo.setMap(null);
			  polygonSalvo = polygonAtual;
			} else {
			  polygonAtual.setMap(null);
			}
	    } else {
	    	polygonSalvo = polygonAtual;
	    }
	  }
  });

}

function salvar(){
	if(polygonSalvo){
		let wkt = new Wkt.Wkt();
		wkt.fromObject(polygonSalvo);
		console.log(wkt.write());
	}
}

