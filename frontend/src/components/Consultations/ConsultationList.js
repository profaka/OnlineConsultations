import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ConsultationList() {
    const [consultations, setConsultations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await axios.get('http://localhost:8001/consultations/list');
                console.log("Fetched consultations:", response.data); // Логируем данные
                setConsultations(response.data);
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
                        <p>Title: {consultation.Title}</p>
                        <p>Description: {consultation.Description}</p>
                        <p>Price: {consultation.Price}</p>
                        <p>Duration: {consultation.Duration} minutes</p>
                        <Link to={`/consultations/book/${consultation.ConsultantID}`}>
                            <button>Book</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ConsultationList;
