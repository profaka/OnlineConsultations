import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ConsultationList() {
    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await axios.get('http://localhost:8001/consultations');
                setConsultations(response.data);
            } catch (error) {
                console.error('Failed to fetch consultations:', error);
            }
        };
        fetchConsultations();
    }, []);

    return (
        <div>
            <h2>Consultations</h2>
            <ul>
                {consultations.map((consultation) => (
                    <li key={consultation.id}>{consultation.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default ConsultationList;
