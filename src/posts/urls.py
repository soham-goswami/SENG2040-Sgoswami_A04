# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.home, name='home'),
# ]

from django.urls import path
from . import views
from .views import (
    post_list_and_create,
    load_post_data_view,

    hello_world_view
)

app_name = 'posts'

urlpatterns = [
    path('main/', views.main_view, name='main-board'),  # <-- this path matches /main
]

urlpatterns = [
    path('', post_list_and_create, name='main-board'),
    path('data/<int:num_posts>/', load_post_data_view, name='posts-data'),

    path('hello-world/', hello_world_view, name='hello-world'),
]


# urlpatterns = [
#     path('', views.home, name='home'),
# ]