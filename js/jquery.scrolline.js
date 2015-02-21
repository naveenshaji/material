---
---
/*
* Scrolline.js - Create an indication bar line of scroll position
* Basic usage : $.scrolline();
* ---
* Version: 1.0
* Copyright 2014, Anthony Ly (http://anthonyly.com)
* Released under the MIT Licence
*/

(function($, window, document, undefined) {
    $.extend({
        scrolline: function (options) {
            var defaults = {
                backColor   : '#ecf0f1',
                direction   : 'horizontal',
                frontColor  : '#2ecc71',
                opacity     : 1,
                position    : 'top',
                reverse     : false,
                weight      : 5,
                zindex      : 9999,
                scrollEnd   : function() {}
            };

            function Plugin(options) {
                this.params = $.extend(defaults, options);
                this.$back = $(document.createElement('div'));
                this.$front = $(document.createElement('div'));
                this.init();
            }

            Plugin.prototype = {
                init : function() {
                    var self = this,
                        tBack, rBack, bBack, lBack, bgBack,
                        tFront, rFront, bFront, lFront, bgFront;

                    // Direction and position
                    if(self.params.direction != 'vertical') self.params.direction = 'horizontal';
                    if(self.params.direction == 'vertical' && self.params.position != 'right') self.params.position = 'left';
                    if(self.params.direction == 'horizontal' && self.params.position != 'bottom') self.params.position = 'top';

                    if(self.params.direction == 'vertical') {
                        bBack = tBack = 0;
                        if(self.params.position == 'right') {
                            rBack = 0;
                            lBack = 'auto';
                        } else {
                            rBack = 'auto';
                            lBack = 0;
                        }
                    } else {
                        rBack = lBack = 0;
                        if(self.params.position == 'bottom') {
                            tBack = 'auto';
                            bBack = 0;
                        } else {
                            tBack =  0;
                            bBack = 'auto';
                        }
                    }

                    if(self.params.reverse && self.params.reverse === true) {
                        if(self.params.direction == 'vertical') {
                            bFront = rFront = lFront = 0;
                            tFront = 'auto';
                        } else {
                            bFront = rFront = rFront = 0;
                            lFront = 'auto';
                        }
                    } else {
                        tFront = lFront = 0;
                        bFront = rFront = 'auto';
                    }

                    self.$front.addClass("{{ site.css }} lighten-1").css({
                        //background : self.params.frontColor,
                        bottom : bFront,
                        height : 0,
                        left : lFront,
                        margin: 0,
                        overflow: 'hidden',
                        padding: 0,
                        position: 'absolute',
                        right : rFront,
                        top: tFront,
                        width : 0
                    }).appendTo(self.$back);

                    self.$back.addClass("{{ site.css }} darken-2").css({
                        //background : self.params.backColor,
                        bottom: bBack,
                        height : 0,
                        left : lBack,
                        opacity: self.params.opacity,
                        margin: 0,
                        overflow: 'hidden',
                        position: 'fixed',
                        padding: 0,
                        right : rBack,
                        top: tBack,
                        width : 0,
                        zIndex : self.params.zindex,
                    }).appendTo('body');

                    $(window).on("load resize scroll orientationchange", function() {
                        self.scrollListener();
                    });
                },

                scrollListener : function() {
                    var self = this,
                        hWin = $(window).height(),
                        wWin = $(window).width(),
                        hDoc = $(document).height(),
                        scrollValue = $(window).scrollTop(),
                        wBack, hBack, wFront, hFront, scrollineVal, wRef;

                    if(self.params.direction == 'vertical') {
                        scrollineVal = (scrollValue + hWin) * hWin / hDoc;
                        wBack = self.params.weight;
                        hBack = wRef = hWin;
                        wFront = self.params.weight;
                        hFront = scrollineVal;
                    } else {
                        scrollineVal = (scrollValue + hWin) * wWin / hDoc;
                        wBack = wRef = wWin;
                        hBack = self.params.weight;
                        wFront = scrollineVal;
                        hFront = self.params.weight;
                    }

                    self.$back.css({
                        height: hBack,
                        width: wBack
                    });
                    self.$front.css({
                        height: hFront,
                        width: wFront
                    });

                    if(scrollineVal >= wRef) {
                        self.params.scrollEnd();
                    }
                }
            };

            new Plugin(options);
        }
    });
})(jQuery, window, document);