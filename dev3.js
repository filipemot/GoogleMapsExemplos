let map;
let pontoSalvo;
let pontoAtual;
  let infowindow;
  const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  infowindow = new google.maps.InfoWindow({
    content: contentString,
  });  
  
  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER
      ],
    }
  });
  drawingManager.setMap(map);
  
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
	  if (event.type == 'marker') {
	    let pontoAtual = event.overlay;
	    
	    if(pontoSalvo){
	    	if (confirm('Deseja substituir o ponto ja desenhado?')) {
			  pontoSalvo.setMap(null);
			  pontoSalvo = pontoAtual;
			} else {
			  pontoAtual.setMap(null);
			}
	    } else {
	    	pontoSalvo = pontoAtual;
	    }
	    
	    pontoSalvo.addListener("click", () => {
		    infowindow.open({
		      anchor: pontoSalvo,
		      map,
		      shouldFocus: false,
		    });
		  });
	  }
  });

}

function salvar(){
	if(pontoSalvo){
		let wkt = new Wkt.Wkt();
		wkt.fromObject(pontoSalvo);
		console.log(wkt.write());
	}
}

