/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vgboguwpq1cjykd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "o6c4u5sn",
    "name": "balance",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vgboguwpq1cjykd")

  // remove
  collection.schema.removeField("o6c4u5sn")

  return dao.saveCollection(collection)
})
