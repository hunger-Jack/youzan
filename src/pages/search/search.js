import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'
import {
  InfiniteScroll
} from 'mint-ui';
Vue.use(InfiniteScroll);

/**
 * http://jsrun.net/5iYKp/edit?utm_source=website   节流参照的这个地址代码，表示看不懂
 */
(function () {
  window.infiniteScroll = function(selector, cb, options) {
      if(!selector || !cb || !document.querySelector(selector)){
          console.error("the scroll element and the callback function can't be null");
          return;
      }
      var obj = {
          ele: selector,
          callback: cb
      };

      var initOptions = function(options) {
          var opts = options || {};
          opts = typeof opts === 'object' ? opts : {};
          opts.disabled = Boolean(opts.disabled);
          opts.distance = Number(opts.distance);
          opts.checkImmediate = Boolean(opts.checkImmediate);
          return opts;
      }

      var initScroll = function(obj) {
          obj.scrollTarget = getScrollTarget(document.querySelector(obj.ele));
          obj.scrollListener = throttle(doCheck.bind(obj), 200);
          obj.scrollTarget.addEventListener('scroll', obj.scrollListener, false);
      }

      var getScrollTarget = function(ele) {
          var currentNode = ele;
          while (currentNode && currentNode.targetName !== 'body' && currentNode.targetName !== 'html' && currentNode.nodeType === 1){
              var overflowY = document.defaultView.getComputedStyle(currentNode, 'overflowY');
              if(overflowY === 'scroll' || overflowY === 'auto'){
                  return currentNode;
              }
              currentNode = currentNode.parentNode;
          }
          return window;
      }

      //节流函数
      var throttle = function(fn, delay) {
          var now, lastExec, timer, context, args;

          var handle = function () {
              fn.call(context, args);
              lastExec = now;
          }

          return function () {
              context = this;
              args = arguments;
              if(timer){
                  clearTimeout(timer);
                  timer = null;
              }
              now = new Date();
              if(lastExec){
                  if(now - lastExec > delay){
                      handle();
                  }else {
                      timer = setTimeout(handle, (delay- (now-lastExec)));
                  }
              }else {
                  handle();
              }
          }
      }

      var doCheck = function() {
          var scrollTarget = this.scrollTarget;
          var element = document.querySelector(this.ele);
          var distance = this.options.distance;
          if(this.options.disabled){
              return;
          }
          var triggered = false; // 是否触发 回调(符合check的条件)
          var viewportScrollTop = getScrollTop(scrollTarget); // 获取滚动对象的 scrollTop
          var viewportBottom = viewportScrollTop + getClientHeight(scrollTarget);// 获取当前滚动对象的滚动底部的位置
          if(scrollTarget === element){
              triggered = scrollTarget.scrollHeight - viewportBottom <= distance;
          }else {
              //计算当前element的底部的高度
              var elementBottom = getElementTop(element) - getElementTop(scrollTarget) + viewportScrollTop + element.clientHeight;
              triggered = elementBottom - viewportBottom <= distance;
          }

          if(triggered && this.callback){// 触发回调
              //创建给用户一个代理的options给使用者, 这个options只暴露了 disabled属性
              if(!this.cbOptions){
                  this.cbOptions = createCallbackOptions(this.options);
              }
              this.callback(this.cbOptions);
          }
      }
      
      
      var createCallbackOptions= function (options) {
          var cbOptions = {};
          Object.defineProperty(cbOptions, 'disabled', {
              get: function () {
                  return options.disabled;
              },
              set: function (val) {
                  options.disabled = val;
              }
          });
          return cbOptions;
      };

      //获取当前element相对于 窗口顶部的距离
      var getScrollTop = function(element) {
          if(element === window){
              return Math.max(window.pageYOffset || 0 , document.documentElement.scrollTop);
          }
          return element.scrollTop;// 当前dom滚动的高度, 如果当前滚动的不是当前dom(比如window),他就是0
      }

      var getClientHeight = function(element) {
          if(element === window){
              return document.documentElement.clientHeight;
          }
          return element.clientHeight;
      }

      var getElementTop = function(element) {
          if(element === window){
              return getScrollTop(window);
          }
          return element.getBoundingClientRect().top + getScrollTop(window);
      }

      // init options
      obj.options = initOptions(options);

      // init scroll
      initScroll(obj);

      //立刻进行检查,防止首次加载,没有加载数据,无法滚动,无法进行后续操作
      if(obj.options.checkImmediate){
          doCheck.call(obj);
      }
  }
})();
let {
  keyword,
  id
} = qs.parse(location.search.substr(1))
new Vue({
  el: '.container',
  data() {
    return {
      keyword,
      searchLists: null,
      isShow: false,
      searchLists: false,
      pageNum: 1,
      pageSize: 8,
      loading: false,
      allLoaded: false
    }
  },
  created() {
    axios({
      methods: 'get',
      url: url.searchList,
      data: {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyword,
        id
      }
    }).then((res) => {
      this.searchLists = res.data.lists
    })

    var scrollWrapper = document.getElementById('scroll-wrapper');
    var self = this;
    infiniteScroll('#scroll-wrapper', function (options) {
      options.disabled = self.loading = true;
      console.log(scrollWrapper.getBoundingClientRect())
      setTimeout(function () {
        axios({
          methods: 'get',
          url: url.searchList,
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyword,
            id
          }
        }).then((res) => {
          this.searchLists = res.data.lists
        })
        options.disabled = self.loading = false;
      }, 2500);
    }, {
      disabled: false,
      distance: 50,
      checkImmediate: true
    })

  },
  methods: {
    getSearchLists() {
      if (this.allLoaded) { //如果数据给数据加载完就停止
        return
      }
      this.loading = true
      setTimeout(() => {
        axios({
          methods: 'get',
          url: url.searchList,
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            keyword,
            id
          }
        }).then((res) => {
          console.log(res)
          let data = res.data.lists
          if (data.length < this.pageSize) { //判断是否所有数据已经加载完
            this.allLoaded = true
          }
          if (this.searchLists) { //如果数据存在就拼接，不存在就赋值
            this.searchLists = this.searchLists.concat(data)
          } else {
            this.searchLists = data
          }
          this.pageNum++
            this.loading = false
        })
      }, 2500);
    },
    move() { //使用一些dom的api来实现backTop是否显示问题
      if (document.documentElement.scrollTop > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    backTop() { //使用了vue的一个js动画库Velocity-animate，做出返回顶部的动画效果
      Velocity(document.body, 'scroll', {
        duration: 1000
      })
      document.documentElement.scrollTop = 0
      this.isShow = false
    }
  },
  mixins: [mixin]
})
