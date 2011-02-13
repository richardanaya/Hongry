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
}

ListScene.prototype.drawHandler = function() {
    drawButtons();

    var info = this.getPageInfo();
    
    var j = 0;
    if( info.showUpArrow ) {
        ctx.drawImage(imgListItem,0,this.heightOffset+50*j,WIDTH,50);
        ctx.drawImage(imgUp,(WIDTH-11)/2,this.heightOffset+50*j+(50-11)/2);
        j++;
    }

    for(var i = info.startItem; i < info.endItem; i++) {
      ctx.drawImage(imgListItem,0,this.heightOffset+50*j,WIDTH,50);
      drawString(this.listData[i], 5,this.heightOffset+50*j+5,WIDTH-10,40);
      j++
    }

    if( info.showDownArrow ) {
        ctx.drawImage(imgListItem,0,this.heightOffset+50*j,WIDTH,50);
        ctx.drawImage(imgDown,(WIDTH-11)/2,this.heightOffset+50*j+(50-11)/2);
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

        var i = Math.floor((y-this.heightOffset)/50);
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