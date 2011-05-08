import cherrypy
from models import *
from lib.util import *

class Root(object):
    @cherrypy.expose
    def index(self):
	r = RestaurantImage()
	r.image_data = "blah"
	r.put()
        return render("index.html",{"name":"Richard"})
    
    @cherrypy.expose
    def restaurant(self,restaurant_id="TORCHY"):
        return render("restaurant.html",{"restaurant_id":restaurant_id})

    @cherrypy.expose
    def restaurant_data(self):
        return """
{
	    image_background: 0,
	    image_logo:1,
	    announcement_0: "On Wednesday, december 15th from 7-10pm join us at the South Austin Trailer Park",
	    announcement_1: "Come try this months special!",
	    our_story:     "As a man of the people, I generally like my tacos to be as flavorless and devoid of textural accompaniment as possible. My usual 'taco' dinner conssts of a thin corn-constituted 'tortilla' lightly peppered with asparagus-paste beans, all shrouded beneath a healthy portion of water reed stalks- in deference to the indigenous tradition, of course. As a man of the people, I generally like my tacos to be as flavorless and devoid of textural accompaniment as possible. My usual 'taco' dinner consists of a thin corn-constituted 'tortilla' lightly peppered with asparagus-paste beans, all shrouded beneath a healthy portion of water reed stalks- in deference to the indigenous tradition, of course.",
	    map_link: 'maps://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=torchies+tacos&aq=&sll=37.0625,-95.677068&sspn=27.781434,63.720703&ie=UTF8&hq=torchys+tacos&hnear=&ll=30.25195,-97.753944&spn=0.110917,0.248909&t=h&z=12',
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
		{name:"Buy 1 Taco Get 2 Free",text:"Come in to Torchy's Tacos south",img:2}
	    ]
	}
"""


    @cherrypy.expose(alias="favicon.ico")
    def favicon(self):
        redirect("img/favicon.ico")
