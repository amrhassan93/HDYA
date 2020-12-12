from .models import * #Product , Category , Occassion , RelationShip 
from rest_framework import serializers
from authentication.models import Profile
from django.utils import timezone


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class CategorySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'



class OccassionSerializer(serializers.HyperlinkedModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    class Meta:
        model = Occassion
        fields = '__all__'

class RelationShipSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RelationShip
        fields = '__all__'


# class ProductOccassionSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = ProductOccassion
#         fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):

    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    user_id = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())

    category_name =  serializers.CharField(source = "category_id.title" , read_only=True)
    user_name =  serializers.CharField(source = "user_id.user.username" , read_only=True)

    # occassions_name = serializers.CharField(source ='occassions')

    occassions = serializers.SlugRelatedField(
    many=True,
    read_only=True,
    slug_field='name'
    )
    relationships = serializers.SlugRelatedField(
    many=True,
    read_only=True,
    slug_field='name'
    )

    # occassion_id = serializers.PrimaryKeyRelatedField(queryset=Occassion.objects.all())
    # relationship_id = serializers.PrimaryKeyRelatedField(queryset=RelationShip.objects.all())
    # category_name = serializers.CharField(source=category_id.field_name)
    
    # relations =RelationShipSerializer(many = True , read_only = True )
    
    # relations = serializers.ListField(source = "relationships.name")
    # occassions_name = serializers.ReadOnlyField(source = "occassions")

    # occassions_name = serializers.ReadOnlyField(source ='occassions' , many)
    # occassions_name = OccassionSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('is_featured',)
       
class ProductPictureSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductPicture
        fields = '__all__'


class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class RateSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rate
        fields = '__all__'

class ProductReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ProductReport
        fields = '__all__'


class ReviewReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ReviewReport
        fields = '__all__'