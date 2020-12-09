from django.db import models
from django.utils import timezone
from authentication.models import Profile
# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=50,null = True)

    def _str_(self):
        return self.title

class Product(models.Model):
    name = models.CharField(max_length=45)
    details = models.TextField(max_length=3000)
    price = models.IntegerField()
    age = models.CharField(
        null=True,
        max_length=50 ,
        choices=[
            ('1' , '0-3'),
            ('2' , '3-7'),
            ('3' , '7-12'),
            ('4' , '12-18'),
            ('5' , '18-25'),
            ('6' , '25-35'),
            ('7' , '35-45'),
            ('8' , '45-55'),
            ('9' , '60+'),
        ])
    gender = models.CharField(
        null=True,
        max_length=50 ,
        choices=[
            ('m' , 'Mail'),
            ('f' , 'femail')
        ])
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    
    def _str_(self):
        return self.name


class ProductPicture(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)   
    img_url = models.ImageField(upload_to='static/products/images/' , verbose_name='Image')


class Occassion(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)   
    name = models.CharField(max_length=50)

    def _str_(self):
        return self.name

class RelationShip(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)   
    name = models.CharField(max_length=50)

    def _str_(self):
        return self.name


class Review(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)   
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=1000)


class Rate(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)   
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    rate = models.CharField(
            null=True,
            max_length=50 ,
            choices=[
                ('1' , '1'),
                ('2' , '2'),
                ('3' , '3'),
                ('4' , '4'),
                ('5' , '5'),
            ])


class ProductReport(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)   
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=200)

class ReviewReport(models.Model):
    review_id = models.ForeignKey(Review, on_delete=models.CASCADE, null=True)   
    user_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=200)