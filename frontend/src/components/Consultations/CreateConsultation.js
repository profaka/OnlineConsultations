import React, { useState } from 'react';
import axios from 'axios';

function CreateConsultation() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:8001/consultations/create', {
                title,
                description,
                price: parseFloat(price), // Ensure price is sent as a number
                duration: parseInt(duration), // Ensure duration is sent as a number
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setMessage(response.data.message);
        } catch (error) {
            console.error('Failed to create consultation:', error);
            setMessage('Failed to create consultation');
        }
    };

    return (
        <div>
            <h2>Create Consultation</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Duration (minutes):</label>
                    <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </div>
                <button type="submit">Create Consultation</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateConsultation;
