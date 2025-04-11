# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.home, name='home'),
# ]

from django.urls import path
from . import views
from .views import (
    post_list_and_create,
)

app_name = 'posts'

urlpatterns = [
    path('main/', views.main_view, name='main-board'),  # <-- this path matches /main
]

urlpatterns = [
    path('', post_list_and_create, name='main-board'),
]


# urlpatterns = [
#     path('', views.home, name='home'),
# ]