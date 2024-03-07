from rest_framework import serializers
from .models import VIN

class VINSerializer(serializers.ModelSerializer):
    class Meta:
        model = VIN
        fields = '__all__'

class VINSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = VIN
        fields = ['version', 'equipment_code', 'year_of_issue', 'place_of_production']
        