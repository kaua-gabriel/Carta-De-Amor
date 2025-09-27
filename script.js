
// Carousel
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel img');
let carouselInterval;
function showSlide(i){ slides.forEach(img=>img.classList.remove('active')); slides[i].classList.add('active'); }
function nextSlide(){currentIndex=(currentIndex+1)%slides.length; showSlide(currentIndex);}
function prevSlide(){currentIndex=(currentIndex-1+slides.length)%slides.length; showSlide(currentIndex);}
function startCarousel(){carouselInterval=setInterval(nextSlide,4000);}
function stopCarousel(){clearInterval(carouselInterval);}
startCarousel();

// Modal
const modal = document.getElementById('lightboxModal');
const modalImage = document.getElementById('modalImage');
const modalCounter = document.getElementById('modalCounter');
let modalIndex = 0;

function openModal(i){
  modal.style.display='flex';
  modalIndex=i;
  modalImage.src=slides[i].src;
  modalImage.style.opacity=0;
  stopCarousel();
  updateCounter();
}
function closeModal(){modal.style.display='none'; startCarousel();}
function nextModal(){modalIndex=(modalIndex+1)%slides.length; modalImage.src=slides[modalIndex].src; modalImage.style.opacity=0; updateCounter();}
function prevModal(){modalIndex=(modalIndex-1+slides.length)%slides.length; modalImage.src=slides[modalIndex].src; modalImage.style.opacity=0; updateCounter();}
function updateCounter(){modalCounter.textContent=`Foto ${modalIndex+1} de ${slides.length}`;}
modalImage.addEventListener('load',()=>{modalImage.style.opacity=1;});
modal.addEventListener('click', e=>{if(e.target===modal) closeModal();});
slides.forEach((img,i)=>{img.addEventListener('click',()=>openModal(i));});

// Quiz embaralhado
const quizData = [
  {q:"Qual é a nossa música favorita juntos?", a:["Bohemian Rhapsody","Aliança - Tribalistas","Imagine","Shape of You"], correct:"Aliança - Tribalistas"},
  {q:"Qual foi o primeiro filme que vimos juntos?", a:["Superman","Mulher-Maravilha","Homem-Aranha","Batman"], correct:"Superman"},
  {q:"Qual a comida mais diferente que gostamos quando saímos juntos?", a:["Hambúrguer","Tacos","Pizza","Sushi"], correct:"Tacos"},
  {q:"Qual lugar queremos visitar juntos em breve?", a:["Cinema","Skybar","Praia","Parque"], correct:"Praia"},
  {q:"Qual atividade fizemos no nosso primeiro encontro?", a:["Ficar em casa","Ir ao cinema","Visitar shopping","Andar no parque"], correct:"Andar no parque"},
  {q:"Qual é a nossa série ou desenho favorito para ver juntos?", a:["Friends","The Office","Pacificador","Breaking Bad"], correct:"Pacificador"},
  {q:"Qual sobremesa mais gostamos de dividir?", a:["Chocolate","Sorvete","Bolo","Pudim"], correct:"Sorvete"},
  {q:"Qual foi o primeiro presente que trocamos?", a:["Flores","Carta de amor","Livro","Chaveiro"], correct:"Carta de amor"},
  {q:"Qual fruta representa nosso relacionamento?", a:["🍓","🍍","🍎","🍇"], correct:"🍍"},
  {q:"Qual coisa estranha ou engraçada você sempre faz e me faz rir?", a:["Canta no chuveiro","Conta piadas ruins","Morde meu dedo","Fala alto"], correct:"Morde meu dedo"}
];

let currentQ=0; let score=0;
const questionEl=document.getElementById('quizQuestion');
const optionsEl=document.getElementById('quizOptions');
const progressEl=document.getElementById('quizProgress');
const scoreDisplay=document.getElementById('scoreDisplay');

function showQuestion(){
  if(currentQ>=quizData.length){
    quizContainer.innerHTML=`<h2>Fim do quiz! Pontuação: ${score}/100</h2>`;
    return;
  }
  const q=quizData[currentQ];
  questionEl.textContent=q.q;
  optionsEl.innerHTML='';
 const shuffledOptions = shuffleArray([...q.a]); // cria uma cópia e embaralha
shuffledOptions.forEach(opt => {
  const btn = document.createElement('button');
  btn.textContent = opt;
  btn.onclick = () => checkAnswer(opt, btn);
  optionsEl.appendChild(btn);
});
  progressEl.textContent=`Pergunta ${currentQ+1} de ${quizData.length}`;
  scoreDisplay.textContent=`Score: ${score} / 100`;
}
function checkAnswer(sel, btn){
  const correct=quizData[currentQ].correct;
  const buttons=optionsEl.querySelectorAll('button');
  buttons.forEach(b=>b.disabled=true);
  if(sel===correct){score+=10; btn.classList.add('correct');}
  else{btn.classList.add('wrong'); buttons.forEach(b=>{if(b.textContent===correct)b.classList.add('correct');});}
  scoreDisplay.textContent=`Score: ${score} / 100`;
  setTimeout(()=>{currentQ++; showQuestion();},1000);
}
showQuestion();

