import cherrypy
from models import *
from lib.util import *

class Root(object):
    @cherrypy.expose
    def index(self):
        return render("index.html",{"name":"Richard"})
    
    @cherrypy.expose
    def restaurant(self,restaurant_id="TORCHY"):
        return render("restaurant.html",{"restaurant_id":restaurant_id})

    @cherrypy.expose
    def restaurant_data(self):
	q = Restaurant.all()
	q.filter("name =", "TORCHY")
	r = q.fetch(1)[0]

	specials = ""

	for i in range(0,len(r.specials_name)):
	    if specials != "":
		specials = specials + ', '
	    specials = specials + '{ name: "%s", text: "%s", img:2}' % (r.specials_name[i],r.specials_text[i])


	menuitems = ""
	for i in range(0,len(r.menuitem_id)):
	    if menuitems != "":
		menuitems = menuitems + ', '
	    menuitems =  menuitems + '{parent_0:"%s" ,parent_1:"%s" ,id:"%s" ,name:"%s", description: "%s", votes: "%s", price: "%s", voted: true}' % (r.menuitem_parent_0[i],r.menuitem_parent_1[i],r.menuitem_id[i],r.menuitem_name[i],r.menuitem_description[i],r.menuitem_votes[i],r.menuitem_price[i])

        return """
{
	    image_background: 0,
	    image_logo:1,
	    announcement_0: "%s",
	    announcement_1: "%s",
	    our_story: "%s",
	    map_link: "%s",
	    menu: [
		%s
	    ],
	    specials: [
		%s 
	    ]
	}
""" % ( r.announcement_0, r.announcement_1, r.our_story, r.map_link, menuitems, specials )


    @cherrypy.expose(alias="favicon.ico")
    def favicon(self):
        redirect("img/favicon.ico")
