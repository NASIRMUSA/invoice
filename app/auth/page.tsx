"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/viewmodels/authStore';
import { createClient } from '@/lib/supabase/client';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      setUser({
        id: data.user.id,
        email: data.user.email!,
        fullName: data.user.user_metadata?.full_name,
      });
      router.push('/dashboard');
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Login to InvoicePro</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-600 text-white p-4 rounded font-bold"
        >
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
