function getpost( userid) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/posts?userId=' + userid);

    request.send();

    request.onload = function() {
        let data = JSON.parse(this.response);
        // place posts inside the posts-list element so the Posts header remains
        let postsList = document.getElementById('posts-list') || document.getElementById('posts-div');
            postsList.innerHTML = '';
        data.forEach(function(post) {
            let postelement = document.createElement('article');
            postelement.classList.add('post-card');
            postelement.innerHTML = `
                <div class="post-title">${post.title}</div>
                <div class="post-body">${post.body}</div>
            `;
            postsList.appendChild(postelement);
        });
    }
}
function geusers() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/users');
    request.send();

    request.onload = function() {
        let data = JSON.parse(this.response);
        let userdiv = document.getElementById('users-list');
            userdiv.innerHTML = '';
        data.forEach(function(user) {
            let userelement = document.createElement('div')     ;
            userelement.classList.add('user-card');
           userelement.innerHTML = `
    <div class="user-avatar" aria-hidden="true"></div>
    <div class="user-meta">
      <div class="user-name">${user.name}</div>
      <div class="user-email">${user.email}</div>
    </div>
`;
          // make the whole card clickable to load the user's posts
          userelement.style.cursor = 'pointer';
              // click handler: toggle active class and load posts
              userelement.addEventListener('click', function() {
                  // remove active from any other card
                  document.querySelectorAll('.user-card.active').forEach(function(el){ el.classList.remove('active'); });
                  userelement.classList.add('active');
                  getpost(user.id);
              });

          userdiv.appendChild(userelement);

        });
            // if there's at least one user, activate the first and load their posts
            if (data.length > 0) {
                // small timeout to ensure elements are in DOM
                setTimeout(function(){
                    const firstCard = document.querySelector('#users-list .user-card');
                    if (firstCard) {
                        firstCard.classList.add('active');
                        // find the corresponding user id from the loaded data
                        getpost(data[0].id);
                    }
                }, 50);
            }
    }
}
function userposts(userid) {
   getpost(userid);
}

// initialize users list
geusers();
