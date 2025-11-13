
import React from 'react';
import { Spinner } from './Spinner.tsx';

const ProcessingView: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800/50 rounded-xl">
            <Spinner />
            <h2 className="mt-6 text-2xl font-bold text-sky-300">Processing Invoice</h2>
            <p className="mt-2 text-slate-400">
                The AI is analyzing your document. This may take a moment...
            </p>
        </div>
    );
};

export default ProcessingView;
