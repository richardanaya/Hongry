var pressed = [false, false,false, false,false,false];

$(document).ready(function() {
    imgListItem = new Image();
    imgListItem.src = "img/list_item.png";
    imgButton = new Image();
    imgButton.src = "img/button_background.png";
    imgButtonPressed = new Image();
    imgButtonPressed.src = "img/button_background_pressed.png";
    imgHome = new Image();
    imgHome.src = "img/tab_bar_home.png";
    imgLocations = new Image();
    imgLocations.src = "img/tab_bar_locations.png";
    imgMenu = new Image();
    imgMenu.src = "img/tab_bar_menu.png";
    imgMore = new Image();
    imgMore.src = "img/tab_bar_more.png";
    imgSpecials = new Image();
    imgSpecials.src = "img/tab_bar_specials.png";
    imgFontGreen = new Image();
    imgFontGreen.src = "img/font_green.png";
    imgFontBlack = new Image();
    imgFontBlack.src = "img/font_black.png";
    imgFont = new Image();
    imgFont.src = "img/font_white.png";
    imgFont16 = new Image();
    imgFont16.src = "img/font_white_16.png";
    imgFontBig = new Image();
    imgFontBig.src = "img/font_white_big.png";
    imgUp = new Image();
    imgUp.src = "img/up.gif";
    imgDown = new Image();
    imgDown.src = "img/down.gif";
    imgStar = new Image();
    imgStar.src = "img/star.png";
    imgVoteChecked = new Image();
    imgVoteChecked.src = "img/vote_checked.png";
    imgVoteUnchecked = new Image();
    imgVoteUnchecked.src = "img/vote_unchecked.png";
    imgSeparator = new Image();
    imgSeparator.src = "img/separator.png";


    imgBackground = new Image();
    imgBackground.src = "img/background.png";
    imgLogo = new Image();
    imgLogo.src = "img/venue_logo.png";
    imgTacos = new Image();
    imgTacos.src = "img/tacos.jpg";


    $(imgTacos).load(function() {

	$.ajax({
	    url: '/restaurant_data',
	    success: function(data) {
		restaurant_data = eval('('+data+')');
		init();
	    }
	});

    })


    });

getImage = function(index) {
    if( index == 0 ) { return imgBackground; }
    else if( index == 1 ) { return imgLogo; }
    else if( index == 2 ) { return imgTacos; }
}

init = function() {
    FONT_WHITE_12 = new FontRenderer(imgFont);
    FONT_WHITE_16 = new FontRenderer(imgFont16);
    FONT_WHITE_BIG = new FontRenderer(imgFontBig);
    FONT_BLACK_12 = new FontRenderer(imgFontBlack);
    FONT_GREEN_12 = new FontRenderer(imgFontGreen);
    FONT = FONT_WHITE_12;
    canvas = document.getElementById("mainContent");
    if (canvas.getContext) {
	ctx = canvas.getContext("2d");
    }


    var iphone_found = false;
    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	if (document.cookie.indexOf("iphone_redirect=false") == -1) {
	    addTouchHandlers();
	    iphone_found = true;
	}
    }

    if( !iphone_found) {
	addClickHandlers();
    }
    changeScene(new FrontPageScene());
}

draw = function() {
    clear(WHITE);
    if( currentScene != null ) {
	currentScene.drawHandler();
    }
    else {
	if( drawHandler != null ) {
	    drawHandler();
	}
    }
}



function handleButtons(x, y) {
    i = Math.floor(x/64);
    if( y >= BAR_HEIGHT && y <=BAR_HEIGHT+48){
  pressed = [false,false,false,false,false];
  pressed[i] = true;
  if(i == 0) {
    changeScene(new FrontPageScene());
  }
  else if(i == 1) {
      var link = restaurant_data.map_link;
      window.open(link);
  }
  else if( i  == 2) {
    changeScene(new MenuListScene());
  }
  else if(i == 3) {
    changeScene(new SpecialsScene());
  }
  else if(i == 4) {
      changeScene(new MoreScene());
  }
  return true;
}
return false;
}

function drawButton(icon, x, y, pressed) {
  if( pressed ) {
          ctx.drawImage(imgButtonPressed,x,y);
  }
  else {
          ctx.drawImage(imgButton,x,y);
  }
  ctx.drawImage(icon,x+((imgButton.width-icon.width)/2),y+((imgButton.height-icon.height)/2));
}

function drawButtons(){
    drawButton(imgHome,0,BAR_HEIGHT,pressed[0]);
    drawButton(imgLocations,64,BAR_HEIGHT,pressed[1]);
    drawButton(imgMenu,128,BAR_HEIGHT,pressed[2]);
    drawButton(imgSpecials,192,BAR_HEIGHT,pressed[3]);
    drawButton(imgMore,256,BAR_HEIGHT,pressed[4]);
}

