from django.urls import path
from .views import (
    CartListAPIView,
    AddToCartAPIView,
    RemoveFromCartAPIView,
    WishlistListAPIView,
    ToggleWishlistAPIView,
    UpdateCartItemAPIView,
    CreateOrderAPIView,
    UserOrderListAPIView,
)

urlpatterns = [
    path('cart/', CartListAPIView.as_view()),
    path('cart/add/', AddToCartAPIView.as_view()),
    path('cart/remove/', RemoveFromCartAPIView.as_view()),
    path('cart/update/', UpdateCartItemAPIView.as_view()),

    path('orders/', UserOrderListAPIView.as_view()),
    path('orders/create/', CreateOrderAPIView.as_view()),

    path('wishlist/', WishlistListAPIView.as_view()),
    path('wishlist/toggle/', ToggleWishlistAPIView.as_view()),
]
