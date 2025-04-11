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

def load_post_data_view(request):
    qs = Post.objects.all()
    data = []
    for obj in qs:
        item = {
            'id': obj.id,
            'title': obj.title,
            'body': obj.body,
            'author': obj.author.user.username
        }
        data.append(item)
    return JsonResponse({'data':data})

def hello_world_view(request):
    return JsonResponse({'text': 'hello world x2'})