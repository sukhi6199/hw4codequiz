

var questions = [
    {
        "question": "What is 1+1?",
        "answers": [
            "7",
            "21",
            "11",
            "2"
        ],
        "correctAnswer": "2"
    },
    {
        "question": "What color do you get by mixing red + yellow?",
        "answers": [
            "Purple",
            "Periwinkle",
            "Orange",
            "Black"
        ],
        "correctAnswer": "Orange"
    },
    {
        "question": "What do you call a group of fish?",
        "answers": [
            "A Flock",
            "A School",
            "Fishies",
            "Fishes"
        ],
        "correctAnswer": "A School"
    },
    {
        "question": "Who is the best human in the workd?",
        "answers": [
            "Shivani Cornflake",
            "Barack Obama",
            "Jackie Chan",
            "Will Smith"
        ],
        "correctAnswer": "Shivani Cornflake"
    },
    {
        "question": "What is the birthplace of America?",
        "answers": [
            "Harborview Medical Center",
            "Washington, D.C.",
            "Pennsylvania",
            "Canada"
        ],
        "correctAnswer": "Pennsylvania"
    }
];
var headerEl = document.querySelector("header");
var viewHighScoresButtonEl = document.querySelector("#viewHighScoresButton");
var timeEl = document.querySelector("#timeRemaining");
var mainEl = document.querySelector("main");

var secondsLeft, timerInterval, currentQuestion, lastQuestionResult, warningFlag;


function loadLandingPage() {
    var div = document.createElement("div");
    var h1 = document.createElement("h1");
    var p = document.createElement("p");
    var button = document.createElement("button");

    div.setAttribute("class", "text-center");
    h1.setAttribute("class", "heading");
    p.setAttribute("class", "text");
    button.setAttribute("class", "primaryButton");
    button.setAttribute("data-val", "startQuiz");

    h1.textContent = "Coding Quiz Challenge";
    p.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds.";
    button.textContent = "Start Quiz";

    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(button);

    timeEl.textContent = 0;
    headerEl.setAttribute("class", "show");

    mainEl.innerHTML = "";
    mainEl.appendChild(div);
}

loadLandingPage();

function loadResultsPage(score) {
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    var p = document.createElement("p");
    var form = document.createElement("form");
    var label = document.createElement("label");
    var input = document.createElement("input");
    var button = document.createElement("button");

    h3.setAttribute("class", "subHeading");
    p.setAttribute("class", "text");
    button.setAttribute("class", "primaryButton ml-5");
    button.setAttribute("data-val", "submitScore");
    input.setAttribute("type", "text");

    h3.textContent = "All Done!";
    p.textContent = `Your final score is ${score}.`;
    label.textContent = "Enter initials:";
    button.textContent = "Submit";

    div.appendChild(h3);
    div.appendChild(p);
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(button);
    div.appendChild(form);

 //Coded by SukhG\\   

    if (lastQuestionResult) {
        var lastQuestionResultEl = document.createElement("p");
        lastQuestionResultEl.textContent = lastQuestionResult;
        lastQuestionResultEl.setAttribute("id", "lastQuestionResult");
        div.appendChild(lastQuestionResultEl);
    }

    warningFlag = false;
    mainEl.innerHTML = "";
    mainEl.appendChild(div);
}

function setTimer() {
    secondsLeft = 76;
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            secondsLeft = 0;
            lastQuestionResult = null;
            loadResultsPage(secondsLeft);
        }
    }, 1000);
}

