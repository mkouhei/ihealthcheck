# -*- coding: utf-8 -*-
# myhealth.models

from google.appengine.ext import db

class UserInfo(db.Model):
    ownerid = db.UserProperty()

class Measurement(db.Model):
    username = db.StringProperty()
    measure_datetime = db.DateTimeProperty()
    
class BodyCompost(Measurement):
    weight = db.FloatProperty()
    bmi = db.FloatProperty()
    bodyfat_percentage = db.FloatProperty()
    skeltal_mascle_percentage = db.FloatProperty()
    basal_metabolism = db.IntegerProperty()
    bodyfat_lv = db.IntegerProperty()
    body_age = db.IntegerProperty()

class Pedometer(Measurement):
    number_steps = db.IntegerProperty()
    suff_steps = db.IntegerProperty()
    ex_steps = db.IntegerProperty()
    distance = db.FloatProperty()
    walk_mins = db.IntegerProperty()
    suff_mins = db.IntegerProperty()
    ex = db.FloatProperty()
    cal = db.IntegerProperty()
    bodyfat_quantity = db.FloatProperty()
    
