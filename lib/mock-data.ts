export interface Scan {
    id: string;
    name: string
    type: string;
    status: "Completed" | "Scheduled" | "Failed" | "In Progress";
    progress: number;
    vulnerabilities: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    }
    lastScan: string;
    targets: string[];
    startedAt: string;
    credentials: boolean;
    files: number;
    checklists: number;
}

export interface Finding {
    id: string
    status: 'Critical' | 'High' | 'Medium' | 'Low'
    timestamp: string
    title: string
    endpoint: string
    description: string;
    color?: string
}

export interface LogEntry {
    timestamp: string
    message: string
}

export const SCAN_TYPES = [
    'API Security',
    'Web Security',
    'Infrastructure',
    'Certificate',
    'Dependency',
    'Mobile',
]

export const mockScans: Scan[] = [
    {
        id: '1',
        name: 'API Security Audit - Production',
        type: 'API Security',
        status: 'Completed',
        progress: 100,
        vulnerabilities: {
            critical: 2,
            high: 5,
            medium: 12,
            low: 8,
        },
        lastScan: '2025-03-01T14:32:00Z',
        targets: ['api.example.com', 'api-v2.example.com'],
        startedAt: '2025-03-01T10:15:00Z',
        credentials: true,
        files: 156,
        checklists: 8,
    },
    {
        id: '2',
        name: 'Web Application Penetration Test',
        type: 'Web Security',
        status: 'In Progress',
        progress: 68,
        vulnerabilities: {
            critical: 0,
            high: 3,
            medium: 7,
            low: 4,
        },
        lastScan: '2025-03-02T09:45:00Z',
        targets: ['app.example.com'],
        startedAt: '2025-03-02T08:20:00Z',
        credentials: true,
        files: 89,
        checklists: 12,
    },
    {
        id: '3',
        name: 'Infrastructure Vulnerability Scan',
        type: 'Infrastructure',
        status: 'Completed',
        progress: 100,
        vulnerabilities: {
            critical: 1,
            high: 2,
            medium: 6,
            low: 15,
        },
        lastScan: '2025-02-28T16:22:00Z',
        targets: ['10.0.0.0/24', '10.1.0.0/24'],
        startedAt: '2025-02-28T12:00:00Z',
        credentials: false,
        files: 234,
        checklists: 5,
    },
    {
        id: '4',
        name: 'SSL/TLS Configuration Review',
        type: 'Certificate',
        status: 'Scheduled',
        progress: 0,
        vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
        },
        lastScan: '2025-02-15T10:00:00Z',
        targets: ['*.example.com'],
        startedAt: '2025-03-05T20:00:00Z',
        credentials: false,
        files: 12,
        checklists: 3,
    },
    {
        id: '5',
        name: 'Third-party Dependencies Scan',
        type: 'Dependency',
        status: 'Completed',
        progress: 100,
        vulnerabilities: {
            critical: 3,
            high: 8,
            medium: 15,
            low: 22,
        },
        lastScan: '2025-03-01T11:30:00Z',
        targets: ['package.json', 'requirements.txt'],
        startedAt: '2025-03-01T11:00:00Z',
        credentials: false,
        files: 1024,
        checklists: 1,
    },
    {
        id: '6',
        name: 'Mobile Application Security Assessment',
        type: 'Mobile',
        status: 'Failed',
        progress: 45,
        vulnerabilities: {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0,
        },
        lastScan: '2025-02-25T14:00:00Z',
        targets: ['com.example.app'],
        startedAt: '2025-02-25T13:00:00Z',
        credentials: true,
        files: 567,
        checklists: 7,
    },
]

