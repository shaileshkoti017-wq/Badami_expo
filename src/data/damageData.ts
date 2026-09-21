import { DamageScanResult } from '../types';

export interface StoneDamageSample {
  id: string;
  title: string;
  location: string;
  stoneType: string;
  condition: 'cracked' | 'eroded' | 'intact';
  severity: 'Low' | 'Medium' | 'High';
  affectedAreaPercent: number;
  imageUrl: string;
  heatmapOverlayUrl?: string;
  asiRecommendation: string;
  suggestedIntervention: string;
  urgencyWindow: string;
  technicalNotes: string[];
}

export const SAMPLE_DAMAGE_CASES: StoneDamageSample[] = [
  {
    id: 'crack_cave3_plinth',
    title: 'Transverse Bedding Crack — Cave 3 Plinth',
    location: 'Badami Cave 3 (Maha-Vishnu Sanctuary)',
    stoneType: 'Badami Arenite Quartzose Sandstone (Precambrian)',
    condition: 'cracked',
    severity: 'High',
    affectedAreaPercent: 39.4,
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    asiRecommendation: 'Priority Level 1: Immediate conservation intervention required. High risk of moisture seepage through sandstone bedding planes during monsoon.',
    suggestedIntervention: 'Hydraulic lime grout injection (1:1 ethyl silicate stabilizer) and ultrasonic pulse velocity (UPV) depth profiling.',
    urgencyWindow: 'Inspection & consolidation within 30 days',
    technicalNotes: [
      'Grad-CAM conv_pw_13 activation localized along horizontal bedding cleavage',
      'Crack width measured at 4.2 mm with 14 cm estimated penetration',
      'High thermal expansion differential observed in afternoon exposure'
    ]
  },
  {
    id: 'erosion_bhutanatha_wall',
    title: 'Honeycomb Salt & Wind Erosion — Outer Wall',
    location: 'Bhutanatha Complex (West lakeside facade)',
    stoneType: 'Ferruginous Coarse Sandstone',
    condition: 'eroded',
    severity: 'Medium',
    affectedAreaPercent: 24.8,
    imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80',
    asiRecommendation: 'Priority Level 2: Progressive sub-surface salt crystallization (haloclasty) eroding relief contours. Plinth stabilization recommended.',
    suggestedIntervention: 'Desalination poultices using paper pulp and demineralized water, followed by micro-crystalline wax hydrophobic shield.',
    urgencyWindow: 'Conservation work recommended within 3 months',
    technicalNotes: [
      'Grad-CAM highlights granular disaggregation on splash-zone sandstone',
      'Depth of alveolar weathering: 8 mm – 15 mm',
      'Direct correlation with Agastya Lake seasonal water table fluctuations'
    ]
  },
  {
    id: 'fissure_virupaksha_column',
    title: 'Hairline Thermal Fissure — Pillar Medallion',
    location: 'Pattadakal Virupaksha Mandapa (UNESCO Zone)',
    stoneType: 'Fine-grained Golden Sandstone',
    condition: 'cracked',
    severity: 'Low',
    affectedAreaPercent: 9.8,
    imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010f443a987?auto=format&fit=crop&w=800&q=80',
    asiRecommendation: 'Priority Level 3: Non-critical superficial micro-fracture. Monitor quarterly with crack-displacement gauges.',
    suggestedIntervention: 'Micro-crack seal using nano-silica consolidation without disfiguring intricate frieze carvings.',
    urgencyWindow: 'Monitor periodically; review in 6 months',
    technicalNotes: [
      'Grad-CAM focal point isolated to superficial 0.8 mm surface cleft',
      'No structural shear detected along load-bearing axis',
      'Pillar core remains fully sound'
    ]
  },
  {
    id: 'intact_aihole_carving',
    title: 'Pristine Carved Peristyle — Intact Baseline',
    location: 'Aihole Durga Temple (Apsidal Ambulatory)',
    stoneType: 'Siliceous Quartzite Sandstone',
    condition: 'intact',
    severity: 'Low',
    affectedAreaPercent: 1.4,
    imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    asiRecommendation: 'Status: Healthy / Preserved. Natural mineral patina intact; no mechanical fractures or hazardous biological patina.',
    suggestedIntervention: 'Standard preventive maintenance: soft dry bristle dusting and seasonal rain gutter clearance.',
    urgencyWindow: 'Routine annual survey (Q1 2027)',
    technicalNotes: [
      'Grad-CAM baseline shows uniform low-gradient activation across field',
      'Sharp edge retention on 8th-century decorative mouldings',
      'Structural integrity index: 98.6%'
    ]
  }
];

