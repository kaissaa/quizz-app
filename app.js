const questions = [
    {
        question: 'Tag HTML mana yang digunakan untuk membuat link?',
        answers: [
            { text: 'a', correct: true},
            { text: 'p', correct: false},
            { text: 'div', correct: false},
            { text: 'span', correct: false},
        ]
    },
    {
        question: 'Properti CSS apa yang digunakan untuk mengubah warna teks?',
        answers: [
            { text: 'text-size', correct: false},
            { text: 'font-family', correct: false},
            { text: 'color', correct: true},
            { text: 'background-color', correct: false},
        ]
    },
    {
        question: 'Fungsi dari console.log() dalam JavaScript adalah untuk...',
        answers: [
            { text: 'Menghapus data dari server', correct: false},
            { text: 'Menampilkan output di konsol', correct: true},
            { text: 'Membuat elemen HTML baru', correct: false},
            { text: 'Mengirim email otomatis', correct: false},
        ]
    },
    {
        question: 'Apa fungsi utama dari tag <head> dalam struktur HTML?',
        answers: [
            { text: 'Menampilkan konten utama di halaman', correct: false},
            { text: 'Mengatur warna latar belakang halaman', correct: false},
            { text: 'Membuat tombol pada halaman web', correct: false},
            { text: 'Menyimpan elemen-elemen skrip, link, dan metadata', correct: true},
        ]
    }
];

const questionElement = document.querySelector('#question');
const answerBtn = document.getElementById('answer-button');
const nextBtn = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = 'Next';
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;
    answerBtn.innerHTML = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerBtn.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while(answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === 'true';
    if(isCorrect){
        selectedbtn.classList.add('correct');
        score++;
    } else {
        selectedbtn.classList.add('incorrect');
    }
    Array.from(answerBtn.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    })
    nextBtn.style.display = 'block'
}


nextBtn.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

function showScore() {
    resetState();
    questionElement.innerHTML = `Skor mu ${score} dari ${questions.length}!`;
    nextBtn.innerHTML = 'Mulai Lagi';
    nextBtn.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

startQuiz();