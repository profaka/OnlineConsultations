import React from 'react';

function Home({ user }) {
    return (
        <div>
            <h1>Welcome, {user.name}!</h1>
            {user.role === 'client' ? (
                <div>
                    <button>Request Consultation</button>
                    {/* Другие привилегии для клиентов */}
                </div>
            ) : user.role === 'consultant' ? (
                <div>
                    <button>Manage Consultations</button>
                    {/* Другие привилегии для консультантов */}
                </div>
            ) : null}
        </div>
    );
}

export default Home;
