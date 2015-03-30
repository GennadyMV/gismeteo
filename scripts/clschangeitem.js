/*dojo.require("esri.map");
dojo.require("esri.layers.agsdynamic");
dojo.require("esri.layers.LayerDrawingOptions");
dojo.require("esri.renderers.SimpleRenderer");
dojo.require("esri.symbols.SimpleLineSymbol");

dojo.require("esri.layers.ArcGISImageServiceLayer");
dojo.require("esri.layers.RasterFunction");
*/
//dojo.ready(function () {
function initclsChangeItemDMSL() {
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
}
//});