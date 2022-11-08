import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Question from '../Components/Question';

const TestSurvey = ({answers, setAnswers}) => {
    // 설문지를 받는다. or 내 쪽에서 갖고 있는다.

    /** navigate */ 
    // 결과 페이지로 가기 위한 navigate
    const navigate = useNavigate()
    /** state */
    // 현재 질문에 대한 인덱스
    const [curQuestion, setCurQuestion] = useState(0)
    // 현재 답변 (질문에 대해 선택된 옵션들) 배열로 저장
    const [curAnswer, setCurAnswer] = useState([])
    // 전체 답변 저장 배열로 저장 (서버에 보내줄 것)
    // const [answers, setAnswers] = useState([])

    // 질문 생김새가 이래야 함
    const questions = [
        {   
            type: 'radio',
            max: 1,
            title: '1. 둘 중에 하나를 고르세요!',
            options : ['고소한', '달달한']
        },
        {   
            type: 'check',
            max: 2,
            title: '2. 여러 개를 고르세요!',
            options : ['사과', '배', '바나나']
        },
        {   
            type: 'check',
            max: 3,
            title: '3. 여러 개를 고르세요!',
            options : ['커피', '초콜릿', '어쩌구']
        },
        {   
            type: 'radio',
            max: 1,
            title: '4. 둘 중에 하나를 고르세요!',
            options : ['탄산', '노 탄산']
        },
    ]

    useEffect(()=>{
        console.log("최종 답변 :")
        console.log(answers)
        console.log("현재 답변 :")
        console.log(curAnswer)
        console.log("현재 문제 :")
        console.log(curQuestion)
    },[answers, curAnswer,curQuestion])

    const handleNextBtn = () => {
        // 다음 질문으로 가는데...
        // 선택된 옵션이 없거나 현재 질문이 원하는 답변의 개수보다 모자르다면
        if(curAnswer.length === 0 || curAnswer.length < questions[curQuestion].max) {
            alert('선택지를 모두 골라주세요')
            return
        }

        // 선택된 옵션이 올바르게 있는 경우 있는 경우
        // 선택된 옵션 최종 답변 모음에 추가
        setAnswers([...answers, curAnswer])
        // 다음 문제로 넘어가기
        setCurQuestion(curQuestion + 1);
        // 현재 답변 저장되었던 것 초기화
        setCurAnswer([])
    }

    const handlePrevBtn = () => {
        // 이전 페이지로 돌아감

        // 이전 페이지의 답변을 현재 답변 state에 다시 저장 -> 다시 이전 상태로 돌아가기 위함임
        setCurAnswer(answers.slice(-1)[0])
        // 선택되었던 옵션 답변에서 제거 (pop)
        setAnswers(answers.slice(0, -1))
        setCurQuestion(curQuestion - 1);
    }

    const selectAnswer = (selectedIdx) => {
        // (type 없애고 max로만 하려면 1일때랑 1보다 큰 경우로 나눠서 해야함!)

        if(questions[curQuestion].type === 'radio'){
        /** radio : 요구하는 답변이 1개인 문제 */

            // 이미 추가된 옵션을 선택하는 경우라면
            if(curAnswer.includes(selectedIdx)) return; // 아무 동작도 하지 않는다.

            // 새로운 옵션을 선택한 경우라면
            // 기존의 현재 답변을 초기화하고 현재 선택한 옵션만 답변에 추가
            setCurAnswer([selectedIdx])
            // 추가 작업은 하지 않는다.
        }else if(questions[curQuestion].type === 'check'){
        /**  check : 요구하는 답변이 여러개인 문제 */ 

            // 이미 추가된 옵션을 다시 선택하는 경우라면
            if(curAnswer.includes(selectedIdx)){
                setCurAnswer(curAnswer.filter((el) => el !== selectedIdx))
                return; // 추가 동작하지 않고 돌아간다
            }

            // 새로운 옵션을 선택한 경우라면
            // 현재 선택된 옵션의 개수가 필수 선택 개수 보다 적다면 (다 선택하지 않은 경우 - 새로운 옵션 추가 가능)
            if(curAnswer.length < questions[curQuestion].max){
                // 기존 답변에 선택된 옵션 추가한다.
                setCurAnswer([...curAnswer, selectedIdx])
                // 추가 작업은 하지 않는다.
                return
            }

            //  선택이 완료되었다면
            alert('선택이 모두 완료되었습니다.')
        }
    }

    const answerSubmit = () => {
        // 마지막 답변 추가!
        if(curAnswer.length === 0 || curAnswer.length < questions[curQuestion].max) {
            alert('선택지를 모두 골라주세요')
            return
        }
        // 선택된 옵션이 올바르게 있는 경우 있는 경우
        // 선택된 옵션 최종 답변 모음에 추가
        setAnswers([...answers, curAnswer])

        navigate('/test/result')
    }

    return (
        <div className='Survey'>
                <Question 
                        question={questions[curQuestion]}
                        answer={curAnswer}
                        selectAnswer={selectAnswer}
                />
                <button className={curQuestion === 0 ? 'hide': ''} onClick={handlePrevBtn}>prev</button>
                <button className={curQuestion === questions.length-1 ? 'hide': ''} onClick={handleNextBtn}>next</button>
                {curQuestion === questions.length-1 ? <button onClick={answerSubmit}>결과보기</button> : null}

        </div>
    );
};

export default TestSurvey;