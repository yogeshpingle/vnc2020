/* 
    Banner Rotator code from Dynamic Web Coding at dyn-web.com
    Copyright 2001-2013 by Sharon Paine
    For demos, documentation and updates, visit http://www.dyn-web.com/code/rotate-banner/

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


// DYN_WEB is namespace used for code from dyn-web.com
// replacing previous use of dw_ prefix for object names
var DYN_WEB=DYN_WEB||{};

DYN_WEB.Event=(function(Ev){Ev.add=document.addEventListener?function(obj,etype,fp,cap){cap=cap||false;obj.addEventListener(etype,fp,cap);}:function(obj,etype,fp){obj.attachEvent('on'+etype,fp);};Ev.remove=document.removeEventListener?function(obj,etype,fp,cap){cap=cap||false;obj.removeEventListener(etype,fp,cap);}:function(obj,etype,fp){obj.detachEvent('on'+etype,fp);};Ev.DOMit=function(e){e=e?e:window.event;if(!e.target){e.target=e.srcElement;}if(!e.preventDefault){e.preventDefault=function(){e.returnValue=false;return false;};}if(!e.stopPropagation){e.stopPropagation=function(){e.cancelBubble=true;};}return e;};Ev.getTarget=function(e){e=Ev.DOMit(e);var tgt=e.target;if(tgt.nodeType!==1){tgt=tgt.parentNode;}return tgt;};return Ev;})(DYN_WEB.Event||{});

DYN_WEB.Util=(function(Ut){var Ev=DYN_WEB.Event;Ut.$=function(id){return document.getElementById(id);};Ut.contained=function(oNode,oCont){if(!oNode)return null;while((oNode=oNode.parentNode))if(oNode==oCont)return true;return false;};Ut.mouseleave=function(e,oNode){e=Ev.DOMit(e);var toEl=e.relatedTarget?e.relatedTarget:e.toElement?e.toElement:null;if(oNode!=toEl&&!Ut.contained(toEl,oNode)){return true;}return false;};return Ut;})(DYN_WEB.Util||{});


DYN_WEB.Banner_Rotator = (function() {
    var Ut = DYN_WEB.Util,
        Ev = DYN_WEB.Event;
    
    // constructor
    function Banner(obj) {
        var id = this.id = obj.id,
            self = this,
            el = Ut.$(id);
            
        if ( !el ) { 
            throw new Error('No element matching id found.');
            //return; 
        }
        this.speed = obj.speed || 4500;
        this.bRand = obj.bRand;
        this.content = obj.content;
        this.len = this.content.length;
        if ( obj.bPause ) {
            Ev.add(el, 'mouseover', function(e) { Banner.pause(e, id); } );
            Ev.add(el, 'mouseout', function(e) { 
                    if ( Ut.mouseleave(e, el) ) {
                        Banner.resume(e, id);
                    }
                });
        }
        this.ctr = obj.num || 0; // getRandom fn sets num
        Banner.col[id] = this;
        self.timer = setTimeout( function(){ self.doSwap(); }, self.speed);
    }
    
    Banner.col = {}; // hold instances
    
    Banner.prototype = {
        resumeDelay: 400, // wait to resume rotation onmouseout 
        on_swap: function(){}, // callback
        
        doSwap: function() {
            this.clearTimer();
            var el = Ut.$(this.id),
                self = this;
            if ( this.bRand ) {
                this.setRandomCtr();
            } else {
                if ( this.ctr < this.len - 1 ) {
                    this.ctr++;
                } else {
                    this.ctr = 0;
                }
            }
            el.innerHTML = this.content[this.ctr];
            self.timer = setTimeout( function(){ self.doSwap(); }, self.speed);
            this.on_swap();
        },
        
        setRandomCtr: function() {
            var i = 0, ctr;
            do { 
                ctr = Math.floor( Math.random() * this.len );
                i++;
            // repeat attempts to get new ctr, if necessary
            } while ( ctr === this.ctr && i < 6 );
            this.ctr = ctr;
        },
        
        clearTimer: function() {
            clearTimeout( this.timer ); this.timer = null;
        }
    };
    
    Banner.getRandom = function(obj) {
        var ar = obj.content,
            num = obj.num = Math.floor( Math.random() * ar.length );
        document.write( ar[num] ); document.close();
    };

    // for stopping/starting (onmouseover/out)
    Banner.pause = function(e, id) {	
        var obj = Banner.col[id];
        if (obj) {
            obj.clearTimer();
        }
    };

    Banner.resume = function(e, id) {
        var obj = Banner.col[id];
        obj.timer = setTimeout( function(){ obj.doSwap(); }, obj.resumeDelay);
    };

    return Banner;
        
})();