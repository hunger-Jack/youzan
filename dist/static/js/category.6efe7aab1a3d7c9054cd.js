webpackJsonp([3],{1:function(t,n,a){"use strict";var e={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list"};for(var o in e)e.hasOwnProperty(o)&&(e[o]="http://rapapi.org/mockjsdata/24170"+e[o]);n.a=e},11:function(t,n,a){"use strict";var e=a(4),o=a.n(e),i={filters:{twoDecimal:function(t){return t.toFixed(2)}},components:{Foot:o.a}};n.a=i},2:function(t,n){},34:function(t,n){},4:function(t,n,a){function e(t){a(8)}var o=a(13)(a(7),a(9),e,null,null);t.exports=o.exports},61:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=a(34),o=(a.n(e),a(2)),i=(a.n(o),a(3)),c=a(5),s=a.n(c),r=a(1),u=a(11);new i.default({el:"#app",data:function(){return{topLists:null,subData:null,topIndex:0,rankData:null}},created:function(){this.getTopLists(),this.getSubData(0)},methods:{getTopLists:function(){var t=this;s.a.post(r.a.topList).then(function(n){t.topLists=n.data.lists}).catch(function(t){console.log(t)})},getSubData:function(t,n){var a=this;this.topIndex=t,0===t?this.getRankData():s.a.post(r.a.subList,{id:n}).then(function(t){a.subData=t.data.data}).catch(function(t){console.log(t)})},getRankData:function(){var t=this;s.a.post(r.a.rank).then(function(n){t.rankData=n.data.data}).catch(function(t){console.log(t)})},toSearch:function(t){location.href="search.html?keyword="+t.name+"&id="+t.id}},mixins:[u.a]})},7:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=a(10),o=a.n(e),i=[{name:"有赞",href:"index.html",icon:"icon-home"},{name:"分类",href:"category.html",icon:"icon-category"},{name:"购物车",href:"cart.html",icon:"icon-cart"},{name:"我",href:"member.html",icon:"icon-user"}];n.default={name:"Foot",data:function(){return{navConfig:i,currentIndex:parseInt(o.a.parse(location.search.substr(1)).index)||0}},methods:{changeNav:function(t,n){location.href=t.href+"?index="+n}}}},8:function(t,n){},9:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.navConfig,function(n,e){return a("li",{key:e,class:{active:e===t.currentIndex},on:{click:function(a){t.changeNav(n,e)}}},[a("a",[a("i",{class:n.icon}),t._v(" "),a("div",[t._v(t._s(n.name))])])])}))])},staticRenderFns:[]}}},[61]);
//# sourceMappingURL=category.6efe7aab1a3d7c9054cd.js.map