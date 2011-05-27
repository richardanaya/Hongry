#Domain models go here
from google.appengine.ext import db
import rest

class RestaurantImage(db.Model):
    image_data = db.StringProperty()


class Restaurant(db.Model):
    name = db.StringProperty()
    image_background = db.ReferenceProperty(RestaurantImage,collection_name="restaurant_image_background_reference")
    image_logo = db.ReferenceProperty(RestaurantImage,collection_name="restaurant_image_logo_reference")
    announcement_0 = db.StringProperty()
    announcement_1 = db.StringProperty()
    our_story = db.StringProperty()
    map_link = db.StringProperty()
    specials_name = db.StringListProperty()
    specials_text = db.StringListProperty()
    menuitem_parent_0 = db.StringListProperty()
    menuitem_parent_1 = db.StringListProperty()
    menuitem_id = db.StringListProperty()
    menuitem_name = db.StringListProperty()
    menuitem_description = db.StringListProperty()
    menuitem_votes = db.StringListProperty()
    menuitem_price = db.StringListProperty()

rest.Dispatcher.add_models({
  "restaurant_image": RestaurantImage,
  "restaurant": Restaurant,
  })

