from rest_framework import serializers
from .models import User,Film,Reviews,Rating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ReviewsSerializer(serializers.ModelSerializer):
    dateCreated = serializers.DateTimeField(format='%b %d %Y, %I:%M %p', read_only=True)
    class Meta:
        model = Reviews
        fields = ['id', 'user', 'body', 'dateCreated']

class FilmSerializer(serializers.ModelSerializer):
    reviewIds = ReviewsSerializer(many=True, read_only=True)
    class Meta:
        model = Film
        fields = ['id','imdbId','title','releaseDate','trailerLink','genres','poster','backdrops','reviewIds', 'watch_list']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'