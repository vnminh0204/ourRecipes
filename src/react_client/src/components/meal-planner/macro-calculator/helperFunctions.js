export const getREE = (weight, height, age, gender) => {
  let REE;
  if (gender === "Male") {
    REE = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    return REE;
  } else {
    REE = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    return REE;
  }
};

export const getActivityLevel = (activityLevel) => {
  switch (activityLevel) {
    case "sedentary":
      return 1.2;
      break;
    case "lightActivity":
      return 1.375;
      break;
    case "moderateActivity":
      return 1.55;
      break;
    case "veryActive":
      return 1.725;
    default:
      return 1.2;
  }
};

export const getTDEE = (r, l) => {
  var t = Math.round(r * l);
  return t;
};

export const getGoal = (goal, tdee) => {
  if (goal === "Lose") {
    var lose = Math.round(tdee - tdee * 0.2);
    return lose;
  } else if (goal === "Gain") {
    var gain = Math.round(tdee + tdee * 0.2);
    return gain;
  } else {
    return tdee;
  }
};

export const getKilos = (weight) => {
  var kg = Math.round(weight / 0.45359237);
  return kg;
};

export const getProtein = (weight) => {
  var protein = Math.ceil(weight * 0.825);
  return protein;
};

export const proteinCalories = (protein) => {
  var total = Math.round(protein * 4);
  return total;
};

export const getFat = (goal) => {
  var fats = Math.round((goal * 0.25) / 9);
  return fats;
};

export const fatCalories = (fat) => {
  var total = Math.round(fat * 9);
  return total;
};

export const calorieBalance = (protein, fat, cals) => {
  var total = cals - (protein + fat);
  return total;
};

export const getTotalCarbs = (cals) => {
  var carbs = Math.round(cals / 4);
  return carbs;
};

export const lbsToKg = (lbs) => {
  var kg = Math.round(lbs / 2.2046);
  return kg;
};

export const feetToCm = (feet, inch) => {
  var inches = feet * 12;
  var cm = (inches + inch) / 0.3937;
  return cm.toFixed(2);
};
