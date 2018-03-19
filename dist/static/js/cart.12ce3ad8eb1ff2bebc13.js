webpackJsonp([4],{0:function(t,e,n){"use strict";var i={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add",cartList:"/cart/list",updateCart:"/cart/update",reduceCart:"/cart/reduce",removeCart:"/cart/remove",mRemoveCart:"/cart/mremove",addressList:"/address/list",addressRemove:"/address/remove",addressAdd:"/address/add",addressUpdate:"/address/update",addressDefault:"/address/setDefault"};for(var o in i)i.hasOwnProperty(o)&&(i[o]="http://rapapi.org/mockjsdata/24170"+i[o]);e.a=i},10:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(13),o=n.n(i),s=[{name:"有赞",href:"index.html",icon:"icon-home"},{name:"分类",href:"category.html",icon:"icon-category"},{name:"购物车",href:"cart.html",icon:"icon-cart"},{name:"我",href:"member.html",icon:"icon-user"}];e.default={name:"Foot",data:function(){return{navConfig:s,currentIndex:parseInt(o.a.parse(location.search.substr(1)).index)||0}},methods:{changeNav:function(t,e){location.href=t.href+"?index="+e}}}},11:function(t,e){},12:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bottom-nav"},[n("ul",t._l(t.navConfig,function(e,i){return n("li",{key:i,class:{active:i===t.currentIndex},on:{click:function(n){t.changeNav(e,i)}}},[n("a",[n("i",{class:e.icon}),t._v(" "),n("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]}},126:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(92),o=(n.n(i),n(93)),s=(n.n(o),n(91)),r=(n.n(s),n(1)),a=n(6),c=n(34),d=n.n(c),u=n(86);new r.default({el:".container",data:function(){return{cartLists:null,total:0,editingShop:null,editingShopIndex:-1,removePopup:!1,removeData:null,removeMsg:""}},computed:{allSelected:{get:function(){return!(!this.cartLists||!this.cartLists.length)&&this.cartLists.every(function(t){return t.checked})},set:function(t){this.cartLists.forEach(function(e){e.checked=t,e.goodsList.forEach(function(e){e.checked=t})})}},allRemoveSelected:{set:function(t){return this.editingShop&&(this.editingShop.removeChecked=t,this.editingShop.goodsList.forEach(function(e){e.removeChecked=t})),!1},get:function(){return!!this.editingShop&&this.editingShop.removeChecked}},selectedGoods:function(){var t=[],e=0;return this.cartLists&&this.cartLists.length&&this.cartLists.forEach(function(n){n.goodsList.forEach(function(n){n.checked&&(t.push(n),e+=n.price*n.number)})}),this.total=e,t},removeGoods:function(){var t=[];return this.editingShop?(this.editingShop.goodsList.forEach(function(e){e.removeChecked&&t.push(e)}),t):[]}},methods:{getLists:function(){var t=this;u.a.getLists().then(function(e){var n=e.data.cartList;n.forEach(function(t){t.checked=!0,t.editingMsg="编辑",t.isEditing=!1,t.removeChecked=!1,t.goodsList.forEach(function(t){t.checked=!0,t.removeChecked=!1})}),t.cartLists=n})},selectGood:function(t,e){var n=this.editingShop?"removeChecked":"checked";e[n]=!e[n],t[n]=t.goodsList.every(function(t){return t[n]})},selectShop:function(t){var e=this.editingShop?"removeChecked":"checked";t[e]=!t[e],t.goodsList.forEach(function(n){n[e]=t[e]})},selectAll:function(){var t=this.editingShop?"allRemoveSelected":"allSelected";this[t]=!this[t]},edit:function(t,e){t.isEditing=!t.isEditing,t.editingMsg=t.isEditing?"完成":"编辑",this.cartLists.forEach(function(n,i){e!==i&&(n.editingMsg=t.isEditing?"":"编辑")}),this.editingShop=t.isEditing?t:null,this.editingShopIndex=t.isEditing?e:-1},add:function(t){u.a.add(t.id).then(function(e){t.number++})},reduce:function(t){1!==t.number&&u.a.reduce(t.id).then(function(e){t.number--})},update:function(t,e){u.a.update(t.id,e).then(function(n){t.number=e})},remove:function(t,e,n,i){this.removePopup=!0,this.removeData={good:t,goodIndex:e,shop:n,shopIndex:i},this.removeMsg="确认要删除该商品吗？"},removeConfirm:function(){var t=this;if("确认要删除该商品吗？"===this.removeMsg){var e=this.removeData,n=e.good,i=e.goodIndex,o=e.shop,s=e.shopIndex;u.a.removeCart(n.id).then(function(e){o.goodsList.splice(i,1),o.goodsList.length||(t.cartLists.splice(s,1),t.statusRecover()),t.removePopup=!1})}else u.a.mRemoveCart(this.removeGoods).then(function(e){var n=[];t.editingShop.goodsList.forEach(function(e){-1===t.removeGoods.findIndex(function(t){return t.id===e.id})&&n.push(e)}),n.length?t.editingShop.goodsList=n:(t.cartLists.splice(t.editingShopIndex,1),t.statusRecover()),t.removePopup=!1})},removeSelected:function(){this.removeMsg="确定将所选 "+this.removeGoods.length+" 个商品删除？",this.removePopup=!0},statusRecover:function(){this.editingShop=null,this.editingShopIndex=-1,this.cartLists.forEach(function(t){t.editingMsg="编辑",t.isEditing=!1,t.goodsList.forEach(function(t){t.editingMsg="编辑",t.isEditing=!1})})},start:function(t,e){e.clientXOfStart=t.changedTouches[0].clientX},end:function(t,e,n,i){var o=t.changedTouches[0].clientX,s="0px";s=e.clientXOfStart-o>100?"-60px":"0px",d()(this.$refs["goods-"+i+"-"+n],{left:s})}},created:function(){this.getLists()},mixins:[a.a]})},37:function(t,e,n){"use strict";function i(t,e){return new s.a(function(n,i){a.a.post(t,e).then(function(t){200===t.data.status&&n(t),i(t)}).catch(function(t){i(t)})})}var o=n(61),s=n.n(o),r=(n(0),n(9)),a=n.n(r);e.a=i},6:function(t,e,n){"use strict";var i=n(8),o=n.n(i),s={filters:{twoDecimal:function(t){return t.toFixed(2)}},components:{Foot:o.a}};e.a=s},8:function(t,e,n){function i(t){n(11)}var o=n(5)(n(10),n(12),i,null,null);t.exports=o.exports},86:function(t,e,n){"use strict";var i=n(62),o=n.n(i),s=n(63),r=n.n(s),a=n(37),c=n(0),d=function(){function t(){o()(this,t)}return r()(t,null,[{key:"getLists",value:function(){return n.i(a.a)(c.a.cartList)}},{key:"add",value:function(t){return n.i(a.a)(c.a.addCart,{id:t,number:1})}},{key:"reduce",value:function(t){return n.i(a.a)(c.a.reduceCart,{id:t,number:1})}},{key:"removeCart",value:function(t){return n.i(a.a)(c.a.removeCart,{id:t})}},{key:"mRemoveCart",value:function(t){var e=[];return t.forEach(function(t){e.push(t.id)}),n.i(a.a)(c.a.mRemoveCart,{ids:e})}},{key:"update",value:function(t,e){return n.i(a.a)(c.a.updateCart,{id:t,number:e})}}]),t}();e.a=d},91:function(t,e){},92:function(t,e){},93:function(t,e){}},[126]);
//# sourceMappingURL=cart.12ce3ad8eb1ff2bebc13.js.map