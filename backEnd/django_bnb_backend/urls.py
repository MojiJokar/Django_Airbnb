from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include



# to avoid error for token we use tempo this :
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/properties/', include('property.urls')),
    path('api/auth/', include('useraccount.urls')),

    path(
        'api/auth/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh',
    ),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)