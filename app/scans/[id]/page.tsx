'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Square, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { getScanById, getScanFindings, getScanLogs } from '@/lib/mock-data'
import type { Scan } from '@/lib/mock-data'
import { Sidebar } from '@/components/shared/sidebar'
import { ScanProgress } from '@/components/scans/scan-progress'
import { ScanMetadata } from '@/components/scans/scan-metadata'
import { LiveConsole } from '@/components/scans/live-console'
import { FindingLog } from '@/components/scans/finding-logo'

export default function ScanDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [scan, setScan] = useState<Scan | null>(null)

    useEffect(() => {
        console.log(params)
        const scanId = params.id as string
        const foundScan = getScanById(scanId)
        if (foundScan) {
            setScan(foundScan)
        } else {
            router.push('/dashboard')
        }
    }, [params.id, router])

    if (!scan) {
        return null
    }

    const findings = getScanFindings(scan.id)
    const logs = getScanLogs(scan.id)
    const totalVulnerabilities =
        scan.vulnerabilities.critical +
        scan.vulnerabilities.high +
        scan.vulnerabilities.medium +
        scan.vulnerabilities.low

    const handleStopScan = () => {
        toast.success('Scan stopped')
    }

    const handleShareResults = () => {
        toast.success('Results link copied to clipboard')
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <main className="flex-1 overflow-auto md:ml-64">
                <div className="p-4 md:p-8 space-y-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push('/dashboard')}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold tracking-tight">{scan.name}</h1>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <Badge variant="outline">{scan.type}</Badge>
                                    <Badge className="bg-[#0CC8A8] text-white">{totalVulnerabilities} Vulnerabilities</Badge>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {scan.status === 'In Progress' && (     
                                    <Button
                                        onClick={() => handleStopScan()}
                                        variant="destructive"
                                        size="sm"
                                        className="gap-2"
                                    >
                                        <Square className="h-4 w-4" />
                                        <span className="hidden sm:inline">Stop Scan</span>
                                    </Button>
                                )}
                                <Button
                                    onClick={handleShareResults}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Share2 className="h-4 w-4" />
                                    <span className="hidden sm:inline">Share</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-6">
                            <ScanProgress scan={scan} />
                            <ScanMetadata scan={scan} />
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <LiveConsole logs={logs} />
                            <FindingLog findings={findings} />
                        </div>
                    </div>

                    <div className="bg-muted rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border border-border">
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">Sub-agents</p>
                            <p className="text-lg font-bold">4</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">Parallel Executions</p>
                            <p className="text-lg font-bold">8</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">Operations</p>
                            <p className="text-lg font-bold">156</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">Total Issues</p>
                            <p className="text-lg font-bold text-orange-500">{totalVulnerabilities}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
