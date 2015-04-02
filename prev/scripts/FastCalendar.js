
var fc_open = false;

function DateToString(date) {

    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1;
    var year = date.getUTCFullYear();
    var time = date.getUTCHours() + ":00:00";

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = day + "-" + month + "-" + year + " " + time ;

    return today;
}

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

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function GetKeyValue(e) {

    e = e || event;

    if (e.ctrlKey || e.altKey || e.metaKey) return false;

    var chr = getChar(e);

    // с null надо осторожно в неравенствах, т.к. например null >= '0' => true!
    // на всякий случай лучше вынести проверку chr == null отдельно
    if (chr == null) return false;

    if (chr < '0' || chr > '9') {
        return false;
    }

    return true;
}


function fc_ondwnDay() {
    if (this.fc_day.value>1)
    {
        this.fc_day.value = --this.fc_day.value;
    }
};

function fc_onupDay() {
    if (fc_day.value < daysInMonth(fc_month.value, fc_year.value)) {
        this.fc_day.value = ++this.fc_day.value;
    }
};
function fc_ondwnMonth() {
    if (this.fc_month.value > 1) {
        this.fc_month.value = --this.fc_month.value;
    }
};
function fc_onupMonth() {
    if (this.fc_month.value < 12) {
        this.fc_month.value = ++this.fc_month.value;
    }
};
function fc_ondwnYear() {
    if (this.fc_year.value > 2010)
    {
       this.fc_year.value = --this.fc_year.value;
    }
};

function fc_onupYear() {
    this.fc_year.value = ++this.fc_year.value;
};

function fc_ondwnHour() {
    if (this.fc_hour.value > 0) {
        this.fc_hour.value = --this.fc_hour.value;
    }
};
function fc_onupHour() {
    if (this.fc_hour.value < 23) {
        this.fc_hour.value = ++this.fc_hour.value;
    }
};

function fc_Hide() {
    fc_open = !fc_open;
    if (fc_open) {
        document.getElementById("fastcal").style.display = "block";
    } else {
        document.getElementById("fastcal").style.display = "none";
    }
};

function fc_Ok() {

    document.getElementById("tDTStart").value = ((fc_day.value < 10) ? "0" + fc_day.value : fc_day.value) + "-" +
                                                ((fc_month.value < 10) ? "0" + fc_month.value : fc_month.value) + "-" +
                                                fc_year.value + " " +
                                                ((fc_hour.value < 10) ? "0" + fc_hour.value : fc_hour.value) + ":00:00";
    this.fc_Hide();
    refreshSlider();
};

/*

function initFastCalendar() {
    dojo.declare(
        'dcrscplaneta.FastCalendar',
        [dijit._Widget, dijit._Templated],
        {
            templatePath: new dojo._Url('', 'scripts/FastCalendar.html'),
            Day: 1,
            Month: 1,
            Year: 2015,
            open: false,
            sendOk: undefined,
            '_ondwnDay': function () {
                this.day.value = --this.Day;
            },
            '_onupDay': function () {
                this.day.value = ++this.Day;
            },

            '_ondwnMonth': function () {
                this.month.value = --this.Month;
            },
            '_onupMonth': function () {
                this.month.value = ++this.Month;
            },


            '_ondwnYear': function () {
                this.year.value = --this.Year;
            },
            '_onupYear': function () {
                this.year.value = ++this.Year;
            },

            '_Hide': function () {
                open = !open;
                if (open) this.domNode.style.display = "block";
                else this.domNode.style.display = "none";
            },
            '_Ok': function () {
                if (this.sendOk) this.sendOk(this.sel_color.style.backgroundColor, this.bwidth);
                this._Hide();
            },
       /*     '_showPallete': function () {
                if (this.color_palete.style.display == 'none') this.color_palete.style.display = 'block';
                else this.color_palete.style.display = 'none';
            },
            '_selColor': function (index) {
                this.sel_color.style.backgroundColor = index.currentTarget.style.backgroundColor;
                this.color_palete.style.display = 'none';
            },
            
            

            
        }
    );
};
*/