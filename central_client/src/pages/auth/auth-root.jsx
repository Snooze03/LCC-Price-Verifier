import brandLogo from '@/assets/brandLogo.png';
import { LoginForm } from '@/pages/auth/LoginForm';

export function AuthRoot() {
    return (
        <>
            {/* Header */}
            <div className="flex flex-col justify-center items-center mb-10">
                <img
                    src={brandLogo}
                    alt="Logo"
                    className="w-30 h-30 object-contain"
                />
                <p className="font-bold text-xl">Liberty Commercial Center</p>
                <p className="text-xs text-gray-400">
                    Price Verifier Admin Portal
                </p>
            </div>

            {/* Form */}
            <LoginForm className="w-sm" />
        </>
    );
}
