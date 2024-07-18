import React, { useState } from 'react';
import axios from 'axios';

function BookConsultation() {
    const [consultationId, setConsultationId] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                'http://localhost:8001/consultations/book',
                { consultationId, date },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Consultation booked successfully');
        } catch (error) {
            console.error('Failed to book consultation:', error);
        }
    };

    return (
        <div>
            <h2>Book Consultation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Consultation ID:</label>
                    <input type="text" value={consultationId} onChange={(e) => setConsultationId(e.target.value)} required />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <button type="submit">Book</button>
            </form>
        </div>
    );
}

export default BookConsultation;
