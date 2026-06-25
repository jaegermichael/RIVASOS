export interface ServiceSpec {
  label: string;
  value: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // matches Lucide icon names
  detailedDescription: string;
  specifications: ServiceSpec[];
  machineryUsed: string;
  typicalLeadTime: string;
  primaryMaterial: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  technicalMetric: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "architectural" | "structural" | "processing";
  description: string;
  dimensions: string;
  material: string;
}

export interface MaterialDensity {
  id: string;
  name: string;
  densityGCM3: number; // e.g. 7.85 for Mild Steel
  label: string;
  basePriceKgUSD: number;
}

export interface QuoteRequest {
  id: string;
  serviceId: string;
  materialId: string;
  lengthMm: number;
  widthMm: number;
  thicknessMm: number;
  quantity: number;
  customNotes?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  calculatedWeightKg: number;
  estimatedCostUSD: number;
  status: "pending" | "drawing_review" | "quote_sent" | "approved";
  submissionDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  project: string;
}
