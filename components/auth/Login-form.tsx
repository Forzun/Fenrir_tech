'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { Github, Linkedin, Mail } from 'lucide-react'

export function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim()) {
            toast.error('Please fill in all fields')
            return
        }

        if (!formData.email.includes('@')) {
            toast.error('Please enter a valid email')
            return
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setIsLoading(true)

        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`)
            toast.success(`Welcome back, ${formData.firstName}!`)
            router.push('/dashboard')
            setIsLoading(false)
        }, 800)
    }

    const handleSocialLogin = (provider: string) => {
        toast.success(`Signing in with ${provider}...`)
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('userName', `Guest User`)
            router.push('/dashboard')
        }, 800)
    }

    return (
        <div className="w-full max-w-md border-none ">
            <div className="p-8">

                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-neutral-700/90 mb-1">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm mb-6">Sign in to your security dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#0CC8A8] hover:bg-[#0bb894] text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin('GitHub')}
                        disabled={isLoading}
                    >
                        <Github className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin('LinkedIn')}
                        disabled={isLoading}
                    >
                        <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin('Google')}
                        disabled={isLoading}
                    >
                        <Mail className="h-4 w-4" />
                    </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-6">
                    Demo credentials: any email & password (min 6 chars)
                </p>
            </div>
        </div>
    )
}
