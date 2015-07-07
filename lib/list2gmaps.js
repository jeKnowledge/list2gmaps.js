var list2gmaps = (function () {
    var categories;
    var markers;
    var map;

    var mapOptions = {
        center: new google.maps.LatLng(39.645553, -8.069518),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    //create a new marker object and adds it to the end of the markers array
    var createMarker = function (information, latitude, longitude) {
        var newMarker = new google.maps.Marker({
            title: information.name,
            info: information,
            position: new google.maps.LatLng(latitude, longitude),
            visible: true,
            onMap: true
        });

        markers[markers.length] = newMarker;

        return newMarker;
    };

    //create a new info box object
    var createInfoBox = function (marker, information) {
        var newInfoBox = new google.maps.InfoWindow({
            content: information
        });

        return newInfoBox;
    };

    //adds an event to the given maker that triggers the info box to pop up
    var addEventMarker = function (marker, infoBox) {
        google.maps.event.addListener(marker, 'click', function () {
            infoBox.open(map, marker);
        });
    };


    //adds a checkbox to the html page that control the markers in the map
    //adds a checkbox to the html page that
    var addCheckBox = function (selector, item, marker) {
        var len;
        var li;
        var description;
        var checkbox;

        $.each(item.categories, function (index, category) {
            if (categories.hasOwnProperty(category) === false) {
                li = document.createElement('li');
                description = document.createTextNode(category);
                checkbox = document.createElement('input');

                checkbox.type = 'checkbox';
                checkbox.value = category;
                checkbox.id = category.replace(/ /g, "-");
                checkbox.class= "list2gmaps-category-checkbox";
                checkbox.checked = true;

                li.appendChild(checkbox);
                li.appendChild(description);

                $('#' + selector).append(li);
                $('#' + category.replace(/ /g, "-")).change(handler);

                categories[category] = [marker];
            } else {
                len = categories[category].length;
                categories[category][len] = marker;
            }
        });
    };

    // Set the markers with the category chosen to true or false
    var dispMarker = function (markers, state) {
        $.each(markers, function (index, marker) {
            marker.setVisible(state);
            $('#' + marker.getTitle().replace(/ /g, "-")).toggle();
        });
    };

    //handles the check/uncheck events of checkboxes
    var handler = function () {
        dispMarker(categories[this.value], $(this).is(':checked'));
    };

    //adds the info to the lateral box
    var addInfo = function (selector, information, id) {
        $('#' + selector).append('<div " id=' + id.replace(/ /g, "-") + ' class="list2gmaps-info-container">' + information + '</div>');
    };

    //handles the event when the bounds change
    var addEventMap = function () {
        google.maps.event.addListener(map, 'bounds_changed', function() {
            $.each(markers, function (index, marker) {
                if (!map.getBounds().contains(marker.getPosition()) && marker.getVisible() && marker.onMap) {
                    $('#' + marker.getTitle().replace(/ /g, "-")).toggle();
                    marker.onMap = false;
                } else if (map.getBounds().contains(marker.getPosition()) && !marker.onMap) {
                    $('#' + marker.getTitle().replace(/ /g, "-")).toggle();
                    marker.onMap = true;
                }
            });
        });
    };

    var constructor = function (selector, locations) {
        console.log('list2gmaps.constructor() called');
        map = new google.maps.Map(document.getElementById(selector), mapOptions);
        categories = {};
        markers = [];

        $.each(locations, function (index, item) {
            var newMarker = createMarker(item, item.location.latitude, item.location.longitude);
            //addInfo(config.infoListSelector, "<p><b>" + item.name + "</b></p><p>" + item.address + "</p>", item.name);
            //addEventMap();

            newMarker.setMap(map);
        });
    };

    // prototype
    constructor.prototype = {
        identifier: function (item) {
            return item[name];
        },

        show: function () {
            console.log('list2gmaps.show() called');
        },

        addInfoBoxes: function (content) {
            var infoBox;
            $.each(markers, function (index, marker) {
                infoBox = createInfoBox(marker, content(marker.info));
                addEventMarker(marker, infoBox);
            });
        },

        addCheckBoxPanel: function (selector) {
            $.each(markers, function (index, marker) {
                addCheckBox(selector, marker.info, marker);
            });
        },

        addSideInfoPanel: function (selector, content, responsive) {
            $.each(markers, function (index, marker) {
                addInfo(selector, content(marker.info), marker.title);
            });

            if (responsive) {
                addEventMap();
            }
        }
    };

    // return module
    return constructor;
})();
