from django.urls import path

from . import views

urlpatterns = [ 
	path("", views.index, name="index"),
	 path("logout", views.logout_view, name="logout"),

	# API Routes
	path("update", views.update, name="update"),

]