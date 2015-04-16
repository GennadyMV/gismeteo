function testKey(e) {
    // Make sure to use event.charCode if available
    var key = (typeof e.charCode == 'undefined' ? e.keyCode : e.charCode);

    // Ignore special keys
    if (e.ctrlKey || e.altKey || key < 32)
        return true;

    key = String.fromCharCode(key);
    return /\d/.test(key);
}
dojo.require("dojo.parser");
dojo.require("dijit.form.DateTextBox");
dojo.require("esri.TimeExtent");


function initTimeSlider(objSet) {
    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32) return null;
            return String.fromCharCode(event.keyCode) // IE
        }
        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32) return null;
            return String.fromCharCode(event.which)   // остальные
        }
        return null; // специальная клавиша
    }
    function zxcAnimate(mde, obj, smeh, papa, srt) {
        this.to = null;
        this.obj = obj;
        this.mde = mde.replace(/\W/g, '');
        this.data = [srt || 0];
        this.smeh = smeh;
        this.papa = papa;
        return this;
    }
    zxcAnimate.prototype.animate = function (srt, fin, ms, scale, c) {
        clearTimeout(this.to);
        this.time = ms || this.time || 0;
        this.neg = srt < 0 || fin < 0;
        this.data = [srt, srt, fin];
        this.mS = this.time * (!scale ? 1 : Math.abs((fin - srt) / (scale[1] - scale[0])));
        this.c = typeof (c) == 'string' ? c.charAt(0).toLowerCase() : this.c ? this.c : '';
        this.inc = Math.PI / (2 * this.mS);
        this.srttime = new Date().getTime();
        this.cng();
    }
    zxcAnimate.prototype.cng = function () {
        var oop = this, ms = new Date().getTime() - this.srttime;
        this.data[0] = (this.c == 's') ? (this.data[2] - this.data[1]) * Math.sin(this.inc * ms) + this.data[1] : (this.c == 'c') ? this.data[2] - (this.data[2] - this.data[1]) * Math.cos(this.inc * ms) : (this.data[2] - this.data[1]) / this.mS * ms + this.data[1];
        this.apply();
        if (ms < this.mS) this.to = setTimeout(function () { oop.cng() }, 10);
        else {
            this.data[0] = this.data[2];
            this.apply();
            if (this.Complete) this.Complete(this);
        }
    }
    zxcAnimate.prototype.apply = function () {
        if (isFinite(this.data[0])) {
            if (this.data[0] < 0 && !this.neg) this.data[0] = 0;
            this.obj.style[this.mde] = Math.floor(this.data[0]) + 'px';
        }
    }
    zxcAnimate.prototype.Complete = function () { if (this.smeh != 0) this.papa.reinit(this.smeh); }

    dojo.declare('fesrcplaneta.timeSlider', [dijit._Widget, dijit._Templated], {
        templateString: '<div class="trest" style="position:relative; width:100%; height:100%" onSelectStart="return false">' +
                            '<div class="CommonBorder BackgroundBorder trest2" style="position:absolute; left:30px; width:561px; height:40px; padding: 5px;">' +
                                'скорость' +
                                '<span title="Скорость анимации в секундах" style="position:relative; border-radius:5px; border:1px solid black; padding:0px 5px 1px 5px; margin-left:10px; margin-right:10px; background:white; cursor: pointer;" alt="Скорость анимации в секундах">' +
                                    '<span data-dojo-attach-point="dSpeed" style="width:30px; display:inline-block; font-size:14px;" dojoAttachEvent="onClick:showMenuS">1</span>' +                                        
                                        '<div data-dojo-attach-point="dMenuS" class="selectOptions" dojoAttachEvent="onMouseMove:hideMenuS" style=" left:-1px; top:-1px; background:white; font-size:14px; height:80px; width:40px; border-radius:5px; border:1px solid black;">' +
                                            '<span dojoAttachEvent="onClick:setSpeed" class="selectOption"> 1</span>' +
                                            '<span dojoAttachEvent="onClick:setSpeed" class="selectOption"> 2</span>' +
                                            '<span dojoAttachEvent="onClick:setSpeed" class="selectOption"> 5</span>' +
                                            '<span dojoAttachEvent="onClick:setSpeed" class="selectOption">10</span>' +
                                            '<span dojoAttachEvent="onClick:setSpeed" class="selectOption">30</span>' +
                                        '</div>' +
                                '</span>' +                        
                                'дата:' + 
                                '<input data-dojo-attach-point="selDate" type="text" class="tbwc" style="border-radius:5px; border:1px solid black; padding:2px 5px; width:107px; margin-left:10px; margin-right:10px;" value="____-__-__ __:__"' +                                           
                                    'data-dojo-attach-event="onkeypress:Edok"/>' +                                    
                                'интервал' +
                                '<span title="Время между сроками" style="position:relative; border-radius:5px; border:1px solid black; padding:0px 5px 1px 5px; height:16px; margin-left:10px; margin-right:10px; background:white; cursor: pointer;" alt="Скорость анимации в секундах">' +
                                    '<span data-dojo-attach-point="dInt" style="width:60px; display:inline-block; font-size:14px;" dojoAttachEvent="onClick:showMenuI">1 час</span>' +
                                        '<div data-dojo-attach-point="dMenuI" class="selectOptions" dojoAttachEvent="onMouseMove:hideMenuI" style=" left:-1px; top:-1px; background:white; font-size:14px; height:80px; width:70px; border-radius:5px; border:1px solid black;">' +
                                            '<span dojoAttachEvent="onClick:setInt" class="selectOption">1 час</span>' +
                                            '<span dojoAttachEvent="onClick:setInt" class="selectOption">3 часа</span>' +
                                            '<span dojoAttachEvent="onClick:setInt" class="selectOption">6 часов</span>' +
                                            '<span dojoAttachEvent="onClick:setInt" class="selectOption">12 часов</span>' +
                                            '<span dojoAttachEvent="onClick:setInt" class="selectOption">24 часа</span>' +
                                        '</div>' +
                                '</span>' +                           
                                '<img src="images/icons/redo_i.png" style="width:25px; height:22px; margin-left:10px; margin-bottom:-6px; cursor:pointer;"' +
                                    'data-dojo-attach-event="onclick:Update"/>' +
                            '</div>' +
                            '<div class="CommonBorder BackgroundBorder" style="position:absolute; top:0px; left:0px; width:100%; height:50px; padding: 10px 0px 0px 0px; margin:0px;">' +
                                '<table style="width:100%; table-layout: fixed;">' +
                                    '<col style="width: 20px;"/><col style="width: auto;"/><col style="width: 20px;"/>' +
                                    '<tr>' +
                                        //'<td colspan="3" style="text-align:center">' +
                                        //    
                                        //'</td>' +
                                    //'</tr><tr>' +
                                        '<td>' +
                                            '<div style="width:20px; height:20px; background-image:url(images/addicon/btn_dleft.png);" data-dojo-attach-event="onclick:moveLeft"></div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div style="position:relative; overflow:hidden; width:100%; height:50px;"' +
                                                'data-dojo-attach-event="onmousemove:slMove, onmouseup:slendDrag">' +
                                                '<div style="position:absolute; top:6px; left:-1px; border:1px solid black; width:101%; height:4px; cursor:pointer; z-index:30"'+
                                                    'data-dojo-attach-event="onclick:sltoMove"></div>' +
                                                '<div data-dojo-attach-point="sluk" style="position:absolute; margin-left:-10px; top:0px; left:50%; width:20px; height:24px; background-image:url(images/addicon/play.png); z-index:31;"' +
                                                    'data-dojo-attach-event="onmousedown:slstartMove, ondblclick:slstartPlay"></div>' +
                                                '<div data-dojo-attach-point="rules" style="position:relative; left:-50%; width:200%; height:100%;">' +
                                                // insert Lines and Labels
                                                '</div>' +                                                
                                            '</div>' +
                                        '</td>' +
                                        '<td>' +
                                            '<div style="width:20px; height:20px; background-image:url(images/addicon/btn_dright.png);" data-dojo-attach-event="onclick:moveRight"></div>' +
                                        '</td>' +
                                    '</tr>' +
                                '</table>' +
                            '</div>' +
                            '<div style="position:absolute; top:0; left:0; width:100%; height:20px; cursor:move;" data-dojo-attach-event="onmousedown:initDrag, onmouseup:stopdrag"></div>' +
                        '</div>',
        inpval: "2014010203",//"________",
        inpint: 1,
        Edok: function (e) {
            var krok = e.currentTarget.selectionStart;
            var key = (typeof e.charCode == 'undefined' ? e.keyCode : e.charCode);
            if (e.ctrlKey || e.altKey || key < 32) {
                if ((e.keyCode == 37) || (e.keyCode == 39)) return;
                if (e.keyCode == 8) { //backspace
                    if ((krok == 5) || (krok == 8) || (krok == 11) || (krok == 14)) krok--;
                    if (krok > 0) {
                        if (krok < 5) {
                            this.inpval = this.inpval.substr(0, krok - 1) + "_" + this.inpval.substr(krok);
                        } else if (krok < 8) {
                            this.inpval = this.inpval.substr(0, krok - 2) + "_" + this.inpval.substr(krok - 1);
                        } else if (krok < 11) {
                            this.inpval = this.inpval.substr(0, krok - 3) + "_" + this.inpval.substr(krok - 2);
                        } else if (krok < 14) {
                            this.inpval = this.inpval.substr(0, krok - 4) + "_" + this.inpval.substr(krok - 3);
                        }
                        e.currentTarget.value = this.inpval.substr(0, 4) + "-" + this.inpval.substr(4, 2) + "-" + this.inpval.substr(6, 2) + " " + this.inpval.substr(8, 2) + ":00";
                        e.currentTarget.selectionStart = krok - 1;
                        e.currentTarget.selectionEnd = krok - 1;
                    }
                    dojo.stopEvent(e);
                    return;
                }
                if (e.keyCode == 46) { // delete
                    if ((krok == 4) || (krok == 7) || (krok == 10) || (krok == 13)) krok++;
                    if (krok < 4) {
                        this.inpval = this.inpval.substr(0, krok) + "_" + this.inpval.substr(krok + 1);
                    } else if (krok < 7) {
                        this.inpval = this.inpval.substr(0, krok - 1) + "_" + this.inpval.substr(krok);
                    } else if (krok < 10) {
                        this.inpval = this.inpval.substr(0, krok - 2) + "_" + this.inpval.substr(krok - 1);
                    } else if (krok < 13) {
                        this.inpval = this.inpval.substr(0, krok - 3) + "_" + this.inpval.substr(krok - 2);
                    }
                    e.currentTarget.value = this.inpval.substr(0, 4) + "-" + this.inpval.substr(4, 2) + "-" + this.inpval.substr(6, 2) + " " + this.inpval.substr(8, 2) + ":00";
                    e.currentTarget.selectionStart = krok + 1;
                    e.currentTarget.selectionEnd = krok + 1;
                    dojo.stopEvent(e);
                }
                dojo.stopEvent(e);
                return true;
            }

            key = String.fromCharCode(key);
            if (/\d/.test(key)) {
                if ((krok == 4) || (krok == 7) || (krok == 10) || (krok == 13)) krok++;
                if (krok < 4) {
                    this.inpval = this.inpval.substr(0, krok) + key + this.inpval.substr(krok + 1);
                } else if (krok < 7) {
                    this.inpval = this.inpval.substr(0, krok - 1) + key + this.inpval.substr(krok);
                } else if (krok < 10) {
                    this.inpval = this.inpval.substr(0, krok - 2) + key + this.inpval.substr(krok - 1);
                } else if (krok < 13) {
                    this.inpval = this.inpval.substr(0, krok - 3) + key + this.inpval.substr(krok - 2);
                }
                e.currentTarget.value = this.inpval.substr(0, 4) + "-" + this.inpval.substr(4, 2) + "-" + this.inpval.substr(6, 2) + " " + this.inpval.substr(8, 2) + ":00";
                e.currentTarget.selectionStart = krok + 1;
                e.currentTarget.selectionEnd = krok + 1;
                dojo.stopEvent(e);
                return;
            } else {
                alert(key);
            }
            dojo.stopEvent(e);
            return;

        },
        moveLeft: function () {
            var x = new zxcAnimate('left', this.rules, -1, this);
            var stPos = -this.rules.getBoundingClientRect().width / 4;
            var stEnd = stPos + 23.41666667;
            x.animate(stPos, stEnd, 500, null, 'sin');
        },
        moveRight: function () {
            var x = new zxcAnimate('left', this.rules, 1, this);
            var stPos = -this.rules.getBoundingClientRect().width / 4;
            var stEnd = stPos - 23.41666667;
            x.animate(stPos, stEnd, 500, null, 'sin');
        },
        cntInt: 25,
        startTime: 0,
        curSmeh: 0,
        labels: undefined,
        onchange : undefined,
        init: function () {
            this.startTime = new Date().getTime();
            var ttime = new Date(this.startTime);
            this.labels = [];

            for (var i = -24; i <= 24; i++) {
                var nruleMark = document.createElement('div');
                nruleMark.className = "fesrcplaneta_ruleMark"
                nruleMark.style.left = (i + 24) * 100.0 / 48.0 + "%";
                this.rules.appendChild(nruleMark);

                ttime = new Date(this.startTime + i * 3600000);
                var dd = ("0" + ttime.getUTCHours()).slice(-2) + ":00<br>" + ("0" + ttime.getUTCDate()).slice(-2) + "." + ("0" + (ttime.getUTCMonth() + 1)).slice(-2);

                var nruleLabel = document.createElement('div');
                nruleLabel.className = "fesrcplaneta_ruleLabel"
                nruleLabel.style.left = (i + 24)* 100.0 / 48.0 + "%";
                if (i % 2 == 0) {
                    nruleLabel.innerHTML = ("0" + ttime.getUTCHours()).slice(-2) + ":00<br>" + ("0" + ttime.getUTCDate()).slice(-2) + "." + ("0" + (ttime.getUTCMonth() + 1)).slice(-2);
                }
                this.rules.appendChild(nruleLabel);
                this.labels.push(nruleLabel);
            }

            this.inpval = ttime.getUTCFullYear() + ("0" + (ttime.getUTCMonth() + 1)).slice(-2) + ("0" + ttime.getUTCDate()).slice(-2) + ("0" + ttime.getUTCHours()).slice(-2);
            this.selDate.value = this.inpval.substr(0, 4) + "-" + this.inpval.substr(4, 2) + "-" + this.inpval.substr(6, 2) + " " + this.inpval.substr(8, 2) + ":00";
            //if (this.onchange != undefined) this.onchange();
        },
        reinit: function (smeh) {
            this.curSmeh = (this.curSmeh + (smeh % 2)) % 2;            
            this.startTime = this.startTime + smeh * this.inpint * 3600000;
            for (var i = -24; i <= 24; i++) {
                var ttime = new Date(this.startTime + i * this.inpint * 3600000);
                if ((i + this.curSmeh) % 2 == 0) this.labels[i + 24].innerHTML = ("0" + ttime.getUTCHours()).slice(-2) + ":00<br>" + ("0" + ttime.getUTCDate()).slice(-2) + "." + ("0" + (ttime.getUTCMonth() + 1)).slice(-2);
                else this.labels[i + 24].innerHTML = "";
            }
            this.rules.style.left = "-50%";
            var ttime = new Date(this.startTime);
            this.inpval = ttime.getUTCFullYear() + ("0" + (ttime.getUTCMonth() + 1)).slice(-2) + ("0" + ttime.getUTCDate()).slice(-2) + ("0" + ttime.getUTCHours()).slice(-2);
            this.selDate.value = this.inpval.substr(0, 4) + "-" + this.inpval.substr(4, 2) + "-" + this.inpval.substr(6, 2) + " " + this.inpval.substr(8, 2) + ":00";
            if (this.onchange != undefined) this.onchange();
        },
        Update: function (evt) {
            //this.selInterval;
            this.inpint = parseInt(this.dInt.innerHTML); //this.selInterval.options[this.selInterval.options.selectedIndex].value;
            if (this.inpval.indexOf("_") < 0 ) {
                this.startTime = Date.UTC(+this.inpval.substr(0, 4), (+this.inpval.substr(4, 2) - 1), +this.inpval.substr(6, 2), +this.inpval.substr(8, 2), 0, 0, 0);
                //this.inpval = this.selDate;
                this.reinit(0);
            }
            
        },
        move: false,
        sp: -1,
        play: false,
        slstartPlay: function (evt) {
            if (this.move != true) {
                if (this.play != true) {
                    this.play = true;
                    this.sluk.style.backgroundImage = "url(images/addicon/pause.png)";
                    var papa = {value: this};
                    function Play() {
                        if (papa.value.play) {
                            var ms = parseInt(papa.value.dSpeed.innerHTML * 1000);
                            var x = new zxcAnimate('left', papa.value.rules, 1, papa.value);
                            var stPos = -papa.value.rules.getBoundingClientRect().width / 4;
                            var stEnd = stPos - 23.41666667;
                            x.animate(stPos, stEnd, 500, null, 'sin');
                            setTimeout(Play, ms);
                        }
                    };
                    setTimeout(Play, 1000);
                } else {
                    this.play = false;
                    this.sluk.style.backgroundImage = "url(images/addicon/play.png)";
                }
            }
        },
        sltoMove: function (evt) {
            var a = evt.currentTarget.getBoundingClientRect();
            
            var stPos = evt.clientX - a.left - a.width / 2;// parseInt(this.sluk.style.left);
            stPos = parseInt(stPos / a.width * 24);            
            var y = new zxcAnimate('left', this.rules, stPos, this);
            var stPos1 = -a.width / 2;// + stPos;//parseInt(document.getElementById("tst").style.left);
            var stEnd1 = stPos1 + (-stPos * a.width/24);
            y.animate(stPos1, stEnd1, 500, null, 'sin');
        },
        slMove: function(evt) {
            if (this.move) {
                var a = evt.currentTarget.getBoundingClientRect();
                var nx = evt.clientX - a.left;
                this.sluk.style.left = (nx - this.sp) + 'px';
            }
        },
        slstartMove: function(evt) {
            if (this.move != true) {
                this.move = true;
                var a = evt.currentTarget.getBoundingClientRect();
                this.sp = evt.clientX - a.left - 10;
            }
        },
        slendDrag: function(evt) {
            if (this.move) {
                this.move = false;
                var a = evt.currentTarget.getBoundingClientRect();
                var x = new zxcAnimate('left', this.sluk, 0);
                if (this.sluk.style.left === '50%') {
                    this.sluk.style.left = a.width / 2 + 'px';
                }
                var stPos = parseInt(this.sluk.style.left);
                var step = a.width / 24;            
                stPos = parseInt(stPos / step) * step;
                var stEnd = a.width / 2;
                x.animate(stPos, stEnd, 500, null, 'sin');

                var smeh = parseInt((stPos - stEnd) / step);
                if (smeh < 0) smeh--;

                var y = new zxcAnimate('left', this.rules, smeh, this);
                var stPos1 = -a.width / 2;// + stPos;//parseInt(document.getElementById("tst").style.left);
                var stEnd1 = stPos1 + (stEnd - stPos);
                y.animate(stPos1, stEnd1, 500, null, 'sin');
            }
        },
        showMenuS: function (evt) { this.dMenuS.style.display = 'block'; },
        hideMenuS: function (evt) { this.dMenuS.style.display = ''; },
        setSpeed: function (evt) {
            this.dSpeed.innerHTML = evt.target.innerHTML;
            this.dMenuS.style.display = 'none';
        },
        showMenuI: function (evt) { this.dMenuI.style.display = 'block'; },
        hideMenuI: function (evt) { this.dMenuI.style.display = ''; },
        setInt: function (evt) {
            this.dInt.innerHTML = evt.target.innerHTML;
            this.dMenuI.style.display = 'none';
        },
        initDrag: function (evt) {
            initializedragRB(evt, 'timeWindow')
        },
        stopdrag: function (evt) {
            stopdrag();
        }
    });
    timeSlider = new fesrcplaneta.timeSlider();
    timeSlider.onchange = function () {
        var timeExtent = new esri.TimeExtent();
        timeExtent.startTime = new Date(timeSlider.startTime - timeSlider.inpint * 1800000);
        timeExtent.endTime = new Date(timeSlider.startTime + timeSlider.inpint * 1800000);
        map.setTimeExtent(timeExtent);

        if (mDates != undefined) mDates.Refresh(new Date(timeSlider.startTime - 12 * timeSlider.inpint * 3600000), new Date(timeSlider.startTime + 12 * timeSlider.inpint * 3600000));

        var timeStop = timeExtent.endTime;
        var timeStart = timeExtent.startTime;

        timeStop.setSeconds(timeStop.getSeconds() - 1);

        var dd = timeStart.getUTCFullYear() + "-" + ("0" + (timeStart.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + timeStart.getUTCDate()).slice(-2) + "T" + ("0" + timeStart.getUTCHours()).slice(-2) + ":00:00.000Z/" +
                  timeStop.getUTCFullYear() + "-" + ("0" + (timeStop.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + timeStop.getUTCDate()).slice(-2) + "T" + ("0" + timeStop.getUTCHours()).slice(-2) + ":" + ("0" + timeStop.getUTCMinutes()).slice(-2) + ":" + ("0" + timeStop.getUTCSeconds()).slice(-2) + ".999Z";
        var dde = timeStop.getUTCFullYear() + "-" + ("0" + (timeStop.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + timeStop.getUTCDate()).slice(-2) + " " + ("0" + timeStop.getUTCHours()).slice(-2) + ":" + ("0" + timeStop.getUTCMinutes()).slice(-2) + ":" + ("0" + timeStop.getUTCSeconds()).slice(-2);
        var dds = timeStart.getUTCFullYear() + "-" + ("0" + (timeStart.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + timeStart.getUTCDate()).slice(-2) + " " + ("0" + timeStart.getUTCHours()).slice(-2) + ":00:00";

        if (mDates != undefined) { mDates.SetTime(dds, dde); }
        if (mDates != undefined) { mDates.Select(dds, dde); }
        if (mInfos != undefined) { mInfos.setDateInt(timeSlider.startTime - timeSlider.inpint * 3600000 * 12, timeSlider.inpint); }
    };
    timeSlider.init();    
    timeSlider.placeAt(dojo.byId(objSet));
}