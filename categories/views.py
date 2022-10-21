from cgi import test
import json
from unicodedata import category
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import JsonResponse
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt


from categories.models import Answer, Category, Letter, Test2, User, Possible_result

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

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "categories/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "categories/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "categories/register.html")

def test(request):
	return render(request, "categories/test.html")

@csrf_exempt
def update(request):

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

		# Convert answer to Capitalized format for better visibility and avoid duplicate of same words but differnet cpitaliztion
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
        
			return JsonResponse({"message": "answer saved","details":answerok}, status=201)

		else:
			return JsonResponse({"message": "answer not saved in database because it already exists","details":answerok}, status=201)

@csrf_exempt
def delete(request, letter, category, entry):
    
    # Retrieve entry and its IDs. Need to capitalize the answer/entry to avoid bugs
    letter = letter
    category = category
    entry = entry.capitalize()

    # Intermediary step to "translate" models
    category = Category.objects.get(categoryname=category)
    letter = Letter.objects.get(letter=letter)

    try:
        entry_to_delete = Answer.objects.get(letter_played=letter, category_played=category, answer=entry)
        entry_to_delete.delete() 
        return JsonResponse({"message": "Entry found and deleted!"}, status=201)
        
    except Answer.DoesNotExist:
        return JsonResponse({"error": "Entry not found."}, status=404)

@csrf_exempt
def retrieve(request, letter, category):

    # Retrieve an entry with this specific letter and category
    letter = letter
    category = category

    # Intermediary step to "translate" models
    category = Category.objects.get(categoryname=category)
    letter = Letter.objects.get(letter=letter)

    try:
        # Retrieving a RANDOM existingentry
        possible_answers = Answer.objects.filter(letter_played=letter, category_played=category).order_by('?').first()
        possible_answers = possible_answers.answer
        return JsonResponse({"message": "We found the following:","details":possible_answers}, status=201)
        
    except Answer.DoesNotExist:
        possible_answers = 'Rien de rien!'
        return JsonResponse({"message": "We found the following:","details":possible_answers}, status=201)
