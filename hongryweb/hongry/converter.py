from xml.etree.ElementTree import Element, SubElement, tostring
import datetime
import time
from xml.etree.ElementTree import Element, SubElement, tostring
from google.appengine.ext import db

def is_scalar(v):
    return isinstance(v,basestring) or isinstance(v,float) \
        or isinstance(v,int) or isinstance(v,bool)

def add_value_to_xml(root,v):
    if type(v) == type({}):
        for k,kv in v.iteritems():
            vx = SubElement(root,unicode(k))
            vx = add_value_to_xml(vx,kv)
    elif type(v) == list:
        root.set('type','list')
        for e in v:
            li = SubElement(root,root.tag)
            li = add_value_to_xml(li,e)
            li.set('type','item')
    elif is_scalar(v):
        root.text = unicode(v)
    else:
        raise Exception("add_value_to_xml: unsuppoted type (%s)"%type(v))
    return root

def dict_to_xml(d,root='dict'):
    x = Element(root)
    x = add_value_to_xml(x,d)
    return x

SIMPLE_TYPES = (int, long, float, bool, dict, basestring, list)

def to_dict(model):
    output = {}

    for key, prop in model.properties().iteritems():
        value = getattr(model, key)

        if value is None or isinstance(value, SIMPLE_TYPES):
            output[key] = value
        elif isinstance(value, datetime.date):
            # Convert date/datetime to ms-since-epoch ("new Date()").
            ms = time.mktime(value.utctimetuple()) * 1000
            ms += getattr(value, 'microseconds', 0) / 1000
            output[key] = int(ms)
        elif isinstance(value, db.Model):
            output[key] = to_dict(value)
        else:
            raise ValueError('cannot encode ' + repr(prop))

    return output

def convert_model_to_xml(model,root='root'):
        return tostring(dict_to_xml(to_dict(model),root))