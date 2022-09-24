(() => {
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  const getBtn = document.getElementById("getBtn");
  const postBtn = document.getElementById("postBtn");

  getBtn.onclick = () => {
    fetch(`/api/getLogin?username=${username.value}&password=${password.value}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
  }

  postBtn.onclick = () => {
    fetch('/api/postLogin', {
      method: 'POST',
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
  }
})();