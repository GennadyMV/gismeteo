//Здесь функции по таблице с уровнями для предсказалок


//а это число?
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function clearElements(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//Запрос на выборку станций за выбраный период времнеи
function PredictSetStations() {
    var query = new esri.tasks.Query();
    query.returnGeometry = false;
    query.outFields = ["waterlevel", "station_index", "name"];
    query.orderByFields = ["station_index ASC", "waterlevel ASC"];
    query.timeExtent = map.timeExtent;
    query.where = "station_index in (5012,5016,5019,5004,5002,5358,5001,5020)";

    var queryTask = new esri.tasks.QueryTask(ip_serv + "arcgis/rest/services/stations/hydro/MapServer/0/query?token=" + token);
    queryTask.execute(query, showPredictListStations);
}

//собираем обращение к геопроцессингу формируя список станций и их уровней
function PredictLayerShow() {

    if (predictProcessing)
        return;

    var gp = new esri.tasks.Geoprocessor(ip_serv + "arcgis/rest/services/geoproc/FloodPrediction/GPServer/predictflood");

    var oTable = document.getElementById('PredictTable');
    var rowLength = oTable.rows.length;
    var ids = "", levels = "";
    for (i = 1; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        ids += oCells.item(1).innerHTML + ",";
        levels += oCells.item(2).innerHTML + ",";
    }

    var params = {
        "Query": "select * from db_gp_planeta.products_schema.get_nearest_floods('{" + ids.substring(0, ids.length - 1) +
        "}'::Int[],'{" + levels.substring(0, levels.length - 1) + "}'::double precision[]) "
    };
    
    if (!predictProcessing) {
        var container = dojo.byId("predictLoading");
        var img = document.createElement('img');
        img.src = "./images/loadGlobe.gif";
        container.appendChild(img);
    }

    predictProcessing = true;

    gp.submitJob(params, completePredictTask, null,errPredictTask);
        
}

//когда готов разлив риусем его
function completePredictTask(jobInfo) {

    if (jobInfo.jobStatus == "esriJobFailed")
        errPredictTask(jobInfo);
    
    map.getLayer("PredictFlood").JobID = jobInfo.jobId;
    map.getLayer("PredictFlood").refresh();

    //вырубаем лого загрузки
    var container = dojo.byId("predictLoading");
    clearElements(container);
    predictProcessing = false;
}

//когда готов разлив риусем его
function errPredictTask(jobInfo) {
    //вырубаем лого загрузки
    var container = dojo.byId("predictLoading");
    clearElements(container);
    predictProcessing = false;
    ShowMessage("Ошибка обработки запроса:\n" + jobInfo.message);
}

//начальный старт таблички
function initPredictTable() {
    var container = dojo.byId("divPredictTable");
    clearElements(container);
    var initLevels = [600, 400, 500], initIds = [5012, 5016, 5019], initNames = ["Хабаровск", "Елабуга", "Троицкое"];       
    container.appendChild(predictTableCreator(initLevels, initIds, initNames));
}

function showPredictListStations(featureSet) {

    var container = dojo.byId("divPredictTable");
    clearElements(container);
    var resultFeatures = featureSet.features;

    var Levels = [], Ids = [],Names = []; 
    for (var i = 0; i < resultFeatures.length; i++) {
        Levels.push(resultFeatures[i].attributes.waterlevel);
        Ids.push(resultFeatures[i].attributes.station_index);
        Names.push(resultFeatures[i].attributes.name);
    }    
    container.appendChild(predictTableCreator(Levels, Ids, Names));

    if (resultFeatures.length == 0) {
        var label = document.createElement('div');
        label.style = "margin:5px;";
        label.innerHTML = "За выбранный период нет данных";
        container.appendChild(label);
    }    
}

function predictTableCreator(Levels, Ids, Names)
{
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    td1.innerHTML = "Уровень воды";
    td2.innerHTML = "Индекс станции";
    td3.innerHTML = "Название";
    tr.appendChild(td3);
    tr.appendChild(td2);
    tr.appendChild(td1);
    table.appendChild(tr);

    for (var i = 0; i < Levels.length; i++) {

        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        td1.innerHTML = Levels[i];
        td1.onclick = function () { editPredictValue(this); };
        td2.innerHTML = Ids[i];
        td3.innerHTML = Names[i];
        tr.appendChild(td3);
        tr.appendChild(td2);
        tr.appendChild(td1);

        table.appendChild(tr);

    }

    table.className = "all_table_CSS";
    table.id = "PredictTable";

    return table;
}



function editPredictValue(td_element) {

    if (predictIsEdit == true)
        return;

    predictPreEditData = td_element.innerHTML;
    clearElements(td_element);
    td_element.innerHTML = "";

    var inputtext = document.createElement('input');
    inputtext.type = "text";
    inputtext.value = predictPreEditData;
    inputtext.id = "predictEditableField";
    inputtext.className = "inputPredicttextbox";
    inputtext.onblur = function () { stopeditPredictValue(this); };
    td_element.appendChild(inputtext);
    dijit.focus(inputtext);
    predictIsEdit = true;
}

function stopeditPredictValue(input_element) {
    var val = isNumber(input_element.value) ? input_element.value : predictPreEditData;

    var container = input_element.parentElement;
    clearElements(container);
    container.innerHTML = val;

    predictIsEdit = false;
}

function PredictAddLevel2All(val) {
    var table = dojo.byId("PredictTable");

    if (table != null) {
        for (var i = 1; i < table.rows.length; i++) {
            table.rows[i].cells[2].innerHTML = parseInt(table.rows[i].cells[2].innerHTML) + val;
        }
    }
}