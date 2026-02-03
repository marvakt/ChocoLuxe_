from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsAdminUserRole

from orders.serializers import OrderSerializer
from orders.models import Order

from products.serializers import ProductSerializer
from products.models import Product, Category

from accounts.models import User
from django.db.models import Sum
from .serializers import AdminUserSerializer

class AdminDashboardAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def get(self, request):
        orders = Order.objects.all()
        products = Product.objects.all()
        users = User.objects.all()

        total_revenue = orders.aggregate(
            total=Sum("total")
        )["total"] or 0

        status_counts = {
            "pending": orders.filter(status="pending").count(),
            "shipped": orders.filter(status="shipped").count(),
            "delivered": orders.filter(status="delivered").count(),
            "cancelled": orders.filter(status="cancelled").count(),
        }

        return Response({
            "totalRevenue": total_revenue,
            "totalOrders": orders.count(),
            "totalUsers": users.count(),
            "totalProducts": products.count(),
            "orderStatus": status_counts,
        })

class AdminUserListAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def get(self, request):
        users = User.objects.all().order_by("-id")
        return Response(AdminUserSerializer(users, many=True).data)

class AdminUserDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def delete(self, request, user_id):
        User.objects.filter(id=user_id).delete()
        return Response({"message": "User deleted"})

class AdminProductListAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def get(self, request):
        products = Product.objects.all().order_by("-id")
        return Response(ProductSerializer(products, many=True).data)

class AdminProductCreateAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def post(self, request):
        category_name = request.data.get("category")
        category, _ = Category.objects.get_or_create(name=category_name)

        product = Product.objects.create(
            name=request.data["name"],
            description=request.data.get("description", ""),
            price=request.data["price"],
            # Handling image upload correctly usually involves request.FILES, 
            # but request.data can work if mapped correctly by DRF parser
            image=request.data.get("image"), 
            category=category,
        )

        return Response(ProductSerializer(product).data)

class AdminProductUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def put(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

        if "category" in request.data:
            category_name = request.data.get("category")
            category, _ = Category.objects.get_or_create(name=category_name)
            product.category = category

        if "name" in request.data:
            product.name = request.data["name"]
        if "description" in request.data:
            product.description = request.data["description"]
        if "price" in request.data:
            product.price = request.data["price"]
        if "image" in request.data and request.data["image"]:
             product.image = request.data["image"]

        product.save()

        return Response(ProductSerializer(product).data)

class AdminProductDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def delete(self, request, product_id):
        Product.objects.filter(id=product_id).delete()
        return Response({"message": "Product deleted"})

class AdminOrderListAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def get(self, request):
        orders = Order.objects.prefetch_related("items").all().order_by("-created_at")
        return Response(OrderSerializer(orders, many=True).data)

class AdminOrderUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def put(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)

        order.status = request.data.get("status", order.status)
        order.payment_method = request.data.get("payment", order.payment_method)
        order.save()
        return Response({"message": "Order updated", "status": order.status})

class AdminOrderDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserRole]

    def delete(self, request, order_id):
        Order.objects.filter(id=order_id).delete()
        return Response({"message": "Order deleted"})


