/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zm6pcyal",
    "name": "id_category",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "r5yf77xdbotbjy1",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // remove
  collection.schema.removeField("zm6pcyal")

  return dao.saveCollection(collection)
})
