import { Service, ProcessStep, GalleryItem, MaterialDensity, Testimonial } from "../types";

export const COMPANY_DETAILS = {
  name: "Rivasos Enterprises Pvt Ltd",
  shortName: "Rivasos Enterprises",
  founded: "2013",
  address: "15 Bristol Rd, Workington, Harare, Zimbabwe",
  email: "rivasosenterprises@gmail.com",
  hotline1: "0772 253 464",
  hotline2: "0716 578 309",
  mdName: "T Musara",
  mdRole: "Managing Director",
};

export const SERVICES_DATA: Service[] = [
  {
    id: "shelving",
    title: "Industrial Shelving & Racking",
    description: "Heavy-duty custom industrial racking and storage shelving systems built to support massive loads.",
    detailedDescription: "Our custom shelving units are designed using robust steel framing and solid platforms, perfect for warehouses, workshops, and commercial storage. We fabricate variable tier systems engineered specifically for space optimization and extreme weight capacity.",
    iconName: "Grid",
    machineryUsed: "100-Ton Press Brake & CO2 MIG Welders",
    typicalLeadTime: "5 - 7 Working Days",
    primaryMaterial: "Structural Angle Iron & Cold Rolled Plate",
    specifications: [
      { label: "Load Capacity", value: "Up to 500kg per tier depending on gauge" },
      { label: "Finishes", value: "Industrial Blue & Orange Enamel" },
      { label: "Customization", value: "Fully adjustable or fixed welded tiers" },
      { label: "Application", value: "Warehouses, Retail back-ends, Workshops" }
    ]
  },
  {
    id: "door-frames",
    title: "Steel Door Frames",
    description: "Architectural single & double-rebated frames custom rolled to structural wall requirements.",
    detailedDescription: "Rivasos manufactures heavy-duty sheet metal door frames optimized for school, industrial, commercial, and residential use. Standard frames are folded from prime 1.2mm to 1.6mm steel sheets, featuring precision reinforcement brackets, pre-slotted hinge pockets, strike plates, and steel wire tie-ins.",
    iconName: "DoorOpen",
    machineryUsed: "100-Ton Hydraulic Press Brake & Multi-die Folders",
    typicalLeadTime: "3 - 5 Working Days",
    primaryMaterial: "Cold Rolled & Galvanized Steel",
    specifications: [
      { label: "Material Thickness", value: "1.2mm, 1.6mm, 2.0mm" },
      { label: "Standard Rebates", value: "Single Rebate (38mm), Double Rebate (38/38mm)" },
      { label: "Profile Widths", value: "115mm, 150mm, 230mm Custom Profiles" },
      { label: "Fittings Included", value: "3x Oversized Mild Steel Hinges, Strike Plates, Red Oxide Undercoat" }
    ]
  },
  {
    id: "gates",
    title: "Security & Bespoke Gates",
    description: "Heavy-duty industrial security gates, automated cantilever sliding tracks, and designer steel gates.",
    detailedDescription: "For both high-security commercial premises in Workington to architectural luxury homes in Borrodale, our gates are framed using rigid structural steel tubing and sheet metal cladding. Resistant to sagging, warping, and tampering, complete with heavy-duty rollers, tracks, and anti-lift hooks.",
    iconName: "Fence",
    machineryUsed: "Heavy CO2 MIG Welding Sets & Sectional Roll-forming Tools",
    typicalLeadTime: "7 - 10 Working Days",
    primaryMaterial: "Structural Mild Steel Tubes & Galvanized Sheeting",
    specifications: [
      { label: "Max Span Limit", value: "Up to 12.0 Meters Single Leaf" },
      { label: "Infill Materials", value: "Perforated sheeting, laser-cut screens, 2mm steel slats" },
      { label: "Corrosion Defence", value: "Hot-dip galvanizing, or zinc chromate undercoat priming" },
      { label: "Automation Friendly", value: "Integrated steel gear racks, motor brackets, and sensor brackets" }
    ]
  },
  {
    id: "gutters",
    title: "Industrial & Domestic Gutters",
    description: "Seamless custom folded seamless box gutters, domestic half-round gutters, downpipes, and fascia trims.",
    detailedDescription: "Protect industrial warehouses and residential roofs with bespoke water run-off systems. We fold custom heavy-gauge galvanized valley gutters, eave gutters, box profiles, downpipes, and stop-ends up to 3.0m in contiguous length, reducing joints and eliminates risk of persistent leaks.",
    iconName: "Droplets",
    machineryUsed: "3-Meter Guillotine & Custom Radius Press Folding Dies",
    typicalLeadTime: "2 - 4 Working Days",
    primaryMaterial: "0.6mm - 1.2mm Galvanized & Chromadek Sheet Metal",
    specifications: [
      { label: "Contiguous Lengths", value: "Standard 2.4m, 3.0m Custom lengths" },
      { label: "Gutter Profiles", value: "Industrial Box (200x200mm+), Ogee, Square, Valley Flashing" },
      { label: "Material Options", value: "0.6mm Galvanized, 1.0mm Aluminum, Zinc-Alum Alloy" },
      { label: "Joint Sealing", value: "Mechanical rivets with weather-grade polyurethane sealants" }
    ]
  },
  {
    id: "guillotine-cutting",
    title: "Guillotine Shear Cutting",
    description: "High-capacity precision linear shearing of steel sheets with clean, burr-free industrial edges.",
    detailedDescription: "Bring your raw sheets or utilize our premium local Harare steel stockpiles. Our industrial motorized guillotine shears sheets with micro-controlled back-gauges, delivering clean, perfectly square cuts without thermal distortion or scale build-up. Ideal for blanking and sizing prior to manufacturing.",
    iconName: "Scissors",
    machineryUsed: "3000mm Motorized Mechanical Guillotine Shearer",
    typicalLeadTime: "Same Day / While You Wait",
    primaryMaterial: "Mild Steel, Stainless Steel, Galvanized Sheet, Aluminum",
    specifications: [
      { label: "Max Cutting Length", value: "3050 mm maximum workspace" },
      { label: "Mild Steel Max Gauge", value: "Up to 6.0 mm thickness" },
      { label: "Stainless Steel Max Gauge", value: "Up to 4.0 mm thickness" },
      { label: "Tolerance Rating", value: "+/- 0.5 mm extreme alignment" }
    ]
  },
  {
    id: "press-bending",
    title: "Precision Press Bending",
    description: "CNC press brake metal forming for highly accurate custom brackets, channels, angles, and panel configurations.",
    detailedDescription: "Equipped with advanced European multi-V bending dies, we form steel plates into complex custom profiles. From deep U-channels, structural angles, Z-purlins to architectural trays. We maintain steady angle consistency along the full length of the bent sheet.",
    iconName: "Layers",
    machineryUsed: "120-Ton Multi-Axis CNC Electro-Hydraulic Press Brake",
    typicalLeadTime: "1 - 2 Working Days",
    primaryMaterial: "Forming Sheet Grade 350 Steel or 304 Stainless",
    specifications: [
      { label: "Max Bending Span", value: "3200 mm maximum length" },
      { label: "Bending Tonnage Force", value: "120 Metric Tons" },
      { label: "Folding Thickness Range", value: "0.5mm minimum to 8.0mm maximum sheet" },
      { label: "Repeatability Precision", value: "±0.1 Degrees bending accuracy" }
    ]
  },
  {
    id: "welding",
    title: "Industrial & Structural Welding",
    description: "High-integrity CO2 MIG, TIG, and Manual Arc structural and sheet metal joint welding.",
    detailedDescription: "Our team of specialized welders delivers strong, neat, and highly durable joints compliant with structural standards. We handle robust sheet metal assemblies, structural frames, electrical sub-stations, tank vessels, and delicate architectural fabrications with premium post-weld grinding and clean-up.",
    iconName: "Zap",
    machineryUsed: "CO2 Gas-Metal Arc (MIG) & High-Frequency Gas-Tungsten Arc (TIG) Welders",
    typicalLeadTime: "Dependant on project scale",
    primaryMaterial: "Black Mild Steel, Stainless Alloys, Sheet Plate",
    specifications: [
      { label: "Welding Types", value: "MIG (Gas-shielded CO2), TIG (Argon-shielded), Arc welding" },
      { label: "Finished Cleanliness", value: "Full slag removal, flat-grinding, weld-spatter removal" },
      { label: "Non-Destructive Testing", value: "Visual inspect, dye-penetrant checks for leak-proofing" },
      { label: "Corrosion Treatment", value: "Immediate priming with high-zinc zinc-alkali basecoats" }
    ]
  },
  {
    id: "custom-fab",
    title: "Bespoke Sheet Metal Fabrication",
    description: "End-to-end design and fabrication of electric enclosures, machine guards, custom casings, silos, and industrial ducting.",
    detailedDescription: "For unique engineering demands in Harare, Zimbabwe, we offer full design-to-delivery support. Our process translates your hand-sketched blueprints or complex CAD files into real physical assemblies, complete with internal mounting brackets, handles, lock cutouts, and specialized powder-coating.",
    iconName: "Hammer",
    machineryUsed: "Full workshop arsenal (Guillotine, Press Brake, Plasma Cutting, MIG/TIG, Spot Welding)",
    typicalLeadTime: "5 - 14 Working Days depending on complexity",
    primaryMaterial: "Mild Steel, Aluminum, Stainless Steel, Pre-galvanized sheets",
    specifications: [
      { label: "Prototyping", value: "Paper templates, 3D CAD drawing proofing prior to sheet strike" },
      { label: "Cabinet/Box IP Rating", value: "Water-drip & dust protection folded seals" },
      { label: "Hole Punch Options", value: "Standard round punches, square cutouts, louvers for ventilation" },
      { label: "Batch Capability", value: "One-off engineering prototypes to full-scale monthly production" }
    ]
  }
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Blueprint Design & CAD Proofing",
    subtitle: "Precision Planning First",
    description: "We review customer hand drawings, CAD files, or spec sheets. Our engineers check material thickness, internal bend radius allowance, and metal expansion ratios to guarantee absolute fitment prior to cutting.",
    iconName: "Ruler",
    technicalMetric: "0.2mm Drawing Checking Tolerance"
  },
  {
    stepNumber: 2,
    title: "Heavy Guillotine Shearing",
    subtitle: "Zero-Burr Straight Cuts",
    description: "Standard raw steel plates are sheared on our high-capacity 3-meter mechanical guillotine. Digital back-gauging secures parallel cutting edges with tight tolerances, creating flawless linear profiles.",
    iconName: "Scissors",
    technicalMetric: "+/- 0.5mm Cut Deviation Control"
  },
  {
    stepNumber: 3,
    title: "High-Tonnage CNC Press Bending",
    subtitle: "Accurate Forming Angles",
    description: "The sheared blanks are formed in our 120-Ton press brake. Bending angles are digitally verified across multiple bend points to ensure door profiles, box gutters, or electric enclosures match structural angles.",
    iconName: "Layers",
    technicalMetric: "8.0mm Maximum Fold Capacity"
  },
  {
    stepNumber: 4,
    title: "Co2 Welding & Post-Plate Finishing",
    subtitle: "Structural Strength & Defence",
    description: "Formed sheets are welded using heavy-gas MIG/TIG machines for maximum mechanical joint strength. Welds are mechanically ground flat, dressed, and coated with protective zinc-alkali primer or powder paint.",
    iconName: "ShieldCheck",
    technicalMetric: "100% Structural Penetration Welds"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Unpainted Steel Door Frames",
    category: "architectural",
    description: "Precision folded raw steel door frames ready for structural integration and custom finishing.",
    dimensions: "Customizable",
    material: "1.6mm Prime Mild Steel"
  },
  {
    id: "g2",
    title: "Red Oxide Primed Door Frames",
    category: "architectural",
    description: "Large batch door frames pre-primed with red oxide for immediate corrosion resistance on construction sites.",
    dimensions: "Customizable",
    material: "1.6mm Prime Mild Steel"
  },
  {
    id: "g3",
    title: "Heavy Duty Warehouse Shelving",
    category: "structural",
    description: "Custom built industrial racking with high load capacity, constructed from structural steel and finished in industrial enamel.",
    dimensions: "Various Tiers",
    material: "Structural Angle Iron & Steel Plate"
  },
  {
    id: "g4",
    title: "Decorative Silver Sliding Gates",
    category: "architectural",
    description: "Elegant bespoke sliding gates featuring modern decorative panels and robust structural frames.",
    dimensions: "Custom Spans",
    material: "Sheet Steel & Square Tubing"
  },
  {
    id: "g5",
    title: "Industrial Red Security Gates",
    category: "structural",
    description: "Heavy-duty perimeter security sliding gates, built with solid steel palisades and painted in protective industrial red.",
    dimensions: "Custom Spans",
    material: "Structural Mild Steel"
  },
  {
    id: "g6",
    title: "Truck Bed Bending & Fabrication",
    category: "processing",
    description: "Precision processed heavy steel sheets folded and welded into durable truck bed bodies using our press brakes and guillotine.",
    dimensions: "Custom Vehicle Fit",
    material: "High-Tensile Steel Plate"
  }
];

