'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const button = document.getElementById('button');
    const result = document.getElementById('result');
    const scoreMessage = document.getElementById('scoreMessage');
    const quizScore = document.querySelector('#result > p');
    

    const quizSet = [
        { quizQuestion: '同志社大学の創立年は？', c: ['1875年', '1905年', '1865年', '1915年'] },
        { quizQuestion: '同志社大学にある学部の数は？', c: ['14', '9', '11', '13'] },
        { quizQuestion: '同志社大学の最も新しい学部はどれ？', c: ['グローバル地域文化学部', 'グローバル・コミュニケーション学部', '文化情報学部', 'スポーツ健康科学部'] },
        { quizQuestion: '11月にある学園祭の名前は？', c: ['EVE祭', '11月祭', '藤陵祭', '流木祭'] },
    ];

    let quizIndex = 0; //現在の問題
    let afterAnswer; //回答を選んだ後
    let score = 0; //正当数



    //正誤判定
    function answerCheck(li) {
        if (afterAnswer === true) {
            return;
        }

        afterAnswer = true;

        if (li.textContent === quizSet[quizIndex].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }

        button.classList.remove('disabled');//Nextを活性化
    }

        //ランダム設定
        function shuffle(arr) {
            for (let x = arr.length - 1; x > 0; x--) {
                const y = Math.floor(Math.random() * (x + 1));
                [arr[x], arr[y]] = [arr[y], arr[x]];
            }
            return arr;
        }

    function setQuiz() {

        afterAnswer = false;

        question.textContent = quizSet[quizIndex].quizQuestion;

        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        //クリック処理
        const quizchoice = shuffle([...quizSet[quizIndex].c]);
        quizchoice.forEach(choice => {
            let li =document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                answerCheck(li);
            });

            choices.appendChild(li);
        });
    
        if (quizIndex === quizSet.length - 1) {
            button.textContent = '結果を見る';
        }
    }
    
    setQuiz();
    
    //ボタンの活性・非活性
    button.addEventListener('click', () => {
        if (button.classList.contains('disabled')) {
            return;
        }
        button.classList.add('disabled');
        
        
        if (quizIndex === quizSet.length - 1) {
            quizScore.textContent = `Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden'); //結果を出すために消去


            // console.log(quizIndex)
            // console.log(score)
        } else { //1~3問目
            quizIndex++;
            setQuiz();
        }
    });
}