from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email= models.EmailField(unique=True)


class Film(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    imdbId = models.TextField()
    title = models.TextField()
    releaseDate = models.TextField()
    trailerLink = models.TextField()
    genres = ArrayField(models.TextField(), blank=True, null=True)
    poster = models.TextField()
    backdrops = ArrayField(models.TextField(), blank=True, null=True)
    reviewIds = models.ManyToManyField("Reviews", related_name='reviewId')
    watch_list = models.ManyToManyField("User", blank = True, related_name= "favored")

class Reviews(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="emails")
    body = models.TextField()
    dateCreated = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-dateCreated']

class Rating(models.Model):
    user = models.ForeignKey("User" , on_delete = models.CASCADE , blank = True, related_name = "user_rate")
    rate = models.DecimalField(max_digits=2, decimal_places=1, default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    film_rate = models.ForeignKey("Film", on_delete = models.CASCADE, blank = True , related_name = "film_rates")

