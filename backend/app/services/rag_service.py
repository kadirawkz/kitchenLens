import os
from typing import List, Dict, Any
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from ..core.config import settings

class RAGService:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=settings.GOOGLE_API_KEY
        )
        self.llm = ChatGoogleGenerativeAI(
            model=settings.GEMINI_MODEL,
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0
        )
        self.vector_store = None
        self._init_vector_store()

    def _init_vector_store(self):
        persist_directory = os.path.join(os.getcwd(), "chroma_data")
        self.vector_store = Chroma(
            collection_name="recipes_collection",
            embedding_function=self.embeddings,
            persist_directory=persist_directory
        )

    def add_recipes(self, recipes: List[Dict[str, Any]], user_id: int):
        """
        Chunks and adds recipes to ChromaDB.
        """
        documents = []
        for r in recipes:
            content = f"Title: {r['title']}\nIngredients: {r['ingredients']}\nInstructions: {r['instructions']}"
            metadata = {
                "user_id": user_id,
                "recipe_id": r.get("id"),
                "title": r['title']
            }
            documents.append(Document(page_content=content, metadata=metadata))
        
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(documents)
        self.vector_store.add_documents(chunks)
        self.vector_store.persist()

    async def query_recipes(self, query: str, user_inventory: List[str], user_id: int):
        """
        Performs RAG to answer user questions about recipes based on inventory.
        """
        # Search relevant recipes in ChromaDB
        docs = self.vector_store.similarity_search(query, k=3, filter={"user_id": user_id})
        
        context = "\n\n".join([d.page_content for d in docs])
        inventory_str = ", ".join(user_inventory)
        
        prompt = f"""
        You are a smart home food assistant. 
        User's current inventory: {inventory_str}
        
        Relevant Recipes from database:
        {context}
        
        User Query: {query}
        
        Based on the inventory and recipes, provide a detailed answer. 
        - List available ingredients from the user's inventory that match the recipe.
        - List missing ingredients.
        - Provide brief steps.
        - Mention if any ingredients are expiring soon.
        
        Be concise and helpful. If no recipe matches well, suggest what can be cooked generally with the inventory.
        """
        
        response = await self.llm.ainvoke(prompt)
        return response.content

rag_service = RAGService()
