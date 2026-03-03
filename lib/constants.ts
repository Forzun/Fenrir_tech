export const SEVERITY_COLORS = {
    Critical: '#EF4444',
    High: '#F97316',
    Medium: '#EAB308',
    Low: '#22C55E',
} as const

export const SEVERITY_BG_COLORS = {
    Critical: 'bg-red-50 dark:bg-red-950',
    High: 'bg-orange-50 dark:bg-orange-950',
    Medium: 'bg-amber-50 dark:bg-amber-950',
    Low: 'bg-green-50 dark:bg-green-950',
} as const

export const STATUS_COLORS = {
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Scheduled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    Failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
} as const

export const SCAN_TYPES = [
    'API Security',
    'Web Security',
    'Infrastructure',
    'Certificate',
    'Dependency',
    'Mobile',
] as const
