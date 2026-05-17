from datetime import datetime, timedelta
from typing import List, Dict, Any
from .rag_service import rag_service
from ..models.grocery import GroceryItem

class ZeroWasteService:
    def rank_recipes(self, expiring_items: List[GroceryItem], recipes: List[Dict[str, Any]]):
        """
        Ranks recipes based on:
        1. Number of expiring items used
        2. Number of available items used
        3. Fewest missing items
        """
        ranked_recipes = []
        expiring_names = [item.item_name.lower() for item in expiring_items]
        
        for recipe in recipes:
            ingredients = recipe['ingredients'].lower()
            used_expiring = [name for name in expiring_names if name in ingredients]
            
            score = len(used_expiring) * 10 # Heavily weight expiring items
            
            ranked_recipes.append({
                "recipe": recipe,
                "score": score,
                "used_expiring": used_expiring
            })
            
        return sorted(ranked_recipes, key=lambda x: x['score'], reverse=True)

    async def get_zero_waste_recommendation(self, expiring_items: List[GroceryItem], user_id: int):
        """
        Uses RAG to find the best zero waste recipe.
        """
        if not expiring_items:
            return "No items are expiring soon! You're doing great."
            
        items_str = ", ".join([f"{i.item_name} (expires {i.expiry_date.strftime('%Y-%m-%d')})" for i in expiring_items])
        
        query = f"What can I cook using these items that are expiring soon: {items_str}?"
        
        # We use the RAG service to find recipes that use these items
        inventory_names = [i.item_name for i in expiring_items] # At minimum these are available
        
        return await rag_service.query_recipes(query, inventory_names, user_id)

zero_waste_service = ZeroWasteService()
