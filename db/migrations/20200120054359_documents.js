exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  return knex.schema.createTable('documents', table => {
    table
      .uuid('id')
      .unique()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table.string('type').notNullable()
    table.string('url').notNullable()
    table.string('owner_id').notNullable()
    table.datetime('deleted_at', { precision: 6 })
    table.timestamps(true, true)
  })
}

exports.down = knex => {
  return knex.schema.dropTable('documents')
}
