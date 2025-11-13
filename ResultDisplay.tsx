
import React, { useState } from 'react';
import { CopyIcon } from './icons/CopyIcon.tsx';
import { DownloadIcon } from './icons/DownloadIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';
import { RedoIcon } from './icons/RedoIcon.tsx';

interface ResultDisplayProps {
    xml: string;
    fileName: string;
    onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ xml, fileName, onReset }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(xml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const baseName = fileName.split('.').slice(0, -1).join('.') || 'invoice';
        a.download = `${baseName}.xml`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full bg-slate-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-700 flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-white">Generated XML</h2>
                    <p className="text-sm text-slate-400 mt-1">Result from <span className="font-medium text-slate-300">{fileName}</span></p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors"
                        aria-label={copied ? "Copied to clipboard" : "Copy XML to clipboard"}
                    >
                        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors"
                        aria-label="Download XML file"
                    >
                        <DownloadIcon className="w-5 h-5" />
                        Download
                    </button>
                </div>
            </div>
            <div className="p-4 sm:p-6 bg-slate-900">
                <pre className="w-full text-sm text-left text-slate-300 font-mono whitespace-pre-wrap break-all overflow-x-auto max-h-[50vh]">
                    <code>{xml}</code>
                </pre>
            </div>
            <div className="p-4 sm:p-6 border-t border-slate-700 flex justify-center">
                 <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-6 py-2 text-base font-semibold bg-sky-600 text-white rounded-lg shadow-md hover:bg-sky-700 transition-colors"
                    aria-label="Process another invoice"
                >
                    <RedoIcon className="w-5 h-5" />
                    Process Another Invoice
                </button>
            </div>
        </div>
    );
};

export default ResultDisplay;
