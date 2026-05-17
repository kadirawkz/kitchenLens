from google import genai
from PIL import Image
import json
import os
from ..core.config import settings

class OCRService:
    def __init__(self):
        self.client = genai.Client(api_key=settings.GOOGLE_API_KEY)
        self.model_id = settings.GEMINI_MODEL

    async def process_receipt(self, image_path: str):
        """
        Processes a receipt image using Gemini 1.5 Flash.
        Returns a structured JSON with items, store name, date, and total.
        """
        img = Image.open(image_path)
        
        prompt = """
        Analyze this grocery receipt and extract the following information in JSON format:
        - store_name: Name of the store
        - purchase_date: Date of purchase (YYYY-MM-DD format)
        - total_amount: Total amount paid (numeric)
        - items: A list of items, where each item has:
            - item_name: Clean name of the item
            - quantity: Number of units (default 1 if not specified)
            - price: Price of the item
            - category: Best guess category (e.g., Vegetables, Dairy, Meat, Snacks, Household)

        Return ONLY the JSON object.
        """
        
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=[prompt, img]
        )
        
        try:
            # Extract JSON from response (handling potential markdown formatting)
            text = response.text
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0]
            elif "```" in text:
                text = text.split("```")[1].split("```")[0]
            
            return json.loads(text)
        except Exception as e:
            print(f"Error parsing Gemini response: {e}")
            return None

    async def summarize_nutrition(self, image_path: str):
        """
        Summarizes a nutrition label image.
        """
        img = Image.open(image_path)
        
        prompt = """
        Analyze this nutrition label and provide a summary in simple words:
        - Key nutrients: Calories, Sugar, Fat, Protein, Sodium
        - Health assessment: Is it healthy or should it be limited?
        - Warnings: Mention if sugar, sodium, or fat is particularly high.
        
        Add this disclaimer at the end: "This is a general nutrition summary, not medical advice."
        Return the summary as a clear, user-friendly text.
        """
        
        response = self.client.models.generate_content(
            model=self.model_id,
            contents=[prompt, img]
        )
        return response.text

ocr_service = OCRService()
