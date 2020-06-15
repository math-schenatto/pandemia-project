import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import Select from 'react-select'
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('Insira um nome válido'),
  email: Yup.string().email('Insira uma e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

const options = [
  { value: 'cid', title: 'Cidadão' },
  { value: 'provider', title: 'Ong' },
];

function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password, user_type }){
    console.tron.log(user_type)
    const provider = user_type === 'Cidadão'
    ? false
    : true;
    dispatch(signUpRequest(name, email, password, provider));
  }
  
  return  (
    <>
    <img src={logo} alt="App de Doações" width="90px" height="68px" viewBox="0 0 90 68"/>

    <Form schema={schema} onSubmit={handleSubmit}>
      <Input name="name" placeholder="Nome completo"/>
      <Input name="email" type="email" placeholder="Seu e-mail"/>
      <Select name="user_type" options={options} placeholder="Qual seu tipo de conta?" />
      <Input name="password" type="password" placeholder="Sua senha"/>

      <button type="submit"> Criar conta </button>

      <Link to="/">Já tenho login</Link>

    </Form>

    </>
  );
}

export default SignUp;