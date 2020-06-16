import React from 'react';
import { Form } from '@unform/web';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { createAppointmentRequest } from '../../store/modules/appointment/actions';
import Select from '../../components/Select';
import Input from '../../components/Input';

import { Container } from './styles';

function Donate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { provider_id, date } = useParams();
  
  const options = [
    { value: 'Meu endereço', label: 'Meu endereço' },
    { value: 'Na ong', label: 'Na ong' },
  ];

  function handleSubmit(data){
    dispatch(createAppointmentRequest(data));
  }

  function handleCancel(){
    history.push('/dashboard');
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input name="description" type="text" placeholder="Diga qual a sua doação"/>
        <Input hidden name="date" type="text" value={date} placeholder="Diga qual a sua doação"/>
        <Input hidden name="provider_id" type="text" value={provider_id} placeholder="Diga qual a sua doação"/>
        <Select name="gathering_place" options={options} placeholder="Onde a doação será entregue?"/>

        <hr />

        <button type="submit">Agendar Doação</button>
      </Form>

      <button type="button" onClick={handleCancel}>
        Cancelar
      </button>

    </Container>
  );
}

export default Donate;