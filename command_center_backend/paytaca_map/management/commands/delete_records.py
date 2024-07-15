from django.core.management.base import BaseCommand
from paytaca_map.models import Merchant, Location, Category, Vault, Logo

class Command(BaseCommand):
    help = 'Erases all existing records'

    def handle(self, *args, **kwargs):
        # Delete all objects in each model
        Merchant.objects.all().delete()
        Category.objects.all().delete()
        Location.objects.all().delete()
        Vault.objects.all().delete()
        Logo.objects.all().delete()