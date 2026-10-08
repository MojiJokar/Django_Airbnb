// 'use client';

// import {useState, useEffect} from 'react';
// import {Range} from 'react-date-range';
// import { differenceInDays, eachDayOfInterval, format} from 'date-fns';
// import DatePicker from '../forms/Calendar';
// import apiService from '@/app/services/apiService';
// import useLoginModal from '@/app/hooks/useLoginModal';
// import {
//     getPropertyReservations,
//     bookProperty
// } from '@/app/lib/reservationActions';


// const initialDateRange = {
//     startDate: new Date(),
//     endDate: new Date(),
//     key: 'selection'
// }

// export type Property ={
//     id: string;
//     guests: number;
//     price_per_night: number;
// }

// interface ReservationSidebarProps {
//     userId: string | null,
//     property: Property
// }

// const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
//     property,
//     userId
// }) => {
//     const loginModal = useLoginModal();

//     const [fee, setFee] = useState<number>(0);
//     const [nights, setNights] = useState<number>(1);
//     const [totalPrice, setTotalPrice] = useState<number>(0);
//     const [dateRange, setDateRange] = useState<Range>(initialDateRange);
//     const [minDate, setMinDate] = useState<Date>(new Date());
//     const [bookedDates, setBookedDates] = useState<Date[]>([]);
//     const [guests, setGuests] = useState<string>('1');
//     const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)

//     const performBooking = async () => {
//         console.log('performBooking', userId);

//         if (userId) {
//             if (dateRange.startDate && dateRange.endDate) {
//                 // const formData = new FormData();
//                 // formData.append('guests', guests);
//                 // formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
//                 // formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
//                 // formData.append('number_of_nights', nights.toString());
//                 // formData.append('total_price', totalPrice.toString());

//                 // const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);
//                 const response = await bookProperty(property.id, {
//                     guests,
//                     start_date: format(dateRange.startDate, 'yyyy-MM-dd'),
//                     end_date: format(dateRange.endDate, 'yyyy-MM-dd'),
//                     number_of_nights: nights,
//                     total_price: totalPrice,
//                 });

//                 if (response.success) {
//                     console.log('Bookin successful')
//                 } else {
//                     console.log('Something went wrong...');
//                 }
//             }
//         } else {
//             loginModal.open();
//         }
//     }

//     const _setDateRange = (selection: any) => {
//         const newStartDate = new Date(selection.startDate);
//         const newEndDate = new Date(selection.endDate);

//         if (newEndDate <= newStartDate) {
//             newEndDate.setDate(newStartDate.getDate() + 1);
//         }

//         setDateRange({
//             ...dateRange,
//             startDate: newStartDate,
//             endDate: newEndDate
//         })
//     }

//     const getReservations = async () => {
//         // const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)
//         const reservations = await getPropertyReservations(property.id);

//         let dates: Date[] = [];

//         reservations.forEach((reservation: any) => {
//             const range = eachDayOfInterval({
//                 start: new Date(reservation.start_date),
//                 end: new Date(reservation.end_date)
//             });

//             dates = [...dates, ...range];
//         })

//         setBookedDates(dates);
//     }

//     useEffect(() => {
//         getReservations();
        
//         if (dateRange.startDate && dateRange.endDate) {
//             const dayCount = differenceInDays(
//                 dateRange.endDate,
//                 dateRange.startDate
//             );

//             if (dayCount && property.price_per_night) {
//                 const _fee = ((dayCount * property.price_per_night) / 100) * 5;

//                 setFee(_fee);
//                 setTotalPrice((dayCount * property.price_per_night) + _fee);
//                 setNights(dayCount);
//             } else {
//                 const _fee = (property.price_per_night / 100) * 5;

//                 setFee(_fee);
//                 setTotalPrice(property.price_per_night + _fee);
//                 setNights(1);
//             }
//         }
//     }, [dateRange])

//     return (
//         <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
//             <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

//             <DatePicker
//                 value={dateRange}
//                 bookedDates={bookedDates}
//                 onChange={(value) => _setDateRange(value.selection)}
//             />

//             {/* <div className="mb-6 p-3 border border-gray-400 rounded-xl">
//                 <label className="mb-2 block font-bold text-xs">Guests</label>

//                 <select 
//                     value={guests}
//                     onChange={(e) => setGuests(e.target.value)}
//                     className="w-full -ml-1 text-xm"
//                 >
//                     {guestsRange.map(number => (
//                         <option key={number} value={number}>{number}</option>
//                     ))}
//                 </select>
//             </div> */}

