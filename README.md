# Flashboard Final Project

This project was built with **Node.js**, **JavaScript**, **EJS**, **Express**, and **PostgreSQL**.  
It allows users to create, view, edit, delete, and study flashcards through a flip-style web interface.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/2016114132/flash-card-final-project.git
```

```bash
cd flash-card-final-project
```

### 2. Install Dependencies

```bash
npm install
```

---

## PostgreSQL Database Setup

### A. Install PostgreSQL

Follow the instructions for your OS:

- **Linux**:  
  ```bash
  sudo apt install postgresql
  ```

- **macOS (Homebrew)**:  
  ```bash
  brew install postgresql@17
  ```

Then verify the installation:
```bash
psql --version
```

### B. Create Database and User

Login to PostgreSQL:

- **Linux**:  
  ```bash
  sudo -u postgres psql
  ```

- **macOS**:  
  ```bash
  psql -U postgres
  ```

Then run the following commands:

- Create a new database
  ```sql
  CREATE DATABASE "flash-card-app-db";
  ```
- Create a new user/role (Skip this step if already exists)
  ```sql
  CREATE ROLE developer WITH LOGIN PASSWORD 'root';
  ```

- Grant privileges
  ```sql
  ALTER DATABASE "flash-card-app-db" OWNER TO developer;
  ```
  ```sql
  GRANT CREATE ON DATABASE "flash-card-app-db" TO developer;
  ```

Exit with:
```sql
\q
```

---

### ✅ C. Create the Cards Table

Login with the new user:
```bash
psql --host=localhost --dbname=flash-card-app-db --username=developer
```

Then run:
```sql
CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    front TEXT NOT NULL,
    back TEXT NOT NULL
);
```

Exit with:
```sql
\q
```

---

## Running the App
**Note:** Make sure you are inside the application's folder.

Start the application:
```bash
npm start
```

Then open:  
[http://localhost:3000](http://localhost:3000)
