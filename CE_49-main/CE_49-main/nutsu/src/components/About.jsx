
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL; // Use a config file or similar for env variables
const GarageForm = () => {
    const [garage, setGarage] = useState(null);

    useEffect(() => {
        const fetchGarageData = async () => {
            try {
                const response = await axios.get(`${VITE_API_URL}/garage/1`); // ใช้ endpoint ที่เหมาะสม
                setGarage(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchGarageData();
    }, []);

    if (!garage) return <div>Loading...</div>;

    return (
<div id="main4Section" className="p-4 max-w-4xl mx-auto">
    <h3  className="text-2xl font-bold mb-4">Abuot</h3>
    <div className="bg-white shadow-md rounded-lg p-6">
        <p className="font-semibold"><span className="text-gray-600"></span> {garage.garage_name}</p>
        <p className="font-semibold"><span className="text-gray-600">เบอร์โทร:</span> {garage.telephone_number}</p>
        <p className="font-semibold"><span className="text-gray-600">ที่อยู่:</span> {garage.address}</p>
        <p className="font-semibold"><span className="text-gray-600">อีเมล:</span> {garage.email}</p>
        <p className="font-semibold"><span className="text-gray-600">Line ID:</span> {garage.line_id}</p>
        <p className="font-semibold"><span className="text-gray-600">เปิด-ปิดให้บริการ:</span> {garage.workinghours}</p>
        <p className="font-semibold"><span className="text-gray-600">รายละเอียด:</span> {garage.detail_garages}</p>
    </div>
</div>

  
    );
};

export default GarageForm;
