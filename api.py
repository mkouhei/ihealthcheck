# -*- coding: utf-8 -*-
import json
import cgi
import logging
from models import BodyCompost
from models import Pedometer
from google.appengine.ext import webapp
from google.appengine.ext import db
from google.appengine.api import memcache

class DataApi(webapp.RequestHandler):
    def __init__(self):
        key = ""

    def get(self, user):
        user = cgi.escape(user,True)
        json_data = self.getJson(user)
        stats = memcache.get_stats()
        self.response.headers['Content-Type']='application/json'
        self.response.out.write(json.encode(json_data))
        
    def getJson(self, user):
        json_data = memcache.get(self.key)
        if json_data is not None:
            return json_data
        else:
            json_data = self.renderJson(user)
            if not memcache.add(self.key, json_data, 10):
                loggin.error("Memcache set failed.")
            return json_data


class DataBodyCompost(DataApi):
    def __init__(self):
        DataApi.__init__(self)
        self.key = "bodyCompost"

    def renderJson(self,user):
        results = BodyCompost.all().filter('username = ', user).order('measure_datetime')
        return results


class DataPedometer(DataApi):
    def __init__(self):
        DataApi.__init__(self)
        self.key = "pedometer"


    def renderJson(self, user):
        results = Pedometer.all().filter('username = ', user).order('measure_datetime')
        return results


