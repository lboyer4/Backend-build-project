
exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable('states', function(table) {
			table.increments('id').primary();
			table.string('name');
			table.string('abreviation');

			table.timestamps(true, true);
		}),
		knex.schema.createTable('senators', function(table) {
			table.increments('id').primary();
			table.string('first_name');
			table.string('last_name');
			table.string('party');
			table.integer('state_id').unsigned()
			table.foreign('state_id')
				.references('states.id');

			table.timestamps(true, true);
		})
	])
};

exports.down = function(knex) {
	return Promise.all([
		knex.schema.dropTable('senators'),
		knex.schema.dropTable('states')

	])
};