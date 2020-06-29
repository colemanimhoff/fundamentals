# dictionary

# data structure which allows us to store data in key value pairs
# keys must be unique

month_conversions = {
    "Jan": "January",
    "Feb": "February",
    "Mar": "March",
    "Apr": "April",
    "Jun": "June",
    "Jul": "July",
    "Aug": "August",
    "Sep": "September",
    "Oct": "October",
    "Nov": "November",
    "Dec": "December"
}

print(month_conversions["Jan"])
print(month_conversions.get("Dec"))

# equal to none, unless you specify

print(month_conversions.get("Luv", "Not a valid key"))

# keys can be numbers as well

days_in_the_week = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
}

print(days_in_the_week.get(6))
print(days_in_the_week[5])
