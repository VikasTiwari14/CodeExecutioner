import React,{useState, useEffect} from 'react'
import "./MainPage.css"
import {Button, TextField} from "@material-ui/core"
import Pending from './Components/Pending/Pending';
import ReactModal from 'react-modal';
import {FaTimes} from 'react-icons/fa';
import moment from 'moment';
import Home from './Components/Home/Home';
import Completed from './Components/Completed/Completed';
import Question from './Components/Question/Question';

export const MainPage = () => {
    const [tabNum, setTabNum] = useState(3);
    const [link, setLink] = useState("");
    const [label, setLabel] = useState("");
    const [comment, setComment] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const getComponent = () => {
        switch(tabNum){
            case 1 : return <Home />
            case 2 : return <Completed />
            case 3 : return <Pending />
            case 4 : return <Question />
        }
    }
    const submitQuestion = async() => {
        if(link === "" || label===""){
            alert("Fill the required fields");
            return;
        }
        try{
            let formData = JSON.stringify({
                link : link,
                comment: comment,
                label: label,
                postedAt : moment(new Date()).format('DD-MM-YYYY'),
                author: {
                    id: localStorage.getItem("id"),
                    name: localStorage.getItem('name')
                }
            })
            const result = await fetch('/upload/question',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body : formData
            });
            const data = await result.json()
            alert(data.message);
            if(data.success){
                addQuestionPosted(data.data.id);
            }
            setLink("");
            setComment("");
            setLabel("");
            console.log(data.data);
        }
        catch(err){
            alert('Some error Occured! Try after some time.')
            console.log(err);
        }
    }
    const addQuestionPosted = async(quesId) => {
        try{
            const result = await fetch(`/add/question/in/question-posted/id/${localStorage.getItem('id')}/questionId/${quesId}`,{
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
        <div className='MainPage'>
            <ReactModal isOpen={isOpen} portalClassName="QuestionModal" >
                <FaTimes className='closeIcon' onClick={() => setIsOpen(false)} />
                <div className='QuestionForm'>
                    <p>Question Link</p>
                    <TextField variant="outlined" value={link} onChange={(e) => setLink(e.target.value)} className="materialInput" />
                    <p>Question Label</p>
                    <TextField variant="outlined" value={label} onChange={(e) => setLabel(e.target.value)} className="materialInput" />
                    <p>Comment</p>
                    <TextField variant="outlined" multiline value={comment} onChange={(e) => setComment(e.target.value)} className="materialInput" />
                    <Button variant='contained' className='addQuestion' onClick={submitQuestion}>Add Question</Button>
                </div>
            </ReactModal>
            <div className='NavBar'>
                <h2>Code<br/>Executioner</h2>
                <div className='SideNavBar'>
                    <div className={tabNum === 1&&"selectedMenu"} onClick={() =>setTabNum(1)}>Home</div>
                    <div className={tabNum === 2&&"selectedMenu"} onClick={() =>setTabNum(2)}>Completed</div>
                    <div className={tabNum === 3&&"selectedMenu"} onClick={() =>setTabNum(3)}>Pending</div>
                    <div className={tabNum === 4&&"selectedMenu"} onClick={() =>setTabNum(4)}>My Questions</div>
                    {/* <div className={tabNum === 5&&"selectedMenu"} onClick={() =>setTabNum(5)}>My Solutions</div> */}
                    <Button variant='contained' className='addQuestion' onClick={() => setIsOpen(true)}>Add Question</Button>
                </div>
            </div>
            <div className='mainComponent'>
                {getComponent()}
            </div>
        </div>
    )
}
