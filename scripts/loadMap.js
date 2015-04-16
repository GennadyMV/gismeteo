/**
 * Copyright (c) 2015, FE SRC Planeta.
 *
 * Отвечает за инициализацию карты и её основных элементов
*/
// Глобальные переменные
var map;
var timeSlider;
function initMap() {
    // Инициализация картоосновы
    map = new esri.Map("map", {
        zoom: 5,
        extent: new esri.geometry.Extent(10778416.9579877, 3583730.36511402, 19448300.9644228, 10140330.1449805, new esri.SpatialReference({ wkid: 3857 })),
        spatialReference: { wkid: 3857 },
        slider: false
    });
    // Инициализация Подобложок
    var basemaps = [];
    basemaps.push(new esri.dijit.Basemap({
        layers: [new esri.dijit.BasemapLayer({ url: "http://maps.rosreestr.ru/arcgis/rest/services/BaseMaps/BaseMap/MapServer" })],
        title: "Росреестр",
        thumbnailUrl: "images/thumbnail/t_ros.png"
    }));
    basemaps.push(new esri.dijit.Basemap({
        layers: [new esri.dijit.BasemapLayer({ url: "http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" })],
        title: "Вид со спутника",
        id: "BaseMapImagery",
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

    basemapGallery = new esri.dijit.BasemapGallery({
        basemaps: basemaps,
        showArcGISBasemaps: false,
        map: map
    }, "basemapGalleryDiv");
    basemapGallery.startup();
    basemapGallery.on("error", function (msg) { console.log("basemap gallery error:  ", msg); });

    // Инициализируем timeSlider
    //initSlider();
    initTimeSlider("timeWindow");
    // Действия после загрузки карты
    map.on("load", function () {
        new esri.dijit.Scalebar({ map: map, scalebarUnit: "metric" });
        new esri.dijit.OverviewMap({ map: map }, dojo.byId('overviewMapDiv')).startup();
        dojo.style(dojo.byId("overviewMapWindow"), "display", "none")
       //SetLayers();
       //initSlider();
       //refreshSlider();
       mapReady();
    });
    map.on("update-start", showLoading);
    map.on("update-end", hideLoading);
    function showLoading() {
        esri.show(dojo.byId("loadingImg"));
        map.disableMapNavigation();
        //map.hideZoomSlider();
    }

    function hideLoading(error) {
        esri.hide(dojo.byId("loadingImg"));
        map.enableMapNavigation();
        //map.showZoomSlider();
    }
};

function initSlider() {
    //alert('Первая строка\nВторая строка');
    timeSlider = new esri.dijit.TimeSlider({ style: "width: 100%;" }, dojo.byId("timeSliderDiv"));
    map.setTimeSlider(timeSlider);
    var tmp_date = (new Date()).AddHours(-24);
    document.getElementById("fc_day").value = tmp_date.getUTCDate();
    document.getElementById("fc_month").value = 1 + tmp_date.getUTCMonth();
    document.getElementById("fc_year").value = tmp_date.getUTCFullYear();
    document.getElementById("fc_hour").value = tmp_date.getUTCHours();
    document.getElementById("tDTStart").value = ("0" + tmp_date.getUTCDate()).slice(-2) + "-" +
                                                ("0" + tmp_date.getUTCMonth()).slice(-2) + "-" +
                                                fc_year.value + " " +
                                                ("0" + tmp_date.getUTCHours()).slice(-2) + ":00:00";

    var stT = new Date(tmp_date);
    var stI = dojo.byId("intervals").value;
    var CInt = 24;
    var endT = new Date(stT.getTime() + CInt * stI * 3600000);
    var timeExtent = new esri.TimeExtent(stT, endT);


    timeSlider.setThumbCount(2);
    timeSlider.createTimeStopsByTimeInterval(timeExtent, stI, "esriTimeUnitsHours");
    timeSlider.setThumbIndexes([0, 1]);
    timeSlider.setThumbMovingRate(2000);

    timeSlider.startup();

    //add labels for every other time stop
    var labels = dojo._base.array.map(timeSlider.timeStops, function (timeStop, i) {
        if (i % 2 === 0) {
            var dd = (timeStop.getUTCHours() == 0) ? ("0" + timeStop.getUTCDate()).slice(-2) + "." + ("0" + (timeStop.getUTCMonth() + 1)).slice(-2) : ("0" + timeStop.getUTCHours()).slice(-2) + ":00";
            return dd;
        } else {
            return "";
        }
    });

    timeSlider.setLabels(labels);

    timeSlider.on("time-extent-change", function (evt) {
        //"2014-12-15T06:00:00.000Z"
        if (evt.endTime == undefined || evt.startTime == undefined) return;

        var timeStop = evt.endTime;
        var timeStart = evt.startTime;


        var year = timeStop.getUTCFullYear();
        var month = timeStop.getUTCMonth();
        var day = timeStop.getUTCDate();

        timeStop.setSeconds(timeStop.getSeconds() - 1);

        var dd  = timeStart.getUTCFullYear() + "-" + ("0" + (timeStart.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + timeStart.getUTCDate()).slice(-2) + "T" + ("0" + timeStart.getUTCHours()).slice(-2) + ":00:00.000Z/" +
                  timeStop.getUTCFullYear() + "-" + ("0" + (timeStop.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + timeStop.getUTCDate()).slice(-2) + "T" + ("0" + timeStop.getUTCHours()).slice(-2) + ":" + ("0" + timeStop.getUTCMinutes()).slice(-2) + ":" + ("0" + timeStop.getUTCSeconds()).slice(-2) + ".999Z";
        var dde = timeStop.getUTCFullYear() + "-" + ("0" + (timeStop.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + timeStop.getUTCDate()).slice(-2) + " " + ("0" + timeStop.getUTCHours()).slice(-2) + ":" + ("0" + timeStop.getUTCMinutes()).slice(-2) + ":" + ("0" + timeStop.getUTCSeconds()).slice(-2);
        var dds = timeStart.getUTCFullYear() + "-" + ("0" + (timeStart.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + timeStart.getUTCDate()).slice(-2) + " " + ("0" + timeStart.getUTCHours()).slice(-2) + ":00:00";

        //Set WMS Clouds
    //    map.getLayer("clouds").setTime(dd);
    //    map.getLayer("cloudsAfter180").setTime(dd);
    //    map.getLayer("mega").setTime(dd);
        //Set Rasters
        //var RastersLayer = ['MODIS_Raster', 'METEOR1_Raster', 'LANDSAT8_Raster', 'RESURSP_Raster', 'KANOPUS_Raster'];
        //for (var i = 0; i < RastersLayer.length; i++) {
        //    map.getLayer(RastersLayer[i]).setDefinitionExpression("DataDateTime between date '" + dds + "' and date '" + dde + "'", true);
        //}
        if (mDates != undefined) {
            mDates.SetTime(dds, dde);
        }
        map.setExtent(map.extent);
        if (mDates != undefined) {
            mDates.Select(dds, dde);
        }
        refreshSlider2();


    });
}

function refreshSlider() {
    if (dojo.byId("tDTStart") == null || timeSlider == null)
        return;
    var ft = dojo.byId("tDTStart").value.substring(6, 10) + "-" + dojo.byId("tDTStart").value.substring(3, 5) + "-" + dojo.byId("tDTStart").value.substring(0, 2) + "T" + dojo.byId("tDTStart").value.substring(11) + "Z";

    var stT = new Date(ft);
    var stI = dojo.byId("intervals").value;
    var CInt = 24;
    var endT = new Date(stT.getTime() + CInt * stI * 3600000);
    var timeExtent = new esri.TimeExtent(stT, endT);


    timeSlider.setThumbCount(2);
    timeSlider.createTimeStopsByTimeInterval(timeExtent, stI, "esriTimeUnitsHours");
    timeSlider.setThumbIndexes([0, 1]);
    timeSlider.setThumbMovingRate(2000);

    timeSlider.startup();

    //add labels for every other time stop
    var labels = dojo._base.array.map(timeSlider.timeStops, function (timeStop, i) {
        if (i % 2 === 0) {
            var dd = (timeStop.getUTCHours() == 0) ? ("0" + timeStop.getUTCDate()).slice(-2) + "." + ("0" + (timeStop.getUTCMonth() + 1)).slice(-2) : ("0" + timeStop.getUTCHours()).slice(-2) + ":00";
            return dd;
        } else {
            return "";
        }
    });

    timeSlider.setLabels(labels);
    if (mDates != undefined) mDates.Refresh(stT, endT);

};

function refreshSlider2() {
    if (dojo.byId("tDTStart") == null || timeSlider == null) return;
    //var ft = dojo.byId("tDTStart").value.substring(6, 10) + "-" + dojo.byId("tDTStart").value.substring(3, 5) + "-" + dojo.byId("tDTStart").value.substring(0, 2) + "T" + dojo.byId("tDTStart").value.substring(11) + "Z";

    //var stT = new Date(timeSlider.timeStops[0].getTime() + stI * 3600000);
    var stI = dojo.byId("intervals").value;
    var stT = new Date(timeSlider.timeStops[0].getTime() + stI * 3600000);
    var CInt = 24;
    var endT = new Date(stT.getTime() + CInt * stI * 3600000);
    var timeExtent = new esri.TimeExtent(stT, endT);


    timeSlider.setThumbCount(2);
    timeSlider.createTimeStopsByTimeInterval(timeExtent, stI, "esriTimeUnitsHours");
    timeSlider.setThumbIndexes([0, 1]);
    timeSlider.setThumbMovingRate(2000);

    timeSlider.startup();

    //add labels for every other time stop
    var labels = dojo._base.array.map(timeSlider.timeStops, function (timeStop, i) {
        if (i % 2 === 0) {
            var dd = (timeStop.getUTCHours() == 0) ? ("0" + timeStop.getUTCDate()).slice(-2) + "." + ("0" + (timeStop.getUTCMonth() + 1)).slice(-2) : ("0" + timeStop.getUTCHours()).slice(-2) + ":00";
            return dd;
        } else {
            return "";
        }
    });

    timeSlider.setLabels(labels);
    if (mDates != undefined) mDates.Refresh(stT, endT);
};
