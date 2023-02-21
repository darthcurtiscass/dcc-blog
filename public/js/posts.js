  const newPostHandler = async (event) => { //use this js file for the dashboard. You make new posts in the dashboard.
    event.preventDefault();
  
    const id = document.querySelector('#unique-id').value.trim();
    const content = document.querySelector('#form-content').value.trim();
    const title = document.querySelector('#form-title').value.trim(); //Change the HTML form for title elements, so that it has a different name from content in the class or refer to a different id.
    // const needed_funding = document.querySelector('#project-funding').value.trim();
    // const description = document.querySelector('#campaign-desc').value.trim();
    const postId = document.querySelector('input[name="post-id"]').value;


    if (title && content) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ id, content, title }),
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