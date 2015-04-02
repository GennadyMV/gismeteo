
function initDatesSelector() {

    function dcrscplaneta_GetDates( dList, featureSet) {
        var dates = [];
        var tField = lDConfig[dList.id].dField;//TimeSoop[dList.id];
        for (var i = 0; i < featureSet.features.length; i++) {
            var dat = JSON.stringify(featureSet.features[i].attributes);//.toString();//.$tField;// .attributes[tField];
            var dtime = dat.split(/[:{}]/);
            dates.push(new Date(+dtime[2]));
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
                //var Image = ['MODIS_Raster', 'METEOR1_Raster', 'LANDSAT8_Raster', 'RESURSP_Raster', 'KANOPUS_Raster'];
                var a = map.getLayer(dList.id).__proto__.declaredClass;
                if ((a === "esri.layers.ArcGISImageServiceLayer") || (a === "dcrscplaneta.clsChangeItemDMSLField")) {
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

    function SupaSelectImage(id) {
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
                                //inSelect += " OR datadatetime between date'" + tmS + "' and date'" + tpS +"'";
                                inSelect += " OR ((datadatetime > date '" + tmS + "') and datadatetime < (date'" + tpS + "'))"
                            }
                        }
                    }
                    inSelect = inSelect.substring(4);
                    if (inSelect == "") {
                        inSelect = "datadatetime < date'0001-01-01'";
                        //disable checkbox
                        for (var j = 0; j < lDConfig[id].chBoxes.length; j++) { dojo.byId(lDConfig[id].chBoxes[j]).checked = false; }
                        map.getLayer(id).hide();
                    } else {
                        //if checkbox disable enabled
                        for (var j = 0; j < lDConfig[id].chBoxes.length; j++) { dojo.byId(lDConfig[id].chBoxes[j]).checked = true; }
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
                    var tfield = lDConfig[id].dField;//TimeSoop[id];
                    if (mDates.Layers[i].datesList.childNodes[0].childNodes.length != 0) {
                        for (var j = 0; j < mDates.Layers[i].datesList.childNodes[0].childNodes.length; j++) {
                            var compDate = new Date(mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[0].value);
                            if (mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[0].checked) {
                                //inSelect += ", date'" + mDates.Layers[i].datesList.childNodes[0].childNodes[j].childNodes[1].innerText + "'";
                                var mS = new Date(compDate - 1000);
                                var tmS = mS.getUTCFullYear() + "-" + ("0" + (mS.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + mS.getUTCDate()).slice(-2) + " " + ("0" + mS.getUTCHours()).slice(-2) + ":" + ("0" + mS.getUTCMinutes()).slice(-2) + ":" + ("0" + mS.getUTCSeconds()).slice(-2);
                                var pS = new Date(compDate.getTime() + 1000);
                                var tpS = pS.getUTCFullYear() + "-" + ("0" + (pS.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + pS.getUTCDate()).slice(-2) + " " + ("0" + pS.getUTCHours()).slice(-2) + ":" + ("0" + pS.getUTCMinutes()).slice(-2) + ":" + ("0" + pS.getUTCSeconds()).slice(-2);
                                inSelect += " OR " + tfield + " between date'" + tmS + "' and date'" + tpS + "'";
                            }
                        }
                    }
                    inSelect = inSelect.substring(4);
                    if (inSelect == "") {
                        //inSelect = "datadatetime < date'0001-01-01'";
                        //disable checkbox
                        for (var j = 0; j < lDConfig[id].chBoxes.length; j++) {
                            dojo.byId(lDConfig[id].chBoxes[j]).checked = false;
                        }
                        map.getLayer(id).hide();
                    } else {
                        //if checkbox disable enabled
                        for (var j = 0; j < lDConfig[id].chBoxes.length; j++) {
                            dojo.byId(lDConfig[id].chBoxes[j]).checked = true;
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
                    if (map.getLayer(id).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSL") {
                        map.getLayer(id).setDate(inSelect);
                    } else {
                    map.getLayer(id).setLayerDefinitions(layerDef);
                }
            }
        }
        }
    }

    dojo.declare(
        'dcrscplaneta.DatesSelector',
        [dijit._Widget, dijit._Templated],
        {
            templateString: '<div class="DatesSelector" style="color:gray">' +
                                '<div>' + 
                                    '<span class="arr" data-dojo-attach-point="arLeft" data-dojo-attach-event="onclick:ShowHideTreeView"></span>' +
                                    '<span data-dojo-attach-point="titleNode"></span>' +
                                '</div>' +
                                '<div class="tree-view" data-dojo-attach-point="datesList"></div>' +
                            '</div>',
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
                var tfield = lDConfig[this.id].dField;//TimeSoop[this.id];
                var queryTask = new esri.tasks.QueryTask(this.url);
                var query = new esri.tasks.Query();
                query.returnGeometry = false;
                query.outFields = [tfield];
                query.orderByFields = [tfield];
                query.returnDistinctValues = true;
                query.where = tfield + " between date'" + ds + "' AND date'" + de + "'";
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
            'SetTime': function (ds, de) {
                var a = map.getLayer(this.id).__proto__.declaredClass;
                //var Image = ['MODIS_Raster', 'METEOR1_Raster', 'LANDSAT8_Raster', 'RESURSP_Raster', 'KANOPUS_Raster'];
                if ( map.getLayer(this.id).__proto__.declaredClass === "esri.layers.ArcGISImageServiceLayer") {//Image.indexOf(this.id) > -1) {
                    map.getLayer(this.id).setDefinitionExpression("DataDateTime between date '" + ds + "' and date '" + de + "'");
                    return;
                }
                if (map.getLayer(this.id).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSLField") {//Image.indexOf(this.id) > -1) {
                    map.getLayer(this.id).setDefinitionExpression("datadatetime between date '" + ds + "' and date '" + de + "'");
                    return;
                }
                if (map.getLayer(this.id).__proto__.declaredClass === "esri.layers.ArcGISDynamicMapServiceLayer") {
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
                    return;
                }
                if (map.getLayer(this.id).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSL") {
                    map.getLayer(this.id).resDate();
                    var TimeOptions = [];
                    var Shmar = map.getLayer(this.id).visibleLayers;
                    var tOpt = new esri.layers.LayerTimeOptions();
                    tOpt.useTime = true;
                    for (var j = 0; j < Shmar.length; j++) {
                        TimeOptions[Shmar[j]] = tOpt;
                    }
                    map.getLayer(this.id).setLayerTimeOptions(TimeOptions, true);
                    return;
            }
                var k = 9;
        }
        }
    );
    dojo.declare(
        'dcrscplaneta.DatesList',
        [dijit._Widget, dijit._Templated],
        {
            templateString : '<div class="DatesList" data-dojo-attach-point="container"></div>',
            Layers : undefined,
            'Refresh': function (ds, de) {
                var dde = de.getUTCFullYear() + "-" + ("0" + (de.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + de.getUTCDate()).slice(-2) + " " + ("0" + de.getUTCHours()).slice(-2) + ":00:00";
                var dds = ds.getUTCFullYear() + "-" + ("0" + (ds.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + ds.getUTCDate()).slice(-2) + " " + ("0" + ds.getUTCHours()).slice(-2) + ":00:00";
                for (var i = 0; i < this.Layers.length; i++) {
                    this.Layers[i].Reload(dds, dde);
                }
            },
            'Reload': function (map, token, ds, de) {
                //Clear Old
                this.Layers = [];
                while (this.container.firstChild) {
                    this.container.removeChild(this.container.firstChild);
                }
                //Run getDates
                var dde = de.getUTCFullYear() + "-" + ("0" + (de.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + de.getUTCDate()).slice(-2) + " " + ("0" + de.getUTCHours()).slice(-2) + ":00:00";
                var dds = ds.getUTCFullYear() + "-" + ("0" + (ds.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + ds.getUTCDate()).slice(-2) + " " + ("0" + ds.getUTCHours()).slice(-2) + ":00:00";
                for (var i = 0; i < map.layerIds.length; i++) {
                    if (lDConfig[map.layerIds[i]].dField != "") {
                        var tVar = new dcrscplaneta.DatesSelector();
                        tVar.titleNode.innerText = lDConfig[map.layerIds[i]].visName;
                        tVar.url = map.getLayer(map.layerIds[i]).url;
                        tVar.id = map.layerIds[i];
                        if (tVar.url.indexOf("/ImageServer") < 0) {
                            if (tVar.url.indexOf("/?token=") > -1) { tVar.url = tVar.url.substr(0, tVar.url.indexOf("/?token=")) + "/0?token=" + token; } else { tVar.url = tVar.url + "/1"; }
                        }
                        tVar.Reload(dds, dde);
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
                    this.refreshVisible();
                }
            },
            'SetTime': function (ds, de) {
                if (this.Layers != undefined) {
                    for (var i = 0; i < this.Layers.length; i++) {
                        this.Layers[i].SetTime(ds, de);
                    }
                    this.refreshVisible();
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