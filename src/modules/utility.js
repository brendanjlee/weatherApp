const utility = (() => {
  function convertTime(time24) {
    // console.log(time24)
    let time12;
    let tag;
    if (time24 == 0) {
      time12 = 12;
      tag = 'AM';
    }
    // 0 ~ 11
    else if (time24 < 12) {
      time12 = time24;
      tag = 'AM'
    }
    else if (time24 == 12) {
      time12 = 12;
      tag = 'PM';
    }
    // 12 ~ 23
    else if (time24 < 24) {
      time12 = time24 - 12;
      tag = 'PM';
    }
    else if (time24 == 24) {
      time12 = 12;
      tag = 'AM';
    }
    // 24 ~ 27
    else {
      time12 = time24 - 24;
      tag = 'AM'
    }

    return {
      time12,
      tag
    }
  }

  function getDayOfWeek(dateString) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return days[new Date(dateString).getDay()];
  }

  function stripIput(input) {
    return input.toLowerCase().trim();
  }

  return {
    convertTime,
    getDayOfWeek,
    stripIput
  }
})();

export default utility;