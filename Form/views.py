# Import necessary modules
from django.shortcuts import render
from .forms import VINForm
from rest_framework import viewsets, mixins
from rest_framework.response import Response
from .models import VIN
from .serializers import VINSearchSerializer, VINSerializer

# Render the VIN form template
def VIN_form(request):
    return render(request, 'VIN_Form.html', {'form': VINForm()})

# API View for searching available serial number
class VINSearchView(viewsets.ViewSet):
    def create(self, request):
        # Deserialize request data using the VINSearchSerializer
        serializer = VINSearchSerializer(data=request.data)
        if serializer.is_valid():
            # Retrieve data from serializer
            version = serializer.validated_data.get('version')
            equipment_code = serializer.validated_data.get('equipment_code')
            year_of_issue = serializer.validated_data.get('year_of_issue')
            place_of_production = serializer.validated_data.get('place_of_production')

            # Query matching VIN records
            matching_records = VIN.objects.filter(
                version=version,
                equipment_code=equipment_code,
                year_of_issue=year_of_issue,
                place_of_production=place_of_production
            )
            # Calculate serial number
            serial_number = 1000000
            for serial_num in matching_records:
                if serial_num.serial_number == serial_number:
                    serial_number += 1
                else:
                    break

            return Response({"serial_number": serial_number}, status=200)
        return Response(serializer.errors, status=400)

# API View for saving VIN numbers
class VINSaveView(viewsets.ViewSet):
    def create(self, request):
        # Deserialize request data using the VINSerializer
        serializer = VINSerializer(data=request.data)

        if serializer.is_valid():
            # Retrieve data from serializer
            version = serializer.validated_data.get('version')
            equipment_code = serializer.validated_data.get('equipment_code')
            year_of_issue = serializer.validated_data.get('year_of_issue')
            serial_number = serializer.validated_data.get('serial_number')
            place_of_production = serializer.validated_data.get('place_of_production')

            # Query matching VIN records
            matching_records = VIN.objects.filter(
                version=version,
                equipment_code=equipment_code,
                year_of_issue=year_of_issue,
                serial_number=serial_number,
                place_of_production=place_of_production
            )
            # Check if VIN number is unique
            if len(matching_records) == 0:
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response("The VIN number isn't unique. Please use the Search button before pressing the Add button!", status=400)
        else:
            return Response("The form isn't valid!", status=400)

# API View for retrieving all VIN numbers
class VINNumberView(viewsets.ModelViewSet):
    queryset = VIN.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        vins = []

        for record in queryset:
            # Format version and year of issue
            version_str = str(record.version).zfill(3)
            year_of_issue_str = str(record.year_of_issue).zfill(2)
            # Construct VIN number string
            vin = f'{version_str}{record.equipment_code}{year_of_issue_str}{record.serial_number}{record.place_of_production}'
            vins.append(vin)

        return Response(vins)
    