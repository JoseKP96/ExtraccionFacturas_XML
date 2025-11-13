
import React from 'react';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon.tsx';
import { RedoIcon } from './icons/RedoIcon.tsx';

interface ErrorViewProps {
    error: string | null;
    onReset: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ error, onReset }) => {
    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-red-900/20 border border-red-700 rounded-xl text-center">
            <AlertTriangleIcon className="mx-auto h-12 w-12 text-red-400" />
            <h2 className="mt-4 text-2xl font-bold text-red-300">An Error Occurred</h2>
            <p className="mt-2 text-red-300/90">
                {error || "Something went wrong. Please try again."}
            </p>
            <button
                onClick={onReset}
                className="mt-6 flex items-center justify-center mx-auto gap-2 px-6 py-2 text-base font-semibold bg-slate-600 text-white rounded-lg shadow-md hover:bg-slate-700 transition-colors"
                aria-label="Try again"
            >
                <RedoIcon className="w-5 h-5" />
                Try Again
            </button>
        </div>
    );
};
