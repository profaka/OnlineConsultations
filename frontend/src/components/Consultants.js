import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Consultants() {
    const [consultants, setConsultants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/consultants')
            .then(response => {
                setConsultants(response.data);
            })
            .catch(error => {
                console.error('Error fetching consultants:', error);
            });
    }, []);

    return (
        <div>
            <h2>Consultants</h2>
            {consultants.map(consultant => (
                <div key={consultant.id}>
                    <h3>{consultant.name}</h3>
                    <p>{consultant.bio}</p>
                    <p>{consultant.achievements}</p>
                </div>
            ))}
        </div>
    );
}

export default Consultants;