export const MATERIAL_DENSITIES: MaterialDensity[] = [
  { id: "mild-steel", name: "Mild Steel Plate", densityGCM3: 7.85, label: "Mild Steel (St37/St44)", basePriceKgUSD: 2.1 },
  { id: "stainless-304", name: "Stainless Steel 304", densityGCM3: 8.00, label: "Stainless Steel (Grade 304/316)", basePriceKgUSD: 4.8 },
  { id: "galvanized-iron", name: "Galvanized Iron Sheet", densityGCM3: 7.85, label: "Galvanized Zinc Coated Sheet", basePriceKgUSD: 2.5 },
  { id: "aluminum-5082", name: "Aluminum (Grade 5082)", densityGCM3: 2.70, label: "Aluminum Alloy (Anti-Corrosion)", basePriceKgUSD: 5.5 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Eng. M. Chimbaira",
    company: "Zim-Build Civil Engineering Group",
    role: "Senior Project Manager",
    quote: "Rivasos Enterprises has supplied steel door frames for our multi-storey apartment project in Avondale. The dimensional discipline is unmatched. Out of 350 frames, not a single profile was out of square alignment. Brilliant Work.",
    project: "350 Double-Rebated Door Frames"
  },
  {
    id: "t2",
    name: "Mr. S. Ncube",
    company: "AgroFlo Silos & Storage Ltd",
    role: "Operations Director",
    quote: "We commissioned Rivasos to cut and bend custom hopper linings, and weld high-strength downpipes. They turned around 50 sheets in under 48 hours. When you operating heavy plant, this fast Harare turnaround is a game changer.",
    project: "Guillotine Cutting & Bending Batch"
  },
  {
    id: "t3",
    name: "Architect L. Gwasira",
    company: "Gwasira & Associates Architects",
    role: "Lead Partner",
    quote: "Rivasos executed our designer cantilever entry gates beautifully. We wanted a combination of laser-cut sheets, crisp box bends, and deep charcoal powder coating. T Musara and his team made what felt like a hard layout into a seamless physical asset.",
    project: "Bespoke Cantilever Gates"
  }
];

export const TRUST_METRICS = [
  { id: "years", value: "12+", label: "Years Industrial Presence" },
  { id: "steel", value: "4,500+", label: "Tons Sheared & Folded" },
  { id: "turnaround", value: "24-48 hr", label: "Std Cut & Bend Lead Time" },
  { id: "zimbabwe", value: "100%", label: "Harare Local Built & Owned" },
];
