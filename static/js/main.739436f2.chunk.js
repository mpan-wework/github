(this["webpackJsonp@mpan-wework/github"]=this["webpackJsonp@mpan-wework/github"]||[]).push([[0],{12:function(e,t,n){e.exports={Container:"Container_Container__1xchs",CodeMirror:"Container_CodeMirror__35fGV",textArea:"Container_textArea__3rPsr"}},13:function(e,t,n){e.exports={Container:"Container_Container__3yJhZ",dir:"Container_dir__LCg2u",slash:"Container_slash__2ed1z"}},14:function(e,t,n){e.exports={BlobViewer:"BlobViewer_BlobViewer__3TjFI",sidebarWrapper:"BlobViewer_sidebarWrapper__1w6UP",contentWrapper:"BlobViewer_contentWrapper__1s9ME"}},22:function(e,t,n){e.exports={TreeNode:"TreeNode_TreeNode__3DTfP"}},23:function(e,t,n){e.exports={Container:"Container_Container__39U8O"}},27:function(e,t,n){e.exports=n(41)},32:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(20),o=n.n(c),s=(n(32),n(33),n(34),n(24)),u=n(7),i=n(10),l=n(2),p=n.n(l),m=n(5),b=n(21),f=n.n(b),h=n(12),d=n.n(h),v=function(e){var t=e.blob,n=Object(a.useRef)(null),c=Object(a.useRef)(null),o=Object(a.useState)(""),s=Object(m.a)(o,2),u=s[0],i=s[1],l=Object(a.useCallback)((function(){t.content?i(window.atob(t.content)):i("mike")}),[t,i]);return Object(a.useEffect)((function(){n.current&&!c.current||(n.current=f.a.fromTextArea(c.current,{mode:"javascript",theme:"the-matrix",smartIndent:!0,lineWrapping:!0,lineNumbers:!0,readOnly:!0,autofocus:!0}))}),[c]),Object(a.useEffect)((function(){n.current&&n.current.getDoc().setValue(u)}),[n,u]),r.a.createElement("main",{className:d.a.Container},r.a.createElement("div",{onClick:l},"Reset"),r.a.createElement("div",{className:d.a.CodeMirror},r.a.createElement("textarea",{className:d.a.textArea,ref:c})))},w={getItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return window.localStorage.getItem("".concat(window.location.pathname,":").concat(e))||t},setItem:function(e,t){return window.localStorage.setItem("".concat(window.location.pathname,":").concat(e),t)}},_=function(e){var t,n,a,r=arguments;return p.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return t=r.length>1&&void 0!==r[1]?r[1]:{},n=/^https:/.test(e)?e:"https://api.github.com".concat(e),c.prev=2,c.next=5,p.a.awrap(window.fetch(n,{headers:Object(i.a)({Authorization:"token ".concat(w.getItem("token"))},t.headers)}));case 5:return a=c.sent,c.abrupt("return",a.ok?a.json():null);case 9:return c.prev=9,c.t0=c.catch(2),console.error(c.t0),c.abrupt("return",null);case 13:case"end":return c.stop()}}),null,null,[[2,9]])},C={user:function(e){return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",_("/user",{headers:{Authorization:"token ".concat(e)}}));case 1:case"end":return t.stop()}}))},orgs:function(){return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",_("/user/orgs"));case 1:case"end":return e.stop()}}))},tree:function(e,t,n){var a,r=arguments;return p.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return a=!(r.length>3&&void 0!==r[3])||r[3],c.abrupt("return",_("/repos/".concat(e,"/").concat(t,"/git/trees/").concat(n).concat(a?"?recursive=1":"")));case 2:case"end":return c.stop()}}))},blob:function(e){return p.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",_(e));case 1:case"end":return t.stop()}}))}},g=n(8),j=n.n(g),E=function(e){var t=e.fetchData,n=Object(a.useState)(null),c=Object(m.a)(n,2),o=c[0],s=c[1],u=Object(a.useState)(w.getItem("token","")),i=Object(m.a)(u,2),l=i[0],b=i[1],f=Object(a.useCallback)((function(e){b(e.target.value)}),[b]),h=Object(a.useCallback)((function(){var e;return p.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,p.a.awrap(C.user(l));case 2:(e=n.sent)&&(w.setItem("token",l),s(e),setTimeout(t,0));case 4:case"end":return n.stop()}}))}),[l,s,t]),d=Object(a.useCallback)((function(){s(null)}),[s]);return r.a.createElement("div",{className:j.a.Container},r.a.createElement("input",{className:j.a.tokenInput,type:"text",placeholder:"Personal Access Token",disabled:null!==o,onChange:f,value:l}),o?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:j.a.owner},o.login),r.a.createElement("div",{className:[j.a.logout,j.a.compButton].join(" "),onClick:d},"Log Out")):r.a.createElement("div",{className:[j.a.login,j.a.compButton].join(" "),onClick:h},"Log In"))},O=n(13),k=n.n(O),x=function(e){var t=e.path,n=Object(a.useMemo)((function(){return t.split("/")}),[t]);return r.a.createElement("div",{className:k.a.Container},n.map((function(e,t){return r.a.createElement(r.a.Fragment,{key:"".concat(t).concat(e)},r.a.createElement("div",{className:k.a.dir},e),r.a.createElement("div",{className:k.a.slash},"/"))})))},N=n(22),y=n.n(N),I=function e(t){var n=t.tree,c=t.visitPath,o=Object(a.useCallback)((function(){c(n.path)}),[n,c]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:y.a.TreeNode,onClick:o,style:{paddingLeft:"".concat(.5*n.depth,"rem")}},n.name),n.subs.map((function(t){return r.a.createElement(e,{key:t.path,tree:t,visitPath:c})})))},B=n(23),S=n.n(B),T=function(e){var t=e.blobs,n=e.visitPath,c=Object(a.useMemo)((function(){var e={path:"/",name:"/",subs:[],depth:0},n=[e];return t.forEach((function(e){var t=null,a=e.path.lastIndexOf("/");t=-1===a?"":e.path.slice(0,a);var r=n.find((function(e){return e.path===t})),c=Object(i.a)({},e,{name:e.path.replace(/^.+\//,""),subs:[],depth:r.depth+1});r.subs.push(c),"tree"===e.type&&n.push(c)})),e}),[t]);return r.a.createElement("div",{className:S.a.Container},r.a.createElement(I,{tree:c,visitPath:n}))},P=n(14),W=n.n(P),M=[{path:"/blob-viewer",component:function(){var e=Object(a.useState)("mpan-wework"),t=Object(m.a)(e,1)[0],n=Object(a.useState)("github"),c=Object(m.a)(n,1)[0],o=Object(a.useState)("master"),s=Object(m.a)(o,1)[0],u=Object(a.useState)([]),l=Object(m.a)(u,2),b=l[0],f=l[1],h=Object(a.useState)({}),d=Object(m.a)(h,2),w=d[0],_=d[1],g=Object(a.useCallback)((function(){var e;return p.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,p.a.awrap(C.tree(t,c,s));case 2:e=n.sent,f(e.tree);case 4:case"end":return n.stop()}}))}),[t,c,s,f]),j=Object(a.useCallback)((function(){return p.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.awrap(C.orgs());case 2:setTimeout((function(){return g()}),0);case 3:case"end":return e.stop()}}))}),[g]),O=Object(a.useCallback)((function(e){var t,n;return p.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(!(t=b.find((function(t){return t.path===e})))){a.next=8;break}return a.next=4,p.a.awrap(C.blob(t.url));case 4:n=a.sent,_(Object(i.a)({},n,{path:e})),a.next=9;break;case 8:_({});case 9:case"end":return a.stop()}}))}),[b,_]);return r.a.createElement("div",{className:W.a.BlobViewer},r.a.createElement("div",{className:W.a.sidebarWrapper},r.a.createElement(T,{blobs:b,blob:w,visitPath:O})),r.a.createElement("div",{className:W.a.contentWrapper},r.a.createElement(E,{fetchData:j}),r.a.createElement(x,{path:w.path||"",visitPath:O}),r.a.createElement(v,{blob:w})))}}],V=function(){return r.a.createElement(s.a,null,r.a.createElement(u.d,null,M.map((function(e){return r.a.createElement(u.b,{key:e.path,path:e.path,render:function(t){return r.a.createElement(e.component,t)}})})),r.a.createElement(u.a,{from:"*",to:"/blob-viewer/"})))},A=function(){return r.a.createElement(V,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,n){e.exports={Container:"Container_Container__13MpU",tokenInput:"Container_tokenInput__2uTiS",owner:"Container_owner__1gdhJ",logout:"Container_logout__1fklQ",login:"Container_login__z05_i",compButton:"Container_compButton__3MFji"}}},[[27,1,2]]]);
//# sourceMappingURL=main.739436f2.chunk.js.map