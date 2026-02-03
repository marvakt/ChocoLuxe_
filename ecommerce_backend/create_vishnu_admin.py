import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from accounts.models import User

# Create admin user
email = 'vishnu@gmail.com'
username = 'vishnu'
password = 'vishnu@gmail.com'

# Check if user already exists
existing_user = User.objects.filter(email=email).first()

if existing_user:
    # Update existing user to admin
    existing_user.set_password(password)
    existing_user.role = 'admin'
    existing_user.is_staff = True
    existing_user.is_superuser = True
    existing_user.save()
    print(f"✓ Updated existing user: {email}")
    print(f"  Username: {existing_user.username}")
    print(f"  Role: {existing_user.role}")
else:
    # Create new admin user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        role='admin'
    )
    user.is_staff = True
    user.is_superuser = True
    user.save()
    print(f"✓ Created new admin user: {email}")
    print(f"  Username: {username}")
    print(f"  Role: {user.role}")

print("\n" + "="*50)
print("Admin user is ready!")
print("="*50)
print(f"Email: {email}")
print(f"Password: {password}")
print(f"Role: admin")
print("="*50)
print("\nYou can now login to the frontend with these credentials.")
print("After login, you will be redirected to /admin/dashboard")
