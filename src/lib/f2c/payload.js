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
  const canonical = {
    v: 1,
    chainId: String(chainId),
    seller: String(seller),
    schemeId: String(schemeId),
    rewardPct: roundRewardPct(rewardPct),
    metadata: metadata && Object.keys(metadata).length ? {
      sellerName: metadata.sellerName ?? undefined,
      note: metadata.note ?? undefined,
    } : undefined,
    expiresAt: Number(expiresAt),
    nonce: String(nonce),
  };

  // Remove undefined fields for compact JSON
  Object.keys(canonical).forEach((k) => {
    if (canonical[k] === undefined) delete canonical[k];
  });

  return canonical;
}

export function canonicalJSONStringify(obj) {
  // Deterministic stringify according to required key order
  const order = [
    'v',
    'chainId',
    'seller',
    'schemeId',
    'rewardPct',
    'metadata',
    'expiresAt',
    'nonce',
  ];

  function replacer(key, value) {
    return value;
  }

  function stringifyWithOrder(o) {
    if (o === null || typeof o !== 'object' || Array.isArray(o)) {
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



