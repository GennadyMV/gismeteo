/**
 * Copyright (c) 2015, FE SRC Planeta.
 *
 * Отвечает за добавление информации на карту
 */
// Глобальные переменные
var mLegend = undefined;
var mDates = undefined;
var cntLayers;
var cntErrLayers;
var cntSucLayers;
var mInfos;

function mapReady() {
    // Инициализация окна c графиками
    mInfos = new dcrscplaneta.clsInfo();
    var idiw = dojo.byId("InfoWindow");
    idiw.style.top = '50px';
    mInfos.parent = idiw;
    idiw.appendChild(mInfos.domNode);

    map.on("click", drawGrawInfo);
    function drawGrawInfo(evt) {

        if ((document.documentElement.clientHeight < 300) || (evt.clientY < 50) || (evt.clientY > document.documentElement.clientHeight - 50)) return;

        if (evt.clientX < (document.documentElement.clientWidth / 2)) {
            dojo.byId("InfoWindow").style.left = evt.clientX + 12 + 'px';
            dojo.byId("InfoTriangle").style.left = evt.clientX + 12 + 'px';
            dojo.byId("InfoTriangle").className = 'triangleLeft';
        } else {
            dojo.byId("InfoWindow").style.left = evt.clientX - 512 + 'px';
            dojo.byId("InfoTriangle").style.left = evt.clientX + 'px';
            dojo.byId("InfoTriangle").className = 'triangleRight';
        }

        dojo.byId("InfoWindow").style.height = (document.documentElement.clientHeight - 100) + 'px';
        mInfos.setHeight(document.documentElement.clientHeight - 100);
        dojo.byId("InfoWindow").style.display = 'block';

        mInfos.megaGraph(evt);
        dojo.byId("InfoTriangle").style.display = 'block';
        dojo.byId("InfoTriangle").style.top = evt.clientY + 'px';

    };
    map.on("mouse-down", function (evt) {
        dojo.byId("InfoWindow").style.display = 'none';
        dojo.byId("InfoTriangle").style.display = 'none';
    });
    map.on("mouse-wheel", function (evt) {
        dojo.byId("InfoWindow").style.display = 'none';
        dojo.byId("InfoTriangle").style.display = 'none';
    });

    //Добовление слоев на карту    
    map.on("layer-add-result", function (evt, er) {
        if (evt.hasOwnProperty('error')) { // Слой не загрузился
            cntErrLayers++;
        } else { // Слой загрузился устанавливаем check box-ы
            if (evt.layer.id.indexOf("layer") != 0) {
                cntSucLayers++;
                for (var i = 0; i < lDConfig[evt.layer.id].chBoxes.length; i++) {
                    dojo.byId(lDConfig[evt.layer.id].chBoxes[i]).disabled = false;
                }
            }
        }
        dojo.style(dojo.byId("progBar"), "width", (cntErrLayers + cntSucLayers) / cntLayers * 100 + "%");
        if (cntLayers <= (cntErrLayers + cntSucLayers)) {
            cntErrLayers = 0;
            cntSucLayers = 0;
            // Загрузка всех слоев завершена
            dojo.style(dojo.byId("AboutImage"), "display", "none");

            if (mLegend == undefined) {                
                mLegend = new dcrscplaneta.Legend();
                mLegend.placeAt(dojo.byId('legendDiv'));                
            }
            mLegend.buildLegend(map);
            
            if (timeSlider != null) {
                //var endT = timeSlider.timeStops[timeSlider.timeStops.length - 1];
                //var stT = timeSlider.timeStops[0];
                var stT = new Date(timeSlider.startTime - 12 * timeSlider.inpint * 3600000);
                var endT = new Date(timeSlider.startTime + 12 * timeSlider.inpint * 3600000);
                //var dde = endT.getUTCFullYear() + "-" + ("0" + (endT.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + endT.getUTCDate()).slice(-2) + " " + ("0" + endT.getUTCHours()).slice(-2) + ":00:00";
                //var dds = stT.getUTCFullYear() + "-" + ("0" + (stT.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + stT.getUTCDate()).slice(-2) + " " + ("0" + stT.getUTCHours()).slice(-2) + ":00:00";

                if (mDates == undefined) {
                    mDates = new dcrscplaneta.DatesList();
                    mDates.placeAt(dojo.byId("divDates"));
                }
                mDates.Reload(map, token, stT, endT);
                timeSlider.onchange();
            }
        }
    });
    SetLayers();
}