FrontPageScene = function () {
    
}

FrontPageScene.prototype.drawHandler = function() {
    ctx.drawImage(getImage(restaurant_data.image_background),0,0,WIDTH,HEIGHT);
    var logoImage = getImage(restaurant_data.image_logo);
    ctx.drawImage(logoImage,(WIDTH-logoImage.width)/2,65);
    drawButtons();
    ctx.drawImage(imgListItem,(320-250)/2,280,250,45);
    drawString(restaurant_data.announcement_0,(320-200)/2,287,200,40);
    ctx.drawImage(imgListItem,(320-250)/2,330,250,45);
    drawString(restaurant_data.announcement_1,(320-200)/2,337,200,40);
}

FrontPageScene.prototype.mouseDownHandler = function(x,y) {
    handleButtons(x,y);
}


OurStoryScene = function() {
    this.text = restaurant_data.our_story;
    this.currentPage = 0;
    var logoImage = getImage(restaurant_data.image_logo);
    this.pages = countPages(this.text,WIDTH-54,logoImage.height+10);
}

OurStoryScene.prototype.drawHandler = function() {
      ctx.drawImage(getImage(restaurant_data.image_background),0,0,WIDTH,HEIGHT);
      var logoImage = getImage(restaurant_data.image_logo);
      ctx.drawImage(logoImage,(WIDTH-logoImage.width)/2,5);
      drawButtons();
      ctx.drawImage(imgListItem,20,logoImage.height+10,WIDTH-40,logoImage.height+10+14);
      drawStringPage(this.text,27,logoImage.height+10+7,WIDTH-54,logoImage.height+10,this.currentPage);
}

OurStoryScene.prototype.mouseDownHandler = function(x, y) {
      if(!handleButtons(x,y)) {
              this.currentPage++;
              this.currentPage %= this.pages;
      }
}

MenuItemScene = function(menuItemData) {
    this.menuItemData = menuItemData;
    this.title = "Menu"
}

MenuItemScene.prototype.drawHandler = function() {
      var oldFont = FONT;
      FONT = FONT_WHITE_BIG;
      ctx.fillStyle = WHITE;
      ctx.fillRect(0,0,WIDTH,HEIGHT);
      drawButtons();
      ctx.drawImage(imgListItem,0,0,WIDTH,45);
      ctx.drawImage(imgListItem,0,0,WIDTH,45);
      ctx.drawImage(imgListItem,0,0,WIDTH,45);
      drawString(this.title, WIDTH/2-getStringWidth(this.title)/2,12,WIDTH,45);
      FONT = oldFont;
      ctx.drawImage(imgButton,7,7,50,30);
      drawString("Back", 17,15,50,30);
      var itemImg = getImage(2);
      ctx.drawImage(itemImg,0,0,itemImg.width,itemImg.height,10,NAV_BAR_HEIGHT+10,300,200);
      FONT = FONT_GREEN_12;
      
      drawString(this.menuItemData.price.toUpperCase(),260,NAV_BAR_HEIGHT+200+25,200,50);
      FONT = FONT_BLACK_12;
      drawString(this.menuItemData.name.toUpperCase(),15,NAV_BAR_HEIGHT+200+25,200,50);

      drawString(this.menuItemData.description,15,NAV_BAR_HEIGHT+200+10+40,280,75);
      ctx.drawImage(imgStar,25, NAV_BAR_HEIGHT+350);
      drawString(this.menuItemData.votes+" Votes",50,NAV_BAR_HEIGHT+352,200,50);
      if( this.menuItemData.voted ) {
        ctx.drawImage(imgVoteChecked,200, NAV_BAR_HEIGHT+345);
      }
      else {
        ctx.drawImage(imgVoteUnchecked,200, NAV_BAR_HEIGHT+345);
      }
      ctx.drawImage(imgSeparator,10, NAV_BAR_HEIGHT+325);
      FONT = FONT_WHITE_12;
}

MenuItemScene.prototype.mouseDownHandler = function(x, y) {
      if(!handleButtons(x,y)) {
        if( x < 70 && y < 45) {
            changeScene(new MenuListScene(this.menuItemData));
        }
        if( (!this.menuItemData.voted) && (x >= 200) && (x <= 200+imgVoteUnchecked.width) && (y >= NAV_BAR_HEIGHT+325) && (y<= NAV_BAR_HEIGHT+325+imgVoteUnchecked.height+20)) {
            this.menuItemData.voted = true;
            this.menuItemData.votes += 1;
            draw();
        }
      }
}


