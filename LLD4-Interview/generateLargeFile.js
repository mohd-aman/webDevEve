const fs = require('fs');
// Generate random content
const content = Math.random().toString(36).repeat(10000000); // Approximately 130MB

// Write content to file
fs.writeFileSync('big.file', content);
