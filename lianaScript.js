


let script = document.createElement('script');

script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDYKkfx6SkANiwdCiUbJdbMg-EUaJ1ktoU&libraries=places&callback=initMap"
script.defer = true;
script.async = true;
window.initMap = initMap;
document.head.appendChild(script);

const styleData = [
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#f84243"
            },
            {
                "weight": "0.25"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#f84243"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#0d0000"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#6bb3a5"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#3986b8"
            },
            {
                "visibility": "on"
            }
        ]
    }
];
let map;
let Popup;
let historicalOverlay;
let usersName;
let usersPhone;
let smallerOverlay;
let imageBounds;
let floatZoom = 14;

let smallerBounds;

function initMap() {
    // Create the map.
    // let homeCoords = {lat: 53.3498123, lng: -6.2624435};
    console.debug("initMap");
    Popup = createPopupClass();
    const centerCoords = {lat: 53.3498123, lng: -6.2624435};
    var styledMapType = new google.maps.StyledMapType(
        [
            // {elementType: 'geometry', stylers: [{visibility: "simplified"}]},
            // {elementType: 'labels.text.fill', stylers: [{color: '#f84243'}]},
            // {elementType: 'labels.text.stroke', stylers: [{color: '#f84243'}]},
            {
                featureType: 'administrative',
                elementType: 'labels.text',
                stylers: [{color: '#f84243'},
                    {
                        weight: 0.25
                    },
                    {
                        lightness: 20
                    }]
            },

            // {
            //     featureType: 'administrative',
            //     elementType: 'labels.text.fill',
            //     stylers: [{color: '#f84243'}]
            // },
            // {
            //     featureType: "administrative.neighborhood",
            //     elementType: "labels.text",
            //     stylers: [
            //         {
            //             color: '#f84243'
            //         }
            //         ,
            //         {
            //             weight: 0.25
            //         },
            //         {
            //             lightness: 45
            //         }]
            // },
            {
                featureType: "administrative.land_parcel",
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    },
                    {
                        color: "#0d0000"
                    }
                ]
            },
            {
                featureType: "landscape",
                elementType: "all",
                stylers: [
                    {
                        color: "#f2f2f2"
                    }
                ]
            },
            {
                featureType: "poi",
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [
                    {
                        visibility: "on"
                    },
                    {
                        color: "#7cbc9f"
                    }
                ]
            },
            {
                featureType: "road",
                elementType: "all",
                stylers: [
                    {
                        saturation: -100
                    },
                    {
                        lightness: 45
                    }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "all",
                stylers: [
                    {
                        visibility: "simplified"
                    }
                ]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                    {
                        visibility: "simplified"
                    }
                ]
            },
            {
                featureType: "road.arterial",
                elementType: "labels.icon",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "transit",
                elementType: "all",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            },
            {
                featureType: "water",
                elementType: "all",
                stylers: [
                    {
                        color: "#36A1D4"
                    },
                    {
                        visibility: "on"
                    }
                ]
            }
        ],
        {name: 'Styled Map'});

    map = new google.maps.Map(document.getElementById('map'), {
        center: centerCoords,
        zoom: 14,
        styles: styleData,
        disableDefaultUI: true,
        gestureHandling: 'none',
        zoomControl: false
    });
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('My Home.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            getPlaces(pos);
            map.setCenter(pos);
            map.setZoom(14);
            const latMult = 0.020;
            const lngMult = 0.044;

            imageBounds = {
                north: pos.lat + latMult,
                south: pos.lat - latMult,
                east: pos.lng + lngMult + 0.001,
                west: pos.lng - lngMult + 0.001,
            };

            smallerBounds = {
                north: pos.lat + 0.015,
                south: pos.lat - 0.015,
                east: pos.lng + 0.031,
                west: pos.lng - 0.031,
            };

            historicalOverlay = new google.maps.GroundOverlay(
                './maskblue.png',
                imageBounds);
            historicalOverlay.setMap(map);

            smallerOverlay = new google.maps.GroundOverlay(
                './maskblue_smaller.png',
                smallerBounds);
            smallerOverlay.setMap(map);
            smallerOverlay.setOpacity(0);

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }

    function getPlaces(pos) {
        let service = new google.maps.places.PlacesService(map);
        console.debug("getPlaces");
        /*let getNextPage = null;
        let moreButton = document.getElementById('more');
        moreButton.onclick = function () {
            console.debug("Clicked more button");
            moreButton.disabled = true;
            if (getNextPage) {
                getNextPage();
            }
        };*/

        service.nearbySearch(
            {
                location: pos,
                radius: 1000,
                keyword: ['landmark']
            },
            function (results, status, pagination) {
                if (status !== 'OK') {
                    console.debug("getPlaces, nearbySearch, status not OK, status: ", status);
                    return;
                }
                createMarkers(results);
            });

        service.nearbySearch(
            {
                location: pos,
                radius: 1000,
                keyword: ['park']
            },
            function (results, status, pagination) {
                if (status !== 'OK') {
                    console.debug("getPlaces, nearbySearch, status not OK, status: ", status);
                    return;
                }
                createMarkers(results);
            });
    }

    function createMarkers(places) {
        // let bounds = new google.maps.LatLngBounds();
        // let placesElement = document.getElementById('places');
        console.debug("createMarkers");
        for (let i = 0; i < places.length; i++) {
            const place = places[i];
            let image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(50, 50)
            };
            let popupDiv = document.createElement('div');
            const contentDiv = document.getElementById('content');
            contentDiv.appendChild(popupDiv);
            let popup = new Popup(
                place.geometry.location,
                popupDiv,
                place.name);
            popup.setMap(map);
            let li = document.createElement('li');
            li.textContent = place.name;
            // placesElement.appendChild(li);
        }
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

