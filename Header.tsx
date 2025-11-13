
import React from 'react';
import { FileCodeIcon } from './icons/FileCodeIcon.tsx';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <div className="inline-flex items-center justify-center bg-slate-800 p-3 rounded-full">
                <FileCodeIcon className="h-8 w-8 text-sky-400" />
            </div>
            <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Invoice to XML Converter
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg text-slate-400">
                Upload an invoice file (PDF, Word, Excel, or image), and let AI extract the data into a clean, structured XML format instantly.
            </p>
        </header>
    );
};
