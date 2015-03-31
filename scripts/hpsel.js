dojo.provide('dcrscplaneta.LineEditor');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

function initAddClass() {
    dojo.declare(
        'dcrscplaneta.hpsel',
        [dijit._Widget, dijit._Templated],
        {
            templateString: '<div>' +
                                '<table><tr><td style="width:95px;">'+
                                    '<span data-dojo-attach-point="dName"></span></td><td style="width:85px;">' +
                                    '(' +
                                    '<div class="selectBox">' +
                                        //'<span data-dojo-attach-point="dVal" class="selected" dojoAttachEvent="onMouseOver:showMenu"></span>' +
                                        '<span data-dojo-attach-point="dVal" class="selected" dojoAttachEvent="onClick:showMenu, onMouseOver:moreVis, onMouseOut:noVis"></span>' +
                                        //'<span class="selectArrow">&#9660</span>' +
                                        '<div data-dojo-attach-point="dMenu" class="selectOptions" dojoAttachEvent="onMouseMove:hideMenu" style="height:212px; width:60px;">' + 
                                        '</div>' +
                                    '</div>' +
                                    ')' +
                                '</td></tr></table>' + 
                            '</div>',
            extFunct: undefined,
            showMenu: function (evt) {
                //if (this.dMenu.style.display == 'none') {
                //    this.dMenu.style.display = '';
                //} else {
                    this.dMenu.style.display = 'block';
                //}
            },
            moreVis: function () {
                this.dVal.style.color = 'blue';
            },
            noVis: function () {
                this.dVal.style.color = 'black'
            },
            hideMenu: function (evt) {
                this.dMenu.style.display = '';//'none';
            },
            setVal: function (evt) {
                var k = 9;
                this.dVal.innerText = evt.target.innerText;
                this.dMenu.style.display = 'none';//'none';
                if (this.extFunct != undefined) {
                    this.extFunct(parseInt(evt.target.innerText));
                }
            },
            setVals: function (arr, sv, name) {
                this.dName.innerText = name;
                this.dVal.innerText = sv;
                var papa = { value: this };
                function setval(evt) {
                    papa.value.dVal.innerText = evt.target.innerText;
                    papa.value.dMenu.style.display = 'none';//'none';
                    if (papa.value.extFunct != undefined) papa.value.extFunct(parseInt(evt.target.innerText));

                };
                for (var i = 0; i < arr.length; i++) {
                    var dateSpan = document.createElement('span')
                    dateSpan.className = 'selectOption';
                    dateSpan.innerText = arr[i];
                    dateSpan.onclick = setval;
                    
                    this.dMenu.appendChild(dateSpan);
                }
            }

        }
    );
    //var legend = dojo.byId('hselDiv');
    var hpSel = new dcrscplaneta.hpsel();
    hpSel.setVals(['50 ГПа', '100 ГПа', '150 ГПа', '200 ГПа', '250 ГПа', '300 ГПа', '400 ГПа', '500 ГПа', '700 ГПа', '850 ГПа', '925 ГПа', '1000 ГПа'], '500 ГПа', 'Геопотенциал');
    hpSel.extFunct = function (slev) {
        map.getLayer("GRIB_HGT_ISO").setLevel(slev.toString());
        map.getLayer("GRIB_HGT_FIELD").setLevel(slev.toString());
        //map.getLayer("GRIB_HGT_FIELD").setRenderRule();
    };
    hpSel.placeAt(dojo.byId('hpselDiv'));
    var tmpSel = new dcrscplaneta.hpsel();
    tmpSel.setVals(['50 ГПа', '100 ГПа', '150 ГПа', '200 ГПа', '250 ГПа', '300 ГПа', '400 ГПа', '500 ГПа', '700 ГПа', '850 ГПа', '925 ГПа', '1000 ГПа', '2 м'], '500 ГПа', 'Температура');
    tmpSel.extFunct = function (slev) { map.getLayer("GRIB_TMP_ISO").setLevel(slev.toString()); };
    tmpSel.placeAt(dojo.byId('tmpselDiv'));
    var rhSel = new dcrscplaneta.hpsel();
    rhSel.setVals(['50 ГПа', '100 ГПа', '150 ГПа', '200 ГПа', '250 ГПа', '300 ГПа', '400 ГПа', '500 ГПа', '700 ГПа', '850 ГПа', '925 ГПа', '1000 ГПа', '2 м'], '500 ГПа', 'Влажность');
    rhSel.extFunct = function (slev) { map.getLayer("GRIB_RH_ISO").setLevel(slev.toString()); };
    rhSel.placeAt(dojo.byId('rhselDiv'));
    //legend.appendChild(drk.domNode)
    //.placeAt(legend);
    //legend = drk.domNode;
};
