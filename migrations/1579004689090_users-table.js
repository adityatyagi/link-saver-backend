/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        user_id: {
            type: 'serial',
            primaryKey: true
        },
        name: {
            type: 'varchar(1000)',
            notNull: true
        },
        email: {
            type: 'varchar(100)',
            notNull: true,
            unique: true
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        }
    })
};

exports.down = pgm => {};