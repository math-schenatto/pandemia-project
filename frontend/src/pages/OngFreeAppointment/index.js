import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight} from 'react-icons/md';

import { Container, Time, ButtonDonate } from './styles';

import api from '../../services/api';


function OngfreeAppointment( { props } ) {
  
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const { provider_id } = useParams();
  
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", {locale: pt}),
    [date]
  );
  
  useEffect(()=>{
    async function loadAvailable(){
      const response = await api.get(`ongs/${provider_id}/available`,{
        params: {
         date: date.getTime(),
        },
      });

      setHours(response.data);
    }

    loadAvailable();
  }, [date, provider_id]);

  function handlePrevDay(){
    setDate(subDays(date, 1));
  }

  function handleNextDay(){
    setDate(addDays(date, 1));
  }

  function handleDonate(isAvaiable, hour){
    const nested_date = format(date, `yyyy-MM-dd'T${hour}:00'`);
    if (isAvaiable === true){
      return( 
        <ButtonDonate><Link to={`/ong/${provider_id}/${nested_date}/donate`}>Doar</Link></ButtonDonate>
      )
    }
  }
  
    return (
      <Container>
        <header>
          <button type="button" onClick={handlePrevDay}>
            <MdChevronLeft size={36} color="#FFF" />
          </button>
            <strong>{dateFormatted}</strong>
          <button type="button" onClick={handleNextDay}>
            <MdChevronRight size={36} color="#FFF" />
          </button>
        </header>
  
        <ul>
          {hours.map(time =>(
            <Time key={time.time} past={time.past} available={!time.available}>
              <strong>{time.time}</strong>
              {handleDonate(time.available, time.time)}
            </Time>
          ))}
        </ul>
  
      </Container>
    );
}

export default OngfreeAppointment;