/*!
  
  jquery.nGyroParallax.js
  
  Version: 0.1.0
  Author: Nunifuchisaka(nunifuchisaka@gmail.com)
  Website: http://nunifuchisaka.com/w/n-gyro-parallax/demo
  Repository: https://github.com/Nunifuchisaka/nGyroParallax
  
*/
;(function($, window, document, undefined){
'use strict';

var device = (function(u){
  return {
    Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1) 
      || u.indexOf("ipad") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      || u.indexOf("kindle") != -1
      || u.indexOf("silk") != -1
      || u.indexOf("playbook") != -1,
    Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      || u.indexOf("iphone") != -1
      || u.indexOf("ipod") != -1
      || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      || u.indexOf("blackberry") != -1,
    Android: u.indexOf("android") != -1
  }
})(window.navigator.userAgent.toLowerCase());

//
$.fn.nGyroParallax = function( opts ){
  var self = this;
  
  return this.each(function( i, el ){
    opts = $.extend({
      i: i,
      el: el
    }, opts);
    new nGyroParallax(opts);
  });
}



/*
## nGyroParallax
*/

function nGyroParallax( opts ) {
  var self = this;
  this.opts = $.extend({
    background: false,
    magnification: .02,
    duration: 500,
    easing: 'easeOutExpo'
  }, opts);
  
  this.$el = $(opts.el);
  this.$window = $(window);
  this.$body = $('body');
  this.$console = $('#console');
  
  this.center = {
    x: Math.floor( this.$window.width() / 2 ),
    y: Math.floor( this.$window.height() / 2 )
  }
  
  if( device.Mobile ) {
    this.$console.css('display','block');
    //this.$window.on('orientationchange', $.proxy(this.orientationchange, this));
    window.addEventListener('deviceorientation', $.proxy(this.orientationchange, this));
  } else {
    this.$window.on('mousemove.nGyroParallax', $.proxy(this.mousemove, this));
  }
  
}



/*
### orientationchange
*/

nGyroParallax.prototype.orientationchange = function(event){
  var alpha = event.alpha;
  var beta = event.beta;
  var gamma = event.gamma;
  //this.$console.html('α(z-axis)=' + alpha + "<br>β(x-axis)=" + beta + "<br>γ(y-axis)=" + gamma);
  
  var magnification = 14;
  
  var top  = 50 + Math.floor((beta-55) * (this.opts.magnification * magnification));
  var left = 50 + Math.floor((gamma) * (this.opts.magnification * magnification));
  
  this.$console.html('β(x-axis)=' + beta + '<br>γ(y-axis)=' + gamma);
  
  this.render({top:top, left:left});
}



/*
### mousemove
*/

nGyroParallax.prototype.mousemove = function(event){
  var pos = {
    x: event.pageX,
    y: event.pageY
  }
  var top  = 50 + Math.floor((this.center.y - pos.y) * this.opts.magnification);
  var left = 50 + Math.floor((this.center.x - pos.x) * this.opts.magnification);
  
  //console.log('top', top, 'left', left);
  
  this.render({top:top, left:left});
}



/*
## render
*/

nGyroParallax.prototype.render = function(pos){
  if( this.opts.background ) {
    this.$el.css({
      'background-position': pos.top + '% ' + pos.left + '%'
    });
  } else {
    this.$el.css({
      top: pos.top + '%',
      left: pos.left + '%'
    });
  }
};

})(jQuery, this, this.document);