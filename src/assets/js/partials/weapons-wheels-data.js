/**
 * Per-wheel, per-account-type CP pull-cost tables for the weapons charging
 * calculator (طلبات_صاحب_المتجر.md, "حاسبة شحن الأسلحة").
 *
 * Only the "legendary-10" wheel's "gulf" table is REAL data, taken directly
 * from the merchant's own reference screenshot (gmlstore.app, 2026-11-12).
 * Every other table below is a placeholder copy of that same real table,
 * clearly marked - NOT real numbers for those account types/wheels. Replace
 * each TODO block with the real table once صاحب المتجر sends it, following
 * the exact same shape: one number per pull, cheapest first.
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
    // Real table (gulf) - confirmed from gmlstore.app screenshot.
    pulls: {
      gulf: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],
      // TODO: real "medium" account table - placeholder copy of "gulf" for now.
      medium: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],
      // TODO: real "african" account table - placeholder copy of "gulf" for now.
      african: [30, 80, 120, 300, 500, 800, 1300, 2000, 2800, 4700],
    },
  },
];

export function getWheel(wheelId) {
  return WEAPON_WHEELS.find((w) => w.id === wheelId) || WEAPON_WHEELS[0];
}