function nextQuestion() {
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    var ol = document.createElement("ol");

    currentQuestion += 1;
    h3.setAttribute("class", "subHeading");
    h3.textContent = questions[currentQuestion].question;
    div.appendChild(h3);

    for (let i = 0; i < 4; i++) {
        let li = document.createElement("li");
        let button = document.createElement("button");

        button.textContent = `${i + 1}. ${questions[currentQuestion].answers[i]}`;
        button.setAttribute("data-question", questions[currentQuestion].answers[i]);
        button.setAttribute("class", "primaryButton mb-5 ml-5");
        li.appendChild(button);
        ol.appendChild(li);
    }

    div.appendChild(ol);

    if (currentQuestion >= 1) {
        var lastQuestionResultEl = document.createElement("p");
        lastQuestionResultEl.textContent = lastQuestionResult;
        lastQuestionResultEl.setAttribute("id", "lastQuestionResult");
        div.appendChild(lastQuestionResultEl);
    }

    mainEl.innerHTML = "";
    mainEl.appendChild(div);
}

function loadHighScores() {
    headerEl.setAttribute("class", "hide");
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    var div = document.createElement("div");
    var h1 = document.createElement("h1");
    var ul = document.createElement("ul");
    var p = document.createElement("p");
    var button1 = document.createElement("button");
    var button2 = document.createElement("button");

    h1.setAttribute("class", "heading");
    ul.setAttribute("class", "highscoresList");
    button1.setAttribute("class", "primaryButton");
    button2.setAttribute("class", "primaryButton ml-5");
    button1.setAttribute("data-val", "goBack");
    button2.setAttribute("data-val", "clear");

    h1.textContent = "Highscores";
    button1.textContent = "Go Back";
    button2.textContent = "Clear Highscores";

    if (highScores) {
        for (let i = 0; i < highScores.length; i++) {
            var li = document.createElement("li");
            li.textContent = `${highScores[i].name} - ${highScores[i].score}`;
            ul.appendChild(li);
        }
    }

    p.appendChild(button1);
    p.appendChild(button2);
    div.appendChild(h1);
    div.appendChild(ul);
    div.appendChild(p);

    mainEl.innerHTML = "";
    mainEl.appendChild(div);
}

function handleEvents(event) {
    var element = event.target;

    if (lastQuestionResult) {
        event.preventDefault();
        lastQuestionResult = null;
        var lastQuestionResultEl = document.querySelector("#lastQuestionResult");
        lastQuestionResultEl.setAttribute("class", "hide");
    } else if (element.matches("button")) {
        if (element.getAttribute("data-question")) {
            if (element.getAttribute("data-question") == questions[currentQuestion].correctAnswer) {
                lastQuestionResult = "Correct!";
            } else {
                secondsLeft > 10 ? secondsLeft -= 10 : secondsLeft = 0;
                timeEl.textContent = secondsLeft;
                lastQuestionResult = "Wrong!";
            }
            if (currentQuestion == 4) {
                clearInterval(timerInterval);
                loadResultsPage(secondsLeft)
            } else {
                nextQuestion();
            }
        } else if (element.getAttribute("data-val") == "startQuiz") {
            currentQuestion = -1;
            setTimer();
            nextQuestion();
        }
        else if (element.getAttribute("data-val") == "submitScore") {
            event.preventDefault();

            var initials = document.querySelector("input").value.trim();
            if (initials.length) {
                var highScores = JSON.parse(localStorage.getItem("highScores"));
                if (highScores) {
                    highScores.push({ "name": initials, "score": Number(secondsLeft) });
                    highScores.sort((a, b) => b.score - a.score);
                } else {
                    highScores = [{ "name": initials, "score": Number(secondsLeft) }];
                }
                localStorage.setItem("highScores", JSON.stringify(highScores));
                loadHighScores()
            } else {
                if (!warningFlag) {
                    var warningEl = document.createElement("p");
                    warningEl.textContent = "You must enter your initials to proceed!";
                    warningEl.setAttribute("id", "lastQuestionResult");
                    document.querySelector("main").appendChild(warningEl);
                    warningFlag = true;
                }
            }
        } else if (element.getAttribute("data-val") == "goBack") {
            loadLandingPage()
        } else if (element.getAttribute("data-val") == "clear") {
            localStorage.removeItem("highScores");
            loadHighScores();
        }
    }
}

mainEl.addEventListener("click", handleEvents);
viewHighScoresButtonEl.addEventListener("click", loadHighScores);
