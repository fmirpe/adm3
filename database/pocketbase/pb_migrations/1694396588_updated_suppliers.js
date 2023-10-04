/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fkj3430hnvxki3s")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fpqprnhp",
    "name": "status",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fkj3430hnvxki3s")

  // remove
  collection.schema.removeField("fpqprnhp")

  return dao.saveCollection(collection)
})
