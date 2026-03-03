'use client'

import { useState, useMemo } from 'react'
import { Sidebar } from '@/components/shared/sidebar'
import { ScanTable } from '@/components/dashboard/scan-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Plus, Download, Settings } from 'lucide-react'
import { toast } from 'sonner'
import { StatsBar } from '@/components/dashboard/start-bar'
import { mockScans, SCAN_TYPES } from '@/lib/mock-data'
import { AddScan } from '@/components/dashboard/add-scan'

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')
    const [statusFilter, setStatusFilter] = useState('all')
    const [scanOpen , setScanOpen] = useState(false)

    const filteredScans = useMemo(() => {
        return mockScans.filter(scan => {
            const matchSearch = scan.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchType = scan.type === typeFilter || typeFilter === "all"
            const matachStatus = scan.status === statusFilter || statusFilter === "all"

            return matchSearch && matchType && matachStatus
        })
    }, [searchQuery, typeFilter, statusFilter])

    const handleNewScan = () => {
        setScanOpen(true)
    }

    const handleExportReport = () => {
        toast.success('Report exported successfully')
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <main className="flex-1 overflow-auto md:ml-64">
                <div className="p-4 md:p-8 space-y-8">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-muted-foreground mt-1">Monitor all your security scans</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                                <div className="flex items-center gap-2 flex-wrap flex-1">
                                    <Input
                                        placeholder="Search scans..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="max-w-xs"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={handleNewScan}
                                        className="bg-[#0CC8A8] hover:bg-[#0bb894] text-white gap-2"
                                    >
                                        <Plus className="h-4 w-4" />
                                        New Scan
                                    </Button>
                                    <Button
                                        onClick={handleExportReport}
                                        variant="outline"
                                        className="gap-2"
                                    >
                                        <Download className="h-4 w-4" />
                                        <span className="hidden sm:inline">Export</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                    >
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-muted-foreground">Filter by:</span>
                                <Select value={typeFilter} onValueChange={setTypeFilter}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        {SCAN_TYPES.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                                        <SelectItem value="Failed">Failed</SelectItem>
                                    </SelectContent>
                                </Select>

                                {(typeFilter !== 'all' || statusFilter !== 'all') && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setTypeFilter('all')
                                            setStatusFilter('all')
                                        }}
                                        className="text-muted-foreground"
                                    >
                                        Clear filters
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4">Vulnerability Summary</h2>
                        <StatsBar scans={mockScans} />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold">Recent Scans</h2>
                                <p className="text-sm text-muted-foreground">
                                    {filteredScans.length} scan{filteredScans.length > 1 ? 's' : ''} found
                                </p>
                            </div>
                        </div>
                        {filteredScans.length > 0 ? (
                            <ScanTable scans={filteredScans} />
                        ) : (
                            <div className="border border-border rounded-lg p-8 text-center">
                                <p className="text-muted-foreground">No scans found matching your filters</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <AddScan open={scanOpen} onOpenChange={setScanOpen} />
        </div>
    )
}
