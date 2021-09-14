'use strict'
const Helpers = use('Helpers')
const path = require('path')
const _ = require('lodash')

const { Command } = require('@adonisjs/ace')

class Feature extends Command {
  static get signature () {
    return `make:feature 
    { name : Name of the feature }
   `
  }

  async _getFilePath () {
  
    /**
     * Prompt for test type when no type is
     * defined
     */


    return path.join(process.cwd(), 'app/Controllers/', 'features')
  }

  async _generateFeature (testPath, name) {
    
    const template = await this.readFile(path.join(__dirname, './templates/feature.mustache'), 'utf-8')
    await this.generateFile(testPath, template, { name: name })
  }

  static get description () {
    return 'Make a new Feature'
  }
  async _ensureInProjectRoot () {
    const acePath = path.join(process.cwd(), 'ace')
    const exists = await this.pathExists(acePath)

    if (!exists) {
      throw new Error('Make sure you are inside an Adonisjs app to run make:test command')
    }
  }

  async handle ({name }) {
    const basePath = await this._getFilePath()
    const featurePath = path.join(basePath, `${_.camelCase(name).charAt(0).toUpperCase() + name.substring(1)}.js`)
    const incrementalPath = featurePath.replace(process.cwd(), '').replace(path.sep, '')
    const className = name.replace(/[-/_](\w)/g, (match, group) => group.toUpperCase())

    try {
      await this._ensureInProjectRoot()
      await this._generateFeature(featurePath, className)
      this.completed('create', incrementalPath)

      /**
       * Return testPath if command executed programatically
       */
      if (!this.viaAce) {
        return featurePath
      }
    } catch (error) {
      /**
       * Throw error if command executed programatically
       */
      if (!this.viaAce) {
        throw error
      }
      this.error(error.message)
    }
    
  }
}

module.exports = Feature
