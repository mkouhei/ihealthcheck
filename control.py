# -*- coding: utf-8 -*-
import cgi
import os
import datetime
import time
from models import BodyCompost
from models import Pedometer
from models import UserInfo

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp.util import run_wsgi_app

class ListMeasurement(webapp.RequestHandler):
    def __init__(self):
        self.user = users.get_current_user()
        userinfo_query = UserInfo.all().filter('ownerid =',self.user)
        self.userinfo = userinfo_query.get()

        if self.userinfo is None:
            userinfo = UserInfo()
            userinfo.ownerid = self.user

        self.template_values = {
            'user' : self.user,
            'nickname' : self.user.nickname(),
            }

class ListBodyCompost(ListMeasurement):
    def __init__(self):
        ListMeasurement.__init__(self)
        
    def get(self):
        # Google Accountをキーに、体組成の一覧を表示する。
        body_compost_query = BodyCompost.all().order('-measure_datetime')
        body_composts = body_compost_query.filter('username =',str(self.user.nickname()))

        self.template_values['body_composts'] = body_composts
        path = os.path.join(os.path.dirname(__file__), 'template/body_compost_list.html')
        self.response.out.write(template.render(path, self.template_values))

class ListPedometer(ListMeasurement):
    def __init__(self):
        ListMeasurement.__init__(self)
        
    def get(self):
        # Google Accountをキーに、歩数計の一覧を表示する。
        listPedometer_query = Pedometer.all().order('-measure_datetime')
        listPedometers = listPedometer_query.filter('username =',str(self.user.nickname()))

        self.template_values['listPedometers'] = listPedometers
        path = os.path.join(os.path.dirname(__file__), 'template/pedometer_list.html')
        self.response.out.write(template.render(path, self.template_values))


class RegistBodyCompost(webapp.RequestHandler):

    def post(self):
        from datetime import datetime
        self.user = users.get_current_user()
        measure_datetime = cgi.escape(self.request.get('measure_datetime'),True)
        weight = cgi.escape(self.request.get('weight'),True)
        bmi = cgi.escape(self.request.get('bmi'),True)
        bodyfat_percentage = cgi.escape(self.request.get('bodyfat_percentage'),True)
        skeltal_mascle_percentage = cgi.escape(self.request.get('skeltal_mascle_percentage'),True)
        basal_metabolism = cgi.escape(self.request.get('basal_metabolism'),True)
        bodyfat_lv = cgi.escape(self.request.get('bodyfat_lv'),True)
        body_age = cgi.escape(self.request.get('body_age'),True)


        body_compost = BodyCompost()
        body_compost.username = str(self.user.nickname())
        body_compost.measure_datetime = datetime.strptime(measure_datetime, "%Y-%m-%dT%H:%MZ")
        body_compost.weight = float(weight)
        body_compost.bmi = float(bmi)
        body_compost.bodyfat_percentage = float(bodyfat_percentage)
        body_compost.skeltal_mascle_percentage = float(skeltal_mascle_percentage)
        body_compost.basal_metabolism = int(basal_metabolism,10)
        body_compost.bodyfat_lv = int(bodyfat_lv,10)
        body_compost.body_age = int(body_age,10)
        body_compost.put()
        
        self.redirect('/listBodyCompost')


class RegistPedometer(webapp.RequestHandler):

    def post(self):
        from datetime import datetime
        self.user = users.get_current_user()
        measure_datetime = cgi.escape(self.request.get('measure_datetime'),True)
        number_steps = cgi.escape(self.request.get('number_steps'),True)
        suff_steps = cgi.escape(self.request.get('suff_steps'),True)
        ex_steps = cgi.escape(self.request.get('ex_steps'),True)
        distance = cgi.escape(self.request.get('distance'),True)
        walk_mins = cgi.escape(self.request.get('walk_mins'),True)
        suff_mins = cgi.escape(self.request.get('suff_mins'),True)
        ex = cgi.escape(self.request.get('ex'),True)
        cal = cgi.escape(self.request.get('cal'),True)
        bodyfat_quantity = cgi.escape(self.request.get('bodyfat_quantity'),True)

        pedometer = Pedometer()
        pedometer.username = str(self.user.nickname())
        pedometer.measure_datetime = datetime.strptime(measure_datetime, "%Y-%m-%dT%H:%MZ")
        pedometer.number_steps = int(number_steps)
        pedometer.suff_steps = int(suff_steps)
        pedometer.ex_steps = int(ex_steps)
        pedometer.distance = float(distance)
        pedometer.walk_mins = int(walk_mins)
        pedometer.suff_mins = int(suff_mins)
        pedometer.ex = float(ex)
        pedometer.cal = int(cal)
        pedometer.bodyfat_quantity = float(bodyfat_quantity)
        pedometer.put()
        
        self.redirect('/listPedometer')
