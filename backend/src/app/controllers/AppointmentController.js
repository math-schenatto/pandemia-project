import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import User from '../models/User';
import File from '../models/File';
import * as Yup from 'yup';

class AppointmentController {
  async index(req, res){
    
    const { page = 1} = req.query;
    
    const appointments = await Appointment.findAll({
      where: {user_id: req.userId, canceled_at: null },
      order: [
        'date'
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            }
          ]
        },
      ],
    });

    return res.json(appointments);
  }
  
  async store(req, res){
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    }); 

    if (!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails' });
    }

    const { provider_id, date, description, gathering_place } = req.body;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    //if(!isProvider){
    //  return res.status(401).json({ error: 'You can only create appintments with providers'});
    //}

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())){
      return res.status(400).json({ error: 'Data inválida'});
    }

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability){
      return res.status(400).json({ error: 'Horário não está disponível'});
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      description,
      gathering_place,
      date,
    });

    return res.json(appointment);
  }

  async delete(req, res){
    const appointment = await Appointment.findByPk(req.params.id);

    if(appointment.user_id != req.userId){
      return res.status(401).json({
        error: "Permissão negada",
      });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if(isBefore(dateWithSub, new Date())){
      return res.status(401).json({ error: 'Não é permitido cancelar pelo horário'});
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    return res.json(appointment);
  }
}

export default new AppointmentController();