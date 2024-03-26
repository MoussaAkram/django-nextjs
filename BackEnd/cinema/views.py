from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.db import models
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import serializers, status
from .models import User, Film, Reviews, Rating
from .serializers import UserSerializer, FilmSerializer, ReviewsSerializer, RatingSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def index(request):
    films = Film.objects.all()
    serializer = FilmSerializer(films, many= True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['Get'])
@permission_classes([AllowAny])
def oneUser(request, id):
    one_user = get_object_or_404(User, id = id)
    serializer = UserSerializer(one_user)
    return JsonResponse(serializer.data)

@api_view(['Get'])
@permission_classes([AllowAny])
def ALLUser(request):
    user = request.user
    return Response({
      'username' : user.username,
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def oneMovie(request,id):
    one_film = get_object_or_404(Film, imdbId=id)
    serializer = FilmSerializer(one_film)
    return JsonResponse(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def list_reviews(request):
    reviews = Reviews.objects.all()
    serializer = ReviewsSerializer(reviews, many=True)
    return JsonResponse(serializer.data, safe=False)
    
@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def created_review(request, film_id):
    if request.method == "POST":
        try:
            data = request.data.copy()
        except :
            data = {}
        
        film = get_object_or_404(Film, imdbId=film_id)
        
        if request.user.is_authenticated:
            data['user'] = request.user.id
        else:
            return JsonResponse({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        data['film'] = film_id
        serializer = ReviewsSerializer(data=data)
        if serializer.is_valid():
            review_obj = serializer.save()

            film.reviewIds.add(review_obj)

            return JsonResponse({'message': 'data created', 'body': serializer.data}, status=status.HTTP_201_CREATED)
        return JsonResponse({'message': 'bad request', 'body': serializer.data}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def login_view(request):
    if request.method == "POST":
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return JsonResponse({'message': 'Login successful', 'user': serializer.data})
        else:
            return JsonResponse({'message': 'Invalid username and/or password'}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})


@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def register(request):
    if request.method == "POST":
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")
        confirmation = request.data.get("confirmation")

        if password != confirmation:
            return JsonResponse({'message': 'Passwords must match'}, status=400)

        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            login(request, user)
            serializer = UserSerializer(user)
            return JsonResponse({'message': 'User created successfully', 'user': serializer.data})
        except IntegrityError:
            return JsonResponse({'message': 'Username already taken'}, status=400)
    else : 
        return JsonResponse({'message': 'Failed to register user'}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
@csrf_protect
def get_csrf(request):
    csrf_token = get_token(request)
    response = JsonResponse({'csrftoken': csrf_token})
    return response

@api_view(['POST'])
@permission_classes([AllowAny])
def watch_list(request, watch_id):
    if request.user.is_authenticated:
        film_watch = get_object_or_404(Film, imdbId=watch_id)
        
        if request.user in film_watch.watch_list.all():
            film_watch.watch_list.remove(request.user)
        else:
            film_watch.watch_list.add(request.user)

        return JsonResponse({"message": "Action successful"})
    else:
        return JsonResponse({"message": "User not authenticated"}, status=401)


@api_view(['GET'])
@permission_classes([AllowAny])
def favored(request):
    favored_films = request.user.favored.all()
    serializer = FilmSerializer(favored_films, many=True)
    return JsonResponse(serializer.data, safe=False)



@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def created_rate(request, film_id):
    if request.method == "POST":
        try:
            data = request.data.copy()
        except:
            data = {}
        
        if request.user.is_authenticated:
            user_id = request.user.id
            existing_rating = Rating.objects.filter(user=user_id, film_rate=film_id).first()
            if existing_rating:
                serializer = RatingSerializer(existing_rating, data=data)
            else:
                data['user'] = user_id
                data['film_rate'] = film_id
                serializer = RatingSerializer(data=data)
        else:
            return JsonResponse({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'data created', 'rate': serializer.data}, status=status.HTTP_201_CREATED)
        return JsonResponse({'message': 'bad request', 'rate': serializer.data}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['GET'])
@permission_classes([AllowAny])
def rating_film(request, film_id):
    
    try:
        ratings_user = Rating.objects.filter(film_rate=film_id, user=request.user)

        users_ratings = []

        for rating in ratings_user:
            user_rating = {
                'user_id': rating.user.id,
                'rating': rating.rate
            }
            users_ratings.append(user_rating)
    except IntegrityError:
            return JsonResponse({'message': 'something wrong with ratings'}, status=400)
    ratings = Rating.objects.filter(film_rate=film_id).values('rate').annotate(count=models.Count('rate'))

    weighted_sum = 0
    total_users = sum([rating['count'] for rating in ratings])

    for rating in ratings:
        weighted_sum += rating['rate'] * rating['count']

    if total_users == 0:
        average_rating = 0
    else:
        average_rating = weighted_sum / total_users
        average_rating = round(average_rating, 2)

    return Response({"total_users": total_users, "average_rating": average_rating, "ratings": users_ratings})






