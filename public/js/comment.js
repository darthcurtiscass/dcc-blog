const newCommentHandler = async (event) => { //edit this page
    event.preventDefault();
  
    const content = document.querySelector('#comment').value.trim();
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    // const description = document.querySelector('#campaign-desc').value.trim();
    const post_id = document.querySelector('input[name="post-id"]').value;
    console.log("id", post_id)

    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        console.log(content)
         console.log("id", post_id)
        document.location.replace('/');
       
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('.input-group')
  .addEventListener('click', newCommentHandler);