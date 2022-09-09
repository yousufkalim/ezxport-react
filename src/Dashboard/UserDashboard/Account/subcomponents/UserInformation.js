import React from 'react';
import QuizIcon from '../../../../assets/QuizIcon.svg';
import InputField from '../../../../components/Common/InputField';

const UserInformation = () => {

  const userData = localStorage.getItem('userData');
  const user = JSON.parse(userData);
  
  return (
    <div className="emailAddress_div">
                  <label className="email_input_label" htmlFor="">
                    E-mail address
                  </label>
                  <InputField disabled value={user.email} type="text" className="email_input" placeholder="mail@mail.com" />
                  <img src={QuizIcon} alt="" className="email_input_icon" />
      </div>
  )
}

export default UserInformation;