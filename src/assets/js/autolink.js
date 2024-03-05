// self-invoking function to encapsulate the code
(function () {
  // Declaring variables and importing slice method
  var autoLink,
    slice = [].slice;

  // Defining autoLink function
  autoLink = function () {
    // Declaring local variables
    var callback, k, linkAttributes, option, options, pattern, v;
    // Gathering function arguments into options array
    options = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    // Regular expression pattern to match URLs
    pattern = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
    // If no options provided, replace URLs with anchor tags
    if (!(options.length > 0)) {
      return this.replace(pattern, "$1<a href='$2'>$2</a>");
    }
    // Extracting first option object
    option = options[0];
    // Extracting callback function from options
    callback = option["callback"];
    // Generating attributes for anchor tag
    linkAttributes = ((function () {
      var results;
      results = [];
      // Looping through options to generate attribute strings
      for (k in option) {
        v = option[k];
        if (k !== 'callback') {
          results.push(" " + k + "='" + v + "'");
        }
      }
      return results;
    })()).join('');
    // Replacing URLs with anchor tags, applying callback if available
    return this.replace(pattern, function (match, space, url) {
      var link;
      // Generating anchor tag with URL and attributes
      link = (typeof callback === "function" ? callback(url) : void 0) || ("<a href='" + url + "'" + linkAttributes + ">" + url + "</a>");
      return "" + space + link;
    });
  };

  // Extending String prototype with autoLink method
  String.prototype['autoLink'] = autoLink;

}).call(this);
