(function(){function c(b,a){return b.type=a}
var d="data",e="push",k="length",m=".",aa="ArrowDown",ba="ArrowLeft",ca="ArrowRight",da="ArrowUp",n="ShiftLeft",p="ShiftRight",ea="The number of switcher key spec is less than the number of switcher keys in the keyset.",fa="The number of switcher key spec is more than the number of switcher keys in the keyset.",ga="compactkbd-k-",ha="compactkbd-k-key-",q="compactkbd-numberpad",r="compactkbd-qwerty",ia="inputview-arrow-key ",s="inputview-backspace-icon",ja="inputview-down-key",t="inputview-enter-icon",
u="inputview-font-small",v="inputview-globe-icon",w="inputview-hide-keyboard-icon",ka="inputview-left-key",x="inputview-menu-icon",la="inputview-right-key",y="inputview-shift-icon",ma="inputview-up-key",z="more symbols layout",A="no.compact.qwerty",B="number and symbol layout";
function C(b){for(var a=[],f={},g=0;g<b[d][k];g++){var l=b[d][g];l==D&&(l.toKeyset=b.id.split(m)[0]);var h;h=l;h.id=l.id?l.id:ha+g;h.type||c(h,22);var l={},J=void 0;for(J in h)l[J]=h[J];h={spec:l};a[e](h);f[h.spec.id]=ga+g}return{keyList:a,mapping:f,layout:b.layout}}function E(b,a){for(var f=0,g=0;g<b[k];g++)if(b[g]==F){if(f>=a[k]){console.error(ea);return}var l=a[f++],h;for(h in b[g])l[h]=b[g][h];b[g]=l}f<a[k]-1&&console.error(fa)}function G(b,a,f,g){H.splice.apply(b,na(arguments,1))}
function na(b,a,f){return 2>=arguments[k]?H.slice.call(b,a):H.slice.call(b,a,f)}function oa(b){var a={toState:1,iconCssClass:y,type:5};a.id=b?n:p;a.supportSticky=!1;return I(a)}function pa(b){var a={iconCssClass:ia};0==b?(a.id=da,a.iconCssClass+=ma,c(a,15)):1==b?(a.id=aa,a.iconCssClass+=ja,c(a,16)):2==b?(a.id=ba,a.iconCssClass+=ka,c(a,17)):3==b&&(a.id=ca,a.iconCssClass+=la,c(a,18));return I(a)}function I(b){var a={},f;for(f in b)a[f]=b[f];return{spec:a}};var K={iconCssClass:s,type:13,id:"Backspace"},L={iconCssClass:t,type:12,id:"Enter"},M={iconCssClass:w,type:19,id:"HideKeyboard"},N={name:" ",type:11,id:"Space"},F={type:21},D={iconCssClass:x,type:26,id:"Menu"};var H=Array.prototype;for(var qa=[["|","\u00a7","\u00a6","\u00b6"],["1","!","\u00a1","\u00b9"],["2",'"',"@","\u00b2"],["3","#","\u00a3","\u00b3"],["4","\u00a4","$","\u00bc"],["5","%","\u00bd","\u2030"],["6","&","\u00a5","\u215d"],["7","/","{","\u00f7"],["8","(","[","\u00ab"],["9",")","]","\u00bb"],["0","=","}","\u00b0"],["+","?","\u00b1","\u00bf"],["\\","\u0300","\u0301","\u00ac"],["q","Q","@","\u03a9"],["w","W","\u0142","\u0141"],["e","E","\u20ac","\u00a2"],["r","R","\u00ae","\u2122"],["t","T","\u00fe","\u00de"],["y",
"Y","\u2190","\u00a5"],["u","U","\u2193","\u2191"],["i","I","\u2192","\u0131"],["o","O","\u0153","\u0152"],["p","P","\u03c0","\u03a0"],["\u00e5","\u00c5","\u0308","\u030a"],["\u0308","\u0302","\u0303","\u030c"],["a","A","\u00aa","\u00ba"],["s","S","\u00df","\u00a7"],["d","D","\u00f0","\u00d0"],["f","F","\u0111","\u00aa"],["g","G","\u014b","\u014a"],["h","H","\u0127","\u0126"],["j","J","\u0309","\u031b"],["k","K","\u0138","&"],["l","L","\u0142","\u0141"],["\u00f8","\u00d8","\u0301","\u030b"],["\u00e6",
"\u00c6","\u0302","\u030c"],["'","*","\u030b","\u00d7"],["<",">","\u00bd","\u00be"],["z","Z","\u00ab","<"],["x","X","\u00bb",">"],["c","C","\u00a9","\u00a9"],["v","V","\u201c","\u2018"],["b","B","\u201d","\u2019"],["n","N"],["m","M","\u00b5","\u00ba"],[",",";","\u0327","\u0328"],[m,":","\u2026","\u00b7"],["-","_","\u2013","\u2014"],[" "," ","\u00a0","\u202f"]],O=[],ra={},sa=[220,49,50,51,52,53,54,55,56,57,48,187,219,81,87,69,82,84,89,85,73,79,80,221,186,65,83,68,70,71,72,74,75,76,192,222,191,226,
90,88,67,86,66,78,77,188,190,189,32],ta="Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Backslash IntlBackslash KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash".split(" "),P=0;P<qa[k]-1;P++){var Q={};Q.id=ta[P];c(Q,6);Q.characters=qa[P];Q.keyCode=sa[P];var R=I(Q);O[e](R)}G(O,13,0,I({iconCssClass:s,type:13,id:"Backspace"}));
G(O,14,0,I({iconCssClass:"inputview-tab-icon",type:14,id:"Tab"}));G(O,27,0,I({toState:4,name:"caps lock",type:5,id:"OsLeft"}));G(O,40,0,I({iconCssClass:t,type:12,id:"Enter"}));G(O,41,0,oa(!0));O[e](oa(!1));O[e](I({iconCssClass:v,type:27,id:"Globe"}));O[e](I({iconCssClass:x,toKeyset:A,type:26,id:"Menu"}));O[e](I({toState:8,name:"ctrl",type:5,id:"ControlLeft"}));O[e](I({toState:16,name:"alt",type:5,id:"AltLeft"}));O[e](I({name:" ",type:11,id:"Space"}));O[e](I({type:42,id:"enSwitcher"}));
O[e](I({toState:2,name:"alt gr",type:5,id:"AltRight"}));O[e](pa(2));O[e](pa(3));O[e](I({iconCssClass:w,type:19,id:"HideKeyboard"}));for(P=0;P<O[k];P++)R=O[P],ra[R.spec.id]="102kbd-k-"+P;var S=[];S.keyList=O;S.mapping=ra;S.layout="102kbd";S.hasAltGrKey=!0;S.hasCompactKeyboard=!0;S.showMenuKey=!0;S.id="no";google.ime.chrome.inputview.onConfigLoaded(S);
var T={id:A,layout:"compactkbd-nordic"},U=[{text:"q",hintText:"1"},{text:"w",hintText:"2"},{text:"e",hintText:"3"},{text:"r",hintText:"4"},{text:"t",hintText:"5"},{text:"y",hintText:"6"},{text:"u",hintText:"7",moreKeys:["\u00fc"]},{text:"i",hintText:"8"},{text:"o",hintText:"9",moreKeys:"\u00f8\u00f4\u00f2\u00f3\u00f5\u0153\u014d".split("")},{text:"p",hintText:"0"},{text:"\u00e5"},K,{text:"a",moreKeys:"\u00e6\u00e0\u00e1\u00e2\u00e3\u0101".split("")},{text:"s",moreKeys:["\u0161","\u00df","\u015b"]},
{text:"d"},{text:"f"},{text:"g"},{text:"h"},{text:"j"},{text:"k"},{text:"l"},{text:"\u00f6",moreKeys:["\u00f8"]},{text:"\u00e4",moreKeys:["\u00e6"]},L,{toState:1,iconCssClass:y,type:5,id:n,supportSticky:!0},{text:"z",marginLeftPercent:.33,moreKeys:["\u017e","\u017a","\u017c"]},{text:"x"},{text:"c"},{text:"v"},{text:"b"},{text:"n"},{text:"m"},{text:"!",moreKeys:["\u00a1"]},{text:"?",marginRightPercent:.33,moreKeys:["\u00bf"]},{toState:1,iconCssClass:y,type:5,id:p,supportSticky:!0},F,{iconCssClass:v,
type:27,id:"Globe"},D,{text:"/",isGrey:!0},N,{text:",",isGrey:!0},{text:m,isGrey:!0,moreKeys:"#!\\?-:'@".split("")},M];U[2].moreKeys="\u00e9\u00e8\u00ea\u00eb\u0119\u0117\u0113".split("");U[6].moreKeys=["\u00fc","\u00fb","\u00f9","\u00fa","\u016b"];U[8].moreKeys="\u00f4\u00f2\u00f3\u00f6\u00f5\u0153\u014d".split("");U[12].moreKeys="\u00e0\u00e4\u00e1\u00e2\u00e3\u0101".split("");U[13].moreKeys=void 0;U[21].moreKeys=["\u00f6"];U[22].moreKeys=["\u00e4"];U[25].moreKeys=void 0;U[21].text="\u00f8";
U[22].text="\u00e6";T.data=U;
var V={id:"no.compact.symbol",layout:r,data:[{text:"1",moreKeys:["\u00b9","\u00bd","\u2153","\u00bc","\u215b"]},{text:"2",moreKeys:["\u00b2","\u2154"]},{text:"3",moreKeys:["\u00b3","\u00be","\u215c"]},{text:"4",moreKeys:["\u2074"]},{text:"5",moreKeys:["\u215d"]},{text:"6"},{text:"7",moreKeys:["\u215e"]},{text:"8"},{text:"9"},{text:"0",moreKeys:["\u207f","\u2205"]},K,{text:"@",marginLeftPercent:.33},{text:"#"},{text:"$",moreKeys:["\u00a2","\u00a3","\u20ac","\u00a5","\u20b1"]},{text:"%",moreKeys:["\u2030"]},
{text:"&"},{text:"-",moreKeys:["_","\u2013","\u2014","\u00b7"]},{text:"+",moreKeys:["\u00b1"]},{text:"(",moreKeys:["{","<","["]},{text:")",moreKeys:["}",">","]"]},L,F,{text:"\\"},{text:"="},{text:"*",moreKeys:["\u2020","\u2021","\u2605"]},{text:'"',moreKeys:["\u201c","\u201e","\u201d","\u00ab","\u00bb"]},{text:"'",moreKeys:["\u2018","\u201a","\u2019","\u2039","\u203a"]},{text:":"},{text:";"},{text:"!",moreKeys:["\u00a1"]},{text:"?",moreKeys:["\u00bf"]},F,F,{text:"_",isGrey:!0},D,{text:"/",isGrey:!0},
N,{text:",",isGrey:!0},{text:m,isGrey:!0,moreKeys:["\u2026"]},M]},W={id:"no.compact.more",layout:r,data:[{text:"~"},{text:"`"},{text:"|"},{text:"\u2022",moreKeys:["\u266a","\u2665","\u2660","\u2666","\u2663"]},{text:"\u23b7"},{text:"\u03c0",moreKeys:["\u03a0"]},{text:"\u00f7"},{text:"\u00d7"},{text:"\u00b6",moreKeys:["\u00a7"]},{text:"\u0394"},K,{text:"\u00a3",marginLeftPercent:.33},{text:"\u00a2"},{text:"\u20ac"},{text:"\u00a5"},{text:"^",moreKeys:["\u2191","\u2193","\u2190","\u2192"]},{text:"\u00b0",
moreKeys:["\u2032","\u2033"]},{text:"=",moreKeys:["\u2260","\u2248","\u221e"]},{text:"{"},{text:"}"},L,F,{text:"\\"},{text:"\u00a9"},{text:"\u00ae"},{text:"\u2122"},{text:"\u2105"},{text:"["},{text:"]"},{text:"\u00a1"},{text:"\u00bf"},F,F,{text:"<",isGrey:!0,moreKeys:["\u2039","\u2264","\u00ab"]},D,{text:">",isGrey:!0,moreKeys:["\u203a","\u2265","\u00bb"]},N,{text:",",isGrey:!0},{text:m,isGrey:!0,moreKeys:["\u2026"]},M]},X=google.ime.chrome.inputview.onConfigLoaded;
E(T[d],[{name:"?123",toKeyset:V.id,toKeysetName:B}]);var Y=C(T);Y.id=T.id;Y.showMenuKey=!0;X(Y);E(V[d],[{name:"~[<",toKeyset:W.id,toKeysetName:z},{name:"~[<",toKeyset:W.id,toKeysetName:z},{name:"abc",toKeyset:T.id,toKeysetName:"main layout"}]);Y=C(V);Y.id=V.id;Y.showMenuKey=!1;Y.noShift=!0;X(Y);E(W[d],[{name:"?123",toKeyset:V.id,toKeysetName:B},{name:"?123",toKeyset:V.id,toKeysetName:B},{name:"abc",toKeyset:T.id,toKeysetName:"main layout"}]);Y=C(W);Y.id=W.id;Y.showMenuKey=!1;Y.noShift=!0;X(Y);
var Z={number:{id:"no.compact.numberpad",layout:q,data:[{text:"-",isGrey:!0},{text:"+",isGrey:!0},{text:m,isGrey:!0},{text:"1"},{text:"2"},{text:"3"},K,{text:"*",isGrey:!0},{text:"/",isGrey:!0},{text:",",isGrey:!0},{text:"4"},{text:"5"},{text:"6"},L,{text:"(",isGrey:!0},{text:")",isGrey:!0},{text:"=",isGrey:!0},{text:"7"},{text:"8"},{text:"9",marginRightPercent:.545454},N,{text:"*"},{text:"0"},{text:"#"},M]},tel:{id:"no.compact.phonepad",layout:q,data:[{text:"-",isGrey:!0},{text:"+",isGrey:!0},{title:"Pause",
text:",",isGrey:!0,textCssClass:u},{text:"1"},{text:"2",hintText:"ABC"},{text:"3",hintText:"DEF"},K,{text:",",isGrey:!0},{text:m,isGrey:!0},{title:"Wait",text:";",isGrey:!0,textCssClass:u},{text:"4",hintText:"GHI"},{text:"5",hintText:"JKL"},{text:"6",hintText:"MNO"},L,{text:"(",isGrey:!0},{text:")",isGrey:!0},{text:"N",isGrey:!0},{text:"7",hintText:"PQRS"},{text:"8",hintText:"TUV"},{text:"9",hintText:"WXYZ",marginRightPercent:.545454},N,{text:"*"},{text:"0"},{text:"#"},M]}},ua=google.ime.chrome.inputview.onConfigLoaded;
if(Z)for(var va in Z){var wa=Z[va],$=C(wa);$.id=wa.id;$.showMenuKey=!1;$.noShift=!0;$.onContext=va;ua($)};})();
