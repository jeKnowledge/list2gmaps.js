//Map options
var mapOptions = {
    center: new google.maps.LatLng(39.645553, -8.069518),
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//Arrays de markers
var places = [];
var infoBoxes = [];
var markers = [];
var categoriesCheckBox =[];

var infoEmpresas;

//criar marker com todas as informações
function createMarkerOptions(name, phone, email, website, categories, address, postCode, lat, long) {
    var place = {};

    place.name = name;
    place.phone = phone;
    place.email = email;
    place.website = website;
    place.categories = categories;
    place.address = address;
    place.postCode = postCode;
    place.lat = lat;
    place.long = long;

    return place;
}

//adicionar marker aos arrays
function addMakers(place) {
    places[places.length] = place;
    markers[markers.length] = new google.maps.Marker({position: new google.maps.LatLng(place.lat, place.long), visible: true});
    infoBoxes[infoBoxes.length] = new google.maps.InfoWindow({content: "<p><b>" + place.name + "</b><br />" + place.address + "<br />" + place.phone + "<br />" + place.email + "<br />" + place.website + "</p>"});
}


//adicionar o pop up
function addEvent(map, infoBox, marker) {
    google.maps.event.addListener(marker, 'click', function(e) {
        infoBox.open(map, marker);
    });
}

function createMap() {
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var categories;


    for(var i = 0; i < infoEmpresas.length; i++) {
        categories = [];
        infoEmpresas[i] = infoEmpresas[i].split(",");

        for(var k = 1; k < infoEmpresas[i].length - 7; k++) {
            categories[categories.length] = infoEmpresas[i][7+k];

            if(categoriesCheckBox.indexOf(infoEmpresas[i][7+k]) <= -1) {
                categoriesCheckBox[categoriesCheckBox.length] = infoEmpresas[i][7+k];
            }
        }

        addMakers(createMarkerOptions(infoEmpresas[i][0], infoEmpresas[i][1], infoEmpresas[i][2], infoEmpresas[i][3], categories, infoEmpresas[i][4], infoEmpresas[i][5], infoEmpresas[i][6], infoEmpresas[i][7]));
        markers[i].setMap(map);
        addEvent(map, infoBoxes[i], markers[i]);
    }
    createCheckBoxes();
}

//Criar menu
function createCheckBoxes() {
    var label;
    var description;
    var checkbox;
    var mybr;

    for (var i = 0; i < categoriesCheckBox.length; i++) {
        mybr = document.createElement('br');
        label = document.createElement("label");
        description = document.createTextNode(categoriesCheckBox[i]);
        checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.id = categoriesCheckBox[i];
        checkbox.name = "categorie";
        checkbox.value = categoriesCheckBox[i];
        checkbox.checked = true;

        label.appendChild(checkbox);
        label.appendChild(description);
        label.appendChild(mybr);

        document.getElementById('mapOptions').appendChild(label);

        $('#' + categoriesCheckBox[i]).change(handleCheckBox);
    }
}

function handleCheckBox() {
    if($(this).is(':checked')) {
        for(var i = 0; i < places.length - 1; i++) {
            if(places[i].categories.indexOf(this.value) > -1) {
                markers[i].setVisible(true);
                console.log(places[i].name + " true");
            }
        }
    } else {
        for(var k = 0; k < places.length - 1; k++) {
            if(places[k].categories.indexOf(this.value) > -1) {
                markers[k].setVisible(false);
                console.log(places[k].name + " false");
            }
        }
    }
}

//função inicial que vai carregar tudo
function initialize() {
    var infoFile = new XMLHttpRequest();
    var self = this;
    infoFile.open("GET", "test.csv", true);

    infoFile.onreadystatechange = function() {
        if (infoFile.readyState === 4) {
            self.infoEmpresas = infoFile.responseText.split("\n");
            createMap();
        }
    };
    infoFile.onError = function() {
        alert("Error loading file!");
    };
    infoFile.send(null);
}

$(document).ready(function () {
    initialize();
});
