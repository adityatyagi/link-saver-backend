/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('links', {
        link_id: {
            type: 'serial',
            primaryKey: true
        },
        title: {
            type: 'varchar(1000)',
            notNull: true
        },
        link_url: {
            type: 'varchar(10000)',
            notNull: true
        },
        description: {
            type: 'text',
            notNull: true
        },
        user_id: {
            type: 'integer',
            notNull: 'true',
            references: '"users"',
            onDelete: 'cascade'
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