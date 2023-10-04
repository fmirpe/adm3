/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vgboguwpq1cjykd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j80qgpyx",
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
  const collection = dao.findCollectionByNameOrId("vgboguwpq1cjykd")

  // remove
  collection.schema.removeField("j80qgpyx")

  return dao.saveCollection(collection)
})
