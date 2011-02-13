import cherrypy
import wsgiref.handlers
from jinja2 import Environment, FileSystemLoader, TemplateNotFound
import os

template_dirs = []
template_dirs.append(os.path.join(os.path.dirname(__file__), 'templates'))

def get_template(name):
    env = Environment(loader = FileSystemLoader(template_dirs))
    try:
        return env.get_template(name)
    except TemplateNotFound:
        raise TemplateNotFound(name)

class BountyHacker(object):
    @cherrypy.expose
    def index(self):
        return get_template('index.html').render()


#---------------------------------------------------------------------------
# Start the server under Google AppEngine
#---------------------------------------------------------------------------
app = cherrypy.tree.mount(BountyHacker(), "/")
wsgiref.handlers.CGIHandler().run(app)