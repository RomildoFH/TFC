import { INTEGER, Model, ForeignKey, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Matche extends Model {
  declare id: number;
  declare homeTeamId: ForeignKey<Team['id']>;
  declare homeTeamGoals: number;
  declare awayTeamId: ForeignKey<Team['id']>;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matche.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matche.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Matche, { foreignKey: 'homeTeamId', as: 'teamMatchHomeId' });
Team.hasMany(Matche, { foreignKey: 'awayTeamId', as: 'teamMatchAwayId' });

export default Matche;
