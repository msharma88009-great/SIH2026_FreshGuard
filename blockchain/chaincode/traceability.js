'use strict';

const { Contract } = require('fabric-contract-api');

class TraceabilityContract extends Contract {
    async CreateRecord(ctx, recordId, shipmentId, eventType, stage, timestamp, payloadHash, previousHash) {
        const exists = await this.RecordExists(ctx, recordId);
        if (exists) {
            throw new Error(`Record ${recordId} already exists`);
        }

        const record = {
            recordId,
            shipmentId,
            eventType,
            stage,
            timestamp,
            payloadHash,
            previousHash,
            docType: 'traceabilityRecord'
        };

        await ctx.stub.putState(recordId, Buffer.from(JSON.stringify(record)));
        return JSON.stringify(record);
    }

    async ReadRecord(ctx, recordId) {
        const data = await ctx.stub.getState(recordId);
        if (!data || data.length === 0) {
            throw new Error(`Record ${recordId} does not exist`);
        }
        return data.toString();
    }

    async RecordExists(ctx, recordId) {
        const data = await ctx.stub.getState(recordId);
        return data && data.length > 0;
    }

    async UpdateRecordHash(ctx, recordId, payloadHash) {
        const data = await ctx.stub.getState(recordId);
        if (!data || data.length === 0) {
            throw new Error(`Record ${recordId} does not exist`);
        }

        const record = JSON.parse(data.toString());
        record.payloadHash = payloadHash;
        await ctx.stub.putState(recordId, Buffer.from(JSON.stringify(record)));
        return JSON.stringify(record);
    }
}

module.exports = TraceabilityContract;
