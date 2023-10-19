const themebtn = document.querySelector(".input")
const body = document.body
console.log(body)
console.log(themebtn.checked)
themebtn.addEventListener('change',(e) => {
  body.classList.toggle('dark')
})