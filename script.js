document.getElementById("start-button").addEventListener("click", startTest);

let currentQuestion = 0;
const totalQuestions = 7;
let scores = Array(totalQuestions).fill(0);
let selectedAnswers = Array(totalQuestions).fill(null).map(() => []); // 사용자가 선택한 답변을 저장할 배열
const questions = [
    // 질문 데이터 그대로 유지
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
                <input type="radio" name="q${index}" id="q${index}a1" value="0">
                <label for="q${index}a1"><span></span>전혀 그렇지 않다</label>

                <input type="radio" name="q${index}" id="q${index}a2" value="1">
                <label for="q${index}a2"><span></span>가끔 그렇다</label>

                <input type="radio" name="q${index}" id="q${index}a3" value="2">
                <label for="q${index}a3"><span></span>자주 그렇다</label>

                <input type="radio" name="q${index}" id="q${index}a4" value="3">
                <label for="q${index}a4"><span></span>항상 그렇다</label>
            </div>
        `;
        container.appendChild(questionElem);

        // 저장된 답변이 있으면 복원
        if (selectedAnswers[currentQuestion][index] !== undefined) {
            document.getElementById(`q${index}a${selectedAnswers[currentQuestion][index] + 1}`).checked = true;
        }
    });

    updatePageIndicator();
    updateProgressBar();
}

document.getElementById("next-button").addEventListener("click", () => {
    if (validateAnswers()) {
        saveAnswers(); // 현재 페이지의 답변을 저장

        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult(); // 마지막 페이지를 넘어갈 때 점수 집계
        }
    } else {
        alert("모든 문항에 답변을 선택해주세요.");
    }
});

document.getElementById("prev-button").addEventListener("click", () => {
    if (currentQuestion > 0) {
        saveAnswers(); // 현재 페이지의 답변을 저장
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

function saveAnswers() {
    document.querySelectorAll(`#question-container input[type="radio"]:checked`).forEach((input, index) => {
        selectedAnswers[currentQuestion][index] = parseInt(input.value); // 선택한 답변을 저장
    });
}

function showResult() {
    calculateScores(); // 결과 화면에 진입할 때 점수 집계
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    drawChart();

    const restartButton = document.createElement("button");
    restartButton.textContent = "처음으로";
    restartButton.addEventListener("click", () => {
        location.reload();
    });

    document.getElementById("result-screen").appendChild(restartButton);
    document.getElementById("page-indicator").style.display = "none"; // 결과 페이지에서 페이지 표시 제거
    document.getElementById("progress-bar-container").style.display = "none"; // 결과 페이지에서 프로그레스 바 제거
}

function calculateScores() {
    for (let i = 0; i < totalQuestions; i++) {
        let pageScore = selectedAnswers[i].reduce((acc, val) => acc + val, 0);
        scores[i] = pageScore / questions[i].length; // 평균 점수 계산
    }
}

function drawChart() {
    const ctx = document.getElementById('result-chart').getContext('2d');

    const data = {
        labels: ['스트레스', '감정 조절', '사회적 불안', '모험심', '계획성', '과거 회상', '자기 통제'],
        datasets: [{
            label: '검사 결과',
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
                min: 0, // 중앙값을 0으로 고정
                max: 3, // 최대값을 3으로 고정
                ticks: {
                    beginAtZero: true, // 이 설정이 중앙을 0으로 고정합니다.
                    min: 0,             // 중앙값을 0으로 고정
                    max: 3,             // 가장자리를 3으로 고정
                    stepSize: 0.5,      // 0.5 단위로 눈금을 표시
                    callback: function(value) {
                        return value.toFixed(1); // 소수점 한 자리로 표시
                    }
                },
                pointLabels: {
                    fontSize: 14
                }
            }
        }
    });
}
