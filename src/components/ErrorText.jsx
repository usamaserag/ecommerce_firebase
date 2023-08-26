import React, {useEffect} from 'react'
import 'animate.css';


const ErrorText = ({ text}) => {
    useEffect(() => {
        // Add the animation class when the text changes
        const element = document.getElementById('myElement');
        element.classList.add('animate__animated', 'animate__shakeX');

        // Remove the animation class after the animation completes
        const animationEndHandler = () => {
          element.classList.remove('animate__animated', 'animate__shakeX');
          element.removeEventListener('animationend', animationEndHandler);
        };
        element.addEventListener('animationend', animationEndHandler);

        // Cleanup the event listener on component unmount
        return () => {
          element.removeEventListener('animationend', animationEndHandler);
        };
      }, [text]);
  return (
    <p  id="myElement" className="login_msg_error">{text}</p>
  )
}

export default ErrorText