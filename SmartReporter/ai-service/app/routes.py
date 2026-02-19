import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import requests
from PIL import Image
from io import BytesIO
from app.model import predict_category

load_dotenv()

app = Flask(__name__)

# Configuration
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def download_image_from_url(image_url):
    """Download image from URL and return PIL Image object"""
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        
        # Check file size
        if len(response.content) > MAX_FILE_SIZE:
            return None, "Image file too large"
        
        # Open image
        image = Image.open(BytesIO(response.content))
        return image, None
    except Exception as e:
        return None, str(e)

@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint to predict issue category from image
    
    Expected JSON:
    {
        "imageUrl": "https://..."
    }
    
    Response:
    {
        "success": bool,
        "category": "road|garbage|water|streetlight|other",
        "confidence": float (0-1),
        "detected_objects": list,
        "message": str
    }
    """
    try:
        # Get request data
        data = request.get_json()
        
        if not data or 'imageUrl' not in data:
            return jsonify({
                'success': False,
                'message': 'Missing imageUrl in request body'
            }), 400
        
        image_url = data.get('imageUrl')
        
        # Download image from URL
        image, error = download_image_from_url(image_url)
        
        if error:
            return jsonify({
                'success': False,
                'message': f'Failed to download image: {error}'
            }), 400
        
        # Save temporarily and predict
        temp_path = '/tmp/temp_image.jpg'
        image.save(temp_path)
        
        # Run prediction
        result = predict_category(temp_path)
        
        # Clean up
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        return jsonify({
            'success': True,
            'category': result['category'],
            'confidence': result['confidence'],
            'detected_objects': result.get('detected_objects', [])
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Prediction failed: {str(e)}'
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'success': True,
        'message': 'AI Service is running',
        'service': 'SmartReporter AI Service'
    }), 200

@app.route('/predict-local', methods=['POST'])
def predict_local():
    """
    Alternative endpoint for local file upload
    
    Expected: multipart/form-data with 'file' field
    
    Response:
    {
        "success": bool,
        "category": "road|garbage|water|streetlight|other",
        "confidence": float (0-1),
        "detected_objects": list,
        "message": str
    }
    """
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'message': 'No file provided'
            }), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({
                'success': False,
                'message': 'No file selected'
            }), 400
        
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'message': 'File type not allowed'
            }), 400
        
        # Check file size
        file.seek(0, os.SEEK_END)
        file_size = file.tell()
        file.seek(0)
        
        if file_size > MAX_FILE_SIZE:
            return jsonify({
                'success': False,
                'message': 'File too large'
            }), 400
        
        # Save temporarily
        temp_path = f'/tmp/{file.filename}'
        file.save(temp_path)
        
        # Run prediction
        result = predict_category(temp_path)
        
        # Clean up
        if os.path.exists(temp_path):
            os.remove(temp_path)
        
        return jsonify({
            'success': True,
            'category': result['category'],
            'confidence': result['confidence'],
            'detected_objects': result.get('detected_objects', [])
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'message': f'Prediction failed: {str(e)}'
        }), 500

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'message': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500

if __name__ == '__main__':
    port = int(os.getenv('FLASK_PORT', 5001))
    app.run(debug=os.getenv('FLASK_ENV') == 'development', port=port, host='0.0.0.0')