/**
 * Generate a synthetic Grad-CAM heatmap overlay onto a canvas
 * simulates ConvNet activation mapping with jet colormap (blue -> cyan -> yellow -> red)
 */
export function generateGradCamCanvas(
  img: HTMLImageElement,
  condition: 'cracked' | 'eroded' | 'intact',
  affectedPercent: number
): string {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || 600;
  canvas.height = img.naturalHeight || 450;
  const ctx = canvas.getContext('2d');
  if (!ctx) return img.src;

  // 1. Draw base image
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // 2. Overlay Grad-CAM thermal layer
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';

  const w = canvas.width;
  const h = canvas.height;

  // Create radial or linear hot spots depending on condition
  const numHotspots = condition === 'intact' ? 1 : condition === 'cracked' ? 4 : 6;
  
  for (let i = 0; i < numHotspots; i++) {
    const cx = condition === 'intact' ? w * 0.5 : w * (0.25 + 0.5 * (i / (numHotspots || 1)));
    const cy = condition === 'intact' ? h * 0.5 : h * (0.35 + 0.3 * Math.sin(i * 1.5));
    const radius = (affectedPercent / 100) * Math.min(w, h) * (condition === 'intact' ? 0.3 : 0.45);

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    if (condition === 'cracked') {
      grad.addColorStop(0, 'rgba(255, 20, 10, 0.85)'); // high red center
      grad.addColorStop(0.3, 'rgba(255, 120, 0, 0.7)'); // orange
      grad.addColorStop(0.6, 'rgba(255, 220, 0, 0.5)'); // yellow
      grad.addColorStop(0.85, 'rgba(0, 200, 220, 0.25)'); // cyan
      grad.addColorStop(1, 'rgba(0, 0, 180, 0)');
    } else if (condition === 'eroded') {
      grad.addColorStop(0, 'rgba(230, 60, 20, 0.75)');
      grad.addColorStop(0.4, 'rgba(250, 160, 20, 0.6)');
      grad.addColorStop(0.7, 'rgba(240, 220, 40, 0.4)');
      grad.addColorStop(0.9, 'rgba(0, 180, 200, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 200, 0)');
    } else {
      // Intact - faint blue/green cold tones only
      grad.addColorStop(0, 'rgba(0, 200, 180, 0.25)');
      grad.addColorStop(0.5, 'rgba(0, 120, 220, 0.15)');
      grad.addColorStop(1, 'rgba(0, 0, 120, 0)');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw simulated feature contour box around highest activation zone
  if (condition !== 'intact') {
    ctx.strokeStyle = condition === 'cracked' ? '#ff2a1f' : '#d9a441';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(w * 0.2, h * 0.25, w * 0.6, h * 0.45);

    // Label tag
    ctx.setLineDash([]);
    ctx.fillStyle = condition === 'cracked' ? '#ff2a1f' : '#d9a441';
    ctx.fillRect(w * 0.2, h * 0.25 - 24, 180, 24);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`Grad-CAM Peak: ${(affectedPercent * 2.3).toFixed(1)}%`, w * 0.2 + 8, h * 0.25 - 7);
  }

  ctx.restore();
  return canvas.toDataURL('image/jpeg', 0.92);
}
