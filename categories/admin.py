from django.contrib import admin
from .models import Category, Letter, Answer

# Register your models here.
admin.site.register(Category)
admin.site.register(Letter)
admin.site.register(Answer)