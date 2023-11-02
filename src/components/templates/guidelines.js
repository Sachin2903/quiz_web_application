import { Fragment } from "react";
import styles from "./guidelines.module.css";
import { useNavigate } from "react-router-dom";
export function Guidelines() {
    const nav=useNavigate()
function changePage(){
 nav("/quizstarted")
}


    return (
        <Fragment>
            <div className={styles.mainDiv}>
                <h2>Guidlines To Be Follow  :---</h2>
                <p>There will be 10 random question with 4 option out of which one is correct</p>
                <p>Each Question is of 2 Marks</p>
                <p>Minimum 12 Marks need to pass and If fail you can retry</p>
                <p>Total 10 minutes were given and 1 minutes per question </p>
                
             <button onClick={changePage}className={styles.startQuiz}>Start Quiz</button>
            </div>

        </Fragment>
    )
}