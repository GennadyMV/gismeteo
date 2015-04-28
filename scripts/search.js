//Init queryTaskSearch
// Используется для поиска станций, городов и рек по названиям


function executeQuerySearch(name) {
    var queryTaskSearch = new esri.tasks.QueryTask(ip_serv + "arcgis/rest/services/attrib/statsearch/MapServer/0");
    var querySearch = new esri.tasks.Query();
    querySearch.returnGeometry = true;
    querySearch.outFields = ["name", "id", "station_ty"];
    querySearch.where = "UPPER(NAME) LIKE UPPER('" + name + "%') OR id LIKE UPPER('" + name + "%')";
    queryTaskSearch.execute(querySearch, showResults);
}

function zoom2Search(index) {
    var geom = fSetSearch[index].geometry;
    if (geom !== undefined) {
        map.centerAndZoom(geom, 12);
        var symbol = new esri.symbols.PictureMarkerSymbol("images/find_icon.PNG", 40, 80);
        var graphic = new esri.graphic(geom, symbol);
        map.graphics.add(graphic);
        window.setTimeout(function () { map.graphics.clear() }, 10000);
    }
}

function showResults(featureSet) {
    fSetSearch = featureSet.features;
    var container = dojo.byId("divSearchResult");
    //clear old
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    var listElement = document.createElement("ul");
    listElement.style.listStyle = "none";
    listElement.style.padding = "0px";
    listElement.className = "elLegend";

    container.appendChild(listElement);
    var resultFeatures = featureSet.features;
    for (var i = 0, il = resultFeatures.length; i < il; i++) {
        var graphic = resultFeatures[i];
        var listItem = document.createElement("li");
        listItem.className = "listation";
        var type = "";
        if (graphic.attributes.station_ty == 1) { type = "<img class=\"legimg\" src=\"images/search/hyd.png\"/>"; }
        if (graphic.attributes.station_ty == 2) { type = "<img class=\"legimg\" src=\"images/search/snow.png\"/>"; }
        if (graphic.attributes.station_ty == 3) { type = "<img class=\"legimg\" src=\"images/search/hyd.png\"/> <img class=\"legimg\" src=\"images/search/snow.png\"/>"; }
        if (graphic.attributes.station_ty == 4) { type = "<img class=\"legimg\" src=\"images/search/met.png\"/>"; }
        if (graphic.attributes.station_ty == 5) { type = "<img class=\"legimg\" src=\"images/search/hyd.png\"/> <img class=\"legimg\" src=\"images/search/met.png\"/>"; }
        if (graphic.attributes.station_ty == 6) { type = "<img class=\"legimg\" src=\"images/search/met.png\"/><img class=\"legimg\" src=\"images/search/snow.png\"/>"; }
        if (graphic.attributes.station_ty == 7) { type = "<img class=\"legimg\" src=\"images/search/met.png\"/><img class=\"legimg\" src=\"images/search/hyd.png\"/><img class=\"legimg\" src=\"images/search/snow.png\"/>"; }
        if (graphic.attributes.station_ty == 8) { type = "<img class=\"legimg\" src=\"images/search/smallSity.png\"/>"; }
        if (graphic.attributes.station_ty == 9) { type = "<img class=\"legimg\" src=\"images/search/bigSity.png\"/>"; }
        if (graphic.attributes.station_ty == 10) { type = "<img class=\"legimg\" src=\"images/search/river.png\"/>"; }
        if (graphic.attributes.station_ty == 11) { type = "<img class=\"legimg\" src=\"images/search/lake.png\"/>"; }
        if (graphic.attributes.station_ty == 1 || graphic.attributes.station_ty == 2 || graphic.attributes.station_ty == 3 || graphic.attributes.station_ty == 4 || graphic.attributes.station_ty == 5 || graphic.attributes.station_ty == 6 || graphic.attributes.station_ty == 7) {
            listItem.innerHTML = type + graphic.attributes.name + "<br/>" + "   index: ".bold() + graphic.attributes.id;
        } else {
            listItem.innerHTML = type + graphic.attributes.name;
        }
        listItem.setAttribute('onClick', 'zoom2Search(' + i + ')');
        listElement.appendChild(listItem);
    }
}