from django.contrib import admin
from .models import Category, Letter, Answer, Test

# Register your models here.
admin.site.register(Category)
admin.site.register(Letter)
admin.site.register(Answer)
admin.site.register(Test)