const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const paragraph =[ 
    "Believe in yourself and all that you are.",
    "Your only limit is your mind.",
    "Push yourself, because no one else is going to do it for you.",
    "Sometimes later becomes never. Do it now.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn't just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It’s going to be hard, but hard does not mean impossible.",
    "Don’t wait for opportunity. Create it.",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream it. Believe it. Build it.",
    "You don’t have to be great to start, but you have to start to be great.",
    "Work hard in silence, let your success be the noise."
    ];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = '';
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', ()=> input.focus());
    typingText.addEventListener('click',()=> input.focus());
}

function initTyping(){ 
    const char = typingText.querySelectorAll('span'); // having all the char of a random quotes
    const typedChar = input.value.charAt(charIndex); 

    if(charIndex < char.length && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }

        if(char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
        }
        else{
            mistake++;
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');

        mistake.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    }else{
        clearInterval(timer);
        input.value='';
    }
}

function initTime(){ 
    if(timeLeft > 0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex - mistake)/5) /(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{ 
        clearInterval(timer);
    }
}

function reset(){ 
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value='';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}
input.addEventListener("input", initTyping);
btn.addEventListener('click',reset);
loadParagraph();
