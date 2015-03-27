dojo.require("esri.dijit.TimeSlider");
dojo.require("esri.TimeExtent");

function initSlider() {
    //alert('Первая строка\nВторая строка');
    timeSlider = new esri.dijit.TimeSlider({ style: "width: 100%;" }, dojo.byId("timeSliderDiv"));

    map.setTimeSlider(timeSlider);
    var stT = new Date(dojo.byId("tDTStart").value);
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
    var labels = dojo.map(timeSlider.timeStops, function (timeStop, i) {
        if (i % 2 === 0) {
            var dd = (timeStop.getHours() == 0) ? ("0" + timeStop.getDate()).slice(-2) + "." + ("0" + (timeStop.getMonth() + 1)).slice(-2) : ("0" + timeStop.getHours()).slice(-2) + ":00";
            return dd;
        } else {
            return "";
        }
    });

    timeSlider.setLabels(labels);

    timeSlider.on("time-extent-change", function (evt) {
        //"2014-12-15T06:00:00.000Z"
        var timeStop = evt.endTime;
        var timeStart = evt.startTime;

        var dd = timeStop.getUTCFullYear() + "-" + ("0" + (timeStop.getMonth() + 1)).slice(-2) + "-" + ("0" + timeStop.getDate()).slice(-2) + "T" + ("0" + timeStop.getHours()).slice(-2) + ":00:00.000Z";
        var dde = timeStop.getUTCFullYear() + "-" + ("0" + (timeStop.getMonth() + 1)).slice(-2) + "-" + ("0" + timeStop.getDate()).slice(-2) + " " + ("0" + timeStop.getHours()).slice(-2) + ":00:00";
        var dds = timeStart.getUTCFullYear() + "-" + ("0" + (timeStart.getMonth() + 1)).slice(-2) + "-" + ("0" + timeStart.getDate()).slice(-2) + " " + ("0" + timeStart.getHours()).slice(-2) + ":00:00";

        map.getLayer("MTSat_Cloud").setTime(dd);
        map.getLayer("MTSat_CloudR").setTime(dd);

        map.getLayer("MODIS_Raster").setDefinitionExpression("DataDateTime between date '" + dds + "' and date '" + dde + "'", true);
        map.getLayer("METEOR1_Raster").setDefinitionExpression("DataDateTime between date '" + dds + "' and date '" + dde + "'", true);
        map.getLayer("LANDSAT8_Raster").setDefinitionExpression("DataDateTime between date '" + dds + "' and date '" + dde + "'", true);
        map.getLayer("RESURSP_Raster").setDefinitionExpression("DataDateTime between date '" + dds + "' and date '" + dde + "'", true);
        map.getLayer("KANOPUS_Raster").setDefinitionExpression("DataDateTime between date '" + dds + "' and date '" + dde + "'", true);
        map.setExtent(map.extent);

    });
}