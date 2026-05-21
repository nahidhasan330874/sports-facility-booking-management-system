import BookingList from "@/components/BookingList";

 

async function getBookings() {
const res =
await fetch(
"http://localhost:5000/bookings",
{
cache:"no-store"
}
);

return res.json();
}

export default async function Page(){

const bookings =
await getBookings();

return (
<div className="container mx-auto py-10">

<h1
className="
text-4xl
font-bold
mb-8
"
>
My Bookings
</h1>

<BookingList
bookings={bookings}
/>

</div>
);
}