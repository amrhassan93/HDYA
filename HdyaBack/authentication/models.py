from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    mobile_number= models.IntegerField(null=True)
    avatar= models.ImageField(null=True , upload_to='static/user/images/')
    adress= models.CharField(max_length=200 , null=True)
    birth_date= models.DateField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(null=True)

    def __str__(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


# create database hdya_app;