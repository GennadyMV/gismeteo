function initAddClasses() {
    var colorScale = { "jet": [{ "index": 0, "rgb": [0, 0, 131] }, { "index": 0.125, "rgb": [0, 60, 170] }, { "index": 0.375, "rgb": [5, 255, 255] }, { "index": 0.625, "rgb": [255, 255, 0] }, { "index": 0.875, "rgb": [250, 0, 0] }, { "index": 1, "rgb": [128, 0, 0] }], "hsv": [{ "index": 0, "rgb": [255, 0, 0] }, { "index": 0.169, "rgb": [253, 255, 2] }, { "index": 0.173, "rgb": [247, 255, 2] }, { "index": 0.337, "rgb": [0, 252, 4] }, { "index": 0.341, "rgb": [0, 252, 10] }, { "index": 0.506, "rgb": [1, 249, 255] }, { "index": 0.671, "rgb": [2, 0, 253] }, { "index": 0.675, "rgb": [8, 0, 253] }, { "index": 0.839, "rgb": [255, 0, 251] }, { "index": 0.843, "rgb": [255, 0, 245] }, { "index": 1, "rgb": [255, 0, 6] }], "hot": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.3, "rgb": [230, 0, 0] }, { "index": 0.6, "rgb": [255, 210, 0] }, { "index": 1, "rgb": [255, 255, 255] }], "cool": [{ "index": 0, "rgb": [0, 255, 255] }, { "index": 1, "rgb": [255, 0, 255] }], "spring": [{ "index": 0, "rgb": [255, 0, 255] }, { "index": 1, "rgb": [255, 255, 0] }], "summer": [{ "index": 0, "rgb": [0, 128, 102] }, { "index": 1, "rgb": [255, 255, 102] }], "autumn": [{ "index": 0, "rgb": [255, 0, 0] }, { "index": 1, "rgb": [255, 255, 0] }], "winter": [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 1, "rgb": [0, 255, 128] }], "bone": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.376, "rgb": [84, 84, 116] }, { "index": 0.753, "rgb": [169, 200, 200] }, { "index": 1, "rgb": [255, 255, 255] }], "copper": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.804, "rgb": [255, 160, 102] }, { "index": 1, "rgb": [255, 199, 127] }], "greys": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 1, "rgb": [255, 255, 255] }], "yignbu": [{ "index": 0, "rgb": [8, 29, 88] }, { "index": 0.125, "rgb": [37, 52, 148] }, { "index": 0.25, "rgb": [34, 94, 168] }, { "index": 0.375, "rgb": [29, 145, 192] }, { "index": 0.5, "rgb": [65, 182, 196] }, { "index": 0.625, "rgb": [127, 205, 187] }, { "index": 0.75, "rgb": [199, 233, 180] }, { "index": 0.875, "rgb": [237, 248, 217] }, { "index": 1, "rgb": [255, 255, 217] }], "greens": [{ "index": 0, "rgb": [0, 68, 27] }, { "index": 0.125, "rgb": [0, 109, 44] }, { "index": 0.25, "rgb": [35, 139, 69] }, { "index": 0.375, "rgb": [65, 171, 93] }, { "index": 0.5, "rgb": [116, 196, 118] }, { "index": 0.625, "rgb": [161, 217, 155] }, { "index": 0.75, "rgb": [199, 233, 192] }, { "index": 0.875, "rgb": [229, 245, 224] }, { "index": 1, "rgb": [247, 252, 245] }], "yiorrd": [{ "index": 0, "rgb": [128, 0, 38] }, { "index": 0.125, "rgb": [189, 0, 38] }, { "index": 0.25, "rgb": [227, 26, 28] }, { "index": 0.375, "rgb": [252, 78, 42] }, { "index": 0.5, "rgb": [253, 141, 60] }, { "index": 0.625, "rgb": [254, 178, 76] }, { "index": 0.75, "rgb": [254, 217, 118] }, { "index": 0.875, "rgb": [255, 237, 160] }, { "index": 1, "rgb": [255, 255, 204] }], "bluered": [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 1, "rgb": [255, 0, 0] }], "rdbu": [{ "index": 0, "rgb": [5, 10, 172] }, { "index": 0.35, "rgb": [106, 137, 247] }, { "index": 0.5, "rgb": [190, 190, 190] }, { "index": 0.6, "rgb": [220, 170, 132] }, { "index": 0.7, "rgb": [230, 145, 90] }, { "index": 1, "rgb": [178, 10, 28] }], "picnic": [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 0.1, "rgb": [51, 153, 255] }, { "index": 0.2, "rgb": [102, 204, 255] }, { "index": 0.3, "rgb": [153, 204, 255] }, { "index": 0.4, "rgb": [204, 204, 255] }, { "index": 0.5, "rgb": [255, 255, 255] }, { "index": 0.6, "rgb": [255, 204, 255] }, { "index": 0.7, "rgb": [255, 153, 255] }, { "index": 0.8, "rgb": [255, 102, 204] }, { "index": 0.9, "rgb": [255, 102, 102] }, { "index": 1, "rgb": [255, 0, 0] }], "rainbow": [{ "index": 0, "rgb": [150, 0, 90] }, { "index": 0.125, "rgb": [0, 0, 200] }, { "index": 0.25, "rgb": [0, 25, 255] }, { "index": 0.375, "rgb": [0, 152, 255] }, { "index": 0.5, "rgb": [44, 255, 150] }, { "index": 0.625, "rgb": [151, 255, 0] }, { "index": 0.75, "rgb": [255, 234, 0] }, { "index": 0.875, "rgb": [255, 111, 0] }, { "index": 1, "rgb": [255, 0, 0] }], "portland": [{ "index": 0, "rgb": [12, 51, 131] }, { "index": 0.25, "rgb": [10, 136, 186] }, { "index": 0.5, "rgb": [242, 211, 56] }, { "index": 0.75, "rgb": [242, 143, 56] }, { "index": 1, "rgb": [217, 30, 30] }], "blackbody": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.2, "rgb": [230, 0, 0] }, { "index": 0.4, "rgb": [230, 210, 0] }, { "index": 0.7, "rgb": [255, 255, 255] }, { "index": 1, "rgb": [160, 200, 255] }], "earth": [{ "index": 0, "rgb": [0, 0, 130] }, { "index": 0.1, "rgb": [0, 180, 180] }, { "index": 0.2, "rgb": [40, 210, 40] }, { "index": 0.4, "rgb": [230, 230, 50] }, { "index": 0.6, "rgb": [120, 70, 20] }, { "index": 1, "rgb": [255, 255, 255] }], "electric": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.15, "rgb": [30, 0, 100] }, { "index": 0.4, "rgb": [120, 0, 100] }, { "index": 0.6, "rgb": [160, 90, 0] }, { "index": 0.8, "rgb": [230, 200, 0] }, { "index": 1, "rgb": [255, 250, 220] }], "alpha": [{ "index": 0, "rgb": [255, 255, 255, 0] }, { "index": 0, "rgb": [255, 255, 255, 1] }] };
    function CreateColors(min, interval, cnt, name) {
        var retVal = [];
        var sval = min;
        var mars = colorScale[name];
        retVal.push([sval, mars[0].rgb[0], mars[0].rgb[1], mars[0].rgb[2]]);
        sval += interval;

        var step = 1 / (cnt - 1);
        for (var i = 1; i < cnt - 1; i++) {
            var is = step * i;
            for (var j = 0; j < mars.length - 1; j++) {
                if ((is > mars[j].index) && (is < mars[j + 1].index)) {
                    var sf = (step * i - mars[j].index) / (mars[j + 1].index - mars[j].index);
                    var nr = parseInt(sf * (mars[j + 1].rgb[0] - mars[j].rgb[0]) + mars[j].rgb[0]);
                    var ng = parseInt(sf * (mars[j + 1].rgb[1] - mars[j].rgb[1]) + mars[j].rgb[1]);
                    var nb = parseInt(sf * (mars[j + 1].rgb[2] - mars[j].rgb[2]) + mars[j].rgb[2]);
                    retVal.push([sval, nr, ng, nb]);
                    sval += interval;
                    break;
                }
            }
        }
        retVal.push([sval, mars[mars.length - 1].rgb[0], mars[mars.length - 1].rgb[1], mars[mars.length - 1].rgb[2]]);
        return retVal;
    }
    // Layers
    dojo.declare("dcrscplaneta.WMSLayer", esri.layers.DynamicMapServiceLayer,
    {
        Time: "",
        Layer: "dvrcpod:clouds",
        constructor: function (oArg) {
            this.Time = "2010-01-01T00:00:00.000Z/2010-01-01T00:00:00.001Z";
            this.initialExtent = this.fullExtent = new esri.geometry.Extent({ "xmin": -16476154.32, "ymin": 2504688.54, "xmax": -6457400.14, "ymax": 7514065.62, "spatialReference": { "wkid": 3857 } });//102100 } });
            this.spatialReference = new esri.SpatialReference({ wkid: 3857 });//102100 });
            this.Layer = oArg.layer;
            this.After180 = oArg.after180;
            this.url = oArg.url;
            this.id = oArg.id;
            this.visible = oArg.visible;

            this.loaded = true;
            this.onLoad(this);
        },
        setTime: function (sTime) {
            this.Time = sTime;
        },
        getImageUrl: function (extent, width, height, callback) {

            var meters360 = 40075016.6855784861531768177614;
          //  var meters180 = 20037508.3427892430765884088807;

            var diff = extent.xmax - extent.xmin;
            var nxmax = extent.xmax % meters360;
            var nxmin = nxmax - diff;

            
            if (nxmin >= 0)
            {
                if (this.After180) {
                    nxmax = nxmax - meters360;
                    nxmin = nxmin - meters360;
                }
            }
            else {
                if (!this.After180) {
                    nxmin = meters360 + nxmin;
                    nxmax = meters360 + nxmax;
                }
            }

            var params = {
                service: "WMS",
                version: "1.1.1",
                request: "GetMap",
                layers: this.Layer,
                time: this.Time,
                styles: "",
                transparent: true,
                bbox: nxmin + "," + extent.ymin + "," + nxmax + "," + extent.ymax,
                width: width,
                height: height,
                srs: "EPSG:" + extent.spatialReference.wkid,
                format: "image/png",
                TILED: true
            };

            var tar = this.url + "?" + dojo.objectToQuery(params);
            callback(this.url + "?" + dojo.objectToQuery(params));
        }
    });

    dojo.declare("dcrscplaneta.clsChangeItemDMSL", esri.layers.ArcGISDynamicMapServiceLayer, {
        mLevel: "",
        cLevel: 3,
        setLevel: function (sLevel) {
            this.mLevel = sLevel;
            var sdef = [];
            for (var i = 0; i < this.cLevel; i++) {
                sdef.push("level = " + sLevel);
            }
            this.setLayerDefinitions(sdef);
        },
        setDate: function (sDate) {
            var sdef = [];
            for (var i = 0; i < this.cLevel; i++) {
                sdef.push("level = " + this.mLevel + " and (" + sDate + ")");
            }
            this.setLayerDefinitions(sdef);
        },
        resDate: function () {
            var sdef = [];
            for (var i = 0; i < this.cLevel; i++) {
                sdef.push("level = " + this.mLevel);
            }
            this.setLayerDefinitions(sdef);
        },
        setLine: function (color, width) {
            var sls = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, color, width);
            var layerDrawingOptions = []
            for (var i = 0; i < this.cLevel; i++) {
                var layerDrawingOption = new esri.layers.LayerDrawingOptions();
                layerDrawingOption.renderer = new esri.renderer.SimpleRenderer(sls);
                layerDrawingOptions.push(layerDrawingOption);
            }
            this.setLayerDrawingOptions(layerDrawingOptions);
        },

    });

    dojo.declare("dcrscplaneta.clsChangeItemDMSLField", esri.layers.ArcGISImageServiceLayer, {
        minVal: 0.0, maxVal: 100.0,
        mLevel: "",
        setLevel: function (sLevel) {
            this.mLevel = sLevel;
            if (this.id.indexOf("_HGT_") > -1) this.setHGT(sLevel);
            if (this.id.indexOf("_TMP_") > -1) this.setTMP(sLevel);
            if (this.id.indexOf("_RH_") > -1) this.setRH(sLevel);
            if (this.id.indexOf("_PRMSL_") > -1) this.setPRMSL(sLevel);
            //reorder mosaicRule
            var mosaicRule = new esri.layers.MosaicRule();
            mosaicRule.method = "esriMosaicAttribute";
            mosaicRule.sortField = "Level";
            mosaicRule.sortValue = sLevel;
            mosaicRule.ascending = true;
            mosaicRule.operation = "MT_First";
            this.setMosaicRule(mosaicRule);
            this.setRenderRule();
        },
        setHGT: function (sLevel) {
            switch (sLevel) {
                case "50":
                    this.minVal = 1980.0;
                    this.maxVal = 2080.0;
                    break;
                case "100":
                    this.minVal = 1535.0;
                    this.maxVal = 1675.0;
                    break;
                case "150":
                    this.minVal = 1275.0;
                    this.maxVal = 1435.0;
                    break;
                case "200":
                    this.minVal = 1095.0;
                    this.maxVal = 1255.0;
                    break;
                case "250":
                    this.minVal = 945.0;
                    this.maxVal = 1100.0;
                    break;
                case "300":
                    this.minVal = 840.0;
                    this.maxVal = 980.0;
                    break;
                case "400":
                    this.minVal = 650.0;
                    this.maxVal = 770.0;
                    break;
                case "500":
                    this.minVal = 500.0;
                    this.maxVal = 600.0;
                    break;
                case "700":
                    this.minVal = 260.0;
                    this.maxVal = 320.0;
                    break;
                case "850":
                    this.minVal = 105.0;
                    this.maxVal = 165.0;
                    break;
                case "925":
                    this.minVal = 40.0;
                    this.maxVal = 80.0;
                    break;
                case "1000":
                    this.minVal = -12.0;
                    this.maxVal = 28.0;
                    break;
                default:
                    break;
            }
        },
        setRH: function (sLevel) {
            this.minVal = 0.0;
            this.maxVal = 100.0;
        },
        setPRMSL: function (sLevel) {
            this.minVal = 980.0;
            this.maxVal = 1100.0;
        },
        setTMP: function (sLevel) {
            switch (sLevel) {
                case "2":
                    this.minVal = -30;
                    this.maxVal = 30.0;
                    break;
                case "50":
                    this.minVal = -90;
                    this.maxVal = -40;
                    break;
                case "100":
                    this.minVal = -90;
                    this.maxVal = -40;
                    break;
                case "150":
                    this.minVal = -75;
                    this.maxVal = -40;
                    break;
                case "200":
                    this.minVal = -70;
                    this.maxVal = -40;
                    break;
                case "250":
                    this.minVal = -65;
                    this.maxVal = -35;
                    break;
                case "300":
                    this.minVal = -60;
                    this.maxVal = -25;
                    break;
                case "400":
                    this.minVal = -55;
                    this.maxVal = -15;
                    break;
                case "500":
                    this.minVal = -50;
                    this.maxVal = 0;
                    break;
                case "700":
                    this.minVal = -35;
                    this.maxVal = 15;
                    break;
                case "850":
                    this.minVal = -30;
                    this.maxVal = 30;
                    break;
                case "925":
                    this.minVal = -30;
                    this.maxVal = 30.0;
                    break;
                case "1000":
                    this.minVal = -30.0;
                    this.maxVal = 30.0;
                    break;
                default:
                    break;
            }
        },
        setRenderRule: function () {
            var rasterFunction = new esri.layers.RasterFunction(
            {
                "functionName": "Colormap",
                "functionArguments": {
                    "Colormap": CreateColors(0, 1, 255, "jet"),
                    "Raster": new esri.layers.RasterFunction({
                        "functionName": "Stretch",
                        "functionArguments": {
                            "StretchType": 5,
                            "Min": 0,
                            "Max": 255,
                            "UseGamma": false,
                            "Statistics": [[this.minVal, this.maxVal, 0, 0]],
                            "Raster": "$$"
                        },
                        "outputPixelType": "U8"
                    }),
                },
                "variableName": "Raster"
            });
            this.setInterpolation(esri.layers.ImageServiceParameters.INTERPOLATION_CUBICCONVOLUTION);
            this.setRenderingRule(rasterFunction);
        }
    });

    dojo.declare('dcrscplaneta.LineEditor', [dijit._Widget, dijit._Templated], {
        templateString: '<div class="lineEditior">' + 
                            'Ширина:' +
                            '<span class="arrdown" data-dojo-attach-event="onclick:_ondwnWidth" ></span>' +
                            '<input style="width:10px;" type="text" value="1" data-dojo-attach-point="line_width">' +
                            '<span class="arrup" data-dojo-attach-event="onclick:_onupWidth" ></span>' +
                            'Цвет:' +
                            '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0,   0,   0);" value="" data-dojo-attach-point="sel_color" data-dojo-attach-event="onclick:_showPallete"/>' +
                            '<span class="btn-ok" data-dojo-attach-event="onclick:_Ok"></span>' + 
                            '<span class="close" style="position:absolute; top:2px; right:2px;" data-dojo-attach-event="onclick:_Hide" ></span>' +
                            '<div class="cPicker" data-dojo-attach-point="color_palete">' + 
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0,   0,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb( 79,   0,  95);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb( 68,   0, 204);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0,  38, 255);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0, 161, 255);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0, 255, 225);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0, 255, 106);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb( 21, 255,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(140, 255,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(255, 242,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(255, 119,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(255,   0,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(255, 255, 255);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                            '</div>' +
                        '</div>',            
        bwidth: 1,
        open: false,
        sendOk: undefined,
        '_ondwnWidth': function () { this.line_width.value = --this.bwidth; },
        '_onupWidth': function () { this.line_width.value = ++this.bwidth; },
        '_showPallete': function () { if (this.color_palete.style.display == 'none') this.color_palete.style.display = 'block'; else this.color_palete.style.display = 'none'; },
        '_selColor': function (index) {
            this.sel_color.style.backgroundColor = index.currentTarget.style.backgroundColor;
            this.color_palete.style.display = 'none';
        },
        '_Hide': function () {
            open = !open;
            if (open) this.domNode.style.display = "block"; else this.domNode.style.display = "none";
        },
        '_Ok': function () {
            if (this.sendOk) this.sendOk(this.sel_color.style.backgroundColor, this.bwidth);
            this._Hide();
        }
    });
    dojo.declare('dcrscplaneta.LineEditor', [dijit._Widget, dijit._Templated], {
        templateString: '<div class="lineEditior">' +
                            'Ширина:' +
                            '<span class="arrdown" data-dojo-attach-event="onclick:_ondwnWidth" ></span>' +
                            '<input style="width:10px;" type="text" value="1" data-dojo-attach-point="line_width">' +
                            '<span class="arrup" data-dojo-attach-event="onclick:_onupWidth" ></span>' +
                            'Цвет:' +
                            '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0,   0,   0);" value="" data-dojo-attach-point="sel_color" data-dojo-attach-event="onclick:_showPallete"/>' +
                            '<span class="btn-ok" data-dojo-attach-event="onclick:_Ok"></span>' +
                            '<span class="close" style="position:absolute; top:2px; right:2px;" data-dojo-attach-event="onclick:_Hide" ></span>' +
                            '<div class="cPicker" data-dojo-attach-point="color_palete">' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0,   0,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb( 79,   0,  95);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb( 68,   0, 204);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0,  38, 255);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0, 161, 255);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0, 255, 225);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0, 255, 106);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb( 21, 255,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(140, 255,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(255, 242,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(255, 119,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(255,   0,   0);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                                '<input type="submit" class="cPickerBlock" style="background-color:rgb(255, 255, 255);" value="" data-dojo-attach-event="onclick:_selColor"/>' +
                            '</div>' +
                        '</div>',
        bwidth: 1,
        open: false,
        sendOk: undefined,
        '_ondwnWidth': function () { this.line_width.value = --this.bwidth; },
        '_onupWidth': function () { this.line_width.value = ++this.bwidth; },
        '_showPallete': function () { if (this.color_palete.style.display == 'none') this.color_palete.style.display = 'block'; else this.color_palete.style.display = 'none'; },
        '_selColor': function (index) {
            this.sel_color.style.backgroundColor = index.currentTarget.style.backgroundColor;
            this.color_palete.style.display = 'none';
        },
        '_Hide': function () {
            open = !open;
            if (open) this.domNode.style.display = "block"; else this.domNode.style.display = "none";
        },
        '_Ok': function () {
            if (this.sendOk) this.sendOk(this.sel_color.style.backgroundColor, this.bwidth);
            this._Hide();
        }
    });
};