// Hearts/Girassóis
function createHeart(){
  const heart=document.createElement('div');
  const icons=['❤️','🌻'];
  heart.textContent=icons[Math.floor(Math.random()*icons.length)];
  heart.style.left=Math.random()*window.innerWidth+'px';
  heart.style.fontSize=(10+Math.random()*20)+'px';
  heart.style.opacity=0.7;
  heart.style.animation=`fall ${3+Math.random()*3}s linear`;
  document.getElementById('heartsContainer').appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
}
setInterval(createHeart,500);

// Keyframes para queda
const styleEl=document.createElement('style');
styleEl.innerHTML=`@keyframes fall {0%{transform:translateY(-50px);} 100%{transform:translateY(100vh);}}`;
document.head.appendChild(styleEl);


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkAnswer(sel, btn){
  const correct = quizData[currentQ].correct;
  const buttons = optionsEl.querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);

  // Animação ao clicar
  btn.style.transform = 'scale(1.1)';
  setTimeout(() => { btn.style.transform = 'scale(1)'; }, 300);

  if(sel === correct){
    score += 10;
    btn.classList.add('correct');

    // Mostrar feedback de pontos
    const pointFeedback = document.createElement('div');
    pointFeedback.textContent = '+10';
    pointFeedback.style.position = 'absolute';
    pointFeedback.style.top = scoreDisplay.offsetTop + 'px';
    pointFeedback.style.left = scoreDisplay.offsetLeft + 'px';
    pointFeedback.style.fontSize = '1.2em';
    pointFeedback.style.fontWeight = 'bold';
    pointFeedback.style.color = '#2FB125';
    pointFeedback.style.opacity = 1;
    pointFeedback.style.transition = 'all 1s ease';
    document.body.appendChild(pointFeedback);

    // Animar para cima e sumir
    setTimeout(() => {
      pointFeedback.style.transform = 'translateY(-50px)';
      pointFeedback.style.opacity = 0;
    }, 50);
    setTimeout(() => pointFeedback.remove(), 1050);

  } else {
    btn.classList.add('wrong');
    buttons.forEach(b => {
      if(b.textContent === correct) b.classList.add('correct');
    });
  }

  scoreDisplay.textContent = `Score: ${score} / 100`;
  setTimeout(() => { currentQ++; showQuestion(); }, 1000);
}

let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let currentFilter = 'all';

    const todoList = document.getElementById('todoList');
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoCounter = document.getElementById('todoCounter');
    const mascot = document.getElementById('todoMascot');

    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
      todoList.innerHTML = '';
      let filtered = todos;
      if (currentFilter === 'pending') filtered = todos.filter(t => !t.done);
      if (currentFilter === 'done') filtered = todos.filter(t => t.done);

      filtered.forEach((t, i) => {
        const div = document.createElement('div');
        div.className = 'todo-item' + (t.done ? ' done' : '');
        div.innerHTML = `
          <span>${t.text}</span>
          <div class="todo-actions">
            <button class="done-btn" onclick="toggleDone(${i})">${t.done ? 'Desmarcar' : 'Concluir'}</button>
            <button class="edit-btn" onclick="editTodo(${i})">Editar</button>
            <button class="delete-btn" onclick="deleteTodo(${i})">Remover</button>
          </div>
        `;
        todoList.appendChild(div);
      });

      const doneCount = todos.filter(t => t.done).length;
      todoCounter.textContent = `${doneCount} concluídas de ${todos.length}`;

      saveTodos();
    }

    function addTodo(text) {
      todos.push({ text, done: false });
      renderTodos();
    }

    function toggleDone(index) {
      todos[index].done = !todos[index].done;
      if (todos[index].done) {
        showMascotMessage("🎉 Mais um plano realizado, amores! 💕");
        launchConfetti();
      }
      renderTodos();
    }

    function editTodo(index) {
      const newText = prompt("Editar tarefa:", todos[index].text);
      if (newText) {
        todos[index].text = newText;
        renderTodos();
      }
    }

    function deleteTodo(index) {
      if (confirm("Tem certeza que quer remover este plano?")) {
        todos.splice(index, 1);
        renderTodos();
      }
    }

    function setFilter(f) {
      currentFilter = f;
      renderTodos();
    }

    function showMascotMessage(msg) {
      mascot.textContent = msg;
      mascot.style.transform = 'scale(1.1)';
      setTimeout(() => mascot.style.transform = 'scale(1)', 300);
    }

    function launchConfetti() {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Form submit
    todoForm.addEventListener('submit', e => {
      e.preventDefault();
      if (todoInput.value.trim() !== '') {
        addTodo(todoInput.value.trim());
        todoInput.value = '';
      }
    });

    renderTodos();
