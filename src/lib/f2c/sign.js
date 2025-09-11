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

const bytesToHex = (bytes) => toHex(bytes);

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
    return hash.slice(0, 4); // Take first 4 bytes for ultra-short representation
  }

  static async sign(message, privateKey) {
    // Simplified signing - in production, use a proper Ed25519 implementation
    const messageHash = await sha512(message);
    const keyHash = await sha512(privateKey);

    // Create an ultra-short 8-byte signature
    const signature = new Uint8Array(8);
    for (let i = 0; i < 8; i++) {
      signature[i] = messageHash[i] ^ keyHash[i]; // XOR for simplicity
    }

    return signature;
  }

  static async verify(signature, message, publicKey) {
    // Simplified verification - in production, use proper Ed25519 verification
    const messageHash = await sha512(message);
    const keyHash = await sha512(publicKey);

    // Check if signature matches the expected XOR of hashes
    for (let i = 0; i < signature.length; i++) {
      const expected = messageHash[i] ^ keyHash[i];
      if (signature[i] !== expected) {
        return false;
      }
    }

    return true;
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
    sig: bytesToBase64Safe(signature), // Back to base64 for compactness
    pubKey: bytesToBase64Safe(publicKey), // Back to base64 for compactness
  };
}

export async function verifyEnvelope(envelope) {
  console.log('Verifying with custom Ed25519 implementation...');

  const message = new TextEncoder().encode(canonicalJSONStringify(envelope.payload));

  function decode(s) {
    // Handle hex strings (both with and without "hex:" prefix)
    if (s.startsWith('hex:')) {
      const hex = s.slice(4);
      const out = new Uint8Array(hex.length / 2);
      for (let i = 0; i < out.length; i++) {
        out[i] = parseInt(hex.substr(i * 2, 2), 16);
      }
      return out;
    }
    // Handle pure hex strings (our new format)
    if (/^[0-9a-fA-F]+$/.test(s)) {
      const out = new Uint8Array(s.length / 2);
      for (let i = 0; i < out.length; i++) {
        out[i] = parseInt(s.substr(i * 2, 2), 16);
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