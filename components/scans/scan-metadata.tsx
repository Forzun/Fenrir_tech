import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import type { Scan } from '@/lib/mock-data'

interface ScanMetadataProps {
    scan: Scan
}

export function ScanMetadata({ scan }: ScanMetadataProps) {
    const metadataItems = [
        { label: 'Scan Type', value: scan.type },
        { label: 'Status', value: scan.status },
        {
            label: 'Started At',
            value: formatDistanceToNow(new Date(scan.startedAt), { addSuffix: true }),
        },
        { label: 'Credentials Used', value: scan.credentials ? 'Yes' : 'No' },
        { label: 'Files Scanned', value: scan.files.toString() },
        { label: 'Checklists Applied', value: scan.checklists.toString() },
    ]

    return (
        <Card className="p-6">
            <h3 className="font-semibold mb-4">Scan Information</h3>
            <div className="space-y-4">
                {metadataItems.map((item) => (
                    <div key={item.label} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                    </div>
                ))}

                <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">Targets</p>
                    <div className="flex flex-wrap gap-2">
                        {scan.targets.map((target) => (
                            <Badge key={target} variant="outline" className="font-mono text-xs">
                                {target}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}
