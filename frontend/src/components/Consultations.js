import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Consultations() {
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/consultations')
            .then(response => {
                setConsultations(response.data);
            })
            .catch(error => {
                console.error('Error fetching consultations:', error);
            });
    }, []);

    const handleRequest = (consultationId) => {
        // Логика для подачи запроса на консультацию
    };

    return (
        <div>
            <h2>Available Consultations</h2>
            {consultations.map(consultation => (
                <div key={consultation.id}>
                    <h3>{consultation.topic}</h3>
                    <p>{consultation.description}</p>
                    <p>Consultant ID: {consultation.consultantId}</p>
                    <button onClick={() => handleRequest(consultation.id)}>Request Consultation</button>
                </div>
            ))}
        </div>
    );
}

export default Consultations;
