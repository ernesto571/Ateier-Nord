import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Home/Footer";
import { useAuthStore } from "../../store/AuthStore";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Login ()  {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const { formData, session, login, fetchSession, setFormData, isLoading, error } = useAuthStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        if (!formData.email?.trim()) return toast.error("Email is required.");
        if (!formData.password) return toast.error("Password is required.");
        try {
            await login(formData);
            if (error) {
                toast.error(error)
                return
            }
        } catch (err) {
            console.error("Error in handleLogin", err);
        }

    };

    useEffect(() => {
        fetchSession()
    },[])

    if (session) {
        navigate("/profile")
        return
    }

    return (
        <main>
            <div className="max-w-sm mx-auto px-4 py-16 h-[75vh] mt-[6rem]">
                <h2 className="text-3xl font-semibold mb-6">Sign In</h2>
                <div className="space-y-3"  >
                    
                    <input  type="email" placeholder="Email" className="inp" value={formData.email} onChange={handleChange} name="email"/>

                    <div className="relative">
                        <input onChange={handleChange} name="password" type={showPassword ? "text" : "password"} value={formData.password} placeholder="Password" className="inp"  />

                        <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[55%] -translate-y-1/2 text-gray-400 hover:text-gray-700">
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                    
                    <button disabled={ isLoading } onClick={handleLogin} className="btn w-full disabled:cursor-not-allowed disabled:opacity-50">Continue</button>
                </div>
                <button onClick={() => {navigate("/sign-up")}} className="mt-4 text-sm underline underline-offset-4">Create An Account</button>
            </div>
            <Footer/>
        </main>
    )
}