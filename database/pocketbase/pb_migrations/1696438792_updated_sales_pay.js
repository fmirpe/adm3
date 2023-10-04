/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zrq2pzbe6bmcu20")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lq9ypbdw",
    "name": "id_sales",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lmzb5hrnfffopbn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zrq2pzbe6bmcu20")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lq9ypbdw",
    "name": "sale",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "lmzb5hrnfffopbn",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
