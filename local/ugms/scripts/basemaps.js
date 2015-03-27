dojo.require("esri.dijit.Basemap");
dojo.require("esri.dijit.BasemapLayer");
dojo.require("esri.dijit.BasemapGallery");

function InitBaseMap() {
    var basemaps = [];
    
    basemaps.push(new esri.dijit.Basemap({
        layers: [new esri.dijit.BasemapLayer({ url: "http://maps.rosreestr.ru/arcgis/rest/services/BaseMaps/BaseMap/MapServer/" })],
        title: "Росреестр",
        thumbnailUrl: "images/thumbnail/t_ros.png"
    }));
   
    basemaps.push(new esri.dijit.Basemap({
        layers: [new esri.dijit.BasemapLayer({ url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" })],
        title: "Вид со спутника",
        thumbnailUrl: "images/thumbnail/t_sat.png"
    }));

    basemaps.push(new esri.dijit.Basemap({
        layers: [new esri.dijit.BasemapLayer({ url: "http://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer" })],
        title: "Контурная",
        thumbnailUrl: "images/thumbnail/t_gray.png"
    }));

    basemaps.push(new esri.dijit.Basemap({
        layers: [new esri.dijit.BasemapLayer({ type: "OpenStreetMap" })],
        id: "OpenStreetmap",
        title: "Open Street",
        thumbnailUrl: "images/thumbnail/t_osm.png"
    }));

    //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
    var basemapGallery = new esri.dijit.BasemapGallery({
        basemaps: basemaps,
        showArcGISBasemaps: false,
        map: map
    }, "basemapGalleryDiv");
    basemapGallery.startup();
    basemapGallery.on("error", function (msg) { console.log("basemap gallery error:  ", msg); });
}
