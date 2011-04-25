# Device Infomation registration pages.
# -*- coding: utf-8 -*-

import os
from models import BodyCompost
from models import Pedometer
from models import UserInfo

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

import control
import api

class TopPage(webapp.RequestHandler):
    def get(self):

        user = users.get_current_user()

        if user:
            url = users.create_logout_url(self.request.uri)
            url_linktext = 'Logout'
        else:
            url = users.create_login_url(self.request.uri)
            url_linktext = 'Login'
            
        template_values = {
            "user" : user,
            "url" : url,
            "url_linktext" : url_linktext
            }
        path = os.path.join(os.path.dirname(__file__), 'template/index.html')
        self.response.out.write(template.render(path, template_values))


application = webapp.WSGIApplication([
        ('/listBodyCompost', control.ListBodyCompost),
        ('/listPedometer', control.ListPedometer),
        ('/registBodyCompost', control.RegistBodyCompost),
        ('/registPedometer', control.RegistPedometer),
        ('/api/bodyCompost/(.*)', api.DataBodyCompost),
        ('/api/pedometer/(.*)', api.DataPedometer),
        ('/', TopPage),
        ], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()
