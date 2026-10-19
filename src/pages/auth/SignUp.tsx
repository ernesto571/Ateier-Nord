import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Home/Footer";
import { useAuthStore } from "../../store/AuthStore";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function SignUp ()  {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const { formData, signUp, setFormData, isLoading, error } = useAuthStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        if (!formData.name?.trim()) return toast.error("Name is required.");
        if (!formData.email?.trim()) return toast.error("Email is required.");
        if (!formData.password) return toast.error("Password is required.");
        if (formData.password.length < 8) return toast.error("Password must be at least 8 characters.");
        try {
            await signUp(formData);
            if (error) {
                toast.error(error)
                return
            }
            toast.success("Check your email to confirm your signup.", { duration: 8000 })
        } catch (err) {
            console.error("Error in handleSignup", err);
        }

    };

    return (
        <main>
            <div className="max-w-sm mx-auto px-4 py-16 h-[80vh] mt-16">
                <h2 className="text-3xl font-semibold mb-6">Create Account</h2>
                <div className="space-y-3"  >
                    <input placeholder="Name" className="inp" onChange={handleChange} value={formData.name} name="name"/>
                    
                    <input  type="email" placeholder="Email" className="inp" value={formData.email} onChange={handleChange} name="email"/>

                    <div className="relative">
                        <input onChange={handleChange} name="password" type={showPassword ? "text" : "password"} value={formData.password} placeholder="Password" className="inp"  />

                        <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[55%] -translate-y-1/2 text-gray-400 hover:text-gray-700">
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                    </div>
                    
                    <button disabled={ isLoading } onClick={handleSignup} className="btn w-full disabled:cursor-not-allowed disabled:opacity-50">Continue</button>
                </div>
                <button onClick={() => {navigate("/login")}} className="mt-4 text-sm underline underline-offset-4">I Already Have An Account</button>
            </div>
            <Footer/>
        </main>
    )
}