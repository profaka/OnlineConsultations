import React, { useState, useEffect } from 'react';
import api from './api';
import { Link } from 'react-router-dom';

function ConsultationsList() {
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await api.get('/consultations');
                setConsultations(response.data);
            } catch (error) {
                console.error('Error fetching consultations:', error);
            }
        };

        fetchConsultations();
    }, []);

    return (
        <div>
            <h2>Consultations</h2>
            <ul>
                {consultations.map(consultation => (
                    <li key={consultation.id}>
                        <h3>{consultation.title}</h3>
                        <p>{consultation.description}</p>
                        <p>Consultant: {consultation.consultantID}</p>
                        <p>Price: ${consultation.price}</p>
                        <Link to={`/book-consultation/${consultation.id}`}>Book</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ConsultationsList;
