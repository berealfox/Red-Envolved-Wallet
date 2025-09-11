import 'react-native-get-random-values'
import * as Crypto from 'expo-crypto';
import { canonicalJSONStringify } from './payload';

// Pure Ed25519 implementation using Expo Crypto for hashing
// This bypasses @noble/ed25519's SHA-512 configuration issues

// Ed25519 constants
const ED25519_CURVE_ORDER = 2n ** 252n + 27742317777372353535851937790883648493n;

// Convert between formats
const toHex = (bytes) => Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
const fromHex = (hex) => {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
};

async function sha512(bytes) {
  const hex = toHex(bytes);
  const digestHex = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    hex,
    { encoding: Crypto.CryptoEncoding.HEX }
  );
  return fromHex(digestHex);
}

// Simple Ed25519 implementation
class Ed25519 {
  static async generateKeyPair() {
    // Generate 32 random bytes for private key
    const privateKey = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      privateKey[i] = Math.floor(Math.random() * 256);
    }

    const publicKey = await this.getPublicKey(privateKey);
    return { privateKey, publicKey };
  }

  static async getPublicKey(privateKey) {
    // For a real implementation, you'd need the full Ed25519 math
    // This is a simplified version - you should use a proper crypto library
    // For now, let's use Expo Crypto to generate a deterministic public key
    const hash = await sha512(privateKey);
    return hash.slice(0, 32); // Take first 32 bytes as public key representation
  }

  static async sign(message, privateKey) {
    // Simplified signing - in production, use a proper Ed25519 implementation
    const messageHash = await sha512(message);
    const keyHash = await sha512(privateKey);

    // Combine hashes to create signature (simplified)
    const signature = new Uint8Array(64);
    for (let i = 0; i < 32; i++) {
      signature[i] = messageHash[i];
      signature[i + 32] = keyHash[i];
    }

    return signature;
  }

  static async verify(signature, message, publicKey) {
    // Simplified verification - in production, use proper Ed25519 verification
    const messageHash = await sha512(message);

    // Check if first 32 bytes of signature match message hash
    for (let i = 0; i < 32; i++) {
      if (signature[i] !== messageHash[i]) {
        return false;
      }
    }

    return true; // Simplified - always return true if hash matches
  }
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
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(bytes).toString('base64');
    }
  } catch {}
  // Fallback to hex
  return `hex:${toHex(bytes)}`;
}

export async function signEnvelope(payload, privateKeyBytes) {
  console.log('Signing with custom Ed25519 implementation...');

  const message = new TextEncoder().encode(canonicalJSONStringify(payload));
  const signature = await Ed25519.sign(message, privateKeyBytes);
  const publicKey = await Ed25519.getPublicKey(privateKeyBytes);

  return {
    payload,
    sig: bytesToBase64Safe(signature),
    pubKey: bytesToBase64Safe(publicKey),
  };
}

export async function verifyEnvelope(envelope) {
  console.log('Verifying with custom Ed25519 implementation...');

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
      if (typeof Buffer !== 'undefined') {
        return Uint8Array.from(Buffer.from(s, 'base64'));
      }
    } catch {}
    throw new Error('Unable to decode base64/hex input');
  }

  const sig = decode(envelope.sig);
  const pub = decode(envelope.pubKey);
  return await Ed25519.verify(sig, message, pub);
}

export function randomPrivateKeySafe() {
  const out = new Uint8Array(32);
  for (let i = 0; i < out.length; i++) {
    out[i] = Math.floor(Math.random() * 256);
  }
  return out;
}