import React,{useState, useEffect} from 'react'
import { TextField, Button } from '@material-ui/core'
import {RiAccountCircleFill, RiLockPasswordFill} from "react-icons/ri"
import {FcGoogle} from "react-icons/fc"
import "./Login.css"
import {useHistory} from "react-router"

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { innerWidth: width, innerHeight: height } = window;
    const [x1, setX1] = useState(200);
    const [y1, setY1] = useState(388);
    const [x2, setX2] = useState(444);
    const [y2, setY2] = useState(676)
    const history = useHistory();
    // useEffect(() => {
    //     moveBall1();
    // },[x1, y1])
    const handleLogin = async() => {
        if(email === "" || pass === ""){
            alert("Please fill all fields");
            return;
        }
        try{
            let formData = JSON.stringify({
                email: email,
                password: pass
            })
            const result = await fetch('/login',{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body : formData
            });
            const data = await result.json()
            if(data.success){
                localStorage.setItem('name', data.data.name);
                localStorage.setItem('id', data.data.id);
                localStorage.setItem('email', data.data.email);
                localStorage.setItem('mobile', data.data.mobile);
                history.push({ pathname : '/main-page'})
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
    // const moveBall1 = () => {
    //     let c1 = document.getElementsByClassName('Circle1')[0];
    //     setX1(x1+10);
    //     setY1(y1+12);
    //     c1.style.left = x1+10+"px !important";
    //     c1.style.top = x2+12+"px !important";
    //     console.log(width, height);

    // }
    return (
        <div className='Login'>
            <div className='Circle1'></div>
            <div className='Circle2'></div>
            <div className='LoginForm'>
                <h1>LOGIN</h1>
                <hr />
                <div className='Spacing'></div>
                <div className='InputContainer'>
                    <RiAccountCircleFill className='inputIcon' />
                    <TextField 
                        variant="outlined" 
                        placeholder="Email" value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="materialInput" 
                        type="text"
                    />
                </div>
                <div className='InputContainer'>
                    <RiLockPasswordFill className='inputIcon' />
                    <TextField 
                        variant="outlined" 
                        placeholder="Password" value={pass} 
                        onChange={(e) => setPass(e.target.value)} 
                        className="materialInput" 
                        type="password"
                    />
                </div>
                <Button variant='contained' className='submitBtn' onClick={handleLogin}>LOGIN</Button>
                <h3>or</h3>
                <div className='LoginWithGoogle'>
                    <div className='whiteBg'><FcGoogle className='googleIcon' /></div>
                    <div><p>SIGN IN WITH GOOGLE</p></div>
                </div>
            </div>
        </div>
    )
}

export default Login
