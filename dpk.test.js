const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the same hash for the same event", () => {
    const event1 = event2 = 'test-key';
    const hash1 = deterministicPartitionKey(event1);
    const hash2 = deterministicPartitionKey(event2);
    expect(hash1).toBe(hash2);
  });
  
  it("Returns the current partitionKey", () => {
    const event = { 'partitionKey': 'test-key'};
    const hash = deterministicPartitionKey(event);
    expect(hash).toBe(event.partitionKey);
  });

  it('Returns the current partitionKey transformed to string', () => {
    const event = { 'partitionKey': 123};
    const hash = deterministicPartitionKey(event);
    expect(hash).toBe(String(event.partitionKey));
  });

  it('Returns a hash of partitionKey if its lenght > 256', () => {
    const event = { 'partitionKey': 'k'.repeat(257)};
    const hash1 = deterministicPartitionKey(event);
    const hash2 = crypto.createHash("sha3-512").update(event.partitionKey).digest("hex");
    expect(hash1).toBe(hash2);
  });

});