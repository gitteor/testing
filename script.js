document.getElementById("start-button").addEventListener("click", startTest);
let currentQuestion = 0;
const totalQuestions = 7;
let scores = Array(totalQuestions).fill(0);
let selectedAnswers = Array(totalQuestions).fill(null).map(() => []);
const questions = [
    ["1.신체를 손, 발로 때리는 등 고통을 가하는 행위를 한 적이 있다.(상해 폭행)", "2. 일정한 장소에서 쉽게 나오지 못하도록 하는 행위를 한 적이 있다.(감금)", "3. 강제(폭행, 협박)로 일정한 장소로 데리고 가는 행위를 한 적이 있다.(약취)", "4. 상대방을 속이거나 유혹해서 일정한 장소로 데리고 가는 행위를 한 적이 있다.(유인)", "5. 장난을 빙자한 꼬집기, 때리기, 힘껏 밀치기 등 상대학생이 폭력으로 인식하는 행위를 한 적이 있다."],
    ["6. 여러 사람 앞에서 상대방의 명예를 훼손하는 구체적인 말(성격, 능력, 배경 등)을 하거나 그런 내용의 글을 인터넷, SNS 등으로 퍼뜨리는 행위(명예훼손)를 한 적이 있다.", "7. 신체 등에 해를 끼칠 듯한 언행(“죽을래” 등)과 문자메시지 등으로 겁을 주는 행위(협박)를 한 적이 있다."],
    ["8. 돌려 줄 생각이 없으면서 돈을 요구하는 행위를 한 적이 있다.", "9. 옷, 문구류 등을 빌린다며 되돌려주지 않는 행위를 한 적이 있다.", "10. 일부러 물품을 망가뜨리는 행위를 한 적이 있다.", "11. 돈을 걷어오라고 하는 행위를 한 적이 있다.", "12. 흉기로 위협해 돈을 가져가는 행위를 한 적이 있다.","13. 주머니를 뒤져서 돈을 가져가는 행위","14. 몰래 물건이나 돈을 가져가는 행위를 한 적이 있다."],
    ["15. 빵셔틀을 시킨 적이 있다.", "16. 심부름 강제로 시킨 적이 있다.", "17. 와이파이나 테더링 공유를 강요한 적이 있다.", "18. 과제 대행을 시킨 적이 있다.", "19. 게임 대행을 시킨 적이 있다."],
    ["20. 여럿이 함께 피해 학생을 의도적, 반복적으로 피하는 행위를 한 적이 있다.", "21. 바보 취급, 놀리기, 빈정거림, 면박주기, 겁주기, 골탕 먹이기, 비웃기, 욕하기 행위를 한 적이 있다.", "22. 피해 학생이 다른 친구들과 놀지 못하도록 막는 행위를 한 적이 있다."],
    ["23. 폭행, 협박을 통해 성행위를 강제하거나 유사 성행위, 성기에 이물질을 삽입하는 등의 행위를 한 적이 있다.", "24. 상대방에게 폭행과 협박을 하면서 성적 모멸감을 느끼도록 신체적 접촉을 하는 행위를 한 적이 있다.", "25. 성적인 말과 행동을 통해 설적 굴욕감, 수치감을 느끼도록 하는 행위를 한 적이 있다.", "26. 성적 접촉을 하고 도망가는 행위를 한 적이 있다."],
    ["27. 속칭 사이버모욕, 사이버명예훼손, 사이버성희롱, 사이버스토킹, 사이버음란물 유통, 대화명 테러, 인증놀이, 게임부주 강요 등 정보통신기기를 이용하여 괴롭히는 행위를 한 적이 있다.", "28. 특정인에 대해 모욕적 언사나 욕설 등을 인터넷 게시판, 채팅, 카페 등에 올리는 행위(특정인에 대한 저격글이 그 한 형태임)를 한 적이 있다.", 
     "29. 특정인에 대한 허위 글이나 개인의 사생활에 관한 사실을 인터넷, SNS 등을 통해 불특정 다수에 공개하는 행위를 한 적이 있다.", "30. 성적 수치심을 주거나, 위협하는 내용, 조롱하는 글, 그림, 동영상 등을 정보통신망을 통해 유포하는 행위를 한 적이 있다.", "31. 공포심이나 불안감을 유발하는 문자, 음향, 영상 등을 휴대폰 등 정보통신망을 통해 반복적으로 보내는 행위를 한 적이 있다.","32. 헤어진 여자친구에게 불안감을 조성하는 문자를 지속적으로 보내는 행위를 한 적이 있다."]
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
        if (selectedAnswers[currentQuestion][index] !== undefined) {
            document.getElementById(`q${index}a${selectedAnswers[currentQuestion][index] + 1}`).checked = true;
        }
    });
    updatePageIndicator();
    updateProgressBar();
}
function updatePageIndicator() {
    let pageIndicator = document.getElementById("page-indicator");
    if (!pageIndicator) {
        pageIndicator = document.createElement("div");
        pageIndicator.id = "page-indicator";
        document.body.appendChild(pageIndicator);
    }
    pageIndicator.textContent = `${currentQuestion + 1} / ${totalQuestions}`;
}
document.getElementById("next-button").addEventListener("click", () => {
    if (validateAnswers()) {
        saveAnswers();
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult(); // 마지막 페이지에서 결과 표시
        }
    } else {
        alert("모든 문항에 답변을 선택해주세요.");
    }
});
document.getElementById("prev-button").addEventListener("click", () => {
    if (currentQuestion > 0) {
        saveAnswers();
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
        selectedAnswers[currentQuestion][index] = parseInt(input.value);
    });
}
function showResult() {
    calculateScores(); // 점수 집계
    document.getElementById("question-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    drawChart();
    displayHighestScoreLabel(); // 가장 높은 항목의 label을 표시
    displayResultText(); // 결과 텍스트 표시
    const restartButton = document.createElement("button");
    restartButton.textContent = "처음으로";
    restartButton.addEventListener("click", () => {
        resetTest(); // 테스트 리셋 함수 호출
    });
    document.getElementById("result-screen").appendChild(restartButton);
    document.getElementById("page-indicator").style.display = "none";
    document.getElementById("progress-bar-container").style.display = "none";
}
function resetTest() {
    currentQuestion = 0;
    scores = Array(totalQuestions).fill(0);
    selectedAnswers = Array(totalQuestions).fill(null).map(() => []);

    document.getElementById("result-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";
    document.getElementById("page-indicator").style.display = "block";
    
    // 첫 번째 질문에 맞게 페이지 인디케이터 업데이트
    updatePageIndicator();

    // 결과 화면의 모든 자식 요소 제거
    const resultScreen = document.getElementById("result-screen");
    while (resultScreen.firstChild) {
        resultScreen.removeChild(resultScreen.firstChild);
    }

    // 차트 캔버스 다시 추가
    const newCanvas = document.createElement("canvas");
    newCanvas.id = "result-chart";
    resultScreen.appendChild(newCanvas);
}

function displayHighestScoreLabel() {
    const highestScoreIndex = scores.indexOf(Math.max(...scores));
    const highestScoreLabel = ['신체폭력', '언어폭력', '금품갈취', '강요 행위', '따돌림', '성폭력', '사이버 폭력'][highestScoreIndex];
    
    if (scores[highestScoreIndex] >= 1) {
        const resultScreen = document.getElementById("result-screen");
        const labelTextElem = document.createElement("p");
        labelTextElem.textContent = `당신의 학폭 MBTI 유형은 '${highestScoreLabel}'형 입니다.`;
        labelTextElem.style.marginTop = "20px"; // 그래프와의 간격을 위해 여백 추가
        labelTextElem.style.fontSize = "1.2em"; // 텍스트 크기 조정
        labelTextElem.style.textAlign = "center"; // 텍스트 중앙 정렬
        labelTextElem.style.color = "#333"; // 텍스트 색상 설정
        labelTextElem.style.fontWeight = "bold"; // Bold체 적용

        resultScreen.appendChild(labelTextElem);
    }
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
        labels: ['신체폭력', '언어폭력', '금품갈취', '강요 행위', '따돌림', '성폭력', '사이버 폭력'],
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
                min: 0,
                max: 3,
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 3,
                    stepSize: 0.5,
                    callback: function(value) {
                        return value.toFixed(1);
                    }
                },
                pointLabels: {
                    fontSize: 14
                }
            }
        }
    });
}
function displayResultText() {
    const highestScoreIndex = scores.indexOf(Math.max(...scores));
    const highestScoreLabel = ['신체폭력', '언어폭력', '금품갈취', '강요 행위', '따돌림', '성폭력', '사이버 폭력'][highestScoreIndex];
    let resultText = '';
    if (scores[highestScoreIndex] < 0.3) {
        resultText = '당신이 겪고 있는 모든 감정은 정상입니다. 불편함, 불안, 혹은 화가 날 수 있습니다. 이러한 감정을 인정하고 표현하는 것이 중요합니다.';
    } else if (scores[highestScoreIndex] >= 0.3 && scores[highestScoreIndex] < 0.6) {
        resultText = '경미한 피해라도 당신의 느낌과 경험은 중요합니다. 자신을 돌보고, 필요할 때 도움을 요청하는 것을 두려워하지 마세요. 당신은 자신의 상황을 개선할 수 있는 힘을 가지고 있습니다.';
    } else if (scores[highestScoreIndex] >= 0.6 && scores[highestScoreIndex] < 1.0) {
        resultText = '신뢰할 수 있는 친구나 선생님, 가족과 상황을 공유하세요. 가볍게 여겨지는 상황도 소통을 통해 해결될 수 있으며, 당신이 느끼는 불편함을 경감시킬 수 있습니다.';
    } else if (scores[highestScoreIndex] >= 1.0 && scores[highestScoreIndex] < 1.3) {
        resultText = '발생한 사건의 날짜, 시간, 장소, 관련자 및 상황에 대해 간단히 기록하세요. 경미한 사건이라도, 추후 필요할 때 정확한 상황을 설명하는 데 도움이 됩니다.';
    } else if (scores[highestScoreIndex] >= 1.3 && scores[highestScoreIndex] < 1.5) {
        resultText = '당신을 불편하게 하는 사람이나 상황에 대해 명확한 경계를 설정하세요. 필요한 경우, "이런 행동은 나를 불편하게 해"라고 친절하게 표현하는 것이 좋습니다.';
    } else if (scores[highestScoreIndex] >= 1.5 && scores[highestScoreIndex] < 2.0) {
        resultText = '상황이 개선되지 않거나, 정서적으로 어려움을 겪고 있다면 전문가의 도움을 받는 것을 고려하세요. 상담은 감정을 정리하고 해결책을 모색하는 데 도움을 줄 수 있습니다.';
    } else {
        resultText = '매우 심각한 상황입니다. 담당 교사와 상담을 하세요.';
    }

    const resultScreen = document.getElementById("result-screen");
    const resultTextElem = document.createElement("p");
    resultTextElem.textContent = resultText;
    resultTextElem.style.marginTop = "20px"; // 그래프와의 간격을 위해 여백 추가
    resultTextElem.style.fontSize = "1.2em"; // 텍스트 크기 조정
    resultTextElem.style.textAlign = "center"; // 텍스트 중앙 정렬
    resultTextElem.style.color = "#333"; // 텍스트 색상 설정

    resultScreen.appendChild(resultTextElem);
}
