# Generated by Django 5.0.7 on 2024-08-21 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='VerificationCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=6, verbose_name='Code')),
                ('key', models.CharField(blank=True, max_length=40, verbose_name='Key')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='The time it was created')),
            ],
            options={
                'ordering': ['-created', 'user'],
            },
        ),
    ]