//             <div>
//                 <label className="block mb-2 font-medium text-gray-700">
//                     Guests
//                 </label>

//                 <select
//                     value={guests}
//                     onChange={(e) => setGuests(e.target.value)}
//                     className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-black focus:outline-none"
//                 >
//                     {Array.from(
//                         { length: property.guests },
//                         (_, index) => index + 1
//                     ).map((number) => (
//                         <option key={number} value={number}>
//                             {number} {number === 1 ? "guest" : "guests"}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div 
//                 onClick={performBooking}
//                 className="w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl"
//             >
//                 Book
//             </div>

//             <div className="mb-4 flex justify-between align-center">
//                 <p>${property.price_per_night} * {nights} nights</p>

//                 <p>${property.price_per_night * nights}</p>
//             </div>

//             <div className="mb-4 flex justify-between align-center">
//                 <p>Djangobnb fee</p>

//                 <p>${fee}</p>
//             </div>

//             <hr />

//             <div className="mt-4 flex justify-between align-center font-bold">
//                 <p>Total</p>

//                 <p>${totalPrice}</p>
//             </div>
//         </aside>
//     )
// }

// export default ReservationSidebar;
//---------prervious worked but didnt show the gutsts number in dropdown:
'use client';

import { useState, useEffect } from 'react';
import { Range } from 'react-date-range';
import {
    differenceInDays,
    eachDayOfInterval,
    format,
} from 'date-fns';

import DatePicker from '../forms/Calendar';

import useLoginModal from '@/app/hooks/useLoginModal';

import {
    getPropertyReservations,
    bookProperty,
} from '@/app/lib/reservationActions';

const initialDateRange: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

export type Property = {
    id: string;
    title: string;
    guests: number;
    price_per_night: number;
};

