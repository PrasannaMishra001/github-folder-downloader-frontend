document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const repoUrl = document.getElementById('repoUrl').value;
    const folderName = document.getElementById('folderName').value;

    document.getElementById('status').textContent = 'Downloading...';

    fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl, folderName }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('status').textContent = 'Download Complete!';
        } else {
            document.getElementById('status').textContent = 'Error: ' + data.message;
        }
    })
    .catch(err => {
        document.getElementById('status').textContent = 'Error: ' + err.message;
    });
});
