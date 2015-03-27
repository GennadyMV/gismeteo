dojo.provide('dcrscplaneta.LineEditor');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.require("esri.tasks.query");
dojo.require("esri.tasks.query");
dojo.require("esri.layers.LayerTimeOptions");

var Soop = {
            'Flood': ['cbFloodPolygons'],
            'SnowMap': ['cbSnowMap'], 
            'SnowBorders': ['cbSnowBorders'],
            'Ascat': ['cbAscat'],
            'Hydro': ['cbWaterLevel'],
            'Snow': ['cbSnowDepth'],
            'Snow_kn24': ['cbSnowDepth24'],
            'Meteo': ['cbMeteo', 'cbWindSpeed', 'cbWeatherEvent', 'cbWeatherEventCol', 'cbWeatherTmpIso', 'cbWeatherPresIso'],
            'GRIB_HGT_ISO': ['cbHGTIsoline'],
            'GRIB_TMP_ISO': ['cbTMPIsoline'],
            'GRIB_RH_ISO': ['cbRHIsoline'],
            'GRIB_PRMSL_ISO': ['cbPRMSLIsoline'],
            'MODIS_Raster': ['cbModis'],
            'METEOR1_Raster': ['cbMeteor1'],
            'LANDSAT8_Raster': ['cbLandsat8'],
            'RESURSP_Raster': ['cbResursp'],
            'KANOPUS_Raster': ['cbKanopus']
};

