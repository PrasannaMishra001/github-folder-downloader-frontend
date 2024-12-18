document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const repoUrl = document.getElementById('repoUrl').value;
    const folderName = document.getElementById('folderName').value;
    const statusElement = document.getElementById('status');
    
    statusElement.textContent = 'Downloading...';
    statusElement.style.color = 'blue';
  
    // Use the exact Vercel deployment URL
    const backendUrl = 'https://github-folder-downloader-backend-9o5c5t5rm-prasannamishra.vercel.app/download';
  
    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoUrl, folderName }),
    })
    .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Download failed');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Download response:', data);
      statusElement.textContent = data.message || 'Download Complete!';
      statusElement.style.color = 'green';
    })
    .catch(err => {
      console.error('Full error:', err);
      statusElement.textContent = 'Error: ' + err.message;
      statusElement.style.color = 'red';
    });
  });