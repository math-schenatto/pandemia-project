export function createAppointmentRequest(data){
  return {
    type: '@appointment/CREATE_APPOINTMENT_REQUEST',
    payload: { data},
  };
}

export function createAppointmentSuccess(profile){
  return {
    type: '@appointment/CREATE_APPOINTMENT_SUCCESS',
    payload: { profile },
  };
}

export function createAppointmentFailure(){
  return {
    type: '@appointment/CREATE_APPOINTMENT_FAILURE',
  };
}