  const newPostHandler = async (event) => { //edit this page
    event.preventDefault();
  
    const content = document.querySelector('.card').value.trim();
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    // const description = document.querySelector('#campaign-desc').value.trim();
  
    if (content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(content)
        document.location.replace('/homepage');
       
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);