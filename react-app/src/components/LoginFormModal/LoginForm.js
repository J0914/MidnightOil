import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import styles from '../css-modules/loginform.module.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        Redirect('/profile')
    }
  };

  const onDemo = async (e) => {
    e.preventDefault();
    const demoEmail = 'demo@aa.io'
    const demoPw = 'password'
    const data = await dispatch(login(demoEmail, demoPw));
    if (data) {
      setErrors(data);
    } else {
        Redirect('/profile');
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/profile' />;
  }

  return (
    <form id={styles.login_form} onSubmit={onLogin}>
      <div id={styles.login_content__wrapper}>
        <div id={styles.login_header__div}>
            <h2 id={styles.login_header}> Welcome Back! </h2>
        </div>
      <div id={styles.login_errors}>
        {errors.map((error, ind) => (
          <li className={styles.error} key={ind}>{error}</li>
        ))}
      </div>
        <div id={styles.login_inputs__container}>
            <div className={styles.login_input__div}>
                <label className={styles.login_label} htmlFor='email'>Email</label>
                <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
                className={styles.login_input}
                />
            </div>
            <div className={styles.login_input__div}>
                <label className={styles.login_label} htmlFor='password'>Password</label>
                <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                className={styles.login_input}
                />
            </div>
        </div>
        <div id={styles.login_buttons__div}>
            <button className={styles.login_btns} type='submit'>Login</button>
            <button className={styles.login_btns} onClick={onDemo}>Demo</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;