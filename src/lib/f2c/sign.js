import * as ed25519 from '@noble/ed25519';
import { canonicalJSONStringify } from './payload';

// Noble uses synchronous verify/sign when a sync PRNG is available.
// For Expo, ed25519 will work with built-in crypto.

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function bytesToBase64Safe(bytes) {
  try {
    if (typeof globalThis.btoa === 'function') {
      let binary = '';
      bytes.forEach(b => binary += String.fromCharCode(b));
      return globalThis.btoa(binary);
    }
  } catch {}
  try {
    // eslint-disable-next-line no-undef
    if (typeof Buffer !== 'undefined') {
      // @ts-ignore Buffer may exist via polyfill
      return Buffer.from(bytes).toString('base64');
    }
  } catch {}
  // Fallback to hex with prefix so verifiers can handle it
  return `hex:${bytesToHex(bytes)}`;
}

export async function signEnvelope(payload, privateKeyBytes) {
  const message = new TextEncoder().encode(canonicalJSONStringify(payload));
  const signature = await ed25519.sign(message, privateKeyBytes);
  const publicKey = await ed25519.getPublicKey(privateKeyBytes);

  return {
    payload,
    sig: bytesToBase64Safe(signature),
    pubKey: bytesToBase64Safe(publicKey),
  };
}

export async function verifyEnvelope(envelope) {
  const message = new TextEncoder().encode(canonicalJSONStringify(envelope.payload));
  function decode(s) {
    if (s.startsWith('hex:')) {
      const hex = s.slice(4);
      const out = new Uint8Array(hex.length / 2);
      for (let i = 0; i < out.length; i++) {
        out[i] = parseInt(hex.substr(i * 2, 2), 16);
      }
      return out;
    }
    try {
      if (typeof globalThis.atob === 'function') {
        const bin = globalThis.atob(s);
        const out = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
        return out;
      }
    } catch {}
    try {
      // eslint-disable-next-line no-undef
      if (typeof Buffer !== 'undefined') {
        // @ts-ignore Buffer may exist via polyfill
        return Uint8Array.from(Buffer.from(s, 'base64'));
      }
    } catch {}
    throw new Error('Unable to decode base64/hex input');
  }
  const sig = decode(envelope.sig);
  const pub = decode(envelope.pubKey);
  return ed25519.verify(sig, message, pub);
}
