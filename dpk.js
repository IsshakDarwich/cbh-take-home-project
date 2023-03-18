const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function deterministicPartitionKey(event) {  

  if(!event) return TRIVIAL_PARTITION_KEY;

  let candidate;
  if (event.partitionKey) {
    candidate = event.partitionKey;
    candidate = typeof candidate !== "string" ? JSON.stringify(candidate) : candidate;
  } else {
    candidate = crypto.createHash("sha3-512").update(JSON.stringify(event))
    .digest("hex");
  }
  

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};

exports.deterministicPartitionKey = deterministicPartitionKey;