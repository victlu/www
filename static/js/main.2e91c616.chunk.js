(this.webpackJsonplogviewer=this.webpackJsonplogviewer||[]).push([[0],{15:function(e,t,n){},40:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),s=n(24),c=n.n(s),i=(n(40),n(3)),l=n(4),o=n(17),d=n(25),h=n.n(d),j=(n(41),n(15),n(0));var u=function(e){var t=r.a.useState(),n=Object(i.a)(t,2),a=n[0],s=n[1],c=r.a.useState(),d=Object(i.a)(c,2),u=d[0],b=d[1],m={},g={},x={},f={},v={},O={},p={},S={};if(!a){var w=new o.Builder;w.ref("id"),w.field("ActivityId"),w.field("ErrorCode"),w.field("ErrorCodeMsg"),w.field("ErrorType"),w.field("File"),w.field("Function"),w.field("Instance"),w.field("Level"),w.field("Line"),w.field("MDRESULT"),w.field("Message"),w.field("Pid"),w.field("Stream"),w.field("Tid"),w.field("TimeStamp"),w.field("traceparentId"),w.field("Date"),w.field("Time"),s(w)}var y=function(e,t,n,a){var r=e[n];r||(e[n]={},r=e[n]),r.meta||(r.meta={});var s=r[a];s||(r[a]=[],s=r[a]),s.meta||(s.meta={}),s.push(t)},I=function(t){e.setIncludeLunr(!e.getIncludeLunr)},C=function(t,n){if(n.id=t,n.TimeStamp=n["[0] Time Stamp"],n.TimeStamp.length>0){var r=new Date(n.TimeStamp),s=r.getUTCFullYear().toString(),c=r.getUTCMonth()+1<10?"0"+(r.getUTCMonth()+1):(r.getUTCMonth()+1).toString(),i=r.getUTCDate()<10?"0"+r.getUTCDate():r.getUTCDate().toString();n.Date=s+"-"+c+"-"+i;var l=r.getUTCHours()<10?"0"+r.getUTCHours():r.getUTCHours().toString(),o=r.getUTCMinutes()<10?"0"+r.getUTCMinutes():r.getUTCMinutes().toString(),d=r.getUTCSeconds()<10?"0"+r.getUTCSeconds():r.getUTCSeconds().toString();n.Time=l+":"+o+":"+d;var h=c+"/"+i+" "+l+":"+o+":"+d,j=c+"/"+i+" "+l+":00:00";y(m,t,n.Date,l+":00:00"),y(g,t,n.Pid,n.Tid),y(x,t,n.Pid,"All"),y(f,t,"Level "+n.Level,j),y(v,t,n.Stream,j),y(O,t,n.Pid,n.Stream),y(p,t,n.ErrorType,n.Stream),y(S,t,n.ActivityId,"All");var u="Monitoring Agent Version ",b=n.Message.indexOf(u);if(b>=0){b+=u.length;var w=n.Message.substr(b,8);x[n.Pid].meta.Version=w}var I=x[n.Pid].meta;if((!I.FirstTS||I.FirstTS>h)&&(I.FirstTS=h),"MonAgentCore.exe"===n.Stream&&(I.Agent="Core"),u="Agent will exit when parent process ",0===(b=n.Message.indexOf(u))){b=u.length;var C=n.Message.indexOf(" exits."),N=n.Message.substr(b,C-b);I.Parent=N}(!(I=g[n.Pid][n.Tid].meta).FirstTS||I.FirstTS>h)&&(I.FirstTS=h),e.getIncludeLunr&&a.add(n)}else console.log("Bad Record:",n)},N=function t(n){var r=n.file,s=n.prom,c=n.records,i=n.pos,l=Math.min(i+2e4,c.length),o="Indexing: "+l+" of "+c.length;for(b(o),console.log(o,n);i<l;)C(i,c[i]),i++;if(i<c.length)s.then((function(){return new Promise((function(e){setTimeout((function(){var n=t({file:r,prom:s,records:c,pos:i});e(n)}),10)}))}));else{var d="Building index...";b(d),console.log(d,n),s.then((function(){return new Promise((function(t){setTimeout((function(){var n=function(t){var n=a.build();T(t.records,m);var r="Done building index";if(b(r),console.log(r),e.onUpdateIndex){var s={File:t.file,Records:t.records,LunrIndex:n,Index:[{Name:"Date x Time",Index:m},{Name:"Process",Index:x},{Name:"Process x Tid",Index:g},{Name:"Process x Stream",Index:O},{Name:"Level x Time",Index:f},{Name:"Stream x Time",Index:v},{Name:"ErrorType x Stream",Index:p},{Name:"-Activty",Index:S}]};e.onUpdateIndex(s)}return!0}({file:r,prom:s,records:c,pos:i});t(n)}),10)}))}))}return{prom:s,records:c,pos:i}},T=function(e,t){for(var n in t)if("meta"!==n){var a=t[n],r=0,s=0,c=0,i=0,l=0;for(var o in a){var d=a[o],h=0,j=0,u=0,b=0,m=0;for(var g in d){if("meta"!==g)switch(e[d[g]].Level){case"1":h++;break;case"2":j++;break;case"3":u++;break;case"4":b++;break;default:m++}}h>0&&(d.meta.e1=h),j>0&&(d.meta.e2=j),u>0&&(d.meta.e3=u),b>0&&(d.meta.e4=b),m>0&&(d.meta.e5=m),r+=h,s+=j,c+=u,i+=b,l+=m}r>0&&(a.meta.e1=r),s>0&&(a.meta.e2=s),c>0&&(a.meta.e3=c),i>0&&(a.meta.e4=i),l>0&&(a.meta.e5=l)}},F=[];return u?F.push(Object(j.jsx)("h2",{children:u},F.length)):(F.push(Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{type:"button",className:"btn btn-primary",onClick:function(e){document.getElementById("file").click()},children:"Open MAEventTable.csv"}),Object(j.jsx)("input",{id:"file",type:"file",style:{display:"none"},onChange:function(e){var t=e.target.files[0];if(t){var n;b("Reading file...");var a=new Promise((function(e){n=e}));a.then((function(e){return new Promise((function(n){setTimeout((function(){var r=N({file:t,prom:a,records:e,pos:0});n(r)}),10)}))})),h.a.parse(t,{header:!0,quoteChar:'"',complete:function(e){b("Start indexing..."),console.log("Records",e.data.length,e.data[0],e.data[e.data.length-1]),n(e.data)}})}},accept:".csv"})]},F.length)),F.push(Object(j.jsxs)("div",{children:["Lunr Search: ",e.getIncludeLunr?Object(j.jsx)(l.a,{bg:"info",onClick:I,children:"On"}):Object(j.jsx)(l.a,{bg:"secondary",onClick:I,children:"Off"})]},F.length))),Object(j.jsx)("div",{children:F})},b=n(11),m=n(26);function g(){return Object(j.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-square",viewBox:"0 0 16 16",children:Object(j.jsx)("path",{d:"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"})})}function x(){return Object(j.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-heart",viewBox:"0 0 16 16",children:Object(j.jsx)("path",{d:"m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"})})}function f(){return Object(j.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"red",className:"bi bi-heart-fill",viewBox:"0 0 16 16",children:Object(j.jsx)("path",{fillRule:"evenodd",d:"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"})})}function v(){return Object(j.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-plus-square",viewBox:"0 0 16 16",children:[Object(j.jsx)("path",{d:"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"}),Object(j.jsx)("path",{d:"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"})]})}function O(){return Object(j.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-dash-square",viewBox:"0 0 16 16",children:[Object(j.jsx)("path",{d:"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"}),Object(j.jsx)("path",{d:"M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"})]})}function p(){return Object(j.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-square-fill",viewBox:"0 0 16 16",children:Object(j.jsx)("path",{d:"M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z"})})}function S(){return Object(j.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-right-short",viewBox:"0 0 16 16",children:Object(j.jsx)("path",{fillRule:"evenodd",d:"M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"})})}function w(){return Object(j.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-arrow-left-short",viewBox:"0 0 16 16",children:Object(j.jsx)("path",{fillRule:"evenodd",d:"M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"})})}function y(){return Object(j.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-receipt",viewBox:"0 0 16 16",children:[Object(j.jsx)("path",{d:"M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z"}),Object(j.jsx)("path",{d:"M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"})]})}var I=function(e){var t,n=r.a.useState(0),a=Object(i.a)(n,2),s=a[0],c=a[1],o=function(t){e.UpdateFavorite&&e.UpdateFavorite(e.RecIndex),c(s+1)},d=e.Index.Records[e.RecIndex];return Object(j.jsxs)(m.a,{fluid:"xs",className:"recordPane mb-3",children:[Object(j.jsx)("div",{children:Object(j.jsxs)("small",{children:[Object(j.jsx)(l.a,{className:"mr-1",pill:!0,bg:function(e){switch(e){case"1":case"2":return"danger";default:return"secondary"}}(d.Level),children:d.Level}),Object(j.jsx)(l.a,{className:"mr-1",bg:"primary",children:d.Date}),Object(j.jsx)(l.a,{className:"mr-1",bg:"primary",children:d.Time}),Object(j.jsxs)(l.a,{className:"mr-1",bg:"info",children:["Pid:",d.Pid]}),Object(j.jsxs)(l.a,{className:"mr-1",bg:"info",children:["Tid:",d.Tid]}),Object(j.jsxs)(l.a,{className:"mr-1",bg:"success",children:["Stream:",d.Stream]}),Object(j.jsxs)(l.a,{className:"mr-1",bg:"success",children:["ErrorType:",d.ErrorType]}),Object(j.jsxs)(l.a,{className:"mr-1",bg:"secondary",children:[d.Function," ",d.File,":",d.Line]}),d.MDResult>0?Object(j.jsxs)(l.a,{className:"mr-1",bg:"warning",children:["MDResult:",d.MDResult]}):null,d.ErrorCode>0?Object(j.jsxs)(l.a,{className:"mr-1",bg:"warning",children:["ErrorCode:",d.ErrorCode]}):null,d.ErrorCodeMsg.length>0?Object(j.jsxs)(l.a,{className:"mr-1",bg:"warning",children:["ErrorCodeMsg:",d.ErrorCodeMsg]}):null,d.Instance&&Number(d.Instance)>0?Object(j.jsxs)(l.a,{className:"mr-1",bg:"secondary",children:["Inst:",d.Instance]}):null,e.UpdateActivity?Object(j.jsx)("span",{className:"mr-1",onClick:function(){return t=d.ActivityId,void(e.UpdateActivity&&e.UpdateActivity(t));var t},children:Object(j.jsx)(y,{})}):null,(t=e.RecIndex,e.Favorite[t]?Object(j.jsx)("span",{className:"mr-1",onClick:o,children:Object(j.jsx)(f,{})}):Object(j.jsx)("span",{className:"mr-1",onClick:o,children:Object(j.jsx)(x,{})}))]})}),d.Message]})};var C=function(e){var t=r.a.useState(0),n=Object(i.a)(t,2),a=n[0],s=n[1],c=r.a.useState(!1),o=Object(i.a)(c,2),d=o[0],h=o[1],u=e.ActivityId,m=e.Index.Index[7].Index[u],g=[];if(a>=0){if(g.push(Object(j.jsxs)("div",{children:["ActivityID: ",Object(j.jsx)("b",{children:u})]},g.length)),g.push(Object(j.jsxs)("div",{children:[Object(j.jsx)(l.a,{className:"btn mr-1",bg:"success",onClick:function(){s(Math.max(0,a-10))},children:"Prev"}),Object(j.jsx)(l.a,{className:"btn mr-1",pill:!0,children:a+1}),Object(j.jsxs)(l.a,{className:"btn mr-1",bg:"secondary",onClick:function(){h(!0)},children:["/ ",m.All.length]}),Object(j.jsx)(l.a,{className:"btn mr-1",bg:"success",onClick:function(){var e=a+10;e<=m.All.length&&s(e)},children:"Next"}),Object(j.jsx)("hr",{})]},g.length)),d){for(var x=[],f=function(e){x.push(Object(j.jsx)(l.a,{className:"btn mr-1",pill:!0,onClick:function(){s(e),h(!1)},children:e+1},x.length))},v=0;v<m.All.length;v+=10)f(v);g.push(Object(j.jsx)(b.a,{show:d,onHide:function(){h(!1)},children:Object(j.jsx)(b.a.Body,{children:x})},g.length))}for(var O=0,p=a;p<m.All.length&&!(O>=10);p++)g.push(Object(j.jsx)(I,{Index:e.Index,RecIndex:m.All[p],Favorite:e.Favorite,UpdateFavorite:e.UpdateFavorite},g.length)),O++}return Object(j.jsx)("div",{children:g})};var N=function(e){var t=r.a.useState(""),n=Object(i.a)(t,2),a=n[0],s=n[1],c=r.a.useState(""),l=Object(i.a)(c,2),d=l[0],h=l[1],u=r.a.useState(0),b=Object(i.a)(u,2),m=b[0],g=b[1];e.Records.length!==m&&(g(e.Records.length),s(""),h(""));var x=[];return x.push(Object(j.jsxs)("span",{children:["Search:",Object(j.jsx)("span",{className:"mr-1 ml-1",children:Object(j.jsx)("input",{id:"searchterm",type:"text",size:"16",value:d,onChange:function(e){h(e.target.value)},onKeyDown:function(t){if(13===t.keyCode){var n=d;console.log("Search Text:",n),console.log("Building Index...");var a=new o.Builder;for(var r in a.ref("id"),a.field("ActivityId"),a.field("ErrorCode"),a.field("ErrorCodeMsg"),a.field("ErrorType"),a.field("File"),a.field("Function"),a.field("Instance"),a.field("Level"),a.field("Line"),a.field("MDRESULT"),a.field("Message"),a.field("Pid"),a.field("Stream"),a.field("Tid"),a.field("TimeStamp"),a.field("traceparentId"),a.field("Date"),a.field("Time"),e.Records)if("meta"!==r){var c=e.Records[r],i=e.Index.Records[c];a.add(i)}var l=a.build(),j=[];try{var u=l.search(n);for(var b in s('"'+n+'" Found: '+u.length),u)j.push(Number(u[b].ref));e.UpdateSearchResults(n,j)}catch(t){console.log("Search Failed:",t),s("Failed: "+t.message),e.UpdateSearchResults("",[])}h("")}}})}),Object(j.jsx)("span",{children:a})]},x.length)),Object(j.jsx)("span",{children:x})};var T=function(e){var t=r.a.useState(50),n=Object(i.a)(t,2),a=n[0],s=n[1],c=r.a.useState(1),o=Object(i.a)(c,2),d=o[0],h=o[1],u=r.a.useState(!1),m=Object(i.a)(u,2),g=m[0],x=m[1],f=r.a.useState([]),v=Object(i.a)(f,2),O=v[0],p=v[1],S=r.a.useState(""),w=Object(i.a)(S,2),y=w[0],T=w[1],F=r.a.useState(!1),k=Object(i.a)(F,2),L=k[0],M=k[1],R=r.a.useState(null),U=Object(i.a)(R,2),E=U[0],A=U[1],z=function(e,t){s(t),h(1)},B=function(e){A(e)},P=[],D=0,H=function(){if("meta"===V)return"continue";var t=e.Records[V],n=!1;(n=O.length>0?O.find((function(e){return e===t})):e.SearchRecords.find((function(e){return e===t})))&&D++,g?n&&P.push(t):P.push(t)};for(var V in e.Records)H();var q=1+Math.trunc(P.length/a);d>q&&h(1);var W=[];e.Status&&W.push(Object(j.jsx)("div",{children:e.Status},W.length));for(var J=[],K=function(e){J.push(Object(j.jsx)(l.a,{className:"btn mr-1",pill:!0,onClick:function(t){var n;n=e,document.getElementById("top").scrollIntoView({block:"start"}),h(n),M(!1)},children:e},J.length))},Y=1;Y<=q;Y++)K(Y);W.push(Object(j.jsx)(b.a,{show:L,onHide:function(){M(!1)},children:Object(j.jsx)(b.a.Body,{children:J})},W.length)),E&&W.push(Object(j.jsx)(b.a,{show:!0,onHide:function(){A(null)},children:Object(j.jsx)(b.a.Body,{children:Object(j.jsx)(C,{Index:e.Index,ActivityId:E,Favorite:e.Favorite,UpdateFavorite:e.UpdateFavorite})})},W.length)),W.push(Object(j.jsxs)("div",{children:[Object(j.jsxs)(l.a,{className:"btn mr-1",bg:g?"info":"secondary",onClick:function(e){x(!g)},children:["Search ",D,": ",g?"On":"Off"]}),Object(j.jsx)(N,{Index:e.Index,Records:e.Records,SearchText:y,UpdateSearchResults:function(e,t){T(e),p(t),x(!0)}})]},W.length)),W.push(Object(j.jsxs)("div",{children:[Object(j.jsx)(l.a,{className:"btn mr-1",bg:"success",onClick:function(){h(Math.max(d-1,1)),document.getElementById("top").scrollIntoView({block:"start"})},children:"Prev"}),Object(j.jsx)(l.a,{className:"btn mr-1",pill:!0,onClick:function(){document.getElementById("top").scrollIntoView({block:"start"})},children:d}),Object(j.jsxs)(l.a,{className:"btn mr-1",bg:"secondary",onClick:function(){M(!0)},children:["/ ",q]}),Object(j.jsx)(l.a,{className:"btn mr-1",bg:"success",onClick:function(){h(d+1),document.getElementById("top").scrollIntoView({block:"start"})},children:"Next"}),Object(j.jsx)("span",{style:{marginLeft:"20px"}}),Object(j.jsx)(l.a,{className:"btn mr-1",bg:10===a?"success":"secondary",onClick:function(e){return z(0,10)},children:"10/pg"}),Object(j.jsx)(l.a,{className:"btn mr-1",bg:50===a?"success":"secondary",onClick:function(e){return z(0,50)},children:"50/pg"}),Object(j.jsx)(l.a,{className:"btn mr-1",bg:100===a?"success":"secondary",onClick:function(e){return z(0,100)},children:"100/pg"})]},W.length)),W.push(Object(j.jsx)("hr",{},W.length));var G=[];G.push(Object(j.jsx)("div",{id:"top"},G.length));for(var Q=(d-1)*a,X=0;X<a;X++){var Z=Q+X;Z<P.length&&G.push(Object(j.jsx)(I,{Index:e.Index,RecIndex:P[Z],Favorite:e.Favorite,UpdateFavorite:e.UpdateFavorite,UpdateActivity:B},G.length))}return Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"mb-4",style:{height:"100px"},children:W}),Object(j.jsx)("div",{className:"scrollable",style:{height:window.innerHeight-100-60+"px"},children:G})]})};var F=function(e){var t=r.a.useState(0),n=Object(i.a)(t,2),a=n[0],s=n[1],c=r.a.useState({}),o=Object(i.a)(c,2),d=o[0],h=o[1],u=function(e,t){var n=d;n[t]=!n[t],h(n),s(a+1)},b=e.Selection.split("|**|"),m=[],x=d["***"]?O():v();if(m.push(Object(j.jsxs)("div",{onClick:function(e){return u(0,"***")},children:[x," ",b[0]===e.Title?Object(j.jsx)("b",{children:e.Title}):e.Title]},m.length)),d["***"]){var S=[];Object.keys(e.Favorite).forEach((function(e){S.push(Number(e))}));var w={};Object.keys(e.Index2Level).forEach((function(t){if("meta"!==t){var n=e.Index2Level[t],a=n.meta;w[t]={key:t,children:[],metaagg:{Fav:0},meta:a};var r=w[t],s={};Object.keys(n).forEach((function(e){if("meta"!==e){var t=n[e],a=t.meta;s[e]={key:e,children:t,metaagg:{Fav:0},meta:a};var c=s[e];for(var i in t){var l=t[i];-1!==S.indexOf(l)&&(r.metaagg.Fav++,c.metaagg.Fav++)}}})),r.children=Object.values(s).sort((function(e,t){if(e.meta.FirstTS){if(e.meta.FirstTS>t.meta.FirstTS)return 1;if(e.meta.FirstTS<t.meta.FirstTS)return-1}return e.key>t.key?1:e.key<t.key?-1:0}))}}));var y=Object.values(w).sort((function(e,t){if(e.meta.FirstTS){if(e.meta.FirstTS>t.meta.FirstTS)return 1;if(e.meta.FirstTS<t.meta.FirstTS)return-1}return e.key>t.key?1:e.key<t.key?-1:0})),I=function(){var t=y[C],n=t.key,r=d,c=r[n]?O():v(),i=[],o=t.meta;if(o&&Object.keys(o).forEach((function(e){i.push(Object(j.jsxs)(l.a,{pill:!0,bg:"info",className:"mr-1",children:[e,":",o[e]]},i.length))})),Object.keys(t.metaagg).forEach((function(e){var n=t.metaagg[e];n>0&&("Fav"===e?i.push(Object(j.jsxs)("span",{children:[Object(j.jsx)(f,{}),n]},i.length)):i.push(Object(j.jsxs)(l.a,{pill:!0,bg:"info",className:"mr-1",children:[e,":",n]},i.length)))})),m.push(Object(j.jsxs)("div",{className:"ml-indent1",onClick:function(e){return u(0,n)},children:[c," ",b[0]===e.Title&&b[1]===n?Object(j.jsx)("b",{children:n}):n," ",Object(j.jsx)("small",{children:i})]},m.length)),r[n]){var h=function(){var r=t.children[x],c=r.key,i=e.Title+"|**|"+n+"|**|"+c,o=e.Selection===i?p():g(),d=r.children,h=[],u=r.meta;u&&Object.keys(u).forEach((function(e){h.push(Object(j.jsxs)(l.a,{pill:!0,bg:"info",className:"mr-1",children:[e,":",u[e]]},h.length))})),Object.keys(r.metaagg).forEach((function(e){var t=r.metaagg[e];t>0&&("Fav"===e?h.push(Object(j.jsxs)("span",{children:[Object(j.jsx)(f,{}),t]},h.length)):h.push(Object(j.jsxs)(l.a,{pill:!0,bg:"info",className:"mr-1",children:[e,":",t]},h.length)))})),m.push(Object(j.jsxs)("div",{className:"ml-indent2",onClick:function(t){return function(t,n,r){var c=n.split("|**|");e.onChange(n,r,"Show: "+c[0]+", "+c[1]+", "+c[2]),s(a+1)}(0,i,d)},children:[o," ",e.Selection===i?Object(j.jsx)("b",{children:c}):c," ",h]},m.length))};for(var x in t.children)h()}};for(var C in y)I()}return Object(j.jsx)("div",{children:m})};var k=function(e){var t=r.a.useState(),n=Object(i.a)(t,2),a=n[0],s=n[1],c=r.a.useState("|**|"),o=Object(i.a)(c,2),d=o[0],h=o[1],u=r.a.useState([]),b=Object(i.a)(u,2),m=b[0],x=b[1],v=r.a.useState([]),O=Object(i.a)(v,2),y=O[0],I=O[1],C=r.a.useState(""),N=Object(i.a)(C,2),k=N[0],L=N[1],M=r.a.useState({}),R=Object(i.a)(M,2),U=R[0],E=R[1],A=r.a.useState(2),z=Object(i.a)(A,2),B=z[0],P=z[1],D=r.a.useState(0),H=Object(i.a)(D,2),V=H[0],q=H[1],W=function(e,t,n){h(e),x(t),s(n),q(V+1)},J=function(e){var t=[],n=Object.keys(U);for(var a in n)t.push(n[a]);x(t),h("Favorite|**|None"),s("Show Favorites"),q(V+1)},K=[];K.push(Object(j.jsxs)("div",{style:{textAlign:"right"},children:[Object(j.jsx)("span",{className:"mr-1",onClick:function(){return P(Math.max(B-1,2))},children:Object(j.jsx)(w,{})}),Object(j.jsx)("span",{className:"mr-1",onClick:function(){return P(Math.min(B+1,5))},children:Object(j.jsx)(S,{})})]},K.length)),e.getIncludeLunr&&K.push(Object(j.jsxs)("div",{onClick:function(e){var t=k;-1===t.indexOf(":")&&(t="Message:"+t),x(y),h("Search|**|None"),s("["+t+"] found "+y.length+" items."),q(V+1)},children:[Object(j.jsxs)("div",{className:"mr-1",onClick:J,children:[Object(j.jsx)("span",{className:"mr-1",children:d.startsWith("Search|**|")?Object(j.jsx)("b",{children:"Search"}):Object(j.jsx)("span",{children:"Search"})}),Object(j.jsxs)(l.a,{pill:!0,bg:"info",children:["Found: ",y.length]})]}),Object(j.jsx)("div",{className:"ml-indent1",children:Object(j.jsx)("input",{id:"searchterm",type:"text",size:"16",onChange:function(e){L(e.target.value)},onKeyDown:function(t){if(13===t.keyCode){var n=[],a=k;if(a.length>0){-1===a.indexOf(":")&&(a="Message:"+a);var r=[];try{r=e.Index.LunrIndex.search(a),s("["+a+"] found "+r.length+" items.")}catch(t){console.log("Search failed",t),s("["+a+"] FAILED: "+t.message)}for(var c in r)n.push(r[c].ref)}x(n),I(n),h("Search|**|None")}}})})]},K.length));var Y=d.startsWith("Favorite|**|");for(var G in K.push(Object(j.jsxs)("div",{children:[Object(j.jsxs)("span",{className:"mr-1",children:[Y?Object(j.jsx)(p,{}):Object(j.jsx)(g,{})," "]}),Object(j.jsx)("span",{className:"mr-1",onClick:J,children:Y?Object(j.jsx)("b",{children:"Favorite"}):Object(j.jsx)("span",{children:"Favorite"})}),Object(j.jsxs)(l.a,{pill:!0,bg:"secondary",children:[Object(j.jsx)(f,{})," ",Object.keys(U).length]})]},K.length)),e.Index.Index){var Q=e.Index.Index[G];Q.Name.startsWith("-")||K.push(Object(j.jsx)(F,{Records:e.Records,Index2Level:Q.Index,Selection:d,Favorite:U,onChange:W,Title:Q.Name},K.length))}var X=[];return X.push(Object(j.jsx)(T,{Index:e.Index,Records:m,SearchRecords:y,Favorite:U,Status:a,UpdateFavorite:function(e){var t=U;t[e]?delete t[e]:t[e]=!0,E(t),q(V+1)}},X.length)),Object(j.jsxs)("div",{className:"container-fluid",children:[Object(j.jsx)("div",{className:"row",style:{height:"30px",borderBottomStyle:"solid",borderWidth:"1px",backgroundColor:"lightgray"},children:Object(j.jsxs)("center",{children:[Object(j.jsx)("b",{children:e.Index.File.name})," ",Object(j.jsx)("small",{children:Object(j.jsxs)(l.a,{pill:!0,bg:"info",children:["Records: ",e.Index.Records.length]})})]})}),Object(j.jsxs)("div",{className:"row",children:[Object(j.jsx)("div",{className:"col-"+B+" scrollable",style:{height:window.innerHeight-30+"px",borderRightStyle:"solid",borderWidth:"1px"},children:K}),Object(j.jsx)("div",{className:"col-"+(12-B),style:{height:window.innerHeight-30},children:X})]})]})};var L=function(){var e=r.a.useState(),t=Object(i.a)(e,2),n=t[0],a=t[1],s=r.a.useState(!1),c=Object(i.a)(s,2),l=c[0],o=c[1],d=[];return n?d.push(Object(j.jsx)(k,{Index:n,getIncludeLunr:l},d.length)):d.push(Object(j.jsx)("div",{className:"container-fluid vcenter d-flex align-items-center justify-content-center",children:Object(j.jsx)(u,{onUpdateIndex:function(e){a(e)},getIncludeLunr:l,setIncludeLunr:o})},d.length)),Object(j.jsx)("div",{children:d})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,47)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),s(e),c(e)}))};c.a.createRoot(document.getElementById("root")).render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(L,{})})),M()}},[[45,1,2]]]);
//# sourceMappingURL=main.2e91c616.chunk.js.map