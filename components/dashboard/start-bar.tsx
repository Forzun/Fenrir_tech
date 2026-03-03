"use client"
import { Card } from '@/components/ui/card'
import { AlertCircle, AlertTriangle, AlertOctagon, CheckCircle } from 'lucide-react'
import { getTotalVulnerabilities, type Scan } from '@/lib/mock-data'

interface StatsBarProps {
    scans: Scan[]
}

export function StatsBar({ scans }: StatsBarProps) {
    const vulnerabilities = getTotalVulnerabilities(scans)
    const total = vulnerabilities.critical + vulnerabilities.high + vulnerabilities.medium + vulnerabilities.low

    const stats = [
        {
            label: 'Critical',
            value: vulnerabilities.critical,
            icon: AlertOctagon,
            color: 'text-red-500',
            bg: 'bg-red-50 dark:bg-red-950',
        },
        {
            label: 'High',
            value: vulnerabilities.high,
            icon: AlertTriangle,
            color: 'text-orange-500',
            bg: 'bg-orange-50 dark:bg-orange-950',
        },
        {
            label: 'Medium',
            value: vulnerabilities.medium,
            icon: AlertCircle,
            color: 'text-amber-500',
            bg: 'bg-amber-50 dark:bg-amber-950',
        },
        {
            label: 'Low',
            value: vulnerabilities.low,
            icon: CheckCircle,
            color: 'text-green-500',
            bg: 'bg-green-50 dark:bg-green-950',
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => {
                const Icon = stat.icon
                const percentage = total > 0 ? Math.round((stat.value / total) * 100) : 0

                return (
                    <Card key={stat.label} className={`p-6 border border-neutral-300/40 rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,.02)] dark:text-neutral-200 dark:shadow-none dark:border-neutral-800/70 text-neutral-800/80`}>
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                                <p className="text-xs text-muted-foreground mt-1">{percentage}% of total</p>
                            </div>
                            <div className={`p-3 rounded-lg border border-neutral-300/60 shadow-[0_2px_8px_0_rgba(0,0,0,.02)] dark:shadow-none dark:border-neutral-800/70`}>
                                <Icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
