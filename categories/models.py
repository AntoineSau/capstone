import imghdr
from tkinter import CASCADE
from unicodedata import category
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

    def __str__(self):
        return f"User Name: {self.username}. User ID number: {self.id}."

class Category(models.Model):
    categoryname = models.CharField(max_length=64)

    def __str__(self):
        return f"Category nº '{self.id}' is '{self.categoryname}'"

class Letter(models.Model):
    letter = models.CharField(max_length=1)

    def __str__(self):
        return f"{self.id} - {self.letter}"

class Answer(models.Model):
    letter_played = models.ForeignKey(Letter, on_delete=models.CASCADE, related_name="letter_used")
    category_played = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="category_used")
    answer = models.CharField(max_length=64)

    def __str__(self):
        return f"({self.id}) '{self.category_played.categoryname}' with '{self.letter_played.letter}' -> {self.answer}"

class Test2(models.Model):
    entry = models.CharField(max_length=64)
    letter = models.CharField(max_length=64)
    category = models.CharField(max_length=64)

    def __str__(self):
        return f"'{self.category}' with letter '{self.letter}' -> {self.entry}"

class Possible_result(models.Model):
    outcome = models.CharField(max_length=7)

    def __str__(self):
        return f"Potential result nº'{self.id}' is '{self.outcome}'"

