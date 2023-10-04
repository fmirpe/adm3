/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sai7fhoc",
    "name": "unit",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // remove
  collection.schema.removeField("uqtv8v4l")

  // remove
  collection.schema.removeField("sai7fhoc")

  return dao.saveCollection(collection)
})
