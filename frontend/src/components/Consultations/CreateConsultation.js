import React, { useState } from 'react';
import axios from 'axios';

function CreateConsultation() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:8001/consultations', {
                title,
                description,
                price,
                duration
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage('Consultation created successfully');
        } catch (error) {
            console.error('Failed to create consultation:', error);
            setMessage('Failed to create consultation');
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
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Duration:</label>
                    <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                </div>
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CreateConsultation;
