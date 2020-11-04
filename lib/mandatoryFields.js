const mandatoryFieldsForSignUp = (body) => {
  try {
    if (!body.email || !body.firstName || !body.lastName || !body.password) {
      return false;
    }
    return true;
  } catch (err) {
    throw Error(err);
  }
};

const mandatoryFieldsForLogin = (body) => {
  try {
    if (!body.email || !body.password) {
      return false;
    }
    return true;
  } catch (err) {
    throw Error(err);
  }
};

const mandatoryFieldsForlogisticRequest = (body) => {
  try {
    if (!body.email || !body.name || !body.phoneNumber) {
      return false;
    }
    return true;
  } catch (err) {
    throw Error(err);
  }
};

const mandatoryFieldsForTransportMode = (body) => {
  try {
    if (!body.name) {
      return false;
    }
    return true;
  } catch (err) {
    throw Error(err);
  }
};

const mandatoryFieldsForJobCard = (body) => {
  try {
    if(!body.date || !body.mode || !body.type || !body.activity || !body.incoTerms) {
      return false;
    } 
    return true;
  } catch(err) {
    throw Error(err)
  }
};



module.exports = {
  mandatoryFieldsForSignUp,
  mandatoryFieldsForLogin,
  mandatoryFieldsForlogisticRequest,
  mandatoryFieldsForTransportMode,
  mandatoryFieldsForJobCard
};
