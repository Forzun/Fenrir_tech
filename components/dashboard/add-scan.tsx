"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SCAN_TYPES } from "@/lib/mock-data";
import React, { useState } from "react";
import { toast } from "sonner";

interface AddScanProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddScan({ open, onOpenChange }: AddScanProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [targetUrl, setTargetUrl] = useState("");
    const [scanType, setScanType] = useState("");

    const handleScanSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("scan type", scanType);
        console.log("target url", targetUrl);
        if (!targetUrl || !scanType) {
            toast.error("please fill all the required fields")
            return;
        }

        setIsSubmitting(true);

    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add New Scan</DialogTitle>
                    <DialogDescription>
                        Configure and start a new security scan
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="url">Target URL or IP</Label>
                        <Input
                            type="text"
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                            id="target-url"
                            className="bg-background"
                            disabled={isSubmitting}
                            placeholder="https://example.com" />
                        <p className="text-xs text-muted-foreground">
                            Enter the website, API endpoint, or IP address to scan
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label htmlFor="scans type">Scan types</label>
                        <Select value={scanType} onValueChange={setScanType} disabled={isSubmitting} >
                            <SelectTrigger>
                                <SelectValue placeholder="Select scan type" />
                            </SelectTrigger>
                            <SelectContent>
                                {SCAN_TYPES.map((type) => (
                                    <SelectItem key={type} value={type} >{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Choose the type of security scan to perform
                        </p>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-[#0CC8A8] hover:bg-[#0bb894] text-white"
                        >
                            {isSubmitting ? 'Initiating...' : 'Start Scan'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

