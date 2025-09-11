// Canonical payload builder for F2C QR
// Keep a stable key order to ensure deterministic signing

export function roundRewardPct(value) {
  const clamped = Math.min(100, Math.max(3, Number(value || 0)));
  return Math.round(clamped * 100) / 100; // 2 dp
}

export function buildCanonicalPayload({
  chainId,
  seller,
  schemeId,
  rewardPct,
  metadata = {},
  expiresAt,
  nonce,
}) {
  // Ultra-compact format - just essential data
  const canonical = {
    v: 1,
    c: 'aqy', // Fixed chain ID
    s: String(seller).slice(-8), // Last 8 chars of seller address
    i: 1, // Fixed scheme ID as number
    r: Math.round(roundRewardPct(rewardPct)), // Integer reward %
    e: Math.floor(Number(expiresAt) / 1000), // Unix timestamp in seconds
    n: String(nonce).slice(0, 4), // Just 4 char nonce
  };

  return canonical;
}

export function canonicalJSONStringify(obj) {
  // Deterministic stringify according to required key order
  const order = [
    'v',
    'c',
    's',
    'i',
    'r',
    'e',
    'n',
  ];

  function replacer(key, value) {
    return value;
  }

  function stringifyWithOrder(o) {
    if (o === null || typeof o !== 'object' || Array.isArray(o)) {dd 
      return JSON.stringify(o);
    }
    const keys = (o === obj ? order : Object.keys(o).sort());
    const parts = [];
    for (const k of keys) {
      if (o[k] === undefined) continue;
      parts.push(`${JSON.stringify(k)}:${stringifyWithOrder(o[k])}`);
    }
    return `{${parts.join(',')}}`;
  }

  return stringifyWithOrder(obj);
}



