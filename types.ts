
import { Type } from '@google/genai';

export interface InvoiceData {
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  vendor?: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
  };
  customer?: {
    name?: string;
    address?: string;
  };
  lineItems?: {
    description?: string;
    quantity?: number;
    unitPrice?: number;
    total?: number;
  }[];
  subtotal?: number;
  tax?: number;
  totalAmount?: number;
}

export const INVOICE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    invoiceNumber: { type: Type.STRING, description: "The invoice number or ID." },
    invoiceDate: { type: Type.STRING, description: "The date the invoice was issued (YYYY-MM-DD)." },
    dueDate: { type: Type.STRING, description: "The date the payment is due (YYYY-MM-DD)." },
    vendor: {
      type: Type.OBJECT,
      description: "The company or person issuing the invoice.",
      properties: {
        name: { type: Type.STRING, description: "Vendor's name." },
        address: { type: Type.STRING, description: "Vendor's full address." },
        phone: { type: Type.STRING, description: "Vendor's phone number." },
        email: { type: Type.STRING, description: "Vendor's email address." },
      },
    },
    customer: {
      type: Type.OBJECT,
      description: "The company or person being billed.",
      properties: {
        name: { type: Type.STRING, description: "Customer's name." },
        address: { type: Type.STRING, description: "Customer's full billing address." },
      },
    },
    lineItems: {
      type: Type.ARRAY,
      description: "A list of all items or services being billed.",
      items: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING, description: "Description of the item or service." },
          quantity: { type: Type.NUMBER, description: "Quantity of the item." },
          unitPrice: { type: Type.NUMBER, description: "Price per unit." },
          total: { type: Type.NUMBER, description: "Total price for this line item (quantity * unitPrice)." },
        },
        required: ["description", "total"]
      },
    },
    subtotal: { type: Type.NUMBER, description: "The total amount before taxes and discounts." },
    tax: { type: Type.NUMBER, description: "The total tax amount." },
    totalAmount: { type: Type.NUMBER, description: "The final amount due, including all taxes and fees." },
  },
};
