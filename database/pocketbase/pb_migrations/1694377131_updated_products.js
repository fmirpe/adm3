/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // remove
  collection.schema.removeField("uqtv8v4l")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uqtv8v4l",
    "name": "brand",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
