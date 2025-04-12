console.log('hello world')

const helloWorldBox = document.getElementById('hello-world')
const postsBox= document.getElementById('posts-box')
const spinnerBox = document.getElementById('spinner-box')
// helloWorldBox.innerHTML =  'hello <b>world</b>'

$.ajax({
    type: 'GET',
    url: '/hello-world/',
    success: function(response){
        console.log('success', response.text)
        helloWorldBox.textContent = response.text
    },
    error: function(error){
        console.log('error', error)
    }
})

$.ajax({
    type: 'GET',
    url: '/data/',
    success: function(response){
        console.log(response)
        const data = response.data
        setTimeout(()=>{
            spinnerBox.classList.add('not-visible')
            console.log(data)
            data.forEach(el => {
                postsBox.innerHTML += `
                 <div class="card mb-2">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${el.title}</h5>
    <p class="card-text">${el.body}</p>
    </div>
    <div class="card-footer">
    <div class="row">
    <div class="col-1">
        <a href="#" class="btn btn-primary">Details</a>
    </div>
    <div class="col-2">
        <a href="#" class="btn btn-primary">Likes</a>
    </div>
  </div>
</div>
                `
            });
        }, 1000)
    },
    error: function(error){
        console.log(error)
    }
})