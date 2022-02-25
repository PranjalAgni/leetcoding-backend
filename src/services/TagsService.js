const Tag = require('../models/Tag');

class TagsService {
  async getAllTags() {
    const tagsList = await Tag.query();
    return tagsList;
  }
}

module.exports = new TagsService();
