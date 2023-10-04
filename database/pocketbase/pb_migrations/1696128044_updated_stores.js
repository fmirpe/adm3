/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q26rlzm79njlff")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qvca12cx",
    "name": "identification",
    "type": "text",
    "required": true,
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qvca12cx",
    "name": "identification",
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
