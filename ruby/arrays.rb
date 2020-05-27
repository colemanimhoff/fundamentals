
# like arrays in other languages, arrays can take any datatype

cats = Array["Sully", "Sylvester", "Chibi"]
puts cats

puts "Printing value at first index: " + cats[0]
puts "Printing value at last index: " + cats[-1]
puts "Printing my cats : " + cats[0, 2].to_s

puts cats.include? "Chibi"
puts cats.reverse()
# sorting requires all data types to be the same
puts cats.sort()

dogs = Array.new
puts dogs
dogs[0] = "TBD"
dogs[1] = "Our second dog"
puts dogs