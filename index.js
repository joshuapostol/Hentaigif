const express = require('express');
const axios = require('axios');

const app = express();

// Array of GIF links
const gifLinks = [
    "https://el.phncdn.com/gif/39893321.gif",
    "https://el.phncdn.com/gif/48812011.gif",
    "https://el.phncdn.com/gif/40556931.gif",
    "https://el.phncdn.com/gif/40556981.gif",
    "https://el.phncdn.com/gif/40556111.gif",
    "https://el.phncdn.com/gif/40556051.gif",
    "https://el.phncdn.com/gif/40557001.gif",
    "https://el.phncdn.com/gif/40557011.gif",
];

// Function to get a random GIF link
function getRandomGifLink() {
    const randomIndex = Math.floor(Math.random() * gifLinks.length);
    return gifLinks[randomIndex];
}

// Endpoint to get a random GIF link
app.get('/random-gif', async (req, res) => {
    try {
        // Get a random GIF link
        const gifLink = getRandomGifLink();
        
        // Fetch the GIF file using Axios
        const response = await axios.get(gifLink, {
            responseType: 'stream' // Ensure response type is stream
        });

        // Set the appropriate headers for the GIF file
        res.setHeader('Content-Type', 'image/gif');

        // Pipe the GIF stream to the response
        response.data.pipe(res);
    } catch (error) {
        // Handle errors
        console.error("Error fetching GIF:", error);
        res.status(500).json({ error: "Could not fetch GIF" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
