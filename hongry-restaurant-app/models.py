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

class RestaurantMenuItem(db.Model):
    parent_0 = db.IntegerProperty()
    parent_1 = db.IntegerProperty()
    name = db.StringProperty()

class RestaurantSpecial(db.Model):
    name = db.StringProperty()
    text = db.StringProperty()
    image = db.ReferenceProperty(RestaurantImage)

rest.Dispatcher.add_models({
  "restaurant_image": RestaurantImage,
  "restaurant": Restaurant,
  })

