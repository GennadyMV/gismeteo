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

require([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/parser", "dojo/ready",
    "dijit/_WidgetBase",
], function (declare, domConstruct, parser, ready, _WidgetBase) {
    declare("dcrscplaneta.elLegend", [dijit._Widget, dijit._Templated], {
        templateString: '<div class="elLegend">'+
                            '<div>'+
                                '<span class="arr" data-dojo-attach-point="arLeft" data-dojo-attach-event="onclick:ShowHideSubLegend"></span>'+
                                '<div class="legend_element_set">'+                                    
                                    '<span class="arrdown" data-dojo-attach-point="arDown" data-dojo-attach-event="onclick:Up"></span>' +
                                    '<span class="arrup" data-dojo-attach-point="arUp" data-dojo-attach-event="onclick:Down"></span>' +
                                    '<span class="settings" style="display:none" data-dojo-attach-point="arSet" data-dojo-attach-event="onclick:ShowHideSettings"></span>' +
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
        subduar:    undefined,
        minscale:   [],
        maxscale:   [],
        settingdiv: undefined,
        orderfunc: undefined,
        'CreateElement': function (tit, lid, pur) {
            //this.domNode
            this.title = tit;
            this.layerid = lid;
            this.titleNode.innerHTML = this.title;
            this.subduar = new Array();
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
        'CreateStaticElement': function (tit, lid, leg) {
            //this.domNode
            this.title = tit;
            this.layerid = lid;
            this.titleNode.innerHTML = this.title;
            this.subduar = new Array();
            this.subduar[0] = domConstruct.create("div");                
            var ulLeg = domConstruct.create("ul");
            this.subduar[0].appendChild(ulLeg);                    
            ulLeg.appendChild(domConstruct.create("li", { innerHTML: leg }));
            this.Legend.appendChild(this.subduar[0]);
        },
        'CreateDinamicElement': function (tit, lid) {
            //this.domNode
            this.title = tit;
            this.layerid = lid;
            this.titleNode.innerHTML = this.title;
            this.subduar = new Array();
            this.subduar[0] = domConstruct.create("div");
            //create legend
            if (map.getLayer(lid).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSL") {
                this.subduar[0].innerHTML = '<span style="display:inline-block; background:' + map.getLayer(lid).color + '; height:' + map.getLayer(lid).width + 'px; width:25px; vertical-align:middle; margin-Left:10px; margin-right:5px;"></span>' + map.getLayer(lid).leg_name;
            }
            if (map.getLayer(lid).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSLField") {
                this.subduar[0].innerHTML = '<div style="position:relative; height:65px"><div style="width:170px; text-align:center">' + map.getLayer(lid).leg_name + '</div><div style="width:210px; height:25px; margin-left:20px; background-image:' + map.getLayer(lid).colorGrad + '"></div><div style="position:absolute; left:12px;">' + map.getLayer(lid).minVal + '</div><div style="position:absolute; left:212px;">' + map.getLayer(lid).maxVal + '</div></div>';
            }
            this.Legend.appendChild(this.subduar[0]);
        },
        'reElement': function () {            
            if (map.getLayer(this.layerid).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSL") {
                this.subduar[0].innerHTML = '<span style="display:inline-block; background:' + map.getLayer(this.layerid).color + '; height:' + map.getLayer(this.layerid).width + 'px; width:25px; vertical-align:middle; margin-Left:10px; margin-right:5px;"></span>' + map.getLayer(this.layerid).leg_name;
            }
            if (map.getLayer(this.layerid).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSLField") {
                if (map.getLayer(this.layerid).leg_name != undefined)
                    this.subduar[0].innerHTML = '<div style="position:relative; height:65px"><div style="width:170px; text-align:center">' + map.getLayer(this.layerid).leg_name + '</div><div style="width:210px; height:25px; margin-left:20px; background-image:' + map.getLayer(this.layerid).colorGrad + '"></div><div style="position:absolute; left:12px;">' + map.getLayer(this.layerid).minVal + '</div><div style="position:absolute; left:212px;">' + map.getLayer(this.layerid).maxVal + '</div></div>';
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
            if (layer.__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSL") {
                this.settingdiv = new dcrscplaneta.LineEditor();
                var papa = { value: this };
                this.settingdiv.sendOk = function (color, width) {
                    //new esri.Color([255, 0, 0])
                    var ccs = color.split(/[,()]/);
                    layer.setLine(new esri.Color([ccs[1], ccs[2], ccs[3]]), width);
                    papa.value.reElement();
                };
                this.Platform.appendChild(this.settingdiv.domNode);
            }
            if (layer.__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSLField") {
                this.settingdiv = new dcrscplaneta.FieldEditor(layer.id);
                var papa = { value: this };
                this.settingdiv.sendOk = function (color, min, max, opacity, isInv) {
                    layer.setOpacity(opacity/100.0);
                    layer.setColorMap(color, min, max, isInv);
                    papa.value.reElement();
                };
                this.Platform.appendChild(this.settingdiv.domNode);
            }
        },
        'ShowHideSettings': function () {
            if (this.settingdiv != undefined) {
                this.settingdiv._Hide();
            }
        },
        'Up': function () {
            if (this.orderfunc) this.orderfunc(this.layerid, 1);
        },
        'Down': function () {
            if (this.orderfunc) this.orderfunc(this.layerid, -1);
        },
        Refresh: function(scale, open) {
        }
    });
    declare("dcrscplaneta.Legend", [dijit._Widget, dijit._Templated], {
        templateString: "<div><div>",
        legSettings: [],
        elements: [],
        'buildLegend': function (map) { //This Function Create All elements of legend
            var papa = { value: this };
            function setval(lid, ord) {
                //papa.value.SwapElements(lid, ord)
                papa.value.SwapVisElements(lid, ord);
            };
            // clear Legend
            this.elements = new Array();
            while (this.domNode.firstChild) this.domNode.removeChild(this.domNode.firstChild); // clear container
            // Read map Layers
            for (var i = 0; i < map.layerIds.length; i++) {
                // Слои для которых легенду получаем с сервера                
                if ((map.layerIds[i] != "layer0")) {
                    if ((lDConfig[map.layerIds[i]].fLegend === "") && (lDConfig[map.layerIds[i]].visName != "")) {//this.jName.hasOwnProperty(map.layerIds[i])) {

                        var visId = map.getLayer(map.layerIds[i]).visibleLayers;
                        var tid = map.layerIds[i];
                        var title = lDConfig[map.layerIds[i]].visName;//this.jName[tid];
                        var ik = this.elements.length;
                        this.elements[ik] = new dcrscplaneta.elLegend();

                        if ((map.getLayer(map.layerIds[i]).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSL") ||
                            (map.getLayer(map.layerIds[i]).__proto__.declaredClass === "dcrscplaneta.clsChangeItemDMSLField")) {                            
                            this.elements[ik].AddSettings(map.getLayer(map.layerIds[i]));
                            this.elements[ik].CreateDinamicElement(title, map.layerIds[i]);
                        } else {
                            var str = map.getLayer(map.layerIds[i]).url;
                            if (str.indexOf("/?token=") > -1) {
                                str = str.substr(0, str.indexOf("/?token=")) + "/legend?f=pjson&token=" + token;
                            } else {
                                str = str + "/legend?f=pjson";
                            }
                            var result = getJSON(str, i);
                            var obj = JSON.parse(result);
                            this.elements[ik].orderfunc = setval;
                            this.elements[ik].CreateElement(title, map.layerIds[i], obj);
                        }                        
                        this.domNode.appendChild(this.elements[ik].domNode);
                    } else {
                        if (lDConfig[map.layerIds[i]].fLegend != "") {                            
                            var title = lDConfig[map.layerIds[i]].visName;//this.jName[tid];
                            var ik = this.elements.length;
                            this.elements[ik] = new dcrscplaneta.elLegend();
                            this.elements[ik].orderfunc = setval;                            
                            this.elements[ik].CreateStaticElement(title, map.layerIds[i], lDConfig[map.layerIds[i]].fLegend);
                            this.domNode.appendChild(this.elements[ik].domNode);
                        }
                        // Слои для которых легенда статична
                        //if (this.rName.hasOwnProperty(map.layerIds[i])) {
                    }
                }
            }
            // Read map Layers
            for (var i = 0; i < map.graphicsLayerIds.length; i++) {
                // Слои для которых легенду получаем с сервера                
                if ((map.graphicsLayerIds[i] != "layer0")) {                    
                    if (lDConfig[map.graphicsLayerIds[i]].fLegend != "") {
                        var title = lDConfig[map.graphicsLayerIds[i]].visName;//this.jName[tid];
                        var ik = this.elements.length;
                        this.elements[ik] = new dcrscplaneta.elLegend();
                        this.elements[ik].orderfunc = setval;
                        this.elements[ik].CreateStaticElement(title, map.graphicsLayerIds[i], lDConfig[map.graphicsLayerIds[i]].fLegend);
                        this.domNode.appendChild(this.elements[ik].domNode);
                    }                        
                }
            }
            this.refreshVisible();
        },
        'SwapElements': function (layerId, order) {            
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].layerid === layerId) {
                    if (order == 1) {
                        if (i == (this.elements.length - 1)) return;
                        this.elements[i+1].domNode.parentNode.insertBefore(this.elements[i+1].domNode, this.elements[i].domNode);
                        var b = this.elements[i];
                        this.elements[i] = this.elements[i + 1];
                        this.elements[i + 1] = b;
                        //map.reorderLayer(map.getLayer(this.elements[i].layerid), i + 1);
                        break;
                    } else {
                        if (i == 0) return;
                        this.elements[i].domNode.parentNode.insertBefore(this.elements[i].domNode, this.elements[i - 1].domNode);
                        var b = this.elements[i];
                        this.elements[i] = this.elements[i - 1];
                        this.elements[i - 1] = b;
                        //map.reorderLayer(map.getLayer(layerId), i + 1);
                        break;
                    }
                }
            }
            for (var i = 0; i < this.elements.length; i++) {
                map.reorderLayer(map.getLayer(this.elements[i].layerid), i + 1);
            }
            //childNode[4].parentNode.insertBefore(childNode[4], childNode[3]);
        },
        'SwapVisElements': function (layerId, order) {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].layerid === layerId) {
                    if (order == 1) {
                        if (i == (this.elements.length - 1)) return;
                        for (var j = i + 1; j < this.elements.length; j++) {
                            if (map.getLayer(this.elements[j].layerid).visible) {
                                this.elements[j].domNode.parentNode.insertBefore(this.elements[j].domNode, this.elements[i].domNode);
                                var b = this.elements[j];
                                for (var k = j; k > i; k--) this.elements[k] = this.elements[k - 1];
                                this.elements[i] = b;
                                break;
                            }
                        }
                        break;
                    } else {
                        if (i == 0) return;
                        for (var j = i - 1; j > 0; j--) {
                            if (map.getLayer(this.elements[j].layerid).visible) {
                                this.elements[i].domNode.parentNode.insertBefore(this.elements[i].domNode, this.elements[j].domNode);
                                var b = this.elements[i];
                                for (var k = i; k > j; k--) this.elements[k] = this.elements[k - 1];
                                this.elements[j] = b;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
            for (var i = 0; i < this.elements.length; i++) {
                map.reorderLayer(map.getLayer(this.elements[i].layerid), i + 1);
            }
            //childNode[4].parentNode.insertBefore(childNode[4], childNode[3]);
        },
        'SwapTopElements': function (layerId) {
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].layerid === layerId) {
                    if (order == 1) {
                        if (i == (this.elements.length - 1)) return;
                        this.elements[i + 1].domNode.parentNode.insertBefore(this.elements[i + 1].domNode, this.elements[i].domNode);
                        var b = this.elements[i];
                        this.elements[i] = this.elements[i + 1];
                        this.elements[i + 1] = b;
                        //map.reorderLayer(map.getLayer(this.elements[i].layerid), i + 1);
                        break;
                    } else {
                        if (i == 0) return;
                        this.elements[i].domNode.parentNode.insertBefore(this.elements[i].domNode, this.elements[i - 1].domNode);
                        var b = this.elements[i];
                        this.elements[i] = this.elements[i - 1];
                        this.elements[i - 1] = b;
                        //map.reorderLayer(map.getLayer(layerId), i + 1);
                        break;
                    }
                }
            }
            for (var i = 0; i < this.elements.length; i++) {
                map.reorderLayer(map.getLayer(this.elements[i].layerid), i + 1);
            }
            //childNode[4].parentNode.insertBefore(childNode[4], childNode[3]);
        },
        'refreshVisible': function () {
            for (var i = 0; i < this.elements.length; i++) {
                if (map.getLayer(this.elements[i].layerid).visible) {
                    this.elements[i].domNode.style.display = 'block';
                } else {
                    this.elements[i].domNode.style.display = 'none';
                }
            }
        },
        'reElement': function () {
            for (var i = 0; i < this.elements.length; i++) this.elements[i].reElement();
        },
    });
});