const https = require('https');

const token = process.argv[2];
const fileKey = process.argv[3];

if (!token || !fileKey) {
    console.log('Usage: node scripts/verify_figma_connection.js <FIGMA_ACCESS_TOKEN> <FILE_KEY>');
    process.exit(1);
}

const options = {
    hostname: 'api.figma.com',
    path: `/v1/files/${fileKey}`,
    method: 'GET',
    headers: {
        'X-Figma-Token': token
    }
};

const req = https.request(options, (res) => {
    console.log(`StatusCode: ${res.statusCode}`);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode === 200) {
            try {
                const json = JSON.parse(data);
                console.log('Success! Connection established.');
                console.log('File Name:', json.name);
                console.log('Last Modified:', json.lastModified);
                console.log('Thumbnail URL:', json.thumbnailUrl);
            } catch (e) {
                console.error('Error parsing JSON:', e.message);
            }
        } else {
            console.error('Failed to connect.');
            console.error('Response:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.end();
