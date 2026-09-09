import { useState } from "react";
import HashVerificationCard from "./HashVerificationCard";

function HashVerification() {
  const [hash, setHash] = useState(
    "a71bc4f29d8e91ef"
  );

  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (hash.trim()) {
      setVerified(true);
    }
  };

  return (
    <div className="hash-page">

      <div className="page-heading">
        <div>
          <span className="section-label">
            BLOCKCHAIN INTEGRITY
          </span>

          <h1>Hash Verification</h1>

          <p>
            Verify that shipment records have not been
            tampered with.
          </p>
        </div>

        <div className="verified-header">
          <span>🔐</span>
          Integrity Protected
        </div>
      </div>

      <div className="hash-input-card">

        <div>
          <span className="section-label">
            VERIFY RECORD
          </span>

          <h2>Record Hash</h2>

          <p>
            Enter a transaction or record hash to
            validate its integrity.
          </p>
        </div>

        <div className="hash-input-row">

          <input
            type="text"
            value={hash}
            onChange={(event) => {
              setHash(event.target.value);
              setVerified(false);
            }}
            placeholder="Enter blockchain hash..."
          />

          <button
            className="primary-button"
            onClick={handleVerify}
          >
            🔍 Verify Hash
          </button>

        </div>

        {verified && (
          <div className="hash-success">
            <span>✓</span>

            <div>
              <strong>
                Hash Verified Successfully
              </strong>

              <p>
                The record matches the stored integrity
                reference.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="hash-cards-grid">

        <HashVerificationCard
          shipment="SHIP001"
          batch="BATCH-2026-001"
          status="Verified"
          hash="a71bc4...91ef"
          time="10:32 AM"
        />

        <HashVerificationCard
          shipment="SHIP002"
          batch="BATCH-2026-002"
          status="Verified"
          hash="f82ad1...42bc"
          time="10:28 AM"
        />

        <HashVerificationCard
          shipment="SHIP003"
          batch="BATCH-2026-003"
          status="Verified"
          hash="c91ef7...83ad"
          time="10:21 AM"
        />
      </div>

      <div className="integrity-explanation">

        <div className="explanation-icon">
          🔗
        </div>

        <div>
          <h3>
            Tamper-Evident Record Chain
          </h3>

          <p>
            Fresh Guard uses cryptographic hashes to
            detect unauthorized changes in important
            traceability records. Each record can be
            checked against its stored integrity reference.
          </p>
        </div>

      </div>
    </div>
  );
}

export default HashVerification;