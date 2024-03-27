import json
from django.core.management.base import BaseCommand
from dashboard.models import DataPoint

class Command(BaseCommand):
    help = 'Populate data from JSON file into the database'

    def handle(self, *args, **kwargs):
        with open("dashboard/jsondata.json", 'r', encoding='utf-8') as file:
            json_data = json.load(file)

        instances = [DataPoint(**item) for item in json_data]
        DataPoint.objects.bulk_create(instances)

        self.stdout.write(self.style.SUCCESS('Data populated successfully'))
