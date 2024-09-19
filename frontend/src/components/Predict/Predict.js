import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import './Predict.css';

const Predict = () => {
    const [formData, setFormData] = useState({
        age: '', tenure: '', usage_frequency: '', support_calls: '', payment_delay: '',
        total_spend: '', last_interaction: '', gender: '', subscription_type: '', contract_length: ''
    });
    const [result, setResult] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData);
            setResult(response.data.prediction);
        } catch (error) {
            console.error('Error fetching prediction:', error);
            setResult('Error fetching prediction');
        }
    };

    return (
        <div className="predict-container">
            <Sidebar />
            <div className="predict-content">
                <h2>Customer Churn Prediction</h2>
                <form onSubmit={handleSubmit} className="predict-form">
                    {Object.keys(formData).map((field) => (
                        <div className="predict-form-group" key={field}>
                            <input
                                type="text"
                                name={field}
                                placeholder={field.replace('_', ' ').toUpperCase()}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <button type="submit" className="predict-btn">Predict</button>
                </form>
                {result && <h3 className="result">Prediction Result: {result}</h3>}
            </div>
        </div>
    );
};

export default Predict;
