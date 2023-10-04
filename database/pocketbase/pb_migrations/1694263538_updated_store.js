/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q26rlzm79njlff")

  collection.name = "stores"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_z51sQdh` ON `stores` (`identification`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5q26rlzm79njlff")

  collection.name = "store"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_z51sQdh` ON `store` (`identification`)"
  ]

  return dao.saveCollection(collection)
})