function SupaSelectImage(id) {
    if (mDates.Layers != undefined) {        
        for (var i = 0; i < mDates.Layers.length; i++)
        {
            if (mDates.Layers[i].id == id) {
                var inSelect = '';
                if (mDates.Layers[i].datesList.childNodes[0].childNodes.length != 0) {
                    for (var j = 0; j < mDates.Layers[i].datesList.childNodes[0].childNodes.length; j++) {
                        var compDate = new Date(mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[0].value);
                        if (mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[0].checked) {
                            //inSelect += ", date'" + mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[1].innerText + "'";
                            var mS = new Date(compDate - 1000);
                            var tmS = mS.getUTCFullYear() + "-" + ("0" + (mS.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + mS.getUTCDate()).slice(-2) + " " + ("0" + mS.getUTCHours()).slice(-2) + ":" + ("0" + mS.getUTCMinutes()).slice(-2) + ":" + ("0" + mS.getUTCSeconds()).slice(-2);
                            var pS = new Date(compDate.getTime() + 1000);
                            var tpS = pS.getUTCFullYear() + "-" + ("0" + (pS.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + pS.getUTCDate()).slice(-2) + " " + ("0" + pS.getUTCHours()).slice(-2) + ":" + ("0" + pS.getUTCMinutes()).slice(-2) + ":" + ("0" + pS.getUTCSeconds()).slice(-2);
                            //inSelect += " OR datadatetime between date'" + tmS + "' and date'" + tpS +"'";
                            inSelect += " OR ((datadatetime > date '" + tmS + "') and datadatetime < (date'" + tpS + "'))"
                        }
                    }
                }
                inSelect = inSelect.substring(4);
                if (inSelect == "") {
                    inSelect = "datadatetime < date'0001-01-01'";
                    //disable checkbox
                    for (var j = 0; j < Soop[id].length; j++) {
                        dojo.byId(Soop[id][j]).checked = false;
                    }
                    map.getLayer(id).hide();
                } else {
                    //if checkbox disable enabled
                    for (var j = 0; j < Soop[id].length; j++) {
                        dojo.byId(Soop[id][j]).checked = true;
                    }
                    map.getLayer(id).show()
                }
                mDates.refreshVisible();
                map.getLayer(id).setDefinitionExpression(inSelect);
            }
        }
    }
    mDates.Layers.length
}

function SupaSelectMap(id) {
    if (mDates.Layers != undefined) {
        for (var i = 0; i < mDates.Layers.length; i++) {
            if (mDates.Layers[i].id == id) {
                var inSelect = '';
                if (mDates.Layers[i].datesList.childNodes[0].childNodes.length != 0) {
                    for (var j = 0; j < mDates.Layers[i].datesList.childNodes[0].childNodes.length; j++) {
                        var compDate = new Date(mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[0].value);
                        if (mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[0].checked) {
                            //inSelect += ", date'" + mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[1].innerText + "'";
                            var mS = new Date(compDate - 1000);
                            var tmS = mS.getUTCFullYear() + "-" + ("0" + (mS.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + mS.getUTCDate()).slice(-2) + " " + ("0" + mS.getUTCHours()).slice(-2) + ":" + ("0" + mS.getUTCMinutes()).slice(-2) + ":" + ("0" + mS.getUTCSeconds()).slice(-2);
                            var pS = new Date(compDate.getTime() + 1000);
                            var tpS = pS.getUTCFullYear() + "-" + ("0" + (pS.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + pS.getUTCDate()).slice(-2) + " " + ("0" + pS.getUTCHours()).slice(-2) + ":" + ("0" + pS.getUTCMinutes()).slice(-2) + ":" + ("0" + pS.getUTCSeconds()).slice(-2);
                            inSelect += " OR datadatetime between date'" + tmS + "' and date'" + tpS + "'";
                        }
                    }
                }
                inSelect = inSelect.substring(4);
                if (inSelect == "") {
                    inSelect = "datadatetime < date'0001-01-01'";
                    //disable checkbox
                    for (var j = 0; j < Soop[id].length; j++) {
                        dojo.byId(Soop[id][j]).checked = false;
                    }
                    map.getLayer(id).hide();
                } else {
                    //if checkbox disable enabled
                    for (var j = 0; j < Soop[id].length; j++) {
                        dojo.byId(Soop[id][j]).checked = true;
                    }
                    map.getLayer(id).show()
                }
                mDates.refreshVisible();

                var Shmar = map.getLayer(id).visibleLayers;
                var layerDef = [];
                var uh = map.getLayer(id).timeInfo;
                var TimeOptions = [];
                var tOpt = new esri.layers.LayerTimeOptions();                
                tOpt.useTime = false;
                for (var j = 0; j < Shmar.length; j++) {
                    layerDef[Shmar[j]] = inSelect;
                    TimeOptions[Shmar[j]] = tOpt;
                }
                map.getLayer(id).setLayerTimeOptions(TimeOptions, true);
                map.getLayer(id).setLayerDefinitions(layerDef);
            }
        }
    }
    mDates.Layers.length
}


function initDatesSelector() {
    function dcrscplaneta_GetDates( dList, featureSet) {
        var dates = [];
        for (var i = 0; i < featureSet.features.length; i++) {
            if (featureSet.features[i].attributes.datadatetime == undefined) {
                dates.push(new Date(featureSet.features[i].attributes.DataDateTime));
            } else {
                dates.push(new Date(featureSet.features[i].attributes.datadatetime));
            }
        }
        //clear old
        while (dList.Value.firstChild) {
            dList.Value.removeChild(dList.Value.firstChild);
        }
        if (dates.length == 0) {
            dList.Value.innerText = "За выбранные период нет данных";
        } else {
            var listElement = document.createElement("ul");
            dList.Value.appendChild(listElement);


            for (var i = 0; i < dates.length; i++) {
                var listItem = document.createElement("li");
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                var Image = ['MODIS_Raster', 'METEOR1_Raster', 'LANDSAT8_Raster', 'RESURSP_Raster', 'KANOPUS_Raster'];
                if (Image.indexOf(dList.id) > -1) {
                    checkbox.onchange = function mfk(evt) { SupaSelectImage(dList.id) };
                } else {
                    checkbox.onchange = function mfk(evt) { SupaSelectMap(dList.id) };
                }
                var dText = dates[i].getUTCFullYear() + "-" + ("0" + (dates[i].getUTCMonth() + 1)).slice(-2) + "-" + ("0" + dates[i].getUTCDate()).slice(-2) + " " + ("0" + dates[i].getUTCHours()).slice(-2) + ":" + ("0" + dates[i].getUTCMinutes()).slice(-2) + ":" + ("0" + dates[i].getUTCSeconds()).slice(-2);
                checkbox.value = dates[i];
                checkbox.checked = (dates[i] <= map.timeExtent.endTime && dates[i] >= map.timeExtent.startTime) ? true : false;
                listItem.appendChild(checkbox);
                var span = document.createElement('span');
                span.innerText = dText;
                listItem.appendChild(span);
                listElement.appendChild(listItem);
            }
        }
    }
    dojo.declare(
        'dcrscplaneta.DatesSelector',
        [dijit._Widget, dijit._Templated],
        {
            templatePath: new dojo._Url('', 'scripts/DatesSelector.html'),
            url: '',
            id: '',
            'ShowHideTreeView': function () {
                if (this.datesList.classList.contains("selected")) {
                    this.datesList.setAttribute("class", "tree-view");
                    this.arLeft.setAttribute("class", "arr");
                } else {
                    this.datesList.setAttribute("class", "selected");
                    this.arLeft.setAttribute("class", "ard");
                }
            },
            'Reload': function (ds, de) {
                var queryTask = new esri.tasks.QueryTask(this.url);
                var query = new esri.tasks.Query();
                query.returnGeometry = false;
                query.outFields = ["datadatetime"];
                query.orderByFields = ["datadatetime"];
                query.returnDistinctValues = true;
                query.where = "datadatetime between date'" + ds + "' AND date'" + de + "'";
                var x = { Value: this.datesList, id: this.id };
                queryTask.execute(query,
                    function mf(evt) { dcrscplaneta_GetDates(x, evt) }, 
                    //this._GetDates,
                    this._errorDates);
            },
            '_GetDates': function (featureSet) {
                var dates = [];
                for (var i = 0; i < featureSet.features.length; i++) {
                    dates.push(new Date(featureSet.features[i].attributes.datadatetime));
                }
                //clear old
                while (this.datesList.firstChild) {
                    this.datesList.removeChild(this.datesList.firstChild);
                }                
                var listElement = document.createElement("ul");
                this.datesList.appendChild(listElement);
                for (var i = 0; i < dates.length; i++) {
                    var listItem = document.createElement("li");
                    listItem.innerHTML = dates[i];
                    listElement.appendChild(listItem);
                }
            },
            '_errorDates': function (error) {
                var kk = 9;
            },
            'Select': function (ds, de) {
                if (this.datesList.childNodes.length == 0) {
                    return;
                }
                if (this.datesList.childNodes[0].childNodes.length != 0) {
                    for (var i = 0; i < this.datesList.childNodes[0].childNodes.length; i++) {
                        var compDate = new Date(this.datesList.childNodes[0].childNodes[i].childNodes[0].value);
                        if (compDate <= de && compDate >= ds) {
                            this.datesList.childNodes[0].childNodes[i].childNodes[0].checked = true;
                        } else {
                            this.datesList.childNodes[0].childNodes[i].childNodes[0].checked = false;
                        }                        
                    }
                }                
            },
            'SetTime': function () {
                var Image = ['MODIS_Raster', 'METEOR1_Raster', 'LANDSAT8_Raster', 'RESURSP_Raster', 'KANOPUS_Raster'];
                if (Image.indexOf(this.id) > -1) {
                    return;
                }
                var Shmar = map.getLayer(this.id).visibleLayers;
                var layerDef = [];
                var uh = map.getLayer(this.id).timeInfo;
                var TimeOptions = [];
                var tOpt = new esri.layers.LayerTimeOptions();
                tOpt.useTime = true;
                for (var j = 0; j < Shmar.length; j++) {
                    TimeOptions[Shmar[j]] = tOpt;
                }
                map.getLayer(this.id).setLayerTimeOptions(TimeOptions, true);
                map.getLayer(this.id).setLayerDefinitions(layerDef);
            }
        }
    );
    dojo.declare(
        'dcrscplaneta.DatesList',
        [dijit._Widget, dijit._Templated],
        {
            templatePath: new dojo._Url('', 'scripts/DatesList.html'),
            Layers : undefined,
            'Refresh': function (ds, de) {
                for (var i = 0; i < this.Layers.length; i++) {
                    this.Layers[i].Reload(ds, de);
                }
            },
            'Reload': function (map, token, ds, de) {
                //Clear Old
                this.Layers = [];
                while (this.container.firstChild) {
                    this.container.removeChild(this.container.firstChild);
                }
                //Run getDates
                var nLayers = {
                    'Flood': "Разливы",
                    'SnowMap': "Карты снежного покрова",
                    'SnowBorders': "Границы снежного покрова",
                    'Ascat': "Влажность почвы",
                    'Hydro': "Уровни воды",
                    'Snow': "Высота снега (КН-01)",
                    'Snow_kn24': "Высота снега (КН-24)",
                    'Meteo': "Метеорологическая информация",
                    'GRIB_HGT_ISO': "Геопотенциал (изолинии)",
                    'GRIB_TMP_ISO': "Температура (изолинии)",
                    'GRIB_RH_ISO': "Влажность (изолинии)",
                    'GRIB_PRMSL_ISO': "Давление (изолинии)",
                    'MODIS_Raster': "TERRA/AQUA (MODIS)",
                    'METEOR1_Raster': "Метеор-М №1 (КМСС)",
                    'LANDSAT8_Raster': "Landsat 8 (OLI)",
                    'RESURSP_Raster': "Ресурс-П №1 (ШМСА)",
                    'KANOPUS_Raster': "Канопус-В (МСС)"
                };
                for (var i = 0; i < map.layerIds.length; i++) {
                    if (nLayers.hasOwnProperty(map.layerIds[i])) {

                        var tVar = new dcrscplaneta.DatesSelector();
                        tVar.titleNode.innerText = nLayers[map.layerIds[i]];
                        tVar.url = map.getLayer(map.layerIds[i]).url;
                        tVar.id = map.layerIds[i];
                        if (tVar.url.indexOf("/ImageServer") < 0) {
                            if (tVar.url.indexOf("/?token=") > -1) { tVar.url = tVar.url.substr(0, tVar.url.indexOf("/?token=")) + "/0?token=" + token; } else { tVar.url = tVar.url + "/1"; }
                        }
                        tVar.Reload(ds, de);
                        this.Layers.push(tVar);
                        this.container.appendChild(tVar.domNode);
                    }
                }
            },
            'Select': function (ds, de) {
                if (this.Layers != undefined) {
                    
                  //  var dateS = new Date(Date.UTC(ds.substring(0, 4), ds.substring(5, 7) - 1, ds.substring(8, 10), ds.substring(11, 13), 0, 0));// Date(ds);
                  //  var dsd = dateS.getUTCFullYear() + "-" + dateS.getUTCMonth() + "-" + dateS.getUTCDate() + " " + dateS.getUTCHours();
                  //  var dateE = new Date(Date.UTC(de.substring(0, 4), de.substring(5, 7)-1, de.substring(8, 10), de.substring(11, 13), 0, 0));
                  //  for (var i = 0; i < this.Layers.length; i++) {
                  //      this.Layers[i].Select(dateS, dateE);
                  //  }

                    for (var i = 0; i < this.Layers.length; i++) {
                        this.Layers[i].Select(ds, de);
                    }
                }
            },
            'SetTime': function () {
                if (this.Layers != undefined) {
                    for (var i = 0; i < this.Layers.length; i++) {
                        this.Layers[i].SetTime();
                    }
                }
            },
            'refreshVisible': function () {
                if (this.Layers != undefined) {
                    for (var i = 0; i < this.Layers.length; i++) {
                        if (map.getLayer(this.Layers[i].id).visible == true) {
                            //this.Layers[i].domNode.style.display = 'block';
                            this.Layers[i].domNode.style.color = 'black';
                        } else {
                            //this.Layers[i].domNode.style.display = 'none';
                            this.Layers[i].domNode.style.color = 'gray';
                        }
                    }
                }
            }
        }
    );
};