var pressed = [false, false,false, false,false,false];

$(document).ready(function() {
    imgLogo = new Image();
    imgLogo.src = "img/venue_logo.png";
    imgListItem = new Image();
    imgListItem.src = "img/list_item.png";
    imgBackground = new Image();
    imgBackground.src = "img/background.png";
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
    imgTacos = new Image();
    imgTacos.src = "img/tacos.jpg";
    $(imgTacos).load(function() {
        init();
	restaurant_data = {
	    menu: [
		{parent_0:-1,parent_1:-1,id:0 ,name:"Tacos"},
		{parent_0:-1,parent_1:-1,id:1 ,name:"Breakfast"},
		{parent_0:-1,parent_1:-1,id:2 ,name:"Eats & Treats"},
		{parent_0:-1,parent_1:-1,id:3 ,name:"Chips y Dips"},
		{parent_0:-1,parent_1:-1,id:4 ,name:"Sides"},
		{parent_0:-1,parent_1:-1,id:5 ,name:"Drinks"},
		{parent_0:-1,parent_1:-1,id:6 ,name:"Hot Sauces"},
		{parent_0:0,parent_1:-1,id:7 ,name:"Green Chili Pork", description: "Delicious shredded pork with our house special sauce", votes: 9, price: "$7.98", voted: false},
		{parent_0:0,parent_1:-1,id:8,name:"Fried Avocado"},
		{parent_0:0,parent_1:-1,id:9 ,name:"Trailer Park"},
		{parent_0:0,parent_1:-1,id:10,name:"Crossroads"},
		{parent_0:0,parent_1:-1,id:11,name:"Mr. Pink"},
		{parent_0:0,parent_1:-1,id:12,name:"Beef Fajitas"},
		{parent_0:0,parent_1:-1,id:13,name:"Chicken Fajita"},
		{parent_0:0,parent_1:-1,id:14,name:"Ranch Hand"},
		{parent_0:0,parent_1:-1,id:15,name:"Dirty Sanchez"},
		{parent_0:0,parent_1:-1,id:16,name:"Brush Fire"},
		{parent_0:0,parent_1:-1,id:17,name:"Baja Shrimp"},
		{parent_0:0,parent_1:-1,id:18,name:"The Democrat"},
		{parent_0:0,parent_1:-1,id:19,name:"The Republican"},
		{parent_0:1,parent_1:-1,id:20,name:"Migas"},
		{parent_0:1,parent_1:-1,id:21,name:"Monk Special"},
		{parent_0:1,parent_1:-1,id:22,name:"Breakfast Tacos"},
		{parent_0:2,parent_1:-1,id:23,name:"Fajita Plate"},
		{parent_0:2,parent_1:-1,id:24,name:"Grande Burrito"},
		{parent_0:2,parent_1:-1,id:25,name:"Love Puppies"},
		{parent_0:2,parent_1:-1,id:26,name:"Little Nookies"},
		{parent_0:3,parent_1:-1,id:27,name:"Green Chili Queso & Chips"},
		{parent_0:3,parent_1:-1,id:28,name:"Chips & Guacomole"},
		{parent_0:3,parent_1:-1,id:29,name:"Chips & Salsa"},
		{parent_0:4,parent_1:-1,id:30,name:"Guacamole"},
		{parent_0:4,parent_1:-1,id:31,name:"Salsa"},
		{parent_0:4,parent_1:-1,id:32,name:"Pico de Gallo"},
		{parent_0:4,parent_1:-1,id:33,name:"Rice"},
		{parent_0:4,parent_1:-1,id:34,name:"Beans"},
		{parent_0:5,parent_1:-1,id:35,name:"Speciality Sodas"},
		{parent_0:5,parent_1:-1,id:36,name:"Fountain Drinks"},
		{parent_0:5,parent_1:-1,id:37,name:"Drinks"},
		{parent_0:5,parent_1:-1,id:38,name:"Coffee"},
		{parent_0:5,parent_1:-1,id:39,name:"Iced Tea"},
		{parent_0:6,parent_1:-1,id:40,name:"Diablo"},
		{parent_0:6,parent_1:-1,id:41,name:"Chipotle"},
		{parent_0:6,parent_1:-1,id:42,name:"Poblano"},
		{parent_0:6,parent_1:-1,id:43,name:"Tomatillo"},
		{parent_0:6,parent_1:-1,id:44,name:"Roja"}
	    ],
	    specials: [
		{name:"Buy 1 Taco Get 2 Free",text:"Come in to Torchy's Tacos south",img:imgTacos}
	    ]
	};
    })


    });

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
    window.open('maps://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=torchies+tacos&aq=&sll=37.0625,-95.677068&sspn=27.781434,63.720703&ie=UTF8&hq=torchys+tacos&hnear=&ll=30.25195,-97.753944&spn=0.110917,0.248909&t=h&z=12');
  }
  else if( i  == 2) {
    changeScene(new MenuListScene());
  }
  else if(i == 3) {
    changeScene(new SpecialsScene());
    //scene = new WaitingScene();
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
    ctx.drawImage(imgBackground,0,0,WIDTH,HEIGHT);
    ctx.drawImage(imgLogo,(WIDTH-imgLogo.width)/2,65);
    drawButtons();
    ctx.drawImage(imgListItem,(320-250)/2,280,250,45);
    drawString("On Wednesday, december 15th from 7-10pm join us at the South Austin Trailer Park",(320-200)/2,287,200,40);
    ctx.drawImage(imgListItem,(320-250)/2,330,250,45);
    drawString("Come try this months special!",(320-200)/2,337,200,40);
}

