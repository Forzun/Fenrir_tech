'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import type { Finding } from '@/lib/mock-data'
import { motion } from 'motion/react'

interface FindingLogProps {
  findings: Finding[]
}

const severityConfig = {
  Critical: { color: 'bg-red-500 hover:bg-red-600', text: 'text-red-500' },
  High: { color: 'bg-orange-500 hover:bg-orange-600', text: 'text-orange-500' },
  Medium: { color: 'bg-amber-500 hover:bg-amber-600', text: 'text-amber-500' },
  Low: { color: 'bg-green-500 hover:bg-green-600', text: 'text-green-500' },
}

export function FindingLog({ findings }: FindingLogProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Findings</h3>
      <ScrollArea className="h-96 w-full">
        <div className="space-y-3 pr-4">
          {findings.length > 0 ? (
            findings.map((finding) => (
              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * Number(finding.id) }}
                key={finding.id}
                className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={severityConfig[finding.status].color}>
                      {finding.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(finding.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                </div>

                <h4 className="font-semibold text-sm mb-2">{finding.title}</h4>

                <div className="text-xs space-y-1 mb-2">
                  <div>
                    <span className="text-muted-foreground">Endpoint: </span>
                    <code className="text-[#0CC8A8] font-mono bg-muted/50 px-1.5 py-0.5 rounded text-xs">
                      {finding.endpoint}
                    </code>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {finding.description}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">No findings yet</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  )
}
