import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

export const db = await connectToDB('postgresql:///lineup');

export class Instructor extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Instructor.init(
    {
        instructorId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        bio: {
            type: DataTypes.TEXT
        },
        location: {
            type: DataTypes.STRING
        },
        certification: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        modelName: 'instructor',
        sequelize: db
    }
)

export class Resorts extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Resorts.init(
    {
        resortId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        location: {
            type: DataTypes.STRING
        }
    },
    {
        modelName: 'resorts',
        sequelize: db
    }
)

export class Certifications extends Model {
    [util.inspect.custom]() {
        return this.toJSON();
    }
}

Certifications.init(
    {
        certificationId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        snowBoard: {
            type: DataTypes.INTEGER
        },
        ski: {
            type: DataTypes.INTEGER
        },
        adaptive: {
            type: DataTypes.INTEGER
        }
    },
    {
        modelName: 'certifications',
        sequelize: db
    }
)

// istructor belogs to resort
Resorts.hasMany(Instructor, { foreignKey: 'resortId' })
Instructor.belongsTo(Resorts, { foreignKey: 'resortId' });
// istructor has many certifications 
Instructor.hasMany(Certifications, { foreignKey: 'certificationId' });
