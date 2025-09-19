# StyleAI - Style Processing Service
import openai
from typing import Dict, List
import json

class StyleProcessor:
    def __init__(self, api_key: str):
        self.client = openai.OpenAI(api_key=api_key)
    
    async def process_style_request(self, text: str, user_context: Dict = None) -> Dict:
        """Process natural language style request using GPT-4"""
        
        prompt = f"""
        Analyze this fashion style request and extract key information:
        Request: "{text}"
        
        Extract:
        1. Style categories (casual, formal, business, etc.)
        2. Occasion type
        3. Color preferences
        4. Formality level (1-10)
        5. Season/weather considerations
        6. Budget indicators
        
        Return JSON format with analysis.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=500,
                temperature=0.3
            )
            
            return {
                "status": "success",
                "analysis": response.choices[0].message.content,
                "confidence": 0.9
            }
        except Exception as e:
            return {
                "status": "error",
                "error": str(e)
            }
