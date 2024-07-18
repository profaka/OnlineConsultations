import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function BookConsultation() {
    const { id } = useParams(); // Получаем ConsultantID из URL
    const history = useHistory();
    const [scheduledTime, setScheduledTime] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formattedScheduledTime = new Date(scheduledTime).toISOString(); // Форматируем время в ISO строку

            const response = await axios.post('http://localhost:8001/consultations/book', {
                ConsultantID: parseInt(id), // Преобразуем id консультанта в число
                ScheduledTime: formattedScheduledTime
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Response data:", response.data); // Логируем ответ

            history.push('/bookings');
        } catch (error) {
            console.error('Failed to book consultation:', error);
            setError('Failed to book consultation');
        }
    };

    return (
        <div>
            <h2>Book Consultation</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Scheduled Time:</label>
                    <input
                        type="datetime-local"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Book</button>
            </form>
        </div>
    );
}

export default BookConsultation;
