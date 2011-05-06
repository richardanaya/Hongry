#!/usr/bin/env python

######################################
# THIS SHOULD NOT HAVE TO BE MODIFIED#
######################################

if __name__ == '__main__':
    import sys
    import subprocess
    import os
    #import wsgiref.hddandlers
    from google.appengine.ext import webapp
    from google.appengine.ext.webapp.util import run_wsgi_app
    import rest
    sys.path.insert(0, 'lib.zip')
    import cherrypy
    import website
    current_dir = os.path.dirname(os.path.abspath(__file__))
    config={
        'global':{
                'server.socket_port': 8888},
        '/css': {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': os.path.join(current_dir,"css") },
        '/img': {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': os.path.join(current_dir,"img") },
        '/js': {
                'tools.staticdir.on': True,
                'tools.staticdir.dir': os.path.join(current_dir,"js") },
        }
    app = cherrypy.tree.mount(website.Root(), "/",config)
    run_wsgi_app(app)
    
    
    rest_app = webapp.WSGIApplication([('/rest/.*', rest.Dispatcher)])
    rest.Dispatcher.base_url = "/rest"
    #run_wsgi_app(rest_app)
