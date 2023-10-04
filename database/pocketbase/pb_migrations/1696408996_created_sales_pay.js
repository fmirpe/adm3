/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zrq2pzbe6bmcu20",
    "created": "2023-10-04 08:43:16.723Z",
    "updated": "2023-10-04 08:43:16.723Z",
    "name": "sales_pay",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "k1kegzco",
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
      },
      {
        "system": false,
        "id": "2vvvlnpj",
        "name": "notes",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ar5dsta0",
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
      },
      {
        "system": false,
        "id": "mjrlqmbb",
        "name": "amount",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": "@request.auth.id!=\"\"",
    "viewRule": "@request.auth.id!=\"\"",
    "createRule": "@request.auth.id!=\"\"",
    "updateRule": "@request.auth.id!=\"\"",
    "deleteRule": "@request.auth.id!=\"\"",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zrq2pzbe6bmcu20");

  return dao.deleteCollection(collection);
})
