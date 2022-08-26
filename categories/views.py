from cgi import test
import json
from unicodedata import category
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from categories.models import Answer, Category, Letter, Test2

# Create your views here.
def index(request):
	return render(request, "categories/index.html")

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

		
