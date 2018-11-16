//maps
window.myMap = function myMap() {

    var mapElem = document.getElementById("googleMap");
    if (mapElem) {
        var myLatLng = {
            lat: 35.527735,
            lng: 139.699773
        };

        var mapProp = {
            center: new google.maps.LatLng(myLatLng),
            zoom: 16,
            styles: [{
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#7c9eb0'
                    }]
                },
                {
                    elementType: 'geometry.fill',
                    stylers: [{
                        color: '#ecf1f3'
                    }]
                },
                {
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#98bbce'
                    }]
                },

                // {
                //   featureType: '-----------------',
                //   elementType: 'geometry.fill',
                //   stylers: [{color: '#00ff00'}]
                // },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry.fill',
                    stylers: [{
                        color: '#c1d1d9'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.fill',
                    stylers: [{
                        color: '#ffffff'
                    }]
                },

                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#80a0b2'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.fill',
                    stylers: [{
                        color: '#d5dfe5'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#638ba1'
                    }]
                },
            ]

        };
        var map = new google.maps.Map(mapElem, mapProp);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
        marker.setMap(map);
    }
}