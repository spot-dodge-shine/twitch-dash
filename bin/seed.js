'use strict'

const db = require('../server/db')
const { Module } = require('../server/db/models')
const moduleData = require('./data/modules.json')

const seed = async () => {

  await db.sync({ force: true })

  await Promise.all(moduleData.map(mData => Module.create({...mData})))

  console.log(`
    Seeding of Modules table successful!
  `)

  db.close()
}

seed().catch(error => {
  db.close()
  console.log(`

    Something unintended occurred while seeding:

    ${error.message}

    ${error.stack}

  `)
})
