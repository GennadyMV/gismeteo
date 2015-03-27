dojo.require("esri.map");
function initWMSLayer() {
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
};