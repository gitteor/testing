document.getElementById("start-button").addEventListener("click", startTest);

let currentQuestion = 0;
const totalQuestions = 7;
let scores = Array(totalQuestions).fill(0);
const questions = [
    ["나는 자주 스트레스를 느낀다.", "나는 쉽게 긴장한다.", "나는 자주 불안을 느낀다.", "나는 종종 피곤함을 느낀다.", "나는 자주 예민해진다."],
    ["나는 긍정적인 마음을 유지하려고 노력한다.", "나는 내 감정을 잘 조절한다.", "나는 내 감정에 대해 잘 이해하고 있다.", "나는 감정에 좌우되지 않는다.", "나는 자신감이 있다."],
    ["나는 사회적 상황에서 불편함을 느낀다.", "나는 낯선 사람과 대화하는 것이 어렵다.", "나는 종종 외로움을 느낀다.", "나는 다른 사람들과 잘 어울리지 않는다.", "나는 새로운 사람들을 만나는 것이 어렵다."],
    ["나는 새로운 도전을 두려워하지 않는다.", "나는 변화를 받아들이는 것을 좋아한다.", "나는 새로운 아이디어를 시도하는 것을 즐긴다.", "나는 모험을 좋아한다.", "나는 새로운 경험을 통해 성장한다고 믿는다."],
    ["나는 계획적으로 행동한다.", "나는 일을 체계적으로 처리한다.", "나는 항상 일을 제때 마친다.", "나는 효율적으로 일하는 편이다.", "나는 책임감이 있다."],
    ["나는 종종 과거를 회상한다.", "나는 자주 후회를 한다.", "나는 과거의 실수를 자주 떠올린다.", "나는 지나간 일을 잊지 못한다.", "나는 과거의 경험을 곱씹는 편이다."],
    ["나는 나의 행동에 대해 스스로 통제할 수 있다.", "나는 규칙을 잘 따른다.", "나는 내 감정에 따라 즉흥적으로 행동하지 않는다.", "나는 자제력이 강하다.", "나는 내 목표를 위해 노력한다."]
];

function startTest() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("question-screen").style.display = "block";
    showQuestion();
}

function showQuestion() {
    const container = document.getElementById("question-container");
    container.innerHTML = '';

    questions[currentQuestion].forEach((question, index) => {
        const questionElem = document.createElement('div');
        questionElem.innerHTML = `
            <p>${question}</p>
            <div class="answers">
                <label><input type="radio" name="q${index}" value="0"> 전혀 그렇지 않다</label>
                <label><input type="radio" name="q${index}" value="1"> 가끔 그렇다</label>
                <label><input type="radio" name="q${index}" value="2"> 자주 그렇다</label>
                <label><input type="radio" name="q${index}" value="3"> 항상 그렇다</label>
            </div>
        `;
        container.appendChild(questionElem);
    });
}

document.getElementById("next-button").addEventListener("click", () => {
    if (validateAnswers()) {
        updateScores();
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert("모든 문항에 답변을 선택해주세요.");
    }
});

document.getElementById("prev-button").addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

function validateAnswers() {
    let allAnswered = true;
    document.querySelectorAll(`#question-container input[type="radio"]`).forEach((input) => {
        const questionName = input.name;
        if (!document.querySelector(`input[name="${questionName}"]:checked`)) {
            allAnswered = false;
        }
    });
    return allAnswered;
}

function updateScores() {
    let pageScore = 0;
    document.querySelectorAll(`#question-container input[type="radio"]:checked`).forEach((input) => {
        pageScore += parseInt(input.value);
    });
    scores[currentQuestion] = pageScore / 5; // 평균 점수 계산
}

function showResult() {
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    drawChart();

    const restartButton = document.createElement("button");
    restartButton.textContent = "처음으로";
    restartButton.addEventListener("click", () => {
        location.reload();
    });

    document.getElementById("result-screen").appendChild(restartButton);
}

function drawChart() {
    const ctx = document.getElementById('result-chart').getContext('2d');
    const data = {
        labels: ['스트레스', '감정 조절', '사회적 불안', '모험심', '계획성', '과거 회상', '자기 통제'],
        datasets: [{
            label: '심리 검사 결과',
            data: scores,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 3
                }
            }
        }
    });
}
