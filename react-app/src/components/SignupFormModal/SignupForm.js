import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

import styles from '../../css-modules/signupform.module.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, fName, lName));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords do not match.']);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFName = (e) => {
    setFName(e.target.value);
  };

  const updateLName = (e) => {
    setLName(e.target.value);
  };

  if (user) {
    return <Redirect to='/profile' />;
  }

  return (
    <form id={styles.signup_form} onSubmit={onSignUp}>
        <div id={styles.signup_content__wrapper}>
            <div id={styles.signup_header__div}>
                <h2 id={styles.signup_header}> Create an Account </h2>
            </div>
            <div id={styles.signup_errors}>
                {errors.map((error, ind) => (
                <li className={styles.error} key={ind}>{error}</li>
                ))}
            </div>
            <div id={styles.signup_inputs__container}>
                <div className={styles.signup_organize_div}>
                <div className={styles.signup_input__div}>
                    <label className={styles.signup_label}>First Name</label>
                    <input
                    type='text'
                    name='fName'
                    onChange={updateFName}
                    value={fName}
                    required={true}
                    className={styles.signup_input}
                    ></input>
                </div>
                <div className={styles.signup_input__div}>
                    <label className={styles.signup_label}>Last Name</label>
                    <input
                    type='text'
                    name='lName'
                    onChange={updateLName}
                    value={lName}
                    required={true}
                    className={styles.signup_input}
                    ></input>
                </div>
                </div>
                <div className={styles.signup_organize_div}>
                    <div className={styles.signup_input__div}>
                        <label className={styles.signup_label}>User Name</label>
                        <input
                        type='text'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                        required={true}
                        placeholder='must be 3 - 40 '
                        className={styles.signup_input}
                        ></input>
                    </div>
                    <div className={styles.signup_input__div}>
                        <label className={styles.signup_label}>Email</label>
                        <input
                        type='text'
                        name='email'
                        onChange={updateEmail}
                        value={email}
                        required={true}
                        className={styles.signup_input}
                        ></input>
                    </div>
                </div>
                <div className={styles.signup_organize_div}>
                    <div className={styles.signup_input__div}>
                        <label className={styles.signup_label}>Password</label>
                        <input
                        type='password'
                        name='password'
                        onChange={updatePassword}
                        value={password}
                        required={true}
                        className={styles.signup_input}
                        ></input>
                    </div>
                    <div className={styles.signup_input__div}>
                        <label className={styles.signup_label}>Confirm</label>
                        <input
                        type='password'
                        name='repeat_password'
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                        className={styles.signup_input}
                        ></input>
                    </div>
                </div>
                <div id={styles.signup_buttons__div}>
                <button className={styles.signup_btns} type='submit'>Sign Up</button>
                </div>
            </div>
        </div>
    </form>
  );
};

export default SignUpForm;