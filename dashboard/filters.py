from django_filters import rest_framework as filters
from .models import *
class DataPointFilter(filters.FilterSet):
    class Meta:
        model = DataPoint
        fields = {
            'end_year': ['exact'],
            'topic': ['exact', 'in'],
            'sector': ['exact', 'in'],
            'region': ['exact', 'in'],
            'pestle': ['exact', 'in'],
            'source': ['exact', 'in'],
            'country': ['exact'],
            'intensity': ['exact', 'in'],
            # Add more fields as needed
        }