/**
 * Fallback-only wheel price table for the weapons charging calculator
 * (طلبات_صاحب_المتجر.md, "حاسبة شحن الأسلحة").
 *
 * The REAL price tables now live in the merchant's own theme settings
 * (twilight.json's weapon_wheel_prices collection) - editable from Salla's
 * dashboard with no code redeploy needed when prices change. This file is
 * only ever used when that setting's data isn't available on the page
 * (e.g. the standalone demo artifact), so it stays exactly as the one
 * confirmed-real example (gulf account, legendary weapon, gmlstore.app
 * screenshot 2026-11-12) rather than drifting out of sync with real prices.
 */
export const ACCOUNT_TYPES = [
  { id: 'gulf', label: 'الحساب الخليجي' },
  { id: 'medium', label: 'الحساب المتوسط' },
  { id: 'african', label: 'الحساب الأفريقي' },
];

export const WEAPON_WHEELS = [
  {
    id: 'legendary-10',
    label: 'السلاح الأسطوري (10 سحبات)',
    pulls: {
      gulf: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],
      medium: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],
      african: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],
    },
  },
];
