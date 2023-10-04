/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q26rlzm79njlff")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zupsprgg",
    "name": "address",
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
  const collection = dao.findCollectionByNameOrId("5q26rlzm79njlff")

  // remove
  collection.schema.removeField("zupsprgg")

  return dao.saveCollection(collection)
})
