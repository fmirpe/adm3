/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qsausolf",
    "name": "brand",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // remove
  collection.schema.removeField("qsausolf")

  return dao.saveCollection(collection)
})
