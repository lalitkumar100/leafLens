<img width="240" height="238" alt="Screenshot 2026-01-28 180810" src="https://github.com/user-attachments/assets/21a9a26a-d90f-49da-9363-1be7fffef042" />

#  LeafLens: AI Plant Disease & Species Detection System
Live Application	🚀 View Live Demo -: https://leaf-lens-green.vercel.app/

**LeafLens** is an intelligent full-stack web application designed to bridge the gap between AI technology and botany. By leveraging advanced machine learning APIs, the system identifies plant species and detects potential diseases from a single image, providing actionable insights for farmers, gardeners, and researchers.

## 🚀 Features

* **📷 Precision Image Upload** – Seamlessly upload plant or leaf images for instant processing.
* **🧠 AI-Driven Analysis** – Deep learning models identify plant species and specific health issues.
* **🌡️ Comprehensive Disease Insights** – Detailed reports including:
* **Diagnosis:** Disease name and confidence score.
* **Anatomy of Issue:** Symptoms and root causes.
* **Action Plan:** Targeted treatment suggestions and long-term prevention tips.


* **🖼️ Visual Comparison** – Dedicated section to compare healthy vs. diseased plant characteristics.
* **⚡ High-Performance UI** – Built with Vite and Tailwind CSS for sub-second responsiveness.
* **☁️ Scalable Architecture** – Decoupled frontend and backend ready for cloud deployment.

---

## 🏗️ Tech Stack

### **Frontend**

* **Framework:** React.js (Vite)
* **Language:** JavaScript / TypeScript
* **Styling:** Tailwind CSS + shadcn/ui
* **State/Data:** Axios for asynchronous API communication

### **Backend**

* **Runtime:** Node.js
* **Framework:** Express.js
* **Middleware:** Multer (Image Handling), CORS, Dotenv
* **Intelligence:** Integrated Plant Analysis AI API

---

## 📂 Project Structure

```text
LeafLens/
├── backend/              # Node.js Express Server
│   ├── routes/           # API Endpoints
│   ├── controllers/      # Business logic & AI Integration
│   ├── uploads/          # Temporary image storage
│   └── server.js         # Entry point
│── src/
│── components/       # Reusable UI components (shadcn)
│── pages/            # Application views
│── main.jsx
└── README.md

```

---

## ⚙️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/lalitkumar100/leafLens
cd LeafLens

```

### 2. Backend Configuration

```bash
cd backend
npm install

```

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
GEMINI_API_KEY=your_api_key_here

```

Start the server:

```bash
npm run dev

```

### 3. Frontend Configuration

```bash
cd ../frontend
npm install
npm run dev

```

```env
VITE_BACKEND_URL=http://localhost:5173

```

The application will be available at `http://localhost:5173`.

---

## 🔁 System Workflow

1. **Input:** User uploads a leaf image via the React frontend.
2. **Transit:** The image is sent to the Express backend using a `multipart/form-data` request.
3. **Processing:** The backend communicates with the AI API to analyze the image.
4. **Response:** A structured JSON object is returned to the frontend.
5. **Visualization:** The UI renders a detailed health card with treatments and prevention steps.

### **Example JSON Response**

```json
{
  "plantName": "Tomato",
  "disease": "Early Blight",
  "confidence": "92%",
  "symptoms": "Brown spots with concentric rings on older leaves",
  "causes": "Alternaria solani fungus",
  "treatment": "Apply copper-based fungicides; prune lower foliage.",
  "prevention": "Rotate crops and ensure proper soil drainage."
}

```

---

## 🧪 Future Roadmap

* [ ] **Database Expansion:** Increase coverage for rare tropical plant species.
* [ ] **Severity Scoring:** Implement a percentage-based health score for the plant.
* [ ] **Geolocation:** Suggest common diseases based on the user's local climate.
* [ ] **Offline Support:** Implement lightweight TensorFlow.js models for edge detection.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License

Distributed under the **MIT License**.

## 👨‍💻 Author

**Lalitkumar Choudhary**
*Full Stack Developer | Computer Science Engineer*
