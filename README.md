# ✦ Atelier Nord

**Atelier Nord** is a modern e-commerce fashion store designed to deliver a seamless and elegant online shopping experience. Discover curated apparel, footwear, accessories, and lifestyle essentials through a clean, minimalist storefront built around contemporary style and effortless shopping.

From browsing collections and saving favorite products to managing your cart, placing orders, and completing secure payments, Atelier Nord brings the essentials of online fashion retail into one refined experience.

---

## 🚀 Features

- 👕 **Curated Product Collections**  
  Browse apparel, footwear, accessories, and tech products through organized categories and subcategories.

- 🔎 **Product Discovery**  
  Explore product listings, view detailed product information, and discover featured items.

- ❤️ **Wishlist Management**  
  Save favorite products for later and manage your personal wishlist.

- 🛒 **Shopping Cart**  
  Add products with selected sizes and colors, update your selections, and manage cart items.

- 👤 **User Authentication**  
  Secure account access with support for user authentication and personalized shopping.

- 📦 **Order Management**  
  Create orders, store shipping details, and track order information through your account.

- 💳 **Secure Payments**  
  Stripe-powered payment integration for a streamlined checkout experience.

- 🏷️ **Discount Coupons**  
  Apply promotional codes during checkout to receive eligible discounts.

- 📱 **Responsive Design**  
  Enjoy a consistent shopping experience across desktop, tablet, and mobile devices.

- ☁️ **Cloud Database Integration**  
  Supabase powers product data, user-related records, cart persistence, wishlist functionality, and order storage.

---

## 🧰 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Router
- Lucide React
- React Hot Toast

### Backend & Services
- Supabase (Database, Authentication, and Backend Services)
- PostgreSQL
- Supabase Edge Functions
- Stripe (Payment Processing)

---

## ⚡️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- Supabase account ([Sign up here](https://supabase.com/))
- Stripe account ([Get started here](https://stripe.com/))

---

### 🔧 Installation

#### 1. Clone the repository

```bash
git clone https://github.com/ernesto571/Atelier-Nord
cd Atelier-Nord
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Configure your Stripe secret key and other required secrets in your Supabase Edge Function environment. **Never expose secret keys in frontend environment variables.**

---

### ▶️ Run the App

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

**http://localhost:5173**

---

## 🌍 Deployment

- **Frontend** → Netlify or Vercel
- **Database & Backend Services** → Supabase
- **Payment Processing** → Stripe

### Deployment Tips
- Configure your production Supabase URL and publishable key.
- Set the required Stripe secrets in your Supabase project.
- Configure authentication redirect URLs for your deployed domain.
- Deploy and verify your Supabase Edge Functions.
- Configure Stripe webhooks to handle payment events securely.
- Test checkout, order creation, and payment confirmation in Stripe test mode before going live.

---

## 💡 Future Enhancements

- ⭐ Product reviews and customer ratings
- 🎁 Personalized product recommendations
- 📧 Order confirmation and shipping email notifications
- 📊 Admin dashboard for inventory and order management
- 🔔 Back-in-stock notifications
- 🧾 Downloadable order invoices
- 🌐 Multi-currency support
- 📈 Sales analytics and customer insights

---

## 🧑‍💻 Author

**Emmanuel Cruz**  
Full-Stack Developer | Lagos, Nigeria
