import { useEffect, useState } from 'react';
import brandLogo from '@/assets/brandLogo.png';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { api, addToken } from '@/api/api';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [store_id, setStoreId] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // send request
            const postdata = {
                store_id: Number(store_id),
                password,
            };
            // console.log('postdata', postdata);
            const response = await api.post(`/auth/login`, postdata);

            // const response = await api.ge\(`/auth/login`);

            const access_token = response.data.body.access_token;

            // add token to axios response interceptor
            await addToken(access_token);

            navigate('/dashboard');
        } catch (error) {
            alert('Invalid login credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eef2fb] to-[#e8ecf8] flex flex-col items-center justify-center px-4">
            {/* Box on top */}
            <div className="rounded-2xl  p-4  flex  items-center flex-col">
                <img
                    src={brandLogo}
                    alt="Logo"
                    className="w-30 h-30 object-contain"
                />
                <p className="font-bold text-xl">Liberty Commercial Center</p>
                <p className="text-xs text-gray-400">Store Admin Portal</p>
            </div>

            <Card>
                {/* Sign in box */}

                {/* Header */}
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>

                    <CardDescription>
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col gap-3">
                    {/* Username input */}
                    <input
                        type="text"
                        placeholder="Username"
                        value={store_id}
                        onChange={(e) => setStoreId(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                    />

                    {/* Password input with toggle */}
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter Admin Code"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition"
                    >
                        Sign in
                    </button>
                </CardContent>
                <CardFooter>Liberty Commercial Center © 1945</CardFooter>
            </Card>
        </div>
    );
}
