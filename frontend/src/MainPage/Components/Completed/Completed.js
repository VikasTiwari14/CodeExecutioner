import React,{useState, useEffect} from 'react';
import "./Completed.css";
import {Button} from "@material-ui/core"
import Solution from "../Solution/Solution"

const Completed = () => {
    const [value, setValue] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [questionId, setQuestionId] = useState("");

    useEffect(async() => {
        try{
            const result = await fetch(`/get/completed/question/id/${localStorage.getItem("id")}`,{
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

    return (
        <div className='Pending'>
            {isOpen&&<Solution isOpen={isOpen} setIsOpen={setIsOpen} questionId={questionId} />}
            <h2>Completed Questions</h2>
            <div className='PendingBody'>
                {
                    value?.map((data, index) => {
                        return <div className='PendingCard' title={data?.comment}>
                            <h3>{data?.label}</h3>
                            <h4>{data?.author?.name}</h4>
                            <div></div>
                            <a href={data?.link} target="_blank"><Button variant='contained' className='attemptBtn'>Visit</Button></a>
                            <Button variant='contained' className='viewBtn' onClick={() => handleMark(data?.id)} >View Solution</Button>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Completed;
