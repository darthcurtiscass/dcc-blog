const newCommentHandler = async (event) => { //edit this page
    event.preventDefault();
  
    const content = document.querySelector('#comment').value.trim();
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    // const description = document.querySelector('#campaign-desc').value.trim();
  
    if (content) {
      const response = await fetch(`/api/comments`, {
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
  .querySelector('.input-group')
  .addEventListener('click', newCommentHandler);