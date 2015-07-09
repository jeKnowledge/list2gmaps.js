var locations = [
  {
    name: "Red Light Software",
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
  },

  {
    name: "Spot C",
    address: "Rua Seixo",
    categories: ["Escola"],

    location: {
      latitude: 42.354716,
      longitude: -3.708729
    }
  },

  {
    name: "Spot D",
    address: "Rua Quinta das Nogueiras",
    categories: ["Escola"],

    location: {
      latitude: 42.354716,
      longitude: -5.708729
    }
  }
];

function descriptionInfoBox (item) {
  return "<p><b>" + item.name + "</b></p><p>" + item.address + "</p>";
}

function descriptionSideInfo (item) {
  return "<div class=\"side-info-div\"><p><b>" + item.name + "</b></p><p>" + item.address + "</p></div>";
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
