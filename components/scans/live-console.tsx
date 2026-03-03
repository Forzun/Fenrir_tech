'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { LogEntry } from '@/lib/mock-data'
import { motion } from "motion/react"

interface LiveConsoleProps {
    logs: LogEntry[]
}

export function LiveConsole({ logs }: LiveConsoleProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const getLogColor = (message: string) => {
        if (message.includes('[ERROR]')) return 'text-red-500'
        if (message.includes('[WARN]')) return 'text-amber-500'
        if (message.includes('[INFO]')) return 'text-blue-500'
        if (message.includes('[DEBUG]')) return 'text-gray-500'
        return 'text-foreground'
    }

    const getLogBg = (message: string, index: number) => {
        if (hoveredIndex === index) return 'bg-muted/50'
        return ''
    }

    return (
        <Card className="p-6">
            <h3 className="font-semibold mb-4">Scan Console</h3>
            <Tabs defaultValue="activity" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="activity">Activity Log</TabsTrigger>
                    <TabsTrigger value="verification">Verification Loops</TabsTrigger>
                </TabsList>

                <TabsContent value="activity" className="mt-4">
                    <ScrollArea className="h-96 w-full border border-border rounded-lg bg-black/5 dark:bg-black/20 p-4">
                        <div className="font-mono text-sm space-y-1">
                            {logs.map((log, index) => (
                                <motion.div
                                    initial={{ opacity: 0, filter: 'blur(5px)' }}
                                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    key={index}
                                    className={`px-3 py-1 rounded transition-colors ${getLogBg(
                                        log.message,
                                        index
                                    )}`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <span className="text-muted-foreground">[{log.timestamp.split('T')[1].split('.')[0]}]</span>
                                    <span className={` ${getLogColor(log.message)}`}>
                                        {' '}
                                        {log.message}
                                    </span>
                                </motion.div>
                            ))}
                            <div className="text-muted-foreground animate-pulse mt-4">▌</div>
                        </div>
                    </ScrollArea>
                </TabsContent>

                <TabsContent value="verification" className="mt-4">
                    <ScrollArea className="h-96 w-full border border-border rounded-lg bg-black/5 dark:bg-black/20 p-4">
                        <div className="font-mono text-sm text-muted-foreground">
                            <motion.div
                                initial={{ opacity: 0, filter: 'blur(5px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="space-y-2">
                                <div>Verification loop 1: Pending...</div>
                                <div>Verification loop 2: Pending...</div>
                                <div>Verification loop 3: Pending...</div>
                                <div className="text-[#0CC8A8]">Processing responses...</div>
                            </motion.div>
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </Card>
    )
}
