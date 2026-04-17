// ---- PERSONA DATA ----
const personas = {
    looks: {
        id: 'looks',
        image: 'images/looksmaxx.png',
        title: 'looksmaxxer',
        subtitle: `you're thinking too much about yourself.`, 
        body: `you're spending a lot of time thinking about how you look, wether its through riguouros workout routines, strict diets, or more extreme methods like peptides or 'bonesmashing'. It's important to remember that there's more to life than your appearance, especially if you're seeking romantic connection. Being a Chad is not worth selling your soul too Clavicular.`,
        pills: ['friendmaxx', 'outsidemaxx', 'phone-downmaxx', 'self-esteemmaxx']
    },
    system: {
        id: 'system',
        image:'images/systemmaxx.png',
        title: 'systemaxxer',
        subtitle: 'your life is running smoothly. unfortunately you are running it like it is a corporate metric',
        body: ` You have really figured out how to maximize your physical success in this world, but when was the last time you enjoymaxxed instead of worrying about your stock portfolio? Some of the biggest accomplishements in life are entirely intrinsic and have no material value, and it's important to rememeber that. Much of the success you see on the internet is larped, do not compare yourself
         to these people. Take a breath, and try to smell the roses before you're too old to take advantage of the world around you.`,
        pills: ['meditationmaxx', 'soulmaxx', 'enjoymaxx', 'degenaratemaxx']
    },
    fun: {
        id: 'fun',
        image: 'images/jestermaxx.png',
        title: 'jestermaxxer',
        subtitle: "living life to it's most precious moment, so locked out you have never been locked in",
        body: `Wow you're life is so fun, you're not even pretending to be something you're not, you just are! Congrats most people could learn a lesson on taking a chill pill, however being too chill can become a bit of a deteriment. It's important to have more direction than just the bar or closest social event, in fact you could even really enjoy the result of hardwork towards a goal
        employmentmaxxing isn't just something your parents are nagging you to do, it's a way for you to feel the benefits of building your future. `,
        pills: ['employmentmaxx', 'hobbymaxx', 'savingsmaxx', 'soberweekendmaxx']
    },
    prophet: {
        id: 'prophet',
        image:'images/prophetmaxx.png',
        title: 'prophetmaxxer',
        subtitle: 'you have opinions. so many opinions. mostly delivered to an audience of one.',
        body: `you are the most interesting person at the table  or at least that's the operating assumption. the archival pieces, the obscure references, the philosophical positions on things nobody asked about. you've built an elaborate inner world and you take it very seriously.
        Unfortunately you might be insufferablemaxxing and hard to get along with because you're so high up on your horse. You're instagram followers really don't care about your niche russian literature post, and unless you get an actually fufilling expereince from engaging with the text, larping intelligence has no benefit. Even if it's not a larp it doesn't help to engage in degeneracy every now and then. `,
        pills: ['jestermaxx', 'chadmaxx', 'cringemaxx', 'degeneratemaxx']
    }
};

const scores = { looks: 0, system: 0, fun: 0, prophet: 0 };
const answers = {};
let currentQ = 1;
const TOTAL_Q = 8;
 
document.addEventListener('DOMContentLoaded', function () {
    const page = document.body.className;
 
    if (page.includes('quiz-page'))    initQuiz();
    if (page.includes('results-page')) initResults();
    if (page.includes('landing-page')) initLanding();
});

function initLanding() {
    let startBtn = document.getElementById('startBtn');
 
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            localStorage.removeItem('maxxed_answers');
            localStorage.removeItem('maxxed_scores');
            localStorage.removeItem('maxxed_result');
        });
    }
 
    const savedResult = localStorage.getItem('maxxed_result');
    if (savedResult && savedResult !== 'undefined') {
        let banner = document.createElement('p');
        banner.innerHTML = '↩ your last result: <b>' + savedResult + '</b> — <a href="results.html">view it again</a>';
        let ctaArea = document.querySelector('.cta-area');
        if (ctaArea) ctaArea.insertAdjacentElement('afterend', banner);
    }
}
 

function initQuiz() {
    let optionBtns = document.querySelectorAll('.option-btn');
 
    optionBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            handleAnswer(btn);
        });
    });
}
 
function handleAnswer(btn) {
    let qNum = parseInt(btn.getAttribute('data-q'));
    let type = btn.getAttribute('data-type');
 
    let siblings = document.querySelectorAll('.option-btn[data-q="' + qNum + '"]');
    siblings.forEach(function (s) { s.classList.remove('selected'); });
 
    btn.classList.add('selected');
 
    let optLetter = btn.querySelector('.opt-letter');
    let btnText = btn.textContent.replace(optLetter ? optLetter.textContent : '', '').trim();
    answers['q' + qNum] = { type: type, text: btnText };
    scores[type]++;
 
    setTimeout(function () {
        advanceQuestion(qNum);
    }, 350);
}
 
function advanceQuestion(qNum) {
    let current = document.getElementById('q' + qNum);
    if (current) current.classList.remove('active');
 
    if (qNum < TOTAL_Q) {
        let next = document.getElementById('q' + (qNum + 1));
        if (next) next.classList.add('active');
        currentQ = qNum + 1;
    } else {
        saveAndRedirect();
    }
}
 
function saveAndRedirect() {
    let winner = Object.keys(scores).reduce(function (a, b) {
        return scores[a] >= scores[b] ? a : b;
    });
 
    localStorage.setItem('maxxed_scores', JSON.stringify(scores));
    localStorage.setItem('maxxed_answers', JSON.stringify(answers));
    localStorage.setItem('maxxed_result', winner);
 
    window.location.href = 'results.html';
}
 
function initResults() {
    let resultCard   = document.getElementById('resultCard');
    let resultTitle  = document.getElementById('resultTitle');
    let resultSub    = document.getElementById('resultSubtitle');
    let resultBody   = document.getElementById('resultBody');
    let rxPills      = document.getElementById('rxPills');
    let noResults    = document.getElementById('noResults');
 
    let savedResult = localStorage.getItem('maxxed_result');
 
    if (!savedResult || !personas[savedResult]) {
        if (noResults)   noResults.style.display = 'block';
        if (resultCard)  resultCard.style.display = 'none';
        return;
    }
 
    let persona = personas[savedResult];
 

    if (resultTitle) resultTitle.textContent = persona.title;
    let resultImage = document.getElementById('resultImage');
    if (resultImage) resultImage.src = persona.image;
    if (resultSub)   resultSub.textContent   = persona.subtitle;
 
    if (resultBody) {
        resultBody.innerHTML = '';
        persona.body.split('\n\n').forEach(function (para) {
            let p = document.createElement('p');
            p.textContent = para;
            resultBody.appendChild(p);
        });
    }
 
    if (rxPills) {
        rxPills.innerHTML = '';
        persona.pills.forEach(function (pill) {
            let span = document.createElement('span');
            span.className = 'rx-pill';
            span.textContent = pill;
            rxPills.appendChild(span);
        });
    }
 
}