FrontPageScene.prototype.mouseDownHandler = function(x,y) {
    handleButtons(x,y);
}


OurStoryScene = function() {
    this.text = "As a man of the people, I generally like my tacos to be as flavorless and devoid of textural accompaniment as possible. My usual 'taco' dinner conssts of a thin corn-constituted 'tortilla' lightly peppered with asparagus-paste beans, all shrouded beneath a healthy portion of water reed stalks- in deference to the indigenous tradition, of course. As a man of the people, I generally like my tacos to be as flavorless and devoid of textural accompaniment as possible. My usual 'taco' dinner consists of a thin corn-constituted 'tortilla' lightly peppered with asparagus-paste beans, all shrouded beneath a healthy portion of water reed stalks- in deference to the indigenous tradition, of course.";
    this.currentPage = 0;
    this.pages = countPages(this.text,WIDTH-54,imgLogo.height+10);
}

OurStoryScene.prototype.drawHandler = function() {
      ctx.drawImage(imgBackground,0,0,WIDTH,HEIGHT);
      ctx.drawImage(imgLogo,(WIDTH-imgLogo.width)/2,5);
      drawButtons();
      ctx.drawImage(imgListItem,20,imgLogo.height+10,WIDTH-40,imgLogo.height+10+14);
      drawStringPage(this.text,27,imgLogo.height+10+7,WIDTH-54,imgLogo.height+10,this.currentPage);
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
      ctx.fillRect(0,0,320,480);
      drawButtons();
      ctx.drawImage(imgListItem,0,0,WIDTH,45);
      ctx.drawImage(imgListItem,0,0,WIDTH,45);
      ctx.drawImage(imgListItem,0,0,WIDTH,45);
      drawString(this.title, WIDTH/2-getStringWidth(this.title)/2,12,WIDTH,45);
      FONT = oldFont;
      ctx.drawImage(imgButton,7,7,50,30);
      drawString("Back", 17,15,50,30);
      ctx.drawImage(imgTacos,0,0,imgTacos.width,imgTacos.height,10,NAV_BAR_HEIGHT+10,300,200);
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

MenuListScene.prototype = new HeirarchalListScene();                // Define sub-class
MenuListScene.prototype.constructor = MenuListScene;

MenuListScene.prototype.leafItemTouched = function(item) {
    currentScene = new MenuItemScene(this.heirarchalData[item.id]);
}

MenuListScene.prototype.drawItemHandler = function(item,i) {
    if( !item.description ) {
        var offsetX = 0;//Math.floor((WIDTH-FONT.getTextWidth(s)-20)/2);
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

getMenuItemData = function(id) {
  return {id:id,name:"Queso and chips"};
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
    this.pages = countPages(this.item.text,WIDTH-54,imgLogo.height+10);
    popFont();
}

SpecialItemScene.prototype.drawHandler = function() {
    pushFont();
    FONT = FONT_WHITE_BIG;
    ctx.drawImage(imgBackground,0,0,WIDTH,HEIGHT);
    var w = WIDTH-40;
    var h = 150;
    ctx.drawImage(this.item.img,(WIDTH-w)/2,(WIDTH-w)/2,w,h);
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


