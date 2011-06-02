var WIDTH = 320;
var HEIGHT = 480;
var NAV_BAR_HEIGHT = 45;
var TAB_BAR_HEIGHT = 48;
var BAR_HEIGHT = HEIGHT-TAB_BAR_HEIGHT;
var BLACK = "rgb(0,0,0)"
var WHITE = "rgb(255,255,255)";
var GRAY = "#25272b";
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

changeScene = function(scene) {
    currentScene = scene;
    draw();
} 

var oldFonts = [];

pushFont = function() {
    oldFonts.push(FONT);
}

popFont = function() {
    FONT = oldFonts.pop();
}

ListScene = function() {
    this.listData = new Array();
    this.listPage = 0;
    this.maxPageItems = 8;
    this.heightOffset = 0;
    this.itemHeight = 50;
    this.FONT = null;
}

ListScene.prototype.drawHandler = function() {
    var oldFont = FONT;
    if( this.FONT != null ) {
    	FONT = this.FONT;
    }
    ctx.fillStyle = GRAY;
    ctx.fillRect(0,0,320,480);
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
      var s = this.listData[i];
      this.drawItemHandler(s,j)
      j++
    }

    if( info.showDownArrow ) {
        ctx.drawImage(imgListItem,0,this.heightOffset+this.itemHeight*j,WIDTH,this.itemHeight);
        ctx.drawImage(imgDown,(WIDTH-11)/2,this.heightOffset+this.itemHeight*j+(this.itemHeight-11)/2);
    }

    FONT = oldFont;
}

ListScene.prototype.drawItemHandler = function(item,i) {
    var offsetX = 0;//Math.floor((WIDTH-FONT.getTextWidth(s)-20)/2);
    var offsetY = Math.floor((this.itemHeight-FONT.getTextHeight(item.name)-10)/2);
    drawString(item.name, 5+offsetX,this.heightOffset+this.itemHeight*i+5+offsetY,WIDTH-10,40);
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
	    if( touchedItem >= 0 && touchedItem < this.listData.length ) {
		this.itemTouched(touchedItem);
	    }
        }
    }
}

ListScene.prototype.itemTouched = function(index) {

}

HeirarchalListScene = function() {
    ListScene.call(this);
    this.heightOffset = NAV_BAR_HEIGHT;
    this.maxPageItems = 7;
    this.itemHeight = 55;
    this.heirarchalData = [];

    this.show_back = false;

    this.current_parent_0 = "";
    this.current_parent_1 = "";
    this.viewItems();
    this.title = "";
}

HeirarchalListScene.prototype = new ListScene;                // Define sub-class
HeirarchalListScene.prototype.constructor = HeirarchalListScene;

HeirarchalListScene.prototype.drawHandler = function() {
    var oldFont = FONT;
    if( this.FONT != null ) {
    	FONT = this.FONT;
    }
    ListScene.prototype.drawHandler.call(this)
    ctx.drawImage(imgListItem,0,0,WIDTH,NAV_BAR_HEIGHT);
    drawString(this.title, WIDTH/2-getStringWidth(this.title)/2,12,WIDTH,NAV_BAR_HEIGHT);
    FONT = oldFont;

    if(this.show_back) {
        ctx.drawImage(imgButton,7,7,50,30);
        drawString("Back", 17,15,50,30);
    }
}

HeirarchalListScene.prototype.mouseDownHandler = function(x,y) {
    if(x<50&&y<50) {
        if(this.current_parent_0 != "") {
            this.viewItems("","");
            this.show_back = false;
            return;
        }
    }
    ListScene.prototype.mouseDownHandler.call(this,x,y)
}

HeirarchalListScene.prototype.viewItems = function(p0,p1) {
    if( p0 == undefined ) {
      p0 = this.current_parent_0;
    }
    if( p1 == undefined ) {
      p1 = this.current_parent_1;
    }
    this.viewableItems = new Array();
    this.listData = new Array();
    for( var i=0, length=this.heirarchalData.length; i<length; i++) {
        var it = this.heirarchalData[i];
        if( it.parent_0 == p0 && it.parent_1 == p1) {
            this.listData.push(it);
            this.viewableItems.push(it.id);
        }
    }
    this.current_parent_0 = p0;
    this.current_parent_1 = p1;

    if( this.current_parent_0 != -1) {
        this.show_back = true;
    }
    this.listPage = 0;
}

HeirarchalListScene.prototype.itemTouched = function(i) {
    var touched_item = this.viewableItems[i];
    if(this.hasMoreChildItems(touched_item)) {
        this.viewItems(touched_item,"");
        draw();
    }
    else {
        this.leafItemTouched(this.getHeirarchalItemById(touched_item));
    }
}

HeirarchalListScene.prototype.getHeirarchalItemById = function(id) {
    for( var i=0, length=this.heirarchalData.length; i<length; i++) {
        var it = this.heirarchalData[i];
        if( it.id == id) {
          return it;
        }
    }
    return null;
}

HeirarchalListScene.prototype.hasMoreChildItems = function(id) {
    for( var i=0, length=this.heirarchalData.length; i<length; i++) {
        var it = this.heirarchalData[i];
        if( it.parent_0 == id || it.parent_1 == id) {
          return true;
        }
    }

    return false;
}

HeirarchalListScene.prototype.leafItemTouched = function(item) {

}
