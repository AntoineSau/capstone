from django.urls import path

from . import views

urlpatterns = [ 
	path("", views.index, name="index"),
	path("logout", views.logout_view, name="logout"),
	path("login", views.login_view, name="login"),
	path("register", views.register, name="register"),
	path("botgame", views.botgame, name="botgame"),

	# API Routes
	path("update", views.update, name="update"),

]