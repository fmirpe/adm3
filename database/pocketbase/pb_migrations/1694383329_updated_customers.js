/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vgboguwpq1cjykd")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_sDwUrfE` ON `customers` (`identification`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vgboguwpq1cjykd")

  collection.indexes = [
    "CREATE INDEX `idx_sDwUrfE` ON `customers` (`identification`)"
  ]

  return dao.saveCollection(collection)
})
