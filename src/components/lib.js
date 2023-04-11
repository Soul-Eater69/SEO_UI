export const gradeCalculator = ({
  recommendations,
  seoData,
  usabilityData,
  performanceData,
  socialData,
}) => {
  let grade = "";
  let recommendation = "";
  let site_priority_score = 0;
  let total_priority_score = 0;

  const total_recommendations = recommendations.length;
  let total_data_elements = 0;

  site_priority_score = recommendations.reduce((acc, curr) => {
    acc += curr.priority || 0;
    return acc;
  }, 0);

  Object.keys(seoData).forEach((key) => {
    if (seoData[key].required && seoData[key].required == 1) {
      total_priority_score += seoData[key].priority || 0;
    }
  });
  Object.keys(usabilityData).forEach((key) => {
    if (usabilityData[key].required && usabilityData[key].required == 1) {
      total_priority_score += usabilityData[key].priority || 0;
    }
  });
  Object.keys(performanceData).forEach((key) => {
    if (performanceData[key].required && performanceData[key].required == 1) {
      total_priority_score += performanceData[key].priority || 0;
    }
  });
  Object.keys(socialData).forEach((key) => {
    if (socialData[key].required && socialData[key].required == 1) {
      total_priority_score += socialData[key].priority || 0;
    }
  });

  const priorityGradePercentage = Math.floor(
    100 -
      (parseFloat(site_priority_score) / parseFloat(total_priority_score)) * 100
  );

  const gradePercentage =
    100 -
    (parseFloat(total_recommendations) / parseFloat(total_data_elements)) * 100;

  console.log(
    site_priority_score,
    total_priority_score,
    priorityGradePercentage,
    gradePercentage
  );
  if (priorityGradePercentage >= 95) {
    grade = "A+";
    recommendation = "Your page is excellent!";
  } else if (priorityGradePercentage >= 90) {
    grade = "A";
    recommendation = "Your page is very good!";
  } else if (priorityGradePercentage >= 85) {
    grade = "A-";
    recommendation = "Your page is good!";
  } else if (priorityGradePercentage >= 80) {
    grade = "B+";
    recommendation = "Your page is above average!";
  } else if (priorityGradePercentage >= 75) {
    grade = "B";
    recommendation = "Your page is average.";
  } else if (priorityGradePercentage >= 70) {
    grade = "B-";
    recommendation = "Your page is slightly below average.";
  } else if (priorityGradePercentage >= 65) {
    grade = "C+";
    recommendation = "Your page needs improvement.";
  } else if (priorityGradePercentage >= 60) {
    grade = "C";
    recommendation = "Your page needs significant improvement.";
  } else if (priorityGradePercentage >= 50) {
    grade = "C-";
    recommendation = "Your page is poor.";
  } else if (priorityGradePercentage >= 40) {
    grade = "D";
    recommendation = "Your page is very poor.";
  } else {
    grade = "F";
    recommendation = "Your page needs serious attention.";
  }

  return { recommendation, grade, priorityGradePercentage };
};
