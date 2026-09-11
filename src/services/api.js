export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json()
}

export function getHealth() {
  return apiRequest('/health')
}

export function getShipments() {
  return apiRequest('/shipments')
}

export function getShipment(shipmentId) {
  return apiRequest(`/shipments/${encodeURIComponent(shipmentId)}`)
}

export function getSensors(shipmentId) {
  const query = shipmentId
    ? `?shipment_id=${encodeURIComponent(shipmentId)}`
    : ''

  return apiRequest(`/sensors${query}`)
}

export function getAlerts() {
  return apiRequest('/alerts')
}

export function getTraceability(shipmentId) {
  return apiRequest(`/traceability/${encodeURIComponent(shipmentId)}`)
}

export function verifyQR(code) {
  return apiRequest('/qr/verify', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
}

export function verifyHash(data) {
  return apiRequest('/hash/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}