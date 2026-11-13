/**
 * Fallback-only wheel price table for the weapons charging calculator
 * (طلبات_صاحب_المتجر.md, "حاسبة شحن الأسلحة").
 *
 * The REAL price tables now live in the merchant's own theme settings
 * (twilight.json's weapon_wheel_prices collection) - editable from Salla's
 * dashboard with no code redeploy needed when prices change. This file is
 * only ever used when that setting's data isn't available on the page
 * (e.g. the standalone demo artifact), so it stays in sync with the real
 * figures صاحب المتجر confirmed (2026-11-13) rather than drifting out of
 * date - all 5 totals here are verified against his own stated "إجمالي CP"
 * per wheel.
 */
export const ACCOUNT_TYPES = [
  { id: 'gulf', label: 'الحساب الخليجي' },
  { id: 'medium', label: 'الحساب المتوسط' },
  { id: 'african', label: 'الحساب الأفريقي' },
];

export const WEAPON_WHEELS = [
  {
    id: 'legendary-weapon',
    label: 'السلاح الأسطوري (10 سحبات)',
    pulls: {
      gulf: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],
      medium: [20, 55, 80, 210, 350, 560, 900, 1400, 1900, 3200],
      african: [10, 30, 50, 120, 200, 320, 520, 800, 1100, 1800],
    },
  },
  {
    id: 'legendary-character',
    label: 'الشخصية الأسطورية (10 سحبات)',
    pulls: {
      gulf: [30, 80, 120, 300, 500, 800, 1300, 2000, 3900, 5500],
      medium: [20, 55, 80, 210, 350, 560, 900, 1400, 2700, 3800],
      african: [10, 30, 50, 120, 200, 320, 520, 800, 1500, 2200],
    },
  },
  {
    id: 'mythic-weapon',
    label: 'سلاح الميثك (10 سحبات)',
    pulls: {
      gulf: [30, 80, 120, 300, 500, 800, 1300, 2400, 3400, 5800],
      medium: [20, 55, 80, 210, 350, 560, 900, 1600, 2300, 4000],
      african: [10, 30, 50, 120, 200, 320, 520, 960, 1300, 2300],
    },
  },
  {
    id: 'mythic-character',
    label: 'شخصية الميثك (10 سحبات)',
    pulls: {
      gulf: [50, 130, 220, 400, 700, 1100, 1700, 2800, 4200, 6700],
      medium: [35, 90, 155, 300, 490, 770, 1200, 2000, 2900, 4700],
      african: [20, 50, 90, 160, 280, 440, 680, 1100, 1700, 2700],
    },
  },
  {
    id: 'legendary-weapon-7',
    label: 'عجلة 7 سحبات (سلاح أسطوري)',
    pulls: {
      gulf: [30, 120, 350, 800, 1600, 2800, 3900],
      medium: [20, 80, 250, 550, 1100, 2000, 2600],
      african: [10, 50, 140, 300, 600, 1100, 1600],
    },
  },
];
