import { useMemo, useState } from "react";
import ShipmentCard from "./ShipmentCard";
import ShipmentDetails from "./ShipmentDetails";

const shipments = [
  {
    id: "SHIP001",
    product: "Fresh Tomatoes",
    source: "Nashik",
    destination: "Mumbai",
    currentLocation: "Igatpuri",
    status: "In Transit",
    temperature: "6.4°C",
    humidity: "74.6%",
    gas: "166.7 ppm",
    freshness: 92,
    batchId: "BATCH-2026-001",
  },
  {
    id: "SHIP002",
    product: "Green Vegetables",
    source: "Pune",
    destination: "Delhi",
    currentLocation: "Indore",
    status: "Alert",
    temperature: "8.7°C",
    humidity: "79.2%",
    gas: "214.5 ppm",
    freshness: 76,
    batchId: "BATCH-2026-002",
  },
  {
    id: "SHIP003",
    product: "Mangoes",
    source: "Ratnagiri",
    destination: "Pune",
    currentLocation: "Kolhapur",
    status: "In Transit",
    temperature: "5.9°C",
    humidity: "72.4%",
    gas: "154.2 ppm",
    freshness: 95,
    batchId: "BATCH-2026-003",
  },
  {
    id: "SHIP004",
    product: "Dairy Products",
    source: "Kolhapur",
    destination: "Mumbai",
    currentLocation: "Mumbai",
    status: "Delivered",
    temperature: "4.2°C",
    humidity: "68.5%",
    gas: "121.4 ppm",
    freshness: 98,
    batchId: "BATCH-2026-004",
  },
];

function Shipments() {
  const [search, setSearch] = useState("");
  const [selectedShipment, setSelectedShipment] =
    useState(null);

  const filteredShipments = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return shipments;
    }

    return shipments.filter((shipment) =>
      `${shipment.id} ${shipment.product} ${shipment.source} ${shipment.destination} ${shipment.status}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  if (selectedShipment) {
    return (
      <ShipmentDetails
        shipment={selectedShipment}
        onBack={() => setSelectedShipment(null)}
      />
    );
  }

  return (
    <div className="shipments-page">

      {/* Page Heading */}

      <div className="page-heading">
        <div>
          <span className="section-label">
            LOGISTICS
          </span>

          <h1>Shipments</h1>

          <p>
            Monitor and manage farm-to-fork shipments.
          </p>
        </div>

        <button className="primary-button">
          + New Shipment
        </button>
      </div>

      {/* Search and Filters */}

      <div className="shipment-toolbar">

        <div className="shipment-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search shipment, product or route..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <div className="filter-buttons">
          <button className="filter-button active">
            All
          </button>

          <button className="filter-button">
            In Transit
          </button>

          <button className="filter-button">
            Alert
          </button>

          <button className="filter-button">
            Delivered
          </button>
        </div>

      </div>

      {/* Shipment Summary */}

      <div className="shipment-summary">

        <span>
          Showing{" "}
          <strong>
            {filteredShipments.length}
          </strong>{" "}
          shipments
        </span>

        <span>
          ● Live tracking enabled
        </span>

      </div>

      {/* Shipment Cards */}

      <div className="shipment-cards-grid">

        {filteredShipments.map((shipment) => (
          <ShipmentCard
            key={shipment.id}
            shipment={shipment}
            onClick={() =>
              setSelectedShipment(shipment)
            }
          />
        ))}

      </div>

      {/* No Results */}

      {filteredShipments.length === 0 && (
        <div className="empty-state">

          <div>📦</div>

          <h2>
            No shipments found
          </h2>

          <p>
            Try searching with another shipment ID,
            product or location.
          </p>

        </div>
      )}

    </div>
  );
}

export default Shipments;