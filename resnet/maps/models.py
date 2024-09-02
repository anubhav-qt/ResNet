from django.db import models

class Shelter(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    address = models.CharField(max_length=255, blank=True, null=True)
    availability = models.BooleanField(default=True)
    type = models.CharField(max_length=50)  # e.g., 'Hotel', 'Airbnb', 'Community Shelter'
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return self.name