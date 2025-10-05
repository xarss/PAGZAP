# **PAGZAP**

College Project – Subject: *Experiência Criativa, Inovando Colaborativamente*

---

## Table of Contents

* [Motivation & Purpose](#motivation--purpose)
* [Features](#features)
* [Technologies](#technologies)
* [Architecture & Structure](#architecture--structure)
* [Setup / Installation](#setup--installation)
* [Usage](#usage)
* [Database](#database)
* [Contributing](#contributing)
* [License](#license)
* [Contact / Authors](#contact--authors)

---

## Motivation & Purpose

PAGZAP is developed as a college project for the course *Experiência Criativa, Inovando Colaborativamente*. It's meant to explore collaborative web development practices and build a functional web app that supports user registration, login, dashboard operations, settings, and possibly data interactions.

---

## Features

Here are some of the core features:

* **User registration / login / authentication**
* **User settings / profile update**
* **Dashboard interface**
* **HTML + CSS frontend** (multiple pages: login, register, dashboard, settings)
* **PHP backend** for server-side logic
* **SQL / database** scripts to manage user data
* **Static assets / images / scripts**

---

## Technologies

This project uses:

* **Frontend**: HTML5, CSS3, JavaScript
* **Backend**: PHP
* **Database**: MySQL / SQL (or any SQL-based relational DB)
* **Version control**: Git / GitHub

---

## Architecture & Structure

Here is the high-level file/folder structure:

```
/
├── css/                  # CSS stylesheets  
├── img/                  # Images / static media  
├── php/                  # PHP backend scripts  
├── scripts/              # JavaScript scripts  
├── sql/                  # SQL or DB schema / seed files  
├── index.html  
├── login.html  
├── register.html  
├── dashboard.html  
├── userSettings.html  
├── favicon.ico  
└── …  
```

* `index.html`: Landing / entry page
* `login.html`, `register.html`: user auth pages
* `dashboard.html`: main user interface after login
* `userSettings.html`: profile / settings modifications
* PHP scripts: handle form submissions, user logic, session handling
* SQL files: schema, table creations, maybe sample data

---

## Setup / Installation

Follow these steps to run the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/xarss/PAGZAP.git
   cd PAGZAP
   ```

2. **Set up a web server with PHP & SQL support**
   You can use XAMPP, WAMP, MAMP, LAMP, or any local server environment.

3. **Configure your database**

   * Create a database (e.g. `pagzap`)
   * Import the SQL file(s) inside `sql/` to create tables and initial data

4. **Adjust PHP configuration**

   * In your PHP scripts, update DB connection credentials (host, username, password, database)
   * Ensure your web server’s document root is correctly pointing to the project folder

5. **Run / Access via browser**

   * Start your web server and database server
   * Navigate to `http://localhost/<path-to-project>/index.html` (or equivalent)
   * Register a user, login, explore the dashboard

---

## Usage

* **User registration / login**:
  New users may register, and then log in using their credentials.

* **Dashboard**:
  After login, users should see their dashboard, with whatever features / content you've built (e.g. posts, data, actions).

* **Settings / Profile**:
  Users can update their profile or preferences via `userSettings.html`.

---
