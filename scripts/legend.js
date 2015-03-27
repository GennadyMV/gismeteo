/* Данная функция создаёт кроссбраузерный объект XMLHTTP */
function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function getJSON(url, index) {

    var xmlHttp = getXmlHttp();

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;

    var xhr = getXmlHttp();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
            results[index] = xhr.response;
        } else {
            results[index] = xhr.response;
        }
    };
    xhr.send();
};
/*
function showHide(id, flag)
{
    var kk = legSettings[id];
    kk._Hide();
}

function alarmMa() {
    alert('alarma');
}

var legSettings = [];

function updateLegend(layers, divname) {
    //map.Get
    //Maping for legend
    var jName = [];
    var rName = []; var rLabel = [];
    jName['Bounds'] = "Границы";
    jName['Restrict'] = "Охраняемые природные территории";
    jName['City'] = "Города";
    jName['Rivers'] = "Гидро объекты";
    jName['Roads'] = "Авто- и ЖД- дороги";
    jName['Shoreline'] = "Береговая линия";
    
    rName['MODIS_Raster'] = "TERRA/AQUA (MODIS)"; rLabel['MODIS_Raster'] = "R(0.776-0.841 мкм)<br>G(0.776-0.841 мкм)<br> B(0.620-0.670 мкм))";
    rName['METEOR1_Raster'] = "Метеор-М №1 (КМСС)"; rLabel['METEOR1_Raster'] = "R(0.760-0.900 мкм)<br>G(0.580-0.690 мкм)<br>B(0.450-0.510 мкм))";
    rName['LANDSAT8_Raster'] = "Landsat 8 (OLI)"; rLabel['LANDSAT8_Raster'] = "R(2.100-2.300 мкм)<br>G(0.850-0.890 мкм)<br>B(0.530-0.600 мкм))";
    rName['RESURSP_Raster'] = "Ресурс-П №1 (ШМСА)"; rLabel['RESURSP_Raster'] = "R(? мкм)<br>G(? мкм)<br>B(? мкм))";
    rName['KANOPUS_Raster'] = "Канопус-В (МСС)"; rLabel['KANOPUS_Raster'] = "R(? мкм)<br>G(? мкм)<br>B(? мкм))";

    jName['Flood'] = "Разливы";
    jName['SnowMap'] = "Карты снежного покрова";
    jName['SnowBorders'] = "Границы снежного покрова";
    rName['MTSat_Cloud'] = "Карта облачности (MTSAT)"; rLabel['MTSat_Cloud'] = "ИК канал 10.3-11.3 мкм";
    jName['Ascat'] = "Влажность почвы";

    jName['Hydro'] = "Уровни воды";
    jName['Snow'] = "Высота снега (КН-01)";
    jName['Snow_kn24'] = "Высота снега (КН-24)";
    jName['Meteo'] = "Метеорологическая информация";


    if (layers.length < 5) return;

    var container = dojo.byId(divname);
    container.className = "legend";
    while (container.firstChild) container.removeChild(container.firstChild); // clear container

    var mainUl = document.createElement("ul");
    container.appendChild(mainUl);

    for (var i = 0; i < layers.length; i++) {
        // Слои для которых легенду получаем с сервера
        if (jName.hasOwnProperty(layers[i].layer.id)) {
            var tid = layers[i].layer.id + "_legend"
            var result = getJSON(layers[i].layer.url + "/legend?f=pjson", i);
            var obj = JSON.parse(result);

            var layerList = document.createElement("li");
            mainUl.appendChild(layerList);
            layerList.innerHTML = "<div class=\"arr\" id=\"" + tid + "\" onclick=\"TWSelUnSel('" + tid + "', '" + tid + "_ch" + "')\"></div>" + jName[layers[i].layer.id];

            var layerListDiv = document.createElement("div");
            layerListDiv.id = tid + "_ch";
            layerListDiv.className = "tree-view";
            mainUl.appendChild(layerListDiv);

            var layerListUl = document.createElement("ul");
            layerListDiv.appendChild(layerListUl);

            for (var j = 0; j < obj.layers.length; j++) {
                if (obj.layers[j].legend.length == 1 && obj.layers[j].legend[0].label == "") {
                    var legendList = document.createElement("li");
                    //<img src="data:image/png;base64,BASE64_ENCODED_DATA_HERE">
                    legendList.innerHTML = "<img src=\"data:" + obj.layers[j].legend[0].contentType + ";base64," + obj.layers[j].legend[0].imageData + "\">" + obj.layers[j].layerName;
                    layerListUl.appendChild(legendList);
                    continue;
                } else {
                    var legendList = document.createElement("li");
                    layerListUl.appendChild(legendList);
                    legendList.innerHTML = obj.layers[j].layerName;
                    var legendListUL = document.createElement("ul");
                    legendList.appendChild(legendListUL);
                    for (var k = 0; k < obj.layers[j].legend.length; k++) {
                        var subLegendList = document.createElement("li");
                        //<img src="data:image/png;base64,BASE64_ENCODED_DATA_HERE">
                        subLegendList.innerHTML = "<img src=\"data:" + obj.layers[j].legend[k].contentType + ";base64," + obj.layers[j].legend[k].imageData + "\">" + obj.layers[j].legend[k].label;
                        legendListUL.appendChild(subLegendList);
                    }
                }
            }
        }
        // Слои для которых легенда статична
        if (rName.hasOwnProperty(layers[i].layer.id)) {
            var tid = layers[i].layer.id + "_legend"
            var layerList = document.createElement("li");
            mainUl.appendChild(layerList);            
            layerList.innerHTML = "<div class=\"arr\" id=\""+tid+"\" onclick=\"TWSelUnSel('"+ tid+"', '"+tid+"_ch"+"')\"></div>" + rName[layers[i].layer.id];
            var layerListUl = document.createElement("div");
            layerListUl.id = tid + "_ch";
            layerListUl.className = "tree-view";
            layerListUl.innerHTML = rLabel[layers[i].layer.id];
            mainUl.appendChild(layerListUl);
        }
    }
    
    

    for (var i = 0; i < layers.length; i++) {
        var obj = JSON.parse(results[i]);
        var listItem = document.createElement("li");        
        listItem.innerHTML = layers[i].layer.name;
        var ulistEl = document.createElement("ul");
        for (var j = 0; j < obj.layers.length; j++) {
            //1) if 
            if (obj.layers[i].legend.length == 1 && obj.layers[i].legend[0].label == "")
            {
                var ulistItem = document.createElement("li");
                //<img src="data:image/png;base64,BASE64_ENCODED_DATA_HERE">
                listItem.innerHTML = "<img src=\"data:" + obj.layers[j].legend[0].contentType + ";base64," + obj.layers[j].legend[0].imageData + "\">" + obj.layers[j].layerName;
                ulistEl.appendChild(ulistItem);
                continue;
            }
        }
        listItem.appendChild(ulistEl);
        listElement.appendChild(listItem);
    }

}

function RefreshLegend(map, divname) {
    legSettings = [];
    var curZoom = map.getZoom();
    //Maping for legend
    var jName = [];
    var rName = []; var rLabel = [];
    jName['Bounds'] = "Границы";
    jName['Restrict'] = "Охраняемые природные территории";
    jName['City'] = "Города";
    jName['Rivers'] = "Гидро объекты";
    jName['Roads'] = "Авто- и ЖД- дороги";
    jName['Shoreline'] = "Береговая линия";

    rName['MODIS_Raster'] = "TERRA/AQUA (MODIS)"; rLabel['MODIS_Raster'] = "R(0.776-0.841 мкм)<br>G(0.776-0.841 мкм)<br> B(0.620-0.670 мкм))";
    rName['METEOR1_Raster'] = "Метеор-М №1 (КМСС)"; rLabel['METEOR1_Raster'] = "R(0.760-0.900 мкм)<br>G(0.580-0.690 мкм)<br>B(0.450-0.510 мкм))";
    rName['LANDSAT8_Raster'] = "Landsat 8 (OLI)"; rLabel['LANDSAT8_Raster'] = "R(2.100-2.300 мкм)<br>G(0.850-0.890 мкм)<br>B(0.530-0.600 мкм))";
    rName['RESURSP_Raster'] = "Ресурс-П №1 (ШМСА)"; rLabel['RESURSP_Raster'] = "R(? мкм)<br>G(? мкм)<br>B(? мкм))";
    rName['KANOPUS_Raster'] = "Канопус-В (МСС)"; rLabel['KANOPUS_Raster'] = "R(? мкм)<br>G(? мкм)<br>B(? мкм))";

    jName['Flood'] = "Разливы";
    jName['SnowMap'] = "Карты снежного покрова";
    jName['SnowBorders'] = "Границы снежного покрова";
    rName['MTSat_Cloud'] = "Карта облачности (MTSAT)"; rLabel['MTSat_Cloud'] = "ИК канал 10.3-11.3 мкм";
    jName['Ascat'] = "Влажность почвы";

    jName['Hydro'] = "Уровни воды";
    jName['Snow'] = "Высота снега (КН-01)";
    jName['Snow_kn24'] = "Высота снега (КН-24)";
    jName['Meteo'] = "Метеорологическая информация";

    var container = dojo.byId(divname);
    container.className = "legend";
    while (container.firstChild) container.removeChild(container.firstChild); // clear container

    var mainUl = document.createElement("div")//("ul");
    container.appendChild(mainUl);

    for (var i = 0; i < map.layerIds.length; i++) {        
        // Слои для которых легенду получаем с сервера
        // check Layer is Visible
        if (!map.getLayer(map.layerIds[i]).visible) continue;

        if (jName.hasOwnProperty(map.layerIds[i])) {
            var visId = map.getLayer(map.layerIds[i]).visibleLayers;

            var tid = map.layerIds[i] + "_legend"
            var result = getJSON(map.getLayer(map.layerIds[i]).url + "/legend?f=pjson", i);
            var obj = JSON.parse(result);

            var layerList = document.createElement("div")//("li");
            mainUl.appendChild(layerList);
            layerList.innerHTML = "<div class=\"arr\" id=\"" + tid + "\" onclick=\"TWSelUnSel('" + tid + "', '" + tid + "_ch" + "')\"></div>" +
                                  //"<div class=\"legend_element_set\"><img src=\"images/addicon/arrow-up.png\"/><img src=\"images/addicon/arrow-down.png\"/><img src=\"images/addicon/settings.png\"/></div>" +
                                  "<div class=\"legend_element_set\"><span class=\"arrdown\"></span><span class=\"arrup\"></span><span class=\"settings\" onclick=\"showHide('" + tid + "_set', true);\"></span></div>" +
                                    jName[map.layerIds[i]];

            var platformDiv = document.createElement("div");
            platformDiv.className = "clsPlatform";
            //platformDiv.innerHTML = "<div dojoType=\"dcrscplaneta.LineEditor\" data-dojo-props=\"open:false\" id=\"" + tid + "_set\"></div>"
            mainUl.appendChild(platformDiv);

            var layerListDiv = document.createElement("div");
            layerListDiv.id = tid + "_ch";
            layerListDiv.className = "tree-view";
            mainUl.appendChild(layerListDiv);

            var layerListUl = document.createElement("ul");
            layerListDiv.appendChild(layerListUl);

            for (var j = 0; j < obj.layers.length; j++) {
                if (visId.indexOf(obj.layers[j].layerId) < 0) continue;

                if (obj.layers[j].legend.length == 1 && obj.layers[j].legend[0].label == "") {
                    var legendList = document.createElement("li");
                    //<img src="data:image/png;base64,BASE64_ENCODED_DATA_HERE">
                    legendList.innerHTML = "<img class=\"legimg\" src=\"data:" + obj.layers[j].legend[0].contentType + ";base64," + obj.layers[j].legend[0].imageData + "\">" + obj.layers[j].layerName;
                    layerListUl.appendChild(legendList);
                    continue;
                } else {
                    var legendList = document.createElement("li");
                    layerListUl.appendChild(legendList);
                    legendList.innerHTML = obj.layers[j].layerName;
                    var legendListUL = document.createElement("ul");
                    legendList.appendChild(legendListUL);
                    for (var k = 0; k < obj.layers[j].legend.length; k++) {
                        var subLegendList = document.createElement("li");
                        //<img src="data:image/png;base64,BASE64_ENCODED_DATA_HERE">
                        subLegendList.innerHTML = "<img class=\"legimg\" src=\"data:" + obj.layers[j].legend[k].contentType + ";base64," + obj.layers[j].legend[k].imageData + "\">" + obj.layers[j].legend[k].label;
                        legendListUL.appendChild(subLegendList);
                    }
                }
            }            
            var SettingsDiv = new dcrscplaneta.LineEditor();
            SettingsDiv.sendOk = alarmMa;
            platformDiv.appendChild(SettingsDiv.domNode);
            legSettings[tid + '_set'] = SettingsDiv;
        }
        // Слои для которых легенда статична
        if (rName.hasOwnProperty(map.layerIds[i])) {
            var tid = map.layerIds[i] + "_legend"
            var layerList = document.createElement("li");
            mainUl.appendChild(layerList);
            layerList.innerHTML = "<div class=\"arr\" id=\"" + tid + "\" onclick=\"TWSelUnSel('" + tid + "', '" + tid + "_ch" + "')\"></div>" +
                "<div class=\"legend_element_set\"><img src=\"images/addicon/arrow-up.png\"/><img src=\"images/addicon/arrow-down.png\"/><img src=\"images/addicon/settings.png\"/></div>" + rName[map.layerIds[i]];
            var layerListUl = document.createElement("div");
            layerListUl.id = tid + "_ch";
            layerListUl.className = "tree-view";
            layerListUl.innerHTML = rLabel[map.layerIds[i]];
            mainUl.appendChild(layerListUl);
        }
    }
}
*/

