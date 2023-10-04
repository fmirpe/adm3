/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lmzb5hrnfffopbn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gup50vys",
    "name": "salenumber",
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
  const collection = dao.findCollectionByNameOrId("lmzb5hrnfffopbn")

  // remove
  collection.schema.removeField("gup50vys")

  return dao.saveCollection(collection)
})
