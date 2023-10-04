/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s00f9o9b6a57z9k")

  collection.name = "stocks"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rfVg22e` ON `stocks` (\n  `id_product`,\n  `id_location`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("s00f9o9b6a57z9k")

  collection.name = "stock"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_rfVg22e` ON `stock` (\n  `id_product`,\n  `id_location`\n)"
  ]

  return dao.saveCollection(collection)
})
