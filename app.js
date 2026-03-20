const data = [
  { id: "p01", title: "Montaña", desc: "Rocas y niebla", src: "https://picsum.photos/id/1018/1200/675" },
  { id: "p02", title: "Amanecer", desc: "Luz suave y cielo polar", src: "https://picsum.photos/id/1015/1200/675" },
  { id: "p03", title: "Rio", desc: "Paseo reflexivo por el rio", src: "https://picsum.photos/id/1011/1200/675" },
  { id: "p04", title: "Alaska", desc: "Fauna salvaje de Alaska", src: "https://picsum.photos/id/1020/1200/675" },
  { id: "p05", title: "Desierto", desc: "Atardecer en el desierto", src: "https://picsum.photos/id/1016/1200/675" },
  { id: "p06", title: "Navegar", desc: "Lago en perspectiva", src: "https://picsum.photos/id/1005/1200/675" }
];

//Seleccion de elementos del DOM
const thumbs = document.querySelector("#thumbs");
const heroImg = document.querySelector("#heroImg");
const heroTitle = document.querySelector("#heroTitle");
const heroDesc = document.querySelector("#heroDesc");
const likeBtn = document.querySelector("#likeBtn");
const counter = document.querySelector("#counter");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const playBtn = document.querySelector("#playBtn");

//Variables para el estado de la aplicación
let currentIndex = 0;
let likes = {};

let autoPlayId = null;
let isPlaying =false;
const AUTO_TIME =3000; //3 segundos

//Funcion para renderizar las miniaturas

function renderThumbs() {
  thumbs.innerHTML = data.map((item, index) => {
    return `
    <article class="thumb ${index === currentIndex ? "active" : "" }" data-index="${index}">
    <span class="badge">${index + 1}</span>
    <img src="${item.src}" alt="${item.title}"/>
    </article>`;

  }).join("");
  }

  //Renderizar imagen en el visor principal
  function renderHero( index ){
    
    //Recuperar el elemento acorde al índice
    const item = data[index];

    //Actualizar imagen principal
    heroImg.src = item.src;
    heroImg.alt = item.title;

    //Actualizar titulo y descripcion
    heroTitle.textContent = item.title;
    heroDesc.textContent = item.desc;

    //Actualizar el contador de las imagenes
    counter.textContent = `${index + 1} / ${data.length}`;
  }

//Actualizar boton de reproduccion
function updatePlayButton(){}

//Cambiar la imagen automaticamente
  function changeSlide( nextIndex ){
    heroImg.classList.add("fade-out");
    setTimeout(() => {
      currentIndex = nextIndex;
      renderHero(currentIndex);
      heroImg.classList.remove("fade-out");
    }, 350);
  }

  function nextSlide(){
    const nextIndex = (currentIndex + 1) % data.length;
    changeSlide(nextIndex);
  }


  function prevSlide(){
    const newIndex = (currentIndex - 1 + data.length) % data.length;
    changeSlide(newIndex);
  }
  

  function startAutoPlay(){
    autoPlayId = setInterval( () => {
      nextSlide();
    }, AUTO_TIME);
    isPlaying = true;
    updatePlayButton();

  }


  //Evento para manejar el clik del boton me gusta
  likeBtn.addEventListener("click", () => {
    const currentItem = data[currentIndex];
    //Cambiar de true a false 
    likes[currentItem.id] = !likes[currentItem.id];z

    const isLiked = likes[currentItem.id];

    //Actualizar el botón visualmente
    likeBtn.textContent = isLiked ? "❤️" : "🤍";
    likeBtn.classList.toggle("on", isLiked);
    likeBtn.setAttribute("aria-pressed", isLiked);
  });

//Evento para manejar el clic en las miniaturas

thumbs.addEventListener("click", (e) => {
  const thumb = e.target.closest(".thumb");
  if(!thumb) return; //Si no se hizo clic en una miniatura, salir de la función

  //Obtener el índice de la miniatura clicada
  currentIndex = Number(thumb.dataset.index);
  //Actualizar el visor principalmente 
  renderHero(currentIndex);
});


renderThumbs();
renderHero(currentIndex);