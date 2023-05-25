import { useState } from 'react';
import axios from 'axios';


const AddQuestion = () => {
    const [status, setStatus] = useState("send");
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctOption, setCorrectOption] = useState();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const formData = {
                question,
                options: [option1, option2, option3, option4],
                correctOption: (correctOption - 1)
            }
            setQuestion('');
            setOption1('');
            setOption2('');
            setOption3('');
            setOption4('');
            setCorrectOption();
            const res = await axios.post('admin/question/new', formData, config);
            setStatus("sent");
            console.log(res);
        } catch (error) {
            console.log(error);
            setStatus("failed");
        }
    }

    return (
        <>
            {
                (status !== "send") ?
                    <>
                        {
                            (status === "sending") ?
                                <h1>Saving...</h1>
                                :
                                <>
                                    <h1>Saved</h1>
                                    <button onClick={() => setStatus("send")} > Add another Question</button>
                                </>
                        }
                    </>
                    :
                    <form onSubmit={handleSubmit}>
                        <h4>Add Question</h4>
                        <label>
                            Question:
                            <input type="text" value={question} onChange={event => setQuestion(event.target.value)} />
                        </label>
                        <br />
                        <label>
                            Option 1:
                            <input type="text" value={option1} onChange={event => setOption1(event.target.value)} />
                        </label>
                        <br />
                        <label>
                            Option 2:
                            <input type="text" value={option2} onChange={event => setOption2(event.target.value)} />
                        </label>
                        <br />
                        <label>
                            Option 3:
                            <input type="text" value={option3} onChange={event => setOption3(event.target.value)} />
                        </label>
                        <br />
                        <label>
                            Option 4:
                            <input type="text" value={option4} onChange={event => setOption4(event.target.value)} />
                        </label>
                        <br />
                        <label>
                            Correct  Option :
                            <input type="Number" value={correctOption} onChange={event => setCorrectOption(event.target.value)} />
                        </label>
                        <br />
                        <button type="submit">Add Question</button>
                    </form>
            }
        </>
    );
}

export default AddQuestion