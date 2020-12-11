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
    class Meta:
        model = Occassion
        fields = '__all__'

class RelationShipSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RelationShip
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # category_id = CategorySerializer()
    # category_id = serializers.CharField(source="category.title")
    # category_id = serializers.CharField()
    # user_id = ProfileSerializer()
    # user_id = serializers.CharField(source="profile.user.username")
    
    # occassion_id = OccassionSerializer()
    # occassion_id = serializers.CharField(source="occassion.name")

    # relationship_id = RelationShipSerializer()
    # relationship_id = serializers.CharField(source="relationship.name")
    
    # categories = CategorySerializer( many=True , read_only=True, required = False )
    # users = ProfileSerializer( many=True , read_only=True , required = False)
    # occassions = OccassionSerializer( many=True , read_only=True , required = False)
    # relationships = RelationShipSerializer( many=True , read_only=True , required = False)

    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    user_id = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())
    occassion_id = serializers.PrimaryKeyRelatedField(queryset=Occassion.objects.all())
    relationship_id = serializers.PrimaryKeyRelatedField(queryset=RelationShip.objects.all())


    class Meta:
        model = Product
        fields = '__all__'
        # fields = (
        #     'id',
        #     'name',
        #     'details',
        #     'price',
        #     'age',
        #     'gender',
        #     'category_id',
        #     'user_id',
        #     'occassion_id',
        #     'relationship_id',
        #     'created_at',
        #     'updated_at',
        #     # 'categories',
        #     # 'users',
        #     # 'occassions',
        #     # 'relationships'
        # ) 


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