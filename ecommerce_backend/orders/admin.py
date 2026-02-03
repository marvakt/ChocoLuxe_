from django.contrib import admin
from .models import CartItem, WishlistItem


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity')
    search_fields = ('user__email', 'user__username', 'product__name')
    list_filter = ('user',)
    ordering = ('user',)


@admin.register(WishlistItem)
class WishlistItemAdmin(admin.ModelAdmin):
    list_display = ('user', 'product')
    search_fields = ('user__email', 'user__username', 'product__name')
    list_filter = ('user',)
    ordering = ('user',)