export const mockFindings: Finding[] = [
    {
        id: '1',
        status: 'Critical',
        timestamp: '2025-03-02T11:32:15Z',
        title: 'SQL Injection Vulnerability in Login Form',
        endpoint: '/api/auth/login',
        description: 'The login form is vulnerable to SQL injection attacks. User input is not properly sanitized before being used in database queries.',
    },
    {
        id: '2',
        status: 'Critical',
        timestamp: '2025-03-02T11:28:45Z',
        title: 'Exposed API Key in Response Headers',
        endpoint: '/api/v1/users',
        description: 'Sensitive API keys are being exposed in HTTP response headers, allowing potential unauthorized access.',
    },
    {
        id: '3',
        status: 'High',
        timestamp: '2025-03-02T11:25:30Z',
        title: 'Cross-Site Scripting (XSS) in Comment Section',
        endpoint: '/comments/display',
        description: 'User comments are not properly escaped, allowing attackers to inject malicious scripts.',
    },
    {
        id: '4',
        status: 'High',
        timestamp: '2025-03-02T11:22:10Z',
        title: 'Broken Authentication - Session Fixation',
        endpoint: '/api/auth/session',
        description: 'Session tokens are not properly regenerated after login, allowing session fixation attacks.',
    },
    {
        id: '5',
        status: 'High',
        timestamp: '2025-03-02T11:18:55Z',
        title: 'Missing CORS Headers',
        endpoint: '/*',
        description: 'Missing or improperly configured CORS headers allow cross-origin requests from any domain.',
    },
    {
        id: '6',
        status: 'Medium',
        timestamp: '2025-03-02T11:15:20Z',
        title: 'Weak Password Requirements',
        endpoint: '/api/auth/register',
        description: 'Password policy allows weak passwords (minimum 4 characters), not meeting OWASP standards.',
    },
    {
        id: '7',
        status: 'Medium',
        timestamp: '2025-03-02T11:12:05Z',
        title: 'Insecure Direct Object References (IDOR)',
        endpoint: '/api/documents/{id}',
        description: 'Users can access other users\' documents by modifying the document ID in the URL.',
    },
    {
        id: '8',
        status: 'Low',
        timestamp: '2025-03-02T11:08:45Z',
        title: 'Missing Security Headers',
        endpoint: '/*',
        description: 'Missing Content-Security-Policy and X-Frame-Options headers.',
    },
]

export const mockLogs: LogEntry[] = [
    {
        timestamp: '2025-03-02T11:32:15.123Z',
        message: '[INFO] Scan started for target: https://api.example.com',
    },
    {
        timestamp: '2025-03-02T11:32:45.456Z',
        message: '[INFO] Initiating spider discovery phase...',
    },
    {
        timestamp: '2025-03-02T11:33:12.789Z',
        message: '[DEBUG] Found 234 endpoints in scope',
    },
    {
        timestamp: '2025-03-02T11:33:45.012Z',
        message: '[INFO] Starting active scanning phase...',
    },
    {
        timestamp: '2025-03-02T11:34:20.345Z',
        message: '[WARN] Potential SQL injection detected at /api/auth/login',
    },
    {
        timestamp: '2025-03-02T11:34:56.678Z',
        message: '[ERROR] Request timeout on /api/internal/debug',
    },
    {
        timestamp: '2025-03-02T11:35:15.901Z',
        message: '[INFO] Testing CSRF protections...',
    },
    {
        timestamp: '2025-03-02T11:35:42.234Z',
        message: '[INFO] Analyzing response headers for security misconfigurations',
    },
    {
        timestamp: '2025-03-02T11:36:10.567Z',
        message: '[WARN] API key found in response headers',
    },
    {
        timestamp: '2025-03-02T11:36:45.890Z',
        message: '[INFO] Validating findings and generating report',
    },
]

export function getTotalVulnerabilities(scans: Scan[]) {
    return scans.reduce((acc, scan) => ({
        critical: acc.critical + scan.vulnerabilities.critical,
        high: acc.high + scan.vulnerabilities.high,
        medium: acc.medium + scan.vulnerabilities.medium,
        low: acc.low + scan.vulnerabilities.low,
    }),
        { critical: 0, high: 0, medium: 0, low: 0 }
    )
}

export const getCurrentScan = (): Scan => {
    return mockScans.find(s => s.id === '2') || mockScans[0]
}

export const getScanById = (id: string): Scan | undefined => {
    return mockScans.find(s => s.id === id)
}

export const getScanFindings = (scanId: string): Finding[] => {
    return mockFindings
}

export const getScanLogs = (scanId: string): LogEntry[] => {
    return mockLogs
}