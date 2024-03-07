# Generated by Django 5.0.3 on 2024-03-06 19:50

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Form', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vin',
            name='equipment_code',
            field=models.CharField(choices=[('000', 'Base platform'), ('014', 'Bumper'), ('037', 'Drum Mulcher'), ('036', 'Side Trimmer'), ('038', 'Sprayer'), ('027', 'Lawn Mower')], max_length=3),
        ),
        migrations.AlterField(
            model_name='vin',
            name='serial_number',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1000000), django.core.validators.MaxValueValidator(1999999)]),
        ),
        migrations.AlterField(
            model_name='vin',
            name='version',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(999)]),
        ),
        migrations.AlterField(
            model_name='vin',
            name='year_of_issue',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(99)]),
        ),
    ]