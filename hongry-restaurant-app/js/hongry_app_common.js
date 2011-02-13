var WIDTH = 320;
var HEIGHT = 480;
var BAR_HEIGHT = HEIGHT-48;
var BLACK = "rgb(0,0,0)"
var canvas,ctx;
var currentScene;
var mouseDown = false;
String.prototype.trim = function () {
   return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

function addClickHandlers() {
canvas.addEventListener('mousedown', function(event) {
event.preventDefault();
    curX = event.pageX
    curY = event.pageY
    doMouseDown(curX,curY);
}, false);
canvas.addEventListener('mouseup', function(event) {
event.preventDefault();
    curX = event.pageX
    curY = event.pageY
    doMouseUp(curX,curY);
}, false);
canvas.addEventListener('mousemove', function(event) {
event.preventDefault();
    curX = event.pageX
    curY = event.pageY
    doMouseMove(curX,curY);
}, false);
}

function addTouchHandlers() {
canvas.addEventListener('touchstart', function(event) {
event.preventDefault();
    curX = event.targetTouches[0].pageX;
    curY = event.targetTouches[0].pageY;
    doMouseDown(curX,curY);
}, false);
canvas.addEventListener('touchend', function(event) {
event.preventDefault();
    curX = event.changedTouches[0].pageX;
    curY = event.changedTouches[0].pageY;
    doMouseUp(curX,curY);
}, false);
canvas.addEventListener('touchmove', function(event) {
event.preventDefault();
    curX = event.targetTouches[0].pageX;
    curY = event.targetTouches[0].pageY;
    doMouseMove(curX,curY);
}, false);
}

function doMouseDown(x,y) {
mouseDown = true;
if(currentScene != null && currentScene.mouseDownHandler != null){
  currentScene.mouseDownHandler(x,y);
}
draw();
}

function doMouseUp(x,y) {
mouseDown = false;
if(currentScene != null && currentScene.mouseUpHandler != null){
  currentScene.mouseUpHandler(x,y);
}
draw();
}

function doMouseMove(x,y) {
if(currentScene != null && currentScene.mouseMoveHandler != null){
  currentScene.mouseMoveHandler(x,y);
}
draw();
}



ListScene = function() {
    this.listData = new Array();
    this.listPage = 0;
    this.maxPageItems = 8;
    this.heightOffset = 0;
    this.itemHeight = 50;
}

ListScene.prototype.drawHandler = function() {
    drawButtons();

    var info = this.getPageInfo();
    
    var j = 0;
    if( info.showUpArrow ) {
        ctx.drawImage(imgListItem,0,this.heightOffset+this.itemHeight*j,WIDTH,this.itemHeight);
        ctx.drawImage(imgUp,(WIDTH-11)/2,this.heightOffset+this.itemHeight*j+(this.itemHeight-11)/2);
        j++;
    }

    for(var i = info.startItem; i < info.endItem; i++) {
      ctx.drawImage(imgListItem,0,this.heightOffset+this.itemHeight*j,WIDTH,this.itemHeight);
      drawString(this.listData[i], 5,this.heightOffset+this.itemHeight*j+5,WIDTH-10,40);
      j++
    }

    if( info.showDownArrow ) {
        ctx.drawImage(imgListItem,0,this.heightOffset+this.itemHeight*j,WIDTH,this.itemHeight);
        ctx.drawImage(imgDown,(WIDTH-11)/2,this.heightOffset+this.itemHeight*j+(this.itemHeight-11)/2);
    }
}

ListScene.prototype.getPageInfo = function() {
    var numItems = this.listData.length;

    var showUpArrow = this.listPage > 0;
    var showDownArrow =  false;
    var startItem = 0;
    var endItem = 0;
    if( this.listPage == 0 ) {
        showDownArrow = (numItems - this.maxPageItems) > 0;
        startItem = 0;
        if( showDownArrow ) {
            endItem = this.maxPageItems-1;
        }
        else {
            endItem = this.maxPageItems;
        }
    }
    else {
        showDownArrow = (numItems - (this.maxPageItems-1) - (this.maxPageItems-2)*(this.listPage)) > 0;
        startItem = this.maxPageItems-1+(this.listPage-1)*(this.maxPageItems-2);
        if( showDownArrow ) {
            endItem = startItem + (this.maxPageItems - 2);
        }
        else {
            endItem = startItem + (this.maxPageItems - 1);
        }

    }

    if( endItem > numItems) {
        endItem = numItems;
    }

    return {showUpArrow:showUpArrow,showDownArrow:showDownArrow,startItem:startItem,endItem:endItem}
}

ListScene.prototype.mouseDownHandler = function(x,y) {

    if(!handleButtons(x,y)) {

        var i = Math.floor((y-this.heightOffset)/this.itemHeight);
        var info = this.getPageInfo();
        if( i == 0 &&  info.showUpArrow) {
            this.listPage--;
            draw();
        }
        else if( i == this.maxPageItems-1 && info.showDownArrow) {
            this.listPage++;
            draw();
        }
        else {
            var touchedItem = info.startItem+i;
            if( this.listPage > 0 ) {
                touchedItem -= 1;
            }
            this.itemTouched(touchedItem);
        }
    }
}

ListScene.prototype.itemTouched = function(i) {

}

HeirarchalListScene = function() {
    ListScene.call(this);
    this.heightOffset = 45;
    this.maxPageItems = 7;
    this.itemHeight = 55;
    this.heirarchalData = [];

    this.show_back = false;

    this.current_menu_0 = -1;
    this.current_menu_1 = -1;
    this.viewMenus();
    this.title = "";
}

HeirarchalListScene.prototype = new ListScene;                // Define sub-class
HeirarchalListScene.prototype.constructor = HeirarchalListScene;

HeirarchalListScene.prototype.drawHandler = function() {
    ListScene.prototype.drawHandler.call(this)
    ctx.drawImage(imgListItem,0,0,WIDTH,45);
    drawString(this.title, WIDTH/2-getStringWidth(this.title)/2,12,WIDTH,45);

    if(this.show_back) {
        ctx.drawImage(imgButton,7,7,50,30);
        drawString("Back", 17,15,50,30);
    }
}

HeirarchalListScene.prototype.mouseDownHandler = function(x,y) {
    if(x<50&&y<50) {
        if(this.current_menu_0 != -1) {
            this.viewMenus(-1,-1);
            this.show_back = false;
            return;
        }
    }
    ListScene.prototype.mouseDownHandler.call(this,x,y)
}

HeirarchalListScene.prototype.viewMenus = function(m0,m1) {
    if( m0 == undefined ) {
      m0 = this.current_menu_0;
    }
    if( m1 == undefined ) {
      m1 = this.current_menu_1;
    }
    this.viewableMenus = new Array();
    this.listData = new Array();
    for( var i=0, length=this.heirarchalData.length; i<length; i++) {
        var it = this.heirarchalData[i];
        if( it.menu_0 == m0 && it.menu_1 == m1) {
            this.listData.push(it.name);
            this.viewableMenus.push(it.id);
        }
    }
    this.current_menu_0 = m0;
    this.current_menu_1 = m1;

    if( this.current_menu_0 != -1) {
        this.show_back = true;
    }
    this.listPage = 0;
}

HeirarchalListScene.prototype.itemTouched = function(i) {
    var touched_menu = this.viewableMenus[i];
    if(this.hasMoreMenus(i)) {
        this.viewMenus(touched_menu,-1);
        draw();
    }
    else {
        this.leafItemTouched(this.getMenuItemById(touched_menu));
    }
}

HeirarchalListScene.prototype.getMenuItemById = function(id) {
    for( var i=0, length=this.heirarchalData.length; i<length; i++) {
        var it = this.heirarchalData[i];
        if( it.id == id) {
          return it;
        }
    }
    return null;
}

HeirarchalListScene.prototype.hasMoreMenus = function(i) {
    return this.current_menu_0 == -1;
}

HeirarchalListScene.prototype.leafItemTouched = function(item) {

}
