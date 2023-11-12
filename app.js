const themebtn = document.querySelector(".input")
const body = document.body

if(localStorage.getItem('theme') == 'dark'){
  localStorage.setItem("theme","dark")
  body.classList.add('dark')
}else{
  localStorage.setItem("theme","")
  body.classList.remove('dark')
}
themebtn.addEventListener('change',(e) => {
  body.classList.toggle("dark")
  if(localStorage.getItem('theme') == 'dark'){
    localStorage.setItem("theme", '');
  }else{
    localStorage.setItem("theme", "dark");
  }
  
})