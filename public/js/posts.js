  const newPostHandler = async (event) => { //use this js file for the dashboard. You make new posts in the dashboard.
    event.preventDefault();
  
    const content = document.querySelector('.form-control').value.trim();
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    // const description = document.querySelector('#campaign-desc').value.trim();
    const postId = document.querySelector('input[name="post-id"]').value;


    if (content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ content, postId }),
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
  .querySelector('#button-addon1')
  .addEventListener('click', newPostHandler);