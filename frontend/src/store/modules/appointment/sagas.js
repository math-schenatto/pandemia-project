import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { createAppointmentSuccess, createAppointmentFailure} from './actions';

import history from '../../../services/history';

export function* createAppointment({ payload }){
  try {
    
    const { date, provider_id, description, gathering_place, ...rest} = payload.data;
    
    
    const appointment = Object.assign(
      {date, provider_id, description, gathering_place},
    );

    const response = yield call(api.post, 'appointments', appointment);

    toast.success('Agendamento de Doação realizado com sucesso.');

    yield put(createAppointmentSuccess(response.data));

    history.push('/dashboard');
    
  } catch (err) {
    
    toast.error('Erro ao agendar, verifique os dados e tente novamente.');
    yield put(createAppointmentFailure());

  }
  
}

export default all([
  takeLatest('@appointment/CREATE_APPOINTMENT_REQUEST', createAppointment)
]);