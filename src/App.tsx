import { Routes, Route, Navigate} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";
import AllProducts from "./pages/Category/AllProducts";
import Apparel from "./pages/Category/Apparel";
import ProductDetails from "./pages/ProductDetailsPage";
import Wishlist from "./pages/Category/Wishlist";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { useAuthStore } from "./store/AuthStore";
import { useEffect } from "react";
import { supabase } from "./lib/supabase-client";
import Checkout from "./pages/CheckoutPage";
import Successful from "./pages/SuccessfulPage";
import { useWishlistStore } from "./store/Wishlist";
import { useCartStore } from "./store/CartStore";
import { useProductStore } from "./store/ProductStore";

// interface RouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
//   const { user, isLoading } = useAuthStore();

//   if (isLoading) return null;
//   if (!user) {
//       toast.error("Sign in to view this page.");
//       return <Navigate to="/dashboard" replace />;
//   }

//   return <>{children}</>;
// };

function App() {

  const { fetchSession } = useAuthStore()
  const { fetchWishlistItems } = useWishlistStore()
  const { fetchCartItems } = useCartStore()
  const { fetchAllProducts } = useProductStore()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
            useAuthStore.setState({ session });
        }
    );

    const initializeApp = async () => {
        console.log("Fetching session...");

        await fetchSession();

        await fetchAllProducts()

        console.log("Fetching wishlist...");
        await fetchWishlistItems();

        console.log("Fetching cart...");
        await fetchCartItems();
    };

    initializeApp();

    return () => {
        authListener.subscription.unsubscribe();
    };
}, []);

  return (
    <>
      {/* <AuthListener /> */}
      <Navbar />
      <Routes>
        {/* <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/saved-reports" element={<ProtectedRoute><SavedReport /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all" element={<AllProducts />} />
        <Route path="/apparel" element={<Apparel />} />
        <Route path="/my-wishlist" element={<Wishlist />} />
        <Route path="/:slug" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/successful" element={<Successful />} />

      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
            duration: 4000,
            style: {
                background: "#fff",
                color: "#0a0a0a",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                padding: "12px 16px",
                boxShadow: "0 4px 12px rgba(0,0,0,.06)",
            },
            success: { iconTheme: { primary: "#0a0a0a", secondary: "#fff" } },
            error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
        }}
      />
    </>
  );
}

export default App;