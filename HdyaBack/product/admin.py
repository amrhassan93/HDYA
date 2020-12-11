from django.contrib import admin
from product.models import Product , Category , RelationShip , Occassion , ProductPicture
# Register your models here.
admin.site.register(ProductPicture)
admin.site.register(RelationShip)
admin.site.register(Occassion)
admin.site.register(Category)
admin.site.register(Product)