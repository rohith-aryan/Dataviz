# yourapp/urls.py

from django.urls import path, include
from rest_framework import routers
from .views import DataPointViewSet

# Create a router and register the DataPointViewSet
router = routers.DefaultRouter()
router.register(r'', DataPointViewSet, basename='datapoint')

# Wire up our API using automatic URL routing
# Additionally, include login URLs for the browsable API
urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
