var mLegend;
var mDates = undefined;
var overviewMapDijit = undefined;


/*require(["esri/map", "esri/dijit/Scalebar", "esri/dijit/OverviewMap", "esri/dijit/Legend",
            "esri/geometry/Extent", "esri/SpatialReference", "esri/TimeExtent", "esri/dijit/TimeSlider",
            "dojo/_base/array", "dojo/parser",
            "dojo/dom", "dojo/on", "dojo/domReady!"],
function (  Map, Scalebar, OverviewMap, Legend,            
            Extent, SpatialReference, TimeExtent, TimeSlider,
            arrayUtils, parser,
            dom, on) {
    
});
*/

dojo.require("esri.geometry.Extent");
dojo.require("esri.SpatialReference");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.dijit.OverviewMap");
dojo.require("esri.dijit.TimeSlider");
dojo.require("dojo._base.array");
dojo.require("dojo.on");
dojo.require("dojo.dom");
dojo.require("dojo.domReady!");

function initMap() {
    var startExtent = new esri.geometry.Extent(10778416.9579877, 3583730.36511402, 19448300.9644228, 10140330.1449805, new esri.SpatialReference({ wkid: 3857 }));
    map = new esri.Map("map", {
       // center: [135, 48], // longitude, latitude
        zoom: 5,
        extent: startExtent,
        spatialReference: { wkid: 3857 },
        slider: false,
        //basemap: "streets"
    });

       InitBaseMap();

    //add the legend
   map.on("layer-add-result", function (evt, er) {
       if (evt.hasOwnProperty('error')) {
           cntErrLayers++;
       } else {
           cntSucLayers++;
           switch (evt.layer.id) {
               case "Bounds":
                   dojo.byId("cbBorders").disabled = false;
                   dojo.byId("cbGosg").disabled = false;
                   dojo.byId("cbAdm1").disabled = false;
                   dojo.byId("cbAdm2").disabled = false;
                   break;
               case "Restrict":
                   dojo.byId("cbRestricted").disabled = false;
                   dojo.byId("cbZP").disabled = false;
                   dojo.byId("cbNP").disabled = false;
                   dojo.byId("cbFZ").disabled = false;
                   break;
               case "City":
                   dojo.byId("cbCity").disabled = false;
                   dojo.byId("cbChis").disabled = false;
                   dojo.byId("cbStatus").disabled = false;
                   break;

               case "Rivers": dojo.byId("cbRivers").disabled = false; break;
               case "Roads": dojo.byId("cbRoads").disabled = false; break;
               case "Shoreline": dojo.byId("cbShoreline").disabled = false; break;
               case "MODIS_Raster": dojo.byId("cbModis").disabled = false; break;
               case "METEOR1_Raster": dojo.byId("cbMeteor1").disabled = false; break;
               case "LANDSAT8_Raster": dojo.byId("cbLandsat8").disabled = false; break;
               case "RESURSP_Raster": dojo.byId("cbResursp").disabled = false; break;
               case "KANOPUS_Raster": dojo.byId("cbKanopus").disabled = false; break;
               case "Flood": dojo.byId("cbFloodPolygons").disabled = false; break;
               case "SnowMap": dojo.byId("cbSnowMap").disabled = false; break;
               case "SnowBorders": dojo.byId("cbSnowBorders").disabled = false; break;
               case "clouds":
               case "cloudsAfter180": dojo.byId("cbMTSAT").disabled = false; break;
               case "Ascat": dojo.byId("cbAscat").disabled = false; break;

               case "ZeyaVDHR":
                   dojo.byId("cbZeyaForecast").disabled = false;
                   dojo.byId("cbZeyaCOSMO").disabled = false;
                   dojo.byId("cbZeyaNCEP").disabled = false;
                   dojo.byId("cbZeyaUKMO").disabled = false;
                   dojo.byId("cbZeyaJMA").disabled = false;
                   break;
               case "LevelPred": dojo.byId("cbLevelForecast").disabled = false; break;
               case "Hydro": dojo.byId("cbWaterLevel").disabled = false; break;
               case "Snow": dojo.byId("cbSnowDepth").disabled = false; break;
               case "Snow_kn24": dojo.byId("cbSnowDepth24").disabled = false; break;
               case "Meteo":
                   dojo.byId("cbMeteo").disabled = false;
                   dojo.byId("cbWindSpeed").disabled = false;
                   dojo.byId("cbWeatherEvent").disabled = false;
                   dojo.byId("cbWeatherEventCol").disabled = false;
                   dojo.byId("cbWeatherTmpIso").disabled = false;
                   dojo.byId("cbWeatherPresIso").disabled = false;
                   break;
               case "GRIB_HGT_ISO":
                   dojo.byId("cbHGTIsoline").disabled = false;
                   break;
               case "GRIB_TMP_ISO":
                   dojo.byId("cbTMPIsoline").disabled = false;
                   break;
               case "GRIB_RH_ISO":
                   dojo.byId("cbRHIsoline").disabled = false;
                   break;
               case "GRIB_PRMSL_ISO":
                   dojo.byId("cbPRMSLIsoline").disabled = false;
                   break;
               default:
                   break;
           }
       }
       var prog = (cntErrLayers + cntSucLayers) / cntLayers * 100;
       dojo.style(dojo.byId("progBar"), "width", prog + "%");
       if (cntLayers == (cntErrLayers + cntSucLayers)) {
           if (mLegend == undefined) {
               var legend = dojo.byId('legendDiv');
               mLegend = new dcrscplaneta.Legend();
               legend.appendChild(mLegend.domNode);
           }
           mLegend.buildLegend(map);
           dojo.style(dojo.byId("AboutImage"), "display", "none");
       }
   });


    // AddLayers
   map.on("load", function () {

       scalebar = new esri.dijit.Scalebar({ map: map, scalebarUnit: "metric" });
       overviewMapDijit = new esri.dijit.OverviewMap({ map: map }, dojo.byId('overviewMapDiv'));
       overviewMapDijit.startup();

       SetLayers();
       initSlider();
       refreshSlider();
       dojo.style(dojo.byId("overviewMapWindow"), "display", "none")

   });


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
        map.getLayer("clouds").setTime(dd);
        map.getLayer("cloudsAfter180").setTime(dd);
        map.getLayer("mega").setTime(dd);
        //Set Rasters
        var RastersLayer = ['MODIS_Raster', 'METEOR1_Raster', 'LANDSAT8_Raster', 'RESURSP_Raster', 'KANOPUS_Raster'];
        for (var i = 0; i < RastersLayer.length; i++) {
            map.getLayer(RastersLayer[i]).setDefinitionExpression("DataDateTime between date '" + dds + "' and date '" + dde + "'", true);
        }

        if (mDates != undefined) {
            mDates.SetTime();
        }
        map.setExtent(map.extent);
        if (mDates != undefined) {
            mDates.Select(timeStart, timeStop);
        }


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


    //Run getDates
    var dde = endT.getUTCFullYear() + "-" + ("0" + (endT.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + endT.getUTCDate()).slice(-2) + " " + ("0" + endT.getUTCHours()).slice(-2) + ":00:00";
    var dds = stT.getUTCFullYear() + "-" + ("0" + (stT.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + stT.getUTCDate()).slice(-2) + " " + ("0" + stT.getUTCHours()).slice(-2) + ":00:00";
    if (mDates == undefined) {
        mDates = new dcrscplaneta.DatesList();
        mDates.Reload(map, token, dds, dde);
        dojo.byId("divDates").appendChild(mDates.domNode);
    } else {
        mDates.Refresh(dds, dde);
    }  

};



/*
dojo.require("esri.map");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.dijit.OverviewMap");
dojo.require("esri.dijit.Legend");
dojo.require("esri.geometry.Extent");
dojo.require("esri.SpatialReference");
dojo.require("esri.TimeExtent");
dojo.require("esri.dijit.TimeSlider");
dojo.require("dojo._base.array");
dojo.require("dojo.parser");


//parser.parse();

function LoadMapNow() {
    var startExtent = new esri.geometry.Extent(10778416.9579877, 3583730.36511402, 19448300.9644228, 10140330.1449805, new esri.SpatialReference({ wkid: 3857 }));
    // var startExtent = new Extent(145, 40, 160, 60, new SpatialReference({ wkid: 4326 }));
    map = new Map("map", {
        zoom: 5,
        extent: startExtent,
        slider: false,
        wrapAround180: true,
        basemap: "streets"
    });

    //scalebar = new esri.dijit.Scalebar({ map: map, scalebarUnit: "metric" });
    InitBaseMap();
    var overviewMapDijit = new OverviewMap({ map: map }, dojo.byId('overviewMapDiv'));
    var startExtent_ = new esri.geometry.Extent(-95.271, 38.933, -95.228, 38.976, new esri.SpatialReference({ wkid: 4326 }));
    var overviewMapDijit = new esri.dijit.OverviewMap({ map: map }, dojo.byId('overviewMapDiv'));
    overviewMapDijit.startup();

   


}


*/
