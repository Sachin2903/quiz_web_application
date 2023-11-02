import { Fragment, useState, useEffect, useLayoutEffect, useRef } from "react";
import { Quizdata } from "./quizdata";
import { tru } from "./quizdata";
import styles from "./quizstructure.module.css";

export function Quizstructure() {
    const progressCount = useRef(0);
    const [reset, SetReset] = useState(false);
    const [questionBank, SetquestionBank] = useState([...Quizdata])
    const [mainQuestion, setMainQuestion] = useState({
        question: "",
        options: [],
        answer: -1
    })
    const [marks, setMarks] = useState(0);
    const [quepage, setQuepage] = useState(0);
    const [truanswer, setTruAnswer] = useState([...tru]);
    const [ansstyle, setAnsStyle] = useState(-1);
    const [btnstate, setbtnState] = useState("Next");
    const [min, setMin] = useState(9);
    const [sec, setSec] = useState(60);
    const [perSec, setPerSec] = useState(60)

    useEffect(() => {
        const idd = setTimeout(() => {
            if (quepage < 10) {
                setPerSec(perSec - 1);
                if (perSec == 1) {
                    changeQuestion();
                    setPerSec(60);
                }
            }
        }, 1000)
        return () => {
            clearTimeout(idd);
        }
    }, [perSec]);

    useEffect(() => {
        const id = setTimeout(() => {
            if (quepage < 10) {
                setSec(sec - 1);
                if (sec == 1) {
                    setMin(min - 1)
                    if (min == 0) {
                        setQuepage(11)
                    }
                    setSec(60)
                }
            }
        }, 1000)
        return () => {
            clearTimeout(id);
        }
    }, [sec]);

    useLayoutEffect(() => {
        let que = Question();
        setMainQuestion(que)
    }, [reset])

    function Question() {
        console.log('funtion called');
        const Index = Math.floor(Math.random() * questionBank.length);
        const Question = questionBank[Index];
        const newArray = [...questionBank]
        newArray.splice(Index, 1);
        SetquestionBank([...newArray])
        return Question;
    }

    function changeQuestion() {
        setAnsStyle(-1)
        if (quepage < 9) {
            console.log('called');
            let que = Question();
            setMainQuestion(que)
            setQuepage(quepage + 1)
            setPerSec(60)
            if (questionBank.length === 1) {
                setbtnState("Submit");
            }
        } else if (quepage === 9) {
            setQuepage(11);
        } else {
            setbtnState("Next");
            setMin(9);
            setSec(60)
            setMarks(0);
            setQuepage(0);
            setTruAnswer([...tru]);
            SetquestionBank(Quizdata);
            progressCount.current = 0;
            setPerSec(60);
            SetReset(!reset)
        }
    }
    function scoreFun(check) {
        if (truanswer[quepage]) {
            setAnsStyle(check - 1)
            if (mainQuestion.answer === check)
                setMarks(marks + 2);
            let truArray = [...truanswer]

            truArray[quepage] = false;
            setTruAnswer(truArray);
            progressCount.current = progressCount.current + 1;
        }
    }

    let colorCode = "";
    if (progressCount.current < 3) {
        colorCode = "#ff0000";
    } else if (progressCount.current < 5) {
        colorCode = "#FFA500";
    } else if (progressCount.current < 8) {
        colorCode = "#FFFF00";
    } else if (progressCount.current < 20) {
        colorCode = "#90EE90";
    }



    return (
        <Fragment>
            {quepage < 10 ? (<p className={styles.timetime}>{min}:{sec}</p>) : null}
            <div className={styles.quizbox}>{
                ((quepage === 11)) ? (
                    <Fragment>
                        <div>

                            <h1>Your Score : {marks}</h1>
                            <h1>Total Score 20</h1>
                        </div>
                        {
                            (marks < 12) ? (<div className={styles.lastDiv}><p className={styles.lastDivTry}>You Fail But you can retry</p><button onClick={changeQuestion} className={styles.restartbtn} >Restart</button></div>) : (<h3>Great you pass the test</h3>)
                        }
                    </Fragment>
                ) : (
                    <Fragment>
                        {quepage < 10 ? <p className={`${styles.perTime} ${perSec < 11 ? styles.perTimeAnimation : null}`}>{perSec}</p> : null}
                        <p style={{ backgroundColor: `${colorCode}`, width: `${progressCount.current * 10}%` }} className={styles.loader}>{progressCount.current === 0 ? "" : (progressCount.current / 10) * 100 + "%"}</p>
                        <p className={styles.question}>{quepage + 1}. {mainQuestion.question}</p>
                        <div className={styles.optiondiv}>{
                            mainQuestion.options.map((e, i) => <p onClick={() => scoreFun(i + 1)} className={` ${styles.optionoption} ${(ansstyle === i) ? styles.optionoptionselect : null}`} key={i * 10}>{e}</p>)
                        }
                        </div>
                        <div className={styles.btndiv}><button onClick={changeQuestion} className={styles.nextbtn}>{btnstate}</button></div>
                    </Fragment>
                )

            }</div>


        </Fragment>
    );
}
