from django.shortcuts import render

# Create your views from filters import DataPointFilter
from rest_framework import viewsets
from .models import DataPoint
from .serializers import DataPointSerializer
from django_filters import rest_framework as filters
from rest_framework.decorators import action
from .filters import DataPointFilter
from django.http import JsonResponse


class DataPointViewSet(viewsets.ModelViewSet):
    queryset = DataPoint.objects.all()
    serializer_class = DataPointSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = DataPointFilter
    search_fields = ['topic', 'sector', 'region', 'pestle', 'source', 'country', 'title'] 
    ordering_fields = '__all__'  
    ordering = ['-published']

    def get_serializer(self, *args, **kwargs):
        requested_fields = self.request.query_params.get('fields')
        if requested_fields:
            fields = requested_fields.split(',')
            data = kwargs.get('data', {})

            context = self.get_serializer_context()
            context['fields'] = fields

            kwargs['context'] = context
        return super().get_serializer(*args, **kwargs)

    @action(methods =['get'] ,detail=False)
    def home(self, request):
        return render(request, 'dashboard.html')
    

    @action(methods =['get'] ,detail=False)
    def visualization(self,request):
        return render(request, 'viz.html')


        