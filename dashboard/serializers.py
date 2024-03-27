# serializers.py
from rest_framework import serializers
from .models import DataPoint

class DataPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataPoint
        fields = '__all__'
       
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        requested_fields = self.context.get('fields')
        if requested_fields:
            representation = {k: v for k, v in representation.items() if k in requested_fields}
        return representation