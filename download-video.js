const fs = require('fs');
const https = require('https');

// Using a known reliable ink drop video from a codepen asset
// This is typically hosted on cdn.pixabay or similar but accessible
const url = "https://assets.codepen.io/1462889/ink-drop.mp4";
const file = fs.createWriteStream("public/videos/ink_spread.mp4");

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

console.log(`Downloading from ${url}...`);

https.get(url, options, (response) => {
    if (response.statusCode === 301 || response.statusCode === 302) {
        console.log(`Redirecting to ${response.headers.location}...`);
        https.get(response.headers.location, options, (redirectResponse) => {
            redirectResponse.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log("Download completed!");
            });
        });
        return;
    }

    if (response.statusCode !== 200) {
        console.error(`Failed with status code: ${response.statusCode}`);
        return;
    }

    response.pipe(file);

    file.on('finish', () => {
        file.close();
        console.log("Download completed!");
    });
}).on('error', (err) => {
    fs.unlink("public/videos/ink_spread.mp4");
    console.error(`Error: ${err.message}`);
});
