dojo.ready(function () {
    dojo.declare("dcrscplaneta.clsChangeItemDMSL", esri.layers.ArcGISImageServiceLayer, {
        minVal: 0.0,
        maxVal: 100.0,
        mLevel: "",
        cLevel: 3,
        setLevel: function (sLevel) {
            this.mLevel = sLevel;
            switch (this.id) {
                case "GRIB_HGT_FIELD": setHGT(sLevel); break;
                case "GRIB_TMP_FIELD": setTMP(sLevel); break;
                case "GRIB_RH_FIELD": setRH(sLevel); break;
                case "GRIB_PRMSL_FIELD": setPRMSL(sLevel); break;
                default: break;
            }
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
            /*
            {
            "rasterFunction" : "Colormap",
            "rasterFunctionArguments" : {
                "Colormap" : [
                    [0, 255, 0, 0],
                    [2, 0, 0, 255]
                ],
                "Raster":{
                    "rasterFunction": "Remap",
                    "rasterFunctionArguments": {
                        "InputRanges": [-50.0,0,    0,   50],
                        "OutputValues": [0,2],
                        "Raster":"$$"
                    },
                    "outputPixelType": "U8"
                }     
            },
            "outputPixelType": "U8"
        }
            */
            var rasterFunction = new esri.layers.RasterFunction(
            {
                "functionName": "Colormap",
                "functionArguments": {
                    "Colormap": [[0, 255, 0, 0], [2, 0, 0, 255]],
                    "Raster": new esri.layers.RasterFunction({
                        "functionName": "Remap",
                        "functionArguments": {
                            "InputRanges": [-50.0, 0, 0, 50],
                            "OutputValues": [0, 2],
                        }
                    }),
                },
                "variableName": "Raster"
            });
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
        }
    });
});