# Generated by Django 5.0.3 on 2024-03-07 08:10

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Form', '0004_alter_vin_serial_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vin',
            name='serial_number',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(999999), django.core.validators.MaxValueValidator(2000000)]),
        ),
    ]
