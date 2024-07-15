import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingList() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:8001/bookings', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(response.data);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div>
            <h2>Your Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        {booking.consultationTitle} - {booking.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingList;
