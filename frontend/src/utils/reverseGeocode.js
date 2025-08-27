// src/utils/reverseGeocode.js
// Replace the email with your contact email to comply with Nominatim policies.
const NOMINATIM_EMAIL = 'rahulkumarjha58978@gmail.com'; // <-- replace this
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

const roundCoordKey = (lat, lon, precision = 3) =>
  `${(Math.round(lat * 10**precision) / 10**precision).toFixed(precision)}:${(Math.round(lon * 10**precision) / 10**precision).toFixed(precision)}`;

function getCached(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (Date.now() - obj.ts > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return obj.value;
  } catch {
    return null;
  }
}

function setCached(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), value }));
  } catch {}
}

export async function reverseGeocode(latitude, longitude, { timeout = 8000 } = {}) {
  if (latitude == null || longitude == null) {
    throw new Error('latitude and longitude required');
  }

  const key = `revgeo:${roundCoordKey(latitude, longitude, 3)}`;
  const cached = getCached(key);
  if (cached) return cached; // { placeName, raw }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}&addressdetails=1&accept-language=en&email=${encodeURIComponent(NOMINATIM_EMAIL)}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      // note: browsers set User-Agent; we include email param for policy
      // adding a Referer header is not allowed in JS (browser controls it)
    });
    clearTimeout(id);

    if (!res.ok) {
      throw new Error(`Reverse geocode HTTP ${res.status}`);
    }
    const data = await res.json();
    const addr = data.address || {};

    // pick best human-readable place
    const placeName = addr.city || addr.town || addr.village || addr.county || addr.state || data.display_name || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;

    const result = { placeName, raw: data };
    setCached(key, result);
    return result;
  } catch (err) {
    clearTimeout(id);
    // return fallback so UI can show coords instead of failing hard
    return { placeName: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`, raw: null };
  }
}
