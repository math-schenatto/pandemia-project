import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, setHours, setMinutes, setSeconds, setMilliseconds, isBefore, isEqual, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import { MdChevronLeft, MdChevronRight} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Time } from './styles';

import api from '../../services/api';

const range = [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

function Dashboard({ navigation }) {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const profile = useSelector(state => state.user.profile);
  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", {locale: pt}),
    [date]
  );

  useEffect(()=>{
    async function loadSchedule(){
      const response = await api.get('schedule',{
        params: {date},
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      const data = range.map(hour => {
        const checkDate = setMilliseconds(setSeconds(setMinutes(setHours(date, hour),0), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);
        
        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.appointments.find(a =>
            isEqual(parseISO(a.date), compareDate),
          ),
        };

      });

      setSchedule(data);
    }

    loadSchedule();
  }, [date]);

  function handlePrevDay(){
    setDate(subDays(date, 1));
  }

  function handleNextDay(){
    setDate(addDays(date, 1));
  }

  const [ongs, setOngs] = useState([]);
  useEffect(()=>{
    async function loadOngs(){
      const response = await api.get('ongs');
      
      const dataOngs = response.data;

      setOngs(dataOngs);
    }

    loadOngs();
  }, []);
  
  
  if(profile.provider){
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
          {schedule.map(time =>(
            <Time key={time.time} past={time.past} available={!time.appointment}>
              <strong>{time.time}</strong>
              <span>{time.appointment ? time.appointment.user.name : 'Em aberto'}</span>
              <span>{!!(time.appointment)?time.appointment.description: ''}</span>
              <span>Local: {!!(time.appointment)?time.appointment.gathering_place: ''}</span>
            </Time>
          ))}
        </ul>
  
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>Lista de Ongs</h1>
        <ul>
        {ongs.map(time =>( 
            <Time >
              <img width="57" height="57" src={!!(time.avatar)?time.avatar.url:"https://api.adorable.io/avatars/57/abott@adorable.png"} alt="avatar"/>
              
              
              
              <Link 
                to={
                  {
                   pathname: `ong/${time.id}`,
                   teste: time.id,
                  }
                }>
                <strong>{time.name}</strong>  
              </Link>
              
              <span>{time.description}</span>
              <span>Local: {time.address}</span>
            </Time>
          ))}
        </ul>
  
      </Container>
    );
  }
  
}

export default Dashboard;