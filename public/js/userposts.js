const editPostHandler = async (event) => {
  //use this js file for the dashboard. You make new posts in the dashboard.
  //Change the HTML form for title elements, so that it has a different name from content in the class or refer to a different id.
  

  const id = document.querySelector("#unique-id").value.trim();
  const content = document.querySelector("#edit-content").value.trim();
  const title = document.querySelector("#edit-title").value.trim();
  const response = await fetch(`/api/posts/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, title, content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log(title, content);
    document.location.replace("/homepage");
  } else {
    console.log(title, content);
    alert("Failed to update post");
  }
};

const deletePostHandler = async (event) => {
  event.preventDefault();

  const id = document.querySelector("#unique-id").value.trim();
  const deleteResponse = await fetch(`delete/${id}`, {
    method: "DELETE",
    // body: JSON.stringify({ id, title, content }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (deleteResponse.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to update post");
  }
};

document
  .querySelector("#button-addon1")
  .addEventListener("click", editPostHandler);

document.querySelector("#delete").addEventListener("click", deletePostHandler);
