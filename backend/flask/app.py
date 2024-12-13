from flask import Flask, request, jsonify
from flask_cors import CORS 
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

class CustomerChurnClassifier:
    def __init__(self, model_path, encoder_path):
        with open(model_path, 'rb') as file:
            self.model = pickle.load(file)
        with open(encoder_path, 'rb') as file:
            self.encoder = pickle.load(file)
    
    def predict(self, **kwargs):
        # Prepare input for the model
        ohe_data = list(self.encoder.transform([[kwargs['gender'], kwargs['subscription_type'], kwargs['contract_length']]])[0])
        to_predict_array = [kwargs['age'], kwargs['tenure'], kwargs['usage_frequency'], kwargs['support_calls'], kwargs['payment_delay'], kwargs['total_spend'], kwargs['last_interaction']] + ohe_data
        to_predict_array = np.array(to_predict_array).reshape((1, -1))
        prediction = self.model.predict(to_predict_array)[0]
        return 'Will Churn' if prediction > 0.5 else "Won't Churn"

# Initialize the classifier
customer_churn = CustomerChurnClassifier(
    model_path=r'../Pickle-File/customer_churn_batch1aiml.pkl',
    encoder_path=r'../Pickle-File/encoder.pkl'
)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        result = customer_churn.predict(**data)
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
