    const questions = [
    {
        question: "JavaScript'te değişken tanımlamak için hangisi kullanılır?",
        options: ["var", "const", "let", "hepsi"],
        answer: "hepsi"
    },
    {
        question: "DOM'un açılımı nedir?",
        options: ["Document Object Model", "Data Object Manager", "Desktop Oriented Mode", "Do Our Mission"],
        answer: "Document Object Model"
    },
    {
        question: "JS'te dizinin uzunluğu için hangi özellik kullanılır?",
        options: [".size", ".count", ".length", ".index"],
        answer: ".length"
    }
    ];

    let currentQuestion= 0;
    let score = 0;
function showQuestion(isPrev = false) {
    const q = questions[currentQuestion];
    
    // Soruyu yazdır
    document.querySelector(".question h2").textContent = `${currentQuestion + 1}. ${q.question}`;

    // Seçenekleri temizle
    const optionsDiv = document.querySelector(".options");
    optionsDiv.innerHTML = "";

    // Seçenekleri ekle
    q.options.forEach(option => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.textContent = option;

        // Eğer geri butonuyla gelindiyse pasif yap
        div.style.pointerEvents = isPrev ? "none" : "auto";
        div.classList.remove("correct", "wrong", "selected");

        div.addEventListener("click", () => selectAnswer(div, option));
        optionsDiv.appendChild(div);
    });

    // Progress bar güncelle
    document.querySelector(".progress-bar").style.width = `${((currentQuestion+1) / questions.length) * 100}%`;

    // Butonlar kontrol
    document.getElementById("prev-btn").disabled = currentQuestion === 0;
    document.getElementById("next-btn").disabled = isPrev ? false : true;
}

function selectAnswer(div, Selected){
    const q = questions[currentQuestion];
    const options = document.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected"))
    div.classList.add("selected")

    if(Selected === q.answer){
        div.classList.add("correct");
    }else{
        div.classList.add("wrong");
    }


    if(Selected === q.answer){
        score++;
        document.getElementById("score").textContent = score;
    }

    options.forEach(opt =>{
        opt.style.pointerEvents = "none";
    })
    
    document.getElementById("next-btn").disabled = false;
};

document.getElementById("next-btn").addEventListener("click",()=>{
    currentQuestion++;
    if(currentQuestion < questions.length){
        showQuestion();
    }else{
        document.querySelector(".quiz-container").innerHTML = `
            <h1>Quiz Bitti 🎉</h1>
            <p>Final skorun: ${score} / ${questions.length}</p>
            <button onclick="location.reload()">Tekrar Oyna</button>
        `;
    }
});

document.getElementById("prev-btn").addEventListener("click",()=>{
    if(currentQuestion > 0){
        currentQuestion--;
        showQuestion(true);
    }
})

showQuestion();