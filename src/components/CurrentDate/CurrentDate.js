import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import '../CurrentDate/CurrentDate.css'; // Adjust if not using or if path is incorrect

const CurrentDate = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setLoading(false);
                },
                (error) => {
                    console.error("Error fetching location", error);
                    setLoading(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, []);

    const today = new Date();
    const formattedDate = format(today, 'dd/MM/yyyy');
    const formattedTime = format(today, 'HH:mm:ss');

    return (
        <div className="current-date">
            <h2>Today's Date: {formattedDate}</h2>
            <p>Login Time: {formattedTime}</p>
            {!loading && location.latitude && location.longitude ? (
                <p>Location: Latitude {location.latitude.toFixed(2)}, Longitude {location.longitude.toFixed(2)}</p>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default CurrentDate;
