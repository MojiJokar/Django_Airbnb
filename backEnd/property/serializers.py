from rest_framework import serializers

# from .models import Property
from .models import Property, Reservation

# we need it for landloard 
# from useraccount.serializers import UserDetailSerializer


class PropertiesListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = (
            'id',
            'title',
            'price_per_night',
            'image_url',
        )



# we add this which is new:

class ReservationsListSerializer(serializers.ModelSerializer):
    property = PropertiesListSerializer(read_only=True, many=False)

    class Meta:
        model = Reservation
        fields = (
            'id',
            'start_date',
            'end_date',
            'number_of_nights',
            'total_price',
            'property',
        )

# we  will do it next for landloard 
# class PropertiesDetailSerializer(serializers.ModelSerializer):
#     landlord = UserDetailSerializer(read_only=True, many=False)

#     class Meta:
#         model = Property
#         fields = (
#             'id',
#             'title',
#             'description',
#             'price_per_night',
#             'image_url',
#             'bedrooms',
#             'bathrooms',
#             'guests',
#             'landlord'
#         )


# class ReservationsListSerializer(serializers.ModelSerializer):
#     property = PropertiesListSerializer(read_only=True, many=False)
    
#     class Meta:
#         model = Reservation
#         fields = (
#             'id', 'start_date', 'end_date', 'number_of_nights', 'total_price', 'property'
#         )