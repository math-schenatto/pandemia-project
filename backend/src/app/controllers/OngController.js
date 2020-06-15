import User from '../models/User';
import File from '../models/File';

class OngController {
  async index(req, res){
    const ongs = await User.findAll({
      where: { provider: true},
      attributes: ['id', 'name', 'email', 'avatar_id', 'address', 'description'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(ongs);
  }
}

export default new OngController();