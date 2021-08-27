const setFieldsToSelect = (str) => {
  let fieldsToSelect = str || "";
  fieldsToSelect = fieldsToSelect.split("-");
  fieldsToSelect = fieldsToSelect.join(" ");
  return fieldsToSelect;
};

module.exports = setFieldsToSelect;
