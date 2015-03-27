dojo.require("esri.layers.agsdynamic");
dojo.require("esri.layers.ArcGISImageServiceLayer");
dojo.require("esri.Credential");

var cntLayers = 0;
var cntErrLayers = 0;
var cntSucLayers = 0;

function SetLayers() {

       dojo.style(dojo.byId("AboutImage"), "display", "block");
       dojo.style(dojo.byId("progBar"), "width", "0%");

       var ip_serv = "http://10.8.3.187/";  //их локалака (прокси)
    //   var ip_serv = "http://10.8.6.199/"; //наша локалка (прокси)
    //   var ip_serv = "http://79.171.115.85/"; // инет наш

       while (map.layerIds.length > 1) {
        map.removeLayer(map.getLayer(map.layerIds[1]));
    }
    cntLayers = 0;
    cntErrLayers = 0;
    cntSucLayers = 0;
    //Disable all CheckBoxes
    var cBoxes = ["cbModis", "cbMeteor1", "cbKanopus", "cbLandsat8", "cbResursp", "cbFloodPolygons", "cbSnowMap", "cbSnowBorders", "cbMTSAT", "cbAscat",
                    "cbWaterLevel", "cbSnowDepth", "cbSnowDepth24", "cbMeteo", "cbWindSpeed", "cbWeatherEvent", "cbWeatherEventCol", "cbWeatherTmpIso", "cbWeatherPresIso",
                    "cbGRIB", "cbHGTIsoline", "cbHGTField", "cbTMPIsoline", "cbTMPField", "cbRHIsoline", "cbRHField", "cbPRMSLIsoline", "cbPRMSLField", "cbGRIBWind",
                    "cbFloodPred", "cbZeyaForecast", "cbZeyaCOSMO", "cbZeyaNCEP", "cbZeyaUKMO", "cbZeyaJMA", "cbLevelForecast", "cbBorders", "cbGosg", "cbAdm1", "cbAdm2",
                    "cbRestricted", "cbZP", "cbNP", "cbFZ", "cbCity", "cbChis", "cbStatus", "cbRivers", "cbRoads", "cbShoreline"];
    for (var i = 0; i < cBoxes.length; i++) {
        dojo.byId(cBoxes[i]).disabled = true;
    }
    //map.removeAllLayers();
    //Add attribData
    var lBorders = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/borders/MapServer", { id: "Bounds", visible: false }); cntLayers++;
    var lRestrict = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/restrict/MapServer", { id: "Restrict", visible: false }); cntLayers++;
    var lCity = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/city/MapServer", { id: "City", visible: false }); cntLayers++;
    var lRivers = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/rivers/MapServer", { id: "Rivers", visible: false }); cntLayers++;
    var lRoads = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/roads/MapServer", { id: "Roads", visible: false }); cntLayers++;
    var lShoreline = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/shoreline/MapServer", { id: "Shoreline", visible: false }); cntLayers++;
    //Add Sat Data
    //Растры
    var modis = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/master_raster/ImageServer", { id: "MODIS_Raster", visible: false }); cntLayers++;
    var meteor = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_meteor1/ImageServer", { id: "METEOR1_Raster", visible: false }); cntLayers++;
    var landsat = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_landsat8/ImageServer", { id: "LANDSAT8_Raster", visible: false }); cntLayers++;
    var resurs = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_resursp/ImageServer", { id: "RESURSP_Raster", visible: false }); cntLayers++;
    var kanopus = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_kanopus/ImageServer", { id: "KANOPUS_Raster", visible: false }); cntLayers++;
    var floods = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/floods_clouds/floods_clouds/MapServer", { id: "Flood", visible: false }); cntLayers++;
    var snow_map = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/snow/snow_map_t/MapServer", { id: "SnowMap", visible: false }); cntLayers++;
    var snow_line = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/snow/snow_line_5_t/MapServer", { id: "SnowBorders", visible: false }); cntLayers++;
    
    // MTSAT
    var clouds = new dcrscplaneta.WMSLayer({ url: ip_serv + "geoserver/dvrcpod/wms", after180: false, layer: "dvrcpod:clouds", id: "clouds", visible: false }); cntLayers++;
    var cloudsAfter180 = new dcrscplaneta.WMSLayer({ url: ip_serv + "geoserver/dvrcpod/wms", after180: true, layer: "dvrcpod:clouds", id: "cloudsAfter180", visible: false }); cntLayers++;
    
    //ASCAT
    var Ascat = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/ascat_soil_t/MapServer", { id: "Ascat", visible: false }); cntLayers++;

    // Borsch
    var borsh = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/forecast/borsch_vdnh_inf/MapServer", { id: "ZeyaVDHR", visible: false }); cntLayers++;
    var borsh2 = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/forecast/borsch_level/MapServer", { id: "LevelPred", visible: false }); cntLayers++;
    //hgt.setLine(new esri.Color([255, 0, 0]), 2);
    //map.addLayers([hgt]);
    //var demo = true;
    if (token != "") {
        //demo = false;        
        //Add Hydro
        var hydro = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/stations/hydro/MapServer/?token=" + token, { id: "Hydro", visible: false }); cntLayers++;
        var snow = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/stations/snow/MapServer/?token=" + token, { id: "Snow", visible: false }); cntLayers++;
        var snow24 = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/stations/snow_route/MapServer/?token=" + token, { id: "Snow_kn24", visible: false }); cntLayers++;
        //Add Meteo
        var meteo = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/stations/meteo/MapServer/?token=" + token, { id: "Meteo", visible: false }); cntLayers++;
        //Add Hgt
        var hgtiso = new dcrscplaneta.clsChangeItemDMSL(ip_serv + "arcgis/rest/services/forecast/wrf_hgt_iso/MapServer/?token=" + token, { id: "GRIB_HGT_ISO", visible: false });
        hgtiso.setLevel("500");
        //Add Tmp
        var tmpiso = new dcrscplaneta.clsChangeItemDMSL(ip_serv + "arcgis/rest/services/forecast/wrf_tmp_iso/MapServer/?token=" + token, { id: "GRIB_TMP_ISO", visible: false });
        tmpiso.setLevel("925");
        //Add Rh
        var rhiso = new dcrscplaneta.clsChangeItemDMSL(ip_serv + "arcgis/rest/services/forecast/wrf_rh_iso/MapServer/?token=" + token, { id: "GRIB_RH_ISO", visible: false });
        rhiso.setLevel("925");
        //Add PRMSL
        var prmsliso = new dcrscplaneta.clsChangeItemDMSL(ip_serv + "arcgis/rest/services/forecast/wrf_prmsl_iso/MapServer/?token=" + token, { id: "GRIB_PRMSL_ISO", visible: false });
        
        map.addLayers([ modis, meteor, landsat, resurs, kanopus,
                        floods, snow_map, snow_line, clouds,cloudsAfter180, Ascat,
                        hydro, snow, snow24, meteo,
                        borsh, borsh2, hgtiso, tmpiso, rhiso, prmsliso,
                        lBorders, lRestrict, lCity, lRivers, lRoads, lShoreline]);
    } else {
        map.addLayers([ modis, meteor, landsat, resurs, kanopus,
                        floods, snow_map, snow_line, clouds, cloudsAfter180, Ascat,
                        borsh, borsh2,
                        lBorders, lRestrict, lCity, lRivers, lRoads, lShoreline]);
    }    
    
   

}