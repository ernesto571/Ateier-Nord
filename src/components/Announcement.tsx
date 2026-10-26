import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar() {
    const [showBanner, setShowBanner] = useState(true);

    if (!showBanner) return null;

    return (
        <div className="bg-black text-white text-xs">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                <span className="mx-auto text-center">
                    Everyday finds across style, tech and more — Use Code SAVE10 For 10% Off
                </span>

                <button
                    onClick={() => setShowBanner(false)}
                    aria-label="Close announcement"
                    className="ml-4"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}