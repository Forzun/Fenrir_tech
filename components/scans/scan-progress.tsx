import { Card } from '@/components/ui/card'
import type { Scan } from '@/lib/mock-data'

interface ScanProgressProps {
    scan: Scan
}

export function ScanProgress({ scan }: ScanProgressProps) {
    const steps = ['Spidering', 'Mapping', 'Testing', 'Validating', 'Reporting']
    const currentStep = Math.floor((scan.progress / 100) * (steps.length - 1))

    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div className="flex justify-center">
                    <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="8"
                                className="text-muted"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                fill="none"
                                stroke="#0CC8A8"
                                strokeWidth="8"
                                strokeDasharray={`${2 * Math.PI * 70}`}
                                strokeDashoffset={`${2 * Math.PI * 70 * (1 - scan.progress / 100)}`}
                                strokeLinecap="round"
                                className="transition-all duration-300 delay-300"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold">{scan.progress}%</span>
                            <span className="text-xs text-muted-foreground">{scan.status}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <p className="text-sm font-semibold text-muted-foreground">Scan Progress</p>
                    <div className="space-y-2">
                        {steps.map((step, index) => (
                            <div key={step} className="flex items-center gap-3">
                                <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${index <= currentStep
                                        ? 'bg-[#0CC8A8] text-white'
                                        : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <span
                                    className={`text-sm ${index <= currentStep ? 'font-medium text-foreground' : 'text-muted-foreground'
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}
