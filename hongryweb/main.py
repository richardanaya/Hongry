import cherrypy
import wsgiref.handlers
from jinja2 import Environment, FileSystemLoader, TemplateNotFound
import os
from django.core import serializers
from hongry.data import VenueOwner, Venue, RestaurantImage, VenueNews, MenuItem
from hongry.converter import convert_model_to_xml
from google.appengine.ext import db
from uuid import uuid4
import datetime
import csv
import logging

template_dirs = []
template_dirs.append(os.path.join(os.path.dirname(__file__), 'templates'))

def get_venue_or_none(venue_code):
    venues = db.GqlQuery("SELECT * FROM Venue WHERE venue_code = :1", venue_code)
    return venues.get()
    
def get_venue_news(venue):
    news = db.GqlQuery("SELECT * FROM VenueNews WHERE venue = :1", venue.key()).fetch(1000)
    return news

def get_menu_items(venue):
    menu_items = db.GqlQuery("SELECT * FROM MenuItem WHERE venue = :1", venue.key()).fetch(1000)
    return menu_items

def get_template(name):
    env = Environment(loader = FileSystemLoader(template_dirs))
    try:
        return env.get_template(name)
    except TemplateNotFound:
        raise TemplateNotFound(name)

def redirect(url):
    raise cherrypy.HTTPRedirect(url)

class HongryApplication(object):
    @cherrypy.expose
    def app_settings(self,app_id):
        venue = get_venue_or_none(app_id)
        return get_template('app_settings.html').render(app_id=app_id, venue_name=venue.name, front_page_text=venue.front_page_text, our_story=venue.our_story)
 
    @cherrypy.expose
    def do_update_application_settings(self,venue_name,our_story,front_page_text,app_id):
        venue = get_venue_or_none(app_id)
        venue.name = venue_name
        venue.our_story = our_story
        venue.front_page_text = front_page_text
        venue.put()
        redirect('/dashboard?app_id='+app_id)
        
    @cherrypy.expose
    def app_images(self,app_id):
        venue = get_venue_or_none(app_id)
        return get_template('app_images.html').render(app_id=app_id, logo=venue.logo, icon=venue.icon, background=venue.background)
        
    @cherrypy.expose
    def app_menu_items(self,app_id):
        venue = get_venue_or_none(app_id)
        return get_template('app_menu_items.html').render(app_id=app_id,menu_items=get_menu_items(venue))
        
    @cherrypy.expose
    def app_communication(self,app_id):
        venue = get_venue_or_none(app_id)
        return get_template('app_communication.html').render(app_id=app_id,news= get_venue_news(venue))
    
    @cherrypy.expose
    def do_add_application_message(self,app_id,title,message):
        venue = get_venue_or_none(app_id)
        news = VenueNews(
        venue = venue,
        created_date = datetime.datetime.now(),
        title = title,
        content = message
        )
        news.put()
        redirect('/app_communication?app_id='+app_id)

    @cherrypy.expose
    def update_application_image(self, **args):
        restaraunt_image = RestaurantImage(image_key=str(uuid4()),image_data=args['Filedata'].file.getvalue())
        restaraunt_image.put()
        venue = get_venue_or_none(args["app_id"])
        image_id = args["image_id"]
        if image_id=="icon":
            venue.icon = restaraunt_image.image_key
        elif image_id=="logo":
            venue.logo = restaraunt_image.image_key
        elif image_id=="background":
            venue.background = restaraunt_image.image_key
        venue.put()
        return restaraunt_image.image_key
        
    @cherrypy.expose
    def upload_application_menu_items(self, **args):
        file_data=args['Filedata'].file.getvalue()
        reader = csv.reader(file_data.splitlines(),dialect='excel')
        venue = get_venue_or_none(args["app_id"])
        menu_items = db.GqlQuery("SELECT * FROM MenuItem WHERE venue = :1", venue.key()).fetch(1000)
        for mi in menu_items:
            db.delete(mi)
        logging.info("----------------DOING STUFF-----------------------------------------")
        
        first_row = True
        for row in reader:
                logging.info("row here 5$#%^#%@#$")
                if first_row:
                    first_row = False
                else:
                    mi = MenuItem(
                        venue=venue,
                        category=row[0],
                        name=row[1],
                        price=float(row[2]),
                        description=row[3]
                    )
                    mi.put()  
        return file_data


        
    @cherrypy.expose
    def get_image(self,key):
        images = db.GqlQuery("SELECT * FROM RestaurantImage WHERE image_key = :1", key)
        image = images.get()
        if image != None:
            cherrypy.response.headers['Content-Type']= 'image'
            return image.image_data
        
    @cherrypy.expose
    def dashboard(self,app_id):
        return get_template('dashboard.html').render(app_id=app_id)

    @cherrypy.expose
    def about(self):
        return get_template('about.html').render()

    @cherrypy.expose
    def index(self):
	if cherrypy.url().find('hongry.com.mx') != -1:
	    redirect('/es/index.html')
        return get_template('frontpage.html').render(lang='en')
    
    @cherrypy.expose
    def create_dummy_data(self):
        db.delete(VenueOwner.all())
        db.delete(Venue.all())
        db.delete(VenueNews.all())
        
        vowner = VenueOwner(name="a b c", email="a@b.c")
        vowner.put()
        
        v = Venue(
            venue_code = "TORCHYSTACOS",
            name = "Torchy's Tacos",
            icon = "6cc8c151-f06d-4207-98d8-41456347e084",
            logo = "6cc8c151-f06d-4207-98d8-41456347e084",
            background = "http://www.torchystacos.com/images/pictures/torchys_dallas.jpg",
            owner = vowner,
            front_page_icons = "DEFAULT",
            our_story = "Torchy's tacos started with some guys who loved great tacos.",
            front_page_text = "Taco of the day is RanchHand, Mmmm.",
            is_front_page_news_enabled = True,
            is_social_info_visible = False,
            is_social_info_single_source = True,
            social_info_single_source = "@torchystacos",
            social_info_tags = "#torchystacos",
            recommendation_categories = ["Tacos"])
        v.put()
        
        v = Venue(
            venue_code = "JACKS",
            name = "Jack's Cafe and Bar",
            icon = None,
            logo = None,
            background = None,
            owner = vowner,
            front_page_icons = "DEFAULT",
            our_story = "A relaxing bar to go chill with pals",
            front_page_text = "Try our irish coffee! Get your day started off right",
            is_front_page_news_enabled = False,
            is_social_info_visible = False,
            is_social_info_single_source = False,
            social_info_single_source = "",
            social_info_tags = "",
            recommendation_categories = ["Drinks"])
        v.put()
        
        return "Dummy data created!"
    
    @cherrypy.expose
    def application_data(self, app_id):
        query = db.GqlQuery("SELECT * FROM Venue WHERE venue_code = :1",app_id)
        results = query.fetch(1)
        venue = results[0]
        cherrypy.response.headers['Content-Type'] = 'text/xml'
        return convert_model_to_xml(venue,"Venue")
 


#---------------------------------------------------------------------------
# Start the server under Google AppEngine
#---------------------------------------------------------------------------
app = cherrypy.tree.mount(HongryApplication(), "/")
wsgiref.handlers.CGIHandler().run(app)
