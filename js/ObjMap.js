var ObjMap = {
        url : 'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=c93ccd9bbe366f3c4a9ecc5560c2beba32261ad9',
        idMap : document.getElementById('map'),
        zoom: 12,
        lat: 45.75,
        lng: 4.85,
        map: null,
        reserver: document.getElementById('boutton'),
        canvas: document.getElementById('canvas'),
        confirmer: document.getElementById('confirmer'), 
        status: document.getElementById('status'),
        adresse: document.getElementById('adresse'),
        veloToto: document.getElementById('velo_toto'),
        veloIndispo: document.getElementById('velo_indispo'),
        veloDispo: document.getElementById('velo_dispo'),
        temp: document.getElementById('time'),
    

        //Initialize la map avec ces cooedonnées
        initMap: function () {
            ObjMap.map = new google.maps.Map(ObjMap.idMap, {
                zoom: ObjMap.zoom,
                center: {
                    lat: ObjMap.lat,
                    lng: ObjMap.lng
                }
            }); 
        },
        
    
        //initialize les marqeurs sur la map avec la req ajax
        initMark: function () {
            Ajax.ajaxGet(ObjMap.url, function (reponse) {
                var stations = JSON.parse(reponse);
                var markers = [];
               
                //Psotionne les marqeurs sur le map
                stations.forEach(function (station) {
                    ObjMap.marker = new google.maps.Marker({
                        position: station.position,
                        map: ObjMap.map,
                        title: station.name
                    });
                
                    markers.push(ObjMap.marker);
                    //on cache ou affiche les boutton selon le status de la station
                    ObjMap.marker.addListener('click', function () {
                        var statutTraduit = '';
                        if (station.status === 'OPEN') {
                            statutTraduit = 'Station ouverte';
                            ObjMap.reserver.style.display = 'block';
                            ObjMap.canvas.style.display = 'none';
                            ObjMap.confirmer.style.display = 'none';
                        }
                        else if (station.status === 'CLOSED') {
                            statutTraduit = 'Station fermer';
                            ObjMap.boutton.style.display = 'none';
                            ObjMap.canvas.style.display = 'none';
                            ObjMap.confirmer.style.display = 'none';                         
                        }
                        else {   
                            statutTraduit = 'En travaux';
                        }
                        // infos de la station cliker envoyer dans le bloc html
                        ObjMap.status.textContent = 'Status : ' + statutTraduit;
                        ObjMap.adresse.textContent = 'Adresse : ' + station.address;
                        ObjMap.veloToto.textContent = 'Nombre de vélo total : ' + station.bike_stands;
                        ObjMap.veloIndispo.textContent = 'Nombre de vélo indisponibles : ' + station.available_bike_stands;
                        ObjMap.veloDispo.textContent = 'nombre de vélo disponibles : ' + station.available_bikes;
                        if (station.available_bikes < 1) {
                            ObjMap.reserver.style.display = 'none';
                        }
                    });
                });
                
                ObjMap.initCluser(ObjMap.map, markers);
            });
        },
           
        //Initialize marlercluster pour le regroupement de marker
        initCluser: function (map, markers) {
            var markerCluster = new MarkerClusterer(ObjMap.map, markers, {
                imagePath: '../images/m/m'
            });
        },
         
        //Initialize le canvas quand on click sur reserver
        initCanvas: function () {
            ObjMap.reserver.addEventListener('click', function () {
                ObjMap.canvas.style.display = 'block';
                sessionStorage.clear();
                clearInterval(ObjMap.temps);
                ObjMap.temp.textContent = 'Auncune réservation en cours ...'
            });
        },
         
        //Initialize le bouton confirmer avec avoir signé
        initConfirmer: function () {
            ObjMap.canvas.addEventListener('click', function () {
                ObjMap.confirmer.style.display = 'block';
            });
        },
    
        //Confirme la réservation en envoyent les données de la station dans session storage
        initTemps: function () {
            ObjMap.confirmer.addEventListener('click', function () {
                ObjMap.initDecompte();
                var data_station = ObjMap.adresse.textContent;
                sessionStorage.setItem('adresse', data_station);
                setTimeout("location.reload(true);", 2000);
            });
        },
    
        //Initialize le decompte de la réservation et envoie les données dans session storage
        initDecompte: function () {
            ObjMap.initTemp = 12000000;
            var dateFinal = new Date().getTime() + ObjMap.initTemp;
            ObjMap.temps = setInterval(function () {
                var dateMaintenant = new Date().getTime();
                var distance = dateFinal - dateMaintenant;
                sessionStorage.setItem('temps', distance);
           
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                ObjMap.temp.textContent = 'Votre réservation prend fin dans ' + minutes +  ' minutes ' + seconds  + ' secondes';
                                    
                if (distance < 0) {
                    distance === 0;
                    ObjMap.temp.textContent = 'Votre réservation à expiré !';
                } 
            }, 999);
        },
       
        //Initialize la recupération des donnés stocker dans le session storage et les affiche au refresh de la page
        initSessionStorage: function () {
            var data_recu = sessionStorage.getItem('adresse');
            ObjMap.adresse.textContent = 'Vous  avez reservé 1 vélo à cette ' + data_recu;
            ObjMap.adresse.style.fontSize = '1.2em';
            if (data_recu === null) {
                ObjMap.adresse.textContent = 'Aucune réservation en cours ...';
            }
            var getTemps = sessionStorage.getItem('temps');  
            var setTemps = Number(getTemps);    
            var dateFinal = new Date().getTime() + setTemps;
            ObjMap.temps = setInterval(function () {
                var dateMaintenant = new Date().getTime();
                var distance = dateFinal - dateMaintenant;
                sessionStorage.setItem('temps', distance);
           
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                ObjMap.temp.textContent = 'Votre réservation prend fin dans ' + minutes +  ' minutes ' + seconds  + ' secondes';
                            
                if (distance < 0) {
                    distance === 0;
                    ObjMap.temp.textContent = 'Votre réservation à expiré !';
                    sessionStorage.clear();
                    //document.location.reload(true);
                }
            }, 999);
        },
        
        // initialize les méthodes de la map
        initRunMap: function () {
            ObjMap.initMap();
            ObjMap.initMark();
            ObjMap.initCanvas();
            ObjMap.initConfirmer();
            ObjMap.initTemps();
            ObjMap.initSessionStorage();
        }
};

