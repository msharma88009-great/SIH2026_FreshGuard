import { useEffect, useState } from 'react'
import ShipmentCard from './ShipmentCard'
import ShipmentDetails from './ShipmentDetails'
import { getShipments } from '../services/api'

export default function Shipments() {
  const [shipments, setShipments] = useState([])
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadShipments() {
      try {
        const result = await getShipments()
        setShipments(result.data || [])
      } catch (error) {
        console.error('Shipments API error:', error)
      } finally {
        setLoading(false)
      }
    }

    loadShipments()
  }, [])

  if (selectedShipment) {
    return (
      <ShipmentDetails
        shipment={selectedShipment}
        onBack={() => setSelectedShipment(null)}
      />
    )
  }

  return (
    <div>
      <div className="page-title-row">
        <div>
          <h2>Shipments</h2>
          <p>Monitor all active and completed cold-chain shipments.</p>
        </div>
      </div>

      {loading ? (
        <div className="panel">
          <p>Loading shipments...</p>
        </div>
      ) : shipments.length === 0 ? (
        <div className="panel">
          <p>No shipments found.</p>
        </div>
      ) : (
        <div className="shipment-grid">
          {shipments.map((shipment) => (
            <ShipmentCard
              key={shipment.shipment_id}
              shipment={shipment}
              onClick={() => setSelectedShipment(shipment)}
            />
          ))}
        </div>
      )}
    </div>
  )
}