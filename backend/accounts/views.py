from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer, EmailTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """Create a new user account."""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                'message': 'Account created successfully.',
                'user': UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )


class UserProfileView(APIView):
    """Get the authenticated user's profile."""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class EmailLoginView(TokenObtainPairView):
    """Login with email instead of username."""
    serializer_class = EmailTokenObtainPairSerializer
