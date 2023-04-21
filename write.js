document.getElementById('articleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const imageFile = document.getElementById('image').files[0];
    const content = document.getElementById('content').value;
    const tag = document.getElementById('tag').value.split(',').map(t => t.trim());
    const details = document.getElementById('details').value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', imageFile);
    formData.append('content', content);
    formData.append('tag', JSON.stringify(tag));
    formData.append('details', details);

    try {
        const response = await fetch('http://localhost:3000/api/data', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Article submitted successfully');
            document.getElementById('articleForm').reset();
        } else {
            alert('Failed to submit the article');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit the article');
    }
});