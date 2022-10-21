from django.contrib import admin
from .models import User, Category, Letter, Answer, Test2, Possible_result

# Register your models here.
admin.site.register(User)
admin.site.register(Category)
admin.site.register(Letter)
admin.site.register(Answer)
admin.site.register(Test2)
admin.site.register(Possible_result)
