document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const repoUrl = document.getElementById('repoUrl').value;
    const folderName = document.getElementById('folderName').value;
    const statusElement = document.getElementById('status');
    
    statusElement.textContent = 'Downloading...';
    statusElement.style.color = 'blue';
  
    fetch('https://github-folder-downloader-backend-9o5c5t5rm-prasannamishra.vercel.app/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoUrl, folderName }),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Download failed');
        });
      }
      return response.json();
    })
    .then(data => {
      statusElement.textContent = 'Download Complete!';
      statusElement.style.color = 'green';
    })
    .catch(err => {
      statusElement.textContent = 'Error: ' + err.message;
      statusElement.style.color = 'red';
      console.error('Download error:', err);
    });
  });