/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable("users", {
        user_id: {
            type: 'serial',
            primaryKey: true
        },
        name: {
            type: 'varchar(1000)',
            notNull: true
        },
        email: {
            type: 'varchar(1000)',
            notNull: true,
            unique: true
        },
        password: {
            type: 'text',
            notNull: true
        },
        lastLogin: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        },
        token: {
            type: 'text'
        }
    })
};

exports.down = pgm => {};