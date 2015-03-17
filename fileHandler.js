var infoMarkers;

function readLocalFile(file) {
    var infoFile = new XMLHttpRequest();
    var self = this;
    infoFile.open("GET", file, true);

    infoFile.onreadystatechange = function() {
        if (infoFile.readyState === 4) {
            self.infoMarkers = infoFile.responseText.split("\n");
            createMap();
        }
    };
    infoFile.onError = function() {
        alert("Error loading file!");
    };
    infoFile.send(null);
}

function handleFileSelect(evt) {
    var reader = new FileReader();
    var f = evt.target.files[0];
    var self = this;
    var content;

    reader.onload = (function(theFile) {
        return function(e) {
            content = e.target.result;

            self.infoMarkers = content.split("\n");
            createMap();
        };
    })(f);

    reader.readAsText(f);
}

$(document).ready(function () {
    //readLocalFile("test.csv");

    document.getElementById('files').addEventListener('change', handleFileSelect, false);
});
