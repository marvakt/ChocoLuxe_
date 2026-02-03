from django.urls import path
from .views import *

urlpatterns = [
    path("dashboard/", AdminDashboardAPIView.as_view()),

    path("users/", AdminUserListAPIView.as_view()),
    path("users/<int:user_id>/", AdminUserDeleteAPIView.as_view()),

    path("products/", AdminProductListAPIView.as_view()),
    path("products/add/", AdminProductCreateAPIView.as_view()),
    path("products/<int:product_id>/", AdminProductUpdateAPIView.as_view()),
    path("products/<int:product_id>/delete/", AdminProductDeleteAPIView.as_view()),

    path("orders/", AdminOrderListAPIView.as_view()),
    path("orders/<int:order_id>/", AdminOrderUpdateAPIView.as_view()),
    path("orders/<int:order_id>/delete/", AdminOrderDeleteAPIView.as_view()),
]