interface ReservationSidebarProps {
    userId: string | null;
    property: Property;
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,
    userId,
}) => {
    const loginModal = useLoginModal();

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const [dateRange, setDateRange] =
        useState<Range>(initialDateRange);

    const [bookedDates, setBookedDates] = useState<Date[]>([]);

    const [guests, setGuests] = useState<string>('1');
    const [bookingSuccess, setBookingSuccess] = useState(false);


    const guestsRange = Array.from(
        { length: property.guests || 1 },
        (_, index) => index + 1
    );

    const performBooking = async () => {
        console.log('performBooking', userId);

        if (!userId) {
            loginModal.open();
            return;
        }

        if (!dateRange.startDate || !dateRange.endDate) {
            return;
        }

        try {
            const response = await bookProperty(property.id, {
                guests,
                start_date: format(
                    dateRange.startDate,
                    'yyyy-MM-dd'
                ),
                end_date: format(
                    dateRange.endDate,
                    'yyyy-MM-dd'
                ),
                number_of_nights: nights,
                total_price: totalPrice,
            });

            // if (response.success) {
            //     console.log('Booking successful');
            // } else {
            //     console.log('Something went wrong...');
            // }
            if (response.success) {
                console.log('Booking successful');
                setBookingSuccess(true);
            } else {
                console.log('Something went wrong...');
            }

        } catch (error) {
            console.error('Booking error:', error);
        }
    };

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(
                newStartDate.getDate() + 1
            );
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate,
        });
    };

    const getReservations = async () => {
        try {
            const reservations =
                await getPropertyReservations(property.id);

            let dates: Date[] = [];

            reservations.forEach((reservation: any) => {
                const range = eachDayOfInterval({
                    start: new Date(reservation.start_date),
                    end: new Date(reservation.end_date),
                });

                dates = [...dates, ...range];
            });

            setBookedDates(dates);
        } catch (error) {
            console.error(
                'Could not get reservations:',
                error
            );
        }
    };

    useEffect(() => {
        getReservations();

        if (
            dateRange.startDate &&
            dateRange.endDate
        ) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (
                dayCount &&
                property.price_per_night
            ) {
                const _fee =
                    ((dayCount *
                        property.price_per_night) /
                        100) *
                    5;

                setFee(_fee);

                setTotalPrice(
                    dayCount *
                        property.price_per_night +
                        _fee
                );

                setNights(dayCount);
            } else {
                const _fee =
                    (property.price_per_night / 100) *
                    5;

                setFee(_fee);

                setTotalPrice(
                    property.price_per_night + _fee
                );

                setNights(1);
            }
        }
    }, [
        dateRange,
        property.price_per_night,
        property.id,
    ]);
    console.log('PROPERTY GUESTS:', property.guests);
    console.log('PROPERTY:', property);
    return (
        <aside className="mt-6 p-6 col-span-2 rounded-xl border border-gray-300 shadow-xl bg-white">

            <h2 className="mb-5 text-2xl text-gray-900">
                ${property.price_per_night} per night
            </h2>

            <DatePicker
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) =>
                    _setDateRange(value.selection)
                }
            />

            {/* Guests */}
            <div className="mb-6 mt-6 rounded-xl border border-gray-400 bg-white p-4">

                <label
                    htmlFor="guests"
                    className="mb-2 block text-xs font-bold uppercase text-gray-900"
                >
                    Guests
                </label>

                <select
                    id="guests"
                    value={guests}
                    onChange={(e) =>
                        setGuests(e.target.value)
                    }
                    className="block w-full appearance-auto rounded-lg border border-gray-400 bg-white px-4 py-3 text-base font-medium text-black outline-none"
                    style={{
                        color: '#000000',
                        backgroundColor: '#ffffff',
                    }}
                >
                    {guestsRange.map((number) => (
                        <option
                            key={number}
                            value={number}
                            style={{
                                color: '#000000',
                                backgroundColor: '#ffffff',
                            }}
                        >
                            {number}{' '}
                            {number === 1
                                ? 'guest'
                                : 'guests'}
                        </option>
                    ))}
                </select>

                <p className="mt-2 text-sm text-gray-600">
                    {guests}{' '}
                    {Number(guests) === 1
                        ? 'guest'
                        : 'guests'}{' '}
                    selected
                </p>
            </div>

         
            {/* <div
                onClick={performBooking}
                className="mb-6 w-full cursor-pointer rounded-xl bg-airbnb py-6 text-center text-white hover:bg-airbnb-dark"
            >
                Book
            </div> */}
            <button
                    type="button"
                    onClick={performBooking}
                    className="mb-6 w-full rounded-xl bg-red-500 px-4 py-4 text-center text-xl font-bold text-white hover:bg-red-600"
            >
                    Book
            </button>

            
            <div className="mb-4 flex justify-between items-center">
                <p>
                    ${property.price_per_night} ×{' '}
                    {nights} nights
                </p>

                <p>
                    $
                    {property.price_per_night *
                        nights}
                </p>
            </div>

            <div className="mb-4 flex justify-between items-center">
                <p>Djangobnb fee</p>

                <p>${fee}</p>
            </div>

            <hr />

            <div className="mt-4 flex justify-between items-center font-bold">
                <p>Total</p>

                <p>${totalPrice}</p>
            </div>
            {/* // Booking success modal test */}
            {bookingSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setBookingSuccess(false)}
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                            aria-label="Close"
                        >
                        ×
                        </button>

                        <div className="mb-5 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <span className="text-3xl text-green-600">✓</span>
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">
                                Booking successful!
                            </h2>

                            <p className="mt-2 text-gray-600">
                                Your reservation has been confirmed.
                            </p>
                        </div>

                        <div className="space-y-3 rounded-xl bg-gray-50 p-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Property</span>
                                <span className="font-semibold text-gray-900">
                                    {property.title}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Guests</span>
                                <span className="font-semibold text-gray-900">
                                    {guests}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Check-in</span>
                                <span className="font-semibold text-gray-900">
                                    {dateRange.startDate
                                        ? format(dateRange.startDate, 'dd MMM yyyy')
                                        : ''}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Check-out</span>
                                <span className="font-semibold text-gray-900">
                                    {dateRange.endDate
                                        ? format(dateRange.endDate, 'dd MMM yyyy')
                                        : ''}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Nights</span>
                                <span className="font-semibold text-gray-900">
                                    {nights}
                                </span>
                            </div>

                            <hr />

                            <div className="flex justify-between text-base">
                                <span className="font-bold text-gray-900">
                                    Total
                                </span>
                                <span className="font-bold text-gray-900">
                                    ${totalPrice}
                                </span>
                            </div>
                        </div>


                        <button
                            type="button"
                            onClick={() => setBookingSuccess(false)}
                            className="mt-6 w-full rounded-xl bg-airbnb py-4 font-bold text-white hover:bg-airbnb-dark"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}






        </aside>
    );
};

export default ReservationSidebar;