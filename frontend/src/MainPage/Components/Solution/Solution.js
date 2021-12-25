import React,{useState, useEffect} from 'react'
import ReactModal from "react-modal";
import {FaTimes} from "react-icons/fa";
import {Button} from "@material-ui/core";
import "./Solution.css";

const Solution = ({isOpen, setIsOpen, questionId}) => {
    const [value, setValue] = useState({});

    useEffect(async() => {
        const result = await fetch(`/get/question/by/id/${questionId}`,{
            method:"get",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                'Access-Control-Allow-Origin': '*'
            },
        })
        const data = await result.json();
        if(data.success){
            setValue(data.data);
        }
        else{
            alert(data.message);
            setIsOpen(false);
        }
    },[])
    return (
        <ReactModal isOpen={isOpen} portalClassName="SolutionModal" >
            <FaTimes className='closeIcon' onClick={() => setIsOpen(false)} />
            <div className='SolutionContainer'>
                <div className='SolutionHead'>
                    <h2>{value?.label}</h2>
                    <a href={value?.link} target="_blank"><Button variant='contained' className='attemptBtn'>Visit</Button></a>
                </div>
                <div className='SolutionHead'>
                    <h2>Author : {value?.author?.name}</h2>
                    <h3>Posted At : {value?.postedAt}</h3>
                </div>
                <p>{value?.comment}</p>
                {
                    value?.solution?.length>0?
                    <div className='SolutionBody'>
                        {
                            value?.solution?.map((data, index) => {
                                return (<>
                                    <hr />
                                    <div className='SolutionBodyCard'>
                                        <div className='SolutionHead'>
                                            <h3>{data?.user?.name}</h3>
                                            <h3>{data?.solvedAt}</h3>
                                        </div>
                                        <h3>Language : {data?.language}</h3>
                                        <div className='CodeContainer'>{data?.code}</div>
                                    </div>
                                </>)
                            })
                        }
                    </div>
                    :
                    <div className='SolutionBodyFalse'>
                        <h1>No Solution for this Question</h1>
                    </div>
                }
            </div>
        </ReactModal>
    )
}

export default Solution
