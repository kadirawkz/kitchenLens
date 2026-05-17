# Deployment Guide - Azure Container Apps

This project is designed to be deployed to **Azure Container Apps (ACA)**.

## Steps to Deploy

### 1. Create Resource Group
```bash
az group create --name foodsafe-rg --location eastus
```

### 2. Create Container Registry (ACR)
```bash
az acr create --resource-group foodsafe-rg --name foodsaferegistry --sku Basic
```

### 3. Create Container App Environment
```bash
az containerapp env create --name foodsafe-env --resource-group foodsafe-rg --location eastus
```

### 4. Deploy Backend
```bash
az containerapp create \
  --name foodsafe-backend \
  --resource-group foodsafe-rg \
  --environment foodsafe-env \
  --image foodsaferegistry.azurecr.io/backend:latest \
  --target-port 8000 \
  --ingress external \
  --env-vars GOOGLE_API_KEY=secret SECRET_KEY=secret
```

### 5. Deploy Frontend
```bash
az containerapp create \
  --name foodsafe-frontend \
  --resource-group foodsafe-rg \
  --environment foodsafe-env \
  --image foodsaferegistry.azurecr.io/frontend:latest \
  --target-port 80 \
  --ingress external \
  --env-vars VITE_API_URL=https://foodsafe-backend.azurewebsites.net/api/v1
```

## GitHub Actions Integration
The `.github/workflows/ci-cd.yml` file contains the logic to automate these steps. You need to set the following secrets in GitHub:
- `AZURE_CREDENTIALS`
- `GHCR_TOKEN`
- `GOOGLE_API_KEY`
