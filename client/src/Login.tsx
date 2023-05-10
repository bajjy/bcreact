import React from 'react';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ffetch from './ffetch';
import type { User } from './types';

import './App.css';

const defaultFormFields = {
  email: '',
  password: '',
}

const LoginForm = (props: {setUser: (user: User | null) => void}) => {
  const {setUser} = props;
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errors, setErrors] = useState({
    errorCharCount: true,
    errorLowercase: true,
    errorUppercase: true,
    errorNumbercase: true,
    errorSpecialChar: true,
    errorServer: false,
  });
  const { email, password } = formFields;
  
  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  // handle input changes
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleErrors();
    setFormFields({ ...formFields, [name]: value });
  };
  const handleErrors = () => {
    setErrors({
      errorCharCount: false,
      errorLowercase: false,
      errorUppercase: false,
      errorNumbercase: false,
      errorSpecialChar: false,
      errorServer: false,
    });

    if (password.length < 8) setErrors(err => ({...err, errorCharCount: true}));
    if (!(/[A-Z]/.test(password))) setErrors(err => ({...err, errorUppercase: true}));
    if (!(/[a-z]/.test(password))) setErrors(err => ({...err, errorLowercase: true}));
    if (!(/\d/.test(password))) setErrors(err => ({...err, errorNumbercase: true}));
    if (!(/(?=.*[@$!%*?&_])/.test(password))) setErrors(err => ({...err, errorSpecialChar: true}));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(err => ({...err, errorServer: false}));
  
    try {
      const res: User = await ffetch(
        '/login',
        {
          method: 'POST',
          body: {
            email,
            password
          }
        }
      );
      console.log(res)
      setUser(res);
      //resetFormFields();
      setErrors(err => ({...err, errorServer: false}));

    } catch (error) {
      setErrors(err => ({...err, errorServer: true}))
      console.log("User Sign In Failed");
    }
  };

  const reload = () => {
    setUser(null);
    resetFormFields();
  };

  useEffect(() => {
    handleErrors();
  }, []);

  return (
    <div className="App-header">
      <div className="card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={handleChange}
          />
          <div className="errors">
            <div className={`ok-notok-label ok ${errors.errorCharCount && 'notok'}`}><span>{errors.errorCharCount ? '✖' : '✔'}</span> Min 8 Chars</div>
            <div className={`ok-notok-label ok ${errors.errorLowercase && 'notok'}`}><span>{errors.errorLowercase ? '✖' : '✔'}</span> Lowercase</div>
            <div className={`ok-notok-label ok ${errors.errorUppercase && 'notok'}`}><span>{errors.errorUppercase ? '✖' : '✔'}</span> Uppercase</div>
            <div className={`ok-notok-label ok ${errors.errorNumbercase && 'notok'}`}><span>{errors.errorNumbercase ? '✖' : '✔'}</span> Number</div>
            <div className={`ok-notok-label ok ${errors.errorSpecialChar && 'notok'}`}><span>{errors.errorSpecialChar ? '✖' : '✔'}</span> Spec. symbol</div>
            {errors.errorServer && <div className="ok-notok-label notok"><span>✖</span> Error Login</div>}
          </div>
          <div className="button-group">
            <button type="submit">Sign In</button>
            <span>
              <button type="button" onClick={reload}>
                Clear
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
