import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut, Home, Shield, ProjectorIcon, FolderIcon, Bell, SettingsIcon, Disc } from 'lucide-react'
import { toast } from 'sonner'
import { ThemeToggle } from './theme-toggle'

interface sideMenuItems {
    href: string;
    label: string;
    icon: any;
}

interface menueItemsType {
    main: sideMenuItems[]
    sub?: sideMenuItems[]
}

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userName')
        toast.success('Logged out successfully')
        window.location.href = '/auth/login'
    }

    const isActive = (path: string) => pathname.startsWith(path)

    const menuItems: menueItemsType = {
        main: [
            {
                href: '/dashboard',
                label: 'Dashboard',
                icon: Home,
            },
            {
                href: '/projects',
                label: 'Projects',
                icon: FolderIcon,
            },
            {
                href: '/scans',
                label: 'Scans',
                icon: Shield,
            }
        ],
        sub: [
            {
                href: '/notification',
                label: 'Notifications',
                icon: Bell,
            },
            {
                href: '/settings',
                label: 'Settings',
                icon: SettingsIcon,
            },
            {
                href: '/support',
                label: 'Support',
                icon: Disc,
            }
        ]
    }

    return (
        <>
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg"
                >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            <aside
                className={`fixed left-0 top-0 z-40 h-full w-64 bg-background border-r border-border transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full text-sm text-muted-foreground">
                    <div className="p-6 border-b border-border">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#0CC8A8]">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold">SecureScanner</span>
                        </Link>
                    </div>

                    <nav className="overflow-y-auto p-4 space-y-3">
                        {menuItems.main.map(item => {
                            const Icon = item.icon
                            console.log(item.href)
                            return (
                                <Link key={item.href} href={item.href} className='flex flex-col'>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive(item.href)
                                            ? 'bg-[#0CC8A8] text-white'
                                            : 'text-muted-foreground hover:bg-muted'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </button>
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="border-t border-border p-4 flex-1">
                        {menuItems.sub?.map(item => {
                            const Icon = item.icon
                            return (
                                <Link key={item.href} href={item.href} className='flex flex-col'>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-color`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </button>
                                </Link>
                            )
                        })}
                    </div>

                    <div className="border-t border-border p-4 space-y-2">
                        <div className="flex items-center justify-between px-4 py-2 bg-muted rounded-lg">
                            <span className="text-sm font-medium truncate">
                                {typeof window !== 'undefined' ? localStorage.getItem('userName') : 'User'}
                            </span>
                            <ThemeToggle />
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>

                    </div>
                </div>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
