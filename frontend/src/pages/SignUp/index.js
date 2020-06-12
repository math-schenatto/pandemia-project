import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('Insira um nome válido'),
  email: Yup.string().email('Insira uma e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

function SignUp() {
  
  function handleSubmit(data){
    console.tron.log(data);
  }
  
  return  (
    <>
    <img src={logo} alt="App de Doações" width="90px" height="68px" viewBox="0 0 90 68"/>

    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name="name" placeholder="Nome completo"/>
      <Input name="email" type="email" placeholder="Seu e-mail"/>
      <Input name="password" type="password" placeholder="Sua senha"/>

      <button type="submit"> Criar conta </button>

      <Link to="/">Já tenho login</Link>

    </Form>

    </>
  );
}

export default SignUp;