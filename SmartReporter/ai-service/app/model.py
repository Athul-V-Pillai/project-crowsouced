import torch
import os
from dotenv import load_dotenv
from PIL import Image
import random

load_dotenv()

# Mock YOLO model for compatibility with Python 3.14
# Full YOLO will be enabled once Python version is downgraded to 3.10
try:
    import yolov5
    MODEL = yolov5.load(os.getenv('MODEL_PATH', 'yolov5s.pt'))
    MODEL.conf = 0.5
    USE_YOLO = True
except ImportError:
    MODEL = None
    USE_YOLO = False
    print("[WARNING] YOLOv5 not available - using mock predictions for demo")

# Define custom category mapping
# You can expand this based on your trained model's classes
CATEGORY_MAPPING = {
    'pothole': 'road',
    'crack': 'road',
    'debris': 'garbage',
    'trash': 'garbage',
    'litter': 'garbage',
    'water leak': 'water',
    'damaged light': 'streetlight',
    'broken streetlight': 'streetlight'
}

def predict_category(image_path):
    """
    Predict the issue category from an image using YOLO
    Falls back to mock predictions if YOLOv5 not available
    
    Args:
        image_path: Path or URL to the image
        
    Returns:
        dict: {category: str, confidence: float, detected_objects: list}
    """
    try:
        if USE_YOLO and MODEL is not None:
            # Run inference with YOLO
            results = MODEL(image_path)
            
            # Extract detections
            detections = results.pred[0]
            class_names = results.names
            
            detected_objects = []
            confidence_scores = {}
            
            for detection in detections:
                class_id = int(detection[5])
                confidence = float(detection[4])
                class_name = class_names[class_id].lower()
                
                detected_objects.append({
                    'object': class_name,
                    'confidence': confidence
                })
                
                # Map detected object to complaint category
                for key, category in CATEGORY_MAPPING.items():
                    if key in class_name:
                        if category not in confidence_scores:
                            confidence_scores[category] = []
                        confidence_scores[category].append(confidence)
            
            # Calculate average confidence for each category
            if confidence_scores:
                category_confidences = {
                    cat: sum(scores) / len(scores)
                    for cat, scores in confidence_scores.items()
                }
                
                # Get the category with highest confidence
                best_category = max(category_confidences, key=category_confidences.get)
                best_confidence = category_confidences[best_category]
            else:
                # Default to 'other' if no specific category detected
                best_category = 'other'
                best_confidence = 0.0
        else:
            # Mock prediction mode - random category for demo
            categories = ['road', 'garbage', 'water', 'streetlight', 'other']
            best_category = random.choice(categories)
            best_confidence = round(random.uniform(0.6, 0.95), 3)
            detected_objects = [
                {'object': best_category + '_demo', 'confidence': best_confidence}
            ]
        
        return {
            'category': best_category,
            'confidence': round(best_confidence, 3) if not isinstance(best_confidence, float) else best_confidence,
            'detected_objects': detected_objects,
            'mode': 'YOLO' if USE_YOLO else 'DEMO'
        }
    
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return {
            'category': 'other',
            'confidence': 0.0,
            'error': str(e),
            'mode': 'ERROR'
        }
