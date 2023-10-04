/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lmzb5hrnfffopbn")

  collection.indexes = [
    "CREATE INDEX `idx_CZ3tNLg` ON `sales` (`sale_type`)",
    "CREATE INDEX `idx_gqC1rIP` ON `sales` (`id_customer`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "epgwhzjt",
    "name": "user",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lmzb5hrnfffopbn")

  collection.indexes = []

  // remove
  collection.schema.removeField("epgwhzjt")

  return dao.saveCollection(collection)
})
