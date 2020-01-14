/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('users', {
        email: {
            type: 'text',
            notNull: true
        },
    })
};

exports.down = pgm => {};