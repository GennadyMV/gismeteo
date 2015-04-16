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

var basemapGallery;

var lDConfig = {
    'layer0'            : { visName: "", chBoxes: [], dField: "", fLegend: "" },
    'MODIS_Raster'      : { visName: "TERRA/AQUA (MODIS)", chBoxes: ['cbModis'], dField: 'DataDateTime', dbname : 'AMD_master_raster_cat', fLegend: "R(0.776-0.841 мкм)<br>G(0.776-0.841 мкм)<br> B(0.620-0.670 мкм))"},
    'METEOR1_Raster': { visName: "Метеор-М №1 (КМСС)", chBoxes: ['cbMeteor1'], dField: 'DataDateTime', dbname: 'AMD_master_raster_cat', fLegend: "R(0.760-0.900 мкм)<br>G(0.580-0.690 мкм)<br>B(0.450-0.510 мкм))" },
    'LANDSAT8_Raster': { visName: "Landsat 8 (OLI)", chBoxes: ['cbLandsat8'], dField: 'DataDateTime', dbname: 'AMD_master_raster_cat', fLegend: "R(2.100-2.300 мкм)<br>G(0.850-0.890 мкм)<br>B(0.530-0.600 мкм))" },
    'RESURSP_Raster': { visName: "Ресурс-П №1 (ШМСА)", chBoxes: ['cbResursp'], dField: 'DataDateTime', dbname: 'AMD_master_raster_cat', fLegend: "R(? мкм)<br>G(? мкм)<br>B(? мкм))" },
    'KANOPUS_Raster': { visName: "Канопус-В (МСС)", chBoxes: ['cbKanopus'], dField: 'DataDateTime', dbname: 'AMD_master_raster_cat', fLegend: "R(? мкм)<br>G(? мкм)<br>B(? мкм))" },
    'Flood': { visName: "Разливы", chBoxes: ['cbFloodPolygons'], dField: 'datadatetime', dbname: 'db_gp_planeta.public.view_floods_moscow', fLegend: "", datefromlayer: "0" },
    'SnowMap': { visName: "Карты снежного покрова", chBoxes: ['cbSnowMap'], dField: 'datadatetime', dbname: 'db_gp_planeta.public.view_snow_border_map', fLegend: "" },
    'SnowBorders': { visName: "Границы снежного покрова", chBoxes: ['cbSnowBorders'], dField: 'datadatetime', dbname: 'db_gp_planeta.public.view_snow_border_lines', fLegend: "" },
    'Ascat': { visName: "Влажность почвы", chBoxes: ['cbAscat'], dField: 'datadatetime', dbname: 'db_gp_planeta.public.view_ascatsoil', fLegend: "" },
    'Hydro': { visName: "Уровни воды", chBoxes: ['cbWaterLevel'], dField: 'datadatetime', dbname: 'db_gp_planeta.public.view_hydro_scale', fLegend: "" },
    'Snow': { visName: "Высота снега (КН-01)", chBoxes: ['cbSnowDepth'], dField: 'date', dbname: 'db_gp_planeta.public.view_snow', fLegend: "" },
    'Snow_kn24'         : { visName: "Высота снега (КН-24)", chBoxes: ['cbSnowDepth24'], dField: 'datadatetime', fLegend: "" },
    'Meteo'             : { visName: "Метеорологическая информация", chBoxes: ['cbMeteo', 'cbWindSpeed', 'cbWeatherEvent', 'cbWeatherEventCol', 'cbWeatherTmpIso', 'cbWeatherPresIso'], dField: 'date', fLegend: "" },
    'GRIB_HGT_ISO'      : { visName: "Геопотенциал (изолинии)", chBoxes: ['cbHGTIsoline'], dField: 'date', fLegend: "" },
    'GRIB_TMP_ISO'      : { visName: "Температура (изолинии)", chBoxes: ['cbTMPIsoline'], dField: 'date', fLegend: "" },
    'GRIB_RH_ISO'       : { visName: "Влажность (изолинии)", chBoxes: ['cbRHIsoline'], dField: 'date', fLegend: "" },
    'GRIB_PRMSL_ISO'    : { visName: "Давление (изолинии)", chBoxes: ['cbPRMSLIsoline'], dField: 'date', fLegend: "" },
    'GRIB_HGT_FIELD'    : { visName: "Геопотенциал (поле)", chBoxes: ['cbHGTField'], dField: 'datadatetime', fLegend: "" },
    'GRIB_TMP_FIELD'    : { visName: "Температура (поле)", chBoxes: ['cbTMPField'], dField: 'datadatetime', fLegend: "" },
    'GRIB_RH_FIELD'     : { visName: "Влажность (поле)", chBoxes: ['cbRHField'], dField: 'DataDateTime', fLegend: "" },
    'GRIB_PRMSL_FIELD'  : { visName: "Давление (поле)", chBoxes: ['cbPRMSLField'], dField: 'DataDateTime', fLegend: "" },
    'GRIB_APCP_FIELD'   : { visName: "Осадки за 3 часа", chBoxes: ['cbAPCPField'], dField: 'datadatetime', fLegend: '<div style="position:relative; height:50px;"><table style="table-layout: fixed; margin-left:10px;" cellspacing="0" border="1" height="25"><col style="width: 40px;"/><col style="width: 40px;"/><col style="width: 40px;"/><col style="width: 40px;"/><tr><td style="background:rgb(153, 255, 153)"></td><td style="background:rgb(51, 204, 102)"></td><td style="background:rgb(51, 153, 102)"></td><td style="background:rgb(204, 51, 0)"></td></tr></table><div style="position:absolute; left:2px;">0.2</div><div style="position:absolute; left:46px;">1</div><div style="position:absolute; left:82px;">10</div><div style="position:absolute; left:122px;">50</div><div style="position:absolute; left:160px;">(мм)</div></div>' },
    'GRIB_WIND_BARBS'   : { visName: "Скорость и направление ветра", chBoxes: ['cbGRIBWind'], dField: 'datadatetime', fLegend: '<div style="position:relative; height:50px;"><table style="table-layout: fixed; margin-left:10px;" cellspacing="0" border="0" height="25"><col style="width: 40px;"/><col style="width: 140px;"/><tr><td><img src="images/wind/0.png"></td><td> - штиль</td></tr></tr><td><img src="images/wind/13.png"></td><td> - 2.5 м/с</td></tr></tr><td><img src="images/wind/46.png"></td><td> - 5 м/с</td></tr></tr><td><img src="images/wind/2426.png"></td><td> - 25 м/с</td></tr></table></div>' },
    'GRIB_WIND_FIELD'   : { visName: "Скорость ветра (поле)", chBoxes: ['cbGRIBWindF'], dField: 'datadatetime', fLegend: '<div style="position:relative; height:50px;"><table style="table-layout: fixed; margin-left:10px;" cellspacing="0" border="1" height="25"><col style="width: 32px;"/><col style="width: 32px;"/><col style="width: 32px;"/><col style="width: 32px;"/><col style="width: 32px;"/><tr><td style="background:rgb(255, 232, 120)"></td><td style="background:rgb(230, 220, 50)"></td><td style="background:rgb(230, 175, 45)"></td><td style="background:rgb(240, 130, 40)"></td><td style="background:rgb(240, 0, 130)"></td></tr></table><div style="position:absolute; left:2px;">10</div><div style="position:absolute; left:34px;">15</div><div style="position:absolute; left:66px;">20</div><div style="position:absolute; left:98px;">25</div><div style="position:absolute; left:130px;">30</div><div style="position:absolute; left:160px;">(м/с)</div></div>' },
    'clouds'            : { visName: "Карта облачности", chBoxes: ['cbMTSAT'], dField: "datadatetime", fLegend: "ИК канал 10.3-11.3 мкм", datefromlayer: "3014769" },
    "ZeyaVDHR"          : { visName: "Прогноз по Зейскому водохранилищу", chBoxes: ["cbZeyaForecast", "cbZeyaCOSMO", "cbZeyaNCEP", "cbZeyaUKMO", "cbZeyaJMA"], dField: "datef", fLegend: "" },
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