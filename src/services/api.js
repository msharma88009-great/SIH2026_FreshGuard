export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function apiRequest(endpoint, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), options.timeout ?? 5000)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, signal: controller.signal, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(payload.error || `API request failed: ${response.status}`)
    return payload
  } finally { clearTimeout(timeout) }
}

export const getHealth = () => apiRequest('/health')
export const getShipments = () => apiRequest('/shipments')
export const getShipment = (id) => apiRequest(`/shipments/${encodeURIComponent(id)}`)
export const createShipment = (data) => apiRequest('/shipments', { method: 'POST', body: JSON.stringify(data) })
export const getSensors = (shipmentId) => apiRequest(`/sensors${shipmentId ? `?shipment_id=${encodeURIComponent(shipmentId)}` : ''}`)
export const getAlerts = () => apiRequest('/alerts')
export const getTraceability = (id) => apiRequest(`/traceability/${encodeURIComponent(id)}`)
export const verifyQR = (code) => apiRequest('/qr/verify', { method: 'POST', body: JSON.stringify({ code }) })
export const verifyHash = (data) => apiRequest('/hash/verify', { method: 'POST', body: JSON.stringify(data) })
export const syncSensorReadings = (records) => apiRequest('/sensors/sync', { method: 'POST', body: JSON.stringify({ records }) })
