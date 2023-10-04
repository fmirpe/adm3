/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("te7d01obxnzpmjr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nudzlmfq",
    "name": "paymenttype",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "0f0nqtyy88hzgua",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("te7d01obxnzpmjr")

  // remove
  collection.schema.removeField("nudzlmfq")

  return dao.saveCollection(collection)
})
