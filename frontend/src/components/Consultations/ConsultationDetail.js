import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ConsultationDetail() {
    const { id } = useParams();
    const [consultation, setConsultation] = useState(null);

    useEffect(() => {
        const fetchConsultation = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/consultations/${id}`);
                setConsultation(response.data);
            } catch (error) {
                console.error('Failed to fetch consultation:', error);
            }
        };
        fetchConsultation();
    }, [id]);

    if (!consultation) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{consultation.title}</h2>
            <p>{consultation.description}</p>
            <p>Price: ${consultation.price}</p>
            <p>Duration: {consultation.duration} minutes</p>
        </div>
    );
}

export default ConsultationDetail;
