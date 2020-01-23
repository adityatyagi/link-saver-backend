/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropTable('posts', {
        cascade: true
    });
};

exports.down = pgm => {};