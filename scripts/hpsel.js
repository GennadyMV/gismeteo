dojo.provide('dcrscplaneta.LineEditor');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

function initAddClass() {
    dojo.declare(
        'dcrscplaneta.hpsel',
        [dijit._Widget, dijit._Templated],
        {
            templateString: '<div>' +
                                '<table style="width: 180px; table-layout: fixed;">' +
                                    '<col style="width: 100px;"/><col style="width: 80px;"/>' +
                                    '<tr>' +
                                        '<td><span data-dojo-attach-point="dName"></span></td>' +
                                        '<td>' +
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
                this.dVal.innerHTML = evt.target.innerHTML;
                this.dMenu.style.display = 'none';//'none';
                if (this.extFunct != undefined) {
                    this.extFunct(parseInt(evt.target.innerHTML));
                }
            },
            setVals: function (arr, sv, name) {
                this.dName.innerHTML = name;
                this.dVal.innerHTML = sv;
                var papa = { value: this };
                function setval(evt) {
                    papa.value.dVal.innerHTML = evt.target.innerHTML;
                    papa.value.dMenu.style.display = 'none';//'none';
                    if (papa.value.extFunct != undefined) papa.value.extFunct(parseInt(evt.target.innerHTML));

                };
                for (var i = 0; i < arr.length; i++) {
                    var dateSpan = document.createElement('span')
                    dateSpan.className = 'selectOption';
                    dateSpan.innerHTML = arr[i];
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
        mLegend.reElement();
    };
    hpSel.placeAt(dojo.byId('hpselDiv'));
    var tmpSel = new dcrscplaneta.hpsel();
    tmpSel.setVals(['50 ГПа', '100 ГПа', '150 ГПа', '200 ГПа', '250 ГПа', '300 ГПа', '400 ГПа', '500 ГПа', '700 ГПа', '850 ГПа', '925 ГПа', '1000 ГПа', '2 м'], '500 ГПа', 'Температура');
    tmpSel.extFunct = function (slev) {
        map.getLayer("GRIB_TMP_ISO").setLevel(slev.toString());
        map.getLayer("GRIB_TMP_FIELD").setLevel(slev.toString());
        mLegend.reElement();
    };
    tmpSel.placeAt(dojo.byId('tmpselDiv'));
    var rhSel = new dcrscplaneta.hpsel();
    rhSel.setVals(['50 ГПа', '100 ГПа', '150 ГПа', '200 ГПа', '250 ГПа', '300 ГПа', '400 ГПа', '500 ГПа', '700 ГПа', '850 ГПа', '925 ГПа', '1000 ГПа', '2 м'], '500 ГПа', 'Влажность');
    rhSel.extFunct = function (slev) {
        map.getLayer("GRIB_RH_ISO").setLevel(slev.toString());
        map.getLayer("GRIB_RH_FIELD").setLevel(slev.toString());
        mLegend.reElement();
    };
    rhSel.placeAt(dojo.byId('rhselDiv'));

    var windSel = new dcrscplaneta.hpsel();
    windSel.setVals(['50 ГПа', '100 ГПа', '150 ГПа', '200 ГПа', '250 ГПа', '300 ГПа', '400 ГПа', '500 ГПа', '700 ГПа', '850 ГПа', '925 ГПа', '1000 ГПа', '10 м'], '500 ГПа', 'Ветер');
    windSel.extFunct = function (slev) {
        map.getLayer("GRIB_WIND_BARBS").setLevel(slev.toString());
        map.getLayer("GRIB_WIND_FIELD").setLevel(slev.toString());
    };
    windSel.placeAt(dojo.byId('windselDiv'));
    //legend.appendChild(drk.domNode)
    //.placeAt(legend);
    //legend = drk.domNode;
};
