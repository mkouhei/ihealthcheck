# -*- coding: utf-8 -*-
import json
import cgi
from models import BodyCompost
from models import Pedometer
from google.appengine.ext import webapp
from google.appengine.ext import db

class DataBodyCompost(webapp.RequestHandler):

    def get(self, user):
        user = cgi.escape(user,True)
        body_compost_query = BodyCompost.all().filter('username = ', user).order('measure_datetime')
        self.response.headers['Content-Type']='application/json'
        self.response.out.write(json.encode(body_compost_query))

class DataPedometer(webapp.RequestHandler):

    def get(self, user):
        user = cgi.escape(user,True)
        pedometer_query = Pedometer.all().filter('username = ', user).order('measure_datetime')
        self.response.headers['Content-Type']='application/json'
        self.response.out.write(json.encode(pedometer_query))

