import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';
import Select from '../../components/Select';
import Input from '../../components/Input';

import logo from '../../assets/logo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('Insira um nome válido'),
  email: Yup.string().email('Insira uma e-mail válido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

const options = [
  { value: 'cid', label: 'Doações' },
  { value: 'provider', label: 'Ong' },
];

function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password, teste }){
    const provider = teste === 'cid'
    ? false
    : true;
    dispatch(signUpRequest(name, email, password, provider));
  }
  
  return  (
    <>
    <img src={logo} alt="App de Doações" width="90px" height="68px" viewBox="0 0 90 68"/>

    <Form schema={schema} onSubmit={handleSubmit} initialData={{ teste: 1 }}>
      <Input name="name" placeholder="Nome completo"/>
      <Input name="email" type="email" placeholder="Seu e-mail"/>
      <Select name="teste"  options={options} placeholder="Defina o tipo de usuário"/>
      <Input name="password" type="password" placeholder="Sua senha"/>

      <button type="submit"> Criar conta </button>

      <Link to="/">Já tenho login</Link>

    </Form>

    </>
  );
}

export default SignUp;