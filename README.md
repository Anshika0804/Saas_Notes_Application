# SaaS Notes Application (Multi-Tenant)

## Overview
A multi-tenant SaaS Notes Application that allows multiple companies to securely manage users and notes. Enforces role-based access and subscription limits.

- **Backend:** Django backend deployed on **Render** (more suitable for Django due to persistent server processes and environment flexibility)  
- **Frontend:** Minimal frontend deployed on **Vercel**  

---

## Features

### 1. Multi-Tenancy
- Supports multiple tenants: **Acme** and **Globex**  
- Strict isolation: data belonging to one tenant is never accessible to another  
- **Approach:** Shared schema with a `tenant_id` column in each relevant table  
- **Tenant Isolation Guarantee:** All note queries automatically filter by `tenant_id` to ensure strict isolation  

### 2. Authentication & Authorization
- JWT-based login  
- Roles:
  - **Admin:** Invite users and upgrade subscriptions  
  - **Member:** Create, view, edit, and delete notes  
- **Test accounts (password: `password`):**
  - `admin@acme.test` (Admin, Acme)  
  - `user@acme.test` (Member, Acme)  
  - `admin@globex.test` (Admin, Globex)  
  - `user@globex.test` (Member, Globex)  

### 3. Subscription Plans
- **Free Plan:** Maximum 3 notes per tenant  
- **Pro Plan:** Unlimited notes  
- **Upgrade endpoint:** `POST /tenants/:slug/upgrade` (accessible only by Admin)  
- Limit removed immediately after upgrade  

### 4. Notes API (CRUD)
- `POST /notes` – Create a note  
- `GET /notes` – List all notes for the current tenant  
- `GET /notes/:id` – Retrieve a specific note  
- `PUT /notes/:id` – Update a note  
- `DELETE /notes/:id` – Delete a note  

> Tenant isolation and role enforcement are applied for all endpoints  

### 5. Deployment
- **Backend:** Django app hosted on Render (suitable for Django due to persistent server processes, database connection handling, and easier environment configuration)  
- **Frontend:** Vercel  
- **CORS:** Enabled for API access  
- **Health endpoint:** `GET /health` → `{ "status": "ok" }`  

### 6. Frontend
- Minimal frontend hosted on Vercel  
- Supports:
  - Login with predefined accounts  
  - Listing, creating, deleting notes  
  - Showing “Upgrade to Pro” when a Free tenant reaches the note limit  

---

## Quick Testing

### 1. Login with Test Accounts
| Role   | Tenant | Email               |
|--------|--------|-------------------|
| Admin  | Acme   | admin@acme.test   |
| Member | Acme   | user@acme.test    |
| Admin  | Globex | admin@globex.test |
| Member | Globex | user@globex.test  |

### 2. Tenant Isolation
- Log in as `admin@acme.test` and create notes  
- Log in as `user@globex.test` → should **not see Acme notes**  

### 3. Role-based Access
- Members cannot upgrade tenants or invite users  
- Admins can upgrade tenants to Pro  

### 4. Subscription Enforcement
- Free tenants: max 3 notes  
- After `POST /tenants/:slug/upgrade`, limit is removed immediately  

### 5. Notes CRUD
- Verify create, list, view, update, delete endpoints work correctly for the tenant  

### 6. Frontend Verification
- Login with test accounts  
- List, create, delete notes  
- Free tenant reaching note limit shows “Upgrade to Pro” option  

---

## URLs
- Backend Base URL: `https://saas-notes-application-hmi7.onrender.com`  
- Frontend URL: `https://saas-notes-application-2t7yr8m4l-anshikas-projects-994ed958.vercel.app/`  
- GitHub Repository: `https://github.com/Anshika0804/Saas_Notes_Application`  

---

## Notes
- Do **not** expose `SECRET_KEY` or `DATABASE_URL` in public repositories  
- Use `.env` files for secrets in local or production environments  