/*

function dynInput(cbox) {
    if (cbox.checked) {
        let nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.placeholder = "Name";
        nameInput.id = "name";
        // nameInput.onkeyup ="manage(this)";
        let nameDiv = document.createElement("div");
        nameDiv.id = cbox.name;
        // nameDiv.onkeyup = "manage(this)";
        nameDiv.appendChild(nameInput);
        document.getElementById("insertinputs").appendChild(nameDiv);

        $(nameInput).change(function () {
            usersName = $(nameInput).val();
            console.debug("usersName: ", usersName);
        })

        let phoneInput = document.createElement("input");
        phoneInput.type = "text";
        phoneInput.placeholder = "Phone";
        phoneInput.id = "number";
        let phoneDiv = document.createElement("div");
        phoneDiv.id = cbox.phone;

        phoneDiv.appendChild(phoneInput);
        $(phoneInput).change(function () {
            usersPhone = $(phoneInput).val();
            console.debug("usersPhone: ", usersPhone);
        })
        document.getElementById("insertinputs").appendChild(phoneDiv);
    } else {
        document.getElementById(cbox.name).remove();
        document.getElementById(cbox.phone).remove();
    }
}
*/

//disable submit button
(function () {
    $('.boxes > input').keyup(function () {

        var empty = false;
        $('.boxes > input').each(function () {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#button').attr('disabled', 'disabled');
        } else {
            $('#button').removeAttr('disabled');
        }
    });
})()


$(document).ready(function () {
    console.debug("document ready");
    const phone = $('#number');
    const name = $('#name');
    const loading = $('.loading');
    loading.attr("visibility", "visible");
    $('#printButton').on("click", function () {
        /*if (map) {
            console.debug('Zoom before: ' + map.getZoom())
        }*/
        map.addListener('idle', function() {
            console.debug('Idle listener, zoom: ' + map.getZoom())
            if (floatZoom === 13.9) {
                console.debug('Zoom during: ' + map.getZoom())
                //smallerOverlay.setOpacity(1);
                //historicalOverlay.setOpacity(0);
                console.debug("button click");
                let phoneDiv = document.createElement("div");
                phoneDiv.innerHTML = "<p>" + phone.val() + "</p>";
                phoneDiv.className = "print-hidden print";
                let nameDiv = document.createElement("div");
                nameDiv.innerHTML = "<p>" + name.val() + "</p>";
                nameDiv.className = "print-hidden print";
                $('#name-div').append(nameDiv);
                $('#phone-div').append(phoneDiv);
                window.print();
            }
        });
        map.setZoom(13.9);
        floatZoom = 13.9;
    })

    name.on('keypress', function () {
        console.debug("NAME changed");
        const phoneVal = phone.val();
        const nameVal = name.val();
        if (phoneVal && phoneVal !== '' && nameVal && nameVal !== '') {
            console.debug("Both have values");
            $('#printButton').attr('disabled', false);
        }
    });
    phone.on('keypress', function () {
        console.debug("PHONE changed");
        const phoneVal = phone.val();
        const nameVal = name.val();
        if (phoneVal && phoneVal.length > 6 && nameVal && nameVal.length > 1) {
            console.debug("Both have values");
            $('#printButton').attr('disabled', false);
        }
    });
});

window.onafterprint = function(){
    map.setZoom(14);
    floatZoom = 14;
    console.debug('Zoom after: ' + map.getZoom())
    //smallerOverlay.setOpacity(0);
    //historicalOverlay.setOpacity(1);
    console.log("Printing completed...");
}

function createPopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    console.debug("createPopupClass");

    function Popup(position, content, text) {
        // console.debug("creating popup. Content: ", content);
        this.position = position;
        content.classList.add('popup-bubble');
        content.textContent = text;
        // This zero-height div is positioned at the bottom of the bubble.
        var bubbleAnchor = document.createElement('div');
        bubbleAnchor.classList.add('popup-bubble-anchor');
        bubbleAnchor.appendChild(content);

        // This zero-height div is positioned at the bottom of the tip.
        this.containerDiv = document.createElement('div');
        this.containerDiv.classList.add('popup-container');
        this.containerDiv.appendChild(bubbleAnchor);

        // Optionally stop clicks, etc., from bubbling up to the map.
        google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);
    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function () {
        console.debug('popup onAdd');
        this.getPanes().floatPane.appendChild(this.containerDiv);
    };

    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function () {
        console.debug('popup onRemove');
        if (this.containerDiv.parentElement) {
            this.containerDiv.parentElement.removeChild(this.containerDiv);
        }
    };

    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function () {
        var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);

        // Hide the popup when it is far out of view.
        var display =
            Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                'block' :
                'none';

        if (display === 'block') {
            this.containerDiv.style.left = divPosition.x + 'px';
            this.containerDiv.style.top = divPosition.y + 'px';
        }
        if (this.containerDiv.style.display !== display) {
            this.containerDiv.style.display = display;
        }
    };

    return Popup;
}