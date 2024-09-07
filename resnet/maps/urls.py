from django.urls import path
from .views import *

urlpatterns = [
    path('', homePage, name='index'),
    path('api/nearby-accommodations/', get_nearby_accommodations, name='nearby-accommodations'),
    path('api/nearby-shelters/', get_nearby_shelters, name='nearby-shelters'),
]