webpackJsonp([2],{1:function(t,n,e){"use strict";var i={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal"};for(var a in i)i.hasOwnProperty(a)&&(i[a]="http://rapapi.org/mockjsdata/24170"+i[a]);n.a=i},104:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(7),a=(e.n(i),e(78)),s=(e.n(a),e(2)),o=e(8),r=e.n(o),c=e(19),l=(e.n(c),e(67)),u=(e.n(l),e(1)),d=e(4),f=e.n(d),p=e(21),h=e.n(p);s.default.use(c.InfiniteScroll);new s.default({el:"#app",components:{Foot:f.a,Swipe:h.a},data:function(){return{hotLists:null,pageNum:1,pageSize:6,loading:!1,allLoaded:!1,bannerLists:null}},methods:{getHotLists:function(){var t=this;this.allLoaded||(this.loading=!0,r()({methods:"get",url:u.a.hotLists,data:{pageNum:this.pageNum,pageSize:this.pageSize}}).then(function(n){var e=n.data.lists;e.length<t.pageSize&&(t.allLoaded=!0),t.hotLists?t.hotLists=t.hotLists.concat(e):t.hotLists=e,t.pageNum++,t.loading=!1}))},getBannerLists:function(){var t=this;r.a.get(u.a.banner).then(function(n){t.bannerLists=n.data.lists})}},created:function(){this.getHotLists(),this.getBannerLists()}})},13:function(t,n){},14:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"bottom-nav"},[e("ul",t._l(t.navConfig,function(n,i){return e("li",{key:i,class:{active:i===t.currentIndex},on:{click:function(e){t.changeNav(n,i)}}},[e("a",[e("i",{class:n.icon}),t._v(" "),e("div",[t._v(t._s(n.name))])])])}))])},staticRenderFns:[]}},21:function(t,n,e){function i(t){e(44)}var a=e(18)(e(28),e(45),i,null,null);t.exports=a.exports},28:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(63),a=e(43);e.n(a);n.default={name:"Swipe",props:["lists"],mounted:function(){this.init()},methods:{init:function(){new i.a(".swiper-container",{pagination:{el:".swiper-pagination"},loop:!0})}}}},4:function(t,n,e){function i(t){e(13)}var a=e(18)(e(9),e(14),i,null,null);t.exports=a.exports},43:function(t,n){},44:function(t,n){},45:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"swiper-container"},[e("div",{staticClass:"swiper-wrapper"},t._l(t.lists,function(t,n){return e("div",{key:n,staticClass:"swp-page swiper-slide"},[e("a",{staticClass:"js-no-follow",attrs:{href:t.clickUrl}},[e("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:t.image}})])])})),t._v(" "),e("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]}},67:function(t,n){},7:function(t,n){},78:function(t,n){},9:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(5),a=e.n(i),s=[{name:"有赞",href:"index.html",icon:"icon-home"},{name:"分类",href:"category.html",icon:"icon-category"},{name:"购物车",href:"cart.html",icon:"icon-cart"},{name:"我",href:"member.html",icon:"icon-user"}];n.default={name:"Foot",data:function(){return{navConfig:s,currentIndex:parseInt(a.a.parse(location.search.substr(1)).index)||0}},methods:{changeNav:function(t,n){location.href=t.href+"?index="+n}}}}},[104]);
//# sourceMappingURL=index.f93ab4e8db30aea4dda9.js.map