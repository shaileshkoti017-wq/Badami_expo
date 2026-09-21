import { MonumentVisitPlan, VisitTimingSlot } from '../types';

/**
 * Synthetic crowd model generator grounded in authentic Bagalkote climate & tourism patterns:
 * - Gates open at 6:00 AM (Cool sandstone ~24°C, lowest crowd)
 * - Peak influx occurs 10:30 AM – 1:30 PM (Tour buses from Hubli/Belagavi, afternoon heat up to 36°C)
 * - Evening cool down 4:30 PM – 6:30 PM (Golden hour photography, moderate crowds)
 */
export function generateVisitTimingPlan(
  monumentId: string,
  isWeekend: boolean = false
): MonumentVisitPlan {
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  
  // Base crowd multiplier based on popularity of site
  const siteMultiplier: Record<string, number> = {
    badami_caves: 1.15,
    pattadakal_virupaksha: 1.1,
    bhutanatha: 0.9,
    aihole_durga: 0.95,
    banashankari: 1.05,
    mahakuta: 0.85,
    kudalasangama: 0.95,
    pattadakal_mallikarjuna: 0.8
  };

  const mult = (siteMultiplier[monumentId] || 1.0) * (isWeekend ? 1.28 : 1.0);

  const slots: VisitTimingSlot[] = hours.map((hour) => {
    let rawDensity = 0;
    let temp = 24;
    let light = 'Gentle Morning Glow';

    if (hour <= 7) {
      rawDensity = 14 * mult;
      temp = 24;
      light = 'Serene Dawn & Low Shadows';
    } else if (hour <= 9) {
      rawDensity = 32 * mult;
      temp = 27;
      light = 'Crisp Architectural Illumination';
    } else if (hour <= 11) {
      rawDensity = 72 * mult;
      temp = 32;
      light = 'Bright Direct Sunlight';
    } else if (hour <= 13) {
      rawDensity = 94 * mult; // Peak bus tour arrivals
      temp = 36;
      light = 'Harsh Overhead Glare (High Sandstone Heat)';
    } else if (hour <= 15) {
      rawDensity = 78 * mult;
      temp = 35;
      light = 'Intense Heat Radiation';
    } else if (hour <= 17) {
      rawDensity = 58 * mult;
      temp = 30;
      light = 'Warm Sandstone Golden Hour';
    } else {
      rawDensity = 35 * mult;
      temp = 27;
      light = 'Dusk Reflection & Evening Breeze';
    }

    const clampedDensity = Math.min(100, Math.max(5, Math.round(rawDensity)));
    let recommendationLevel: 'Optimal' | 'Fair' | 'Peak Crowded' = 'Optimal';
    if (clampedDensity > 70) recommendationLevel = 'Peak Crowded';
    else if (clampedDensity > 40) recommendationLevel = 'Fair';

    const ampm = hour >= 12 ? (hour === 12 ? '12 PM' : `${hour - 12} PM`) : `${hour} AM`;

    return {
      hour,
      timeLabel: ampm,
      crowdDensity: clampedDensity,
      movingAvgDensity: clampedDensity, // Will smooth next
      temperatureC: temp,
      recommendationLevel,
      lightConditions: light
    };
  });

  // Apply 3-point moving average smoothing (simulating ARIMA / SMA forecast curve)
  for (let i = 0; i < slots.length; i++) {
    const prev = slots[Math.max(0, i - 1)].crowdDensity;
    const curr = slots[i].crowdDensity;
    const next = slots[Math.min(slots.length - 1, i + 1)].crowdDensity;
    slots[i].movingAvgDensity = Math.round((prev + curr * 2 + next) / 4);
  }

  // Current real-time simulated slot (based on time of day)
  const currentHour = new Date().getHours();
  const currentSlot = slots.find((s) => s.hour === currentHour) || slots[2]; // Default to morning slot

  let bestWindow = '6:30 AM – 9:30 AM';
  let recommendedAction = 'Optimal morning slot. Sandstone rocks remain cool; diffuse light enhances relief photography with minimal queueing.';
  
  if (monumentId === 'bhutanatha') {
    bestWindow = '7:00 AM – 9:00 AM or 5:00 PM – 6:30 PM (Sunset)';
    recommendedAction = 'Visit at late afternoon to witness Agastya Lake golden hour reflections against the red sandstone cliff.';
  } else if (monumentId === 'mahakuta') {
    bestWindow = '7:30 AM – 11:00 AM';
    recommendedAction = 'Shady forest grove offers protection from midday sun; peaceful morning atmosphere around the sacred Pushkarini pool.';
  }

  let sandstoneHeatLevel: 'Cool' | 'Warm' | 'Extreme Heat' = 'Cool';
  if (currentSlot.temperatureC >= 34) sandstoneHeatLevel = 'Extreme Heat';
  else if (currentSlot.temperatureC >= 29) sandstoneHeatLevel = 'Warm';

  return {
    monumentId,
    hourlySlots: slots,
    bestWindow,
    recommendedAction,
    crowdIndexNow: currentSlot.crowdDensity,
    sandstoneHeatLevel
  };
}
