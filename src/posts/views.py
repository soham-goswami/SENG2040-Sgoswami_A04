# from django.http import HttpResponse

# def home(request):
#     return HttpResponse("Hello, this is the home page!")
from django.shortcuts import render
from .models import Post
from django.http import JsonResponse
from django.http import HttpResponse

def main_view(request):
    return HttpResponse("Welcome to the main board!")

# def home(request):
#     return render(request, 'home.html')

def post_list_and_create(request):
    qs = Post.objects.all()
    return render(request, 'posts/main.html', {'qs':qs})

def hello_world_view(request):
    return JsonResponse({'text': 'hello world x2'})