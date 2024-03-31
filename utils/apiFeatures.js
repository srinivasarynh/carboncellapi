class APIFeatures {
    constructor(data, queryString) {
      this.data = data;
      this.queryString = queryString;
    }
  
    // filter based on query string and return
    filter() {
      const queryObj = { ...this.queryString };
      this.data = this.data.filter(item => Object.values(queryObj).includes(item.Category));
  
      return this;
    }
  
    // Pagination
    paginate() {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      const skip = (page - 1) * limit;
  
      const startIndex = skip;
      const endIndex = skip + limit;
      this.data = this.data.slice(startIndex, endIndex);
  
      return this;
    }
  }
  module.exports = APIFeatures;