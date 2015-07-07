var locations = [
    {
        name: "jeKnowledge",
        address: "Rua Larga",
        categories: ["Empresa", "Eventos"],

        location: {
            latitude: 40.214716,
            longitude: -8.408729
        }
    },

    {
        name: "Spot B",
        address: "Rua Coiso",
        categories: ["Escola", "Eventos"],

        location: {
            latitude: 40.354716,
            longitude: -3.708729
        }
    }
];

function descriptionInfoBox(item) {
    return "<p><b>" + item.name + "</b></p><p>" + item.address + "</p>";
}

function descriptionSideInfo(item) {
    return "<p><b> This marker name is " + item.name + "</b></p><p> And this is the address: " + item.address + "</p>";
}

$(document).ready(function () {
    var myMap = new list2gmaps('map', locations);

    //adds info boxes to the markers on the map
    myMap.addInfoBoxes(descriptionInfoBox);

    //adds the checkbox panel
    myMap.addCheckBoxPanel('checkbox');

    //adds the lateral information panel
    myMap.addSideInfoPanel('info', descriptionSideInfo, true);

    myMap.identifier = function (item) {
        return item.name + " " + item.address;
    };

    myMap.show();
});
