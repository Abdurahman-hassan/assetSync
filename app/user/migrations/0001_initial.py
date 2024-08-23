# Generated by Django 5.0.7 on 2024-08-21 03:57

import app.user.managers
import django.contrib.auth.validators
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('name', models.CharField(max_length=90, verbose_name='Name of User')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Email Address')),
                ('email_verified', models.BooleanField(default=False, verbose_name='Email Verified')),
                ('avatar', models.ImageField(default='avatar.svg', upload_to='avatar/', verbose_name='Avatar')),
                ('department', models.CharField(blank=True, choices=[('engineering', 'Engineering'), ('sales', 'Sales'), ('hr', 'HR'), ('business', 'Business')], max_length=50, null=True)),
                ('team', models.CharField(blank=True, max_length=255, null=True)),
                ('role', models.CharField(blank=True, max_length=50, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'ordering': ['-email'],
                'indexes': [models.Index(fields=['email'], name='user_user_email_5f6a77_idx')],
            },
            managers=[
                ('objects', app.user.managers.UserManager()),
            ],
        ),
    ]
