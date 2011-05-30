from google.appengine.ext import db
import datetime
import time

class RestaurantImage(db.Model):
   image_key = db.StringProperty(required=True)
   image_data = db.BlobProperty(required=True)

class VenueOwner(db.Model):
   name = db.StringProperty(required=True)
   email = db.EmailProperty(required=True)

class Venue(db.Model):
   venue_code = db.StringProperty(required=True)
   name = db.StringProperty(required=True)
   icon = db.StringProperty()
   logo = db.StringProperty()
   background = db.StringProperty()
   owner = db.ReferenceProperty(VenueOwner)
   front_page_icons = db.StringProperty(required=True)
   our_story = db.TextProperty()
   front_page_text = db.TextProperty()
   is_front_page_news_enabled = db.BooleanProperty()
   is_social_info_visible = db.BooleanProperty()
   is_social_info_single_source = db.BooleanProperty()
   social_info_single_source = db.StringProperty()
   social_info_tags = db.StringProperty()
   recommendation_categories = db.StringListProperty()

class MenuItem(db.Model):
   venue = db.ReferenceProperty(Venue)
   name = db.StringProperty()
   category = db.StringProperty()
   price = db.FloatProperty()
   description = db.StringProperty()
   photo = db.StringProperty()
   votes = db.StringProperty()

class MenuVote(db.Model):
   menu_item = db.ReferenceProperty(MenuItem)
   phone_id = db.StringProperty()

class VenueLocation(db.Model):
   venue = db.ReferenceProperty(Venue)
   photo = db.StringProperty()
   name = db.StringProperty(required=True)
   open_hours = db.StringProperty()
   phone = db.PhoneNumberProperty()
   address = db.PostalAddressProperty()

class VenueNews(db.Model):
   venue = db.ReferenceProperty(Venue)
   created_date = db.DateTimeProperty(required=True)
   title = db.StringProperty(required=True)
   content = db.StringProperty(required=True)
   iphone_exclusive = db.BooleanProperty()