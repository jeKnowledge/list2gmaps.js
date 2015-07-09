list2gmaps.js
=============

A simple JavaScript library to build maps using Google Maps.

Couldn't be easier, in your HTML just import:

    <script src="https://maps.googleapis.com/maps/api/js"></script>
    <script src="../lib/list2gmaps.js"></script>

then in your JavaScript file, you create a list2gmaps object:

	var myMap = new list2gmaps(selector, locations);

where selector is your `id` for where you want the map to go and `locations` is an array of objects of the following type:

	{
        name: "Spot A",
        address: "Street A",
        categories: ["Events", "Company"],

        location: {
            latitude: 40.214716,
            longitude: -8.408729
        }
    }


Features
--------

- Easy map creation
- Option to control the markers with checkboxes with their categories
- Option to have a responsive panel with the information of each marker active
- Option to have color highlight in the information panel for the open markers

Installation
------------

Just add the list2gmaps.js file to your lib folder.

DOM Structure
-------------
Checkboxes are created with an `id` corresponding to their category name with all the spaces converted to `-` and a class called `list2gmaps-category-checkbox`.

Every information box is created with an `id` corresponding to its marker name with all the spaces converted to '-' and a class called `list2gmaps-info-container`.