function initInfo() {
    dojo.declare("dcrscplaneta.clsGraph", [dijit._Widget, dijit._Templated], {
        templateString: '<div data-dojo-attach-point="mWindow" style="position:relative; margin: 0px 0px 0px 0px">' +
                            '<canvas data-dojo-attach-point="Graph" style="margin: 0px 25px 0px 25px" ></canvas>' +
                            '<canvas data-dojo-attach-point="Legend" style="margin: 0px 0px 0px 0px"></canvas>' +
                            '<div data-dojo-attach-point="leftLegend" style="position:absolute; top:0px; left:0px; width:25px; height:40px;"></div>' +
                            '<div data-dojo-attach-point="rightLegend" style="position:absolute; top:0px; left:455px; width:25px; height:40px;"></div>' +
                            '<div data-dojo-attach-point="LoadIcon" style="position:absolute; margin-left:-50px; margin-top:-50px; top:50%; left:50%; z-index:90"><img src="./images/loadingImage.gif"/></div>' +
                        '</div>',
        width: 500,height: 800, lheight: 50,
        graphCount: 0, stack: undefined, stackMin: undefined, stackMax: undefined, stackDiv: undefined,
        //ConstVals
        lr: 25, cntInt: 24, cntStep: 5, xs:0, xe:0,
        //functions
        constructor: function() {
            this.stack = new Array(0);
            this.stackMin = new Array(0);
            this.stackMax = new Array(0);
            this.stackDiv = new Array(0);
        },
        ShowVal: function (x) {
            if ((x < 25) || (x > this.width - 25)) {
                //hide divs
                for (var i = 0; i < this.stackDiv.length; i++) {
                    this.stackDiv[i].style.display = 'none';
                }
            } else {
                for (var i = 0; i < this.stackDiv.length; i++) {
                    this.stackDiv[i].style.display = 'block';
                }
            }
            if (this.stack.length == 0) return;
            var px = (x - 25) * (this.xe - this.xs) / this.Graph.width + this.xs;
            for (var j = 0; j < this.stack.length; j++) {
                for (var i = 0; i < this.stack[j].length - 1; i++) {
                    if ((px > this.stack[j][i][0]) && (px < this.stack[j][i + 1][0])) {
                        if (x > (this.width / 2)) {
                            this.stackDiv[j].style.right = (this.width - x) + "px";
                            this.stackDiv[j].style.left = "";
                        } else {
                            this.stackDiv[j].style.right = "";
                            this.stackDiv[j].style.left = x + "px";
                        }
                        var px0 = this.stack[j][i][0];
                        var px1 = this.stack[j][i + 1][0];
                        var py0 = this.stack[j][i][1]; //this.height - (this.stack[0][i][1] - this.stackMin[0]) / (this.stackMax[0] - this.stackMin[0]) * this.height;
                        var py1 = this.stack[j][i + 1][1];//this.height - (this.stack[0][i + 1][1] - this.stackMin[0]) / (this.stackMax[0] - this.stackMin[0]) * this.height;
                        var y = ((px - px0) / (px1 - px0)) * (py1 - py0) + py0;
                        this.stackDiv[j].innerHTML = y.toFixed(2).toString();
                        var py = this.height - (y - this.stackMin[j]) / (this.stackMax[j] - this.stackMin[j]) * this.height;
                        this.stackDiv[j].style.top = py - 6 + "px";
                        break;
                    }
                }
            }
            //Sort by Top
            var Topo = [];
            for (var i = 0; i < this.stackDiv.length; i++) {
                Topo.push([parseInt(this.stackDiv[i].style.top), i]);
            }
            Topo.sort(sortFunction);            
            function sortFunction(a, b) {
                if (a[0] === b[0]) {
                    return 0;
                }
                else {
                    return (a[0] < b[0]) ? -1 : 1;
                }
            }
            //check collusion
            if (Topo[0][0] < 0 ) {
                Topo[0][0] = 0;
            }
            for (var i = 1; i < Topo.length; i++) {
                if (Topo[i][0] - Topo[i - 1][0] < 14) {
                    Topo[i][0] = Topo[i - 1][0] + 14;
                }
            }
            for (var i = 0; i < Topo.length; i++) {
                this.stackDiv[Topo[i][1]].style.top = Topo[i][0] + 'px';
            }
        },
        PrepareGraph: function (cntInt) {
            this.Graph.width = this.width - this.lr*2;
            this.Graph.height = this.height;

            this.Legend.width = this.width;
            this.Legend.height = this.lheight;

            var ctx = this.Graph.getContext("2d");
            var step = this.Graph.width / this.cntInt;
            for (var i = 0; i < this.cntInt; i++) {
                if (i % 2 == 0) {
                    ctx.fillStyle = "#F1F7FB";
                } else {
                    ctx.fillStyle = "#FFFFFF";
                }
                ctx.fillRect(i * step, 0, (i + 1) * step, this.height);                
            }
            step = this.height / this.cntStep;
            ctx.strokeStyle = '#DBDFE4';
            ctx.beginPath();
            for (var i = 1; i <= this.cntStep; i++)
            {
                ctx.moveTo(0, i*step);
                ctx.lineTo(this.width, i*step);
                ctx.stroke();
            }
        },
        PushGraph: function(xr, yr, tg, color, name ) {
            var ctx = this.Graph.getContext("2d");
            var ys = this.ys;
            var ye = this.ye;
            ctx.beginPath();
            ctx.strokeStyle = color;
            var px = (xr[0] - this.xs) / (this.xe - this.xs) * this.width;
            var py = this.height - (yr[0] - ys) / (ye - ys) * this.height;
            ctx.moveTo((xr[0] - this.xs) / (this.xe - this.xs) * this.width, this.height - (yr[0] - ys) / (ye - ys) * this.height);
            for (var i = 1; i < yr.length; i++) {
                px = (xr[0] - this.xs) / (this.xe - this.xs) * this.width;
                py = this.height - (yr[0] - ys) / (ye - ys) * this.height;
                ctx.lineTo((xr[i] - this.xs) / (this.xe - this.xs) * this.width, this.height - (yr[i] - ys) / (ye - ys) * this.height);
            }
            ctx.stroke();

            var ctx = this.Legend.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(2, this.graphCount * 16 + 2, 12, 12);
            ctx.font = "14px Arial ";
            ctx.strokeText(name, 25, this.graphCount * 16 + 14);
            this.graphCount++;
        },
        PushGraph2: function (xyr, name, color, flag, min, max) {
            this.stack.push(xyr);
            this.stackMin.push(min);
            this.stackMax.push(max);
            var div = document.createElement('div');
            div.style.position = "absolute";// = "position: absolute; left:0px; top:0px; color:black";
            div.style.left = "0px";
            div.style.top = "0px";
            div.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            div.style.color = color;
            div.style.fontSize = "12px";
            this.mWindow.appendChild(div);
            this.stackDiv.push(div);

            var ctx = this.Graph.getContext("2d");
            var ys = min;
            var ye = max;
            ctx.beginPath();
            if (flag) {
                ctx.setLineDash([5]);
            } else {
                ctx.setLineDash([]);
            }
            ctx.strokeStyle = color;
            var px = (xyr[0][0] - this.xs) / (this.xe - this.xs) * this.Graph.width;
            var py = this.height - (xyr[0][1] - ys) / (ye - ys) * this.height;
            
            ctx.moveTo((xyr[0][0] - this.xs) / (this.xe - this.xs) * this.Graph.width, this.height - (xyr[0][1] - ys) / (ye - ys) * this.height);
            for (var i = 1; i < xyr.length; i++) {                
                ctx.lineTo((xyr[i][0] - this.xs) / (this.xe - this.xs) * this.Graph.width, this.height - (xyr[i][1] - ys) / (ye - ys) * this.height);
            }
            ctx.stroke();
            // Draw Legend
            var x_smeh = this.graphCount % 3;
            var y_smeh = parseInt(this.graphCount / 3);
            var ctx = this.Legend.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(25 + x_smeh*this.width/3, y_smeh * 16 + 2, 12, 12);
            ctx.font = "14px Arial ";
            ctx.fillText(name, 50 + x_smeh * this.width / 3, y_smeh * 16 + 14);
            this.graphCount++;
        },
        PushGraph3: function (xyr, name, color, min, max) {
            max = max * 1.1;
            var ctx = this.Graph.getContext("2d");
            var ys = min;
            var ye = max;
            ctx.beginPath();            
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.font = "9px Arial ";
            var rect_width = (xyr[1][0] - xyr[0][0]) / (this.xe - this.xs) * this.Graph.width;

            for (var i = 0; i < xyr.length; i++) {
                var hh = (xyr[i][1]) / (ye - ys) * this.height
                if (hh > 0) {
                    ctx.rect((xyr[i][0] - this.xs) / (this.xe - this.xs) * this.Graph.width, this.height, -rect_width, -(xyr[i][1]) / (ye - ys) * this.height);
                    if (xyr[i][1] < 0.1) {
                        ctx.fillText(xyr[i][1].toFixed(2).toString().substring(1), (xyr[i][0] - this.xs) / (this.xe - this.xs) * this.Graph.width - rect_width, this.height - (xyr[i][1] - ys) / (ye - ys) * this.height - 1);
                    } else {
                        ctx.fillText(xyr[i][1].toFixed(1).toString(), (xyr[i][0] - this.xs) / (this.xe - this.xs) * this.Graph.width - rect_width, this.height - (xyr[i][1] - ys) / (ye - ys) * this.height - 1);
                    }
                }
                //ctx.lineTo((xyr[i][0] - this.xs) / (this.xe - this.xs) * this.Graph.width, this.height - (xyr[i][1] - ys) / (ye - ys) * this.height);
            }
            ctx.fill();
            // Draw Legend
            var x_smeh = this.graphCount % 3;
            var y_smeh = parseInt(this.graphCount / 3);
            var ctx = this.Legend.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(25 + x_smeh * this.width / 3, y_smeh * 16 + 2, 12, 12);
            ctx.font = "14px Arial ";
            ctx.fillText(name, 50 + x_smeh * this.width / 3, y_smeh * 16 + 14);
            this.graphCount++;
        },
        drawLeftLegend: function (min, max, fix) {
            this.leftLegend.height = this.height;
            var step = (max - min) / this.cntStep;
            for (var i = 0; i < this.cntStep; i++) {
                var val = min + i * step;
                var py = this.height - (val - min) / (max - min) * this.height;                
                var d = document.createElement('div');
                d.innerHTML = val.toFixed(fix).toString();
                d.style.position = "absolute";
                d.style.color = "black";
                d.style.right = "0px";
                d.style.top = (py - 10 ) + "px";
                d.style.fontSize = "8pt";
                this.leftLegend.appendChild(d);
            }
        },
        drawRightLegend: function (min, max, fix) {
            this.rightLegend.height = this.height;
            var step = (max - min) / this.cntStep;
            for (var i = 0; i < this.cntStep; i++) {
                var val = min + i * step;
                var py = this.height - (val - min) / (max - min) * this.height;
                var d = document.createElement('div');
                d.innerHTML = val.toFixed(fix).toString();
                d.style.position = "absolute";
                d.style.color = "black";
                d.style.left = "0px";
                d.style.top = (py - 10) + "px";
                d.style.fontSize = "8pt";
                this.rightLegend.appendChild(d);
            }
        },
        DrawGraph: function (xr, yr, color) {
            var ctx = this.Graph.getContext("2d");
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo((xr[0] - this.xs) / (this.xe - this.xs) * this.width, this.height - (yr[0] - this.ys) / (this.ye - this.ys) * this.height);
            for (var i = 1; i < yr.length; i++) {
                ctx.lineTo((xr[i] - this.xs) / (this.xe - this.xs) * this.width, this.height - (yr[i] - this.ys) / (this.ye - this.ys) * this.height);
            }
            ctx.stroke();        
        },
        DrawLegend: function (Text, color) {            
            var ctx = this.Legend.getContext("2d");
            ctx.fillStyle = color;
            ctx.fillRect(2, 2, 12, 12);
            ctx.font = "italic 10pt Arial ";
            ctx.strokeText(Text, 25, 14);
        },
        PushInStak: function (level, color) {
            var Task = [level, color];
            this.stack.push(Task);
            this.tryDarw();
        },
        tryDarw: function () {
            if (this.stack.length > 0) {
                if (!this.work) {
                    var Task = this.stack.pop();
                    this.createGraph(Task[0], Task[1]);
                }
            }
        },
        drawLine: function (arr, color, flag, level) {
            var ctx = this.Graph.getContext("2d");
            ctx.beginPath();
            if (flag) {
                ctx.setLineDash([5]);
            } else {
                ctx.setLineDash([]);
            }
            var xs = 24;
            var ys = 21;
            ctx.strokeStyle = color;
            ctx.moveTo( (arr[0].x/xs)*this.width, ((ys-arr[0]).y/ys)*this.height );
            for (var i = 1; i < arr.length; i++) {
                ctx.lineTo((arr[i].x / xs) * this.width, ((ys-arr[i].y) / ys) * this.height);
            }
            ctx.stroke();            
            ctx.font = "8px Arial ";
            var ik = (arr.length / 2) | 0;
            ctx.fillText(level, (arr[ik].x / xs) * this.width, ((21-arr[ik].y) / ys) * this.height);
        },        
        createMeteoGraphFromUrl: function (pnt, url) {            
            var gp = new esri.tasks.Geoprocessor(url);
            var td = new Date(this.xs);
            var ds = td.getUTCFullYear() + ("0" + (td.getUTCMonth() + 1)).slice(-2) + ("0" + td.getUTCDate()).slice(-2) + ("0" + td.getUTCHours()).slice(-2);
            td = new Date(this.xe);
            var de = td.getUTCFullYear() + ("0" + (td.getUTCMonth() + 1)).slice(-2) + ("0" + td.getUTCDate()).slice(-2) + ("0" + td.getUTCHours()).slice(-2);

            var params = { "lon": pnt.x, "lat": pnt.y, "srid": pnt.spatialReference.wkid.toString(), "sDate": ds, "eDate": de };
            gp.submitJob(params, completeWRFTask, null);
            var papa = { Value: this, NN: name };
            function completeWRFTask(jobInfo) {
                gp.getResultData(jobInfo.jobId, "result",
                    function (gpLayer) {
                        var obj = gpLayer.value.split(/[:{}\[\],]/);
                        var objTMP = [], objDTP = [], objP = [], obj2 = undefined;
                        var minT = -30, maxT = 30, minP = 900, maxP = 1100;
                        var k = -1;
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i].indexOf("DTP") > -1) { obj2 = objDTP; k = -1; }
                            if (obj[i].indexOf("TMP") > -1) { obj2 = objTMP; k = -1; }
                            if (obj[i].indexOf("PRMSL") > -1) { obj2 = objP; k = -1; }

                            if (obj[i].indexOf("minT") > -1) { minT = parseFloat(obj[i + 1]); }
                            if (obj[i].indexOf("maxT") > -1) { maxT = parseFloat(obj[i + 1]); }
                            if (obj[i].indexOf("minP") > -1) { minP = parseFloat(obj[i + 1]); }
                            if (obj[i].indexOf("maxP") > -1) { maxP = parseFloat(obj[i + 1]); }

                            if (obj[i].indexOf("Date") > -1) {
                                obj2.push([]);
                                k++;
                                var tms = Date.UTC(+obj[i + 1].substring(2, 6), +obj[i + 1].substring(6, 8) - 1, +obj[i + 1].substring(8, 10), +obj[i + 1].substring(10, 12), 0, 0, 0);
                                obj2[k].push(tms);
                            }
                            if (obj[i].indexOf("Value") > -1) { obj2[k].push(parseFloat(obj[i + 1])); }
                        }

                        for (var j = 0; j < objTMP.length; j++) {
                            if (objDTP[j][1] > objTMP[j][1]) {
                                objDTP[j][1] = objTMP[j][1];
                            }
                        }

                        papa.Value.PushGraph2(objTMP, "T 2м °C", 'red', false, minT, maxT);
                        papa.Value.PushGraph2(objDTP, "T. росы °C", 'blue', true, minT, maxT);
                        papa.Value.PushGraph2(objP, "P0 гПа", 'black', false, minP, maxP);
                        papa.Value.drawLeftLegend(minT, maxT, 1);
                        papa.Value.drawRightLegend(minP, maxP, 0);
                        papa.Value.LoadIcon.style.display = 'none';
                    },
                    null)
            }
        },
        createMeteo2GraphFromUrl: function (pnt, url) {
            var gp = new esri.tasks.Geoprocessor(url);
            var td = new Date(this.xs);
            var ds = td.getUTCFullYear() + ("0" + (td.getUTCMonth() + 1)).slice(-2) + ("0" + td.getUTCDate()).slice(-2) + ("0" + td.getUTCHours()).slice(-2);
            td = new Date(this.xe);
            var de = td.getUTCFullYear() + ("0" + (td.getUTCMonth() + 1)).slice(-2) + ("0" + td.getUTCDate()).slice(-2) + ("0" + td.getUTCHours()).slice(-2);
            var params = { "lon": pnt.x, "lat": pnt.y, "srid": pnt.spatialReference.wkid.toString(), "sDate": ds, "eDate": de };
            gp.submitJob(params, completeWRFTask, null);
            var papa = { Value: this, NN: name };
            function completeWRFTask(jobInfo) {
                gp.getResultData(jobInfo.jobId, "result",
                    function (gpLayer) {
                        var obj = gpLayer.value.split(/[:{}\[\],]/);
                        var objRH = [], objP = [], obj2 = undefined;
                        var maxP = 1100;
                        var k = -1;
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i].indexOf("RH") > -1) { obj2 = objRH; k = -1; }
                            if (obj[i].indexOf("APCP") > -1) { obj2 = objP; k = -1; }
                            if (obj[i].indexOf("maxP") > -1) { maxP = parseFloat(obj[i + 1]); }
                            if (obj[i].indexOf("Date") > -1) {
                                obj2.push([]);
                                k++;
                                var tms = Date.UTC(+obj[i + 1].substring(2, 6), +obj[i + 1].substring(6, 8) - 1, +obj[i + 1].substring(8, 10), +obj[i + 1].substring(10, 12), 0, 0, 0);
                                obj2[k].push(tms);
                            }
                            if (obj[i].indexOf("Value") > -1) { obj2[k].push(parseFloat(obj[i + 1])); }                            
                        }

                        papa.Value.PushGraph2(objRH, "Отн. вл-ть, %", 'black', false, 0, 100);
                        papa.Value.PushGraph3(objP, "Cум. осадки, мм/3ч", 'green', 0, maxP);
                        papa.Value.drawRightLegend(0, 100, 0);
                        papa.Value.LoadIcon.style.display = 'none';
                    },
                    null)
            }
        }        
    });

    dojo.declare("dcrscplaneta.clsGraphContour", [dijit._Widget, dijit._Templated], {
        templateString: '<div data-dojo-attach-point="mWindow" style="position:relative; margin: 0px 0px 0px 0px">' +
                            '<canvas data-dojo-attach-point="Graph" style="margin: 0px 25px 0px 25px"></canvas>' +
                            '<div data-dojo-attach-point="leftLegend" style="position:absolute; top:0px; left:0px; width:25px; height:40px;"></div>' +
                            '<div data-dojo-attach-point="rightLegend" style="position:absolute; top:0px; left:455px; width:25px; height:40px;"></div>' +
                            '<div data-dojo-attach-point="LoadIcon" style="position:absolute; margin-left:-32px; margin-top:-32px; top:50%; left:50%; z-index:90"><img src="./images/loadGlobe.gif"/></div>' +
                            '<div data-dojo-attach-point="infoDiv"' +
                                ' style="position:absolute; margin-left: -40px; left:0px; top:0px; width:40px; height:25px; background-color:rgba(255, 255, 255, 0.7); text-align: right; font-size:12px">' +
                                '<span data-dojo-attach-point="tmpVal"></span>°C<br>' +
                                '<span data-dojo-attach-point="rhVal"></span>%'+
                            '</div>' +
                        '</div>',
        width: 500, height: 800, lheight: 0,
        graphCount: 0,
        //ConstVals        
        cntInt: 24, cntStep: 20, lr: 25,        
        arrT: undefined, arrR: undefined,
        xs:0, xe:0, xds:0, xde:0,
        //functions
        constructor: function () { },
        ShowVal: function (x, y) {
            if ((x < 25) || (x > this.width - 25)) {
                this.infoDiv.style.display = 'none';
                return;
            }
            if ((y > 0) && (y < this.height) && (this.arrT != undefined)) {
                this.infoDiv.style.display = 'block';
                this.infoDiv.style.left = x + 'px';
                this.infoDiv.style.top = y - 15 + 'px';
                var j = parseInt((this.height - (y - 15)) / (this.height) * (this.arrT[0].length - 1));
                var i = parseInt(x / this.width * (this.arrT.length-1))
                this.tmpVal.innerHTML = this.arrT[i][j].toFixed(1).toString();
                this.rhVal.innerHTML = this.arrP[i][j].toFixed(0).toString();
                var k = 9;
            } else {
                this.infoDiv.style.display = 'none';
            }
        },
        PrepareGraph: function (cntInt) {
            this.Graph.width = this.width - this.lr * 2;
            this.Graph.height = this.height;

            var ctx = this.Graph.getContext("2d");
            var step = this.Graph.width / this.cntInt;
            for (var i = 0; i < this.cntInt; i++) {
                if (i % 2 == 0) {
                    ctx.fillStyle = "#F1F7FB";
                } else {
                    ctx.fillStyle = "#FFFFFF";
                }
                ctx.fillRect(i * step, 0, (i + 1) * step, this.height);
            }
            step = this.height / this.cntStep;
            ctx.strokeStyle = '#DBDFE4';
            ctx.beginPath();
            for (var i = 1; i <= this.cntStep; i++) {
                ctx.moveTo(0, i * step);
                ctx.lineTo(this.width, i * step);
                ctx.stroke();
            }
        },
        drawLeftLegend: function (min, max, fix) {
            this.leftLegend.height = this.height;
            var step = (max - min) / this.cntStep;
            for (var i = 0; i < this.cntStep; i++) {
                var val = min + i * step;
                var py = this.height - (val - min) / (max - min) * this.height;
                var d = document.createElement('div');
                d.innerHTML = val.toFixed(fix).toString();
                d.style.position = "absolute";
                d.style.color = "black";
                d.style.right = "0px";
                d.style.top = (py - 10) + "px";
                d.style.fontSize = "8pt";
                this.leftLegend.appendChild(d);
            }
        },
        drawRightLegend: function (min, max, fix) {
            this.rightLegend.height = this.height;
            var step = (max - min) / this.cntStep;
            for (var i = 0; i < this.cntStep; i++) {
                var val = min + i * step;
                var py = this.height - (val - min) / (max - min) * this.height;
                var d = document.createElement('div');
                d.innerHTML = val.toFixed(fix).toString();
                d.style.position = "absolute";
                d.style.color = "black";
                d.style.left = "0px";
                d.style.top = (py - 10) + "px";
                d.style.fontSize = "8pt";
                this.rightLegend.appendChild(d);
            }
        },               
        drawLine: function (arr, color, xs, ys, flag, level) {
            var zero_pos = (this.xds - this.xs) / (this.xe-this.xs) * this.width;
            var data_length = (this.xde - this.xds) / (this.xe - this.xs) * this.width;
            var ctx = this.Graph.getContext("2d");
            ctx.beginPath();
            if (flag) {
                ctx.setLineDash([5]);
            } else {
                ctx.setLineDash([]);
            }            
            ctx.strokeStyle = color;
            //ctx.moveTo(zero_pos + (arr[0].x / xs) * this.width, ((ys - arr[0]).y / ys) * this.height);
            ctx.moveTo(zero_pos + (arr[0].x / xs) * data_length, ((ys - arr[0]).y / ys) * this.height);
            for (var i = 1; i < arr.length; i++) {
                ctx.lineTo(zero_pos+(arr[i].x / xs) * data_length, ((ys - arr[i].y) / ys) * this.height);
            }
            ctx.stroke();
            ctx.font = "8px Arial ";
            var ik = (arr.length / 2) | 0;
            ctx.fillStyle = 'black';
            ctx.fillText(level, zero_pos + (arr[ik].x / xs) * data_length, ((ys - arr[ik].y) / ys) * this.height);
        },
        drawPolygon: function (arr, color, xs, ys, flag, level) {
            var zero_pos = (this.xds - this.xs) / (this.xe - this.xs) * this.width;
            var data_length = (this.xde - this.xds) / (this.xe - this.xs) * this.width;
            var ctx = this.Graph.getContext("2d");
            ctx.beginPath();            
            ctx.strokeStyle = color;
            ctx.moveTo(zero_pos + ((arr[0].x - 1) / (xs - 2)) * data_length, (((ys - 1) - arr[0]).y / (ys - 2)) * this.height);
            for (var i = 1; i < arr.length; i++) {
                ctx.lineTo(zero_pos + ((arr[i].x - 1) / (xs - 2)) * data_length, (((ys - 1) - arr[i].y) / (ys - 2)) * this.height);
            }
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        },
        createGraphMeteoTmp: function (pnt, url, up) {
            //http://10.8.6.103:6080/arcgis/rest/services/gettmpisobaric/GPServer/gettmpisobaric
            var gp = new esri.tasks.Geoprocessor(url);
            var td = new Date(this.xs);
            var ds = td.getUTCFullYear() + ("0" + (td.getUTCMonth() + 1)).slice(-2) + ("0" + td.getUTCDate()).slice(-2) + ("0" + td.getUTCHours()).slice(-2);
            td = new Date(this.xe);
            var de = td.getUTCFullYear() + ("0" + (td.getUTCMonth() + 1)).slice(-2) + ("0" + td.getUTCDate()).slice(-2) + ("0" + td.getUTCHours()).slice(-2);
            var params = { "lon": pnt.x, "lat": pnt.y, "srid": pnt.spatialReference.wkid.toString(), "sDate": ds, "eDate": de, "up": up };
            gp.submitJob(params, completeWRFTask, null);
            var papa = { Value: this, up: up };
            function completeWRFTask(jobInfo) {
                gp.getResultData(jobInfo.jobId, "result",
                    function (gpLayer) {
                        var k = -1;
                        var level = -1;
                        var minT = -273, maxT = 273;
                        var minD = 0, maxD = 0;

                        var obj = gpLayer.value.split(/[:{}\[\],]/);
                        var obj2 = [];
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i].indexOf("TMP") > -1) { this.arrT = new Array(0); obj2 = this.arrT; k = -1; }
                            if (obj[i].indexOf("RH") > -1) { this.arrP = new Array(0); obj2 = this.arrP; k = -1; }
                            if (obj[i].indexOf("minT") > -1) { minT = parseFloat(obj[i + 1]); }
                            if (obj[i].indexOf("maxT") > -1) { maxT = parseFloat(obj[i + 1]); }
                            if (obj[i].indexOf("minD") > -1) {
                                minD = Date.UTC(+obj[i + 1].substring(1, 5), +obj[i + 1].substring(5, 7) - 1, +obj[i + 1].substring(7, 9), +obj[i + 1].substring(9, 11), 0, 0, 0) - 10800000;
                            }
                            if (obj[i].indexOf("maxD") > -1) {
                                maxD = Date.UTC(+obj[i + 1].substring(1, 5), +obj[i + 1].substring(5, 7) - 1, +obj[i + 1].substring(7, 9), +obj[i + 1].substring(9, 11), 0, 0, 0) - 10800000;
                            }

                            if (obj[i].indexOf("level") > -1) {
                                if (obj[i + 1] != level) {
                                    level = obj[i + 1];
                                    k = 0;
                                }
                            }
                            if (obj[i].indexOf("Value") > -1) {
                                if ((obj2.length - 1) < k) {
                                    obj2.push([]);
                                }
                                obj2[k].push(parseFloat(obj[i + 1]));
                                k++;
                            }
                        }
                        papa.Value.xds = minD;
                        papa.Value.xde = maxD;

                        if (this.arrP != null) {
                            obj2 = this.arrP;

                            var cliff = -1000;

                            obj2.push(d3.range(obj2[0].length).map(function () { return cliff; }));
                            obj2.unshift(d3.range(obj2[0].length).map(function () { return cliff; }));
                            obj2.forEach(function (d) {
                                d.push(cliff);
                                d.unshift(cliff);
                            });

                            var c = new Conrec, xs = d3.range(0, obj2.length), ys = d3.range(0, obj2[0].length), zs = d3.range(0, 100, 5),
                                width = papa.Value.width, height = papa.Value.height,
                                x = d3.scale.linear().range([0, width]).domain([0, obj2.length]),
                                y = d3.scale.linear().range([height, 0]).domain([0, obj2[0].length]),
                                colours = d3.scale.linear().domain([0, 100]).range(["#FFCCFF", "#0033FF"]);

                            c.contour(obj2, 0, xs.length - 1, 0, ys.length - 1, xs, ys, zs.length, zs);

                            var aaaa = c.contourList();
                            for (var i = 0; i < aaaa.length; i++) {
                                if ((aaaa[i].level % 4) == 0) {
                                    papa.Value.drawPolygon(aaaa[i], colours(aaaa[i].level), xs.length, ys.length - 1, true, aaaa[i].level);
                                } else {
                                    papa.Value.drawPolygon(aaaa[i], colours(aaaa[i].level), xs.length, ys.length - 1, false, aaaa[i].level);
                                }
                            }
                            if (papa.up > 800) {
                                papa.Value.drawLeftLegend(1000, 800, 0);
                                papa.Value.drawRightLegend(1000, 800, 0);
                            } else {
                                papa.Value.drawLeftLegend(800, 50, 0);
                                papa.Value.drawRightLegend(800, 50, 0);
                            }
                        }
                        
                        if (this.arrT != null) {
                            obj2 = this.arrT;
                            /*
                            var cliff = -1000;
    
                            obj2.push(d3.range(obj2[0].length).map(function () { return cliff; }));
                            obj2.unshift(d3.range(obj2[0].length).map(function () { return cliff; }));
                            obj2.forEach(function (d) {
                                d.push(cliff);
                                d.unshift(cliff);
                            });
                            */
                            var minv = parseInt(minT - 0.5);
                            minv = (minv % 2 == 0) ? minv : minv - 1;
                            var maxv = parseInt(maxT + 0.5);
                            maxv = (maxv % 2 == 0) ? maxv : maxv + 1;
                            var c = new Conrec,
                                xs = d3.range(0, obj2.length),
                                ys = d3.range(0, obj2[0].length),                                
                                zs = d3.range(minv, maxv, 2),
                                width = papa.Value.width,
                                height = papa.Value.height,
                                x = d3.scale.linear().range([0, width]).domain([0, obj2.length]),
                                y = d3.scale.linear().range([height, 0]).domain([0, obj2[0].length]),
                                colours = d3.scale.linear().domain([minv, maxv]).range(["#fff", "red"]);

                            c.contour(obj2, 0, xs.length - 1, 0, ys.length - 1, xs, ys, zs.length, zs);

                            var aaaa = c.contourList();
                            for (var i = 0; i < aaaa.length; i++) {
                                if ((aaaa[i].level % 4) == 0) {
                                    papa.Value.drawLine(aaaa[i], 'red', xs.length, ys.length - 1, true, aaaa[i].level);
                                } else {
                                    papa.Value.drawLine(aaaa[i], 'red', xs.length, ys.length - 1, false, aaaa[i].level);
                                }
                            }
                            if (papa.up > 800) {
                                papa.Value.drawLeftLegend(1000, 800, 0);
                                papa.Value.drawRightLegend(1000, 800, 0);
                            } else {
                                papa.Value.drawLeftLegend(800, 50, 0);
                                papa.Value.drawRightLegend(800, 50, 0);
                            }
                        }
                        papa.Value.LoadIcon.style.display = 'none';
                        k = 9;
                    },
                    function (gpLayer) {
                        var k = 9;
                    })
            }
        },
        createGraphMeteoTmp2: function (pnt, url, up) {
            //http://10.8.6.103:6080/arcgis/rest/services/gettmpisobaric/GPServer/gettmpisobaric
            var gp = new esri.tasks.Geoprocessor(url);
            var td = new Date(this.xs);
            var ds = td.getUTCFullYear() + ("0" + (td.getUTCMonth() + 1)).slice(-2) + ("0" + td.getUTCDate()).slice(-2) + ("0" + td.getUTCHours()).slice(-2);
            td = new Date(this.xe);
            var de = td.getUTCFullYear() + ("0" + (td.getUTCMonth() + 1)).slice(-2) + ("0" + td.getUTCDate()).slice(-2) + ("0" + td.getUTCHours()).slice(-2);
            var params = { "lon": pnt.x, "lat": pnt.y, "srid": pnt.spatialReference.wkid.toString(), "sDate": ds, "eDate": de, "up": up };
            gp.submitJob(params, completeWRFTask, null);
            var papa = { Value: this, up: up };
            function completeWRFTask(jobInfo) {
                gp.getResultData(jobInfo.jobId, "result",
                    function (gpLayer) {
                    var k = -1;
                    var level = -1;
                    var minT = -273, maxT = 273;
                    var minD = 0, maxD = 0;

                    var obj = gpLayer.value.split(/[:{}\[\],]/);
                    var obj2 = [];
                    for (var i = 0; i < obj.length; i++) {
                        if (obj[i].indexOf("TMP") > -1) { papa.Value.arrT = new Array(0); obj2 = papa.Value.arrT; k = -1; }
                        if (obj[i].indexOf("RH") > -1) { papa.Value.arrP = new Array(0); obj2 = papa.Value.arrP; k = -1; }
                        if (obj[i].indexOf("minT") > -1) { minT = parseFloat(obj[i + 1]); }
                        if (obj[i].indexOf("maxT") > -1) { maxT = parseFloat(obj[i + 1]); }
                        if (obj[i].indexOf("minD") > -1) {
                            minD = Date.UTC(+obj[i + 1].substring(1, 5), +obj[i + 1].substring(5, 7) - 1, +obj[i + 1].substring(7, 9), +obj[i + 1].substring(9, 11), 0, 0, 0) - 10800000;
                        }
                        if (obj[i].indexOf("maxD") > -1) {
                            maxD = Date.UTC(+obj[i + 1].substring(1, 5), +obj[i + 1].substring(5, 7) - 1, +obj[i + 1].substring(7, 9), +obj[i + 1].substring(9, 11), 0, 0, 0) - 10800000;
                        }
                        if (obj[i].indexOf("Date") > -1) { obj2.push([]); k++; }
                        if (obj[i].indexOf("Value") > -1) { obj2[k].push(parseFloat(obj[i + 1])); }
                    }
                    papa.Value.xds = minD;
                    papa.Value.xde = maxD;

                    if (papa.Value.arrP != null) {
                        obj2 = papa.Value.arrP;

                        var cliff = -1000;

                        obj2.push(d3.range(obj2[0].length).map(function () { return cliff; }));
                        obj2.unshift(d3.range(obj2[0].length).map(function () { return cliff; }));
                        obj2.forEach(function (d) {
                            d.push(cliff);
                            d.unshift(cliff);
                        });

                        var c = new Conrec, xs = d3.range(0, obj2.length), ys = d3.range(0, obj2[0].length), zs = d3.range(0, 100, 5),
                            width = papa.Value.width, height = papa.Value.height,
                            x = d3.scale.linear().range([0, width]).domain([0, obj2.length]),
                            y = d3.scale.linear().range([height, 0]).domain([0, obj2[0].length]),
                            colours = d3.scale.linear().domain([0, 100]).range(["#FFCCFF", "#0033FF"]);

                        c.contour(obj2, 0, xs.length - 1, 0, ys.length - 1, xs, ys, zs.length, zs);

                        var aaaa = c.contourList();
                        for (var i = 0; i < aaaa.length; i++) {
                            if ((aaaa[i].level % 4) == 0) {
                                papa.Value.drawPolygon(aaaa[i], colours(aaaa[i].level), xs.length, ys.length - 1, true, aaaa[i].level);
                            } else {
                                papa.Value.drawPolygon(aaaa[i], colours(aaaa[i].level), xs.length, ys.length - 1, false, aaaa[i].level);
                            }
                        }
                        if (papa.up > 800) {
                            papa.Value.drawLeftLegend(1000, 800, 0);
                            papa.Value.drawRightLegend(1000, 800, 0);
                        } else {
                            papa.Value.drawLeftLegend(800, 50, 0);
                            papa.Value.drawRightLegend(800, 50, 0);
                        }
                    }
                        
                    if (papa.Value.arrT != null) {
                        obj2 = papa.Value.arrT;
                        /*
                        var cliff = -1000;

                        obj2.push(d3.range(obj2[0].length).map(function () { return cliff; }));
                        obj2.unshift(d3.range(obj2[0].length).map(function () { return cliff; }));
                        obj2.forEach(function (d) {
                            d.push(cliff);
                            d.unshift(cliff);
                        });
                        */
                        var minv = parseInt(minT - 0.5);
                        minv = (minv % 2 == 0) ? minv : minv - 1;
                        var maxv = parseInt(maxT + 0.5);
                        maxv = (maxv % 2 == 0) ? maxv : maxv + 1;
                        var c = new Conrec,
                            xs = d3.range(0, obj2.length),
                            ys = d3.range(0, obj2[0].length),                                
                            zs = d3.range(minv, maxv, 2),
                            width = papa.Value.width,
                            height = papa.Value.height,
                            x = d3.scale.linear().range([0, width]).domain([0, obj2.length]),
                            y = d3.scale.linear().range([height, 0]).domain([0, obj2[0].length]),
                            colours = d3.scale.linear().domain([minv, maxv]).range(["#fff", "red"]);

                        c.contour(obj2, 0, xs.length - 1, 0, ys.length - 1, xs, ys, zs.length, zs);

                        var aaaa = c.contourList();
                        for (var i = 0; i < aaaa.length; i++) {
                            if ((aaaa[i].level % 4) == 0) {
                                papa.Value.drawLine(aaaa[i], 'red', xs.length, ys.length - 1, true, aaaa[i].level);
                            } else {
                                papa.Value.drawLine(aaaa[i], 'red', xs.length, ys.length - 1, false, aaaa[i].level);
                            }
                        }
                        if (papa.up > 800) {
                            papa.Value.drawLeftLegend(1000, 800, 0);
                            papa.Value.drawRightLegend(1000, 800, 0);
                        } else {
                            papa.Value.drawLeftLegend(800, 50, 0);
                            papa.Value.drawRightLegend(800, 50, 0);
                        }
                    }
                    papa.Value.LoadIcon.style.display = 'none';
                    k = 9;
                },
                    null)
            }
        }        
    });

    dojo.declare( 'dcrscplaneta.clsInfo', [dijit._Widget, dijit._Templated], {
        templateString: '<div class="stationInfo" >'+
                            '<div data-dojo-attach-point="dInfo" style="width:500px; height:40px">'+
                                '<div data-dojo-attach-point="stInfo" style="width:500px; height:40px">' +
                                    'Станция: <span data-dojo-attach-point="stName"></span><br>'+
                                    'Индекс: <span data-dojo-attach-point="stIndex"></span><br>'+
                                '</div>'+
                                '<div data-dojo-attach-point="dArea" style="width:500px; height:40px">' +
                                    'Местоположение: <span data-dojo-attach-point="stPosArea"></span>'+
                                '</div>' +
                                '<div data-dojo-attach-point="dAreaLL" style="position:absolute; left: 400px; top:20px; width:100px; height:20px;"></div>' +
                            '</div>'+
                            '<div data-dojo-attach-point="dGraph" dojoAttachEvent="onMouseMove:mouseMove" '+
                                'style="position:relative; width:500px; height:860px; background-color:white;">'+ //height = height - height_info
                                '<div data-dojo-attach-point="dGraphs" style="position:absolute; top:25px; left:0px; height:810px; width:500px; background-color:white; overflow-y:auto;"></div>'+//height - height_info - height_dates*2
                                '<div data-dojo-attach-point="dDatesT" style="position:absolute; top:0px; left:0px; height:22px; width:500px; background-color:white;"></div>'+
                                '<div data-dojo-attach-point="dDatesB" style="position:absolute; bottom:0px; left:0px; height:22px; width:500px; background-color:white;"></div>'+
                                '<div data-dojo-attach-point="dLine"   style="position:absolute; top:22px;width:1px; height:816px;  left:0px; background-color:orange; display:none"></div>'+//height - height_info - height_dates*2
                            '</div>'+
                        '</div>',
        parent: undefined,
        xTimes: [],
        Graphs: [],
        setHeight: function(nHeight) {
            this.dGraph.style.height = (nHeight - 40) + 'px';
            this.dGraphs.style.height = (nHeight - 90) + 'px';
            this.dLine.style.height = (nHeight - 84) + 'px';
        },
        postCreate: function () {
            //add labels for every other time stop
            var step = (430) / 24; // width(500) - width_scr(20) - width_graph_val(25)*2
            var sDate = Date.UTC(2015, 03, 7, 00, 0, 0, 0);
            this.xTimes = [];
            for (var i = 0; i < 25; i++) {
                var endT = new Date(sDate + i * 3 * 3600000);
                this.xTimes.push(endT.getTime());
                if (i % 2 === 0) {                    
                    var dd = '<p class="thick">' + ("0" + endT.getUTCDate()).slice(-2) + "." + ("0" + (endT.getUTCMonth() + 1)).slice(-2) + '</p><p class="normal">' + ("0" + endT.getUTCHours()).slice(-2) + ":00</p>";
                    var d = document.createElement('div');
                    d.innerHTML = dd;
                    d.style.position = "absolute";
                    d.style.color = (i % 4 == 0) ? "black" : "gray";
                    d.style.left = (12 + i * step) + "px";
                    d.style.top = "0px";
                    d.style.fontSize = "8pt";
                    this.dDatesT.appendChild(d);

                    var dd = '<p class="normal">' + ("0" + endT.getUTCHours()).slice(-2) + ':00</p><p class="thick">' + ("0" + endT.getUTCDate()).slice(-2) + "." + ("0" + (endT.getUTCMonth() + 1)).slice(-2) + '</p>';
                    var d = document.createElement('div');
                    d.innerHTML = dd;
                    d.style.position = "absolute";
                    d.style.color = (i % 4 == 0) ? "black" : "gray";
                    d.style.left = (12 + i * step) + "px";
                    d.style.bottom = "0px";
                    d.style.fontSize = "8pt";
                    this.dDatesB.appendChild(d);
                }
            }            
        },
        setDateInt: function (startDate, Int) {
            // clear old
            while (this.dDatesT.firstChild) this.dDatesT.removeChild(this.dDatesT.firstChild);
            while (this.dDatesB.firstChild) this.dDatesB.removeChild(this.dDatesB.firstChild);
            this.xTimes = [];
            //add labels for every other time stop
            var step = (430) / 24; // width(500) - width_scr(20) - width_graph_val(25)*2
            var sDate = startDate
            this.xTimes = [];
            for (var i = 0; i < 25; i++) {
                var endT = new Date(sDate + i * Int * 3600000);
                this.xTimes.push(endT.getTime());
                if (i % 2 === 0) {
                    var dd = '<p class="thick">' + ("0" + endT.getUTCDate()).slice(-2) + "." + ("0" + (endT.getUTCMonth() + 1)).slice(-2) + '</p><p class="normal">' + ("0" + endT.getUTCHours()).slice(-2) + ":00</p>";
                    var d = document.createElement('div');
                    d.innerHTML = dd;
                    d.style.position = "absolute";
                    d.style.color = (i % 4 == 0) ? "black" : "gray";
                    d.style.left = (12 + i * step) + "px";
                    d.style.top = "0px";
                    d.style.fontSize = "8pt";
                    this.dDatesT.appendChild(d);

                    var dd = '<p class="normal">' + ("0" + endT.getUTCHours()).slice(-2) + ':00</p><p class="thick">' + ("0" + endT.getUTCDate()).slice(-2) + "." + ("0" + (endT.getUTCMonth() + 1)).slice(-2) + '</p>';
                    var d = document.createElement('div');
                    d.innerHTML = dd;
                    d.style.position = "absolute";
                    d.style.color = (i % 4 == 0) ? "black" : "gray";
                    d.style.left = (12 + i * step) + "px";
                    d.style.bottom = "0px";
                    d.style.fontSize = "8pt";
                    this.dDatesB.appendChild(d);
                }
            }
        },
        mouseMove: function (evt) {
            var a = evt.currentTarget.getBoundingClientRect();
            this.dLine.style.left = evt.clientX - parseInt(this.parent.style.left) + "px";            
            if ((parseInt(this.dLine.style.left) < 25) || (parseInt(this.dLine.style.left) > 455)) {
                this.dLine.style.display = 'none';
            }
            else {
                this.dLine.style.display = "block";
            }
            var kk = evt.clientY - parseInt(this.parent.style.top) + this.dGraphs.scrollTop - 40 -25;
            for (var i = 0; i < this.Graphs.length; i++) {
                this.Graphs[i].ShowVal(evt.clientX - parseInt(this.parent.style.left), kk);
                kk -= this.Graphs[i].height + this.Graphs[i].lheight;
            }
        },
        megaGraph: function (event) {
            function ToGeographic(mercatorX_lon, mercatorY_lat, out)
            {
                if (Math.abs(mercatorX_lon) < 180 && Math.abs(mercatorY_lat) < 90)
                    return;

                if ((Math.abs(mercatorX_lon) > 20037508.3427892) || (Math.abs(mercatorY_lat) > 20037508.3427892))
                    return;

                var x = mercatorX_lon;
                var y = mercatorY_lat;
                var num3 = x / 6378137.0;
                var num4 = num3 * 57.295779513082323;
                var num5 = Math.floor((num4 + 180.0) / 360.0);
                var num6 = num4 - (num5 * 360.0);
                var num7 = 1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * y) / 6378137.0)));
                out.x = num6;
                out.y = num7 * 57.295779513082323;
            }
            //identify
            var identifyTask = new esri.tasks.IdentifyTask(ip_serv + "arcgis/rest/services/attrib/identmap/MapServer");
            var identifyParams = new esri.tasks.IdentifyParameters()
            identifyParams.tolerance = 3;
            identifyParams.returnGeometry = true;
            identifyParams.layerIds = [0,1];
            identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
            identifyParams.width = map.width;
            identifyParams.height = map.height;

            identifyParams.geometry = event.mapPoint;
            identifyParams.mapExtent = map.extent;
            var papa = { Value: this };
            identifyTask.execute(identifyParams, function (idResults) {
                if (idResults.length > 0) {
                    if (idResults[0].layerId == 0) {
                        papa.Value.stName.innerHTML = idResults[0].feature.attributes.name;
                        papa.Value.stIndex.innerHTML = idResults[0].feature.attributes.id;
                        papa.Value.stInfo.style.display = 'block';
                        papa.Value.dArea.style.display = 'none';                        
                    } else {
                        papa.Value.stPosArea.innerHTML = idResults[0].feature.attributes.NA2_DESC_1 +
                            ((idResults[0].feature.attributes.Name_adm_1 === " ") ? '' : ', ' + idResults[0].feature.attributes.Name_adm_1) +
                            ((idResults[0].feature.attributes.Name_adm_2 === " ") ? '' : ', ' + idResults[0].feature.attributes.Name_adm_2);
                        papa.Value.stInfo.style.display = 'none';
                        papa.Value.dArea.style.display = 'block';
                    }
                    var reflat = { x: 0, y: 0 };
                    var latitude = event.mapPoint.getLatitude();
                    var longitude = event.mapPoint.getLongitude();
                    //ToGeographic(event.mapPoint.x, event.mapPoint.y, reflat);
                    papa.Value.dAreaLL.innerHTML = longitude.toFixed(2).toString() + ', ' + latitude.toFixed(2).toString();
                }
                
            }, null);
            
            // Clear old
            this.Graphs = [];
            while (this.dGraphs.firstChild) {
                this.dGraphs.removeChild(this.dGraphs.firstChild);
            }
            var Graph = new dcrscplaneta.clsGraph({ width: 480, height: 100, lheight: 30, xs: this.xTimes[0], xe: this.xTimes[this.xTimes.length - 1]});
            Graph.PrepareGraph();
            this.Graphs.push(Graph);
            Graph.createMeteoGraphFromUrl(event.mapPoint, ip_serv + "arcgis/rest/services/geoproc/getmeteoground/GPServer/getmeteoground");
            this.dGraphs.appendChild(Graph.domNode);

            var GraphM = new dcrscplaneta.clsGraph({ width: 480, height: 100, lheight: 30, xs: this.xTimes[0], xe: this.xTimes[this.xTimes.length - 1] });
            GraphM.PrepareGraph();
            this.Graphs.push(GraphM);
            GraphM.createMeteo2GraphFromUrl(event.mapPoint, ip_serv + "arcgis/rest/services/geoproc/getmeteo2ground/GPServer/getmeteo2ground");
            this.dGraphs.appendChild(GraphM.domNode);
                        
            var Graph2 = new dcrscplaneta.clsGraphContour({ width: 480, height: 400, cntStep: 16, xs: this.xTimes[0], xe: this.xTimes[this.xTimes.length - 1] });            
            Graph2.PrepareGraph();
            this.Graphs.push(Graph2);
            Graph2.createGraphMeteoTmp2(event.mapPoint, ip_serv + "arcgis/rest/services/geoproc/gettmpisobaric2/GPServer/gettmpisobaric2", 500)
            this.dGraphs.appendChild(Graph2.domNode);

            var Graph3 = new dcrscplaneta.clsGraphContour({ width: 480, height: 225, cntStep: 9, xs: this.xTimes[0], xe: this.xTimes[this.xTimes.length - 1] });
            Graph3.PrepareGraph();
            this.Graphs.push(Graph3);            
            Graph3.createGraphMeteoTmp2(event.mapPoint, ip_serv + "arcgis/rest/services/geoproc/gettmpisobaric2/GPServer/gettmpisobaric2", 950)
            this.dGraphs.appendChild(Graph3.domNode);
            
        }
    });
}