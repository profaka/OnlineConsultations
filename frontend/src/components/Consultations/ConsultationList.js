import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ConsultationList() {
    const [consultations, setConsultations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8001/consultations/list', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Response data:', response.data); // Проверяем данные

                if (Array.isArray(response.data)) {
                    setConsultations(response.data);
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                console.error('Failed to fetch consultations:', error);
                setError('Failed to fetch consultations');
            }
        };

        fetchConsultations();
    }, []);

    return (
        <div>
            <h2>Consultation List</h2>
            {error && <p>{error}</p>}
            <ul>
                {consultations.map((consultation) => (
                    <li key={consultation.ID}>
                        {JSON.stringify(consultation)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ConsultationList;
