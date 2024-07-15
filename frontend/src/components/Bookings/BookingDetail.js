import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BookingDetail() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:8001/bookings/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBooking(response.data);
            } catch (error) {
                console.error('Failed to fetch booking:', error);
            }
        };
        fetchBooking();
    }, [id]);

    if (!booking) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Booking Detail</h2>
            <p>Consultation Title: {booking.consultationTitle}</p>
            <p>Date: {booking.date}</p>
            <p>Status: {booking.status}</p>
            {booking.status === 'pending' && (
                <button onClick={handleApprove}>Approve</button>
            )}
        </div>
    );
}

const handleApprove = async () => {
    const token = localStorage.getItem('token');
    try {
        await axios.patch(`http://localhost:8001/bookings/${id}/approve`, {}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setBooking({ ...booking, status: 'approved' });
    } catch (error) {
        console.error('Failed to approve booking:', error);
    }
};

export default BookingDetail;