//dojo.provide('dcrscplaneta.Legend');
//dojo.require('dijit._Widget');
//dojo.require('dijit._Templated');

require([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/parser", "dojo/ready",
    "dijit/_WidgetBase",
], function (declare, domConstruct, parser, ready, _WidgetBase) {
    declare("dcrscplaneta.elLegend", [dijit._Widget, dijit._Templated], {
        templateString: '<div class="elLegend">'+
                            '<div>'+
                                '<span class="arr" data-dojo-attach-point="arLeft" data-dojo-attach-event="onclick:ShowHideSubLegend"></span>'+
                                '<div class="legend_element_set">'+
                                    '<span class="settings" style="display:none" data-dojo-attach-point="arSet" data-dojo-attach-event="onclick:ShowHideSettings"></span>'+
                                    '<span class="arrdown" data-dojo-attach-point="arDown"></span>'+
                                    '<span class="arrup" data-dojo-attach-point="arUp"></span>'+
                                '</div>'+
                                '<span data-dojo-attach-point="titleNode" style="font-weight:bold;"></span>'+
                            '</div>'+
                            '<div class="clsPlatform" data-dojo-attach-point="Platform"></div>'+
                            '<div class="tree-view" data-dojo-attach-point="Legend"></div>'+
                        '</div>',
            //"<div class=\"elLegend\"><div><span class=\"arr\" data-dojo-attach-point=\"arLeft\" data-dojo-attach-event=\"onclick:ShowHideSubLegend\"></span><div class=\"legend_element_set\"><span class=\"arrdown\" data-dojo-attach-point=\"arDown\"></span><span class=\"arrup\" data-dojo-attach-point=\"arUp\"></span><span class=\"settings\" data-dojo-attach-point=\"arSet\"></span></div><span data-dojo-attach-point=\"titleNode\"></span></div><div class=\"clsPlatform\" data-dojo-attach-point=\"Platform\"></div><div class=\"tree-view\" data-dojo-attach-point=\"Legend\"></div></div>",
                      //"<div class=\"elLegend\"><div><span class=\"arr\" data-dojo-attach-point=\"arLeft\"></span><div class=\"legend_element_set\"><span class=\"arrdown\" data-dojo-attach-point=\"arDown\"></span><span class=\"arrup\" data-dojo-attach-point=\"arUp\"></span><span class=\"settings\" data-dojo-attach-point=\"arSet\"></span></div>${title}</div><div class=\"clsPlatform\" data-dojo-attach-point=\"Platform\"></div><div data-dojo-attach-point=\"Legend\"></div></div>",
            //dojo.cache('', 'scripts/elLegend.html'),
        title:      undefined,
        layerid:    undefined,
        subduar:    [],
        minscale:   [],
        maxscale:   [],
        settingdiv: undefined,

        'CreateElement': function (tit, lid, pur) {
            //this.domNode
            this.title = tit;
            this.layerid = lid;
            this.titleNode.innerHTML = this.title;
            for (var i = 0; i < pur.layers.length; i++) {
                this.subduar[i] = domConstruct.create("div");
                // If we have only one legend 
                if (pur.layers[i].legend.length == 1) {                    
                    var ulLeg = domConstruct.create("ul");
                    this.subduar[i].appendChild(ulLeg);
                    for (var j = 0; j < pur.layers[i].legend.length; j++) {
                        if (pur.layers[i].legend[j].label == "") { pur.layers[i].legend[j].label = pur.layers[i].layerName; }
                        ulLeg.appendChild(domConstruct.create("li", { innerHTML: "<img class=\"legimg\" src=\"data:" + pur.layers[i].legend[j].contentType + ";base64," + pur.layers[i].legend[j].imageData + "\">" + pur.layers[i].legend[j].label }));
                    }
                }
                else {
                    if (pur.layers.length > 1) {
                        this.subduar[i].appendChild(domConstruct.create("span", { innerHTML: pur.layers[i].layerName }));
                    }
                    var ulLeg = domConstruct.create("ul");
                    this.subduar[i].appendChild(ulLeg);
                    for (var j = 0; j < pur.layers[i].legend.length; j++) {
                        ulLeg.appendChild(domConstruct.create("li", { innerHTML: "<img class=\"legimg\" src=\"data:" + pur.layers[i].legend[j].contentType + ";base64," + pur.layers[i].legend[j].imageData + "\">" + pur.layers[i].legend[j].label }));
                    }
                }
                this.Legend.appendChild(this.subduar[i]);
            }
        },
        'ShowHideSubLegend' : function () {
            if (this.Legend.classList.contains("selected")) {
                this.Legend.setAttribute("class", "tree-view");
                this.arLeft.setAttribute("class", "arr");
            } else {
                this.Legend.setAttribute("class", "selected");
                this.arLeft.setAttribute("class", "ard");
            }
        },
        'AddSettings': function (layer) {
            this.arSet.style.display = "inline-block";
            this.settingdiv = new dcrscplaneta.LineEditor();
            this.settingdiv.sendOk = function (color, width) {
                //new esri.Color([255, 0, 0])
                var ccs = color.split(/[,()]/);
                layer.setLine(new esri.Color([ccs[1], ccs[2], ccs[3]]), width);
            };
            this.Platform.appendChild(this.settingdiv.domNode);
        },
        'ShowHideSettings': function () {
            if (this.settingdiv != undefined) {
                this.settingdiv._Hide();
            }
        },
        Refresh: function(scale, open) {
        }
    });
    declare("dcrscplaneta.Legend", [dijit._Widget, dijit._Templated], {
        jName: {
            'Bounds': "Границы",
            'Restrict': "Охраняемые природные территории",
            'City': "Города",
            'Rivers': "Гидро объекты",
            'Roads': "Авто- и ЖД- дороги",
            'Shoreline': "Береговая линия",
            'Flood': "Разливы",
            'SnowMap': "Карты снежного покрова",
            'SnowBorders': "Границы снежного покрова",
            'Ascat': "Влажность почвы",
            'Hydro': "Уровни воды",
            'Snow': "Высота снега (КН-01)",
            'Snow_kn24': "Высота снега (КН-24)",
            'Meteo': "Метеорологическая информация",
            'GRIB_HGT_ISO': "Геопотенциал (изолинии)",
            'GRIB_TMP_ISO' : "Температура (изолинии)", 
            'GRIB_RH_ISO' : "Влажность (изолинии)",
            'GRIB_PRMSL_ISO': "Давление (изолинии)"
        },
        elLayers: ['GRIB_HGT_ISO', 'GRIB_TMP_ISO', 'GRIB_RH_ISO', 'GRIB_PRMSL_ISO'],
        rName: {
            'MODIS_Raster'  : "TERRA/AQUA (MODIS)",
            'METEOR1_Raster': "Метеор-М №1 (КМСС)",
            'LANDSAT8_Raster':"Landsat 8 (OLI)",
            'RESURSP_Raster': "Ресурс-П №1 (ШМСА)",
            'KANOPUS_Raster': "Канопус-В (МСС)",   
            'MTSat_Cloud'   : "Карта облачности (MTSAT)"
        },
        rLanel: {
            'MODIS_Raster'  : "R(0.776-0.841 мкм)<br>G(0.776-0.841 мкм)<br> B(0.620-0.670 мкм))",
            'METEOR1_Raster': "R(0.760-0.900 мкм)<br>G(0.580-0.690 мкм)<br>B(0.450-0.510 мкм))",
            'LANDSAT8_Raster':"R(2.100-2.300 мкм)<br>G(0.850-0.890 мкм)<br>B(0.530-0.600 мкм))",
            'RESURSP_Raster': "R(? мкм)<br>G(? мкм)<br>B(? мкм))",
            'KANOPUS_Raster': "R(? мкм)<br>G(? мкм)<br>B(? мкм))",
            'MTSat_Cloud'   : "ИК канал 10.3-11.3 мкм"
        },
        templateString: "<div><div>",
        legSettings: [],
        elements: [],
        'buildLegend': function (map) { //This Function Create All elements of legend
            // clear Legend
            while (this.domNode.firstChild) this.domNode.removeChild(this.domNode.firstChild); // clear container
            // Read map Layers
            for (var i = 0; i < map.layerIds.length; i++) {
                // Слои для которых легенду получаем с сервера                
                if (this.jName.hasOwnProperty(map.layerIds[i])) {
                    var visId = map.getLayer(map.layerIds[i]).visibleLayers;
                    var tid = map.layerIds[i];
                    var str = map.getLayer(map.layerIds[i]).url;                    
                    if (str.indexOf("/?token=") > -1) {
                        str = str.substr(0, str.indexOf("/?token=")) + "/legend?f=pjson&token=" + token;
                    } else {
                        str = str + "/legend?f=pjson";
                    }
                    var result = getJSON(str , i);
                    var obj = JSON.parse(result);
                    var title = this.jName[tid];
                    var ik = this.elements.length;

                    this.elements[ik] = new dcrscplaneta.elLegend();
                    if (this.elLayers.indexOf(map.layerIds[i]) > -1) {
                        this.elements[ik].AddSettings(map.getLayer(map.layerIds[i]));
                    }
                    this.elements[ik].CreateElement(title, map.layerIds[i], obj);
                    this.domNode.appendChild(this.elements[ik].domNode);
                }
                // Слои для которых легенда статична
                if (this.rName.hasOwnProperty(map.layerIds[i])) {
                    
                }
            }
        },
        'ChangeLine': function (layer, color, width) {
        }
    });
});

