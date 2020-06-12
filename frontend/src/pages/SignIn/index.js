import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';


const schema = Yup.object().shape({
  email: Yup.string().email('Insira uma e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignIn() {

  const dispatch = useDispatch();
  
  function handleSubmit({ email, password}){
    //console.tron.log(data);
    dispatch(signInRequest(email, password));
  }
  
  return  (
    <>
    <img src={logo} alt="App de Doações" width="90px" height="68px" viewBox="0 0 90 68"/>

    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name="email" type="email" placeholder="Seu e-mail"/>
      <Input name="password" type="password" placeholder="Sua senha"/>

      <button type="submit"> Acessar </button>

      <Link to="/register">Criar conta gratuita</Link>

    </Form>

    </>
  );
}

export default SignIn;