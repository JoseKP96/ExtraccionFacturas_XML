
import React, { useState, useCallback } from 'react';
import { useGemini } from './hooks/useGemini.ts';
import FileUpload from './components/FileUpload.tsx';
import ProcessingView from './components/ProcessingView.tsx';
import ResultDisplay from './components/ResultDisplay.tsx';
import { fileToBase64 } from './utils/fileUtils.ts';
import { jsonToXml } from './utils/xmlUtils.ts';
import { Header } from './components/Header.tsx';
import { ErrorView } from './components/ErrorView.tsx';

type AppState = 'upload' | 'processing' | 'result' | 'error';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('upload');
    const [xmlResult, setXmlResult] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const { processInvoice, error, clearError } = useGemini();

    const handleFileProcess = useCallback(async (file: File) => {
        setAppState('processing');
        setFileName(file.name);
        clearError();

        try {
            const { base64, mimeType } = await fileToBase64(file);
            const invoiceJson = await processInvoice(base64, mimeType);
            
            if (invoiceJson) {
                const xmlData = jsonToXml(invoiceJson);
                setXmlResult(xmlData);
                setAppState('result');
            } else {
                // Error is already set by the hook
                setAppState('error');
            }
        } catch (e) {
            // Error is already set by the hook
            setAppState('error');
        }
    }, [processInvoice, clearError]);

    const handleReset = () => {
        setAppState('upload');
        setXmlResult('');
        setFileName('');
        clearError();
    };

    const renderContent = () => {
        switch (appState) {
            case 'processing':
                return <ProcessingView />;
            case 'result':
                return <ResultDisplay xml={xmlResult} fileName={fileName} onReset={handleReset} />;
            case 'error':
                return <ErrorView error={error} onReset={handleReset} />;
            case 'upload':
            default:
                return <FileUpload onFileUpload={handleFileProcess} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <Header />
                <main className="mt-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
