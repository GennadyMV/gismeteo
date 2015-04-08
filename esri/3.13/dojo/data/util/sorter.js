/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/data/util/sorter",["../../_base/lang"],function(f){var a={};f.setObject("dojo.data.util.sorter",a);a.basicComparator=function(c,d){var a=-1;null===c&&(c=void 0);null===d&&(d=void 0);if(c==d)a=0;else if(c>d||null==c)a=1;return a};a.createSortFunction=function(c,d){function f(a,c,d,b){return function(e,f){var g=b.getValue(e,a),h=b.getValue(f,a);return c*d(g,h)}}for(var g=[],e,k=d.comparatorMap,l=a.basicComparator,h=0;h<c.length;h++){e=c[h];var b=e.attribute;if(b){e=e.descending?-1:1;var m=
l;k&&("string"!==typeof b&&"toString"in b&&(b=b.toString()),m=k[b]||l);g.push(f(b,e,m,d))}}return function(a,c){for(var b=0;b<g.length;){var d=g[b++](a,c);if(0!==d)return d}return 0}};return a});