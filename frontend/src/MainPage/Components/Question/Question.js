import React,{useState, useEffect} from 'react'
import {Button} from "@material-ui/core"
import axios from 'axios';
import Solution from '../Solution/Solution';
import Mark from '../Mark/Mark';

const Question = () => {
    const [value, setValue] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [questionId, setQuestionId] = useState("");

    useEffect(async() => {
        try{
            const result = await fetch(`/get/question/user/id/${localStorage.getItem("id")}`,{
                method:"get",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    'Access-Control-Allow-Origin': '*'
                },
            });
            const data = await result.json()
            console.log(data.data);
            setValue(data.data);
        }
        catch(err){
            console.log(err);
        }
    },[])

    const handleMark = (id) => {
        setIsOpen(true);
        setQuestionId(id);
    }
    const handleSolution = (id) => {
        setIsOpen1(true);
        setQuestionId(id);
    }

    return (
        <div className='Pending'>
            {isOpen&&<Solution isOpen={isOpen} setIsOpen={setIsOpen} questionId={questionId} />}
            {isOpen1&&<Mark isOpen={isOpen1} setIsOpen={setIsOpen1} questionId={questionId} />}
            <h2>Pending Questions</h2>
            <div className='PendingBody'>
                {
                    value?.map((data, index) => {
                        return <div className='PendingCard' title={data?.comment}>
                            <h3>{data?.label}</h3>
                            <h4>{data?.author?.name}</h4>
                            <a href={data?.link} target="_blank"><Button variant='contained' className='attemptBtn'>Attempt</Button></a>
                            <Button variant='contained' className='markBtn' onClick={() => handleSolution(data?.id)}>Mark as Done</Button>
                            <Button variant='contained' className='viewBtn' onClick={() => handleMark(data?.id)}>View Solution</Button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Question
