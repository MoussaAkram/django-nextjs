from django.urls import path

from . import views

urlpatterns = [
    path("movies", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("getOneUser/<str:id>",views.oneUser, name="oneUser"),
    path("getUser",views.ALLUser, name="AllUser"),
    path("get/<str:id>",views.oneMovie, name="oneMovie"),
    path("reviews",views.list_reviews,name="listOfReviews"),
    path("post/<str:film_id>",views.created_review, name="createdReview"),
    path("csrf", views.get_csrf, name="csrftoken"),
    path("<str:watch_id>/watch_list", views.watch_list, name= "watchList"),
    path("watch_list", views.favored, name = "watch_list"),
    path("rating_film/<str:film_id>", views.rating_film, name = "ratingFilm"),
    path("created_rate/<str:film_id>", views.created_rate, name = "createdRate"),
]