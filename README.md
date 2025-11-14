# 🎓 College Admissions Website  
A modern, lightweight, and fully responsive **college admissions web platform** built for **Sunrise University** and **Metro College**.  
Students can fill out an admissions form, submit their details, and the data is automatically stored in **Google Sheets** using **Pipedream**.  
Counselors use this stored data to contact students for admission processing.

---

## 🚀 Features

### ✔ Dual College Setup  
- Two separate index pages:  
  - `index-sunrise.html` → Sunrise University  
  - `index-metro.html` → Metro College  
- Both pages share the same **CSS**, **JavaScript**, and global UI components.

### ✔ Student Admission Form  
- Clean and responsive UI for students to submit:  
  - Personal details  
  - Contact information  
  - Academic details  
- Form **posts data directly to Pipedream**, which pushes it into **Google Sheets**.

### ✔ Google Sheets + Pipedream Integration  
- Automatically stores every student submission in a connected Google Sheet.  
- Allows counselors to instantly view & act on new leads.  

### ✔ PDF Brochure Download  
- Each college has its own **brochure.pdf**.  
- On clicking **“Download Brochure”**, the corresponding PDF downloads instantly.

### ✔ Dynamic Fee Structure Modal  
- “Check Course-wise Fees” button opens a **modal popup**.  
- Fetches **dynamic fees data** from a JSON/API endpoint.  
- Updates UI instantly without reloading the page.

### ✔ Fully Responsive  
- Works perfectly on **mobile, tablet, and desktop**.  
- Built using pure HTML, CSS, and JS (no heavy frameworks).

### ✔ Vercel Deployment  
- Hosted on **Vercel** for fast global CDN delivery.  
- Zero-config hosting with automatic updates on every push.

---

## 🔗 Working Flow Diagram

**Student Form → Pipedream → Google Sheets → Counselors**


