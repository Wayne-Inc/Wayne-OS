(function(){function b(c,a){return c.type=a}var d="push",e="ArrowDown",f="ArrowLeft",g="ArrowRight",k="ArrowUp",l="ShiftLeft",m="ShiftRight",n="inputview-arrow-key ",p="inputview-down-key",q="inputview-left-key",r="inputview-right-key",s="inputview-shift-icon",t="inputview-up-key";function u(c,a,h,J){v.splice.apply(c,w(arguments,1))}function w(c,a,h){return 2>=arguments.length?v.slice.call(c,a):v.slice.call(c,a,h)}
function x(c){var a={toState:1,iconCssClass:s,type:5};a.id=c?l:m;a.supportSticky=!1;return y(a)}function z(c){var a={iconCssClass:n};0==c?(a.id=k,a.iconCssClass+=t,b(a,15)):1==c?(a.id=e,a.iconCssClass+=p,b(a,16)):2==c?(a.id=f,a.iconCssClass+=q,b(a,17)):3==c&&(a.id=g,a.iconCssClass+=r,b(a,18));return y(a)}function y(c){var a={},h;for(h in c)a[h]=c[h];return{spec:a}};var v=Array.prototype;for(var A=[["`","~","\u00ac","\u00ac"],["1","!","\u00b9","\u00a1"],["2","@","\u00b2","\u215b"],["3","#","\u00b3","\u00a3"],["4","$","\u00bc","$"],["5","%","\u00bd","\u215c"],["6","^","\u00be","\u215d"],["7","&","{","\u215e"],["8","*","[","\u2122"],["9","(","]","\u00b1"],["0",")","}","\u00b0"],["-","_","\\","\u00bf"],["=","+","\u0327","\u0328"],["q","Q","@","\u03a9"],["w","W","\u0142","\u0141"],["e","E","\u0119","\u0118"],["r","R","\u00b6","\u00ae"],["t","T","\u0167","\u0166"],["y","Y","\u2190","\u00a5"],
["u","U","\u2193","\u2191"],["i","I","\u2192","\u0131"],["o","O","\u00f3","\u00d3"],["p","P","\u00fe","\u00de"],["[","{","\u0308","\u030a"],["]","}","\u0303","\u0304"],["a","A","\u0105","\u0104"],["s","S","\u015b","\u015a"],["d","D","\u00f0","\u00d0"],["f","F","\u0111","\u00aa"],["g","G","\u014b","\u014a"],["h","H","\u0127","\u0126"],["j","J","\u0309","\u031b"],["k","K","\u0138","&"],["l","L","\u0142","\u0141"],[";",":","\u0301","\u030b"],["'",'"',"\u0302","\u030c"],["\\","|","\u0300","\u0306"],["<",
">","|","\u00a6"],["z","Z","\u017c","\u017b"],["x","X","\u017a","\u0179"],["c","C","\u0107","\u0106"],["v","V","\u201c","\u2018"],["b","B","\u201d","\u2019"],["n","N","\u0144","\u0143"],["m","M","\u00b5","\u00ba"],[",","<","\x00","\u00d7"],[".",">","\u00b7","\u00f7"],["/","?","\u0323","\u0307"],[" "," "]],B=[],C={},D=[192,49,50,51,52,53,54,55,56,57,48,187,191,81,87,69,82,84,90,85,73,79,80,219,221,65,83,68,70,71,72,74,75,76,186,222,220,226,89,88,67,86,66,78,77,188,190,189,32],E="Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Backslash IntlBackslash KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash".split(" "),
F=0;F<A.length-1;F++){var G={};G.id=E[F];b(G,6);G.characters=A[F];G.keyCode=D[F];var H=y(G);B[d](H)}u(B,13,0,y({iconCssClass:"inputview-backspace-icon",type:13,id:"Backspace"}));u(B,14,0,y({iconCssClass:"inputview-tab-icon",type:14,id:"Tab"}));u(B,27,0,y({toState:4,name:"caps lock",type:5,id:"OsLeft"}));u(B,40,0,y({iconCssClass:"inputview-enter-icon",type:12,id:"Enter"}));u(B,41,0,x(!0));B[d](x(!1));B[d](y({iconCssClass:"inputview-globe-icon",type:27,id:"Globe"}));
B[d](y({name:"\u22ee",toKeyset:void 0,type:26,id:"Menu"}));B[d](y({toState:8,name:"ctrl",type:5,id:"ControlLeft"}));B[d](y({toState:16,name:"alt",type:5,id:"AltLeft"}));B[d](y({name:" ",type:11,id:"Space"}));B[d](y({toState:2,name:"alt gr",type:5,id:"AltRight"}));B[d](z(2));B[d](z(3));B[d](y({iconCssClass:"inputview-hide-keyboard-icon",type:19,id:"HideKeyboard"}));for(F=0;F<B.length;F++)H=B[F],C[H.spec.id]="102kbd-k-"+F;var I=[];I.keyList=B;I.mapping=C;I.layout="102kbd";I.hasAltGrKey=!0;
I.hasCompactKeyboard=!1;I.showMenuKey=!0;I.id="pl";google.ime.chrome.inputview.onConfigLoaded(I);})();
