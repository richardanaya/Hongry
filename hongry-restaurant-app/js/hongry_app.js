var pressed = [false, false,false, false,false,false];

$(document).ready(function() {
    imgLogo = new Image();
    imgLogo.src = "/img/venue_logo.png";
    imgListItem = new Image();
    imgListItem.src = "/img/list_item.png";
    imgBackground = new Image();
    imgBackground.src = "/img/background.png";
    imgButton = new Image();
    imgButton.src = "/img/button_background.png";
    imgButtonPressed = new Image();
    imgButtonPressed.src = "/img/button_background_pressed.png";
    imgHome = new Image();
    imgHome.src = "/img/home.png";
    imgLocations = new Image();
    imgLocations.src = "/img/locations.png";
    imgMenu = new Image();
    imgMenu.src = "/img/menu.png";
    imgMore = new Image();
    imgMore.src = "/img/more.png";
    imgSpecials = new Image();
    imgSpecials.src = "/img/specials.png";
    imgFont = new Image();
    imgFont.src = "/img/font.png";
    imgUp = new Image();
    imgUp.src = "/img/up.gif";
    imgDown = new Image();
    imgDown.src = "/img/down.gif";
    $(imgFont).load(function() {
        init();
    });
});

init = function() {
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
    currentScene = new FrontPageScene();
    
    draw();
}

draw = function() {
    clear(BLACK);
    ctx.drawImage(imgBackground,0,0,WIDTH,HEIGHT);
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
    currentScene = new FrontPageScene();
  }
  if(i == 1) {
    currentScene = new OurStoryScene();
  }
  if( i  == 2) {
    currentScene = new MenuListScene();
  }
  if(i == 3) {
    //scene = new WaitingScene();
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
    drawButton(imgMore,192,BAR_HEIGHT,pressed[3]);
    drawButton(imgSpecials,256,BAR_HEIGHT,pressed[4]);
}

FrontPageScene = function () {
    
}

FrontPageScene.prototype.drawHandler = function() {
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


MenuListScene = function() {
    HeirarchalListScene.call(this);
    this.heirarchalData = [
            {parent_0:-1,parent_1:-1,id:0 ,name:"Tacos"},
            {parent_0:-1,parent_1:-1,id:1 ,name:"Breakfast"},
            {parent_0:-1,parent_1:-1,id:2 ,name:"Eats & Treats"},
            {parent_0:-1,parent_1:-1,id:3 ,name:"Chips y Dips"},
            {parent_0:-1,parent_1:-1,id:4 ,name:"Sides"},
            {parent_0:-1,parent_1:-1,id:5 ,name:"Drinks"},
            {parent_0:-1,parent_1:-1,id:6 ,name:"Hot Sauces"},
            {parent_0:0,parent_1:-1,id:7 ,name:"Green Chili Pork"},
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
    ]; 

    this.title = "Menu";
    this.viewItems();
}

MenuListScene.prototype = new HeirarchalListScene;                // Define sub-class
MenuListScene.prototype.constructor = MenuListScene;

MenuListScene.prototype.leafItemTouched = function(item) {
    alert('leaf item pressed '+item.name);    
}
