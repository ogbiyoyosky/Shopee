"use strict";

const SearchFeature = use("App/Controllers/Features/SearchFeature");

class SearchController {
  async index({ request, response, auth }) {
    return new SearchFeature(request, response, auth).listSearchResults();
  }
}

module.exports = SearchController;
