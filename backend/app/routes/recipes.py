from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..routes.deps import get_current_user
from ..models.user import User
from ..models.recipe import Recipe
from pydantic import BaseModel

router = APIRouter()

class RecipeCreate(BaseModel):
    title: str
    ingredients: str
    instructions: str

@router.get("/")
def get_user_recipes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    recipes = db.query(Recipe).filter(Recipe.user_id == current_user.id).all()
    return recipes

@router.post("/")
def save_recipe(
    recipe: RecipeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_recipe = Recipe(
        user_id=current_user.id,
        title=recipe.title,
        ingredients=recipe.ingredients,
        instructions=recipe.instructions
    )
    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)
    return new_recipe
