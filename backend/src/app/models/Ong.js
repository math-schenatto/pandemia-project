import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Ong extends Model {
  static init(sequelize){
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'manager'} );
  }

}

export default Ong;