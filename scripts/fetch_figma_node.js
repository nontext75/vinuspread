const https = require('https');

// Usage: node scripts/fetch_figma_node.js <TOKEN> <FILE_KEY> <NODE_ID>

const token = process.argv[2];
const fileKey = process.argv[3];
const nodeId = process.argv[4];

if (!token || !fileKey || !nodeId) {
    console.error('Usage: node scripts/fetch_figma_node.js <TOKEN> <FILE_KEY> <NODE_ID>');
    process.exit(1);
}

// Convert URL encoded node id (324-607) to API format (324:607) if necessary
// But usually API accepts whatever is in the URL if strictly followed, usually needs replacement of - with :
const formattedNodeId = nodeId.replace('-', ':');

const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${fileKey}/nodes?ids=${formattedNodeId}`,
    method: 'GET',
    headers: {
        'X-Figma-Token': token
    }
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            try {
                const json = JSON.parse(data);
                const node = json.nodes[formattedNodeId]?.document;

                if (node) {
                    console.log('--- Node Info ---');
                    console.log('Name:', node.name);
                    console.log('Type:', node.type);
                    console.log('ID:', node.id);
                    if (node.absoluteBoundingBox) {
                        console.log('Size:', `W: ${node.absoluteBoundingBox.width}, H: ${node.absoluteBoundingBox.height}`);
                    }
                    if (node.children) {
                        console.log('Children Count:', node.children.length);
                        node.children.forEach(child => {
                            console.log(`- [${child.type}] ${child.name}`);
                        });
                    }
                    // Attempt to extract text content if any
                    function extractText(n) {
                        let text = '';
                        if (n.type === 'TEXT') text += `[TEXT] ${n.name}: ${n.characters}\n`;
                        if (n.children) n.children.forEach(c => text += extractText(c));
                        return text;
                    }
                    console.log('\n--- Content Preview ---');
                    console.log(extractText(node).substring(0, 500)); // Limit output
                } else {
                    console.log('Node not found in response.');
                    console.log(JSON.stringify(json, null, 2));
                }
            } catch (e) {
                console.error('Error parsing JSON:', e.message);
            }
        } else {
            console.error('Failed to fetch node. Status:', res.statusCode);
            console.error(data);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.end();
