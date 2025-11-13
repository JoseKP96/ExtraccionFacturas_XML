
import { useState, useCallback, useMemo } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { InvoiceData, INVOICE_SCHEMA } from '../types.ts';

const API_KEY = process.env.API_KEY;

export const useGemini = () => {
    const [error, setError] = useState<string | null>(null);

    const ai = useMemo(() => {
        if (!API_KEY) {
            setError("API key is not configured. Please set the API_KEY environment variable.");
            return null;
        }
        return new GoogleGenAI({ apiKey: API_KEY, vertexai: true });
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const processInvoice = useCallback(async (base64Data: string, mimeType: string): Promise<InvoiceData | null> => {
        if (!ai) {
            setError("Gemini AI client is not initialized.");
            return null;
        }
        setError(null);

        try {
            const filePart = {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType,
                },
            };

            const textPart = {
                text: "Extract all relevant information from this invoice document. Follow the provided JSON schema precisely.",
            };

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: {
                    role: 'user',
                    parts: [filePart, textPart],
                },
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: INVOICE_SCHEMA,
                },
            });
            
            const jsonText = response.text;
            if (!jsonText) {
                throw new Error("The API returned an empty response. The document might be unreadable or not an invoice.");
            }

            return JSON.parse(jsonText) as InvoiceData;

        } catch (e) {
            console.error("Error processing invoice with Gemini:", e);
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during AI processing.";
            setError(`Failed to process invoice. ${errorMessage}`);
            return null;
        }
    }, [ai]);

    return { processInvoice, error, clearError };
};
