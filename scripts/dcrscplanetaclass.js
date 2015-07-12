dojo.require("esri.geometry.ScreenPoint");
dojo.require("esri.layers.graphics");
dojo.require("esri.symbols.PictureMarkerSymbol");
dojo.require("esri.graphic");

function initAddClasses() {
    var colorScale = {
        'jet': [{ "index": 0, "rgb": [0, 0, 131] }, { "index": 0.125, "rgb": [0, 60, 170] }, { "index": 0.375, "rgb": [5, 255, 255] }, { "index": 0.625, "rgb": [255, 255, 0] }, { "index": 0.875, "rgb": [250, 0, 0] }, { "index": 1, "rgb": [128, 0, 0] }],
        'hsv': [{ "index": 0, "rgb": [255, 0, 0] }, { "index": 0.169, "rgb": [253, 255, 2] }, { "index": 0.173, "rgb": [247, 255, 2] }, { "index": 0.337, "rgb": [0, 252, 4] }, { "index": 0.341, "rgb": [0, 252, 10] }, { "index": 0.506, "rgb": [1, 249, 255] }, { "index": 0.671, "rgb": [2, 0, 253] }, { "index": 0.675, "rgb": [8, 0, 253] }, { "index": 0.839, "rgb": [255, 0, 251] }, { "index": 0.843, "rgb": [255, 0, 245] }, { "index": 1, "rgb": [255, 0, 6] }],
        'hot': [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.3, "rgb": [230, 0, 0] }, { "index": 0.6, "rgb": [255, 210, 0] }, { "index": 1, "rgb": [255, 255, 255] }],
        'cool': [{ "index": 0, "rgb": [0, 255, 255] }, { "index": 1, "rgb": [255, 0, 255] }],
        'spring': [{ "index": 0, "rgb": [255, 0, 255] }, { "index": 1, "rgb": [255, 255, 0] }],
        'summer': [{ "index": 0, "rgb": [0, 128, 102] }, { "index": 1, "rgb": [255, 255, 102] }],
        'autumn': [{ "index": 0, "rgb": [255, 0, 0] }, { "index": 1, "rgb": [255, 255, 0] }],
        'winter': [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 1, "rgb": [0, 255, 128] }],
        'bone': [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.376, "rgb": [84, 84, 116] }, { "index": 0.753, "rgb": [169, 200, 200] }, { "index": 1, "rgb": [255, 255, 255] }],
        'copper': [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.804, "rgb": [255, 160, 102] }, { "index": 1, "rgb": [255, 199, 127] }],
        'greys': [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 1, "rgb": [255, 255, 255] }],
        'yignbu': [{ "index": 0, "rgb": [8, 29, 88] }, { "index": 0.125, "rgb": [37, 52, 148] }, { "index": 0.25, "rgb": [34, 94, 168] }, { "index": 0.375, "rgb": [29, 145, 192] }, { "index": 0.5, "rgb": [65, 182, 196] }, { "index": 0.625, "rgb": [127, 205, 187] }, { "index": 0.75, "rgb": [199, 233, 180] }, { "index": 0.875, "rgb": [237, 248, 217] }, { "index": 1, "rgb": [255, 255, 217] }],
        'greens': [{ "index": 0, "rgb": [0, 68, 27] }, { "index": 0.125, "rgb": [0, 109, 44] }, { "index": 0.25, "rgb": [35, 139, 69] }, { "index": 0.375, "rgb": [65, 171, 93] }, { "index": 0.5, "rgb": [116, 196, 118] }, { "index": 0.625, "rgb": [161, 217, 155] }, { "index": 0.75, "rgb": [199, 233, 192] }, { "index": 0.875, "rgb": [229, 245, 224] }, { "index": 1, "rgb": [247, 252, 245] }],
        'yiorrd': [{ "index": 0, "rgb": [128, 0, 38] }, { "index": 0.125, "rgb": [189, 0, 38] }, { "index": 0.25, "rgb": [227, 26, 28] }, { "index": 0.375, "rgb": [252, 78, 42] }, { "index": 0.5, "rgb": [253, 141, 60] }, { "index": 0.625, "rgb": [254, 178, 76] }, { "index": 0.75, "rgb": [254, 217, 118] }, { "index": 0.875, "rgb": [255, 237, 160] }, { "index": 1, "rgb": [255, 255, 204] }],
        'bluered': [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 1, "rgb": [255, 0, 0] }],        
        //'rdbu': [{ "index": 0, "rgb": [5, 10, 172] }, { "index": 0.35, "rgb": [106, 137, 247] }, { "index": 0.5, "rgb": [190, 190, 190] }, { "index": 0.6, "rgb": [220, 170, 132] }, { "index": 0.7, "rgb": [230, 145, 90] }, { "index": 1, "rgb": [178, 10, 28] }],
        'rdbu': [{ "index": 0, "rgb": [69, 117, 181] }, { "index": 0.35, "rgb": [198, 209, 190] }, { "index": 0.5, "rgb": [255, 255, 191] }, { "index": 0.6, "rgb": [252, 211, 154] }, { "index": 0.7, "rgb": [247, 172, 121] }, { "index": 1, "rgb": [214, 47, 39] }],
        'picnic': [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 0.1, "rgb": [51, 153, 255] }, { "index": 0.2, "rgb": [102, 204, 255] }, { "index": 0.3, "rgb": [153, 204, 255] }, { "index": 0.4, "rgb": [204, 204, 255] }, { "index": 0.5, "rgb": [255, 255, 255] }, { "index": 0.6, "rgb": [255, 204, 255] }, { "index": 0.7, "rgb": [255, 153, 255] }, { "index": 0.8, "rgb": [255, 102, 204] }, { "index": 0.9, "rgb": [255, 102, 102] }, { "index": 1, "rgb": [255, 0, 0] }],
        'rainbow': [{ "index": 0, "rgb": [150, 0, 90] }, { "index": 0.125, "rgb": [0, 0, 200] }, { "index": 0.25, "rgb": [0, 25, 255] }, { "index": 0.375, "rgb": [0, 152, 255] }, { "index": 0.5, "rgb": [44, 255, 150] }, { "index": 0.625, "rgb": [151, 255, 0] }, { "index": 0.75, "rgb": [255, 234, 0] }, { "index": 0.875, "rgb": [255, 111, 0] }, { "index": 1, "rgb": [255, 0, 0] }],
        'portland': [{ "index": 0, "rgb": [12, 51, 131] }, { "index": 0.25, "rgb": [10, 136, 186] }, { "index": 0.5, "rgb": [242, 211, 56] }, { "index": 0.75, "rgb": [242, 143, 56] }, { "index": 1, "rgb": [217, 30, 30] }],
        'blackbody': [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.2, "rgb": [230, 0, 0] }, { "index": 0.4, "rgb": [230, 210, 0] }, { "index": 0.7, "rgb": [255, 255, 255] }, { "index": 1, "rgb": [160, 200, 255] }],
        'earth': [{ "index": 0, "rgb": [0, 0, 130] }, { "index": 0.1, "rgb": [0, 180, 180] }, { "index": 0.2, "rgb": [40, 210, 40] }, { "index": 0.4, "rgb": [230, 230, 50] }, { "index": 0.6, "rgb": [120, 70, 20] }, { "index": 1, "rgb": [255, 255, 255] }],
        'electric': [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.15, "rgb": [30, 0, 100] }, { "index": 0.4, "rgb": [120, 0, 100] }, { "index": 0.6, "rgb": [160, 90, 0] }, { "index": 0.8, "rgb": [230, 200, 0] }, { "index": 1, "rgb": [255, 250, 220] }]        
    };
    function CreateColors(min, interval, cnt, name, inv) {
        var retVal = [];
        var sval = min;
        var mars = colorScale[name];

        if (inv) {
            retVal.push([sval, mars[mars.length - 1].rgb[0], mars[mars.length - 1].rgb[1], mars[mars.length - 1].rgb[2]]);
            sval += interval;
            var step = 1 / (cnt - 1);
            for (var i = 1; i < cnt - 1; i++) {
                var is = step * i;
                for (var j = mars.length-1; j > 0; j--) {
                    if ((is > (1 - mars[j].index)) && (is < (1 - mars[j - 1].index))) {
                        var sf = (step * i -(1 - mars[j].index)) / ((1- mars[j - 1].index) - (1 - mars[j].index));
                        var nr = parseInt(sf * (mars[j - 1].rgb[0] - mars[j].rgb[0]) + mars[j].rgb[0]);
                        var ng = parseInt(sf * (mars[j - 1].rgb[1] - mars[j].rgb[1]) + mars[j].rgb[1]);
                        var nb = parseInt(sf * (mars[j - 1].rgb[2] - mars[j].rgb[2]) + mars[j].rgb[2]);
                        retVal.push([sval, nr, ng, nb]);
                        sval += interval;
                        break;
                    }
                }
            }
            retVal.push([sval, mars[0].rgb[0], mars[0].rgb[1], mars[0].rgb[2]]);
        } else {
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
        }
        return retVal;
    }
    function CreateColorsWA(min, interval, cnt, name) {
        var retVal = [];
        var sval = min;
        var mars = colorScale[name];
        retVal.push([sval, mars[0].rgb[0], mars[0].rgb[1], mars[0].rgb[2], 0]);
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
                    retVal.push([sval, nr, ng, nb, i]);
                    sval += interval;
                    break;
                }
            }
        }
        retVal.push([sval, mars[mars.length - 1].rgb[0], mars[mars.length - 1].rgb[1], mars[mars.length - 1].rgb[2], 255]);
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

    // Layers
    dojo.declare("dcrscplaneta.MapJob", esri.layers.DynamicMapServiceLayer,
    {
        JobID: "",
        token: "",
        constructor: function (oArg) {
            this.initialExtent = this.fullExtent = new esri.geometry.Extent({ "xmin": -16476154.32, "ymin": 2504688.54, "xmax": -6457400.14, "ymax": 7514065.62, "spatialReference": { "wkid": 3857 } });//102100 } });
            this.spatialReference = new esri.SpatialReference({ wkid: 3857 });//102100 });
            this.url = oArg.url;
            this.id = oArg.id;
            this.visible = oArg.visible;
            
            this.loaded = true;
            this.onLoad(this);
        },
        getImageUrl: function (extent, width, height, callback) {
                      
            var params = {
                bbox: extent.xmin + "," + extent.ymin + "," + extent.xmax + "," + extent.ymax,
                size: width + "," + height,                
                format: "png",
                f: "image",
                token:token,
                transparent:true
            };

            var tar = this.url + "/jobs/" + this.JobID + "/export?" + dojo.objectToQuery(params);
            if (this.JobID == "") {
                tar = this.url + "/export?" + dojo.objectToQuery(params);

            }
            callback(tar);
        }
    });

    dojo.declare("dcrscplaneta.WSDGLayer", esri.layers.GraphicsLayer,
    {
        constructor: function (options) {
            this.nUrl = "";
            this.nTime = "";
            this.nUrl = "";
            this.nLevel = "500";
            this.nMap = null;
            this.reISB = { '50': [0,1], '100': [2,3], '150': [4,5], '200': [6,7], '250': [8,9], '300': [10,11], '400': [12,13], '500': [14,15], '700': [16,17], '850': [18,19], '925': [20,21], '1000': [22,23], '2': [24,25] };
        },
        _setMap: function (map, surface) {
            this.mMap = map;
            // calculate and set the initial resolution            
            this._updateGraphs();

            this._refresh = this._updateGraphs;

            // GraphicsLayer will add its own listener here
            var div = this.inherited(arguments);
            return div;
        },
        setLevel: function (level) {
            if (this.reISB.hasOwnProperty(level)) this.nLevel = level;
            this._updateGraphs();
        },
        setTime: function (time) {
            this.nTime = time;
            this._updateGraphs();
        },
        _updateGraphs: function () {
            if (this.visible) {
                this.clear();
                var papa = { value: this, width: parseInt(this.mMap.width / 40), bwidth: this.mMap.width, height: parseInt(this.mMap.height / 40), bheight: this.mMap.height, speed1: undefined, dir1: undefined, speed2: undefined, dir2: undefined }
                //Calc Extent
                var meters360 = 40075016.6855784861531768177614;
                //  var meters180 = 20037508.3427892430765884088807;
                var diff = this.mMap.extent.xmax - this.mMap.extent.xmin;
                var nxmax = this.mMap.extent.xmax % meters360;
                var nxmin = nxmax - diff;
                var nxmax180 = 0;
                var nxmin180 = 0;

                if (nxmin >= 0) {
                    nxmax180 = nxmax - meters360;
                    nxmin180 = nxmin - meters360;
                }
                else {
                    nxmax180 = nxmax;
                    nxmin180 = nxmin;
                    nxmin = meters360 + nxmin;
                    nxmax = meters360 + nxmax;
                }
                //Extract speed
                var params = {
                    bbox: nxmin + "," + this.mMap.extent.ymin + "," + nxmax + "," + this.mMap.extent.ymax,
                    bboxSR: this.mMap.extent.spatialReference.wkid,
                    size: papa.width + "," + papa.height,
                    imageSR: this.mMap.extent.spatialReference.wkid,
                    mosaicRule: (this.nTime === "") ? "" : '{"where":"' + this.nTime + '"}',
                    renderingRule: '{ "rasterFunction" : "ExtractBand", "rasterFunctionArguments" : { "BandIDs" : [' + this.reISB[this.nLevel][0] + '], "Raster" : "$$" }  }',
                    interpolation: "RSP_NearestNeighbor",
                    format: "bip",
                    pixelType: "F32",
                    f: "image"
                };
                var xhr = new XMLHttpRequest();

                xhr.open('GET', this.nUrl + dojo.objectToQuery(params));
                xhr.responseType = "arraybuffer";
                xhr.onload = function (e) { papa.speed1 = new DataView(xhr.response); combiner(); };
                xhr.send();
                //Extract dir
                params.bbox = nxmin + "," + this.mMap.extent.ymin + "," + nxmax + "," + this.mMap.extent.ymax;
                params.renderingRule = '{ "rasterFunction" : "ExtractBand", "rasterFunctionArguments" : { "BandIDs" : [' + this.reISB[this.nLevel][1] + '], "Raster" : "$$" }  }';
                var xhr2 = new XMLHttpRequest();
                xhr2.open('GET', this.nUrl + dojo.objectToQuery(params));
                xhr2.responseType = "arraybuffer";
                xhr2.onload = function (e) { papa.dir1 = new DataView(xhr2.response); combiner(); };
                xhr2.send();
                //Extract speed180
                params.bbox = nxmin180 + "," + this.mMap.extent.ymin + "," + nxmax180 + "," + this.mMap.extent.ymax;
                params.renderingRule = '{ "rasterFunction" : "ExtractBand", "rasterFunctionArguments" : { "BandIDs" : [' + this.reISB[this.nLevel][0] + '], "Raster" : "$$" }  }';
                var xhr3 = new XMLHttpRequest();
                xhr3.open('GET', this.nUrl + dojo.objectToQuery(params));
                xhr3.responseType = "arraybuffer";
                xhr3.onload = function (e) { papa.speed2 = new DataView(xhr3.response); combiner(); };
                xhr3.send();
                //Extract dir180
                params.bbox = nxmin180 + "," + this.mMap.extent.ymin + "," + nxmax180 + "," + this.mMap.extent.ymax;
                params.renderingRule = '{ "rasterFunction" : "ExtractBand", "rasterFunctionArguments" : { "BandIDs" : [' + this.reISB[this.nLevel][1] + '], "Raster" : "$$" }  }';
                var xhr4 = new XMLHttpRequest();
                xhr4.open('GET', this.nUrl + dojo.objectToQuery(params));
                xhr4.responseType = "arraybuffer";
                xhr4.onload = function (e) { papa.dir2 = new DataView(xhr4.response); combiner(); };
                xhr4.send();

                function combiner() {
                    if ((papa.speed1 != undefined) && (papa.dir1 != undefined) && (papa.speed2 != undefined) && (papa.dir2 != undefined)) {
                        var hrindex = ["0", "13", "46", "78", "911", "1213", "1416", "1718", "1921", "2223", "2426", "2728", "2931", "3233", "3436", "3738", "3941", "4243", "4446", "4748", "4951", "5253", "5456", "5758", "5961", "6263", "6466", "6768", "6971"];
                        var mask_offset = papa.height * papa.width * 4;
                        for (var j = 0; j < papa.height ; j += 2) {
                            for (var i = 0; i < papa.width ; i += 2) {
                                var krex = (j * papa.width + i);
                                var koko = papa.speed1.getInt8(mask_offset + parseInt(krex / 8), true);
                                if (((koko >>> (7 - krex % 8)) & 1) == 1) {
                                    var led = (j * papa.width + i) * 4;
                                    //var point = new esri.geometry.ScreenPoint(20 + i * 40, 20 + j * 40);
                                    var point = new esri.geometry.ScreenPoint((i * papa.bwidth) / (papa.width - 1), 20 + j * (papa.bheight - 40) / (papa.height - 1));
                                    var geomPoint = esri.geometry.toMapGeometry(papa.value.mMap.extent, papa.value.mMap.width, papa.value.mMap.height, point);
                                    var speed = papa.speed1.getFloat32(led, true);
                                    var dir = papa.dir1.getFloat32(led, true);
                                    var indrex = parseInt(speed / 2.5);
                                    var symbol = new esri.symbols.PictureMarkerSymbol("images/wind/" + hrindex[indrex] + ".png", 40, 40);
                                    symbol.setAngle(dir + 90);
                                    var graphic = new esri.graphic(geomPoint, symbol);
                                    papa.value.add(graphic);
                                }
                            }
                        }
                        for (var j = 0; j < papa.height ; j += 2) {
                            for (var i = 0; i < papa.width ; i += 2) {
                                var krex = (j * papa.width + i);
                                var koko = papa.speed2.getInt8(mask_offset + parseInt(krex / 8), true);
                                if (((koko >>> (7 - krex % 8)) & 1) == 1) {
                                    var led = (j * papa.width + i) * 4;
                                    //var point = new esri.geometry.ScreenPoint(20 + i * 40, 20 + j * 40);
                                    var point = new esri.geometry.ScreenPoint((i * papa.bwidth) / (papa.width - 1), 20 + j * (papa.bheight - 40) / (papa.height - 1));
                                    var geomPoint = esri.geometry.toMapGeometry(papa.value.mMap.extent, papa.value.mMap.width, papa.value.mMap.height, point);
                                    var speed = papa.speed2.getFloat32(led, true);
                                    var dir = papa.dir2.getFloat32(led, true);
                                    var indrex = parseInt(speed / 2.5);
                                    var symbol = new esri.symbols.PictureMarkerSymbol("images/wind/" + hrindex[indrex] + ".png", 40, 40);
                                    symbol.setAngle(dir + 90);
                                    var graphic = new esri.graphic(geomPoint, symbol);
                                    papa.value.add(graphic);
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    dojo.declare("dcrscplaneta.clsChangeItemDMSL", esri.layers.ArcGISDynamicMapServiceLayer, {
        mLevel: "",
        cLevel: 3,
        color: "rgb(0,0,0)",
        width: 1,
        leg_name: undefined,
        setLevel: function (sLevel) {
            this.mLevel = sLevel;
            if (this.mLevel != "") {
                var sdef = [];
                for (var i = 0; i < this.cLevel; i++) {
                    sdef.push("level = " + sLevel);
                }
                this.setLayerDefinitions(sdef);
            }
        },
        setDate: function (sDate) {
            if (this.mLevel != "") {
                var sdef = [];
                for (var i = 0; i < this.cLevel; i++) {
                    sdef.push("level = " + this.mLevel + " and (" + sDate + ")");
                }
                this.setLayerDefinitions(sdef);
            }
        },
        resDate: function () {
            if (this.mLevel != "") {
                var sdef = [];
                for (var i = 0; i < this.cLevel; i++) {
                    sdef.push("level = " + this.mLevel);
                }
                this.setLayerDefinitions(sdef);
            }
        },
        setLine: function (color, width) {
            this.color = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
            this.width = width;
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
        minVal: 0.0, maxVal: 100.0, colorRamp: "jet",
        colorGrad: "",
        leg_name: undefined,
        inv: false,
        mLevel: "",
        setLevel: function (sLevel) {
            this.mLevel = sLevel;
            if (this.id.indexOf("_HGT_") > -1)  this.setHGT(sLevel);
            if (this.id.indexOf("_TMP_") > -1)  this.setTMP(sLevel);
            if (this.id.indexOf("_RH_") > -1)  this.setRH(sLevel);
            if (this.id.indexOf("_PRMSL_") > -1)  this.setPRMSL("");
            if (this.id.indexOf("_APCP_") > -1) this.setAPCP(sLevel);
            if (this.id.indexOf("Ascat") > -1) this.setRH();
            if (this.id.indexOf("_TCDC_") > -1) this.setRH();
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
        setAPCP: function (sLevel) {
            this.minVal = 0.01;
            this.maxVal = 20.0;
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
            var mars = colorScale[this.colorRamp];
            var grad = "linear-gradient(to right,";
            if (this.inv) {
                for (var i = mars.length-1; i >= 0; i--) grad += " rgb(" + mars[i].rgb[0] + "," + mars[i].rgb[1] + "," + mars[i].rgb[2] + ") " + ((1 - mars[i].index) * 100).toFixed(1).toString() + "%" + ","
            } else {
                for (var i = 0; i < mars.length; i++) grad += " rgb(" + mars[i].rgb[0] + "," + mars[i].rgb[1] + "," + mars[i].rgb[2] + ") " + (mars[i].index * 100).toFixed(1).toString() + "%" + ","
            }
            grad = grad.substr(0, grad.length - 1) + ")";
            this.colorGrad = grad;

            if (this.id.indexOf("_APCP_") > -1) {
                var rasterFunction = new esri.layers.RasterFunction(
                {
                    "functionName": "Colormap",
                    "functionArguments": {
                        "Colormap": [[1,153, 255, 153], [2, 51, 204, 102], [3, 51, 153, 102], [4, 204, 51, 0]], // CreateColorsWA(0, 1, 255, this.colorRamp),
                        "Raster": new esri.layers.RasterFunction({                            
                            "functionName" : "Remap",
                            "functionArguments" : {
                                "InputRanges" : [0.2,1, 1,10, 10,50, 50,1000],
                                "OutputValues": [1, 2, 3, 4],
                                "Raster": {
                                    "functionName": "Mask",
                                    "functionArguments": {
                                        "IncludedRanges": [0.2, 1000],//array of double
                                        "NoDataInterpretation": 0,//int 0=esriNoDataMatchAny, 1=esriNoDataMatchAll
                                        "Raster": "$$"
                                    },
                                }
                            },
                            "outputPixelType": "U8"
                        }),
                    },
                    "variableName": "Raster"
                });
                this.setRenderingRule(rasterFunction);
                return;
            }
            if (this.id.indexOf("_TCDC_") > -1) {
                var rasterFunction = new esri.layers.RasterFunction(
                {
                    "functionName": "Colormap",
                    "functionArguments": {
                        "Colormap": [[3, 50, 50, 50], [4, 65, 65, 65], [5, 80, 80, 80], [6, 100, 100, 100], [7, 120, 120, 120], [8, 170, 170, 170], [9, 230, 230, 230]], // CreateColorsWA(0, 1, 255, this.colorRamp),
                        "Raster": new esri.layers.RasterFunction({
                            "functionName": "Remap",
                            "functionArguments": {//3     4       5       6       7       8       9       9 
                                "InputRanges": [30, 40, 40, 50, 50, 60, 60, 70, 70, 80, 80, 90, 90, 110],
                                "OutputValues": [ 3, 4, 5, 6, 7, 8, 9],
                                "Raster": {
                                    "functionName": "Mask",
                                    "functionArguments": {
                                        "IncludedRanges": [30, 110],//array of double
                                        "NoDataInterpretation": 0,//int 0=esriNoDataMatchAny, 1=esriNoDataMatchAll
                                        "Raster": "$$"
                                    },
                                }
                            },
                            "outputPixelType": "U8"
                        }),
                    },
                    "variableName": "Raster"
                });
                this.setRenderingRule(rasterFunction);
                return;
            }
            var reISBW = { '50': 0, '100': 2, '150': 4, '200': 6, '250': 8, '300': 10, '400': 12, '500': 14, '700': 16, '850': 18, '925': 20, '1000': 22, '10': 24 };
            if (this.id.indexOf("_WIND_") > -1) {
                var rasterFunction = new esri.layers.RasterFunction(
                {
                    "functionName": "Colormap",
                    "functionArguments": {
                        "Colormap": [[1, 255, 232, 120], [2, 230, 220, 50], [3, 230, 175, 45], [4, 240, 130, 40], [5, 240, 0, 130]], // CreateColorsWA(0, 1, 255, this.colorRamp),
                        "Raster": new esri.layers.RasterFunction({
                            "functionName": "Remap",
                            "functionArguments": {
                                "InputRanges": [10, 15, 15, 20, 20, 25, 25, 30, 30, 1000],
                                "OutputValues": [1, 2, 3, 4, 5],
                                "Raster": {
                                    "functionName": "Mask",
                                    "functionArguments": {
                                        "IncludedRanges": [10, 1000],//array of double
                                        "NoDataInterpretation": 0,//int 0=esriNoDataMatchAny, 1=esriNoDataMatchAll
                                        "Raster": {
                                            "functionName": "ExtractBand",
                                            "functionArguments": {
                                                "BandIDs": [reISBW[this.mLevel]],
                                                "Raster": "$$"
                                            }
                                        }
                                    },
                                }
                            },
                            "outputPixelType": "U8"
                        }),
                    },
                    "variableName": "Raster"
                });
                this.setRenderingRule(rasterFunction);
                return;
            }
            var reISB = { '50': 0, '100': 1, '150': 2, '200': 3, '250': 4, '300': 5, '400': 6, '500': 7, '700': 8, '850': 9, '925': 10, '1000': 11, '2': 12 };
            if ((this.id.indexOf("_TMP_") > -1) || (this.id.indexOf("_HGT_") > -1) || (this.id.indexOf("_RH_") > -1) ) {
                //var reISB = { '50': 1, '100': 2, '150': 3, '200': 4, '250': 5, '300': 6, '400': 7, '500': 8, '700': 9, '850': 10, '925': 11, '1000': 12, '2': 13 };
                var rasterFunction = new esri.layers.RasterFunction(
                {
                    "functionName": "Colormap",
                    "functionArguments": {
                        "Colormap": CreateColors(0, 1, 255, this.colorRamp, this.inv),
                        "Raster": new esri.layers.RasterFunction({
                            "functionName": "Stretch",
                            "functionArguments": {
                                "StretchType": 5,
                                "Min": 0,
                                "Max": 255,
                                "UseGamma": false,
                                "Statistics": [[this.minVal, this.maxVal, 0, 0]],
                                "Raster":  {
                                    "functionName" : "ExtractBand",
                                    "functionArguments" : {
                                        "BandIDs": [reISB[this.mLevel]],
                                        "Raster": "$$"
                                    }
                                }
                            },
                            "outputPixelType": "U8"
                        }),
                    },
                    "variableName": "Raster"
                });
                //this.setInterpolation(esri.layers.ImageServiceParameters.INTERPOLATION_CUBICCONVOLUTION);
                this.setRenderingRule(rasterFunction);
                return;
            }
            var rasterFunction = new esri.layers.RasterFunction({                
                "functionName" : "Resample",
                "functionArguments" : {
                    "ResamplingType": 4,
                    "InputCellsize":{"x":0.125,"y":0.125},
                        "Raster": {
                            "functionName": "Colormap",
                            "functionArguments": {
                                "Colormap": CreateColors(0, 1, 255, this.colorRamp, this.inv),
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
                            }
                        }  
                },
                "variableName": "Raster"
            });
            //this.setInterpolation(esri.layers.ImageServiceParameters.INTERPOLATION_CUBICCONVOLUTION);
            this.setRenderingRule(rasterFunction);
        },
        setColorMap: function (color, min, max, inv) {
            this.inv = inv;
            this.colorRamp = color;
            this.minVal = min;
            this.maxVal = max;
            this.setRenderRule();
        }
    });

    dojo.declare('dcrscplaneta.LineEditor', [dijit._Widget, dijit._Templated], {
        templateString: '<div class="lineEditior" style="height:60px;">' +
                            '<table style="table-layout: fixed;" border="0">' +
                                '<col style="width: 130px;"/><col style="width: 60px;"/><col style="width: 30px;"/>' +
                                '<tr>' +
                                    '<td>Ширина линии:</td><td>' +
                                        '' +
                                        '<input style="width:20px;" type="text" value="1" data-dojo-attach-point="line_width">' +
                                        '<table style="display: inline-block;vertical-align: middle; table-layout: fixed;">' +
                                            '<tr style="line-height: 8px;"><td><span class="arrup" data-dojo-attach-event="onclick:_onupWidth" style="margin:0px 0px;vertical-align: bottom; height:8px;"></span></td></tr>' +
                                            '<tr style="line-height: 8px;"><td><span class="arrdown" data-dojo-attach-event="onclick:_ondwnWidth" style="margin:0px 0px;vertical-align: top; height:8px;"></span></td></tr>' +
                                        '</table>' +
                                    '</td>' +
                                    '<td rowspan="2"><span class="btn-ok" data-dojo-attach-event="onclick:_Ok"></span><td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td>Цвет линии:</td><td>' +
                                        '<input type="submit" class="cPickerBlock" style="background-color:rgb(  0,   0,   0); width:24px; height:21px;" value="" data-dojo-attach-point="sel_color" data-dojo-attach-event="onclick:_showPallete"/>' +
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
                                    '</td>' +
                                '</tr>' +
                            '</table>' +
                            '<span class="close" style="position:absolute; top:2px; right:2px;" data-dojo-attach-event="onclick:_Hide" ></span>' +
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
    dojo.declare('dcrscplaneta.FieldEditor', [dijit._Widget, dijit._Templated], {
        templateString: '<div class="FieldEditior">'+
                            '<table style="table-layout: fixed;" border="0">' +
                                '<col style="width: 60px;"/><col style="width: 70px;"/><col style="width: 60px;"/><col style="width: 30px;"/>' +
                                '<tr>' +
                                    '<td colspan="2">Прозрачность:</td><td><input class="inputTD" type="text" value="100" data-dojo-attach-point="opacityVal"></td>' +
                                    '<td rowspan="3"><span class="btn-ok" data-dojo-attach-event="onclick:_Ok"></span><td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td colspan="2">Мин. значение:</td><td><input class="inputTD" type="text" value="1" data-dojo-attach-point="minVal"></td>' +                                    
                                '</tr>' +
                                '<tr>' +
                                    '<td colspan="2">Макс. значение:</td><td><input class="inputTD" type="text" value="10" data-dojo-attach-point="maxVal"></td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td>Шкала:</td>' +
                                    '<td colspan="2"><input type="submit" value="" class="colorMapTD" data-dojo-attach-point="selColor" data-dojo-attach-event="onclick:_showPallete"/></td>' +
                                    '<td><input title="инвертировать шкалу" type="checkbox" data-dojo-attach-point="isInv"/><td>' +
                                '</tr>' +
                            '</table>' +
                            '<span class="close" style="position:absolute; top:2px; right:2px;" data-dojo-attach-event="onclick:_Hide" ></span>' +
                            '<div class="fieldSelectOptions showHide" data-dojo-attach-point="color_palete"></div>' +
                        '</div>',
        colorMap: "jet",
        open: false,
        lid: "",
        sendOk: undefined,
        constructor: function (lid) {
            this.lid = lid;
        },
        postCreate: function () {
            //linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(253, 255, 2) 16.9%, rgb(247, 255, 2) 17.3%, rgb(0, 252, 4) 33.7%, rgb(0, 252, 10) 34.1%, rgb(1, 249, 255) 50.6%,
            //                                                    rgb(2, 0, 253) 67.1%, rgb(8, 0, 253) 67.5%, rgb(255, 0, 251) 83.9%, rgb(255, 0, 245) 84.3%, rgb(255, 0, 6) 100%);"
            var mars = colorScale[this.colorMap];
            var grad = "linear-gradient(to right,";
            for (var i = 0; i < mars.length; i++) grad += " rgb(" + mars[i].rgb[0] + "," + mars[i].rgb[1] + "," + mars[i].rgb[2] + ") " + (mars[i].index*100).toFixed(1).toString() + "%" +"," 
            grad = grad.substr(0, grad.length - 1) + ")";
            this.selColor.style.backgroundImage = grad;

            var papa = { value: this };
            function setval(evt) { papa.value._selColor(evt) };
            var CSN = ['jet', 'rainbow', 'portland', 'rdbu', 'greys'];//, 'hsv', 'hot', 'cool', 'spring', 'summer', 'autumn', 'winter', 'bone', 'copper', 'yignbu', 'greens', 'yiorrd', 'bluered',
            //'picnic', 'blackbody', 'earth', 'electric'];
            for (var j = 0; j < CSN.length; j++) {
                mars = colorScale[CSN[j]];
                var dateSpan = document.createElement('input')
                dateSpan.type = "submit";
                dateSpan.value = "";
                dateSpan.alt = CSN[j];
                dateSpan.style.width = "200px";
                dateSpan.onclick = setval;
                var grad = "linear-gradient(to right,";
                for (var i = 0; i < mars.length; i++) grad += " rgb(" + mars[i].rgb[0] + "," + mars[i].rgb[1] + "," + mars[i].rgb[2] + ") " + (mars[i].index * 100).toFixed(1).toString() + "%" + ","
                grad = grad.substr(0, grad.length - 1) + ")";
                dateSpan.style.backgroundImage = grad;
                this.color_palete.appendChild(dateSpan);
            }
        },
        setPallete: function() {
            var mars = colorScale[this.colorMap];
            var grad = "linear-gradient(to right,";
            for (var i = 0; i < mars.length; i++) grad += " rgb(" + mars[i].rgb[0] + "," + mars[i].rgb[1] + "," + mars[i].rgb[2] + ") " + (mars[i].index*100).toFixed(1).toString() + "%" +"," 
            grad = grad.substr(0, grad.length - 1) + ")";
            this.selColor.style.backgroundImage = grad;
        },
        '_showPallete': function () { if (this.color_palete.style.display == 'none') this.color_palete.style.display = 'block'; else this.color_palete.style.display = 'none'; },
        '_selColor': function (index) {
            this.selColor.style.backgroundImage = index.currentTarget.style.backgroundImage;
            this.colorMap = index.currentTarget.alt;
            this.color_palete.style.display = 'none';
        },
        '_Hide': function () {
            var a = map.getLayer(this.lid);
            this.minVal.value = a.minVal;
            this.maxVal.value = a.maxVal;
            this.colorMap = a.colorRamp;
            this.setPallete();
            this.open = !this.open;
            if (this.open) this.domNode.style.display = "block"; else this.domNode.style.display = "none";
        },
        '_Ok': function () {
            if (this.sendOk) this.sendOk(this.colorMap, this.minVal.value, this.maxVal.value, this.opacityVal.value, this.isInv.checked);
            this._Hide();
        }
    });
};