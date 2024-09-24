import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Predict.css';

const Predict = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [formData, setFormData] = useState({
        age: '', tenure: '', usage_frequency: '', support_calls: '', payment_delay: '',
        total_spend: '', last_interaction: '', gender: '', subscription_type: '', contract_length: ''
    });
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMouseMove = useCallback((e) => {
        const mouseX = e.clientX;
        setSidebarVisible(mouseX < 100);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputTypes = {
        age: 'number',
        tenure: 'number',
        usage_frequency: 'text',
        support_calls: 'number',
        payment_delay: 'number',
        total_spend: 'number',
        last_interaction: 'text',
        gender: 'text',
        subscription_type: 'text',
        contract_length: 'text'
    };

    const handleSubmit = async () => {
        if (!Object.values(formData).every(field => field)) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formData);
            setResult(response.data.prediction);
        } catch (error) {
            console.error('Error fetching prediction:', error);
            setError('Error fetching prediction');
            setResult(''); // Clear previous result
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="predict-container">
            <Sidebar isVisible={sidebarVisible} />
            <div className="predict-content">
                <h2>Customer Churn Prediction</h2>
                <form className="predict-form">
                    {Object.keys(formData).map((field) => (
                        <div className="predict-form-group" key={field}>
                            <input
                                type={inputTypes[field]}
                                name={field}
                                placeholder={field.replace('_', ' ').toUpperCase()}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                </form>
                <div className="button-container">
                    <button type="button" className="predict-btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Loading...' : 'Predict'}
                    </button>
                </div>
                {result && <h3 className="result">Prediction Result: {result}</h3>}
                {error && <h3 className="result error">{error}</h3>} {/* Display error */}
            </div>
        </div>
    );
};

export default Predict;
