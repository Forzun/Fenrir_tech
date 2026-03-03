import { LoginForm } from '@/components/auth/Login-form'
import { ArrowDownRight, MoveUpRight } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
    title: 'Login - Security Dashboard',
    description: 'Sign in to your security scanning dashboard',
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex">
            <div className="hidden relative lg:flex lg:w-1/2 text-neutral-200 flex-col justify-between p-12">
                <Image className='object-cover absolute inset-0 -z-10' src={"https://i.pinimg.com/1200x/f2/08/76/f20876d752fa91f888d2db90053fe696.jpg"} alt="Login page image" fill />
                <div>
                    <div className="text-3xl font-bold">SecureScanner</div>
                    <p className="text-sm opacity-90">Advanced Security Vulnerability Detection</p>
                </div>

                <div className="space-y-3 text-xs">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="flex mt-1 h-5 w-5">
                                <MoveUpRight/>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">Automated Scanning</p>
                            <p className="text-sm opacity-75">Continuous vulnerability detection</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="flex mt-1 h-5 w-5">
                                <MoveUpRight />
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">Real-time Results</p>
                            <p className="text-sm opacity-75">Live scanning updates and findings</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="flex mt-1 h-5 w-5">
                                <MoveUpRight />
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold">Security Focused</p>
                            <p className="text-sm opacity-75">Enterprise-grade threat detection</p>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-neutral-50">© 2025 SecureScanner. All rights reserved.</p>
            </div>

            <div className="w-full relative lg:w-1/2 flex items-center justify-center p-4 md:p-8">
                <LoginForm />
            </div>
        </div>
    )
}
