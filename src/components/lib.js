export const gradeCalculator = ({
  recommendations,
  seoData,
  usabilityData,
  performanceData,
  socialData,
}) => {
  let grade = "";
  let recommendation = "";

  const total_recommendations = recommendations.length;
  let total_data_elements = 0;

  Object.keys(seoData).forEach((key) =>
    seoData[key].required && seoData[key].required == 1
      ? (total_data_elements += 1)
      : null
  );
  Object.keys(usabilityData).forEach((key) =>
    usabilityData[key].required && usabilityData[key].required == 1
      ? (total_data_elements += 1)
      : null
  );
  Object.keys(performanceData).forEach((key) =>
    performanceData[key].required && performanceData[key].required == 1
      ? (total_data_elements += 1)
      : null
  );
  Object.keys(socialData).forEach((key) =>
    socialData[key].required && socialData[key].required == 1
      ? (total_data_elements += 1)
      : null
  );

  const gradePercentage =
    100 -
    (parseFloat(total_recommendations) / parseFloat(total_data_elements)) * 100;

  if (gradePercentage >= 95) {
    grade = "A+";
    recommendation = "Your page is excellent!";
  } else if (gradePercentage >= 90) {
    grade = "A";
    recommendation = "Your page is very good!";
  } else if (gradePercentage >= 85) {
    grade = "A-";
    recommendation = "Your page is good!";
  } else if (gradePercentage >= 80) {
    grade = "B+";
    recommendation = "Your page is above average!";
  } else if (gradePercentage >= 75) {
    grade = "B";
    recommendation = "Your page is average.";
  } else if (gradePercentage >= 70) {
    grade = "B-";
    recommendation = "Your page is slightly below average.";
  } else if (gradePercentage >= 65) {
    grade = "C+";
    recommendation = "Your page needs improvement.";
  } else if (gradePercentage >= 60) {
    grade = "C";
    recommendation = "Your page needs significant improvement.";
  } else if (gradePercentage >= 55) {
    grade = "C-";
    recommendation = "Your page is poor.";
  } else if (gradePercentage >= 50) {
    grade = "D";
    recommendation = "Your page is very poor.";
  } else {
    grade = "F";
    recommendation = "Your page needs serious attention.";
  }

  return { recommendation, grade, gradePercentage };
};
