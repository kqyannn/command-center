# Generated by Django 5.0.6 on 2024-07-25 13:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mqtt_listener', '0007_delete_wallet_test'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='country',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='wallet',
            name='currency',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='wallet',
            name='language',
            field=models.CharField(max_length=200, null=True),
        ),
    ]