/*
dojo.declare(
    'dcrscplaneta.LineEditor',
    [dijit._Widget, dijit._Templated],
    {
        templateString: "<div><div>",
        legSettings: [],
        elements: [],
        'buildLegend': function (map) { //This Function Create All elements of legend
            //Clear
            this.legSettings = [];
            this.elements = [];
            //Get map params
            var curZoom = map.getZoom();
            
            var jName = [];
            var rName = []; var rLabel = [];
            jName['Bounds'] = "Границы";
            jName['Restrict'] = "Охраняемые природные территории";
            jName['City'] = "Города";
            jName['Rivers'] = "Гидро объекты";
            jName['Roads'] = "Авто- и ЖД- дороги";
            jName['Shoreline'] = "Береговая линия";

            rName['MODIS_Raster'] = "TERRA/AQUA (MODIS)";   rLabel['MODIS_Raster'] =    "R(0.776-0.841 мкм)<br>G(0.776-0.841 мкм)<br> B(0.620-0.670 мкм))";
            rName['METEOR1_Raster'] = "Метеор-М №1 (КМСС)"; rLabel['METEOR1_Raster'] =  "R(0.760-0.900 мкм)<br>G(0.580-0.690 мкм)<br>B(0.450-0.510 мкм))";
            rName['LANDSAT8_Raster'] = "Landsat 8 (OLI)";   rLabel['LANDSAT8_Raster'] = "R(2.100-2.300 мкм)<br>G(0.850-0.890 мкм)<br>B(0.530-0.600 мкм))";
            rName['RESURSP_Raster'] = "Ресурс-П №1 (ШМСА)"; rLabel['RESURSP_Raster'] =  "R(? мкм)<br>G(? мкм)<br>B(? мкм))";
            rName['KANOPUS_Raster'] = "Канопус-В (МСС)";    rLabel['KANOPUS_Raster'] =  "R(? мкм)<br>G(? мкм)<br>B(? мкм))";

            jName['Flood'] = "Разливы";
            jName['SnowMap'] = "Карты снежного покрова";
            jName['SnowBorders'] = "Границы снежного покрова";
            rName['MTSat_Cloud'] = "Карта облачности (MTSAT)"; rLabel['MTSat_Cloud'] = "ИК канал 10.3-11.3 мкм";
            jName['Ascat'] = "Влажность почвы";

            jName['Hydro'] = "Уровни воды";
            jName['Snow'] = "Высота снега (КН-01)";
            jName['Snow_kn24'] = "Высота снега (КН-24)";
            jName['Meteo'] = "Метеорологическая информация";

            var container = dojo.byId(divname);
            container.className = "legend";
            while (container.firstChild) container.removeChild(container.firstChild); // clear container

            var mainUl = document.createElement("div")//("ul");
            container.appendChild(mainUl);

            for (var i = 0; i < map.layerIds.length; i++) {        
                // Слои для которых легенду получаем с сервера
                // check Layer is Visible
                if (!map.getLayer(map.layerIds[i]).visible) continue;

                if (jName.hasOwnProperty(map.layerIds[i])) {
                    var visId = map.getLayer(map.layerIds[i]).visibleLayers;

                    var tid = map.layerIds[i] + "_legend"
                    var result = getJSON(map.getLayer(map.layerIds[i]).url + "/legend?f=pjson", i);
                    var obj = JSON.parse(result);

                    var layerList = document.createElement("div")//("li");
                    mainUl.appendChild(layerList);
                    layerList.innerHTML = "<div class=\"arr\" id=\"" + tid + "\" onclick=\"TWSelUnSel('" + tid + "', '" + tid + "_ch" + "')\"></div>" +
                                          //"<div class=\"legend_element_set\"><img src=\"images/addicon/arrow-up.png\"/><img src=\"images/addicon/arrow-down.png\"/><img src=\"images/addicon/settings.png\"/></div>" +
                                          "<div class=\"legend_element_set\"><span class=\"arrdown\"></span><span class=\"arrup\"></span><span class=\"settings\" onclick=\"showHide('" + tid + "_set', true);\"></span></div>" +
                                            jName[map.layerIds[i]];

                    var platformDiv = document.createElement("div");
                    platformDiv.className = "clsPlatform";
                    //platformDiv.innerHTML = "<div dojoType=\"dcrscplaneta.LineEditor\" data-dojo-props=\"open:false\" id=\"" + tid + "_set\"></div>"
                    mainUl.appendChild(platformDiv);

                    var layerListDiv = document.createElement("div");
                    layerListDiv.id = tid + "_ch";
                    layerListDiv.className = "tree-view";
                    mainUl.appendChild(layerListDiv);

                    var layerListUl = document.createElement("ul");
                    layerListDiv.appendChild(layerListUl);

                    for (var j = 0; j < obj.layers.length; j++) {
                        if (visId.indexOf(obj.layers[j].layerId) < 0) continue;

                        if (obj.layers[j].legend.length == 1 && obj.layers[j].legend[0].label == "") {
                            var legendList = document.createElement("li");
                            //<img src="data:image/png;base64,BASE64_ENCODED_DATA_HERE">
                            legendList.innerHTML = "<img class=\"legimg\" src=\"data:" + obj.layers[j].legend[0].contentType + ";base64," + obj.layers[j].legend[0].imageData + "\">" + obj.layers[j].layerName;
                            layerListUl.appendChild(legendList);
                            continue;
                        } else {
                            var legendList = document.createElement("li");
                            layerListUl.appendChild(legendList);
                            legendList.innerHTML = obj.layers[j].layerName;
                            var legendListUL = document.createElement("ul");
                            legendList.appendChild(legendListUL);
                            for (var k = 0; k < obj.layers[j].legend.length; k++) {
                                var subLegendList = document.createElement("li");
                                //<img src="data:image/png;base64,BASE64_ENCODED_DATA_HERE">
                                subLegendList.innerHTML = "<img class=\"legimg\" src=\"data:" + obj.layers[j].legend[k].contentType + ";base64," + obj.layers[j].legend[k].imageData + "\">" + obj.layers[j].legend[k].label;
                                legendListUL.appendChild(subLegendList);
                            }
                        }
                    }            
                    var SettingsDiv = new dcrscplaneta.LineEditor();
                    SettingsDiv.sendOk = alarmMa;
                    platformDiv.appendChild(SettingsDiv.domNode);
                    legSettings[tid + '_set'] = SettingsDiv;
                }
                // Слои для которых легенда статична
                if (rName.hasOwnProperty(map.layerIds[i])) {
                    var tid = map.layerIds[i] + "_legend"
                    var layerList = document.createElement("li");
                    mainUl.appendChild(layerList);
                    layerList.innerHTML = "<div class=\"arr\" id=\"" + tid + "\" onclick=\"TWSelUnSel('" + tid + "', '" + tid + "_ch" + "')\"></div>" +
                        "<div class=\"legend_element_set\"><img src=\"images/addicon/arrow-up.png\"/><img src=\"images/addicon/arrow-down.png\"/><img src=\"images/addicon/settings.png\"/></div>" + rName[map.layerIds[i]];
                    var layerListUl = document.createElement("div");
                    layerListUl.id = tid + "_ch";
                    layerListUl.className = "tree-view";
                    layerListUl.innerHTML = rLabel[map.layerIds[i]];
                    mainUl.appendChild(layerListUl);
                }

        },
        'updateVisible': function () {

        },
        'changeOrder': function () {

        }
    }
);
*/