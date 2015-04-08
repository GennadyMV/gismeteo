// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.13/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/labelLayerUtils/DynamicLabelClass":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../GraphicsLayer ../../geometry/Extent ../../geometry/Polygon".split(" "),function(B,G,A,H,D,C,E){B=B(D,{declaredClass:"esri.layers.labelLayerUtils.DynamicLabelClass",constructor:function(){this._preparedLabels=[];this._placedLabels=[];this._extent=null;this._y1=this._x1=this._y0=this._x0=this._ymax=this._ymin=this._xmax=this._xmin=0;this._scale=1},setMap:function(f,
b){this._labelLayer=b;this._xmin=f.extent.xmin;this._xmax=f.extent.xmax;this._ymin=f.extent.ymin;this._ymax=f.extent.ymax;this._scale=(this._xmax-this._xmin)/f.width},_process:function(f){this._preparedLabels=f;this._placedLabels=[];var b;for(f=this._preparedLabels.length-1;0<=f;f--){var a=this._preparedLabels[f],c=Math.min(a.labelWidth,a.labelHeight),k=a.labelWidth+0*c,c=a.labelHeight+0*c,g=(b=a.options)&&void 0!==b.lineLabelPlacement?b.lineLabelPlacement:"PlaceAtCenter",e=b&&void 0!==b.lineLabelPosition?
b.lineLabelPosition:"Above",d=b&&void 0!==b.pointPriorities?b.pointPriorities:"AboveRight",h=[2,2,1,3,0,2,3,3,2];"AboveLeft"==d?h=[1,2,2,2,0,3,2,3,3]:"AboveCenter"==d?h=[2,1,2,2,0,2,3,3,3]:"AboveRight"==d?h=[2,2,1,3,0,2,3,3,2]:"CenterLeft"==d?h=[2,2,3,1,0,3,2,2,3]:"CenterCenter"==d?h=[0,0,0,0,1,0,0,0,0]:"CenterRight"==d?h=[3,2,2,3,0,1,3,2,2]:"BelowLeft"==d?h=[2,3,3,2,0,3,1,2,2]:"BelowCenter"==d?h=[3,3,3,2,0,2,2,1,2]:"BelowRight"==d&&(h=[3,3,2,3,0,2,2,2,1]);var n=b&&void 0!==b.labelRotation?b.labelRotation:
!0,d=a.angle*(Math.PI/180);b=b&&void 0!==b.howManyLabels?b.howManyLabels:"OneLabel";if("point"==a.geometry.type)this._generatePointPositions(a,a.geometry.x,a.geometry.y,a.text,d,k,c,a.symbolWidth,a.symbolHeight,h);else if("multipoint"==a.geometry.type){g=a.geometry;for(e=0;e<g.points.length;e++)this._generatePointPositions(a,g.points[e][0],g.points[e][1],a.text,d,k,c,a.symbolWidth,a.symbolHeight,h)}else"polyline"==a.geometry.type?this._generateLinePositions(a,a.geometry,a.text,k,c,2*a.symbolHeight+
c,g,e,n):"polygon"==a.geometry.type&&this._generatePolygonPositions(a,b,a.geometry,a.text,d,k,c)}return this._placedLabels},_generatePointPositions:function(f,b,a,c,k,g,e,d,h,n){d=(d+g)*this._scale;h=(h+e)*this._scale;var r,l;for(r=1;3>=r;r++)for(l=1;9>=l;l++)if(n[l-1]==r)switch(l){case 1:if(this._findPlace(f,c,b-d,a+h,k,g,e))return;break;case 2:if(this._findPlace(f,c,b,a+h,k,g,e))return;break;case 3:if(this._findPlace(f,c,b+d,a+h,k,g,e))return;break;case 4:if(this._findPlace(f,c,b-d,a,k,g,e))return;
break;case 5:if(this._findPlace(f,c,b,a,k,g,e))return;break;case 6:if(this._findPlace(f,c,b+d,a,k,g,e))return;break;case 7:if(this._findPlace(f,c,b-d,a-h,k,g,e))return;break;case 8:if(this._findPlace(f,c,b,a-h,k,g,e))return;break;case 9:if(this._findPlace(f,c,b+d,a-h,k,g,e))return}},_generateLinePositions:function(f,b,a,c,k,g,e,d,h){var n=c*this._scale*c*this._scale,r,l,m;for(r=0;r<b.paths.length;r++){var p=b.paths[r],s=p.length,q=Math.floor((s-1)/2),v=0!==(s-1)%2?1:-1;"PlaceAtStart"==e&&(q=0,v=1);
"PlaceAtEnd"==e&&(q=s-2,v=-1);for(;0<=q&&q<s-1;){for(l=q;l<s;l++){var u=p[q][0],t=p[q][1],w=p[l][0]-u,x=p[l][1]-t;if(w*w+x*x>n){for(var z=Math.atan2(x,w);z>Math.PI/2;)z-=Math.PI;for(;z<-(Math.PI/2);)z+=Math.PI;var y=Math.sin(z),F=Math.cos(z),I=0,J=0;"Above"==d&&(I=g*y*this._scale,J=g*F*this._scale);"Below"==d&&(I=-g*y*this._scale,J=-g*F*this._scale);if(1==l-q){if(this._clipLine(u,t,p[l][0],p[l][1])&&(u=this._x1-this._x0,m=this._y1-this._y0,u*u+m*m>n&&(l=Math.atan2(m,u),w=c/2+2*k,t=w*this._scale*Math.cos(l),
w=w*this._scale*Math.sin(l),"PlaceAtStart"==e?(u=this._x0+t,m=this._y0+w):"PlaceAtEnd"==e?(u=this._x1-t,m=this._y1-w):(u=this._x0+u/2,m=this._y0+m/2),this._findPlace(f,a,u-I,m+J,h?-l:0,c,k))))return}else{var A=0;for(m=q;m<=l;m++)A=Math.max(A,Math.abs((p[m][1]-t)*F-(p[m][0]-u)*y));if(A<k&&this._findPlace(f,a,u+w/2-I,t+x/2+J,h?-z:0,c,k))return}break}}q+=v}}},_generatePolygonPositions:function(f,b,a,c,k,g,e){var d;if("ManyLabels"==b)for(b=0;b<a.rings.length;b++)d=a.rings[b],E.prototype.isClockwise(d)&&
(d=this._findCentroid(d,this._xmin,this._ymin,this._xmax,this._ymax),this._findPlace(f,c,d[0],d[1],k,g,e));else{d=this._findCentroidForFeature(a,this._xmin,this._ymin,this._xmax,this._ymax);var h=d[1],n=0;for(b=0;10>b;b++){n+=e/4;d=this._findCentroidForFeature(a,this._xmin,h+(n-e/4),this._xmax,h+(n+e/4));if(this._findPlace(f,c,d[0],d[1],k,g,e))break;d=this._findCentroidForFeature(a,this._xmin,h-(n+e/4),this._xmax,h-(n-e/4));if(this._findPlace(f,c,d[0],d[1],k,g,e))break}}},_findCentroid:function(f,
b,a,c,k){var g=f.length,e=[0,0],d=0,h=f[0][0],n=f[0][1];h>c&&(h=c);h<b&&(h=b);n>k&&(n=k);n<a&&(n=a);for(var r=1;r<g-1;r++){var l=f[r][0],m=f[r][1],p=f[r+1][0],s=f[r+1][1];l>c&&(l=c);l<b&&(l=b);m>k&&(m=k);m<a&&(m=a);p>c&&(p=c);p<b&&(p=b);s>k&&(s=k);s<a&&(s=a);var q=(l-h)*(s-n)-(p-h)*(m-n);e[0]+=q*(h+l+p);e[1]+=q*(n+m+s);d+=q}e[0]/=3*d;e[1]/=3*d;if(isNaN(e[0])||isNaN(e[1]))return e;a=[];this._fillBuffer(f,a,e);e[0]=this._sortBuffer(a,e[0],b,c);return e},_findCentroidForFeature:function(f,b,a,c,k){for(var g,
e=0,d=[0,0],h=0;h<f.rings.length;h++){var n=f.rings[h],r=n.length,l=n[0][0],m=n[0][1];l>c&&(l=c);l<b&&(l=b);m>k&&(m=k);m<a&&(m=a);for(g=1;g<r-1;g++){var p=n[g][0],s=n[g][1],q=n[g+1][0],v=n[g+1][1];p>c&&(p=c);p<b&&(p=b);s>k&&(s=k);s<a&&(s=a);q>c&&(q=c);q<b&&(q=b);v>k&&(v=k);v<a&&(v=a);var u=(p-l)*(v-m)-(q-l)*(s-m);d[0]+=u*(l+p+q);d[1]+=u*(m+s+v);e+=u}}d[0]/=3*e;d[1]/=3*e;if(isNaN(d[0])||isNaN(d[1]))return d;a=[];for(g=0;g<f.rings.length;g++)this._fillBuffer(f.rings[g],a,d);d[0]=this._sortBuffer(a,
d[0],b,c);return d},_fillBuffer:function(f,b,a){for(var c=f.length-1,k=f[0][1]>=f[c][1]?1:-1,g=0;g<=c;g++){var e=g,d=g+1;g==c&&(d=0);var h=f[e][0],e=f[e][1],n=f[d][0],d=f[d][1],r=d>=e?1:-1;if(e<=a[1]&&a[1]<=d||d<=a[1]&&a[1]<=e)a[1]!=e&&a[1]!=d?(b.push((a[1]-e)*(n-h)/(d-e)+h),k=r):a[1]==e&&a[1]!=d?(k!=r&&b.push(h),k=r):a[1]!=e&&a[1]==d?(b.push(n),k=r):a[1]==e&&a[1]==d&&(1==k&&b.push(h),b.push(n),k=r)}},_sortBuffer:function(f,b,a,c){var k=f.length;f.sort();if(0<k){for(var g=0,e=b=0;e<k-1;e+=2){var d=
Math.abs(f[e+1]-f[e]);!(f[e]<=a&&f[e+1]<=a)&&(!(f[e]>=c&&f[e+1]>=c)&&d>g)&&(g=d,b=e)}k=f[b];f=f[b+1];k>c&&(k=c);k<a&&(k=a);f>c&&(f=c);f<a&&(f=a);b=(k+f)/2}return b},_findPlace:function(f,b,a,c,k,g,e){if(isNaN(a)||isNaN(c))return!1;for(var d=0;d<this._placedLabels.length;d++){var h=this._placedLabels[d].angle,n=this._placedLabels[d].width*this._scale,r=this._placedLabels[d].height*this._scale,l=this._placedLabels[d].x-a,m=this._placedLabels[d].y-c;if(0===k&&0===h){if(this._findPlace2(-g*this._scale,
-e*this._scale,g*this._scale,e*this._scale,l-n,m-r,l+n,m+r))return!1}else{var p=new C(-g*this._scale,-e*this._scale,g*this._scale,e*this._scale,null),s=0,q=1;0!==k&&(s=Math.sin(k),q=Math.cos(k));var v=l*q-m*s,l=l*s+m*q,h=h-k,s=Math.sin(h),q=Math.cos(h),u=-n*q- -r*s,m=-n*s+-r*q,h=+n*q- -r*s,t=+n*s+-r*q,n=v+u,r=l-m,s=v+h,q=l-t,u=v-u,m=l+m,v=v-h,l=l+t,h=new E;h.addRing([[n,r],[s,q],[u,m],[v,l],[n,r]]);if(p.intersects(h))return!1}}for(;k>Math.PI/2;)k-=Math.PI;for(;k<-(Math.PI/2);)k+=Math.PI;d={};d.layer=
f;d.text=b;d.angle=k;d.x=a;d.y=c;d.width=g;d.height=e;this._placedLabels.push(d);return!0},_findPlace2:function(f,b,a,c,k,g,e,d){return(f>=k&&f<=e||a>=k&&a<=e||f<=k&&a>=e)&&(b>=g&&b<=d||c>=g&&c<=d||b<=g&&c>=d)?!0:!1},_clipLine:function(f,b,a,c){for(var k=this._code(f,b),g=this._code(a,c);0!==k||0!==g;){if(0!==(k&g))return!1;var e=a-f,d=c-b;0!==k?(f<this._xmin?(b+=d*(this._xmin-f)/e,f=this._xmin):f>this._xmax?(b+=d*(this._xmax-f)/e,f=this._xmax):b<this._ymin?(f+=e*(this._ymin-b)/d,b=this._ymin):b>
this._ymax&&(f+=e*(this._ymax-b)/d,b=this._ymax),k=this._code(f,b)):(a<this._xmin?(c+=d*(this._xmin-a)/e,a=this._xmin):a>this._xmax?(c+=d*(this._xmax-a)/e,a=this._xmax):c<this._ymin?(a+=e*(this._ymin-c)/d,c=this._ymin):c>this._ymax&&(a+=e*(this._ymax-c)/d,c=this._ymax),g=this._code(a,c))}this._x0=f;this._y0=b;this._x1=a;this._y1=c;return!0},_code:function(f,b){var a=0;f<this._xmin&&(a+=8);f>this._xmax&&(a+=4);b<this._ymin&&(a+=2);b>this._ymax&&(a+=1);return a}});A("extend-esri")&&G.setObject("layers.labelLayerUtils.DynamicLabelClass",
B,H);return B})},"esri/layers/labelLayerUtils/StaticLabelClass":function(){define("dojo/_base/declare dojo/_base/lang dojo/has ../../kernel ../GraphicsLayer ../../geometry/Extent ../../geometry/Point ../../geometry/Polygon".split(" "),function(B,G,A,H,D,C,E,f){B=B(D,{declaredClass:"esri.layers.labelLayerUtils.StaticLabel",constructor:function(){this._preparedLabels=[];this._placedLabels=[];this._extent=null;this._ymax=this._ymin=this._xmax=this._xmin=0;this._scale=1;this._LINE_STEP_CONST=1.5;this._POLYGON_X_STEP_CONST=
1;this._POLYGON_Y_STEP_CONST=0.75},setMap:function(b,a){this._labelLayer=a;this._map=b;this._xmin=b.extent.xmin;this._xmax=b.extent.xmax;this._ymin=b.extent.ymin;this._ymax=b.extent.ymax;this._scale=(this._xmax-this._xmin)/b.width},_process:function(b){var a,c,k,g,e,d,h,n,r;this._preparedLabels=b;this._placedLabels=[];for(b=this._preparedLabels.length-1;0<=b;b--){a=this._preparedLabels[b];e=a.labelWidth;d=a.labelHeight;n=(h=a.options)&&h.lineLabelPlacement?h.lineLabelPlacement:"PlaceAtCenter";r=h&&
h.lineLabelPosition?h.lineLabelPosition:"Above";c=h&&h.labelRotation?h.labelRotation:!0;k=a.angle*(Math.PI/180);g=h&&h.howManyLabels?h.howManyLabels:"OneLabel";var l=[];if("point"===a.geometry.type)this._generatePointPositions(a.geometry.x,a.geometry.y,a.text,k,e,d,a.symbolWidth,a.symbolHeight,h,l);else if("multipoint"===a.geometry.type)for(c=0;c<a.geometry.points.length;c++)this._generatePointPositions(a.geometry.points[c][0],a.geometry.points[c][1],a.text,k,e,d,a.symbolWidth,a.symbolHeight,h,l);
else if("polyline"===a.geometry.type)if("PlaceAtStart"===n)this._generateLinePositionsPlaceAtStart(a.geometry,!0,a.text,e,d,2*a.symbolHeight+d,n,r,c,l);else if("PlaceAtEnd"===n)this._generateLinePositionsPlaceAtEnd(a.geometry,!0,a.text,e,d,2*a.symbolHeight+d,n,r,c,l);else{h=[];var m=a.geometry.getExtent(),p=this._map.extent;if(m.getWidth()<e*this._scale&&m.getHeight()<e*this._scale)continue;else 0.5*m.getWidth()<p.getWidth()&&0.5*m.getHeight()<p.getHeight()?(p=0.1*Math.min(this._map.width,this._map.height)*
this._scale,this._generateLinePositionsPlaceAtCenter(a.geometry,!1,p,a.text,e,d,2*a.symbolHeight+d,n,r,c,h)):(p=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale,this._generateLinePositionsPlaceAtCenter(a.geometry,!0,p,a.text,e,d,2*a.symbolHeight+d,n,r,c,h));this._postSorting(m,h,l)}else if("polygon"===a.geometry.type)for(c=0;c<a.geometry.rings.length;c++)n=a.geometry.rings[c],f.prototype.isClockwise(n)&&(r=this._calcRingExtent(n),r.xmax-r.xmin<4*e*this._scale&&r.ymax-r.ymin<
4*d*this._scale||this._generatePolygonPositionsForManyLabels(n,a.geometry.spatialReference,a.text,k,e,d,l));for(c=0;c<l.length&&!(n=l[c].x,r=l[c].y,void 0!==l[c].angle&&(k=l[c].angle),h=this._findPlace(a,a.text,n,r,k,e,d),"OneLabel"===g&&h&&this._labelLayer._isWithinScreenArea(new E(n,r,a.geometry.spatialReference)));c++);}return this._placedLabels},_generatePointPositions:function(b,a,c,k,g,e,d,h,n,f){c=n&&n.pointPriorities?n.pointPriorities:"AboveRight";g=(d+g)*this._scale;e=(h+e)*this._scale;switch(c.toLowerCase()){case "aboveleft":b-=
g;a+=e;break;case "abovecenter":a+=e;break;case "aboveright":b+=g;a+=e;break;case "centerleft":b-=g;break;case "centercenter":break;case "centerright":b+=g;break;case "belowleft":b-=g;a-=e;break;case "belowcenter":a-=e;break;case "belowright":b+=g;a-=e;break;default:return}f.push({x:b,y:a})},_generateLinePositionsPlaceAtStart:function(b,a,c,k,g,e,d,h,n,f){d=k*this._scale;var l=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale,m,p,s,q,v,u,t,w;for(m=0;m<b.paths.length;m++){var x=
b.paths[m],z=d,y=0;for(p=0;p<x.length-1;p++)s=x[p][0],q=x[p][1],v=x[p+1][0],u=x[p+1][1],t=v-s,w=u-q,t=Math.sqrt(t*t+w*w),y+t>z?(y=this._generatePositionsOnLine(b.spatialReference,a,z,l,y,s,q,v,u,c,k,g,e,h,n,f),z=l):y+=t}},_generateLinePositionsPlaceAtEnd:function(b,a,c,k,g,e,d,h,n,f){d=k*this._scale;var l=this._LINE_STEP_CONST*Math.min(this._map.width,this._map.height)*this._scale,m,p,s,q,v,u,t,w;for(m=0;m<b.paths.length;m++){var x=b.paths[m],z=d,y=0;for(p=x.length-2;0<=p;p--)s=x[p+1][0],q=x[p+1][1],
v=x[p][0],u=x[p][1],t=v-s,w=u-q,t=Math.sqrt(t*t+w*w),y+t>z?(y=this._generatePositionsOnLine(b.spatialReference,a,z,l,y,s,q,v,u,c,k,g,e,h,n,f),z=l):y+=t}},_generateLinePositionsPlaceAtCenter:function(b,a,c,k,g,e,d,h,n,f,l){var m,p,s,q,v,u,t,w;for(h=0;h<b.paths.length;h++){var x=b.paths[h];if(!(2>x.length)){var z=0;for(m=0;m<x.length-1;m++)s=x[m][0],q=x[m][1],v=x[m+1][0],u=x[m+1][1],t=v-s,w=u-q,z+=Math.sqrt(t*t+w*w);var y=0;for(m=0;m<x.length-1;m++){s=x[m][0];q=x[m][1];v=x[m+1][0];u=x[m+1][1];t=v-s;
w=u-q;t=Math.sqrt(t*t+w*w);if(y+t>z/2)break;y+=t}m==x.length-1&&m--;s=x[m][0];q=x[m][1];v=x[m+1][0];u=x[m+1][1];t=v-s;w=u-q;y=z/2-y;w=Math.atan2(w,t);t=s+y*Math.cos(w);w=q+y*Math.sin(w);s=this._angleAndShifts(s,q,v,u,d,n,f);l.push({x:t+s.shiftX,y:w+s.shiftY,angle:s.angle});var z=t,F=w,y=0;for(p=m;p<x.length-1;p++)p==m?(s=z,q=F):(s=x[p][0],q=x[p][1]),v=x[p+1][0],u=x[p+1][1],t=v-s,w=u-q,t=Math.sqrt(t*t+w*w),y=y+t>c?this._generatePositionsOnLine(b.spatialReference,a,c,c,y,s,q,v,u,k,g,e,d,n,f,l):y+t;
y=0;for(p=m;0<=p;p--)p==m?(s=z,q=F):(s=x[p+1][0],q=x[p+1][1]),v=x[p][0],u=x[p][1],t=v-s,w=u-q,t=Math.sqrt(t*t+w*w),y=y+t>c?this._generatePositionsOnLine(b.spatialReference,a,c,c,y,s,q,v,u,k,g,e,d,n,f,l):y+t}}},_generatePositionsOnLine:function(b,a,c,k,g,e,d,h,n,f,l,m,p,s,q,v){f=Math.atan2(n-d,h-e);l=e;m=d;var u=l,t=m;do if(g=c-g,l+=g*Math.cos(f),m+=g*Math.sin(f),this._belongs(l,m,e,d,h,n))g=this._angleAndShifts(e,d,h,n,p,s,q),c=l+g.shiftX,t=m+g.shiftY,a?this._labelLayer._isWithinScreenArea(new C(c,
t,c,t,b))&&v.push({x:c,y:t,angle:g.angle}):v.push({x:c,y:t,angle:g.angle}),u=l,t=m,g=0,c=k;else return b=h-u,n-=t,Math.sqrt(b*b+n*n);while(1)},_postSorting:function(b,a,c){if(b&&0<a.length){var k=0.5*(b.xmin+b.xmax);b=0.5*(b.ymin+b.ymax);for(var g=a[0].x,e=a[0].y,d=Math.sqrt((g-k)*(g-k)+(e-b)*(e-b)),h=a[0].angle,n=0;n<a.length;n++){var f=a[n].x,l=a[n].y,m=Math.sqrt((f-k)*(f-k)+(l-b)*(l-b));m<d&&(g=f,e=l,d=m,h=a[n].angle)}c.push({x:g,y:e,angle:h})}},_belongs:function(b,a,c,k,g,e){if(g==c&&e==k)return!1;
if(g>c){if(b>g||b<c)return!1}else if(b<g||b>c)return!1;if(e>k){if(a>e||a<k)return!1}else if(a<e||a>k)return!1;return!0},_angleAndShifts:function(b,a,c,k,g,e,d){for(b=Math.atan2(k-a,c-b);b>Math.PI/2;)b-=Math.PI;for(;b<-(Math.PI/2);)b+=Math.PI;k=Math.sin(b);var h=Math.cos(b);c=a=0;"Above"==e&&(a=g*k*this._scale,c=g*h*this._scale);"Below"==e&&(a=-g*k*this._scale,c=-g*h*this._scale);g=[];g.angle=d?-b:0;g.shiftX=-a;g.shiftY=c;return g},_generatePolygonPositionsForManyLabels:function(b,a,c,k,g,e,d){k=this._calcRingExtent(b);
if(0.75*(k.xmax-k.xmin)>this._map.width*this._scale||0.75*(k.ymax-k.ymin)>this._map.height*this._scale){var h=this._findCentroidForRing(b);e=this._map.width*this._scale<k.xmax-k.xmin?this._POLYGON_X_STEP_CONST*this._map.width*this._scale:this._POLYGON_X_STEP_CONST*(k.xmax-k.xmin);g=this._map.height*this._scale<k.ymax-k.ymin?this._POLYGON_Y_STEP_CONST*this._map.height*this._scale:this._POLYGON_Y_STEP_CONST*(k.ymax-k.ymin);var n=h[0]-Math.round((h[0]-k.xmin)/e)*e,f=h[1]-Math.round((h[1]-k.ymin)/g)*
g,l,h=!0;for(l=f;l<k.ymax;l+=g)if(h=!h,!(l<this._ymin||l>this._ymax))for(f=n+(h?0:e/2);f<k.xmax;f+=e)this._labelLayer._isWithinScreenArea(new C(f,l,f,l,a))&&this._isPointWithinRing(c,b,f,l)&&d.push({x:f,y:l})}else{h=this._findCentroidForRing(b);for(k=0;10>k;k++)if(g=h[0],n=h[1]+(k%2?-1:1)*Math.floor(k/2)*e*this._scale,this._labelLayer._isWithinScreenArea(new C(g,n,g,n,a))&&this._isPointWithinRing(c,b,g,n)){d.push({x:g,y:n});break}}},_calcRingExtent:function(b){var a,c;c=new C;for(a=0;a<b.length-1;a++){var k=
b[a][0],g=b[a][1];if(void 0===c.xmin||k<c.xmin)c.xmin=k;if(void 0===c.ymin||g<c.ymin)c.ymin=g;if(void 0===c.xmax||k>c.xmax)c.xmax=k;if(void 0===c.ymax||g>c.ymax)c.ymax=g}return c},_isPointWithinPolygon:function(b,a,c,k){var g;for(g=0;g<a.rings.length;g++)if(this._isPointWithinRing(b,a.rings[g],c,k))return!0;return!1},_isPointWithinRing:function(b,a,c,k){var g,e,d,h,f=[],r=a.length;for(b=0;b<r-1;b++)if(g=a[b][0],e=a[b][1],d=a[b+1][0],h=a[b+1][1],!(g==d&&e==h)){if(e==h)if(k==e)f.push(g);else continue;
g==d?(e<h&&(k>=e&&k<h)&&f.push(g),e>h&&(k<=e&&k>h)&&f.push(g)):(e=(d-g)/(h-e)*(k-e)+g,g<d&&(e>=g&&e<d)&&f.push(e),g>d&&(e<=g&&e>d)&&f.push(e))}f.sort(function(a,b){return a-b});for(b=0;b<f.length-1;b++)if(g=f[b],d=f[b+1],c>=g&&c<d)if(b%2)break;else return!0;return!1},_findCentroidForRing:function(b){for(var a=b.length,c=[0,0],k=0,g=b[0][0],e=b[0][1],d=1;d<a-1;d++){var h=b[d][0],f=b[d][1],r=b[d+1][0],l=b[d+1][1],m=(h-g)*(l-e)-(r-g)*(f-e);c[0]+=m*(g+h+r);c[1]+=m*(e+f+l);k+=m}c[0]/=3*k;c[1]/=3*k;return c},
_findCentroidForFeature:function(b){for(var a=0,c=[0,0],k=0;k<b.rings.length;k++)for(var g=b.rings[k],e=g.length,d=g[0][0],h=g[0][1],f=1;f<e-1;f++){var r=g[f][0],l=g[f][1],m=g[f+1][0],p=g[f+1][1],s=(r-d)*(p-h)-(m-d)*(l-h);c[0]+=s*(d+r+m);c[1]+=s*(h+l+p);a+=s}c[0]/=3*a;c[1]/=3*a;return c},_findPlace:function(b,a,c,k,g,e,d){if(isNaN(c)||isNaN(k))return!1;for(var h=0;h<this._placedLabels.length;h++){var n=this._placedLabels[h].angle,r=this._placedLabels[h].width*this._scale,l=this._placedLabels[h].height*
this._scale,m=this._placedLabels[h].x-c,p=this._placedLabels[h].y-k;if(0===g&&0===n){if(this._findPlace2(-e*this._scale,-d*this._scale,e*this._scale,d*this._scale,m-r,p-l,m+r,p+l))return!1}else{var s=new C(-e*this._scale,-d*this._scale,e*this._scale,d*this._scale,null),q=0,v=1;0!==g&&(q=Math.sin(g),v=Math.cos(g));var u=m*v-p*q,m=m*q+p*v,n=n-g,q=Math.sin(n),v=Math.cos(n),t=-r*v- -l*q,p=-r*q+-l*v,n=+r*v- -l*q,w=+r*q+-l*v,r=u+t,l=m-p,q=u+n,v=m-w,t=u-t,p=m+p,u=u-n,m=m+w,n=new f;n.addRing([[r,l],[q,v],
[t,p],[u,m],[r,l]]);if(s.intersects(n))return!1}}for(;g>Math.PI/2;)g-=Math.PI;for(;g<-(Math.PI/2);)g+=Math.PI;h={};h.layer=b;h.text=a;h.angle=g;h.x=c;h.y=k;h.width=e;h.height=d;this._placedLabels.push(h);return!0},_findPlace2:function(b,a,c,k,g,e,d,h){return(b>=g&&b<=d||c>=g&&c<=d||b<=g&&c>=d)&&(a>=e&&a<=h||k>=e&&k<=h||a<=e&&k>=h)?!0:!1}});A("extend-esri")&&G.setObject("layers.labelLayerUtils.StaticLabel",B,H);return B})},"*noref":1}});
define("esri/layers/LabelLayer","require dojo/_base/declare dojo/_base/lang dojo/number dojo/_base/array dojo/_base/connect dojo/has dojox/gfx/_base ../kernel ../lang ../graphic ../PopupInfo ./labelLayerUtils/DynamicLabelClass ./labelLayerUtils/StaticLabelClass ../symbols/TextSymbol ../symbols/ShieldLabelSymbol ../geometry/Extent ../geometry/Point ../geometry/webMercatorUtils ./GraphicsLayer ./LabelClass ../renderers/SimpleRenderer".split(" "),function(B,G,A,H,D,C,E,f,b,a,c,k,g,e,d,h,n,r,l,m,p,s){function q(a){return"sizeInfo"===
a.type}B=G(m,{declaredClass:"esri.layers.LabelLayer",constructor:function(a){this.id="labels";this.featureLayers=[];this._featureLayerInfos=[];this._preparedLabels=[];this._engineType="STATIC";this._mapEventHandlers=[];a&&(a.id&&(this.id=a.id),a.mode&&(this._engineType="DYNAMIC"===a.mode.toUpperCase()?"DYNAMIC":"STATIC"))},_setMap:function(a){var b=this.inherited(arguments);this._map&&this._mapEventHandlers.push(this._map.on("extent-change",A.hitch(this,"refresh")));this.refresh();return b},_unsetMap:function(){var a;
for(a=0;a<this._mapEventHandlers.length;a++)C.disconnect(this._mapEventHandlers[a]);this.refresh();this.inherited(arguments)},setAlgorithmType:function(a){this._engineType=a&&"DYNAMIC"===a.toUpperCase()?"DYNAMIC":"STATIC";this.refresh()},addFeatureLayer:function(a,b,c,e){if(!this.getFeatureLayer(a.layerId)){var d=[];d.push(a.on("update-end",A.hitch(this,"refresh")));d.push(a.on("suspend",A.hitch(this,"refresh")));d.push(a.on("resume",A.hitch(this,"refresh")));d.push(a.on("edits-complete",A.hitch(this,
"refresh")));d.push(a.on("labeling-info-change",A.hitch(this,"refresh")));d.push(a.on("time-extent-change",A.hitch(this,"refresh")));d.push(a.on("show-labels-change",A.hitch(this,"refresh")));this._featureLayerInfos.push({FeatureLayer:a,LabelExpressionInfo:c,LabelingOptions:e,LabelRenderer:b,EventHandlers:d});this.featureLayers.push(a);this.refresh()}},getFeatureLayer:function(a){var b,d;for(b=0;b<this.featureLayers.length;b++)if(d=this.featureLayers[b],void 0!==d&&d.id==a)return d;return null},removeFeatureLayer:function(a){var b;
a=this.getFeatureLayer(a);if(void 0!==a&&(b=D.indexOf(this.featureLayers,a),-1<b)){this.featureLayers.splice(b,1);for(a=0;a<this._featureLayerInfos[b].EventHandlers.length;a++)C.disconnect(this._featureLayerInfos[b].EventHandlers[a]);this._featureLayerInfos.splice(b,1);this.refresh()}},removeAllFeatureLayers:function(){var a;for(a=0;a<this.featureLayers.length;a++){for(var b=0;b<this._featureLayerInfos[a].EventHandlers.length;b++)C.disconnect(this._featureLayerInfos[a].EventHandlers[b]);this.featureLayers=
[];this._featureLayerInfos=[]}this.refresh()},getFeatureLayers:function(){return this.featureLayers},getFeatureLayerInfo:function(a){var b,d;for(b=0;b<this.featureLayers.length;b++)if(d=this.featureLayers[b],void 0!==d&&d.id==a)return this._featureLayerInfos[b];return null},refresh:function(a){var b,d,c,k,h,f=[],m,l="DYNAMIC"===this._engineType?new g:new e;if(this._map){l.setMap(this._map,this);this._preparedLabels=[];for(a=0;a<this.featureLayers.length;a++)if(d=this.featureLayers[a],d.visible&&d.showLabels&&
d.visibleAtMapScale&&!d._suspended)if(b=this._featureLayerInfos[a],b.LabelRenderer){if(f=d.labelingInfo)if(m=f[0])k=this._getLabelExpression(m),h=this._convertOptions(m);c=b.LabelRenderer;b.LabelExpressionInfo&&(k=b.LabelExpressionInfo);b.LabelingOptions&&(h=this._convertOptions(null),void 0!==b.LabelingOptions.pointPriorities&&(f=b.LabelingOptions.pointPriorities,h.pointPriorities="above-center"==f||"AboveCenter"==f||"esriServerPointLabelPlacementAboveCenter"==f?"AboveCenter":"above-left"==f||"AboveLeft"==
f||"esriServerPointLabelPlacementAboveLeft"==f?"AboveLeft":"above-right"==f||"AboveRight"==f||"esriServerPointLabelPlacementAboveRight"==f?"AboveRight":"below-center"==f||"BelowCenter"==f||"esriServerPointLabelPlacementBelowCenter"==f?"BelowCenter":"below-left"==f||"BelowLeft"==f||"esriServerPointLabelPlacementBelowLeft"==f?"BelowLeft":"below-right"==f||"BelowRight"==f||"esriServerPointLabelPlacementBelowRight"==f?"BelowRight":"center-center"==f||"CenterCenter"==f||"esriServerPointLabelPlacementCenterCenter"==
f?"CenterCenter":"center-left"==f||"CenterLeft"==f||"esriServerPointLabelPlacementCenterLeft"==f?"CenterLeft":"center-right"==f||"CenterRight"==f||"esriServerPointLabelPlacementCenterRight"==f?"CenterRight":"AboveRight"),void 0!==b.LabelingOptions.lineLabelPlacement&&(h.lineLabelPlacement=b.LabelingOptions.lineLabelPlacement),void 0!==b.LabelingOptions.lineLabelPosition&&(h.lineLabelPosition=b.LabelingOptions.lineLabelPosition),void 0!==b.LabelingOptions.labelRotation&&(h.labelRotation=b.LabelingOptions.labelRotation),
void 0!==b.LabelingOptions.howManyLabels&&(h.howManyLabels=b.LabelingOptions.howManyLabels));c instanceof p&&(k=this._getLabelExpression(c),c=new s(c.symbol),h=this._convertOptions(c));this._addLabels(d,c,k,h)}else if(f=d.labelingInfo)for(b=f.length-1;0<=b;b--)if(m=f[b])c=new p(m instanceof p?m.toJson():m),k=this._getLabelExpression(m),h=this._convertOptions(m),this._addLabels(d,c,k,h);k=l._process(this._preparedLabels);this.clear();this.drawLabels(this._map,k)}},drawLabels:function(a,b){this._scale=
(a.extent.xmax-a.extent.xmin)/a.width;var e;for(e=0;e<b.length;e++){var f=b[e],g=f.x,k=f.y,h=f.text,m=f.angle,l=f.layer.labelSymbol;"polyline"==f.layer.geometry.type&&f.layer.options.labelRotation?l.setAngle(m*(180/Math.PI)):l.setAngle(0);l.setText(h);f=g;l instanceof d&&(g=l.getHeight(),m=Math.sin(m),f-=0.25*g*this._scale*m,k-=0.33*g*this._scale);m=new c(new r(f,k,a.extent.spatialReference));m.setSymbol(l);this.add(m)}},_addLabels:function(a,b,d,c){var e,f,g,k;if(this._isWithinScaleRange(b.minScale,
b.maxScale)&&d&&""!==d){var h=this._map,m=!a.url&&!h.spatialReference.equals(a.spatialReference);for(e=0;e<a.graphics.length;e++)if(f=a.graphics[e],!1!==f.visible){g=f.geometry;if(m){if(!l.canProject(g,h))continue;g=l.project(g,h)}g&&(this._isWhere(b.where,f.attributes)&&this._isWithinScreenArea(g))&&(k=this._buildLabelText(d,f.attributes,a.fields,c),this._addLabel(k,b,a.renderer,f,c,g,h))}}},_isWithinScreenArea:function(a){a="point"===a.type?new n(a.x,a.y,a.x,a.y,a.spatialReference):a.getExtent();
if(void 0===a)return!1;a=this._intersects(this._map,a);return null===a||0===a.length?!1:!0},_isWithinScaleRange:function(a,b){var d=this._map.getScale();return 0<a&&d>=a||0<b&&d<=b?!1:!0},_isWhere:function(a,b){try{if(!a)return!0;if(a){var d=a.split(" ");if(3===d.length)return this._sqlEquation(b[d[0].substr(1,d[0].length-2)],d[1],d[2]);if(7===d.length){var c=this._sqlEquation(b[d[0].substr(1,d[0].length-2)],d[1],d[2]),f=d[3],e=this._sqlEquation(b[d[4].substr(1,d[4].length-2)],d[5],d[6]);switch(f){case "AND":return c&&
e;case "OR":return c||e}}}return!1}catch(g){console.log("Error.: can't parse \x3d "+a)}},_sqlEquation:function(a,b,d){switch(b){case "\x3d":return a==d?!0:!1;case "\x3c\x3e":return a!=d?!0:!1;case "\x3e":return a>d?!0:!1;case "\x3e\x3d":return a>=d?!0:!1;case "\x3c":return a<d?!0:!1;case "\x3c\x3d":return a<=d?!0:!1}return!1},_getSizeInfo:function(a){return a?a.sizeInfo||D.filter(a.visualVariables,q)[0]:null},_addLabel:function(a,b,c,e,g,k,m){var l,n,p,q;if(a&&""!==A.trim(a)&&b){a=a.replace(/\s+/g,
" ");l=b.getSymbol(e);l instanceof d?(l=new d(l.toJson()),l.setVerticalAlignment("baseline"),l.setHorizontalAlignment("center")):l=l instanceof h?new h(l.toJson()):new d;l.setText(a);b.symbol=l;if(p=this._getProportionalSize(b.sizeInfo,e.attributes))l instanceof d?l.setSize(p):l instanceof h&&(l.setWidth(p),l.setHeight(p));q=p=0;if(c){n=c.getSymbol(e);var s=this._getSizeInfo(c),r;s&&(r=c.getSize(e,{sizeInfo:s,resolution:m.getResolutionInMeters()}));if(null!=r)p=q=r;else if(n)if("simplemarkersymbol"==
n.type)q=p=n.size;else if("picturemarkersymbol"==n.type)p=n.width,q=n.height;else if("simplelinesymbol"==n.type||"cartographiclinesymbol"==n.type)p=n.width}c={};c.graphic=e;c.options=g;c.geometry=k;c.labelRenderer=b;c.labelSymbol=l;c.labelWidth=l.getWidth()/2;c.labelHeight=l.getHeight()/2;c.symbolWidth=f.normalizedLength(p)/2;c.symbolHeight=f.normalizedLength(q)/2;c.text=a;c.angle=l.angle;this._preparedLabels.push(c)}},_buildLabelText:function(b,d,c,e){return b.replace(/{[^}]*}/g,function(b){var f,
g=b;for(f=0;f<c.length;f++)if("{"+c[f].name+"}"==b){var g=d[c[f].name],h=c[f].domain;if(h&&A.isObject(h)){if("codedValue"==h.type)for(b=0;b<h.codedValues.length;b++)h.codedValues[b].code==g&&(g=h.codedValues[b].name);else"range"==h.type&&(h.minValue<=g&&g<=h.maxValue)&&(g=h.name);break}h=c[f].type;if("esriFieldTypeDate"==h)(h="DateFormat"+k.prototype._dateFormats[e&&e.dateFormat||"shortDate"])&&(g=a.substitute({myKey:g},"${myKey:"+h+"}"));else if("esriFieldTypeInteger"==h||"esriFieldTypeSmallInteger"==
h||"esriFieldTypeLong"==h||"esriFieldTypeDouble"==h)e&&(e.numberFormat&&e.numberFormat.digitSeparator&&e.numberFormat.places)&&(g=H.format(g,{places:e.numberFormat.places}))}return g})},_getLabelExpression:function(a){return a.labelExpressionInfo?a.labelExpressionInfo.value:this._validSyntax(a.labelExpression)?this._convertLabelExpression(a.labelExpression):""},_validSyntax:function(a){return/^(\s*\[[^\]]+\]\s*)+$/i.test(a)},_convertLabelExpression:function(a){return a.replace(RegExp("\\[","g"),"{").replace(RegExp("\\]",
"g"),"}")},_getProportionalSize:function(b,d){if(!b)return null;var c=a.substitute(d,"${"+b.field+"}",{first:!0});return!b.minSize||!b.maxSize||!b.minDataValue||!b.maxDataValue||!c||0>=b.maxDataValue-b.minDataValue?null:(b.maxSize-b.minSize)/(b.maxDataValue-b.minDataValue)*(c-b.minDataValue)+b.minSize},_convertOptions:function(a){var b="shortDate",d=null,c="",e=!0;a&&(void 0!==a.format&&(b=a.format.dateFormat,d={places:a.format.places,digitSeparator:a.format.digitSeparator}),c=a.labelPlacement);if("always-horizontal"==
c||"esriServerPolygonPlacementAlwaysHorizontal"==c)e=!1;return{dateFormat:b,numberFormat:d,pointPriorities:"above-center"==c||"esriServerPointLabelPlacementAboveCenter"==c?"AboveCenter":"above-left"==c||"esriServerPointLabelPlacementAboveLeft"==c?"AboveLeft":"above-right"==c||"esriServerPointLabelPlacementAboveRight"==c?"AboveRight":"below-center"==c||"esriServerPointLabelPlacementBelowCenter"==c?"BelowCenter":"below-left"==c||"esriServerPointLabelPlacementBelowLeft"==c?"BelowLeft":"below-right"==
c||"esriServerPointLabelPlacementBelowRight"==c?"BelowRight":"center-center"==c||"esriServerPointLabelPlacementCenterCenter"==c?"CenterCenter":"center-left"==c||"esriServerPointLabelPlacementCenterLeft"==c?"CenterLeft":"center-right"==c||"esriServerPointLabelPlacementCenterRight"==c?"CenterRight":"AboveRight",lineLabelPlacement:"above-start"==c||"below-start"==c||"center-start"==c?"PlaceAtStart":"above-end"==c||"below-end"==c||"center-end"==c?"PlaceAtEnd":"PlaceAtCenter",lineLabelPosition:"above-after"==
c||"esriServerLinePlacementAboveAfter"==c||"above-along"==c||"esriServerLinePlacementAboveAlong"==c||"above-before"==c||"esriServerLinePlacementAboveBefore"==c||"above-start"==c||"esriServerLinePlacementAboveStart"==c||"above-end"==c||"esriServerLinePlacementAboveEnd"==c?"Above":"below-after"==c||"esriServerLinePlacementBelowAfter"==c||"below-along"==c||"esriServerLinePlacementBelowAlong"==c||"below-before"==c||"esriServerLinePlacementBelowBefore"==c||"below-start"==c||"esriServerLinePlacementBelowStart"==
c||"below-end"==c||"esriServerLinePlacementBelowEnd"==c?"Below":"center-after"==c||"esriServerLinePlacementCenterAfter"==c||"center-along"==c||"esriServerLinePlacementCenterAlong"==c||"center-before"==c||"esriServerLinePlacementCenterBefore"==c||"center-start"==c||"esriServerLinePlacementCenterStart"==c||"center-end"==c||"esriServerLinePlacementCenterEnd"==c?"OnLine":"Above",labelRotation:e,howManyLabels:"OneLabel"}}});E("extend-esri")&&A.setObject("layers.LabelLayer",B,b);return B});