const Tag = require('../models/Tag');

class TagsService {
  async getAllTags() {
    const tagsList = await Tag.query();
    return tagsList;
  }

  async getTagByName(tagName) {
    const tag = await Tag.query().findOne({
      name: tagName,
    });

    return tag;
  }
}

module.exports = new TagsService();
