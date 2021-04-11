const options = require("../utils/options");

test('save options to config file', () => {
  const data = {};
  options.save(data)
  expect(options.load()).toStrictEqual({});
});

test('load options from config file', () => {
  const data = options.load();
  expect(options.load()).toStrictEqual({});
});