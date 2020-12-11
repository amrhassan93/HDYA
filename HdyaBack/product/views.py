from django.shortcuts import render
from rest_framework import viewsets , generics
from .serializers import ProductSerializer
from .models import Product

# Create your views here.

# class Products(generics.ListCreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer



class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer