
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon.tsx';

interface FileUploadProps {
    onFileUpload: (file: File) => void;
}

const SUPPORTED_FORMATS = [
    'image/jpeg', 
    'image/png', 
    'image/webp',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];
const UNSUPPORTED_FORMATS_MESSAGE = "Unsupported file type. Please upload a supported file (PDF, DOCX, XLSX, JPG, PNG, WebP).";

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFile = useCallback((file: File) => {
        if (SUPPORTED_FORMATS.includes(file.type)) {
            setError(null);
            onFileUpload(file);
        } else {
            setError(UNSUPPORTED_FORMATS_MESSAGE);
        }
    }, [onFileUpload]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center w-full h-64 p-6 border-2 border-dashed rounded-xl transition-colors duration-300 ${isDragging ? 'border-sky-400 bg-slate-800' : 'border-slate-600 hover:border-sky-500'}`}
            >
                <div className="text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-slate-500" />
                    <p className="mt-4 text-lg font-semibold text-slate-300">
                        Drag & drop your invoice here
                    </p>
                    <p className="mt-1 text-sm text-slate-400">or</p>
                </div>
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={SUPPORTED_FORMATS.join(',')}
                />
                <label
                    htmlFor="file-upload"
                    className="mt-4 px-6 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md cursor-pointer hover:bg-sky-700 transition-colors duration-200"
                    aria-label="Upload invoice file"
                >
                    Browse File
                </label>
                <p className="mt-4 text-xs text-slate-500">
                    Supported: PDF, DOCX, XLSX, JPG, PNG
                </p>
            </div>
            {error && (
                <div role="alert" className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
