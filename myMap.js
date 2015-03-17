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

//var infoMarkers;

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


    for(var i = 0; i < infoMarkers.length; i++) {
        categories = [];
        infoMarkers[i] = infoMarkers[i].split(",");
        for(var k = 1; k < infoMarkers[i].length - 7; k++) {
            categories[categories.length] = infoMarkers[i][7+k];

            if($.inArray(infoMarkers[i][7+k], categoriesCheckBox) <= -1) {
                categoriesCheckBox[categoriesCheckBox.length] = infoMarkers[i][7+k];
            }
        }

        console.log("name: " + infoMarkers[i][0] + "\tcategories: " + categories);

        addMakers(createMarkerOptions(infoMarkers[i][0], infoMarkers[i][1], infoMarkers[i][2], infoMarkers[i][3], categories, infoMarkers[i][4], infoMarkers[i][5], infoMarkers[i][6], infoMarkers[i][7]));
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
        checkbox.id = categoriesCheckBox[i].replace(" ", "-");
        checkbox.name = "categorie";
        checkbox.value = categoriesCheckBox[i];
        checkbox.checked = true;

        label.appendChild(checkbox);
        label.appendChild(description);
        label.appendChild(mybr);

        document.getElementById('mapOptions').appendChild(label);

        $('#' + categoriesCheckBox[i].replace(" ", "-")).change(handleCheckBox);
    }
}

function handleCheckBox() {
    if($(this).is(':checked')) {
        for(var i = 0; i < places.length - 1; i++) {
            if($.inArray(this.value, places[i].categories) > -1) {
                markers[i].setVisible(true);
                console.log(places[i].name + " true");
            }
        }
    } else {
        for(var k = 0; k < places.length - 1; k++) {
            if($.inArray(this.value, places[k].categories) > -1) {
                markers[k].setVisible(false);
                console.log(places[k].name + " false");
            }
        }
    }
}
