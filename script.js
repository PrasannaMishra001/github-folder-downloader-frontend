document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const repoUrl = document.getElementById('repoUrl').value;
    const folderName = document.getElementById('folderName').value;
    const statusElement = document.getElementById('status');

    statusElement.textContent = 'Retrieving folder contents...';
    statusElement.style.color = 'blue';

    // Use the correct Vercel backend URL
    const backendUrl = 'https://github-folder-downloader-backend-go2cq5aow-prasannamishra.vercel.app/api/download';

    fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ repoUrl, folderName }),
    })
    .then(response => {
      console.log('Response status:', response.status);

      // Check for HTTP errors
      if (!response.ok) {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Request failed');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Detailed response:', data);

      if (data.success) {
        statusElement.textContent = `Retrieved ${data.fileCount} files`;
        statusElement.style.color = 'green';

        // Optional: Display file list
        console.log('Files:', data.files);
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    })
    .catch(err => {
      console.error('Complete error details:', err);
      statusElement.textContent = 'Error: ' + err.message;
      statusElement.style.color = 'red';
    });
});
