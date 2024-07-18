import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8001/consultations/bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Response data:', response.data); // Проверяем данные

                if (response.data.bookings && Array.isArray(response.data.bookings)) {
                    setBookings(response.data.bookings);
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                setError('Failed to fetch bookings');
            }
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h2>Booking List</h2>
            {error && <p>{error}</p>}
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.ID}>
                        Consultation ID: {booking.ConsultationID} - Status: {booking.Status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookingList;
