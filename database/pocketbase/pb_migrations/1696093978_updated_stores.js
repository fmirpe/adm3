/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q26rlzm79njlff")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xkq1e6v8",
    "name": "phone",
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
  collection.schema.removeField("xkq1e6v8")

  return dao.saveCollection(collection)
})
