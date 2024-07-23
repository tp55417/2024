import{o,c as a,a as n,d as I,u as D,B as U,C as P,A as m,D as R,_ as F,E as ee,x as O,G as se,H as V,J as C,t as h,K as B,b as T,F as $,e as y,L as oe,r as Z,s as L,M as j,N as H,O as z,P as te,v as ne,Q as ae,w as q,R as le,S as ie}from"./app-c7efd004.js";import{c as re}from"./community-aea91992.js";const ce={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},ue=n("path",{fill:"currentColor",d:"m17 18l-5-2.18L7 18V5h10m0-2H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2Z"},null,-1),de=[ue];function me(e,s){return o(),a("svg",ce,de)}const pe={name:"mdi-bookmark-outline",render:me},_e={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},he=n("path",{fill:"currentColor",d:"M17 3H7a2 2 0 0 0-2 2v16l7-3l7 3V5a2 2 0 0 0-2-2Z"},null,-1),ve=[he];function $e(e,s){return o(),a("svg",_e,ve)}const G={name:"mdi-bookmark",render:$e},fe=I({name:"ScheduleItem",props:{sessionId:{type:String,required:!0}},setup(e){const{t:s,locale:d}=D(),{xsOnly:p}=U(),{isLoaded:v,getSessionById:_,favoriteSessions:i,roomsStatusMap:r}=P(),l=m(()=>_(e.sessionId)),c=m(()=>l.value.tags.find(w=>w.id==="Prime")),t=m(()=>({name:"SessionDetail",params:{sessionId:l.value.id}})),u=m(()=>l.value.type[d.value].name),g=m(()=>`${R(l.value.start,"：")} ~ ${R(l.value.end,"：")}`),f=m(()=>l.value[d.value].title),S=m(()=>l.value.speakers.map(w=>w[d.value].name)),E=m(()=>l.value.tags.map(w=>w[d.value].name)),k=m(()=>l.value.language),b=m(()=>l.value.room[d.value].name.split(" / ")[0]),M=m(()=>{var w,N;return!!((N=(w=r.value)==null?void 0:w[l.value.room.id])!=null&&N.isFull)}),Y=m(()=>s(`session['room-status'].${M.value?"full":"vacancy"}`)),x=m(()=>l.value.favorite);return{isLoaded:v,xsOnly:p,location:t,isPrimeSession:c,track:u,period:g,title:f,speakers:S,tags:E,language:k,room:b,isFull:M,statusText:Y,favorite:x,handleMarkIconOnClick:()=>{i.value.includes(l.value.id)?i.value=i.value.filter(w=>w!==l.value.id):i.value=[...i.value,l.value.id]}}}}),ke={class:"content-section"},ye={class:"track"},be={class:"status"},ge={class:"name"},Se={class:"period"},we={class:"title"},Te={class:"speaker-list"},Le=n("span",null,"by",-1),Ce={class:"tag-list"};function Ie(e,s,d,p,v,_){const i=G,r=pe,l=ee("router-link");return e.isLoaded?(o(),O(l,{key:0,class:C(["schedule-item",{prime:e.isPrimeSession}]),to:e.location},{default:se(()=>[n("section",ke,[n("h4",ye,[V(n("div",{class:C(["room",{full:e.isFull}])},[n("span",be,h(e.statusText),1),n("span",ge,h(e.room),1)],2),[[B,e.xsOnly]]),n("span",null,h(e.track),1)]),T("  "),n("h4",Se,h(e.period),1),T("  "),n("h2",we,h(e.title),1),T("  "),n("h3",Te,[Le,(o(!0),a($,null,y(e.speakers,(c,t)=>(o(),a("span",{key:`session-${e.sessionId}-speaker-${t}`,class:"speaker"},h(c),1))),128))]),T("  "),n("div",Ce,[(o(!0),a($,null,y(e.tags,(c,t)=>(o(),a("span",{key:`tag-${e.sessionId}-tag-${t}`,class:"tag"},h(c),1))),128))])]),n("span",{class:"mark-icon",onClick:s[0]||(s[0]=oe((...c)=>e.handleMarkIconOnClick&&e.handleMarkIconOnClick(...c),["prevent"]))},[e.favorite?(o(),O(i,{key:0})):(o(),O(r,{key:1}))])]),_:1},8,["class","to"])):T("v-if",!0)}const A=F(fe,[["render",Ie],["__file","/home/runner/work/2024/2024/src/components/Session/ScheduleItem.vue"]]),Fe={},Me=I({name:"AgendaTableRoomCell",props:{roomId:{type:String,required:!0}},setup(e){const{t:s,locale:d}=D(),{isLoaded:p,getRoomById:v,getRoomStatusById:_}=P(),i=m(()=>v(e.roomId)[d.value].name.split(" / ")[0]),r=m(()=>_(e.roomId)),l=m(()=>r.value.isFull),c=m(()=>s(`session['room-status'].${l.value?"full":"vacancy"}`)),t=m(()=>{const g=Fe[e.roomId];if(g===null)return null;const f=new URL(`https://www.youtube-nocookie.com/embed/${g}`);return f.searchParams.set("autoplay","1"),f.searchParams.set("modestbranding","1"),f.searchParams.set("controls","0"),f.searchParams.set("rel","0"),f.toString()}),u=Z(!1);return{isLoaded:p,roomName:i,isFull:l,statusText:c,roomLink:t,iframeLoaded:u}}}),Oe={key:0,class:"schedule-table-room-cell"},Ee={class:"text"},Pe=n("span",null,"Room",-1);function Ve(e,s,d,p,v,_){return e.isLoaded?(o(),a("div",Oe,[n("div",Ee,[Pe,n("span",null,h(e.roomName),1)])])):T("v-if",!0)}const W=F(Me,[["render",Ve],["__file","/home/runner/work/2024/2024/src/components/Session/ScheduleTableRoomCell.vue"]]),De=I({name:"ScheduleTable",components:{ScheduleItem:A,ScheduleTableRoomCell:W},props:{table:{type:Object,required:!0}}}),Ae={class:"schedule-table"},Be={class:"room-list"},Ne={class:"cell-content"},Re=n("div",{style:{height:"0.5rem"}},null,-1),je={class:"table-body"},qe=["rowspan"],Ue={class:"cell-content"};function Ze(e,s,d,p,v,_){const i=W,r=A;return o(),a("table",Ae,[n("thead",Be,[n("tr",null,[(o(!0),a($,null,y(e.table.head,l=>(o(),a("th",{key:`table-room-${l.room}`},[n("div",Ne,[L(i,{"room-id":l.room},null,8,["room-id"])])]))),128))])]),Re,n("tbody",je,[(o(!0),a($,null,y(e.table.body,(l,c)=>(o(),a("tr",{key:`table-row-${c}`},[(o(!0),a($,null,y(l,(t,u)=>(o(),a("td",{key:`table-row-${c}-cell-${u}`,rowspan:t.rowspan},[n("div",Ue,[t.type==="session"?(o(),O(r,{key:0,"session-id":t.element.session},null,8,["session-id"])):T("v-if",!0)])],8,qe))),128))]))),128))])])}const J=F(De,[["render",Ze],["__file","/home/runner/work/2024/2024/src/components/Session/ScheduleTable.vue"]]),He=I({name:"ScheduleList",components:{ScheduleItem:A},props:{list:{type:Object,required:!0},sessionsMap:{type:Object,rquired:!0}},setup(){return{getTimeText:([s,d])=>`${j(s)}：${j(d)}`}}}),ze={class:"schedule-list"},Ge={class:"time"};function We(e,s,d,p,v,_){const i=A;return o(),a("ul",ze,[(o(!0),a($,null,y(e.list.items,(r,l)=>(o(),a("section",{key:`schedule-list-section-${l.toString()}`,class:"section"},[n("li",Ge,h(e.getTimeText(r.start)),1),(o(!0),a($,null,y(r.elements,({session:c})=>(o(),a("li",{key:`schedule-list-section-${l.toString()}-session-${c}`,class:"schedule-item-container"},[L(i,{"session-id":c},null,8,["session-id"])]))),128))]))),128))])}const K=F(He,[["render",We],["__file","/home/runner/work/2024/2024/src/components/Session/ScheduleList.vue"]]),Je={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},Ke=n("path",{fill:"currentColor",d:"M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"},null,-1),Qe=[Ke];function Xe(e,s){return o(),a("svg",Je,Qe)}const Ye={name:"mdi-close",render:Xe},xe={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},es=n("path",{fill:"currentColor",d:"M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7c0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66c0 1.61 1.31 2.91 2.92 2.91c1.61 0 2.92-1.3 2.92-2.91A2.92 2.92 0 0 0 18 16.08Z"},null,-1),ss=[es];function os(e,s){return o(),a("svg",xe,ss)}const ts={name:"mdi-share-variant",render:os},ns={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},as=n("path",{fill:"currentColor",d:"M6 13h12v-2H6M3 6v2h18V6M10 18h4v-2h-4v2Z"},null,-1),ls=[as];function is(e,s){return o(),a("svg",ns,ls)}const rs={name:"mdi-filter-list",render:is},cs=I({name:"SessionFilter",setup(){const{filterOptions:e,filterValue:s,favoriteSessions:d}=P(),{t:p,locale:v}=D(),_=H(),i=z(),r=Z(!1),l=m({get:()=>s.value.room,set:k=>{const b=(()=>(console.log(s.value.room,k),s.value.room.includes("*")?k.filter(M=>M!=="*"):!s.value.room.includes("*")&&k.includes("*")?["*"]:k))();s.value={...s.value,room:b}}}),c=k=>{const{name:b,value:M}=k.target;window.scrollTo(0,0),s.value={...s.value,[b]:M}},t=m(()=>s.value.collection!=="*"),u=()=>{r.value=!1,s.value={search:"",tags:"*",room:["*"],type:"*",filter:["*"],collection:"mark"}},g=()=>{_.back()},f=async()=>{if(d.value.length===0){window.alert(p("session.share_no_favorites"));return}const k=p("session.share_title",{year:"2024"}),b=`${window.location.origin}${_.resolve({query:{filter:d.value.join("")}}).href}`;try{await window.navigator.share({title:k,url:b})}catch{await window.navigator.clipboard.writeText(`${k}
${b}`),window.alert(p("session.share_copied"))}},S=m(()=>Object.keys(i.query).length>0);return{active:r,roomValue:l,filterOptions:e,filterValue:s,locale:v,changeFilterValue:c,t:p,isFilterCollection:t,showFavorites:u,close:g,share:f,hasFilters:S,clearFilters:()=>{_.push({query:{}})}}}}),us=["placeholder","value"],ds=["name","size"],ms={value:"*"},ps=["value"],_s=["name","value"],hs={value:"*"},vs=["value"];function $s(e,s,d,p,v,_){const i=G,r=rs,l=ts,c=Ye;return o(),a("article",{class:C({["session-filter"]:!0,active:e.active})},[e.isFilterCollection?(o(),a($,{key:1},[n("button",{class:C({fab:!0,bookmark:!0,active:e.active}),onClick:s[2]||(s[2]=(...t)=>e.share&&e.share(...t))},[L(l)],2),n("button",{class:C({fab:!0,close:!0,active:e.active}),onClick:s[3]||(s[3]=(...t)=>e.close&&e.close(...t))},[L(c)],2)],64)):(o(),a($,{key:0},[n("button",{class:C({fab:!0,bookmark:!0,active:e.active}),onClick:s[0]||(s[0]=(...t)=>e.showFavorites&&e.showFavorites(...t))},[L(i)],2),n("button",{class:C({fab:!0,switch:!0,active:e.active}),onClick:s[1]||(s[1]=t=>e.active=!e.active)},[L(r)],2)],64)),n("section",null,[n("input",{type:"search",placeholder:e.t("session.filter.search"),name:"search",value:e.filterValue.search,onInput:s[4]||(s[4]=(...t)=>e.changeFilterValue&&e.changeFilterValue(...t))},null,40,us)]),(o(!0),a($,null,y(e.filterOptions,t=>(o(),a("section",{key:t.label},[t.label==="room"?(o(),a($,{key:0},[n("label",null,h(e.t(`session.filter.${t.label}`))+": ",1),V(n("select",{name:t.label,multiple:"",size:t.options.length,"onUpdate:modelValue":s[5]||(s[5]=u=>e.roomValue=u)},[n("option",ms,h(e.t("session.filter.all")),1),(o(!0),a($,null,y(t.options,u=>(o(),a("option",{key:u.id,value:u.id},h(u.name[e.locale]),9,ps))),128))],8,ds),[[te,e.roomValue]])],64)):(o(),a($,{key:1},[n("label",null,h(e.t(`session.filter.${t.label}`))+": ",1),n("select",{name:t.label,value:e.filterValue[t.label],onChange:s[6]||(s[6]=(...u)=>e.changeFilterValue&&e.changeFilterValue(...u))},[n("option",hs,h(e.t("session.filter.all")),1),(o(!0),a($,null,y(t.options,u=>(o(),a("option",{key:u.id,value:u.id},h(u.name[e.locale]),9,vs))),128))],40,_s)],64))]))),128)),e.hasFilters?(o(),a("button",{key:2,class:"clear",onClick:s[7]||(s[7]=(...t)=>e.clearFilters&&e.clearFilters(...t))},[L(c),ne(" "+h(e.t("session.filter.clear")),1)])):T("v-if",!0)],2)}const Q=F(cs,[["render",$s],["__file","/home/runner/work/2024/2024/src/components/Session/SessionFilter.vue"]]),fs=I({name:"AgendaNavbar",setup(){const{isLoaded:e,currentDayIndex:s,daysSchedule:d}=P(),p=m(()=>d.value.map(i=>i.day)),v=m(()=>p.value[s.value]);return{isLoaded:e,days:p,selectedDay:v,onTabClick:i=>{s.value=i}}}}),ks={key:0,class:"schedule-navbar"},ys={class:"tabs"},bs=["onClick"],gs={class:"day-text"},Ss={class:"date"};function ws(e,s,d,p,v,_){return e.isLoaded?(o(),a("nav",ks,[n("div",ys,[(o(!0),a($,null,y(e.days,(i,r)=>(o(),a("div",{class:C(["tab",{active:e.selectedDay.join("")===i.join("")}]),key:`day-option-${r}`,onClick:l=>e.onTabClick(r)},[n("span",gs,h(`Day ${r+1}`),1),n("span",Ss,h(i.join(" / ")),1)],10,bs))),128))])])):T("v-if",!0)}const X=F(fs,[["render",ws],["__file","/home/runner/work/2024/2024/src/components/Session/ScheduleNavbar.vue"]]);const Ts=I({name:"Session",components:{ScheduleNavbar:X,ScheduleTable:J,ScheduleList:K,SessionFilter:Q},setup(){const e=z(),s=H(),{load:d,daysSchedule:p,currentDayIndex:v,getSessionById:_,isLoaded:i}=P(),{openPopUp:r,removeAll:l}=ae(),{xsOnly:c}=U(),{locale:t}=D();function u(f){return re.communities.find(S=>S.track===f.type["zh-TW"].name)}function g(){const[f,S]=[i.value,e.params.sessionId];if(!f)return;if(typeof S!="string"){l(k=>{var b;return!((b=k.popupId)!=null&&b.startsWith("session-"))});return}const E=()=>{window.history.state.back?s.back():s.push("/session")};r(S==="template"?{popupId:"session-template",metaOptions:{title:"@{TEMPLATE_META_TITLE}",description:"@{TEMPLATE_META_DESCRIPTION}",ogUrl:"@{TEMPLATE_META_OG_URL}",ogImage:"@{TEMPLATE_META_OG_IMAGE}"},containerData:{type:"default"},contentData:{type:"html",html:"@{TEMPLATE_CONTENT_HTML}"},onClose:E}:{...ie(_(S),u(_(S)),t.value),onClose:E})}return g(),q(()=>[e.params.sessionId,i.value],()=>{g()}),le&&q(v,async()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}),{xsOnly:c,currentDayIndex:v,daysSchedule:p,load:d,tryToOpenSessionPopUp:g,route:e}},async serverPrefetch(){await this.load(),this.route.params.sessionId&&this.tryToOpenSessionPopUp()}}),Ls={id:"session",class:"page-container"};function Cs(e,s,d,p,v,_){const i=X,r=Q,l=K,c=J;return o(),a("main",Ls,[L(i),L(r),(o(!0),a($,null,y(e.daysSchedule,(t,u)=>(o(),a($,null,[e.xsOnly?V((o(),O(l,{key:`list-${t.day.join("")}`,list:t.list},null,8,["list"])),[[B,e.currentDayIndex===u]]):V((o(),O(c,{key:`table-${t.day.join("")}`,table:t.table},null,8,["table"])),[[B,e.currentDayIndex===u]])],64))),256))])}const Os=F(Ts,[["render",Cs],["__file","/home/runner/work/2024/2024/src/pages/Session.vue"]]);export{Os as default};
