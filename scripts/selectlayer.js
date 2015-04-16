// Checkbox SubLayers
require(["dojo/dom", "dojo/on", "dojo/domReady!"],
function (dom, on) {
    //FORECAST Borsch
    on(dom.byId("cbZeyaForecast"), "change", ZeyaUpdateLayerVisibility);
    on(dom.byId("cbZeyaCOSMO"), "change", ZeyaUpdateLayerVisibility);
    on(dom.byId("cbZeyaNCEP"), "change", ZeyaUpdateLayerVisibility);
    on(dom.byId("cbZeyaUKMO"), "change", ZeyaUpdateLayerVisibility);
    on(dom.byId("cbZeyaJMA"), "change", ZeyaUpdateLayerVisibility);
    on(dom.byId("cbLevelForecast"), "change", ZeyaUpdateLayerVisibility);

    function ZeyaUpdateLayerVisibility() {
        if (dojo.byId('cbZeyaForecast').checked) {
            var sDef = [];
            for (var i = 0; i < 2; i++) {
                if (dojo.byId('cbZeyaCOSMO').checked) sDef.push("id_model = 2");
                if (dojo.byId('cbZeyaNCEP').checked) sDef.push("id_model = 3");
                if (dojo.byId('cbZeyaUKMO').checked) sDef.push("id_model = 4");
                if (dojo.byId('cbZeyaJMA').checked) sDef.push("id_model = 5");                
            }            
            map.getLayer("ZeyaVDHR").setLayerDefinitions(sDef);
            map.getLayer("ZeyaVDHR").show();
        } else {
            map.getLayer("ZeyaVDHR").hide();
        }

        if (dojo.byId('cbLevelForecast').checked) map.getLayer("LevelPred").show(); else map.getLayer("LevelPred").hide();
//        RefreshLegend(map, "legendDiv");
    }

    // Need Alex super prognos
    on(dom.byId("cbBorders"), "change", CheckCheck);
    on(dom.byId("cbAdm1"), "change", CheckCheck);
    on(dom.byId("cbAdm2"), "change", CheckCheck);
    on(dom.byId("cbGosg"), "change", CheckCheck);
    // Restricted Area
    on(dom.byId("cbRestricted"), "change", CheckCheck);
    on(dom.byId("cbZP"), "change", CheckCheck);
    on(dom.byId("cbNP"), "change", CheckCheck);
    on(dom.byId("cbFZ"), "change", CheckCheck);
    // Restricted City
    on(dom.byId("cbCity"), "change", CheckCheck);
    on(dom.byId("cbChis"), "change", CheckCheck);
    on(dom.byId("cbStatus"), "change", CheckCheck);
    // Another attrib
    on(dom.byId("cbRivers"), "change", CheckCheck);
    on(dom.byId("cbRoads"), "change", CheckCheck);
    on(dom.byId("cbShoreline"), "change", CheckCheck);
    //Meteo
    on(dom.byId("cbWeatherEvent"), "change", CheckCheck);
    on(dom.byId("cbWindSpeed"), "change", CheckCheck);
    on(dom.byId("cbMeteo"), "change", CheckCheck);
    on(dom.byId("cbWeatherEventCol"), "change", CheckCheck);
    on(dom.byId("cbWeatherTmpIso"), "change", CheckCheck);
    on(dom.byId("cbWeatherPresIso"), "change", CheckCheck);
    // Hydro
    on(dom.byId("cbWaterLevel"), "change", CheckCheck);
    on(dom.byId("cbSnowDepth"), "change", CheckCheck);
    on(dom.byId("cbSnowDepth24"), "change", CheckCheck);
    // Sat
    on(dom.byId("cbModis"), "change", CheckCheck);
    on(dom.byId("cbMeteor1"), "change", CheckCheck);
    on(dom.byId("cbLandsat8"), "change", CheckCheck);
    on(dom.byId("cbResursp"), "change", CheckCheck);
    on(dom.byId("cbKanopus"), "change", CheckCheck);
    on(dom.byId("cbFloodPolygons"), "change", CheckCheck);
    on(dom.byId("cbMTSAT"), "change", CheckCheck);
    on(dom.byId("cbSnowMap"), "change", CheckCheck);
    on(dom.byId("cbSnowBorders"), "change", CheckCheck);
    on(dom.byId("cbAscat"), "change", CheckCheck);
    // FORECAST WRF    
    on(dom.byId("cbHGTIsoline"), "change", CheckCheck);
    on(dom.byId("cbTMPIsoline"), "change", CheckCheck);
    on(dom.byId("cbRHIsoline"), "change", CheckCheck);
    on(dom.byId("cbPRMSLIsoline"), "change", CheckCheck);
    on(dom.byId("cbHGTField"), "change", CheckCheck);
    on(dom.byId("cbTMPField"), "change", CheckCheck);
    on(dom.byId("cbRHField"), "change", CheckCheck);
    on(dom.byId("cbPRMSLField"), "change", CheckCheck);
    on(dom.byId("cbGRIBWind"), "change", CheckCheck);
    on(dom.byId("cbAPCPField"), "change", CheckCheck);
    on(dom.byId("cbGRIBWindF"), "change", CheckCheck);

    function CheckCheck(event) {        
        switch (event.target.id)
        {
            case "cbRivers":
                if (dojo.byId('cbRivers').checked) map.getLayer("Rivers").show(); else map.getLayer("Rivers").hide();
                break;
            case "cbRoads":
                if (dojo.byId('cbRoads').checked) map.getLayer("Roads").show(); else map.getLayer("Roads").hide();
                break;
            case "cbShoreline":
                if (dojo.byId('cbShoreline').checked) map.getLayer("Shoreline").show(); else map.getLayer("Shoreline").hide();
                break;            
            case "cbBorders":
                if (dojo.byId('cbBorders').checked) map.getLayer("Bounds").show(); else map.getLayer("Bounds").hide();
                if (dojo.byId('cbBorders').checked && !(dojo.byId('cbGosg').checked || dojo.byId('cbAdm1').checked || dojo.byId('cbAdm2').checked)) {
                    dojo.byId('cbGosg').checked = true;
                    dojo.byId('cbAdm1').checked = true;
                    dojo.byId('cbAdm2').checked = true;
                }
                break;
            case "cbGosg"://no break
            case "cbAdm1"://no break
            case "cbAdm2"://no break
                {
                    var visibleLayers = [];
                    if (dojo.byId('cbGosg').checked) visibleLayers.push(0);
                    if (dojo.byId('cbAdm1').checked) visibleLayers.push(1);
                    if (dojo.byId('cbAdm2').checked) visibleLayers.push(2);
                    map.getLayer("Bounds").setVisibleLayers(visibleLayers);
                    dojo.byId('cbBorders').checked = (dojo.byId('cbGosg').checked) || (dojo.byId('cbAdm1').checked) || (dojo.byId('cbAdm2').checked);
                    if (dojo.byId('cbBorders').checked) map.getLayer("Bounds").show(); else map.getLayer("Bounds").hide();
                    break;
                }
            case "cbRestricted":
                if (dojo.byId('cbRestricted').checked) map.getLayer("Restrict").show(); else map.getLayer("Restrict").hide();
                if (dojo.byId('cbRestricted').checked && !(dojo.byId('cbZP').checked || dojo.byId('cbNP').checked || dojo.byId('cbFZ').checked)) {
                    dojo.byId('cbZP').checked = true;
                    dojo.byId('cbNP').checked = true;
                    dojo.byId('cbFZ').checked = true;
                }
                break;
            case "cbFZ": //no break
            case "cbNP": //no break
            case "cbZP": //no break
                {
                    var visibleLayers = [];
                    if (dojo.byId('cbFZ').checked) visibleLayers.push(0);
                    if (dojo.byId('cbNP').checked) visibleLayers.push(1);
                    if (dojo.byId('cbZP').checked) visibleLayers.push(2);

                    map.getLayer("Restrict").setVisibleLayers(visibleLayers);
                    dojo.byId('cbRestricted').checked = (dojo.byId('cbFZ').checked) || (dojo.byId('cbNP').checked) || (dojo.byId('cbZP').checked);
                    if (dojo.byId('cbRestricted').checked) map.getLayer("Restrict").show(); else map.getLayer("Restrict").hide();
                    break;
                }
            case "cbCity":
                if (dojo.byId('cbCity').checked) map.getLayer("City").show(); else map.getLayer("City").hide();                
                break;
            case "cbChis":
            case "cbStatus": {
                var visibleLayers = [];
                if (dojo.byId('cbChis').checked) { visibleLayers.push(0); visibleLayers.push(1); }
                if (dojo.byId('cbStatus').checked) visibleLayers.push(2);
                map.getLayer("City").setVisibleLayers(visibleLayers);
                break;
            }
            case "cbWeatherEvent" :
            case "cbWindSpeed":
            case "cbMeteo":
            case "cbWeatherEventCol":
            case "cbWeatherTmpIso":
            case "cbWeatherPresIso": {
                var visibleLayers = [];
                if (dojo.byId('cbWeatherEvent').checked) visibleLayers.push(0);
                if (dojo.byId('cbWindSpeed').checked) visibleLayers.push(1);
                if (dojo.byId('cbMeteo').checked) visibleLayers.push(2);
                if (dojo.byId('cbWeatherEventCol').checked) visibleLayers.push(3);
                if (dojo.byId('cbWeatherTmpIso').checked) { visibleLayers.push(4); visibleLayers.push(5); visibleLayers.push(6); }
                if (dojo.byId('cbWeatherPresIso').checked) { visibleLayers.push(7); visibleLayers.push(8); visibleLayers.push(9); }

                if (visibleLayers.length > 0) {
                    map.getLayer("Meteo").setVisibleLayers(visibleLayers);
                    map.getLayer("Meteo").show();
                } else map.getLayer("Meteo").hide();
                
                break;
            }
            case "cbWaterLevel":
                if (dojo.byId('cbWaterLevel').checked) map.getLayer("Hydro").show(); else map.getLayer("Hydro").hide();
                break;
            case "cbSnowDepth":
                if (dojo.byId('cbSnowDepth').checked) map.getLayer("Snow").show(); else map.getLayer("Snow").hide();
                break;
            case "cbSnowDepth24":
                if (dojo.byId('cbSnowDepth24').checked) map.getLayer("Snow_kn24").show(); else map.getLayer("Snow_kn24").hide();
                break;
            case "cbModis":
                if (dojo.byId('cbModis').checked) map.getLayer("MODIS_Raster").show(); else map.getLayer("MODIS_Raster").hide();
                break;
            case "cbMeteor1":
                if (dojo.byId('cbMeteor1').checked) map.getLayer("METEOR1_Raster").show(); else map.getLayer("METEOR1_Raster").hide();
                break;
            case "cbLandsat8":
                if (dojo.byId('cbLandsat8').checked) map.getLayer("LANDSAT8_Raster").show(); else map.getLayer("LANDSAT8_Raster").hide();
                break;
            case "cbResursp":
                if (dojo.byId('cbResursp').checked) map.getLayer("RESURSP_Raster").show(); else map.getLayer("RESURSP_Raster").hide();
                break;
            case "cbKanopus":
                if (dojo.byId('cbKanopus').checked) map.getLayer("KANOPUS_Raster").show(); else map.getLayer("KANOPUS_Raster").hide();
                break;
            case "cbFloodPolygons":
                if (dojo.byId('cbFloodPolygons').checked) map.getLayer("Flood").show(); else map.getLayer("Flood").hide();
                break;
            case "cbMTSAT":
                if (dojo.byId('cbMTSAT').checked) {
                    map.getLayer("clouds").show();
                    basemapGallery.select("BaseMapImagery");
                } else {
                    map.getLayer("clouds").hide();
                }
                break;
            case "cbSnowMap":
                if (dojo.byId('cbSnowMap').checked) map.getLayer("SnowMap").show(); else map.getLayer("SnowMap").hide();
                break;
            case "cbSnowBorders":
                if (dojo.byId('cbSnowBorders').checked) map.getLayer("SnowBorders").show(); else map.getLayer("SnowBorders").hide();
                break;
            case "cbAscat":
                if (dojo.byId('cbAscat').checked) map.getLayer("Ascat").show(); else map.getLayer("Ascat").hide();
                break;
            case "cbHGTIsoline":
                if (dojo.byId('cbHGTIsoline').checked)  map.getLayer("GRIB_HGT_ISO").show(); else map.getLayer("GRIB_HGT_ISO").hide();
                break;
            case "cbHGTField":
                if (dojo.byId('cbHGTField').checked) map.getLayer("GRIB_HGT_FIELD").show(); else map.getLayer("GRIB_HGT_FIELD").hide();
                break;
            case "cbRHIsoline":
                if (dojo.byId('cbRHIsoline').checked) map.getLayer("GRIB_RH_ISO").show(); else map.getLayer("GRIB_RH_ISO").hide();
                break;
            case "cbRHField":
                if (dojo.byId('cbRHField').checked) map.getLayer("GRIB_RH_FIELD").show(); else map.getLayer("GRIB_RH_FIELD").hide();
                break;
            case "cbTMPIsoline":
                if (dojo.byId('cbTMPIsoline').checked) map.getLayer("GRIB_TMP_ISO").show(); else map.getLayer("GRIB_TMP_ISO").hide();
                break;
            case "cbTMPField":
                if (dojo.byId('cbTMPField').checked) map.getLayer("GRIB_TMP_FIELD").show(); else map.getLayer("GRIB_TMP_FIELD").hide();
                break;
            case "cbPRMSLIsoline":
                if (dojo.byId('cbPRMSLIsoline').checked) map.getLayer("GRIB_PRMSL_ISO").show(); else map.getLayer("GRIB_PRMSL_ISO").hide();
                break;
            case "cbPRMSLField":
                if (dojo.byId('cbPRMSLField').checked) map.getLayer("GRIB_PRMSL_FIELD").show(); else map.getLayer("GRIB_PRMSL_FIELD").hide();
                break;
            case "cbAPCPField":
                if (dojo.byId('cbAPCPField').checked) map.getLayer("GRIB_APCP_FIELD").show(); else map.getLayer("GRIB_APCP_FIELD").hide();
                break;                
            case "cbGRIBWind":
                if (dojo.byId('cbGRIBWind').checked) map.getLayer("GRIB_WIND_BARBS").show(); else map.getLayer("GRIB_WIND_BARBS").hide();
                break;
            case "cbGRIBWindF":
                if (dojo.byId('cbGRIBWindF').checked) map.getLayer("GRIB_WIND_FIELD").show(); else map.getLayer("GRIB_WIND_FIELD").hide();
                break;
            default:
            break;
        }

        if (mDates != undefined) mDates.refreshVisible();
        if (mLegend != undefined) mLegend.refreshVisible();
        //RefreshLegend(map, "legendDiv");
    }

});