list2gmaps.js
========

A simple javacript library to build maps using google maps.

Couldn't be easier, in your HTML just file import:

    <script src="https://maps.googleapis.com/maps/api/js"></script>
    <script src="../lib/list2gmaps.js"></script>

then in your Javacript file you create a list2gmaps object:

	var myMap = new list2gmaps(selector, locations);

where selector is your id for where you want the map to go and locations is an array of objects of the type: 

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
-------

Checkboxes are created with the id corresponding to their categorie name with all the spaces converted in to '-' and a class 'categorieCheckbox'.

Every information box an id corresponding to their marker name with all the spaces converted in to '-' and a class 'infoContainer'.

When a marker is open in the map if the information panel is active a class 'active' is added to the corresponding information container so that it can be highlighted.