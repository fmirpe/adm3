/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fkj3430hnvxki3s")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_qHNGzmT` ON `suppliers` (`identification`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uujgsxwr",
    "name": "email",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fkj3430hnvxki3s")

  collection.indexes = []

  // remove
  collection.schema.removeField("uujgsxwr")

  return dao.saveCollection(collection)
})
