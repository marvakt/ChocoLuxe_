import os
import django
import json

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from products.models import Product, Category

# Read the JSON file
json_file_path = '../chocolate/db.json'

with open(json_file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Get unique categories from products
categories_set = set()
for product in data['products']:
    categories_set.add(product['category'])

# Create categories
print("Creating categories...")
category_objects = {}
for cat_name in categories_set:
    category, created = Category.objects.get_or_create(name=cat_name)
    category_objects[cat_name] = category
    if created:
        print(f"✓ Created category: {cat_name}")
    else:
        print(f"- Category already exists: {cat_name}")

# Create products
print("\nCreating products...")
created_count = 0
updated_count = 0

for product_data in data['products']:
    category = category_objects[product_data['category']]
    
    # Check if product already exists by name
    existing_product = Product.objects.filter(name=product_data['name']).first()
    
    if existing_product:
        # Update existing product
        existing_product.description = product_data.get('description', '')
        existing_product.price = product_data['price']
        existing_product.category = category
        existing_product.is_active = True
        existing_product.save()
        updated_count += 1
        print(f"↻ Updated: {product_data['name']}")
    else:
        # Create new product
        Product.objects.create(
            name=product_data['name'],
            description=product_data.get('description', ''),
            price=product_data['price'],
            category=category,
            is_active=True
        )
        created_count += 1
        print(f"✓ Created: {product_data['name']}")

print(f"\n{'='*50}")
print(f"Import completed!")
print(f"Categories: {len(category_objects)}")
print(f"Products created: {created_count}")
print(f"Products updated: {updated_count}")
print(f"Total products: {Product.objects.count()}")
print(f"{'='*50}")
