
# store key value pair
# also called dictionary
# keys must be unique
# values can be any data type

states = {
    "Pennsylvania" => "PA",
    "Florida" => "FL",
    "Colorado" => true,
    "California" => 100,
    "Alabama" => nil
}

puts states
puts states["Colorado"]
puts states[:Alabama]