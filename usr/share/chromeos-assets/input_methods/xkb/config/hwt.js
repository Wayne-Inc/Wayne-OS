(function(){function a(g){var h={},e;for(e in g)h[e]=g[e];return{spec:h}};for(var b={id:"Comma",type:6,characters:[","]},c=a(b),b={id:"Period",type:6,characters:["."]},d=a(b),b={text:"",iconCssClass:"inputview-space-icon",type:11,id:"Space"},f=[c,d,a(b),a({iconCssClass:"inputview-backspace-icon",type:13,id:"Backspace"}),a({iconCssClass:"inputview-enter-icon",type:12,id:"Enter"}),a({iconCssClass:"inputview-hide-keyboard-icon",type:19,id:"HideKeyboard"})],k={},l=0;l<f.length;l++)k[f[l].spec.id]="handwriting-k-"+l;var m=[];m.keyList=f;m.mapping=k;m.layout="handwriting";
m.hasAltGrKey=!1;m.hasCompactKeyboard=!1;m.id="hwt";google.ime.chrome.inputview.onConfigLoaded(m);})();
