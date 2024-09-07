from django.shortcuts import render
import requests
from django.http import JsonResponse
from django.conf import settings

def homePage(request):
    return render(request, 'index.html')

def get_nearby_shelters(request):
    lat = request.GET.get('lat')
    lng = request.GET.get('lng')
    api_key = settings.GOOGLE_API_KEY
    query = 'emergency+shelter+OR+disaster+relief+OR+evacuation+center+OR+community+center'
    radius = 10000

    url = f'https://maps.googleapis.com/maps/api/place/textsearch/json?query={query}&location={lat},{lng}&radius={radius}&key={api_key}'
    response = requests.get(url)
    return JsonResponse(response.json())

def get_nearby_accommodations(request):
    user_lat = request.GET.get('lat')
    user_long = request.GET.get('long')

    endpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    params = {
        'location': f'{user_lat},{user_long}',
        'radius': 10000,
        'type': 'lodging',
        'key': settings.GOOGLE_API_KEY,
    }

    response = requests.get(endpoint, params=params)
    data = response.json()

    # Ensure the response data has 'lat' and 'lng' properties
    for result in data.get('results', []):
        location = result.get('geometry', {}).get('location', {})
        location['lng'] = location.pop('long', location.get('lng'))

    return JsonResponse(data)
