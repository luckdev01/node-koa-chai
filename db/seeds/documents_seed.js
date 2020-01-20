exports.seed = knex => {
  return knex('documents')
    .del()
    .then(() => {
      return knex('documents').insert({
        type: 'book',
        url: 'https://test.data.com/book/1',
        owner_id: 'owner_1'
      })
    })
    .then(() => {
      return knex('documents').insert({
        type: 'book',
        url: 'https://test.data.com/magazine/2',
        owner_id: 'owner_2'
      })
    })
    .then(() => {
      return knex('documents').insert({
        type: 'news',
        url: 'https://test.data.com/news/1',
        owner_id: 'owner_3'
      })
    })
}
