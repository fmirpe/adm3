/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0f0nqtyy88hzgua")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_p5oIZdB` ON `paymenttype` (`code`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mdgnhqec",
    "name": "is_money",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0f0nqtyy88hzgua")

  collection.indexes = []

  // remove
  collection.schema.removeField("mdgnhqec")

  return dao.saveCollection(collection)
})