MenuListScene = function(menuItemData) {
    HeirarchalListScene.call(this);
    this.heirarchalData = restaurant_data.menu; 

    this.title = "Menu";
    this.viewItems();
    this.FONT = FONT_WHITE_BIG;
    this.maxPageItems = 6;
    this.itemHeight = 65;
    
    if( menuItemData ) {
        for(var i=0,len=this.heirarchalData.length;i<len;i++){
            if(this.heirarchalData[i].id == menuItemData.id) {
                this.viewItems(menuItemData.parent_0,menuItemData.parent_1);
            }
        }
    }
    else {
        this.viewItems();
    }
}

MenuListScene.prototype = new HeirarchalListScene();
MenuListScene.prototype.constructor = MenuListScene;

MenuListScene.prototype.leafItemTouched = function(item) {
    currentScene = new MenuItemScene(this.heirarchalData[item.id]);
}

MenuListScene.prototype.drawItemHandler = function(item,i) {
    if( !item.description ) {
	var offsetX = 0;
        var offsetY = Math.floor((this.itemHeight-FONT.getTextHeight(s)-10)/2);
        drawString(item.name, 5+offsetX,this.heightOffset+this.itemHeight*i+5+offsetY,WIDTH-10,40);
    }
    else {
        var oldFont = FONT;
        FONT = FONT_WHITE_16;
        var offsetX = 0;
        var offsetY = 5
        drawString(item.name, 5+offsetX,this.heightOffset+this.itemHeight*i+5+offsetY,WIDTH-10,40);
        offsetX = 250;
        offsetY = 0
        drawString(item.price, 5+offsetX,this.heightOffset+this.itemHeight*i+5+offsetY,WIDTH-10,40);
        FONT = FONT_WHITE_12;
        offsetX = 0;
        offsetY = 24;
        drawString(item.description, 5+offsetX,this.heightOffset+this.itemHeight*i+5+offsetY,WIDTH-100,60);
        offsetX = WIDTH-70;
        offsetY = 35;
        drawString(item.votes+' votes', 5+offsetX,this.heightOffset+this.itemHeight*i+5+offsetY,WIDTH-100,60);
        FONT = oldFont;
    }
}

MoreScene = function() {
    ListScene.call(this);
    this.listData = [ {name:"Our Story"}];
    this.FONT = FONT_WHITE_BIG;
}

MoreScene.prototype = new ListScene();
MoreScene.prototype.constructor = MoreScene;

MoreScene.prototype.itemTouched = function(index) {
    if( index == 0 ) {
	changeScene(new OurStoryScene());
    }
}

SpecialsScene = function() {
    ListScene.call(this);
    this.listData = restaurant_data.specials; 
    this.FONT = FONT_WHITE_BIG;
}

SpecialsScene.prototype = new ListScene();
SpecialsScene.prototype.constructor = SpecialsScene;

SpecialsScene.prototype.itemTouched = function(index) {
    changeScene(new SpecialItemScene(this.listData[index]));
}

drawNavBar = function(title,leftButton) {
    pushFont();
    FONT = FONT_WHITE_BIG;
    ctx.drawImage(imgListItem,0,0,WIDTH,NAV_BAR_HEIGHT);
    drawString(title, WIDTH/2-getStringWidth(title)/2,12,WIDTH,NAV_BAR_HEIGHT);
    FONT = FONT_WHITE_12;
    if( leftButton != undefined ) {
	ctx.drawImage(imgButton,7,7,50,30);
	drawString(leftButton, 17,15,50,30);
    }
    popFont();
}


SpecialItemScene = function(item) {
    this.item = item;
    this.currentPage = 0;
    pushFont();
    FONT = FONT_WHITE_BIG;
    var w = WIDTH-40;
    var h = 150;
    this.pages = countPages(this.item.text,w,h);
    popFont();
}

SpecialItemScene.prototype.drawHandler = function() {
    pushFont();
    FONT = FONT_WHITE_BIG;
    var specialImage = getImage(this.item.img);
    var backgroundImage = getImage(restaurant_data.image_background);
    ctx.drawImage(backgroundImage,0,0,WIDTH,HEIGHT);
    var w = WIDTH-40;
    var h = 150;
    ctx.drawImage(specialImage,(WIDTH-w)/2,(WIDTH-w)/2,w,h);
    drawButtons();
    ctx.drawImage(imgListItem,20,h+30,WIDTH-40,h+70+14);
    drawStringPage(this.item.text,35,h+30+7,WIDTH-60,h+70,this.currentPage);
    popFont();
}

SpecialItemScene.prototype.mouseDownHandler = function(x, y) {
      if(!handleButtons(x,y)) {
              this.currentPage++;
              this.currentPage %= this.pages;
      }
}


