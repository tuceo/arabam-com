# 🚗 Arabam.com Case Study

> **🔴 Live Demo:** [https://arabam-com.vercel.app/](https://arabam-com.vercel.app/)

<img width="1865" height="929" alt="image" src="https://github.com/user-attachments/assets/671e307a-7d69-463e-ba0d-e27246df7f31" />

This project is a Single Page Application (SPA) developed as a case study for **Arabam.com**. It features a comprehensive vehicle listing system, a detailed information view, and a side-by-side technical comparison tool.

## 🚀 Features

The following features were developed in strict accordance with the project requirements, focusing on a **Mobile-First** approach and modern UI/UX standards:

### 1.Listing Page
* **Responsive Layout:** Implemented a detailed `ListTable` for desktop and a `CarCard` view for mobile devices with vehicle images.
* **Dynamic Filtering:** Users can filter listings by **Year** and **Listing Date** all of which are synchronized with the URL query parameters.
* **Smart Sorting:** Integrated API-based sorting for Price, Year, and Date in both ascending and descending directions.
* **Dynamic Advert Size:** Users can change the number of adverts on the page (20 or 50 adverts).
* **Filter Chips:** Interactive chips that allow users to track and remove active filters with a single click.

### 2. Detail Page
* **Responsive Layout:** Implemented a detailed with vehicle page.
* **Image Slider & Zoom:** An interactive slider with a fullscreen "Zoom" mode.

### 3. Side-by-Side Comparison Tool
* **Centralized State Management:** Compare selected vehicles in listing page.
* **Technical Specification Mapping:** A dynamic modal that aligns technical data for side-by-side comparison.

## 🛠 Tech Stack

* **Framework:** Vue 3
* **State Management:** Pinia
* **Styling:** Tailwind CSS v4
* **Routing:** Vue Router
* **HTTP Client:** Axios
* **Build Tool:** Vite

## ⚙️ Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install

2. **Start Development Server**:
   ```bash
   npm run dev

3. **Build for Production**:
   ```bash
    npm run build
