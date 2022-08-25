from cgi import test
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from categories.models import Answer, Test

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
		
		entry = data.get("entry", "")

		newanswer = Test(
			entry=entry
        )
		newanswer.save()
        
		return JsonResponse({"message": "answer saved."}, status=201)
