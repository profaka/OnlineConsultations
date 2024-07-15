import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './api';

function BookConsultation() {
    const { id } = useParams();
    const [consultation, setConsultation] = useState(null);
    const [scheduledAt, setScheduledAt] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchConsultation = async () => {
            try {
                const response = await api.get(`/consultations/${id}`);
                setConsultation(response.data);
            } catch (error) {
                console.error('Error fetching consultation:', error);
            }
        };

        fetchConsultation();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(`/consultations/${id}/book`, {
                scheduledAt
            });
            setMessage('Consultation booked successfully');
        } catch (error) {
            console.error('Error booking consultation:', error);
            setMessage('Error booking consultation: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            <h2>Book Consultation</h2>
            {consultation ? (
                <div>
                    <h3>{consultation.title}</h3>
                    <p>{consultation.description}</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Scheduled At:</label>
                            <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} required />
                        </div>
                        <button type="submit">Book</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            ) : (
                'Loading...'
            )}
        </div>
    );
}

export default BookConsultation;
