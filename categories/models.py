from tkinter import CASCADE
from django.db import models

# Create your models here.
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
        return f"'{self.category_played.categoryname}' with '{self.letter_played.letter}' -> {self.answer}"

class Test2(models.Model):
    entry = models.CharField(max_length=64)
    letter = models.CharField(max_length=64)
    category = models.CharField(max_length=64)

    def __str__(self):
        return f"'{self.category}' with letter '{self.letter}' -> {self.entry}"