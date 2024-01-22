const header = document.querySelector("header");
const search_box = document.querySelector(".search_bar>input");
const clear = document.querySelector(".search_bar>.clear")
const filter_list = document.querySelector(".filters");
const repos_container = document.querySelector(".main_repos");
const page_controler = document.querySelector(".pages")
const page_controler_panel = document.querySelector(".main_pages")
const Smain = document.querySelector(".main");
const Sdefault = document.querySelector(".default");
const loding = document.querySelector(".loding");
const mainHeader = document.querySelector(".main_header");
const suggestion_loding = document.querySelector(".suggestion_loding");
const Search_icon = document.querySelector(".Search_icon");


let getuser;
let user = null;
let repo = null;

function setApplicationState(state){
  Smain.style.display = "none";
  Sdefault.style.display = "none";
  loding.style.display = "none";

  if(state == "loading"){
    loding.style.display = "flex";
  }else if(state == "has_loaded"){
    Smain.style.display = "block";
  }else{
    Sdefault.style.display = "flex";
  }

}setApplicationState("default");

function clearInput(){
  search_box.value = "";
  clear.style.display = "none"
  filter_list.innerHTML= "";
}

search_box.addEventListener('keyup', (e)=>{
    let url = `https://api.github.com/search/users?q=${e.target.value}&per_page=10`
    clearTimeout(getuser);
    filter_list.innerHTML= "";
    if(e.target.value !== ""){
      clear.style.display = "block"
      Search_icon.style.display="none"
      suggestion_loding.style.display="block";
        getuser = setTimeout(async() => {
            try {
                let Pdata = await fetch(url);
                let data = await Pdata.json();
                let html = data.items.map((item)=>{
                    return `<div class="filtered_item" data-username="${item.login}" onclick="getUserbyUserNameOnclick(this)">
                                <img src="https://github.com/${item.login}.png?size=30" alt="pic">
                                <p class="username">${item.login}</p>
                            </div>`
                }).join(" ")
                filter_list.innerHTML= html;
                Search_icon.style.display="block"
                suggestion_loding.style.display="none";
            } catch (error) {
                console.log(error);
            }
            
        }, 1000);
    }else{
      clear.style.display = "none"
      filter_list.innerHTML= "";
      Search_icon.style.display="block"
      suggestion_loding.style.display="none";
    }
});

search_box.addEventListener('focus', function(event) {
    filter_list.style.display = "block"
});


let fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

let UserRepos;

function getUserbyUserNameOnclick(e){

    setApplicationState("loading");

    let userUrl = `https://api.github.com/users/${e.dataset.username}`;
    let reposUrl = `https://api.github.com/users/${e.dataset.username}/repos?per_page=10&sort=created&direction=desc`;
    filter_list.style.display = "none"

    Promise.all([fetchData(userUrl),fetchData(reposUrl)])
      .then(([Fuser,Frepos])=>{
        setApplicationState("has_loaded");
        user = Fuser
        showUser(user);
        repo = Frepos;
        showRepo(repo);
      }).catch(err => console.log(err))
   
}

function showRepo(repo){
  repos_container.innerHTML="";
  let card = []
  for(let i = 0 ; i < repo.length; i++){
      let child = `<div class="repo_card" data-repo-url="${repo[i].html_url}" title="${repo[i].html_url}" onclick="redirectUser(this)" >
                      <p class="titel">${repo[i].name}</p>
                      <p class="discription">${repo[i].description}</p>
                      <div class="lang_items">
                      </div>
                   </div>`
      card.push(child);
  }
  repos_container.innerHTML = card.join('');
};

function redirectUser(e){
  window.location.href = e.dataset.repoUrl;
};

function showUser(user){
    if(user != null){
        let userInfo = `
                         <div class="link_avatar">
                            <div class="avatar">
                                <img src="https://github.com/${user.login}.png?size=40" alt="avatar">
                            </div>
                                <a href="${user.html_url}" class="link" target="_blank" >
                                    <img src="./assets/link.png" alt="link" class="link_symbol">
                                    <p class="link_text">${user.html_url}</p>
                                </a>
                          </div>
                            <div class="about_user">
                                <p class="name">${user.name}</p>
                                <p class="bio">${user.bio}</p>
                                <a href="${user.twitter_username}" target="_blank" > Tweeter : ${user.twitter_username}</a>
                          </div>
                        `;
        mainHeader.innerHTML = userInfo;
    }
};

{/* <div class="location">
<img src="./assets/Location.png" alt="location" class="location_symbol">
<p>patna</p> */}

{/* <div class="lang">javascript</div>
<div class="lang">javascript</div>
<div class="lang">javascript</div> */}