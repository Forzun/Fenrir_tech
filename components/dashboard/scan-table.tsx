"use client"
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { STATUS_COLORS } from '@/lib/constants'
import { formatDistanceToNow } from 'date-fns'
import type { Scan } from '@/lib/mock-data'

interface ScanTableProps {
    scans: Scan[]
}

export function ScanTable({ scans }: ScanTableProps) {
    const router = useRouter()

    const handleRowClick = (scanId: string) => {
        router.push(`/scans/${scanId}`)
    }

    return (
        <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Scan Name</TableHead>
                            <TableHead className="font-semibold">Type</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold">Progress</TableHead>
                            <TableHead className="font-semibold">Vulnerabilities</TableHead>
                            <TableHead className="font-semibold">Last Scan</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {scans.map((scan) => (
                            <TableRow
                                key={scan.id}
                                onClick={() => handleRowClick(scan.id)}
                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                                <TableCell className="font-medium">{scan.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-muted">
                                        {scan.type}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={STATUS_COLORS[scan.status]}>
                                        {scan.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2 w-32">
                                        <Progress value={scan.progress} className="h-2" />
                                        <span className="text-sm font-medium text-muted-foreground w-12 text-right">
                                            {scan.progress}%
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1 flex-wrap">
                                        {scan.vulnerabilities.critical > 0 && (
                                            <Badge className="bg-red-500 hover:bg-red-600">
                                                {scan.vulnerabilities.critical}C
                                            </Badge>
                                        )}
                                        {scan.vulnerabilities.high > 0 && (
                                            <Badge className="bg-orange-500 hover:bg-orange-600">
                                                {scan.vulnerabilities.high}H
                                            </Badge>
                                        )}
                                        {scan.vulnerabilities.medium > 0 && (
                                            <Badge className="bg-amber-500 hover:bg-amber-600">
                                                {scan.vulnerabilities.medium}M
                                            </Badge>
                                        )}
                                        {scan.vulnerabilities.low > 0 && (
                                            <Badge className="bg-green-500 hover:bg-green-600">
                                                {scan.vulnerabilities.low}L
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {formatDistanceToNow(new Date(scan.lastScan), { addSuffix: true })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
