import React,{useState, useEffect} from 'react'
import "./Mark.css"
import {Button, Select, MenuItem} from "@material-ui/core"
import ReactModal from "react-modal";
import {FaTimes} from "react-icons/fa";
import moment from 'moment';

const Mark = ({isOpen, setIsOpen, questionId}) => {
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");

    useEffect(() => {
        console.log(isOpen, questionId);
    },[])
    const handleSubmit = async() => {
        if(language === "" || code === ""){
            alert("Please fill the fields");
            return;
        }
        try{
            let formData = JSON.stringify({
               id: questionId,
               language: language,
               code: code,
               user: {
                   id: localStorage.getItem('id'),
                   name: localStorage.getItem('name')
               },
               solvedAt: moment(new Date()).format("DD-MM-YYYY")
            })
            const result = await fetch('/mark/pending/as/completed',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body : formData
            });
            const data = await result.json()
            if(data.success){
                alert(data.message);
                addQuestionSolved(data.data.id);
            }
            else{
                alert(data.message);
            }
        }
        catch(err){
            alert('Some error Occured! Try after some time.')
            console.log(err);
        }
    }
    
    const addQuestionSolved = async(quesId) => {
        try{
            const result = await fetch(`/add/question/in/question-solved/id/${localStorage.getItem('id')}/questionId/${quesId}`,{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    'Access-Control-Allow-Origin': '*'
                },
            });
            const data = await result.json();
        }
        catch(err){
            alert('Some error Occured! Try after some time.')
            console.log(err);
        }
    }
    return (
        <ReactModal isOpen={isOpen} portalClassName="MarkModal" >
            <FaTimes className='closeIcon' onClick={() => setIsOpen(false)} />
            <div className='Mark'>
                <div className='MarkHead'>
                    <label>Select Language</label>
                    <Select variant='outlined' value={language} onChange={(e) => setLanguage(e.target.value)} className="materialSelect">
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="C++">C++</MenuItem>
                        <MenuItem value="Java">Java</MenuItem>
                        <MenuItem value="Python">Python</MenuItem>
                    </Select>
                </div>
                <textarea className='MarkBody' value={code} onChange={(e) => setCode(e.target.value)}></textarea>
                <Button variant='contained' className='markBtn' onClick={() => handleSubmit()}>Mark as Done</Button>
            </div>
        </ReactModal>
    )
}

export default Mark
