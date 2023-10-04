/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q26rlzm79njlff")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m9slsidv",
    "name": "avatar",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q26rlzm79njlff")

  // remove
  collection.schema.removeField("m9slsidv")

  return dao.saveCollection(collection)
})
