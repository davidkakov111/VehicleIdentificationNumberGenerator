from django.contrib import admin
from django.urls import path, include
from Form.views import VIN_form, VINSearchView, VINSaveView, VINNumberView
from rest_framework.routers import DefaultRouter

# Create a router and register api view with it.
router = DefaultRouter()
router.register(r'VINSearch', VINSearchView, basename='vinSearch')
router.register(r'VINSave', VINSaveView, basename='vinSave')
router.register(r'VINGet', VINNumberView, basename='vinGet')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', VIN_form, name='VIN_form'),
    path('', include(router.urls)),
]
