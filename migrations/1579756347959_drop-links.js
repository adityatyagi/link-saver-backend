/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropTable('links', {
        cascade: true
    })
};

exports.down = pgm => {};