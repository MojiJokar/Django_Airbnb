from rest_framework.decorators import api_view
from django.http import JsonResponse

import traceback

from .forms import PropertyForm
from .models import Property, Reservation
# for test

from django.http import JsonResponse

from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Property, Reservation
from .serializers import PropertiesListSerializer, ReservationsListSerializer


from rest_framework.decorators import api_view
from django.http import JsonResponse

import traceback

from .forms import PropertyForm
from .models import Property, Reservation


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_list(request):
    properties = Property.objects.all()

    serializer = PropertiesListSerializer(
        properties,
        many=True
    )

    return JsonResponse({
        'data': serializer.data,
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_detail(request, id):
    try:
        property = Property.objects.get(id=id)
    except Property.DoesNotExist:
        return JsonResponse(
            {'error': 'Property not found'},
            status=404
        )

    serializer = PropertiesListSerializer(property)

    return JsonResponse(serializer.data)





@api_view(['GET'])
def reservations_list(request):
    reservations = Reservation.objects.filter(created_by=request.user)

    serializer = ReservationsListSerializer(reservations, many=True)

    return JsonResponse(serializer.data, safe=False)




@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def property_reservations(request, pk):
    property = Property.objects.get(pk=pk)
    reservations = property.reservations.all()

    serializer = ReservationsListSerializer(reservations, many=True)

    return JsonResponse(serializer.data, safe=False)





@api_view(['POST'])
def create_property(request):
    try:
        form = PropertyForm(
            request.POST,
            request.FILES
        )

        if form.is_valid():
            property = form.save(commit=False)
            property.landlord = request.user
            property.save()

            return JsonResponse({
                'success': True
            })

        print("FORM ERRORS:", form.errors)

        return JsonResponse({
            'success': False,
            'errors': form.errors
        }, status=400)

    except Exception as e:
        traceback.print_exc()

        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


@api_view(['POST'])
def book_property(request, pk):
    try:
        start_date = request.POST.get('start_date', '')
        end_date = request.POST.get('end_date', '')
        number_of_nights = request.POST.get(
            'number_of_nights',
            ''
        )
        total_price = request.POST.get(
            'total_price',
            ''
        )
        guests = request.POST.get('guests', '')

        property = Property.objects.get(pk=pk)

        Reservation.objects.create(
            property=property,
            start_date=start_date,
            end_date=end_date,
            number_of_nights=number_of_nights,
            total_price=total_price,
            guests=guests,
            created_by=request.user
        )

        return JsonResponse({
            'success': True
        })

    except Exception as e:
        print('Error:', e)

        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)


@api_view(['POST'])
def toggle_favorite(request, pk):
    property = Property.objects.get(pk=pk)

    if request.user in property.favorited.all():
        property.favorited.remove(request.user)

        return JsonResponse({
            'is_favorite': False
        })

    else:
        property.favorited.add(request.user)

        return JsonResponse({
            'is_favorite': True
        })