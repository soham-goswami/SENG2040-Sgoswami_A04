console.log('hello world')

// const helloWorldBox = document.getElementById('hello-world')
const postsBox= document.getElementById('posts-box')
const spinnerBox = document.getElementById('spinner-box')
const loadbtn = document.getElementById('load-btn')
const endBox = document.getElementById('end-box')

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

const likeUnlikePosts = () => {
    const likeUnlikeforms = [...document.getElementsByClassName('like-unlike-forms')]
    likeUnlikeforms.forEach(form=> form.addEventListener('submit', e=>{
        e.preventDefault()
        const clickedId = e.target.getAttribute('data-form-id')
        const clickedBtn = document.getElementById(`like-unlike-${clickedId}`)

        $ajax({
            type: 'POST',
            url: "/like-unlike/",
            data: {
                'csrfmiddlewaretoken': csrftoken,
                'pk': clickedId,
            },
            success: function(response){
                console.log(response)
                clickedBtn.textContent = response.liked ? `Unlike (${response.count})`: `Like (${response.count})`
            },
            error: function(error){
                console.log(error)
            }
        })

    }))
}
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

      <div class="card-body">
        <h5 class="card-title">${el.title}</h5>
        <p class="card-text">${el.body}</p>
        </div>
        <div class="card-footer">
        <div class="row">
        <div class="col-2">
            <a href="#" class="btn btn-primary">Details</a>
        </div>
        <div class="col-2">
                <form class="like-unlike-forms" data-form-id="${el.id}">
                   <button href="#" class="btn btn-primary" id="like-unlike-${el.id}">${el.liked ? `Unlike (${el.count})`: `Like (${el.count})`}</button>

        </div>
      </div>
    </div>
                    `
                });
            }, 1000)
            likeUnlikePosts()
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
