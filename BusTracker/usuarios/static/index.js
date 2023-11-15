let map;
function initpam(){
    const colCoords = {lat: 4.57, lng:-74.29};
    const map = new google.maps.Map(mapDiv, {
        center: colCoords,
        zoom: 6,
    });
    const marker = new google.maps.Marker({
        position: colCoords,
        map,
    });

    button2.addEventListener('click', ()=>{
        const coords2 = {
            lat: 6.200271,
            lng: -75.577620
        };
        map.setCenter(coords2);
        map.setZoom(17);
        marker.setPosition(coords2);
    })

    button3.addEventListener('click', ()=>{
        const coords3 = {
            lat: 6.214070,
            lng: -75.576224
        };
        const marker = new google.maps.Marker({
            position: coords3,
            map,
            icon:"./icons/icon_bus.png"
        })
        google.maps.event.addEventListener(marker,"click",()=>{
            map.setCenter(coords3);
            map.setZoom(17);
        });
    })

    button.addEventListener('click', ()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    console.log(coords);
                    map.setCenter(coords);
                    map.setZoom(17);
                    marker.setPosition(coords);

                    // Punto de partida y destino
                    var startPoint = new google.maps.LatLng(coords[0], coords[1]);
                    var endPoint = new google.maps.LatLng(6.200271, -75.577620);

                    // Configuración del objeto de solicitud de ruta
                    var directionsService = new google.maps.DirectionsService();
                    var request = {
                    origin: startPoint,
                    destination: endPoint,
                    travelMode: google.maps.TravelMode.DRIVING // Modo de viaje: en auto
                    };

                    // Hacer la solicitud al servicio de direcciones
                    directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        // Tiempo estimado de viaje en segundos
                        var duration = response.routes[0].legs[0].duration.value;

                        // Convertir tiempo en segundos a minutos
                        var durationInMinutes = duration / 60;

                        console.log('Tiempo aproximado de viaje en minutos:', durationInMinutes);
                    } else {
                        console.error('Error al calcular la ruta:', status);
                    }
                    });
                },
                ()=>{
                    alert('Tu navegador esta bien, pero ocurrio algun problema')
                }
            );
        }else{
            alert(
                "Tu navegador no dispone de la geolocalizacion, actualizalo para continuar"
            );
        }
    })

}