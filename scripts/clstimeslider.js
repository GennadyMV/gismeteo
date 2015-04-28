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
        templateString: '<div class="trest" style="position:relative; width:100%; height:100%" onSelectStart="return false" dojoAttachEvent="onMouseOut:hideCalendarI">' +
                            '<div data-dojo-attach-point="dSettings" class="CommonBorder BackgroundBorder trest2" style="position:absolute; left:30px; width:561px; height:40px; padding: 5px;">' +
                                '<div style="position:relative; width:0px; height:0px;">' +
                                    '<div data-dojo-attach-point="dCalendar"  class="calendarDiv">' +
                                        '<table style="width:100%; table-layout: fixed;" border="0" cellspacing="0">' +
                                            '<col style="width: 30px;"/><col style="width: 30px;"/><col style="width: 30px;"/><col style="width: 30px;"/><col style="width: 30px;"/><col style="width: 30px;"/><col style="width: 30px;"/>' +
                                            '<tr style="height: 40px;">' +
                                                '<td><div style="width:20px; height:20px; background-image:url(images/addicon/btn_dleft.png);" dojoAttachEvent="onClick:minusMonth"></div></td>' +
                                                '<td colspan="5">' +
                                                    '<span style="position:relative; border-radius:5px; border:1px solid black; padding:0px 5px 1px 5px; margin-left:10px; margin-right:10px; background:white; cursor: pointer;">' +
                                                        '<span data-dojo-attach-point="dMonth" dojoAttachEvent="onClick:showMonthS" style="width:30px; display:inline-block; font-size:14px;">Янв</span>' +
                                                            '<div data-dojo-attach-point="dMonthS" dojoAttachEvent="onMouseMove:hideMonthS" class="selectOptions" style=" left:-1px; top:-1px; background:white; font-size:14px; height:200px; width:40px; border-radius:5px; border:1px solid black;">' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Янв</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Фев</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Мар</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Апр</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Май</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Июн</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Июл</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Авг</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Сен</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Окт</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Ноя</span>' +
                                                                '<span dojoAttachEvent="onClick:setMonth" class="selectOption">Дек</span>' +
                                                            '</div>' +
                                                        '</span>' +
                                                    '</span>' +
                                                    '<span style="position:relative; border-radius:5px; border:1px solid black; padding:0px 5px 1px 5px; margin-left:10px; margin-right:10px; background:white; cursor: pointer;">' +
                                                        '<span data-dojo-attach-point="dYear" dojoAttachEvent="onClick:showYearS" style="width:30px; display:inline-block; font-size:14px;">2015</span>' +
                                                            '<div data-dojo-attach-point="dYearS" dojoAttachEvent="onMouseMove:hideYearS" class="selectOptions" style=" left:-1px; top:-1px; background:white; font-size:14px; height:200px; width:40px; border-radius:5px; border:1px solid black;">' +
                                                            '</div>' +
                                                        '</span>' +
                                                    '</span>' +
                                                '</td>' +
                                                '<td><div style="width:20px; height:20px; background-image:url(images/addicon/btn_dright.png);" dojoAttachEvent="onClick:plusMonth"></div></td>' +
                                            '</tr>' +
                                            '<tr><td>Пн</td><td class="bl">Вт</td><td class="bl">Ср</td><td class="bl">Чт</td><td class="bl">Пт</td><td class="bl">Сб</td><td class="bl">Вс</td></tr>' +
                                            '<tr><td data-dojo-attach-point="d01" dojoAttachEvent="onClick:setDay" class="ptr"> 1</td><td data-dojo-attach-point="d02" dojoAttachEvent="onClick:setDay" class="bl ptr"> 2</td><td data-dojo-attach-point="d03" dojoAttachEvent="onClick:setDay" class="bl ptr"> 3</td><td data-dojo-attach-point="d04" dojoAttachEvent="onClick:setDay" class="bl ptr"> 4</td><td data-dojo-attach-point="d05" dojoAttachEvent="onClick:setDay" class="bl ptr"> 5</td><td data-dojo-attach-point="d06" dojoAttachEvent="onClick:setDay" class="bl ptr"> 6</td><td data-dojo-attach-point="d07" dojoAttachEvent="onClick:setDay" class="bl ptr"> 7</td></tr>' +
                                            '<tr><td data-dojo-attach-point="d08" dojoAttachEvent="onClick:setDay" class="ptr"> 8</td><td data-dojo-attach-point="d09" dojoAttachEvent="onClick:setDay" class="bl ptr"> 9</td><td data-dojo-attach-point="d10" dojoAttachEvent="onClick:setDay" class="bl ptr">10</td><td data-dojo-attach-point="d11" dojoAttachEvent="onClick:setDay" class="bl ptr">11</td><td data-dojo-attach-point="d12" dojoAttachEvent="onClick:setDay" class="bl ptr">12</td><td data-dojo-attach-point="d13" dojoAttachEvent="onClick:setDay" class="bl ptr">13</td><td data-dojo-attach-point="d14" dojoAttachEvent="onClick:setDay" class="bl ptr">14</td></tr>' +
                                            '<tr><td data-dojo-attach-point="d15" dojoAttachEvent="onClick:setDay" class="ptr">15</td><td data-dojo-attach-point="d16" dojoAttachEvent="onClick:setDay" class="bl ptr">16</td><td data-dojo-attach-point="d17" dojoAttachEvent="onClick:setDay" class="bl ptr">17</td><td data-dojo-attach-point="d18" dojoAttachEvent="onClick:setDay" class="bl ptr">18</td><td data-dojo-attach-point="d19" dojoAttachEvent="onClick:setDay" class="bl ptr">19</td><td data-dojo-attach-point="d20" dojoAttachEvent="onClick:setDay" class="bl ptr">20</td><td data-dojo-attach-point="d21" dojoAttachEvent="onClick:setDay" class="bl ptr">21</td></tr>' +
                                            '<tr><td data-dojo-attach-point="d22" dojoAttachEvent="onClick:setDay" class="ptr">22</td><td data-dojo-attach-point="d23" dojoAttachEvent="onClick:setDay" class="bl ptr">23</td><td data-dojo-attach-point="d24" dojoAttachEvent="onClick:setDay" class="bl ptr">24</td><td data-dojo-attach-point="d25" dojoAttachEvent="onClick:setDay" class="bl ptr">25</td><td data-dojo-attach-point="d26" dojoAttachEvent="onClick:setDay" class="bl ptr">26</td><td data-dojo-attach-point="d27" dojoAttachEvent="onClick:setDay" class="bl ptr">27</td><td data-dojo-attach-point="d28" dojoAttachEvent="onClick:setDay" class="bl ptr">28</td></tr>' +
                                            '<tr><td data-dojo-attach-point="d29" dojoAttachEvent="onClick:setDay" class="ptr">29</td><td data-dojo-attach-point="d30" dojoAttachEvent="onClick:setDay" class="bl ptr">30</td><td data-dojo-attach-point="d31" dojoAttachEvent="onClick:setDay" class="bl ptr">31</td><td data-dojo-attach-point="d32" dojoAttachEvent="onClick:setDay" class="bl ptr">32</td><td data-dojo-attach-point="d33" dojoAttachEvent="onClick:setDay" class="bl ptr">33</td><td data-dojo-attach-point="d34" dojoAttachEvent="onClick:setDay" class="bl ptr">34</td><td data-dojo-attach-point="d35" dojoAttachEvent="onClick:setDay" class="bl ptr">35</td></tr>' +
                                            '<tr><td data-dojo-attach-point="d36" dojoAttachEvent="onClick:setDay" class="ptr">36</td><td data-dojo-attach-point="d37" dojoAttachEvent="onClick:setDay" class="bl ptr">37</td><td data-dojo-attach-point="d38" dojoAttachEvent="onClick:setDay" class="bl ptr">38</td><td data-dojo-attach-point="d39" dojoAttachEvent="onClick:setDay" class="bl ptr">39</td><td data-dojo-attach-point="d40" dojoAttachEvent="onClick:setDay" class="bl ptr">40</td><td data-dojo-attach-point="d41" dojoAttachEvent="onClick:setDay" class="bl ptr">41</td><td data-dojo-attach-point="d42" dojoAttachEvent="onClick:setDay" class="bl ptr">42</td></tr>' +
                                        '</table>' +
                                    '</div>' +
                                '</div>' +
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
                                    'data-dojo-attach-event="onkeypress:Edok, onclick:showCalendarI"/>' +                                    
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
                this.UpdateCalendarNE();
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

            this.inpval = ttime.getUTCFullYear() + ("0" + (ttime.getUTCMonth() + 1)).slice(-2) + ("0" + ttime.getUTCDate()).slice(-2) + ("0" + ttime.getUTCHours()).slice(-2);
            this.selDate.value = this.inpval.substr(0, 4) + "-" + this.inpval.substr(4, 2) + "-" + this.inpval.substr(6, 2) + " " + this.inpval.substr(8, 2) + ":00";

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

            //if (this.onchange != undefined) this.onchange();
            //'<span dojoAttachEvent="onClick:setMonth" class="selectOption">Янв</span>' +
            papa = { value: this };
            for (var i = 0; i < 12; i++) {
                var t = document.createElement("span");
                t.className = "selectOption";
                t.innerHTML = (2015 - i).toString();
                t.onclick = function (evt) {
                    papa.value.dYear.innerHTML = evt.target.innerHTML;
                    papa.value.dYearS.style.display = 'none';
                    papa.value.inpval = evt.target.innerHTML + papa.value.inpval.substr(4);
                    papa.value.UpdateCalendar();
                };
                this.dYearS.appendChild(t);
            }
            this.UpdateCalendarNE();
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
            /*
            // Calendar
            var stt = new Date(this.startTime);
            var curYear = stt.getUTCFullYear();
            var curMont = stt.getUTCMonth();
            function daysInMonth(month,year) {
                return new Date(year, month, 0).getDate();
            }

            var cd = daysInMonth(curMont, curYear, 0);
            var dw = stt.getDay();
            if (dw == 0) dw = 6; else dw--;

            for (var i = 1; i < 36; i++) this["d" + ("0" + i.toString()).slice(-2)].innerHTML = "";
            for (var i = 0; i < cd; i++)  this["d" + ("0" + (i + dw).toString()).slice(-2)].innerHTML = (i + 1).toString();

            //'<span dojoAttachEvent="onClick:setMonth" class="selectOption">Янв</span>' +
            papa = { value: this };
            for (var i = 0; i < 12; i++) {
                var t = document.createElement("span");
                t.className = "selectOption";
                t.innerHTML = (curYear - i).toString();
                t.onclick = function (evt) {
                    papa.value.dYear.innerHTML = evt.target.innerHTML;
                    papa.value.dYearS.style.display = 'none';
                };                
                this.dYearS.appendChild(t);
            }
            */
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
        },
        // Calendar
        setMonth: function (evt) {
            var Reind = { "Янв" : "01", "Фев" : "02", "Мар" : "03", "Апр" : "04", "Май" : "05", "Июн" : "06", "Июл" : "07", "Авг" : "08", "Сен" : "09", "Окт" : "10", "Ноя" : "11", "Дек" : "12"};
            this.dMonth.innerHTML = evt.target.innerHTML;
            this.dMonthS.style.display = 'none';
            this.inpval = this.inpval.substr(0, 4) + Reind[evt.target.innerHTML] + this.inpval.substr(6);
            this.UpdateCalendar()
        },
        showMonthS: function (evt) { this.dMonthS.style.display = 'block'; },
        hideMonthS: function (evt) { this.dMonthS.style.display = ''; },        
        showYearS: function (evt) { this.dYearS.style.display = 'block'; },
        hideYearS: function (evt) { this.dYearS.style.display = ''; },
        setDay: function (evt) {
            if (evt.target.innerHTML === " ") return;            
            this.inpval = this.inpval.substr(0, 6) + ("0" + evt.target.innerHTML).slice(-2) + this.inpval.substr(8);
            this.UpdateCalendar()
            //this.dCalendar.style.display = 'none';
            this.Update();
        },
        showCalendarI: function (evt) {
            this.dCalendar.style.display = 'block';
        },
        hideCalendarI: function (evt) {
            function isHover(e) { return (e.parentElement.querySelector(':hover') === e); }            
            if (!isHover(this.domNode)) { this.dCalendar.style.display = 'none'; }
        },
        minusMonth: function (evt) {            
            var mdk = new Date(this.inpval.substr(0, 4), this.inpval.substr(4, 2) -1, 5);
            mdk.setMonth(mdk.getMonth() - 1);
            this.inpval = mdk.getFullYear() + ("0" + (mdk.getMonth() + 1)).slice(-2) + this.inpval.substr(6);
            this.UpdateCalendar();
        },
        plusMonth: function (evt) {
            var mdk = new Date(this.inpval.substr(0, 4), this.inpval.substr(4, 2) - 1, 5);
            mdk.setMonth(mdk.getMonth() + 1);
            this.inpval = mdk.getFullYear() + ("0" + (mdk.getMonth() + 1)).slice(-2) + this.inpval.substr(6);
            this.UpdateCalendar();
        },
        UpdateCalendar: function (evt) {
            this.selDate.value = this.inpval.substr(0, 4) + "-" + this.inpval.substr(4, 2) + "-" + this.inpval.substr(6, 2) + " " + this.inpval.substr(8, 2) + ":00";
            var yearFInp = this.inpval.substr(0, 4);
            var monthFInp = this.inpval.substr(4, 2);
            var dayFInp = this.inpval.substr(6, 2);
            //Set Year
            if (yearFInp.indexOf('_') < 0) {
                this.dYear.innerHTML = yearFInp;
            } else {
                return;
            }
            //Set Month
            if (monthFInp.indexOf('_') < 0) {
                var Reind = [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
                this.dMonth.innerHTML = Reind[+monthFInp-1];
                //RecalcDays
                function daysInMonth(month, year) {
                    return new Date(year, month, 0).getDate();
                }
                var stt = new Date(Date.UTC(+yearFInp, (+monthFInp - 1), 1, 0, 0, 0, 0));
                var cd = daysInMonth(+monthFInp, +yearFInp);
                var dw = stt.getDay();
                if (dw == 0) dw = 6; else dw--;

                for (var i = 1; i < 43; i++) this["d" + ("0" + i.toString()).slice(-2)].innerHTML = " ";
                for (var i = 1; i <= cd; i++) this["d" + ("0" + (i + dw).toString()).slice(-2)].innerHTML = (i).toString();
            } else {
                return;
            }
            //SetCurentDay
            if (dayFInp.indexOf('_') < 0) {
                for (var i = 1; i < 43; i++) this["d" + ("0" + i.toString()).slice(-2)].style.backgroundColor = "white";
                var stt = new Date(Date.UTC(+yearFInp, (+monthFInp - 1), 1, 0, 0, 0, 0));
                var cd = daysInMonth(+monthFInp, +yearFInp);
                var dw = stt.getDay();
                if (dw == 0) dw = 6; else dw--;
                if (+dayFInp > cd) {
                    this.inpval = this.inpval.substr(0, 6) + cd.toString() + this.inpval.substr(8);
                    this.selDate.value = this.inpval.substr(0, 4) + "-" + this.inpval.substr(4, 2) + "-" + this.inpval.substr(6, 2) + " " + this.inpval.substr(8, 2) + ":00";
                    this["d" + ("0" + (cd + dw).toString()).slice(-2)].style.backgroundColor = "gray";
                } else {
                    this["d" + ("0" + (+dayFInp + dw).toString()).slice(-2)].style.backgroundColor = "gray";
                }
            }

            // Calendar
        },
        UpdateCalendarNE: function (evt) {        
            var yearFInp = this.inpval.substr(0, 4);
            var monthFInp = this.inpval.substr(4, 2);
            var dayFInp = this.inpval.substr(6, 2);
                //Set Year
            if (yearFInp.indexOf('_') < 0) {
                this.dYear.innerHTML = yearFInp;
            } else {
                return;
            }
            //Set Month
            if (monthFInp.indexOf('_') < 0) {
                var Reind = [ "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
                this.dMonth.innerHTML = Reind[+monthFInp-1];
                //RecalcDays
                function daysInMonth(month, year) {
                    return new Date(year, month, 0).getDate();
                }
                var stt = new Date(Date.UTC(+yearFInp, (+monthFInp - 1), 1, 0, 0, 0, 0));

                var cd = daysInMonth(+monthFInp, +yearFInp);
                var dw = stt.getDay();
                if (dw == 0) dw = 6; else dw--;

                for (var i = 1; i < 43; i++) this["d" + ("0" + i.toString()).slice(-2)].innerHTML = "";
                for (var i = 1; i <= cd; i++) this["d" + ("0" + (i + dw).toString()).slice(-2)].innerHTML = (i).toString();                
            } else {
                return;
            }
            //SetCurentDay
            if (dayFInp.indexOf('_') < 0) {
                for (var i = 1; i < 43; i++) this["d" + ("0" + i.toString()).slice(-2)].style.backgroundColor = "white";
                var stt = new Date(Date.UTC(+yearFInp, (+monthFInp - 1), 1, 0, 0, 0, 0));
                var cd = daysInMonth(+monthFInp, +yearFInp);
                var dw = stt.getDay();
                if (dw == 0) dw = 6; else dw--;
                if (+dayFInp <= cd) {
                    this["d" + ("0" + (+dayFInp + dw).toString()).slice(-2)].style.backgroundColor = "gray";
                }
            }
                // Calendar
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