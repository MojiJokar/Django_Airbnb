// const ReservationSidebar =  () => {
//         return (
//             <p>Reservation side bar hello</p>

//         )
// }

// export default ReservationSidebar;


// works and ok !!!!!!!!!!!
// const ReservationSidebar =  () => {
//     return (
//         <aside className="mb-6 p-3 border border-gray-400 rounded-xl">

//             <p>Reservationsidebarhello</p>
//             <h2 className="mb=5 text-2xl">250$</h2>
//             <div className="mb-6 p-3 border border-gray-400 rounded-xl">
//                 <label className=" mb-2block font-bold text-xs">Guests</label>
//                 <select className="w-full -ml-1 text-xm">
//                     <option >1</option>
//                     <option >2</option>
//                     <option >3</option>
//                     <option >4</option>
//                 </select>     
//             </div>
//             <div className="w-full mb-6 py-6 text-center text-white bg-red-500 hover:bg-red-700 rounded-xl">
//                 Book
//             </div>

//             <div className="mb-4 flex justify-between align-center">
//                 <p>200$ * 400</p>
//                 <p>800$</p>

//             </div>
//             <div className="mb-4 flex justify-between align-center">
//                 <p>Djangobnb fee</p>
//                 <p>40$</p>

//             </div>
//             <hr />
//             <div className="mb-4 flex justify-between align-center front-bold">
//                 <p>Total </p>
//                 <p>840$</p>

//             </div>

//         </aside>

//     )
// }

// export default ReservationSidebar;

 






// import Image from "next/image";
// import Link from "next/link";
// import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

// import apiService from "@/app/services/apiService";
// import { getUserId } from "@/app/lib/actions";

// const PropertyDetailPage = async ({params}: { params: {id: string }}) => {
//     const property = await apiService.get(`/api/properties/${params.id}`);
//     const userId = await getUserId();

//     console.log('userId', userId);

//     return (
//         <main className="max-w-[1500px] mx-auto px-6 pb-6">
//             <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
//                 <Image
//                     fill
//                     src={property.image_url}
//                     className="object-cover w-full h-full"
//                     alt="Beach house"
//                 />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                 <div className="py-6 pr-6 col-span-3">
//                     <h1 className="mb-4 text-4xl">{property.title}</h1>

//                     <span className="mb-6 block text-lg text-gray-600">
//                         {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
//                     </span>

//                     <hr />

//                     <Link 
//                         href={`/landlords/${property.landlord.id}`}
//                         className="py-6 flex items-center space-x-4"
//                     >
//                         {property.landlord.avatar_url && (
//                             <Image
//                                 src={property.landlord.avatar_url}
//                                 width={50}
//                                 height={50}
//                                 className="rounded-full"
//                                 alt="The user name"
//                             />
//                         )}

//                         <p><strong>{property.landlord.name}</strong> is your host</p>
//                     </Link>

//                     <hr />

//                     <p className="mt-6 text-lg">
//                         {property.description}
//                     </p>
//                 </div>

//                 <ReservationSidebar 
//                     property={property}
//                     userId={userId}
//                 />
//             </div>
//         </main>
//     )
// }

// export default PropertyDetailPage;
























// 'use client';

// import {useState, useEffect} from 'react';
// import {Range} from 'react-date-range';
// import { differenceInDays, eachDayOfInterval, format} from 'date-fns';
// import DatePicker from '../forms/Calendar';
// import apiService from '@/app/services/apiService';
// import useLoginModal from '@/app/hooks/useLoginModal';

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
//                 const formData = new FormData();
//                 formData.append('guests', guests);
//                 formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
//                 formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
//                 formData.append('number_of_nights', nights.toString());
//                 formData.append('total_price', totalPrice.toString());

//                 const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);

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
//         const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

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

//             <div className="mb-6 p-3 border border-gray-400 rounded-xl">
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