function SetLayers() {

    dojo.style(dojo.byId("AboutImage"), "display", "block");
    dojo.style(dojo.byId("progBar"), "width", "0%");
    // clear old
    while (map.layerIds.length > 1) {
        map.removeLayer(map.getLayer(map.layerIds[1]));
    }
    cntLayers = 0, cntErrLayers = 0, cntSucLayers = 0;
    //Disable all CheckBoxes
    var cBoxes = ["cbModis", "cbMeteor1", "cbKanopus", "cbLandsat8", "cbResursp", "cbFloodPolygons", "cbSnowMap", "cbSnowBorders", "cbMTSAT", "cbAscat",
                    "cbWaterLevel", "cbSnowDepth", "cbSnowDepth24", "cbMeteo", "cbWindSpeed", "cbWeatherEvent", "cbWeatherEventCol", "cbWeatherTmpIso", "cbWeatherPresIso",
                    "cbHGTIsoline", "cbHGTField", "cbTMPIsoline", "cbTMPField", "cbRHIsoline", "cbRHField", "cbPRMSLIsoline", "cbPRMSLField", "cbGRIBWind",
                    "cbFloodPred", "cbZeyaForecast", "cbZeyaCOSMO", "cbZeyaNCEP", "cbZeyaUKMO", "cbZeyaJMA", "cbLevelForecast", "cbBorders", "cbGosg", "cbAdm1", "cbAdm2",
                    "cbRestricted", "cbZP", "cbNP", "cbFZ", "cbCity", "cbChis", "cbStatus", "cbRivers", "cbRoads", "cbShoreline"];
    for (var i = 0; i < cBoxes.length; i++) {
        dojo.byId(cBoxes[i]).disabled = true;
    }
  //  dojo.byId('cbFloodPred').disabled = false;
    //Add attribData
    var lBorders = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/borders/MapServer", { id: "Bounds", visible: false }); cntLayers++;
    var lRestrict = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/restrict/MapServer", { id: "Restrict", visible: false }); cntLayers++;
    var lCity = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/cities/MapServer", { id: "City", visible: false }); cntLayers++;
    var lRivers = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/rivers/MapServer", { id: "Rivers", visible: false }); cntLayers++;
    var lRoads = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/roads/MapServer", { id: "Roads", visible: false }); cntLayers++;
    var lShoreline = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/attrib/shoreline/MapServer", { id: "Shoreline", visible: false }); cntLayers++;
    //Add Sat Data
    //Растры
    var modis = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_modis/ImageServer", { id: "MODIS_Raster", visible: false }); cntLayers++;
    var meteor = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_meteor1/ImageServer", { id: "METEOR1_Raster", visible: false }); cntLayers++;
    var landsat = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_landsat8/ImageServer", { id: "LANDSAT8_Raster", visible: false }); cntLayers++;
    var resurs = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_resursp/ImageServer", { id: "RESURSP_Raster", visible: false }); cntLayers++;
    var kanopus = new esri.layers.ArcGISImageServiceLayer(ip_serv + "arcgis/rest/services/rasters/image_kanopus/ImageServer", { id: "KANOPUS_Raster", visible: false }); cntLayers++;
    var floods = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/floods_clouds/floods_clouds/MapServer", { id: "Flood", visible: false }); cntLayers++;

    var snow_map = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/snow/snow_map_t/MapServer", { id: "SnowMap", visible: false }); cntLayers++;
    var snow_line = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/snow/snow_line_5_t/MapServer", { id: "SnowBorders", visible: false }); cntLayers++;

    var clouds = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/clouds/clouds/MapServer", { id: "clouds", visible: false }); cntLayers++;
    clouds.setImageFormat("png32");
    
    // MTSAT
   // var clouds = new dcrscplaneta.WMSLayer({ url: ip_serv + "geoserver/dvrcpod/wms", after180: false, layer: "dvrcpod:clouds", id: "clouds", visible: false }); cntLayers++;
   // var cloudsAfter180 = new dcrscplaneta.WMSLayer({ url: ip_serv + "geoserver/dvrcpod/wms", after180: true, layer: "dvrcpod:clouds", id: "cloudsAfter180", visible: false }); cntLayers++;

    //ASCAT
    //var Ascat = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/ascat_soil_t/MapServer", { id: "Ascat", visible: false }); cntLayers++;
    var Ascat = new dcrscplaneta.clsChangeItemDMSLField(ip_serv + "arcgis/rest/services/rasters/ascat_soil/ImageServer", { id: "Ascat", visible: false }); cntLayers++;
    Ascat.setLevel();
    Ascat.setInterpolation("INTERPOLATION_CUBICCONVOLUTION");

    if (token != "") {
        //predict
        
        var predictfloods = new dcrscplaneta.MapJob({url:ip_serv + "arcgis/rest/services/geoproc/FloodPrediction/MapServer",  id: "PredictFlood", visible: false }); cntLayers++;
        predictfloods.token = token;

        //Add Hydro
        var hydro = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/stations/hydro/MapServer/?token=" + token, { id: "Hydro", visible: false }); cntLayers++;
        var snow = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/stations/snow/MapServer/?token=" + token, { id: "Snow", visible: false }); cntLayers++;
        var snow24 = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/stations/snow_route/MapServer/?token=" + token, { id: "Snow_kn24", visible: false }); cntLayers++;
        //Add Meteo
        var meteo = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/stations/meteo/MapServer/?token=" + token, { id: "Meteo", visible: false }); cntLayers++;
        //Add Hgt
        var hgtiso = new dcrscplaneta.clsChangeItemDMSL(ip_serv + "arcgis/rest/services/forecast/wrf_hgt_iso/MapServer/?token=" + token, { id: "GRIB_HGT_ISO", visible: false }); cntLayers++;
        hgtiso.leg_name = "Геопотенциал";
        hgtiso.setLevel("500");
        var hgtfld = new dcrscplaneta.clsChangeItemDMSLField(ip_serv + "arcgis/rest/services/forecast/wrf_hgt_field_3/ImageServer/?token=" + token, { id: "GRIB_HGT_FIELD", visible: false }); cntLayers++;
        hgtfld.leg_name = "[Гп.м]";
        hgtfld.setLevel("500");
        //hgtfld.setRenderRule();
        //Add Tmp
        var tmpiso = new dcrscplaneta.clsChangeItemDMSL(ip_serv + "arcgis/rest/services/forecast/wrf_tmp_iso/MapServer/?token=" + token, { id: "GRIB_TMP_ISO", visible: false }); cntLayers++;
        tmpiso.leg_name = "Температура";
        tmpiso.setLevel("500");
        var tmpfld = new dcrscplaneta.clsChangeItemDMSLField(ip_serv + "arcgis/rest/services/forecast/wrf_temp_filed/ImageServer/?token=" + token, { id: "GRIB_TMP_FIELD", visible: false }); cntLayers++;
        tmpfld.leg_name = "[°C]";
        tmpfld.setLevel("500");
        //Add Rh
        var rhiso = new dcrscplaneta.clsChangeItemDMSL(ip_serv + "arcgis/rest/services/forecast/wrf_rh_iso/MapServer/?token=" + token, { id: "GRIB_RH_ISO", visible: false }); cntLayers++;
        rhiso.leg_name = "Влажность";
        rhiso.setLevel("500");
        var rhfld = new dcrscplaneta.clsChangeItemDMSLField(ip_serv + "arcgis/rest/services/forecast/wrf_rh_field_2/ImageServer/?token=" + token, { id: "GRIB_RH_FIELD", visible: false }); cntLayers++;
        rhfld.leg_name = "[%]";
        rhfld.setLevel("500");
        // Add APCP
        var apcpfld = new dcrscplaneta.clsChangeItemDMSLField(ip_serv + "arcgis/rest/services/forecast/wrf_apcp_field_2/ImageServer/?token=" + token, { id: "GRIB_APCP_FIELD", visible: false }); cntLayers++;        
        apcpfld.setLevel();
        // Add APCP
        var tcdcfld = new dcrscplaneta.clsChangeItemDMSLField(ip_serv + "arcgis/rest/services/forecast/wrf_tcdc_field/ImageServer/?token=" + token, { id: "GRIB_TCDC_FIELD", visible: false }); cntLayers++;
        tcdcfld.setLevel();
        //Add PRMSL
        var prmsliso = new dcrscplaneta.clsChangeItemDMSL(ip_serv + "arcgis/rest/services/forecast/wrf_prmsl_iso_2/MapServer/?token=" + token, { id: "GRIB_PRMSL_ISO", visible: false }); cntLayers++;
        prmsliso.leg_name = "Давление";
        var prmslfld = new dcrscplaneta.clsChangeItemDMSLField(ip_serv + "arcgis/rest/services/forecast/wrf_prmsl_field_2/ImageServer/?token=" + token, { id: "GRIB_PRMSL_FIELD", visible: false }); cntLayers++;
        prmslfld.leg_name = "[гПа]";
        prmslfld.setLevel();
        //Add WIND        
        var windwrf = new dcrscplaneta.WSDGLayer();
        windwrf.url = ip_serv + "arcgis/rest/services/forecast/wrf_wind_field/ImageServer/?token=" + token;
        windwrf.id = "GRIB_WIND_BARBS";
        windwrf.visible = false;
        windwrf.nUrl = ip_serv + "arcgis/rest/services/forecast/wrf_wind_field/ImageServer/exportImage?token=" + token + "&";
        cntLayers++;
        var windfld = new dcrscplaneta.clsChangeItemDMSLField(ip_serv + "arcgis/rest/services/forecast/wrf_wind_field/ImageServer/?token=" + token, { id: "GRIB_WIND_FIELD", visible: false }); cntLayers++;        
        windfld.setLevel("500");

        // Borsch
        var borsh = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/forecast/borsch_vdnh_inf/MapServer/?token=" + token, { id: "ZeyaVDHR", visible: false }); cntLayers++;
        var borsh2 = new esri.layers.ArcGISDynamicMapServiceLayer(ip_serv + "arcgis/rest/services/forecast/borsch_level/MapServer/?token=" + token, { id: "LevelPred", visible: false }); cntLayers++;

        map.addLayers([modis, meteor, landsat, resurs, kanopus,
                        floods, predictfloods, snow_map, snow_line, clouds, Ascat,
                        hgtfld, tmpfld, rhfld, tcdcfld, apcpfld, prmslfld, windfld,
                        hydro, snow, snow24, meteo,
                        borsh, borsh2, hgtiso, tmpiso, rhiso, prmsliso, windwrf,
                        lBorders, lRestrict, lCity, lRivers, lRoads, lShoreline]);
    } else {
        map.addLayers([modis, meteor, landsat, resurs, kanopus,
                        floods, snow_map, snow_line, clouds, Ascat,
                        lBorders, lRestrict, lCity, lRivers, lRoads, lShoreline]);
    }
}