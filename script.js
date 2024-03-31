function shortenURL() {
    const url = document.getElementById('urlInput').value;
    fetch('/api/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = `Shortened URL: ${location.origin}/api/${data.id}`;
    })
    .catch(console.error);
}
