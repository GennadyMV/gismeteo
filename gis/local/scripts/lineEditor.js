dojo.provide('dcrscplaneta.LineEditor');
dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

function initLineDitor() {
    dojo.declare(
        'dcrscplaneta.LineEditor',
        [dijit._Widget, dijit._Templated],
        {
            templatePath: new dojo._Url('', 'scripts/lineEditor.html'),
            bwidth: 1,
            open: false,
            sendOk: undefined,
            '_ondwnWidth': function () {
                this.line_width.value = --this.bwidth;
            },
            '_onupWidth': function () {
                this.line_width.value = ++this.bwidth;
            },
            '_showPallete': function () {
                if (this.color_palete.style.display == 'none') this.color_palete.style.display = 'block';
                else this.color_palete.style.display = 'none';
            },
            '_selColor': function (index) {
                this.sel_color.style.backgroundColor = index.currentTarget.style.backgroundColor;
                this.color_palete.style.display = 'none';
            },
            '_Hide': function () {
                open = !open;
                if (open) this.domNode.style.display = "block";
                else this.domNode.style.display = "none";
            },
            '_Ok': function () {
                if (this.sendOk) this.sendOk(this.sel_color.style.backgroundColor, this.bwidth);
                this._Hide();
            }
        }
    );
};
