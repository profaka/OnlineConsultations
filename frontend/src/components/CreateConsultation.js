import React, { useState } from 'react';
import api from './api';

function CreateConsultation() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/consultations', {
                title,
                description,
                price,
                duration
            });
            setMessage('Consultation created successfully');
        } catch (error) {
            console.error('Error creating consultation:', error);
            setMessage('Error creating consultation: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div>
            <h2>Create Consultation</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateConsultation;
