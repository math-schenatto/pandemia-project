import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Erro de validação Session' });
    }
    
    const { email, password} = req.body;
    console.log('oi');
    const user = await User.findOne({ 
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },  
      ],
    });

    if(!user){
      return res.status(401).json({ error: 'Usuário não encontrado'});
    }

    if(!(await user.checkPassword(password))){
      return res.status(401).json({ error: 'Senha inválida.'});
    }

    const { id, name, avatar, provider, address, description } = user;

    console.log(user);
    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        address,
        description,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })

  }
}

export default new SessionController();