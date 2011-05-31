import cherrypy
from models import *
from lib.util import *
from uuid import uuid4

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
	    if( r.specials_name[i].strip() != '' ):
		if specials != "":
		    specials = specials + ', '
		specials = specials + '{ name: "%s", text: "%s", img:2}' % (r.specials_name[i],r.specials_text[i])


	menuitems = ""
	for i in range(0,len(r.menuitem_id)):
	    if( r.menuitem_name[i].strip() != '' ):
		if menuitems != "":
		    menuitems = menuitems + ', '
		menuitems =  menuitems + '{parent_0:"%s" ,parent_1:"%s" ,id:"%s" ,name:"%s", description: "%s", votes: "%s", price: "%s", voted: true, img: "%s"}' % (r.menuitem_parent_0[i],r.menuitem_parent_1[i],r.menuitem_id[i],r.menuitem_name[i],r.menuitem_description[i],r.menuitem_votes[i],r.menuitem_price[i],r.menuitem_image[i])

        return """
{
	    image_background: "%s",
	    image_logo:"%s",
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
""" % ( r.image_background, r.image_logo, r.announcement_0, r.announcement_1, r.our_story, r.map_link, menuitems, specials )

    @cherrypy.expose
    def upload_image(self, **args):
        restaraunt_image = RestaurantImage(image_key=str(uuid4()),image_data=args['Filedata'].file.getvalue())
        restaraunt_image.put()
        return restaraunt_image.image_key
    
    @cherrypy.expose
    def get_image(self,key):
        images = db.GqlQuery("SELECT * FROM RestaurantImage WHERE image_key = :1", key)
        image = images.get()
        if image != None:
            cherrypy.response.headers['Content-Type']= 'image'
            return image.image_data
     

    @cherrypy.expose(alias="favicon.ico")
    def favicon(self):
        redirect("img/favicon.ico")
