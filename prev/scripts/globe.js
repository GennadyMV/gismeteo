dojo.require("esri.Credential");
dojo.require("esri.geometry");
dojo.require("esri.graphic");
dojo.require("esri.map");
dojo.require("esri.SpatialReference");
dojo.require("esri.TimeExtent");
dojo.require("esri.dijit.Basemap");
dojo.require("esri.dijit.BasemapLayer");
dojo.require("esri.dijit.BasemapGallery");
dojo.require("esri.dijit.Scalebar");
dojo.require("esri.dijit.OverviewMap");
dojo.require("esri.dijit.TimeSlider");
dojo.require("esri.geometry.Extent");
dojo.require("esri.geometry.Point");
dojo.require("esri.layers.agsdynamic");
dojo.require("esri.layers.ArcGISImageServiceLayer");
dojo.require("esri.layers.LayerDrawingOptions");
dojo.require("esri.layers.LayerTimeOptions");
dojo.require("esri.layers.MosaicRule");
dojo.require("esri.layers.RasterFunction");
dojo.require("esri.renderers.SimpleRenderer");
dojo.require("esri.symbols.PictureMarkerSymbol");
dojo.require("esri.symbols.SimpleLineSymbol");
dojo.require("esri.tasks.gp");
dojo.require("esri.tasks.identify");
dojo.require("esri.tasks.IdentifyParameters");
dojo.require("esri.tasks.query");

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.require("dojo._base.array");
dojo.require("dojo.on");
dojo.require("dojo.dom");
dojo.require("dojo.domReady!");

var layer, map, visible = [];
var timeSlider;
var scalebar;
var ip_serv = "";

var queryTaskSearch;
var querySerch;
var fSetSearch;


var lDConfig = {
    'layer0'            : { visName: "", chBoxes: [], dField: "", fLegend: "" },
    'MODIS_Raster'      : { visName: "TERRA/AQUA (MODIS)", chBoxes: ['cbModis'], dField: 'DataDateTime', fLegend: "R(0.776-0.841 мкм)<br>G(0.776-0.841 мкм)<br> B(0.620-0.670 мкм))"},
    'METEOR1_Raster'    : { visName: "Метеор-М №1 (КМСС)", chBoxes: ['cbMeteor1'], dField: 'DataDateTime', fLegend: "R(0.760-0.900 мкм)<br>G(0.580-0.690 мкм)<br>B(0.450-0.510 мкм))"},
    'LANDSAT8_Raster'   : { visName: "Landsat 8 (OLI)", chBoxes: ['cbLandsat8'], dField: 'DataDateTime', fLegend: "R(2.100-2.300 мкм)<br>G(0.850-0.890 мкм)<br>B(0.530-0.600 мкм))"},
    'RESURSP_Raster'    : { visName: "Ресурс-П №1 (ШМСА)", chBoxes: ['cbResursp'], dField: 'DataDateTime', fLegend: "R(? мкм)<br>G(? мкм)<br>B(? мкм))"},
    'KANOPUS_Raster'    : { visName: "Канопус-В (МСС)", chBoxes: ['cbKanopus'], dField: 'DataDateTime', fLegend: "R(? мкм)<br>G(? мкм)<br>B(? мкм))"},
    'Flood'             : { visName: "Разливы", chBoxes: ['cbFloodPolygons'], dField: 'datadatetime', fLegend: ""},
    'SnowMap'           : { visName: "Карты снежного покрова", chBoxes: ['cbSnowMap'], dField: 'datadatetime', fLegend: "" },
    'SnowBorders'       : { visName: "Границы снежного покрова", chBoxes: ['cbSnowBorders'], dField: 'datadatetime', fLegend: "" },
    'Ascat'             : { visName: "Влажность почвы", chBoxes: ['cbAscat'], dField: 'datadatetime', fLegend: "" },
    'Hydro'             : { visName: "Уровни воды", chBoxes: ['cbWaterLevel'], dField: 'datadatetime', fLegend: "" },
    'Snow'              : { visName: "Высота снега (КН-01)", chBoxes: ['cbSnowDepth'], dField: 'date', fLegend: "" },
    'Snow_kn24'         : { visName: "Высота снега (КН-24)", chBoxes: ['cbSnowDepth24'], dField: 'datadatetime', fLegend: "" },
    'Meteo'             : { visName: "Метеорологическая информация", chBoxes: ['cbMeteo', 'cbWindSpeed', 'cbWeatherEvent', 'cbWeatherEventCol', 'cbWeatherTmpIso', 'cbWeatherPresIso'], dField: 'date', fLegend: "" },
    'GRIB_HGT_ISO'      : { visName: "Геопотенциал (изолинии)", chBoxes: ['cbHGTIsoline'], dField: 'date', fLegend: "" },
    'GRIB_TMP_ISO'      : { visName: "Температура (изолинии)", chBoxes: ['cbTMPIsoline'], dField: 'date', fLegend: "" },
    'GRIB_RH_ISO'       : { visName: "Влажность (изолинии)", chBoxes: ['cbRHIsoline'], dField: 'date', fLegend: "" },
    'GRIB_PRMSL_ISO'    : { visName: "Давление (изолинии)", chBoxes: ['cbPRMSLIsoline'], dField: 'date', fLegend: "" },
    'GRIB_HGT_FIELD'    : { visName: "Геопотенциал (поле)", chBoxes: ['cbHGTField'], dField: 'datadatetime', fLegend: "" },
    'GRIB_TMP_FIELD'    : { visName: "Температура (поле)", chBoxes: ['cbTMPField'], dField: 'datadatetime', fLegend: "" },
    'GRIB_RH_FIELD'     : { visName: "Влажность (поле)", chBoxes: ['cbRHField'], dField: 'datadatetime', fLegend: "" },
    'GRIB_PRMSL_FIELD'  : { visName: "Давление (поле)", chBoxes: ['cbPRMSLField'], dField: 'datadatetime', fLegend: "" },
    'clouds'            : { visName: "Карта облачности (MTSAT)", chBoxes: ['cbMTSAT'], dField: "", fLegend: "ИК канал 10.3-11.3 мкм" },
    'cloudsAfter180'    : { visName: "", chBoxes: [], dField: "", fLegend: "" },
    "ZeyaVDHR"          : { visName: "Прогноз по Зейскому водохранилищу", chBoxes: ["cbZeyaForecast", "cbZeyaCOSMO", "cbZeyaNCEP", "cbZeyaUKMO", "cbZeyaJMA"], dField: "date", fLegend: "" },
    "LevelPred"         : { visName: "Прогноз уровней воды", chBoxes: ["cbLevelForecast"], dField: "datef", fLegend: ""},
    //Static
    'Bounds'            : { visName: "Границы", chBoxes: ["cbBorders", "cbGosg", "cbAdm1", "cbAdm2"], dField: "", fLegend: "" },
    'Restrict'          : { visName: "Охраняемые природные территории", chBoxes: ["cbRestricted", "cbZP", "cbNP", "cbFZ"], dField: "", fLegend: "" },
    'City'              : { visName: "Города", chBoxes: ["cbCity", "cbChis", "cbStatus"], dField: "", fLegend: "" },
    'Rivers'            : { visName: "Гидро объекты", chBoxes: ["cbRivers"], dField: "", fLegend: "" },
    'Roads'             : { visName: "Авто- и ЖД- дороги", chBoxes: ["cbRoads"], dField: "", fLegend: "" },
    'Shoreline'         : { visName: "Береговая линия", chBoxes: ["cbShoreline"], dField: "", fLegend: "" }
};

var mInfos;