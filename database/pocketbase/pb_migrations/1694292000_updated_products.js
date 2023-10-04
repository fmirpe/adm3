/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7t6qkht7",
    "name": "price_purchase",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vlfo1qln",
    "name": "price_sales",
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
  const collection = dao.findCollectionByNameOrId("jvsu0euvpruf29m")

  // remove
  collection.schema.removeField("7t6qkht7")

  // remove
  collection.schema.removeField("vlfo1qln")

  return dao.saveCollection(collection)
})
