from cgi import test
import json
from unicodedata import category
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from categories.models import Answer, Category, Letter, Test2

# Create your views here.
def index(request):
	return render(request, "categories/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "categories/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "categories/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def test(request):
	return render(request, "categories/test.html")

@csrf_exempt
def update(request):
	# TO DO

	if request.method != "POST":
		return JsonResponse({"error": "POST request required."}, status=400)

	else:
		# TEST only with answer
		data = json.loads(request.body)
		
		answer = data.get("answer", "")
		category = data.get("category", "")
		category = Category.objects.get(categoryname=category)
		
		letter = data.get("letter", "")
		letter = Letter.objects.get(letter=letter)

		# Convert answer to Capitalized format for better visibility and avoid duplciate of same words but differnet cpitaliztion
		answerok = answer.capitalize()

		newanswer = Answer(
			answer=answerok,
			category_played=category,
			letter_played=letter
        )

		# Avoid storing twice the samse answer
		does_answer_already_exist = Answer.objects.filter(answer=answerok).count()
		if (does_answer_already_exist == 0):
			# Saving this answer if it is unique
			newanswer.save()
        
			return JsonResponse({"message": "answer saved."}, status=201)

		else:
			return JsonResponse({"message": "answer not saved in database because it already exits"}, status=201)

		
