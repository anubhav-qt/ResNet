# ResNet

ResNet Disaster Response Website
ResNet is a web application designed to provide crucial disaster response information and resources to those affected by natural disasters. The platform offers real-time location-based shelter information, including nearby hotels, Airbnbs, and shelters, to ensure users can find safe accommodation quickly.

Features:
Shelter Locator: A real-time map feature that helps users find nearby shelters, hotels, and Airbnbs during emergencies.
Location-Based Search: Users can easily search for safe locations by allowing access to their device’s current location.
Emergency Information: Provides essential disaster response information to keep users informed and prepared.

Technologies Used:
Backend: Django
Frontend: HTML, CSS, JavaScript
Mapping: Google Maps API
Database: SQLite (default with Django)

Installation:
Prerequisites:
Python 3.x
Django 4.x
Google Maps API Key

Steps to Install:
Clone the Repository:

git clone https://github.com/yourusername/resnet.git
cd resnet

Create a Virtual Environment:
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

Install Required Packages:
pip install -r requirements.txt

Set Up the Database:
python manage.py migrate

Create a Superuser (Optional but recommended for admin access):
python manage.py createsuperuser

Add Google Maps API Key:
Go to resnet/settings.py and add your Google Maps API key:
GOOGLE_MAPS_API_KEY = 'your_api_key_here'

Run the Development Server:
python manage.py runserver

Access the Website: Open your web browser and go to http://127.0.0.1:8000.

Usage:
Allow Location Access: When prompted by the browser, allow the website to access your current location.
Search for Shelters: Click on the "Get Shelters" button to view nearby available shelters, hotels, and Airbnbs.
Navigate: Use the map interface to explore and navigate to the nearest safe location.

Contribution:
We welcome contributions! Please follow these steps:
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.
