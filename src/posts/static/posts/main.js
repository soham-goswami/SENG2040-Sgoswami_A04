console.log('hello world')

// const helloWorldBox = document.getElementById('hello-world')
const postsBox= document.getElementById('posts-box')
const spinnerBox = document.getElementById('spinner-box')
const loadbtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')
// helloWorldBox.innerHTML =  'hello <b>world</b>'

// $.ajax({
//     type: 'GET',
//     url: '/hello-world/',
//     success: function(response){
//         console.log('success', response.text)
//         helloWorldBox.textContent = response.text
//     },
//     error: function(error){
//         console.log('error', error)
//     }
// })

let visible = 3

const getData = () => {
    $.ajax({
        type: 'GET',
        url: `/data/${visible}/`,
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
            console.log(response.size)
            if (response.size === 0) {
                endBox.textContent = 'No posts added yet..'
            }
            else if (response.size <= visible) {
                loadbtn.classList.add('not-visible')
                endBox.textContent = 'No more pots to load..'
            }
        },
        error: function(error){
            console.log(error)
        }
    })   
}

loadbtn.addEventListener('click', ()=>{
    spinnerBox.classList.remove('not-visible')
    visible +=3
    getData()
})

getData()
