from django.contrib import admin

# Register your models here.
# admin.py

from .models import DataPoint

@admin.register(DataPoint)
class DataPointAdmin(admin.ModelAdmin):
    list_display = ('title', 'sector', 'country', 'published', 'source')  # Customize the displayed fields
    list_filter = ['country', 'region']
    search_fields = ['country', 'city', 'topics']
