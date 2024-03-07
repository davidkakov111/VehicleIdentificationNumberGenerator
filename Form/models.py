from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

class VIN(models.Model):
    EQUIPMENT_CODE_CHOICES = (
        ('000', 'Base platform'),
        ('014', 'Bumper'),
        ('037', 'Drum Mulcher'),
        ('036', 'Side Trimmer'),
        ('038', 'Sprayer'),
        ('027', 'Lawn Mower'),
    )
    PLACE_OF_PRODUCTION_CHOICES = (
        ('00', 'Slovenia'),
        ('01', 'Turkey'),
    )
    version = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(999)])
    equipment_code = models.CharField(max_length=3, choices=EQUIPMENT_CODE_CHOICES)
    year_of_issue = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(99)])
    serial_number = models.IntegerField(validators=[MinValueValidator(999999), MaxValueValidator(2000000)])
    place_of_production = models.CharField(max_length=2, choices=PLACE_OF_PRODUCTION_CHOICES)
