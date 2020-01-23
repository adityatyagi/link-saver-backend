/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = pgm => {
    pgm.dropTable('users', {
        cascade: true
    });
};

exports.down = pgm => {};