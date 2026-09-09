export const sensorData = {
  temperature: 4.2,
  humidity: 68,
  gasLevel: 12,
  containerStatus: "Normal",
  freshnessScore: 92,
};

export const shipments = [
  {
    id: "FG-2026-001",
    product: "Fresh Tomatoes",
    origin: "Nashik Farm",
    destination: "Delhi Retail Hub",
    status: "In Transit",
    temperature: 4.2,
    humidity: 68,
    freshness: 92,
    lastUpdate: "2 min ago",
  },
  {
    id: "FG-2026-002",
    product: "Green Vegetables",
    origin: "Pune Farm",
    destination: "Mumbai Market",
    status: "Delivered",
    temperature: 5.1,
    humidity: 71,
    freshness: 88,
    lastUpdate: "18 min ago",
  },
  {
    id: "FG-2026-003",
    product: "Mangoes",
    origin: "Ratnagiri Farm",
    destination: "Bangalore Hub",
    status: "In Transit",
    temperature: 7.8,
    humidity: 74,
    freshness: 81,
    lastUpdate: "5 min ago",
  },
  {
    id: "FG-2026-004",
    product: "Potatoes",
    origin: "Agra Farm",
    destination: "Jaipur Warehouse",
    status: "At Warehouse",
    temperature: 6.4,
    humidity: 65,
    freshness: 86,
    lastUpdate: "11 min ago",
  },
];

export const alerts = [
  {
    id: 1,
    type: "Temperature",
    severity: "High",
    message: "Temperature exceeded safe threshold",
    shipmentId: "FG-2026-003",
    time: "5 min ago",
  },
  {
    id: 2,
    type: "Humidity",
    severity: "Medium",
    message: "Humidity level slightly above recommended range",
    shipmentId: "FG-2026-002",
    time: "18 min ago",
  },
  {
    id: 3,
    type: "Gas",
    severity: "Low",
    message: "Gas level increased slightly",
    shipmentId: "FG-2026-001",
    time: "24 min ago",
  },
];

export const traceabilityEvents = [
  {
    stage: "Farm",
    location: "Nashik, Maharashtra",
    status: "Completed",
    time: "08 Sep 2026, 06:30 AM",
    description: "Produce harvested and batch registered.",
  },
  {
    stage: "Collection",
    location: "Nashik Collection Center",
    status: "Completed",
    time: "08 Sep 2026, 10:15 AM",
    description: "Batch received and sensor monitoring started.",
  },
  {
    stage: "Processing",
    location: "Food Processing Unit",
    status: "Completed",
    time: "08 Sep 2026, 03:20 PM",
    description: "Produce sorted, cleaned and packed.",
  },
  {
    stage: "Transport",
    location: "Cold Chain Vehicle",
    status: "Active",
    time: "09 Sep 2026, 09:40 AM",
    description: "Shipment currently under IoT monitoring.",
  },
  {
    stage: "Retail",
    location: "Delhi Retail Hub",
    status: "Pending",
    time: "Expected 10 Sep 2026",
    description: "Shipment awaiting delivery.",
  },
];

export const hashRecords = [
  {
    recordId: "FG-2026-001",
    batchId: "BATCH-NK-001",
    hash: "8f42a91c7d3e5b2a9f01c4d8e6a731bc",
    blockchain: "Hyperledger Fabric",
    status: "Verified",
    timestamp: "09 Sep 2026, 09:42 AM",
  },
  {
    recordId: "FG-2026-002",
    batchId: "BATCH-PN-002",
    hash: "3b91f7a62c8d4e109ab52f6c731de845",
    blockchain: "Hyperledger Fabric",
    status: "Verified",
    timestamp: "09 Sep 2026, 09:35 AM",
  },
];

export const temperatureHistory = [
  3.8, 4.1, 4.3, 4.0, 4.5,
  5.1, 4.8, 4.2, 4.1, 4.2,
];

export const humidityHistory = [
  64, 65, 67, 66, 68,
  70, 69, 68, 67, 68,
];

export const gasHistory = [
  8, 9, 10, 9, 11,
  12, 14, 13, 12, 12,
];